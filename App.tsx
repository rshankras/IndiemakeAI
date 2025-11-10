
import React, { useState, useCallback } from 'react';
import { AppView, CampaignData, GeneratedContent } from './types';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import GenerationScreen from './components/GenerationScreen';
import ResultsDashboard from './components/ResultsDashboard';
import ApiKeyModal from './components/ApiKeyModal';
// Removed static import: import { generateCampaign } from './services/geminiService';
import { DEFAULT_CAMPAIGN_DATA } from './constants';

export const CampaignContext = React.createContext<{
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
}>({
  campaignData: DEFAULT_CAMPAIGN_DATA,
  setCampaignData: () => {},
});

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [campaignData, setCampaignData] = useState<CampaignData>(DEFAULT_CAMPAIGN_DATA);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  const handleStart = () => {
    setIsApiKeyModalOpen(true);
  };

  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    setIsApiKeyModalOpen(false);
    setCurrentView(AppView.WIZARD);
  };

  const handleGenerationStart = useCallback(async () => {
    if (!apiKey) {
      alert("API Key is missing. Please restart the process by refreshing the page and entering your key.");
      setCurrentView(AppView.LANDING);
      return;
    }
    setCurrentView(AppView.GENERATING);
    try {
      // Lazy-load the service to prevent startup crashes.
      const { generateCampaign } = await import('./services/geminiService');
      const content = await generateCampaign(campaignData, apiKey);
      setGeneratedContent(content);
      setCurrentView(AppView.RESULTS);
    } catch (error) {
      console.error("Failed to generate campaign:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during generation.";
      alert(`There was an error generating the campaign: ${message}\n\nPlease check the console for more details and try again.`);
      setCurrentView(AppView.WIZARD);
    }
  }, [campaignData, apiKey]);

  const handleGenerateAnother = () => {
    setCampaignData(DEFAULT_CAMPAIGN_DATA);
    setGeneratedContent(null);
    setCurrentView(AppView.WIZARD);
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onStart={handleStart} />;
      case AppView.WIZARD:
        return <Wizard onGenerate={handleGenerationStart} />;
      case AppView.GENERATING:
        return <GenerationScreen />;
      case AppView.RESULTS:
        return generatedContent ? <ResultsDashboard content={generatedContent} onGenerateAnother={handleGenerateAnother} /> : <GenerationScreen />;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <CampaignContext.Provider value={{ campaignData, setCampaignData }}>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <header className="p-4 border-b border-slate-200 bg-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">IndieMark AI</h1>
          </div>
        </header>
        <main>
          {renderContent()}
        </main>
        {isApiKeyModalOpen && (
          <ApiKeyModal 
            onSave={handleApiKeySave} 
            onClose={() => setIsApiKeyModalOpen(false)} 
          />
        )}
      </div>
    </CampaignContext.Provider>
  );
};

export default App;
