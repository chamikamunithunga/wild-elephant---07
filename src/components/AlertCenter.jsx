import React, { useState } from 'react';
import { 
  BellRing, 
  PhoneCall, 
  Send, 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Volume2, 
  AlertCircle,
  Camera,
  Radio
} from 'lucide-react';

const INITIAL_ALERTS = [
  {
    id: 'a1',
    title: 'CRITICAL: Herd Entering Paddy Fields - Mahawilachchiya',
    location: 'Anuradhapura District',
    time: '5 mins ago',
    type: 'CRITICAL',
    message: 'Matriarch herd of 8 wild elephants breached electric fence line 4B. Farmers and rangers alerted to deploy non-violent acoustic deterrents.'
  },
  {
    id: 'a2',
    title: 'WARNING: Night Migration Crossing A9 Highway',
    location: 'Habarana Corridor',
    time: '28 mins ago',
    type: 'WARNING',
    message: 'Elephant group crossing main road near milepost 114. Drivers advised to reduce speed to under 30 km/h.'
  },
  {
    id: 'a3',
    title: 'INFO: Scheduled Bio-Fence Maintenance',
    location: 'Udawalawe Buffer Zone',
    time: '2 hours ago',
    type: 'INFO',
    message: 'Community beehive fence testing complete near Thanamalwila. 98% deterrence rate logged.'
  }
];

export default function AlertCenter({ soundEnabled, emergencyEvents = [] }) {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Form State
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('HIGH');
  const [description, setDescription] = useState('');

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!location || !description) return;

    const newAlert = {
      id: Date.now().toString(),
      title: `COMMUNITY REPORT: ${urgency} Priority Sighting`,
      location: location,
      time: 'Just now',
      type: urgency === 'HIGH' ? 'CRITICAL' : 'WARNING',
      message: description
    };

    setAlerts([newAlert, ...alerts]);
    setReportSuccess(true);
    setLocation('');
    setDescription('');

    setTimeout(() => setReportSuccess(false), 4000);
  };

  const playSirenTest = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.7);
    } catch (err) {
      console.warn('Audio siren failed:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-crimson-danger/40 bg-crimson-danger/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-red-500" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-crimson-danger/20 text-red-300 border border-crimson-danger/40 text-xs font-extrabold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
            <span>24/7 Early Warning Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Early Warning & Community Alert System
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Real-time SMS broadcast feed, emergency wildlife hotline connectivity, and rapid community sighting dispatch for Sri Lanka's rural villages.
          </p>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* DWC Wildlife Department */}
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Department of Wildlife</span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">DWC Sri Lanka</h3>
            <p className="text-xs text-slate-400">Wild Elephant Response Unit</p>
          </div>
          <a
            href="tel:1992"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950/40"
          >
            <PhoneCall className="w-4 h-4" />
            <span>1992</span>
          </a>
        </div>

        {/* National Emergency Hotline */}
        <div className="p-5 rounded-2xl glass-panel border border-crimson-danger/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Police Hotline</span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">Sri Lanka Police</h3>
            <p className="text-xs text-slate-400">Emergency Response</p>
          </div>
          <a
            href="tel:119"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-crimson-danger hover:bg-red-600 text-white font-bold text-sm transition shadow-lg shadow-red-950/40"
          >
            <PhoneCall className="w-4 h-4" />
            <span>119</span>
          </a>
        </div>

        {/* Test Siren Audio Button */}
        <div className="p-5 rounded-2xl glass-panel border border-amber-500/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">System Audio</span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">Acoustic Siren</h3>
            <p className="text-xs text-slate-400">Test deterrence siren</p>
          </div>
          <button
            onClick={playSirenTest}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm transition shadow-lg shadow-amber-950/40"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Siren</span>
          </button>
        </div>

      </div>

      {/* Main Grid: Alerts Stream (7 Columns) & Report Form (5 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Alerts Stream List (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-emerald-400" />
              Live Emergency Alerts Stream
            </h2>
            <span className="text-xs text-slate-400 font-mono">Real-time Broadcast</span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-5 rounded-2xl glass-panel border transition-all ${
                  alert.type === 'CRITICAL'
                    ? 'border-crimson-danger/60 bg-crimson-danger/5'
                    : alert.type === 'WARNING'
                    ? 'border-amber-500/50 bg-amber-500/5'
                    : 'border-jungle-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      alert.type === 'CRITICAL'
                        ? 'bg-crimson-danger text-white'
                        : alert.type === 'WARNING'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {alert.type}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" /> {alert.time}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mt-2">{alert.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{alert.message}</p>

                <div className="mt-3 pt-3 border-t border-jungle-700/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {alert.location}
                  </span>
                  <span className="font-semibold text-emerald-400">SMS Sent to 420 Village Phones</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Incident Report Form (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl glass-panel p-6 border border-emerald-500/40 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-400" />
                Report Wild Elephant Sighting
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Directly inform wildlife rangers and nearby villagers of an elephant sighting or crop intrusion.
              </p>
            </div>

            {reportSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Incident report dispatched to DWC Rangers & SMS Broadcast!</span>
              </div>
            )}

            <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Location / Village Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahawilachchiya, Sector 3 Buffer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-jungle-950 border border-jungle-700 text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-jungle-950 border border-jungle-700 text-white focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="HIGH">CRITICAL - Approaching Crop / Homes</option>
                  <option value="MEDIUM">WARNING - Moving along road corridor</option>
                  <option value="LOW">INFO - Resting near jungle stream</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Sighting Details / Herd Estimate *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe herd size, direction of travel, or any damage..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-jungle-950 border border-jungle-700 text-white focus:outline-none focus:border-emerald-500 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition"
              >
                Submit Field Incident Report
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
