
import { CampaignData, GeneratedContent, AppCategory } from '../types';
import { marked } from 'marked';
import { promptLibrary } from './prompt-library';

/**
 * Generates a single image using the Gemini API and returns a data URL.
 * @param prompt The image generation prompt.
 * @param ai The initialized GoogleGenAI instance.
 * @param Modality The Modality enum from the @google/genai library.
 * @returns A promise that resolves to a base64 data URL string.
 */
async function generateImageWithGemini(prompt: string, ai: any, Modality: any): Promise<string> {
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
 * This is still used for selecting the best image prompt templates.
 * @param category The AppCategory enum value.
 * @returns The corresponding string key for the categoryMappings object.
 */
const getCategoryKey = (category: AppCategory): string => {
    switch (category) {
        case AppCategory.FINANCE: return 'expense';
        default:
            const key = category.toLowerCase();
            return key in promptLibrary.categoryMappings ? key : 'productivity'; // Fallback
    }
};

/**
 * Fills a template string with dynamic values from a replacements object.
 * Still used for image prompt templates.
 * @param template The string containing {{placeholders}}.
 * @param replacements An object where keys match placeholder names.
 * @returns The filled template string.
 */
const fillTemplate = (template: string, replacements: Record<string, string>): string => {
    let result = template;
    for (const key in replacements) {
        result = result.replace(new RegExp(`{{${key}}}`, 'g'), replacements[key]);
    }
    result = result.replace(/{{\w+}}/g, `[${replacements['appName'] || 'App'}'s Detail]`);
    return result;
};


export const generateCampaign = async (data: CampaignData): Promise<GeneratedContent> => {
    // LAZY LOADING and INITIALIZATION: Import and connect to the API only when the function is called.
    const { GoogleGenAI, Modality, Type } = await import('@google/genai');
    // The API key MUST be obtained exclusively from the environment variable process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    console.log("Starting campaign generation with data:", data);

    // --- 1. GENERATE IMAGES (in parallel, using existing prompt library for image ideas) ---
    console.log("Generating image prompts...");
    const categoryKey = getCategoryKey(data.appCategory);
    const categoryMapping = promptLibrary.categoryMappings[categoryKey];
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
            aspectRatio: '1:1',
        };
        return fillTemplate(templateData.template, replacements);
    }).filter((p): p is string => p !== null);

    const imageGenerationPromises = imagePrompts.map(prompt => generateImageWithGemini(prompt, ai, Modality));
    

    // --- 2. GENERATE TEXTUAL CONTENT (using Gemini 2.5 Pro) ---
    console.log("Generating textual content with Gemini Pro...");
    const textGenerationPrompt = `
        Based on the following application details, generate a complete marketing campaign.

        **App Details:**
        - **App Name:** ${data.appName}
        - **App Category:** ${data.appCategory}
        - **Key Features:**
        ${data.keyFeatures}
        - **Primary Audience:** ${data.primaryAudience.join(', ')}
        - **Uniqueness:** ${data.uniqueness}
        - **Competitors:** ${data.competitors || 'Not specified'}
        - **Content Tone:** ${data.contentTone}
        - **Visual Style:** ${data.visualStyle}
        - **Target Platforms:** ${data.targetPlatforms.join(', ')}
        - **Campaign Length:** ${data.campaignLength} days

        **Request:**

        Generate the following marketing assets:
        1.  **Captions:** Create ${data.campaignLength} unique and engaging captions tailored to the specified tone and platforms.
        2.  **Hashtag Sets:** Create 4 distinct sets of hashtags for different use cases (e.g., General, Niche-specific, Launch Day, Community).
        3.  **Campaign Plan:** Create a day-by-day plan for a ${data.campaignLength}-day campaign with varied post types.
        4.  **Quick Reference Guide:** Create a helpful guide in Markdown format that summarizes best practices, provides caption templates, and includes a hashtag cheat sheet, all customized for this specific app.

        Provide the response in the specified JSON format.
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            captions: {
                type: Type.ARRAY,
                description: "A list of social media captions for the campaign.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        text: {
                            type: Type.STRING,
                            description: "The full caption text. Should be engaging and relevant to the app."
                        },
                    },
                    required: ['text']
                }
            },
            hashtagSets: {
                type: Type.ARRAY,
                description: "Sets of hashtags for different use cases.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        useCase: {
                            type: Type.STRING,
                            description: "The use case for this set of hashtags (e.g., 'General', 'Productivity', 'Launch Day')."
                        },
                        hashtags: {
                            type: Type.ARRAY,
                            description: "A list of relevant hashtags, including the # symbol.",
                            items: { type: Type.STRING }
                        }
                    },
                    required: ['useCase', 'hashtags']
                }
            },
            campaignPlan: {
                type: Type.ARRAY,
                description: `A day-by-day campaign plan for ${data.campaignLength} days.`,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        day: { type: Type.INTEGER },
                        postType: { 
                            type: Type.STRING,
                            description: "The type of post for the day (e.g., 'Problem Awareness', 'Feature Highlight', 'User Testimonial')."
                        },
                        captionPreview: {
                            type: Type.STRING,
                            description: "A short preview or summary of the caption for this day's post."
                        },
                        bestTimeToPost: {
                            type: Type.STRING,
                            description: "The recommended time to post on this day (e.g., '9:00 AM EST')."
                        }
                    },
                    required: ['day', 'postType', 'captionPreview', 'bestTimeToPost']
                }
            },
            quickReferenceGuide: {
                type: Type.STRING,
                description: "A helpful quick reference guide for the user in Markdown format. Include sections for caption templates and a hashtag cheat sheet."
            }
        },
        required: ['captions', 'hashtagSets', 'campaignPlan', 'quickReferenceGuide']
    };
    
    const textGenerationPromise = ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: textGenerationPrompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
        },
    });

    // --- 3. AWAIT ALL GENERATION AND ASSEMBLE ---
    const [imageUrls, textResponse] = await Promise.all([
        Promise.all(imageGenerationPromises),
        textGenerationPromise,
    ]);

    const generatedImages = imageUrls.map((url, i) => ({
        id: `img_${i + 1}`,
        url: url,
        prompt: imagePrompts[i] || "N/A",
    }));
    console.log("Image generation complete.");

    const generatedTextContent = JSON.parse(textResponse.text);
    console.log("Text generation complete.");

    const generatedCaptions = generatedTextContent.captions.map((caption: { text: string }, i: number) => ({
        id: `cap_${i + 1}`,
        text: caption.text,
    }));
    
    const campaignPlan = generatedTextContent.campaignPlan.map((day: any, i: number) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            ...day,
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            imagePreviewUrl: generatedImages[i % generatedImages.length]?.url || `https://picsum.photos/seed/placeholder${i}/200/200`,
        };
    });
    
    const guideHtml = await marked(generatedTextContent.quickReferenceGuide);

    const finalPromptLibrary = {
        generated_image_prompts: generatedImages.map(img => img.prompt),
        text_generation_prompt_summary: "A dynamic prompt was generated based on user input to create captions, hashtags, a campaign plan, and a quick reference guide using gemini-2.5-pro.",
        user_input_summary: data,
    };

    const generatedContent: GeneratedContent = {
        images: generatedImages,
        captions: generatedCaptions,
        hashtagSets: generatedTextContent.hashtagSets,
        campaignPlan: campaignPlan,
        quickReferenceGuide: guideHtml,
        promptLibrary: finalPromptLibrary,
    };

    console.log("Campaign generation complete.");
    return generatedContent;
};
