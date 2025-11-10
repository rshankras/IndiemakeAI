import React, { useState, useContext } from 'react';
import { CampaignContext } from '../App';
import { AppCategory, Audience, ContentTone, VisualStyle, TargetPlatform } from '../types';
import { APP_CATEGORIES, AUDIENCE_OPTIONS, CONTENT_TONES, VISUAL_STYLES, TARGET_PLATFORMS } from '../constants';
import { EditIcon } from './icons';

interface WizardProps {
  onGenerate: () => void;
}

const STEPS = [
  { id: 1, name: 'App Basics' },
  { id: 2, name: 'Audience & Positioning' },
  { id: 3, name: 'Content Preferences' },
  { id: 4, name: 'Review & Generate' },
];

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <nav aria-label="Progress">
    <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
      {STEPS.map((step) => (
        <li key={step.name} className="md:flex-1">
          {currentStep >= step.id ? (
            <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
              <span className="text-sm font-medium text-blue-600">{`Step ${step.id}`}</span>
              <span className="text-sm font-medium text-slate-700">{step.name}</span>
            </div>
          ) : (
            <div className="group flex flex-col border-l-4 border-slate-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
              <span className="text-sm font-medium text-slate-500">{`Step ${step.id}`}</span>
              <span className="text-sm font-medium text-slate-500">{step.name}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

// Form elements defined as separate components to avoid re-rendering issues.
const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }> = ({ label, id, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input id={id} {...props} className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-slate-900 ${error ? 'border-red-500' : 'border-slate-300'}`} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }> = ({ label, id, error, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea id={id} {...props} className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-slate-900 ${error ? 'border-red-500' : 'border-slate-300'}`} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }> = ({ label, id, children, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select id={id} {...props} className="block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-900">
            {children}
        </select>
    </div>
);


const Wizard: React.FC<WizardProps> = ({ onGenerate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { campaignData, setCampaignData } = useContext(CampaignContext);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!campaignData.appName.trim()) newErrors.appName = "App name is required.";
    if (!campaignData.keyFeatures.trim()) newErrors.keyFeatures = "Key features are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (campaignData.primaryAudience.length === 0) newErrors.primaryAudience = "Select at least one primary audience.";
    if (!campaignData.uniqueness.trim()) newErrors.uniqueness = "This field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (campaignData.targetPlatforms.length === 0) newErrors.targetPlatforms = "Select at least one target platform.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    else if (currentStep === 3) isValid = validateStep3();
    else isValid = true;
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if (step > 0 && step <= 4) {
      setCurrentStep(step);
    }
  }

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof typeof campaignData) => {
    const options = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value as Audience);
    setCampaignData(prev => ({ ...prev, [field]: options }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, value: TargetPlatform) => {
      setCampaignData(prev => {
          const currentPlatforms = prev.targetPlatforms;
          if (e.target.checked) {
              return { ...prev, targetPlatforms: [...currentPlatforms, value] };
          } else {
              return { ...prev, targetPlatforms: currentPlatforms.filter(p => p !== value) };
          }
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
            <ProgressIndicator currentStep={currentStep} />
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200">
            {currentStep === 1 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Step 1: App Basics</h2>
                    <TextInput label="App Name" id="appName" type="text" value={campaignData.appName} onChange={e => setCampaignData({...campaignData, appName: e.target.value})} error={errors.appName} required />
                    <Select label="App Category" id="appCategory" value={campaignData.appCategory} onChange={e => setCampaignData({...campaignData, appCategory: e.target.value as AppCategory})}>
                        {APP_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </Select>
                    <Textarea label="Key Features (3-5 bullet points)" id="keyFeatures" rows={4} value={campaignData.keyFeatures} onChange={e => setCampaignData({...campaignData, keyFeatures: e.target.value})} error={errors.keyFeatures} required />
                    <TextInput label="App Store Link (optional)" id="appStoreLink" type="url" value={campaignData.appStoreLink} onChange={e => setCampaignData({...campaignData, appStoreLink: e.target.value})} />
                </div>
            )}
            {currentStep === 2 && (
                 <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Step 2: Audience & Positioning</h2>
                    <div>
                        <label htmlFor="primaryAudience" className="block text-sm font-medium text-slate-700 mb-1">Primary Audience (multi-select)</label>
                        <select
                            id="primaryAudience"
                            multiple
                            value={campaignData.primaryAudience}
                            onChange={e => handleMultiSelectChange(e, 'primaryAudience')}
                            className={`block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-40 bg-white text-slate-900 ${errors.primaryAudience ? 'border-red-500' : 'border-slate-300'}`}
                        >
                            {AUDIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        {errors.primaryAudience && <p className="mt-1 text-sm text-red-600">{errors.primaryAudience}</p>}
                    </div>
                    <Textarea label="What makes your app unique?" id="uniqueness" rows={4} value={campaignData.uniqueness} onChange={e => setCampaignData({...campaignData, uniqueness: e.target.value})} error={errors.uniqueness} required />
                    <TextInput label="Main competitor apps (optional)" id="competitors" type="text" value={campaignData.competitors} onChange={e => setCampaignData({...campaignData, competitors: e.target.value})} />
                </div>
            )}
             {currentStep === 3 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Step 3: Content Preferences</h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Content Tone</label>
                        <div className="flex flex-wrap gap-3">
                            {CONTENT_TONES.map(tone => (
                                <label key={tone} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="contentTone" value={tone} checked={campaignData.contentTone === tone} onChange={() => setCampaignData({...campaignData, contentTone: tone})} className="form-radio text-blue-600 focus:ring-blue-500" />
                                    <span className="text-slate-700">{tone}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Visual Style</label>
                        <div className="flex flex-wrap gap-3">
                            {VISUAL_STYLES.map(style => (
                                <label key={style} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="visualStyle" value={style} checked={campaignData.visualStyle === style} onChange={() => setCampaignData({...campaignData, visualStyle: style})} className="form-radio text-blue-600 focus:ring-blue-500" />
                                    <span className="text-slate-700">{style}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Target Platforms</label>
                        <div className="flex flex-wrap gap-4">
                            {TARGET_PLATFORMS.map(platform => (
                                <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" checked={campaignData.targetPlatforms.includes(platform)} onChange={(e) => handleCheckboxChange(e, platform)} className="form-checkbox text-blue-600 rounded focus:ring-blue-500" />
                                    <span className="text-slate-700">{platform}</span>
                                </label>
                            ))}
                        </div>
                        {errors.targetPlatforms && <p className="mt-1 text-sm text-red-600">{errors.targetPlatforms}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Length</label>
                        <div className="flex space-x-4">
                           {[7, 14, 30].map(days => (
                                <label key={days} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="campaignLength" value={days} checked={campaignData.campaignLength === days} onChange={() => setCampaignData({...campaignData, campaignLength: days as 7 | 14 | 30})} className="form-radio text-blue-600 focus:ring-blue-500" />
                                    <span className="text-slate-700">{`${days} days`}</span>
                                </label>
                           ))}
                        </div>
                    </div>
                </div>
            )}
            {currentStep === 4 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Step 4: Review & Generate</h2>
                    <p className="text-slate-600">Please review your information before generating the campaign.</p>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                             <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-700">App Basics</h3>
                                <button onClick={() => goToStep(1)} className="text-sm text-blue-600 hover:underline flex items-center"><EditIcon className="h-4 w-4 mr-1" /> Edit</button>
                            </div>
                            <p><strong>App Name:</strong> {campaignData.appName}</p>
                            <p><strong>Category:</strong> {campaignData.appCategory}</p>
                            <p><strong>Features:</strong> <pre className="whitespace-pre-wrap font-sans text-sm">{campaignData.keyFeatures}</pre></p>
                        </div>
                         <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                             <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-700">Audience & Positioning</h3>
                                <button onClick={() => goToStep(2)} className="text-sm text-blue-600 hover:underline flex items-center"><EditIcon className="h-4 w-4 mr-1" /> Edit</button>
                            </div>
                            <p><strong>Audience:</strong> {campaignData.primaryAudience.join(', ')}</p>
                            <p><strong>Uniqueness:</strong> {campaignData.uniqueness}</p>
                        </div>
                         <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-700">Content Preferences</h3>
                                <button onClick={() => goToStep(3)} className="text-sm text-blue-600 hover:underline flex items-center"><EditIcon className="h-4 w-4 mr-1" /> Edit</button>
                            </div>
                            <p><strong>Tone:</strong> {campaignData.contentTone}</p>
                            <p><strong>Visual Style:</strong> {campaignData.visualStyle}</p>
                            <p><strong>Platforms:</strong> {campaignData.targetPlatforms.join(', ')}</p>
                            <p><strong>Length:</strong> {campaignData.campaignLength} days</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-8 pt-5 border-t border-slate-200">
                <div className="flex justify-between">
                    <button 
                        type="button" 
                        onClick={handleBack} 
                        disabled={currentStep === 1}
                        className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>
                    {currentStep < 4 ? (
                        <button 
                            type="button" 
                            onClick={handleNext}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Next
                        </button>
                    ) : (
                         <button 
                            type="button" 
                            onClick={onGenerate}
                            className="bg-green-600 text-white font-bold py-3 px-6 rounded-md shadow-sm text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Generate My Marketing Campaign
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;