
import React, { useState, useCallback, useContext } from 'react';
import { AppView, CampaignData, GeneratedContent } from './types';
import LandingPage from './components/LandingPage';
import Wizard from './components/Wizard';
import GenerationScreen from './components/GenerationScreen';
import ResultsDashboard from './components/ResultsDashboard';
import { generateCampaign } from './services/geminiService';
import { DEFAULT_CAMPAIGN_DATA } from './constants';
import { AuthProvider, useAuth } from './AuthContext';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from './components/icons';

export const CampaignContext = React.createContext<{
  campaignData: CampaignData;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignData>>;
}>({
  campaignData: DEFAULT_CAMPAIGN_DATA,
  setCampaignData: () => {},
});

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [campaignData, setCampaignData] = useState<CampaignData>(DEFAULT_CAMPAIGN_DATA);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { user, signOut } = useAuth();

  const handleStart = () => {
    setCurrentView(AppView.WIZARD);
  };

  const handleGenerationStart = useCallback(async () => {
    setCurrentView(AppView.GENERATING);
    try {
      const content = await generateCampaign(campaignData);
      setGeneratedContent(content);
      setCurrentView(AppView.RESULTS);
    } catch (error) {
      console.error("Failed to generate campaign:", error);
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

  const UserMenu = () => (
    <div className="flex items-center gap-4">
      {user?.photoURL ? (
        <img src={user.photoURL} alt={user.displayName || 'User'} className="h-8 w-8 rounded-full" />
      ) : (
        <UserCircleIcon className="h-8 w-8 text-slate-500" />
      )}
      <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600">
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>
    </div>
  );

  return (
    <CampaignContext.Provider value={{ campaignData, setCampaignData }}>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <header className="p-4 border-b border-slate-200 bg-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">IndieMark AI</h1>
            {user && <UserMenu />}
          </div>
        </header>
        <main>
          {renderContent()}
        </main>
      </div>
    </CampaignContext.Provider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
