import React, { useState } from 'react';
import Header from './components/Header';
import VideoDetector from './components/VideoDetector';
import AIDetector from './components/AIDetector';
import InteractiveMap from './components/InteractiveMap';
import AlertCenter from './components/AlertCenter';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ConservationHub from './components/ConservationHub';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('video');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeAlert, setActiveAlert] = useState(null);

  const triggerEmergencyAlert = (alertData) => {
    setActiveAlert(alertData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-jungle-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Global Emergency Alert Banner */}
      {activeAlert && (
        <div className="bg-gradient-to-r from-crimson-danger via-red-600 to-amber-600 px-4 py-2.5 shadow-lg flex items-center justify-between text-white text-xs font-bold z-40 animate-pulse">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-black/30 text-white uppercase text-[10px] tracking-wider">
                EMERGENCY ALERT
              </span>
              <span>
                Wild Elephant detected at <strong>{activeAlert.location}</strong> ({activeAlert.confidence}% Confidence) at {activeAlert.time}!
              </span>
            </div>
            <button
              onClick={() => setActiveAlert(null)}
              className="ml-4 underline hover:text-slate-200 text-[11px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'video' && (
          <VideoDetector 
            soundEnabled={soundEnabled}
            triggerEmergencyAlert={triggerEmergencyAlert}
          />
        )}

        {activeTab === 'detector' && (
          <AIDetector 
            soundEnabled={soundEnabled}
            triggerEmergencyAlert={triggerEmergencyAlert}
          />
        )}

        {activeTab === 'map' && (
          <InteractiveMap />
        )}

        {activeTab === 'alerts' && (
          <AlertCenter soundEnabled={soundEnabled} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'conservation' && (
          <ConservationHub />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
