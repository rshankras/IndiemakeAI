
import { GoogleGenAI, Modality } from '@google/genai';
import { CampaignData, GeneratedContent, AppCategory } from '../types';
import { marked } from 'marked';
import { promptLibrary } from './prompt-library';

// --- REAL GEMINI IMAGE GENERATION SERVICE ---
/**
 * Generates a single image using the Gemini API and returns a data URL.
 * @param prompt The image generation prompt.
 * @param ai The initialized GoogleGenAI instance.
 * @returns A promise that resolves to a base64 data URL string.
 */
async function generateImageWithGemini(prompt: string, ai: GoogleGenAI): Promise<string> {
    try {
        console.log(`Generating image for prompt: "${prompt}"`);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                console.log(`Successfully generated image for prompt: "${prompt}"`);
                return imageUrl;
            }
        }
        throw new Error("No image data found in Gemini response.");

    } catch (error) {
        console.error(`Failed to generate image for prompt: "${prompt}"`, error);
        // Return a placeholder URL on failure to avoid breaking the UI
        return `https://picsum.photos/seed/error-${Math.random()}/500/500`; 
    }
}


/**
 * Maps the AppCategory enum from the form to the keys used in the prompt library's categoryMappings.
 * @param category The AppCategory enum value.
 * @returns The corresponding string key for the categoryMappings object.
 */
const getCategoryKey = (category: AppCategory): string => {
    switch (category) {
        case AppCategory.FINANCE: return 'expense';
        // Add other special mappings here if needed
        default: 
            const key = category.toLowerCase();
            return key in promptLibrary.categoryMappings ? key : 'productivity'; // Fallback to productivity
    }
};

/**
 * Fills a template string with dynamic values from a replacements object.
 * @param template The string containing {{placeholders}}.
 * @param replacements An object where keys match placeholder names.
 * @returns The filled template string.
 */
const fillTemplate = (template: string, replacements: Record<string, string>): string => {
    let result = template;
    for (const key in replacements) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }
    // Clean up any remaining, unfilled placeholders
    result = result.replace(/{{\w+}}/g, `[${replacements['appName'] || 'App'}'s Detail]`);
    return result;
};


export const generateCampaign = async (data: CampaignData, apiKey: string): Promise<GeneratedContent> => {
  if (!apiKey) {
    console.error("API Key was not provided to generateCampaign function.");
    throw new Error("A Gemini API Key is required to generate the campaign.");
  }
  
  // LAZY INITIALIZATION: Connect to the API only when the function is called.
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  console.log("Starting campaign generation with data:", data);

  const categoryKey = getCategoryKey(data.appCategory);
  const categoryMapping = promptLibrary.categoryMappings[categoryKey];

  // --- 1. GENERATE IMAGES (in parallel) ---
  console.log("Generating image prompts...");
  const imagePrompts = categoryMapping.bestImagePrompts.slice(0, 8).map((key) => {
    const promptCategory = Object.keys(promptLibrary.imagePrompts).find(cat => promptLibrary.imagePrompts[cat][key]);
    if (!promptCategory) return null;

    const templateData = promptLibrary.imagePrompts[promptCategory][key];
    const replacements = {
        ...templateData.variables,
        appName: data.appName,
        numPeople: (promptLibrary.promptCustomizationRules.peopleCountSelection[categoryKey] || '1').toString(),
        deviceType: promptLibrary.promptCustomizationRules.deviceTypeSelection[categoryKey] || 'iPhone',
        visualStyle: data.visualStyle,
        specificDetail: data.keyFeatures.split('\n')[0].replace('- ', ''),
        aspectRatio: '1:1', // Using 1:1 for consistency
    };
    return fillTemplate(templateData.template, replacements);
  }).filter((p): p is string => p !== null);

  const imageGenerationPromises = imagePrompts.map(prompt => generateImageWithGemini(prompt, ai));
  const imageUrls = await Promise.all(imageGenerationPromises);

  const generatedImages = imageUrls.map((url, i) => ({
    id: `img_${i + 1}`,
    url: url,
    prompt: imagePrompts[i] || "N/A",
  }));
  console.log("Image generation complete.");


  // --- 2. GENERATE CAPTIONS & HASHTAGS ---
  const hashtagSets = categoryMapping.hashtagSets.map(key => {
    const template = promptLibrary.hashtagSets[key];
    return fillTemplate(template, { AppName: data.appName.replace(/\s/g, '') });
  });

  const generatedCaptions = Array.from({ length: data.campaignLength }, (_, i) => {
    const key = categoryMapping.bestCaptions[i % categoryMapping.bestCaptions.length];
    const promptCategory = Object.keys(promptLibrary.captionTemplates).find(cat => promptLibrary.captionTemplates[cat][key]);
    if (!promptCategory) return null;

    const templateData = promptLibrary.captionTemplates[promptCategory][key];
    const replacements = {
        ...templateData.variables,
        appName: data.appName,
        whatItDoes: data.uniqueness,
        hashtags: hashtagSets[i % hashtagSets.length] || '',
    };
    const filledCaption = fillTemplate(templateData.template, replacements);

    return { id: `cap_${i + 1}`, text: filledCaption };
  }).filter(Boolean);
  
   const generatedHashtagSets = categoryMapping.hashtagSets.map(key => {
      const template = promptLibrary.hashtagSets[key];
      const filled = fillTemplate(template, { AppName: data.appName.replace(/\s/g, '') });
      return {
          useCase: key.replace(/Focus$/, '').replace(/([A-Z])/g, ' $1').trim(),
          hashtags: filled.split(' ').filter(h => h.startsWith('#')),
      };
  });

  // --- 3. GENERATE CAMPAIGN PLAN ---
  const weeklyMix = Object.values(promptLibrary.campaignStructures.weeklyContentMix);
  const campaignPlan = Array.from({ length: data.campaignLength }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // Use a placeholder if not enough images were generated
    const imageUrl = generatedImages[i % generatedImages.length]?.url || `https://picsum.photos/seed/${encodeURIComponent(data.appName)}${i}/200/200`;
    return {
        day: i + 1,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        postType: weeklyMix[i % weeklyMix.length].goal,
        captionPreview: generatedCaptions[i % generatedCaptions.length]?.text.substring(0, 70) || '',
        imagePreviewUrl: imageUrl,
        bestTimeToPost: i % 2 === 0 ? '9:00 AM EST' : '1:00 PM EST',
    };
  });

  // --- 4. GENERATE QUICK REFERENCE GUIDE & PROMPT LIBRARY ---
  const guideHtml = await marked(QUICK_REFERENCE_GUIDE_TEMPLATE
    .replace(/\[App Name\]/g, data.appName)
    .replace(/\[Tone\]/g, data.contentTone)
    .replace(/\[Visual Style\]/g, data.visualStyle)
    .replace(/\[App Category\]/g, data.appCategory)
    .replace(/\[Primary Audience\]/g, data.primaryAudience.join(', '))
  );
  
  const finalPromptLibrary = {
      generated_image_prompts: generatedImages.map(img => img.prompt),
      caption_templates_used: categoryMapping.bestCaptions,
      user_input_summary: data,
  };

  // --- 5. ASSEMBLE FINAL OBJECT ---
  const generatedContent: GeneratedContent = {
    images: generatedImages,
    captions: generatedCaptions,
    hashtagSets: generatedHashtagSets,
    campaignPlan: campaignPlan,
    quickReferenceGuide: guideHtml,
    promptLibrary: finalPromptLibrary,
  };

  console.log("Campaign generation complete.");
  return generatedContent;
};

// Static template for the quick reference guide
const QUICK_REFERENCE_GUIDE_TEMPLATE = `
# Quick Reference Guide

Here's a summary of your best marketing assets to get you started.

## Top 5 Prompts

1.  **Generate an Instagram post announcing the launch of [App Name].** Focus on the main problem it solves. Use an [Tone] tone.
2.  **Create a Twitter thread highlighting 3 key features of [App Name].** Make it engaging with emojis.
3.  **Write a Reddit post for r/indiedev about the journey of building [App Name].** Be authentic and share challenges.
4.  **Draft a short YouTube video script for a 30-second ad.** The visual style should be [Visual Style].
5.  **Generate 5 different headline options for a Product Hunt launch.**

## Top 5 Caption Templates

1.  "Unlock [Benefit] with [App Name]. ✨ Our new [Feature] makes it easier than ever to [Action]. Link in bio! #[Hashtag1] #[Hashtag2]"
2.  "Stop [Problem], start [Solution]. We built [App Name] for people who... Get it on the App Store today! #[IndieApp] #[YourNiche]"
3.  "Behind the scenes of building [App Name]! It all started with... We're so excited to share it with you. #[DevLog] #[Startup]"
4.  "User review of the day! ⭐⭐⭐⭐⭐ '[Quote from user]'. We love hearing from you! #[CustomerLove] #[AppReview]"
5.  "Did you know? You can use [App Name] to [Unexpected Use Case]. Give it a try! #[AppHacks] #[ProTip]"

## Hashtag Cheat Sheet

-   **General:** #IndieDev #AppLaunch #NewApp #Tech #MobileApp
-   **For [App Category]:** #[CategoryHashtag1] #[CategoryHashtag2]
-   **For [Primary Audience]:** #[AudienceHashtag1] #[AudienceHashtag2]
`;