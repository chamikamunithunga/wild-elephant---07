import React, { useState } from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Navigation, 
  Layers, 
  Eye, 
  Radio, 
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';

const HERD_LOCATIONS = [
  {
    id: 'h1',
    name: 'Anuradhapura North Herd',
    region: 'Anuradhapura Border Zone',
    coordinates: [8.3114, 80.4037],
    count: 8,
    risk: 'CRITICAL',
    status: 'Moving toward farmland',
    direction: 'South-West (1.2 km from village)',
    lastSeen: '8 mins ago',
    details: 'Matriarch herd spotted crossing electric fence perimeter near Mahawilachchiya. Forest rangers dispatched.'
  },
  {
    id: 'h2',
    name: 'Minneriya Gathering Group',
    region: 'Minneriya National Park Tank',
    coordinates: [8.0333, 80.8333],
    count: 38,
    risk: 'SAFE',
    status: 'Grazing in protected tank bed',
    direction: 'Stationary inside park',
    lastSeen: '15 mins ago',
    details: 'Large herd gathering peacefully near water reservoir. Zero conflict risk.'
  },
  {
    id: 'h3',
    name: 'Polonnaruwa Rice Belt Patrol',
    region: 'Kaduruwela Agricultural Belt',
    coordinates: [7.9403, 81.0188],
    count: 5,
    risk: 'WARNING',
    status: 'Approaching paddy fields',
    direction: 'East (800m from irrigation canal)',
    lastSeen: '3 mins ago',
    details: 'Single bull and young adults foraging along railway track corridor.'
  },
  {
    id: 'h4',
    name: 'Udawalawe Border Defense Corridor',
    region: 'Thanamalwila - Udawalawe Boundary',
    coordinates: [6.4389, 80.8986],
    count: 12,
    risk: 'CRITICAL',
    status: 'Crossing main arterial road',
    direction: 'North toward sugar plantations',
    lastSeen: 'Just now',
    details: 'High-risk road crossing reported. Automatic acoustic deterrent activated.'
  },
  {
    id: 'h5',
    name: 'Sigiriya Forest Buffer Herd',
    region: 'Inamaluwa Reserve Boundary',
    coordinates: [7.9570, 80.7600],
    count: 4,
    risk: 'WARNING',
    status: 'Moving along sanctuary buffer',
    direction: 'Westward trail',
    lastSeen: '22 mins ago',
    details: 'Herds moving peacefully through buffer forest zone. Local alert issued.'
  },
  {
    id: 'h6',
    name: 'Hambantota Southern Tusker',
    region: 'Mattala Buffer Zone',
    coordinates: [6.2844, 81.1211],
    count: 2,
    risk: 'CRITICAL',
    status: 'Lone Tusker near solar farm',
    direction: 'South toward village boundary',
    lastSeen: '5 mins ago',
    details: 'Solitary bull elephant identified. High alert for sugarcane farmers.'
  }
];

export default function InteractiveMap() {
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [activeHerd, setActiveHerd] = useState(HERD_LOCATIONS[0]);

  const filteredHerds = HERD_LOCATIONS.filter(h => {
    if (selectedRisk === 'ALL') return true;
    return h.risk === selectedRisk;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-emerald-500/30">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
            <span>GIS Satellite & Drone Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sri Lanka Coexistence GIS Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Live telemetry tracking of wild elephant herds, migration corridors, and high-risk human settlement buffers across Sri Lanka.
          </p>
        </div>

        {/* Filter Pill Buttons */}
        <div className="flex items-center space-x-2 glass-panel p-1.5 rounded-xl border border-jungle-700">
          {['ALL', 'CRITICAL', 'WARNING', 'SAFE'].map((risk) => (
            <button
              key={risk}
              onClick={() => setSelectedRisk(risk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRisk === risk
                  ? risk === 'CRITICAL'
                    ? 'bg-crimson-danger text-white shadow-md shadow-red-900/40'
                    : risk === 'WARNING'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-900/40'
                    : risk === 'SAFE'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-jungle-800'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main GIS Map Viewport (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl glass-panel border border-jungle-700 overflow-hidden h-[500px] bg-jungle-950 flex flex-col">
            
            {/* Visual Radar Overlay Effect */}
            <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 glass-panel px-3 py-1.5 rounded-full border border-jungle-600 text-xs text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono text-[11px] text-emerald-400">TELEMETRY ACTIVE (6 SIGHTINGS)</span>
            </div>

            {/* Interactive Grid Map Simulation */}
            <div className="relative w-full h-full bg-slate-950/80 overflow-hidden flex items-center justify-center p-4">
              
              {/* Map Background Grid Lines */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #10B981 1px, transparent 1px), linear-gradient(to right, #1E2C24 1px, transparent 1px), linear-gradient(to bottom, #1E2C24 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              ></div>

              {/* Sri Lanka Geographic Contour Silhouette */}
              <div className="relative w-[340px] h-[440px] border border-emerald-500/20 rounded-[45%] bg-emerald-950/20 shadow-2xl shadow-emerald-950/50 flex flex-col items-center justify-between p-8">
                <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">
                  N 7.8731° E 80.7718° (Sri Lanka)
                </span>

                {/* Animated Markers for Herd Locations */}
                {filteredHerds.map((herd) => {
                  const isSelected = activeHerd?.id === herd.id;
                  
                  // Map coordinates to percentage layout inside box
                  const topPercent = Math.min(Math.max(((10 - herd.coordinates[0]) / 4) * 100, 10), 85);
                  const leftPercent = Math.min(Math.max(((herd.coordinates[1] - 79.5) / 2) * 100, 15), 85);

                  return (
                    <div
                      key={herd.id}
                      onClick={() => setActiveHerd(herd)}
                      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                    >
                      {/* Pulse Ring */}
                      <div className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                        herd.risk === 'CRITICAL' ? 'bg-red-500' : herd.risk === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-400'
                      }`}></div>

                      {/* Marker Icon */}
                      <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-transform group-hover:scale-125 shadow-lg ${
                        isSelected 
                          ? 'ring-4 ring-white ring-offset-2 ring-offset-jungle-950 scale-110' 
                          : ''
                      } ${
                        herd.risk === 'CRITICAL'
                          ? 'bg-crimson-danger border-red-300 text-white shadow-red-900/60'
                          : herd.risk === 'WARNING'
                          ? 'bg-amber-500 border-amber-200 text-white shadow-amber-900/60'
                          : 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-900/60'
                      }`}>
                        <span className="text-xs font-black">{herd.count}</span>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 hidden group-hover:flex flex-col items-center z-40 pointer-events-none">
                        <div className="glass-panel px-3 py-1.5 rounded-xl border border-jungle-600 text-xs font-bold text-white whitespace-nowrap shadow-xl">
                          {herd.name} ({herd.risk})
                        </div>
                      </div>
                    </div>
                  );
                })}

                <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">
                  Indian Ocean Corridor
                </span>
              </div>
            </div>

            {/* Map Controls Footer */}
            <div className="p-3 glass-panel border-t border-jungle-700 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-crimson-danger"></span> Critical Buffer</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Caution Corridor</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Protected Reserve</span>
              </div>
              <span className="hidden sm:inline font-mono">Updated: Real-time telemetry feed</span>
            </div>
          </div>
        </div>

        {/* Right Active Herd Details Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          {activeHerd ? (
            <div className="rounded-2xl glass-panel p-6 border border-emerald-500/40 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 ${
                    activeHerd.risk === 'CRITICAL'
                      ? 'bg-crimson-danger/20 text-red-300 border border-red-500/30'
                      : activeHerd.risk === 'WARNING'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {activeHerd.risk} RISK ZONE
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeHerd.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activeHerd.region}</p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">{activeHerd.count}</span>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Elephants</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-jungle-700 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Movement Vector:</span>
                  <span className="font-semibold text-slate-200">{activeHerd.direction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-semibold text-slate-200">{activeHerd.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Telemetry Logged:</span>
                  <span className="font-mono text-emerald-400">{activeHerd.lastSeen}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-jungle-850 border border-jungle-700 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Field Ranger Log</span>
                <p className="text-xs text-slate-300 leading-relaxed">{activeHerd.details}</p>
              </div>

              <button 
                onClick={() => alert(`Broadcasted alert for ${activeHerd.name} to local wildlife rangers.`)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition"
              >
                Dispatch Ranger Alert
              </button>
            </div>
          ) : (
            <div className="rounded-2xl glass-panel p-8 text-center text-slate-400">
              <MapPin className="w-10 h-10 mx-auto text-emerald-400 mb-2 opacity-60" />
              <p>Click any map marker to inspect herd telemetry.</p>
            </div>
          )}

          {/* Sighting List Quick Switcher */}
          <div className="rounded-2xl glass-panel p-5 border border-jungle-700 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" /> Active Sighting Roster ({filteredHerds.length})
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredHerds.map((herd) => (
                <button
                  key={herd.id}
                  onClick={() => setActiveHerd(herd)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition border text-left ${
                    activeHerd?.id === herd.id
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white'
                      : 'bg-jungle-850/60 border-jungle-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold text-slate-200">{herd.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{herd.region}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
