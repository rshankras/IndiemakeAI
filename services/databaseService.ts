import { GeneratedContent } from '../types';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, collection } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- REAL DATABASE SERVICE ---
// This service interacts with a Firestore database.

/**
 * Saves a generated campaign to a user's account in Firestore.
 * @param userId The ID of the user saving the campaign.
 * @param campaignData The generated campaign content to save.
 */
export const saveCampaign = async (userId: string, campaignData: GeneratedContent): Promise<void> => {
  console.log(`Saving campaign for user: ${userId}`);
  try {
    // We'll create a new document with a generated ID inside the user's 'campaigns' subcollection.
    const userCampaignsCollection = collection(db, 'users', userId, 'campaigns');
    const newCampaignRef = doc(userCampaignsCollection); // Creates a new doc with a unique ID

    await setDoc(newCampaignRef, campaignData);
    
    console.log("Campaign saved successfully to Firestore with ID:", newCampaignRef.id);
  } catch (error) {
    console.error("Error saving campaign to Firestore:", error);
    // Re-throw the error so the UI can handle it
    throw error;
  }
};