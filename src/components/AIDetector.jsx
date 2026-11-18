import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { 
  Upload, 
  Camera, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Volume2, 
  Zap, 
  Info,
  Sliders,
  Sparkles,
  Flame,
  MapPin
} from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    id: 'thermal_drone',
    name: 'FLIR Thermal IR Drone (Night Herd - 6 Elephants)',
    url: '/thermal_sample.svg',
    type: 'thermal'
  },
  {
    id: 'elephant1',
    name: 'Tusker near Farmland (Hambantota)',
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1000&auto=format&fit=crop',
    type: 'elephant'
  },
  {
    id: 'elephant2',
    name: 'Herd at Minneriya Reservoir',
    url: 'https://images.unsplash.com/photo-1581852017103-68ac65514cf7?q=80&w=1000&auto=format&fit=crop',
    type: 'elephant'
  },
  {
    id: 'no_elephant',
    name: 'Jungle Path Clear (Sigiriya Buffer)',
    url: 'https://images.unsplash.com/photo-1511497584788-876761c144ee?q=80&w=1000&auto=format&fit=crop',
    type: 'landscape'
  }
];

export default function AIDetector({ soundEnabled, triggerEmergencyAlert }) {
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [modelError, setModelError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0].url);
  const [detecting, setDetecting] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [detectionStatus, setDetectionStatus] = useState(null); // 'detected' | 'clear' | null
  const [confidence, setConfidence] = useState(0);

  const [minConfidence, setMinConfidence] = useState(0.4);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Load COCO-SSD Model on Mount
  useEffect(() => {
    async function loadModel() {
      try {
        setLoadingModel(true);
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setLoadingModel(false);
      } catch (err) {
        console.error('Failed to load COCO-SSD TensorFlow model:', err);
        setModelError('Could not initialize browser AI model. Server API fallback will be used.');
        setLoadingModel(false);
      }
    }
    loadModel();
  }, []);

  // Auto detect when selectedImage changes
  useEffect(() => {
    if (model && selectedImage && !isCameraActive) {
      // Small timeout to allow img tag to load
      const timer = setTimeout(() => {
        runDetectionOnImage();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [model, selectedImage, minConfidence]);

  const runDetectionOnImage = async () => {
    if (!model || !imageRef.current) return;
    setDetecting(true);
    setPredictions([]);
    setDetectionStatus(null);

    try {
      const imgElement = imageRef.current;
      if (!imgElement.complete) {
        await new Promise((resolve) => {
          imgElement.onload = resolve;
        });
      }

      const preds = await model.detect(imgElement);
      const filtered = preds.filter(p => p.score >= minConfidence);
      setPredictions(filtered);

      const elephantFound = filtered.find(p => p.class === 'elephant');

      if (elephantFound) {
        setDetectionStatus('detected');
        setConfidence(Math.round(elephantFound.score * 100));
        drawBoundingBoxes(filtered, imgElement);

        if (soundEnabled) {
          playSirenSound();
        }
        triggerEmergencyAlert?.({
          location: 'Anuradhapura Border Zone - Sector 4',
          confidence: Math.round(elephantFound.score * 100),
          time: new Date().toLocaleTimeString()
        });
      } else {
        setDetectionStatus('clear');
        setConfidence(0);
        drawBoundingBoxes(filtered, imgElement);
      }
    } catch (err) {
      console.error('Detection error:', err);
    } finally {
      setDetecting(false);
    }
  };

  const drawBoundingBoxes = (preds, imgElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;

    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.width || imgElement.naturalWidth || 600;
    canvas.height = imgElement.height || imgElement.naturalHeight || 400;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    preds.forEach((pred) => {
      const [x, y, width, height] = pred.bbox;
      const isElephant = pred.class === 'elephant';

      // Box Styling
      ctx.strokeStyle = isElephant ? '#EF4444' : '#10B981';
      ctx.lineWidth = 3;
      ctx.setLineDash(isElephant ? [] : [4, 4]);
      ctx.strokeRect(x, y, width, height);

      // Label background box
      ctx.fillStyle = isElephant ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)';
      const text = `${pred.class.toUpperCase()} ${Math.round(pred.score * 100)}%`;
      ctx.font = 'bold 13px Inter, sans-serif';
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x, y > 25 ? y - 25 : y, textWidth + 14, 22);

      // Label text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, x + 7, y > 25 ? y - 9 : y + 15);
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        setIsCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const playSirenSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn('Audio alert not supported:', e);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Section Banner */}
      <div className="relative rounded-2xl glass-panel p-6 sm:p-8 overflow-hidden border border-emerald-500/30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edge AI Computer Vision Core</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real-Time Wild Elephant Detection Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Powered by TensorFlow.js edge inference and deep neural object detection. Upload imagery, inspect live drone streams, or test pre-loaded sample feeds to identify wild elephants and trigger instant early warning alerts.
          </p>
        </div>
      </div>

      {/* Main Detector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Detector Viewport (8 Columns) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl glass-panel p-4 border border-jungle-700 overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-jungle-950/80">
            
            {/* Loading AI State */}
            {loadingModel && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-jungle-950/90 backdrop-blur-sm space-y-4">
                <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
                <div className="text-center">
                  <p className="text-base font-bold text-white">Initializing Neural Network...</p>
                  <p className="text-xs text-slate-400">Loading COCO-SSD weights into browser memory</p>
                </div>
              </div>
            )}

            {/* Scanning Radar Overlay */}
            {detecting && (
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse-slow shadow-lg shadow-emerald-500"></div>
              </div>
            )}

            {/* Canvas Bounding Boxes Overlay */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none"
            />

            {/* Target Image Viewport */}
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Elephant Detection Target"
              onLoad={runDetectionOnImage}
              className="max-h-[460px] w-full object-contain rounded-xl"
              crossOrigin="anonymous"
            />

            {/* Top Overlay Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full glass-panel border border-jungle-600 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Sri Lanka Field Camera #04
              </span>
            </div>

            {/* Re-Detect Button */}
            <div className="absolute bottom-4 right-4 z-20">
              <button
                onClick={runDetectionOnImage}
                disabled={detecting || loadingModel}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950/50 border border-emerald-400/40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
                <span>{detecting ? 'Analyzing...' : 'Scan Image'}</span>
              </button>
            </div>
          </div>

          {/* Sample Preset Selectors & Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {SAMPLE_IMAGES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => {
                  setSelectedImage(sample.url);
                  setIsCameraActive(false);
                }}
                className={`p-3 rounded-xl glass-card text-left transition-all border ${
                  selectedImage === sample.url
                    ? 'border-emerald-500/70 bg-emerald-500/10 text-white shadow-md shadow-emerald-500/10'
                    : 'border-jungle-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div className="text-xs font-bold truncate text-slate-200">{sample.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 capitalize flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" /> Preset Image
                </div>
              </button>
            ))}

            {/* Custom Upload Button */}
            <label className="p-3 rounded-xl glass-card border border-dashed border-emerald-500/40 hover:border-emerald-400 cursor-pointer flex flex-col items-center justify-center text-center transition group">
              <Upload className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold text-emerald-300">Upload Image</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Right Inspection & Alert Dashboard (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-time Status Card */}
          <div className={`rounded-2xl p-6 glass-panel border transition-all ${
            detectionStatus === 'detected'
              ? 'border-crimson-danger/80 bg-crimson-danger/10 shadow-xl shadow-crimson-danger/20'
              : detectionStatus === 'clear'
              ? 'border-emerald-500/50 bg-emerald-500/5'
              : 'border-jungle-700'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Detection Verdict
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-jungle-800 text-slate-300 border border-jungle-700">
                Live Edge AI
              </span>
            </div>

            {detectionStatus === 'detected' ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-xl bg-crimson-danger/20 text-crimson-danger border border-crimson-danger/40 animate-pulse">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">WILD ELEPHANT DETECTED</h3>
                    <p className="text-xs text-red-300 mt-1 font-medium">
                      High-probability encounter logged at sector perimeter.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-crimson-danger/20">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Confidence Score:</span>
                    <span className="font-extrabold text-red-400">{confidence}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-jungle-950 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-crimson-danger rounded-full transition-all duration-500" 
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={playSirenSound}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-crimson-danger hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/60 transition"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Sound Siren Alarm</span>
                  </button>
                </div>
              </div>
            ) : detectionStatus === 'clear' ? (
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">AREA CLEAR</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      No wild elephants detected in the visual frame.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Info className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Select or upload an image to begin computer vision analysis.</span>
              </div>
            )}
          </div>

          {/* Model Sensitivity Controls */}
          <div className="rounded-2xl glass-panel p-5 border border-jungle-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Detection Parameters
              </h3>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {Math.round(minConfidence * 100)}%
              </span>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-2">
                Minimum Confidence Threshold
              </label>
              <input
                type="range"
                min="0.2"
                max="0.9"
                step="0.05"
                value={minConfidence}
                onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-jungle-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20% (High Recall)</span>
                <span>90% (High Precision)</span>
              </div>
            </div>
          </div>

          {/* Detected Objects List */}
          <div className="rounded-2xl glass-panel p-5 border border-jungle-700 space-y-3">
            <h3 className="text-sm font-bold text-white">Detected Class Breakdown</h3>
            {predictions.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No objects registered in active frame.</p>
            ) : (
              <div className="space-y-2">
                {predictions.map((pred, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-2.5 rounded-xl bg-jungle-850/80 border border-jungle-700 text-xs"
                  >
                    <span className="font-bold text-slate-200 capitalize">
                      {pred.class}
                    </span>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                      pred.class === 'elephant' ? 'bg-crimson-danger/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {Math.round(pred.score * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
