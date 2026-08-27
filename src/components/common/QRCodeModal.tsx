import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Smartphone,
  X,
  Download,
  Copy,
  Check,
  Share2,
  Camera,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Laptop,
  Layers,
  ArrowRight,
  Wifi
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPayload?: string;
  defaultTitle?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  defaultPayload,
  defaultTitle,
}) => {
  const { userProfile, score360 } = useApp();
  const [activeTab, setActiveTab] = useState<'generate' | 'scan' | 'pwa'>('generate');

  // Payload presets
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
  const [networkIp, setNetworkIp] = useState<string>('');

  const getEffectiveUrl = () => {
    if (networkIp.trim()) {
      const formatted = networkIp.startsWith('http') ? networkIp : `http://${networkIp}:5173`;
      return formatted;
    }
    return currentOrigin;
  };

  const baseUrl = getEffectiveUrl();
  const profilePayload = `${baseUrl}?user=${encodeURIComponent(userProfile.name)}&score=${score360.overallScore}`;
  const mobileDeepLink = `${baseUrl.replace(/\/$/, '')}?mode=mobile`;

  const [qrType, setQrType] = useState<'app' | 'profile' | 'custom'>('app');
  const [customText, setCustomText] = useState<string>(defaultPayload || mobileDeepLink);
  const [fgColor, setFgColor] = useState<string>('#4F46E5');
  const [includeLogo, setIncludeLogo] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const qrContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const getPayload = () => {
    if (qrType === 'app') return mobileDeepLink;
    if (qrType === 'profile') return profilePayload;
    return customText || baseUrl;
  };

  const currentPayload = getPayload();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    if (!qrContainerRef.current) return;
    const svgElement = qrContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `SkillSphere-QR-${qrType}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(`Verified Digital Twin Credential: ${userProfile.name} (Score: ${score360.overallScore}/100 - ${userProfile.dreamCareer})`);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/30">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {defaultTitle || 'Mobile App & QR Code Portal'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Connect Web & Mobile Apps via Interactive QR Code
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-6 pt-3 space-x-2">
          <button
            onClick={() => setActiveTab('generate')}
            className={`pb-3 px-4 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'generate'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Generate QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`pb-3 px-4 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'scan'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scan QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('pwa')}
            className={`pb-3 px-4 text-xs font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'pwa'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App Setup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: GENERATE QR CODE */}
          {activeTab === 'generate' && (
            <div className="space-y-6">
              
              {/* Preset Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setQrType('app')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    qrType === 'app'
                      ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 text-brand-primary'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1 text-brand-primary" />
                  <span className="block text-xs font-bold">Mobile App Launch</span>
                  <span className="block text-[10px] text-slate-500">Scan to open on phone</span>
                </button>

                <button
                  onClick={() => setQrType('profile')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    qrType === 'profile'
                      ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 text-brand-primary'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mb-1 text-purple-600" />
                  <span className="block text-xs font-bold">Digital Skill Twin</span>
                  <span className="block text-[10px] text-slate-500">Share 360° profile badge</span>
                </button>

                <button
                  onClick={() => setQrType('custom')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    qrType === 'custom'
                      ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/20 text-brand-primary'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <ExternalLink className="w-4 h-4 mb-1 text-emerald-600" />
                  <span className="block text-xs font-bold">Custom URL / Text</span>
                  <span className="block text-[10px] text-slate-500">Enter custom link</span>
                </button>
              </div>

              {qrType === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Custom URL or Data Payload
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="https://your-portfolio-or-app.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none"
                  />
                </div>
              )}

              {qrType === 'app' && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-800">
                    <Wifi className="w-4 h-4 text-amber-600" />
                    <span>Local Wi-Fi Network IP helper</span>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-tight">
                    If scanning on mobile phone connected to same Wi-Fi, enter your computer's local IP address below (shown in terminal e.g. <code>192.168.1.5</code>):
                  </p>
                  <input
                    type="text"
                    value={networkIp}
                    onChange={(e) => setNetworkIp(e.target.value)}
                    placeholder="e.g. 192.168.1.5 or http://192.168.1.5:5173"
                    className="w-full px-3 py-1.5 bg-white rounded-xl border border-amber-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {/* QR Render Display Card */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                <div
                  ref={qrContainerRef}
                  className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center relative group"
                >
                  <QRCodeSVG
                    value={currentPayload}
                    size={180}
                    fgColor={fgColor}
                    bgColor="#FFFFFF"
                    level="H"
                    includeMargin={true}
                    imageSettings={
                      includeLogo
                        ? {
                            src: userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                            x: undefined,
                            y: undefined,
                            height: 36,
                            width: 36,
                            excavate: true,
                          }
                        : undefined
                    }
                  />
                  <div className="absolute inset-0 rounded-2xl bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-md">
                      Scan with Phone Camera
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-2">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Live Encrypted QR Code</span>
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {qrType === 'app' && 'Mobile Companion App Access'}
                      {qrType === 'profile' && `Verified Twin Profile (${userProfile.name})`}
                      {qrType === 'custom' && 'Custom Link QR Payload'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 break-all line-clamp-2">
                      {currentPayload}
                    </p>
                  </div>

                  {/* QR Color Customizer */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      QR Theme Color
                    </span>
                    <div className="flex items-center space-x-2">
                      {[
                        { color: '#4F46E5', name: 'Indigo' },
                        { color: '#0F172A', name: 'Slate' },
                        { color: '#10B981', name: 'Emerald' },
                        { color: '#8B5CF6', name: 'Purple' },
                        { color: '#F59E0B', name: 'Amber' },
                      ].map((c) => (
                        <button
                          key={c.color}
                          onClick={() => setFgColor(c.color)}
                          style={{ backgroundColor: c.color }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            fgColor === c.color ? 'scale-125 border-white shadow-md ring-2 ring-brand-primary' : 'border-transparent hover:scale-110'
                          }`}
                          title={c.name}
                        />
                      ))}

                      <label className="ml-3 flex items-center space-x-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLogo}
                          onChange={(e) => setIncludeLogo(e.target.checked)}
                          className="rounded text-brand-primary focus:ring-brand-primary"
                        />
                        <span className="text-[11px] font-semibold">Avatar Badge</span>
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 transition-colors shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copied ? 'Copied!' : 'Copy Payload'}</span>
                    </button>

                    <button
                      onClick={handleDownloadSVG}
                      className="px-3.5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 flex items-center space-x-1.5 transition-colors shadow-md shadow-brand-primary/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download QR SVG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCAN QR CODE */}
          {activeTab === 'scan' && (
            <div className="space-y-6 text-center">
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl border border-slate-800">
                
                {/* Camera Scanner Viewfinder */}
                <div className="relative w-56 h-56 mx-auto rounded-2xl border-2 border-brand-primary/50 overflow-hidden flex items-center justify-center bg-slate-950/80">
                  {isScanning ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent animate-bounce shadow-glow-accent" />
                      <RefreshCw className="w-8 h-8 text-brand-primary animate-spin" />
                      <span className="text-xs font-semibold text-slate-300">Scanning QR code frame...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 space-y-2">
                      <Camera className="w-10 h-10 text-brand-primary/80" />
                      <span className="text-xs font-bold text-slate-300">Target QR code within frame</span>
                    </div>
                  )}

                  {/* Corner Targets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-primary" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-primary" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-primary" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-primary" />
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSimulateScan}
                    disabled={isScanning}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold text-xs shadow-lg hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    {isScanning ? 'Processing QR Signal...' : 'Activate Camera Scanner'}
                  </button>

                  {scannedResult && (
                    <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-left space-y-2 animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                        <Check className="w-4 h-4" />
                        <span>QR Code Decoded Successfully</span>
                      </div>
                      <p className="text-xs text-slate-200 font-mono bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        {scannedResult}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MOBILE APP SETUP */}
          {activeTab === 'pwa' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 border border-brand-primary/20">
                <div className="flex items-center space-x-3 mb-2">
                  <Smartphone className="w-5 h-5 text-brand-primary" />
                  <h3 className="text-sm font-bold text-slate-900">
                    SkillSphere AI Mobile App Ready
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  SkillSphere AI is built as both a high-performance Web Application and a full Mobile Application. Install it on your iPhone, iPad, or Android device to access offline assessments and real-time mentor alerts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* iOS Instructions */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center space-x-2 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]"></span>
                    <span>iOS iPhone / iPad Setup</span>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Open this URL in <strong className="text-slate-800">Safari</strong> browser.</li>
                    <li>Tap the <strong className="text-slate-800">Share</strong> icon at bottom bar.</li>
                    <li>Scroll down and select <strong className="text-brand-primary font-bold">"Add to Home Screen"</strong>.</li>
                    <li>Launch SkillSphere directly from your home screen!</li>
                  </ol>
                </div>

                {/* Android Instructions */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center space-x-2 font-bold text-xs text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">🤖</span>
                    <span>Android Phone & Tablet Setup</span>
                  </div>
                  <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Open this URL in <strong className="text-slate-800">Chrome</strong> browser.</li>
                    <li>Tap the <strong className="text-slate-800">⋮ Menu</strong> in top right.</li>
                    <li>Select <strong className="text-emerald-600 font-bold">"Install app"</strong> or "Add to Home screen".</li>
                    <li>Enjoy full native mobile push & offline mode!</li>
                  </ol>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Layers className="w-5 h-5 text-brand-accent" />
                  <div>
                    <span className="block text-xs font-bold">Native Capacitor Build Available</span>
                    <span className="block text-[11px] text-slate-400">Build native iOS (IPA) or Android (APK) using Capacitor configuration</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-colors"
                >
                  Copy App Link
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>QR & Mobile Engine v2.4 Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
