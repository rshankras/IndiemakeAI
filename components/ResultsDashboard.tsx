
import React, { useState } from 'react';
import { GeneratedContent, GeneratedImage, Caption, CampaignDay } from '../types';
import { PhotoIcon, ClipboardDocumentListIcon, CalendarDaysIcon, BookOpenIcon, CodeBracketIcon, DownloadIcon, ArrowDownTrayIcon, ShareIcon, SparklesIcon, XMarkIcon, BookmarkIcon } from './icons';
import { useAuth } from '../AuthContext';
import { saveCampaign } from '../services/databaseService';

interface ResultsDashboardProps {
  content: GeneratedContent;
  onGenerateAnother: () => void;
}

type Tab = 'images' | 'captions' | 'plan' | 'guide' | 'prompts';

const TABS: { id: Tab, name: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { id: 'images', name: 'Generated Images', icon: PhotoIcon },
    { id: 'captions', name: 'Captions & Hashtags', icon: ClipboardDocumentListIcon },
    { id: 'plan', name: 'Campaign Plan', icon: CalendarDaysIcon },
    { id: 'guide', name: 'Quick Guide', icon: BookOpenIcon },
    { id: 'prompts', name: 'Prompt Library', icon: CodeBracketIcon },
];

const ImageModal: React.FC<{ imageUrl: string, onClose: () => void }> = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
        <div className="relative bg-white rounded-lg p-4 max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-slate-800 hover:bg-slate-200">
                <XMarkIcon className="h-6 w-6" />
            </button>
            <img src={imageUrl} alt="Enlarged view" className="max-w-full max-h-[85vh] object-contain" />
        </div>
    </div>
);

const ImagesTab: React.FC<{ images: GeneratedImage[] }> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleDownloadAll = () => alert("Downloading all images as a ZIP file... (simulated)");
    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={handleDownloadAll} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download All ZIP
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="group relative rounded-lg overflow-hidden shadow-md">
                        <img src={image.url} alt={`Generated visual for prompt: ${image.prompt}`} className="w-full h-full object-cover aspect-square" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center p-2 text-white opacity-0 group-hover:opacity-100">
                            <button onClick={() => setSelectedImage(image.url)} className="bg-white/20 backdrop-blur-sm p-2 rounded-full mb-2 hover:bg-white/40">View</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        </div>
    );
};

const CaptionsTab: React.FC<{ captions: Caption[] }> = ({ captions }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    return (
        <div className="space-y-4">
            {captions.map(caption => (
                 <div key={caption.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-start">
                    <p className="text-slate-700 mr-4">{caption.text}</p>
                    <button onClick={() => handleCopy(caption.text, caption.id)} className="text-sm font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">
                       {copiedId === caption.id ? 'Copied!' : 'Copy'}
                    </button>
                 </div>
            ))}
        </div>
    );
};

const PlanTab: React.FC<{ plan: CampaignDay[] }> = ({ plan }) => {
    return (
        <div>
             <div className="flex justify-end mb-4">
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors">
                    <DownloadIcon className="h-5 w-5" />
                    Download as PDF
                </button>
            </div>
            <div className="space-y-4">
                {plan.map(day => (
                    <div key={day.day} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-start space-x-4">
                        <div className="flex-shrink-0 w-24">
                           <p className="font-bold text-lg text-slate-800">Day {day.day}</p>
                           <p className="text-sm text-slate-500">{day.date}</p>
                        </div>
                        <img src={day.imagePreviewUrl} alt="Preview" className="w-20 h-20 rounded-md object-cover flex-shrink-0"/>
                        <div className="flex-grow">
                            <p className="font-semibold text-slate-700">{day.postType}</p>
                            <p className="text-sm text-slate-600 italic">"{day.captionPreview}..."</p>
                            <p className="text-xs text-blue-600 font-medium mt-1">Best time to post: {day.bestTimeToPost}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GuideTab: React.FC<{ guide: string }> = ({ guide }) => (
    <div className="prose prose-slate max-w-none bg-white p-6 rounded-lg border border-slate-200" dangerouslySetInnerHTML={{ __html: guide }}/>
);

const PromptsTab: React.FC<{ prompts: Record<string, any> }> = ({ prompts }) => (
    <div>
        <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
            {JSON.stringify(prompts, null, 2)}
        </pre>
    </div>
);

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ content, onGenerateAnother }) => {
  const [activeTab, setActiveTab] = useState<Tab>('images');
  const { user, signInWithGoogle } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const isSaved = !!content.id || justSaved;

  const handleSaveCampaign = async () => {
    if (isSaved) return;
    setIsSaving(true);
    let currentUser = user;
    if (!currentUser) {
        currentUser = await signInWithGoogle();
    }
    if (currentUser) {
        try {
            await saveCampaign(currentUser.uid, content);
            setJustSaved(true);
        } catch (error) {
            console.error("Failed to save campaign:", error);
            alert("There was an error saving your campaign.");
        }
    }
    setIsSaving(false);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
        case 'images': return <ImagesTab images={content.images} />;
        case 'captions': return <CaptionsTab captions={content.captions} />;
        case 'plan': return <PlanTab plan={content.campaignPlan} />;
        case 'guide': return <GuideTab guide={content.quickReferenceGuide} />;
        case 'prompts': return <PromptsTab prompts={content.promptLibrary} />;
        default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Your <span className="text-blue-600">{content.appName}</span> Campaign is Ready!</h2>
        <p className="text-slate-600 mt-2">Explore your generated assets below.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 lg:w-1/5">
            <nav className="flex flex-row md:flex-col gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center w-full text-left p-3 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                        <tab.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="flex-grow">{tab.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
        
        <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200 min-h-[60vh]">
                {renderTabContent()}
            </div>
        </div>
      </div>
      
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onGenerateAnother} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-base hover:bg-blue-700 flex items-center gap-2 transition-colors w-full sm:w-auto">
            <SparklesIcon className="h-5 w-5"/>
            Generate Another Campaign
        </button>
        <button 
            onClick={handleSaveCampaign}
            disabled={isSaving || isSaved}
            className={`font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors w-full sm:w-auto
                ${isSaved ? 'bg-green-100 text-green-800 cursor-default' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}
                ${isSaving ? 'bg-slate-100 text-slate-500 cursor-wait' : ''}`}
        >
            <BookmarkIcon className="h-5 w-5"/>
            {isSaving ? 'Saving...' : isSaved ? 'Saved ✓' : 'Save Campaign'}
        </button>
         <button className="bg-white text-slate-700 font-semibold py-3 px-6 rounded-full border border-slate-300 hover:bg-slate-100 flex items-center gap-2 transition-colors w-full sm:w-auto">
            <ShareIcon className="h-5 w-5"/>
            Share Results
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
