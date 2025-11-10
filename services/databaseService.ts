
import { GeneratedContent } from '../types';

// --- MOCK DATABASE SERVICE ---
// This service simulates interacting with a backend database like Firestore or Supabase.

const getCampaignsKey = (userId: string) => `indieMarkCampaigns_${userId}`;

/**
 * Simulates saving a generated campaign to a user's account in the database.
 * In a real app, this would use the Firebase SDK to write a document to Firestore.
 * @param userId The ID of the user saving the campaign.
 * @param campaignData The generated campaign content to save.
 */
export const saveCampaign = async (userId: string, campaignData: GeneratedContent): Promise<GeneratedContent> => {
  console.log(`Simulating saving campaign for user: ${userId}`);

  // If the campaign already has an ID, we assume it's already saved.
  if (campaignData.id) {
    console.log("Campaign already has an ID, not re-saving.");
    return campaignData;
  }

  const campaigns = await getCampaigns(userId);

  const newCampaign: GeneratedContent = {
    ...campaignData,
    id: `campaign_${new Date().getTime()}`,
    savedAt: new Date().toISOString(),
  };

  campaigns.unshift(newCampaign); // Add to the beginning of the list

  localStorage.setItem(getCampaignsKey(userId), JSON.stringify(campaigns));

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  console.log("Campaign saved successfully (simulated).");
  return newCampaign;
};

/**
 * Retrieves all saved campaigns for a specific user.
 * @param userId The user's ID.
 * @returns A promise that resolves to an array of saved campaigns.
 */
export const getCampaigns = async (userId: string): Promise<GeneratedContent[]> => {
    console.log(`Fetching campaigns for user ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const campaignsJson = localStorage.getItem(getCampaignsKey(userId));
    if (campaignsJson) {
        try {
            return JSON.parse(campaignsJson);
        } catch (e) {
            console.error("Failed to parse campaigns from localStorage", e);
            return [];
        }
    }
    return [];
};

/**
 * Deletes a specific campaign for a user.
 * @param userId The user's ID.
 * @param campaignId The ID of the campaign to delete.
 */
export const deleteCampaign = async (userId: string, campaignId: string): Promise<void> => {
    console.log(`Deleting campaign ${campaignId} for user ${userId}`);
    let campaigns = await getCampaigns(userId);
    campaigns = campaigns.filter(c => c.id !== campaignId);
    localStorage.setItem(getCampaignsKey(userId), JSON.stringify(campaigns));
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log("Campaign deleted.");
};
