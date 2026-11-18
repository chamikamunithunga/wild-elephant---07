import React from 'react';
import { ShieldAlert, Radio, Heart, PhoneCall, Download } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-jungle-700 glass-panel bg-jungle-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-extrabold text-white tracking-tight">
                TUSKER<span className="text-emerald-400">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven wild elephant detection, real-time early warnings, and GIS conflict mitigation system for Sri Lanka.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Progressive Web App Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">System Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('video')} className="hover:text-emerald-400 font-bold text-emerald-400 transition">🎥 Video AI Stream</button></li>
              <li><button onClick={() => setActiveTab('detector')} className="hover:text-emerald-400 transition">Image AI Detector</button></li>
              <li><button onClick={() => setActiveTab('map')} className="hover:text-emerald-400 transition">Coexistence GIS Map</button></li>
              <li><button onClick={() => setActiveTab('alerts')} className="hover:text-emerald-400 transition">Early Warning Stream</button></li>
              <li><button onClick={() => setActiveTab('analytics')} className="hover:text-emerald-400 transition">Analytics & Insights</button></li>
              <li><button onClick={() => setActiveTab('conservation')} className="hover:text-emerald-400 transition">Conservation Portal</button></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Emergency Hotlines</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Department of Wildlife: <strong>1992</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>Police Emergency: <strong>119</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Disaster Management: <strong>117</strong></span>
              </li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Technology Stack</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built with React, Vite, Tailwind CSS, TensorFlow.js COCO-SSD edge vision, Node.js Express API, and PWA Service Workers.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-jungle-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TUSKER.AI ~ Sri Lanka Elephant Detection & Conservation System.</p>
          <p className="flex items-center gap-1">
            <span>Fostering Harmony & Coexistence with Giants</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
