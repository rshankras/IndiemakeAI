import React, { useState } from 'react';
import { BookOpenIcon, CalendarDaysIcon, CheckCircleIcon, ClipboardDocumentListIcon, CodeBracketIcon, PhotoIcon, PresentationChartLineIcon } from './icons';

interface LandingPageProps {
  onStart: () => void;
}

const SAMPLE_TABS = [
    { id: 'images', name: 'Generated Images', icon: PhotoIcon },
    { id: 'captions', name: 'Captions', icon: ClipboardDocumentListIcon },
    { id: 'plan', name: 'Campaign Plan', icon: CalendarDaysIcon },
    { id: 'guide', name: 'Quick Guide', icon: BookOpenIcon },
];


const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [activeSampleTab, setActiveSampleTab] = useState('images');

  return (
    <div>
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Generate a Complete Marketing Campaign for Your App
        </h1>
        <h2 className="text-2xl md:text-4xl font-medium text-slate-700 mt-2 mb-4">
          In 5 Minutes. No Marketing Experience Required.
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Join 1,000+ indie developers using AI to market their apps
        </p>
        
        <div className="flex flex-col items-center justify-center mb-12">
          <button
            onClick={onStart}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Start Generating (It's Free)
          </button>
          <p className="mt-4 text-sm text-slate-500">
            ✓ 3 free campaigns per month ✓ No credit card required
          </p>
        </div>

        {/* Value Props Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20 text-left">
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center text-blue-600 mb-3">
              <PresentationChartLineIcon className="h-7 w-7 mr-3" />
              <h3 className="text-xl font-bold text-slate-800">520+ Page Marketing System</h3>
            </div>
            <p className="text-slate-600">Full campaign strategies to get your app discovered and grow.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center text-blue-600 mb-3">
              <CodeBracketIcon className="h-7 w-7 mr-3" />
              <h3 className="text-xl font-bold text-slate-800">100+ Proven Prompts</h3>
            </div>
            <p className="text-slate-600">Tested on real apps to generate high-quality, relevant content.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center text-blue-600 mb-3">
              <PhotoIcon className="h-7 w-7 mr-3" />
              <h3 className="text-xl font-bold text-slate-800">AI-Generated Images</h3>
            </div>
            <p className="text-slate-600">Imagen 3 powered visuals for your social media posts and ads.</p>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="py-12 md:py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">How It Works</h2>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200"></div>
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-x-8 text-left">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-slate-50 border-2 border-slate-200 rounded-full text-blue-600 font-bold text-2xl mb-4 z-10">1</div>
                <h3 className="font-bold text-slate-800 mb-1">Tell Us About Your App</h3>
                <p className="text-slate-500 text-sm">(~2 min)</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-slate-50 border-2 border-slate-200 rounded-full text-blue-600 font-bold text-2xl mb-4 z-10">2</div>
                <h3 className="font-bold text-slate-800 mb-1">Define Your Audience</h3>
                <p className="text-slate-500 text-sm">(~2 min)</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-slate-50 border-2 border-slate-200 rounded-full text-blue-600 font-bold text-2xl mb-4 z-10">3</div>
                <h3 className="font-bold text-slate-800 mb-1">AI Generates Everything</h3>
                <p className="text-slate-500 text-sm">(~2 min)</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-slate-50 border-2 border-slate-200 rounded-full text-blue-600 font-bold text-2xl mb-4 z-10">4</div>
                <h3 className="font-bold text-slate-800 mb-1">Download & Launch</h3>
                <p className="text-slate-500 text-sm">(Instant)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Outputs Section */}
        <div className="py-12 md:py-20 text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">A Complete Marketing Kit, Generated in Minutes</h2>
          
          <div className="max-w-5xl mx-auto">
              <div className="mb-6 flex justify-center flex-wrap gap-2 sm:gap-4 border-b border-slate-200 pb-4">
                  {SAMPLE_TABS.map(tab => (
                       <button
                          key={tab.id}
                          onClick={() => setActiveSampleTab(tab.id)}
                          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeSampleTab === tab.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                      >
                          <tab.icon className="h-5 w-5" />
                          {tab.name}
                      </button>
                  ))}
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-md min-h-[280px]">
                  {activeSampleTab === 'images' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in">
                          <img src="https://picsum.photos/seed/sample1/400/400" className="rounded-lg object-cover aspect-square shadow-sm" alt="Sample marketing image 1"/>
                          <img src="https://picsum.photos/seed/sample2/400/400" className="rounded-lg object-cover aspect-square shadow-sm" alt="Sample marketing image 2"/>
                          <img src="https://picsum.photos/seed/sample3/400/400" className="rounded-lg object-cover aspect-square shadow-sm" alt="Sample marketing image 3"/>
                          <img src="https://picsum.photos/seed/sample4/400/400" className="rounded-lg object-cover aspect-square shadow-sm" alt="Sample marketing image 4"/>
                      </div>
                  )}
                  {activeSampleTab === 'captions' && (
                      <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">
                          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                             <p className="text-slate-800">"The bill arrives. The awkward part begins... Who paid for what? Who had the extra drink? 😥<br/><br/>We just saved 45 minutes of headache with <strong>[Your App Name]</strong>. Split bills, track IOUs, and keep friendships intact. Download free! #billsplit #dinnerwithfriends"</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                             <p className="text-slate-800">"From chaotic mornings to calm focus. 🧘‍♀️ A 10-minute meditation with <strong>[Your App Name]</strong> can change your entire day. Integrates with Apple Health. #mindfulness #meditation #selfcare"</p>
                          </div>
                      </div>
                  )}
                  {activeSampleTab === 'plan' && (
                      <div className="space-y-3 animate-fade-in max-w-2xl mx-auto">
                          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-md border border-slate-200">
                             <img src="https://picsum.photos/seed/plan1/100/100" className="w-12 h-12 rounded-md object-cover" alt="Plan item 1"/>
                              <div className="flex-grow">
                                  <p className="font-semibold text-slate-800">Day 1: Problem Awareness Post</p>
                                  <p className="text-sm text-slate-500 italic">"The bill arrives. The awkward part begins..."</p>
                              </div>
                              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">9:00 AM</span>
                          </div>
                           <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-md border border-slate-200">
                               <img src="https://picsum.photos/seed/plan2/100/100" className="w-12 h-12 rounded-md object-cover" alt="Plan item 2"/>
                              <div className="flex-grow">
                                  <p className="font-semibold text-slate-800">Day 2: Introduce Solution (Your App)</p>
                                  <p className="text-sm text-slate-500 italic">"There's a better way to handle group expenses..."</p>
                              </div>
                               <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">1:00 PM</span>
                          </div>
                           <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-md border border-slate-200">
                             <img src="https://picsum.photos/seed/plan3/100/100" className="w-12 h-12 rounded-md object-cover" alt="Plan item 3"/>
                              <div className="flex-grow">
                                  <p className="font-semibold text-slate-800">Day 3: Feature Highlight</p>
                                  <p className="text-sm text-slate-500 italic">"Did you know you can track shared subscriptions..."</p>
                              </div>
                              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">11:00 AM</span>
                          </div>
                      </div>
                  )}
                  {activeSampleTab === 'guide' && (
                      <div className="prose prose-sm prose-slate max-w-2xl mx-auto animate-fade-in p-4 bg-slate-50 rounded-md border border-slate-200">
                          <h3>Top 5 Caption Templates</h3>
                          <ul>
                              <li>"Unlock [Benefit] with [App Name]. ✨ Our new [Feature] makes it easier than ever to [Action]. Link in bio!"</li>
                              <li>"Stop [Problem], start [Solution]. We built [App Name] for people who... Get it on the App Store today!"</li>
                          </ul>
                          <h3>Hashtag Cheat Sheet</h3>
                          <p><strong>General:</strong> #IndieDev #AppLaunch #NewApp #Tech<br/>
                             <strong>For [App Category]:</strong> #[CategoryHashtag1] #[CategoryHashtag2]</p>
                      </div>
                  )}
              </div>
          </div>
      </div>

      {/* Pricing Section */}
      <div className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Pricing</h2>
          <p className="text-slate-600 mb-12">Choose the plan that's right for you. Start for free, and upgrade when you're ready to scale.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-lg border border-slate-200 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-800">Free</h3>
                <p className="text-slate-600 mt-2 mb-6">For getting started.</p>
                <p className="text-4xl font-extrabold text-slate-900 mb-6">$0<span className="text-lg font-medium text-slate-500">/month</span></p>
                <ul className="space-y-3 text-slate-600 flex-grow">
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 flex-shrink-0 mt-1"/><span><strong>3</strong> campaigns/month</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 flex-shrink-0 mt-1"/><span><strong>5</strong> images per campaign</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 flex-shrink-0 mt-1"/><span><strong>7-day</strong> campaign plans</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 flex-shrink-0 mt-1"/><span>Basic templates</span></li>
                </ul>
                <button onClick={onStart} className="mt-8 w-full bg-slate-100 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors">
                    Get Started
                </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-white p-8 rounded-lg border-2 border-blue-600 flex flex-col relative">
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Pro</h3>
                <p className="text-slate-600 mt-2 mb-6">For scaling your marketing.</p>
                <p className="text-4xl font-extrabold text-slate-900 mb-6">$9<span className="text-lg font-medium text-slate-500">/month</span></p>
                <ul className="space-y-3 text-slate-600 flex-grow">
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0 mt-1"/><span><strong>Unlimited</strong> campaigns</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0 mt-1"/><span><strong>20</strong> images per campaign</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0 mt-1"/><span><strong>30-day</strong> campaign plans</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0 mt-1"/><span>All templates &amp; styles</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="h-6 w-6 mr-2 text-blue-500 flex-shrink-0 mt-1"/><span>Priority generation</span></li>
                </ul>
                <button className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Go Pro
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* CTA Footer */}
    <div className="bg-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Marketing?</h2>
            <button
              onClick={onStart}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Start Free
            </button>
        </div>
    </div>
  </div>
  );
};

export default LandingPage;