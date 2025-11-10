import React, { useState } from 'react';
import { GeneratedContent, GeneratedImage, Caption, CampaignDay, HashtagSet } from '../types';
import { PhotoIcon, ClipboardDocumentListIcon, CalendarDaysIcon, BookOpenIcon, CodeBracketIcon, DownloadIcon, ArrowDownTrayIcon, SparklesIcon, XMarkIcon, ChevronDownIcon } from './icons';

const ImageModal: React.FC<{ imageUrl: string, onClose: () => void }> = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity animate-fade-in" onClick={onClose}>
        <div className="relative bg-white rounded-lg p-4 max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-slate-800 hover:bg-slate-200 z-10">
                <XMarkIcon className="h-6 w-6" />
            </button>
            <img src={imageUrl} alt="Enlarged view" className="max-w-full max-h-[85vh] object-contain rounded-md" />
        </div>
    </div>
);

const Section: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode; delay: number }> = ({ icon, title, subtitle, children, delay }) => (
    <section className="animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                {icon}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
                <p className="text-slate-500">{subtitle}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
            {children}
        </div>
    </section>
);

const Accordion: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-semibold text-slate-700">{title}</span>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-lg">
                    {children}
                </div>
            )}
        </div>
    );
};


const ResultsDashboard: React.FC<{ content: GeneratedContent; onGenerateAnother: () => void }> = ({ content, onGenerateAnother }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadAll = () => alert("Downloading all campaign assets as a ZIP file... (simulated)");
  const handleDownloadPlan = () => alert("Downloading campaign plan as a PDF... (simulated)");

  return (
    <div className="bg-slate-50 min-h-screen">
        {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Your Marketing Campaign is Ready!</h2>
                <p className="text-xl text-slate-600 mt-2 max-w-2xl mx-auto">Explore, copy, and download your AI-generated assets below.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleDownloadAll} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-base hover:bg-blue-700 flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg">
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                        Download All Assets
                    </button>
                    <button onClick={onGenerateAnother} className="w-full sm:w-auto bg-white text-slate-700 font-bold py-3 px-6 rounded-full text-base hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors border border-slate-300 shadow-sm">
                        <SparklesIcon className="h-5 w-5 text-blue-500"/>
                        Generate Another
                    </button>
                </div>
            </header>

            <div className="space-y-12">
                <Section icon={<PhotoIcon className="h-6 w-6 text-blue-600" />} title="Generated Images" subtitle="Visuals for your social media posts and ads." delay={100}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {content.images.map((image) => (
                            <div key={image.id} className="group relative rounded-lg overflow-hidden shadow-md aspect-square">
                                <img src={image.url} alt={`Generated visual for prompt: ${image.prompt}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center p-2 text-white">
                                    <button onClick={() => setSelectedImage(image.url)} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-90">View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
                
                <Section icon={<CalendarDaysIcon className="h-6 w-6 text-blue-600" />} title="Campaign Plan" subtitle="A day-by-day schedule for your marketing activities." delay={200}>
                    <div className="flex justify-end mb-4">
                        <button onClick={handleDownloadPlan} className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200 flex items-center gap-2 transition-colors text-sm">
                            <DownloadIcon className="h-4 w-4" />
                            Download as PDF
                        </button>
                    </div>
                    <div className="flow-root">
                        <ul className="-mb-8">
                             {content.campaignPlan.map((day, dayIdx) => (
                                <li key={day.day}>
                                    <div className="relative pb-8">
                                         {dayIdx !== content.campaignPlan.length - 1 ? (
                                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                                         ) : null}
                                        <div className="relative flex items-start space-x-3">
                                            <div>
                                                <div className="relative px-1">
                                                    <div className="h-10 w-10 bg-slate-100 rounded-full ring-4 ring-white flex items-center justify-center">
                                                        <span className="font-bold text-blue-600">{day.day}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1 py-1.5">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-slate-800">{day.postType}</p>
                                                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{day.bestTimeToPost}</span>
                                                </div>
                                                <div className="mt-2 flex items-start gap-4">
                                                    <img src={day.imagePreviewUrl} alt="Preview" className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>
                                                    <div>
                                                        <p className="text-sm text-slate-600 italic">"{day.captionPreview}..."</p>
                                                        <p className="text-xs text-slate-500 mt-1">{day.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Section>
                
                <Section icon={<ClipboardDocumentListIcon className="h-6 w-6 text-blue-600" />} title="Captions & Hashtags" subtitle="Ready-to-use text for your posts." delay={300}>
                    <div className="mb-8">
                        <h4 className="font-bold text-lg text-slate-700 mb-3">Captions</h4>
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {content.captions.map(caption => (
                                <div key={caption.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
                                    <p className="text-slate-700 text-sm mb-3">{caption.text}</p>
                                    <button onClick={() => handleCopy(caption.text, caption.id)} className="text-sm font-medium text-blue-600 hover:text-blue-800 self-end">
                                    {copiedId === caption.id ? 'Copied!' : 'Copy Text'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-700 mb-3">Hashtag Sets</h4>
                        {content.hashtagSets.map(set => (
                            <div key={set.useCase} className="mb-3">
                                <p className="text-sm font-semibold text-slate-600 mb-2">{set.useCase}</p>
                                <div className="flex flex-wrap gap-2">
                                    {set.hashtags.map(tag => <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <div className="space-y-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
                     <Accordion title="Quick Reference Guide" icon={<BookOpenIcon className="h-5 w-5 text-slate-500"/>}>
                         <div className="prose prose-sm prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: content.quickReferenceGuide }}/>
                     </Accordion>
                      <Accordion title="Prompt Library" icon={<CodeBracketIcon className="h-5 w-5 text-slate-500"/>}>
                         <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                            {JSON.stringify(content.promptLibrary, null, 2)}
                        </pre>
                     </Accordion>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ResultsDashboard;
