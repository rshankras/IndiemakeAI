
import React, { useState, useEffect } from 'react';
import { GeneratedContent } from '../types';
import { useAuth } from '../AuthContext';
import { getCampaigns, deleteCampaign } from '../services/databaseService';
import { CalendarDaysIcon, TrashIcon, SparklesIcon } from './icons';

interface CampaignHistoryProps {
    onViewCampaign: (campaign: GeneratedContent) => void;
    onGenerateNew: () => void;
}

const CampaignHistory: React.FC<CampaignHistoryProps> = ({ onViewCampaign, onGenerateNew }) => {
    const { user } = useAuth();
    const [campaigns, setCampaigns] = useState<GeneratedContent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(true);
            getCampaigns(user.uid).then(data => {
                setCampaigns(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleDelete = async (campaignId: string) => {
        if (user && campaignId) {
            if (window.confirm("Are you sure you want to delete this campaign?")) {
                await deleteCampaign(user.uid, campaignId);
                setCampaigns(campaigns.filter(c => c.id !== campaignId));
            }
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading your campaigns...</p>
            </div>
        );
    }
    
    if (campaigns.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-800">No Saved Campaigns Yet</h2>
                <p className="text-slate-600 mt-2 mb-6">Start by generating a new marketing campaign for your app.</p>
                <button onClick={onGenerateNew} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-base hover:bg-blue-700 flex items-center gap-2 transition-colors mx-auto">
                    <SparklesIcon className="h-5 w-5"/>
                    Generate a New Campaign
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">My Saved Campaigns</h2>
                <div className="space-y-4">
                    {campaigns.map(campaign => (
                        <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div className="flex-grow cursor-pointer p-4" onClick={() => onViewCampaign(campaign)}>
                                <p className="font-bold text-lg text-slate-800">{campaign.appName}</p>
                                <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                    <CalendarDaysIcon className="h-4 w-4" />
                                    Saved on {new Date(campaign.savedAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <div className="flex-shrink-0 pr-4">
                                <button 
                                    onClick={() => handleDelete(campaign.id!)}
                                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    aria-label="Delete campaign"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CampaignHistory;
