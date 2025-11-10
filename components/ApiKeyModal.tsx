
import React, { useState } from 'react';
import { KeyIcon, ExclamationTriangleIcon } from './icons';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full m-4">
        <div className="flex items-center mb-4">
          <KeyIcon className="h-8 w-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-slate-800">Enter Your Gemini API Key</h2>
        </div>
        <p className="text-slate-600 mb-6">
          To generate content, this application needs a Google Gemini API key. Your key is used only in your browser and is never stored on our servers.
        </p>
        
        <div className="mb-6">
          <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 mb-1">Gemini API Key</label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your API key here"
            aria-label="Gemini API Key"
          />
           <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 inline-block">
            Get your API key from Google AI Studio
          </a>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-800">
                        <span className="font-bold">Security Notice:</span> Your API key will be used directly from your browser. Do not use this application in an untrusted environment. For production apps, always use a secure backend proxy.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
