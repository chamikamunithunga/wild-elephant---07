import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Users, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-emerald-500/30">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Conservation Analytics & Machine Learning Insights</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Sri Lanka Conflict & Coexistence Analytics
        </h1>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl leading-relaxed">
          Historical and predictive analytics monitoring Human-Elephant Conflict (HEC) patterns, seasonal herd migration corridors, and early-warning deterrence success across Sri Lankan provinces.
        </p>
      </div>

      {/* KPI Stats Cards (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Early Warning Efficacy</span>
          <div className="text-3xl font-black text-emerald-400">94.8%</div>
          <p className="text-xs text-slate-300">Prevented Crop Intrusions in 2025/2026</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-amber-500/40 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monitored Corridor Herds</span>
          <div className="text-3xl font-black text-amber-400">142 Herds</div>
          <p className="text-xs text-slate-300">Tracked via IoT Sensors & Camera Traps</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-crimson-danger/40 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Annual Conflict Incidents</span>
          <div className="text-3xl font-black text-red-400">-42%</div>
          <p className="text-xs text-slate-300">Reduction in Fatal Collisions Year-over-Year</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Village Defense Units</span>
          <div className="text-3xl font-black text-emerald-300">68 Villages</div>
          <p className="text-xs text-slate-300">Connected to Tusker.AI Early Warnings</p>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Peak Activity Hours Chart (7 Columns) */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border border-jungle-700 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Elephant Crop Intrusion Risk by Time of Day
              </h3>
              <p className="text-xs text-slate-400">Hourly probability based on 5-year wildlife log</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold">Peak: Dusk (18:00 - 22:00)</span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="space-y-3 pt-4">
            {[
              { time: '00:00 - 04:00', risk: 75, label: 'High Night Foraging' },
              { time: '04:00 - 08:00', risk: 35, label: 'Dawn Retreat to Sanctuary' },
              { time: '08:00 - 12:00', risk: 12, label: 'Resting in Forest Canopy' },
              { time: '12:00 - 16:00', risk: 20, label: 'Gathering near Reservoir/Tanks' },
              { time: '16:00 - 20:00', risk: 92, label: 'CRITICAL: Movement into Crops' },
              { time: '20:00 - 24:00', risk: 84, label: 'High Night Conflict Window' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">{item.time}</span>
                  <span className="text-slate-400">{item.label} ({item.risk}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-jungle-950 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.risk > 80 
                        ? 'bg-gradient-to-r from-amber-500 to-crimson-danger' 
                        : item.risk > 40 
                        ? 'bg-gradient-to-r from-emerald-600 to-amber-500' 
                        : 'bg-emerald-600'
                    }`} 
                    style={{ width: `${item.risk}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deterrent Efficacy & Regional Matrix (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mitigation Method Success Rates */}
          <div className="p-6 rounded-2xl glass-panel border border-jungle-700 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Non-Violent Deterrence Success Rates
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-jungle-850/80 border border-jungle-700">
                <span className="font-bold text-slate-200">Acoustic AI Sirens & Strobe Light</span>
                <span className="font-mono font-black text-emerald-400">92.4% Efficacy</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-jungle-850/80 border border-jungle-700">
                <span className="font-bold text-slate-200">Community Beehive Bio-Fences</span>
                <span className="font-mono font-black text-emerald-400">95.1% Efficacy</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-jungle-850/80 border border-jungle-700">
                <span className="font-bold text-slate-200">Chilli-Dipped Rope Barriers</span>
                <span className="font-mono font-black text-emerald-400">81.6% Efficacy</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-jungle-850/80 border border-jungle-700">
                <span className="font-bold text-slate-200">Solar-Powered Electric Fencing</span>
                <span className="font-mono font-black text-amber-400">76.3% Efficacy</span>
              </div>
            </div>
          </div>

          {/* Regional Risk Matrix */}
          <div className="p-6 rounded-2xl glass-panel border border-jungle-700 space-y-3">
            <h3 className="text-base font-bold text-white">Top High-Conflict Districts</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Anuradhapura District', risk: 'CRITICAL', incidents: '142 Logged' },
                { name: 'Polonnaruwa District', risk: 'HIGH', incidents: '98 Logged' },
                { name: 'Ampara & Batticaloa', risk: 'HIGH', incidents: '84 Logged' },
                { name: 'Hambantota District', risk: 'MODERATE', incidents: '62 Logged' },
                { name: 'Kurunegala Border', risk: 'MODERATE', incidents: '45 Logged' },
              ].map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-jungle-950/60 border border-jungle-800">
                  <span className="font-semibold text-slate-200">{reg.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-400">{reg.incidents}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      reg.risk === 'CRITICAL' ? 'bg-crimson-danger/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {reg.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
