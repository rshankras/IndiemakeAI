
import React, { useState, useEffect } from 'react';

const STATUS_MESSAGES = [
  "Analyzing your app...",
  "Customizing prompts for Gemini...",
  "Generating images with Imagen...",
  "Creating captions and hashtags...",
  "Building your campaign plan...",
  "Finalizing your marketing kit...",
];

const GenerationScreen: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % STATUS_MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-md">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Generating Your Campaign...</h2>
        <div className="h-8">
            <p className="text-lg text-slate-600 transition-opacity duration-500">
                {STATUS_MESSAGES[currentMessageIndex]}
            </p>
        </div>
        <p className="text-sm text-slate-500 mt-8">
          This usually takes 2-3 minutes. Please don't close this page.
        </p>
      </div>
    </div>
  );
};

export default GenerationScreen;
