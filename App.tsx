
import React, { useState, useCallback } from 'react';
import { AppView, CampaignData, GeneratedContent } from './types';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import GenerationScreen from './components/GenerationScreen';
import ResultsDashboard from './components/ResultsDashboard';
// Removed: import ApiKeyModal from './components/ApiKeyModal';
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
  
  // Removed API Key state and modal state

  const handleStart = () => {
    // Directly go to the wizard, removing the API key modal step
    setCurrentView(AppView.WIZARD);
  };

  // Removed handleApiKeySave function

  const handleGenerationStart = useCallback(async () => {
    setCurrentView(AppView.GENERATING);
    try {
      // Lazy-load the service.
      const { generateCampaign } = await import('./services/geminiService');
      // No longer need to pass the API key.
      const content = await generateCampaign(campaignData);
      setGeneratedContent(content);
      setCurrentView(AppView.RESULTS);
    } catch (error) {
      console.error("Failed to generate campaign:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during generation.";
      // Updated error message to be more generic.
      alert(`There was an error generating the campaign: ${message}\n\nPlease check the console for more details. This could be due to a configuration issue or network problem.`);
      setCurrentView(AppView.WIZARD);
    }
  }, [campaignData]);

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
        {/* Removed ApiKeyModal component from render */}
      </div>
    </CampaignContext.Provider>
  );
};

export default App;
