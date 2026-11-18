import React from 'react';
import { 
  BookOpen, 
  HeartHandshake, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';

export default function ConservationHub() {
  const articles = [
    {
      title: 'Sri Lanka Destroys Record Illegal Ivory Haul',
      source: 'The Guardian',
      date: 'Galle Face Promenade, Colombo',
      url: 'https://www.theguardian.com/environment/2016/jan/26/sri-lanka-destroys-illegal-ivory-haul',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop',
      summary: 'The Sri Lankan government publicly destroyed over 350 illegal elephant tusks fed into a 100-tonne crusher to signal zero tolerance for poachers and wildlife crime.'
    },
    {
      title: "What's Killing Sri Lanka's Iconic Wild Elephants?",
      source: 'BBC News Investigation',
      date: 'Conservation Report',
      url: 'https://www.bbc.com/news/world-asia-68090450',
      image: 'https://images.unsplash.com/photo-1581852017103-68ac65514cf7?q=80&w=600&auto=format&fit=crop',
      summary: 'As farming expands into ancient migratory corridors, food crop raiding leads to escalating conflict. Experts call for technology-driven buffer management.'
    },
    {
      title: 'One Elephant a Day: Sri Lanka Wildlife Conflict Deepens',
      source: 'Mongabay Environmental News',
      date: 'Special Report',
      url: 'https://news.mongabay.com/2023/05/one-elephant-a-day-sri-lanka-wildlife-conflict-deepens-as-death-toll-rises/',
      image: 'https://images.unsplash.com/photo-1511497584788-876761c144ee?q=80&w=600&auto=format&fit=crop',
      summary: 'Nearly half of wild elephant deaths stem from retaliatory human causes. National coexistence plans urge rapid deployment of smart early warning tools.'
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Hero Banner */}
      <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Coexistence & Conservation Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            TUSKER.AI ~ Living in Harmony with Giants
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Sri Lanka is home to over 6,000 wild Asian elephants (Elephas maximus maximus)—a species revered in culture yet vulnerable to habitat fragmentation. Tusker.AI harnesses artificial intelligence to build a sustainable future where human communities and wild elephant herds thrive side-by-side.
          </p>
        </div>
      </div>

      {/* Pillars of Tusker.AI Coexistence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl glass-panel border border-jungle-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">1. Edge AI Surveillance</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time inference via drone camera streams and solar thermal sensors instantly identifies elephant movement vectors across agricultural borders.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-jungle-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">2. Geofenced Deterrence</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Triggers non-violent acoustic warnings, bee-hive bio-fences, and SMS alerts to farmers before herds enter high-risk cultivated zones.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-jungle-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">3. Ethical Coexistence</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Replaces traditional relocation or harmful culling with smart corridor mapping and community-led wildlife stewardship.
          </p>
        </div>

      </div>

      {/* Featured News & Historical Records */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          Conservation News & Field Reports
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div key={idx} className="rounded-2xl glass-panel border border-jungle-700 overflow-hidden flex flex-col hover:border-emerald-500/40 transition">
              <img src={art.image} alt={art.title} className="h-44 w-full object-cover" />
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{art.source}</span>
                  <h3 className="text-base font-bold text-white mt-1 leading-snug">{art.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{art.summary}</p>
                </div>

                <div className="pt-3 border-t border-jungle-700 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{art.date}</span>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
