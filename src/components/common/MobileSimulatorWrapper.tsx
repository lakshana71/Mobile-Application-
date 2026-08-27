import React, { useState } from 'react';
import { Smartphone, Laptop, Battery, Wifi, Signal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileSimulatorWrapperProps {
  children: React.ReactNode;
}

export const MobileSimulatorWrapper: React.FC<MobileSimulatorWrapperProps> = ({ children }) => {
  const { viewMode, setViewMode } = useApp();
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'android'>('iphone');

  if (viewMode !== 'simulator') {
    return <>{children}</>;
  }

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 flex flex-col items-center justify-start select-none">
      
      {/* Control Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-3 px-5 rounded-2xl shadow-2xl max-w-2xl w-full text-white text-xs">
        
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">Mobile Application Simulator</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Device Model Switch */}
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setDeviceModel('iphone')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                deviceModel === 'iphone' ? 'bg-brand-primary text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              iPhone 16 Pro
            </button>
            <button
              onClick={() => setDeviceModel('android')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                deviceModel === 'android' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Android Pixel 9
            </button>
          </div>


          {/* Switch Back to Web View */}
          <button
            onClick={() => setViewMode('web')}
            className="p-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <Laptop className="w-3.5 h-3.5 text-brand-accent" />
            <span>Web Desktop</span>
          </button>
        </div>

      </div>

      {/* Smartphone Mockup Frame Container */}
      <div className="relative transition-all duration-300">
        
        {/* Device Outer Frame Bezel */}
        <div
          className={`relative mx-auto rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 transition-all duration-300 ${
            deviceModel === 'iphone'
              ? 'bg-slate-900 border-slate-700/80 w-[385px] sm:w-[410px] h-[820px]'
              : 'bg-slate-900 border-emerald-950/80 w-[385px] sm:w-[410px] h-[820px]'
          }`}
        >
          {/* Side Buttons Visual Mockup */}
          <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-md" />
          <div className="absolute -left-[7px] top-42 w-[3px] h-12 bg-slate-700 rounded-l-md" />
          <div className="absolute -left-[7px] top-58 w-[3px] h-12 bg-slate-700 rounded-l-md" />
          <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-slate-700 rounded-r-md" />

          {/* Screen Display Container */}
          <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden flex flex-col relative border border-slate-800/20 shadow-inner">
            
            {/* Native Mobile Status Bar */}
            <div className="bg-slate-900 text-white px-6 pt-2 pb-1.5 flex items-center justify-between z-50 text-[11px] font-semibold select-none">
              <span className="font-bold">{currentTime}</span>
              
              {/* Dynamic Island / Camera Hole Notch */}
              <div className="flex items-center space-x-2">
                {deviceModel === 'iphone' ? (
                  <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 space-x-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>
                ) : (
                  <div className="w-3 h-3 bg-black rounded-full border border-slate-800" />
                )}
              </div>

              <div className="flex items-center space-x-1.5 text-slate-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Simulated App Viewport Scroll Area */}
            <div className="flex-1 overflow-y-auto relative bg-[#F7F9FC]">
              {children}
            </div>

            {/* Mobile Home Bar / Gesture Indicator */}
            <div className="bg-slate-900 py-1.5 flex items-center justify-center z-50">
              <div className="w-32 h-1 bg-slate-500 rounded-full" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
