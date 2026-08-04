import React, { useState } from 'react';
import {
  Globe,
  Eye,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Zap,
  Server,
  AlertTriangle,
  Play,
  Check,
} from 'lucide-react';
import { ProtectionModuleId } from '../../types';
import { VPN_LOCATIONS } from '../../data/mockData';

export const ProtectionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProtectionModuleId>('vpn');

  // VPN Demo State
  const [selectedLocation, setSelectedLocation] = useState(VPN_LOCATIONS[0]);
  const [vpnConnected, setVpnConnected] = useState(true);

  // Identity Breach Lookup Demo State
  const [emailInput, setEmailInput] = useState('');
  const [isSearchingBreach, setIsSearchingBreach] = useState(false);
  const [breachResult, setBreachResult] = useState<'none' | 'clean' | 'found' | null>(null);

  // Malware Scanner Demo State
  const [isScanningMalware, setIsScanningMalware] = useState(false);
  const [scanPercent, setScanPercent] = useState(0);

  const handleRunBreachCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSearchingBreach(true);
    setBreachResult(null);

    setTimeout(() => {
      setIsSearchingBreach(false);
      if (emailInput.toLowerCase().includes('leak') || emailInput.toLowerCase().includes('hacked')) {
        setBreachResult('found');
      } else {
        setBreachResult('clean');
      }
    }, 1200);
  };

  const handleRunScanDemo = () => {
    if (isScanningMalware) return;
    setIsScanningMalware(true);
    setScanPercent(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsScanningMalware(false);
      }
      setScanPercent(progress);
    }, 300);
  };

  return (
    <section id="protections" className="py-20 bg-[#020203] border-t border-[#1F1F23] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Quad-Shield Defense Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Pillars of Unbreakable Cyber Security
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Eliminate security blind spots. AegisShield unifies military VPN routing, dark web surveillance, real-time ransomware defense, and heuristic antivirus under one dashboard.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('vpn')}
            className={`px-5 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2.5 ${
              activeTab === 'vpn'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                : 'bg-[#08080A] border border-[#1F1F23] text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>1. WireGuard VPN</span>
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`px-5 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2.5 ${
              activeTab === 'identity'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                : 'bg-[#08080A] border border-[#1F1F23] text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>2. Dark Web Identity Monitor</span>
          </button>

          <button
            onClick={() => setActiveTab('malware')}
            className={`px-5 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2.5 ${
              activeTab === 'malware'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'bg-[#08080A] border border-[#1F1F23] text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>3. AI Malware Shield</span>
          </button>

          <button
            onClick={() => setActiveTab('antivirus')}
            className={`px-5 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2.5 ${
              activeTab === 'antivirus'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                : 'bg-[#08080A] border border-[#1F1F23] text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. Heuristic Antivirus</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-[#0C0C0E] border border-[#1F1F23] rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          {activeTab === 'vpn' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 font-mono text-xs font-semibold">
                  NEXT-GEN PROTOCOL: WIREGUARD 256-BIT
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Ultra-Fast VPN Protection with Zero Latency Throttle
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Route your traffic through 65+ global server endpoints. Protect your financial data on public Wi-Fi, bypass ISP bandwidth throttling, and enforce strict Kill Switch protection.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Double NAT & RAM-only diskless servers (data wiped on reboot)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Automatic Kill Switch prevents unencrypted IP leaks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>P2P optimized nodes for high-speed transfers</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Live VPN Mini Simulator */}
              <div className="lg:col-span-6 bg-[#08080A] p-6 rounded-2xl border border-[#1F1F23] space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F1F23] pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-semibold text-slate-200">VPN LOCATION TESTER</span>
                  </div>
                  <button
                    onClick={() => setVpnConnected(!vpnConnected)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-colors ${
                      vpnConnected
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {vpnConnected ? '● CONNECTED' : '○ DISCONNECTED'}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400">Select Global Node Location:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {VPN_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setVpnConnected(true);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          selectedLocation.id === loc.id
                            ? 'bg-blue-600/15 border-blue-500 text-blue-200'
                            : 'bg-[#0C0C0E] border-[#1F1F23] text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{loc.flag}</span>
                          <div>
                            <div className="text-xs font-semibold">{loc.city}</div>
                            <div className="text-[10px] text-slate-400">{loc.country}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-green-400">{loc.pingMs}ms</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] font-mono text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Encrypted IP:</span>
                    <span className="text-blue-400">{vpnConnected ? selectedLocation.ipAddress : 'Exposed (Home ISP)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Latency:</span>
                    <span className="text-green-400">{vpnConnected ? `${selectedLocation.pingMs} ms` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Encryption:</span>
                    <span className="text-slate-200">AES-256-GCM WireGuard</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'identity' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 font-mono text-xs font-semibold">
                  24/7 SURVEILLANCE & $1M INSURANCE
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Dark Web Surveillance & Instant Breach Alerts
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We continuously scan hacker forums, dark web paste sites, and data dumps for compromised passwords, email accounts, SSNs, and credit card numbers.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Monitors up to 10 email addresses & SSN numbers simultaneously</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Instant push & email notifications upon data breach detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>$1,000,000 Identity Theft Stolen Funds Insurance policy included</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Breach Lookup Mini Simulator */}
              <div className="lg:col-span-6 bg-[#08080A] p-6 rounded-2xl border border-[#1F1F23] space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F1F23] pb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-semibold text-slate-200">DARK WEB SCANNER TESTER</span>
                  </div>
                </div>

                <form onSubmit={handleRunBreachCheck} className="space-y-3">
                  <label className="text-xs font-semibold text-slate-400">
                    Test your email address against dark web dumps:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g. user@example.com (try 'hacked@test.com')"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] text-slate-100 text-xs focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSearchingBreach}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs hover:opacity-95 transition-all shrink-0 flex items-center gap-2"
                    >
                      {isSearchingBreach ? (
                        <span>Scanning...</span>
                      ) : (
                        <>
                          <span>Run Scan</span>
                          <Zap className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {breachResult === 'clean' && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs flex items-center gap-3 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <div>
                      <strong className="block font-semibold">No Breaches Found!</strong>
                      <span>This email address was not found in any public dark web database dumps.</span>
                    </div>
                  </div>
                )}

                {breachResult === 'found' && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3 animate-fade-in">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold text-rose-300">1 Breach Detected!</strong>
                      <span>Exposed in 'ShopGlobal 2025 Breach Dump'. Exposed items: Email, Plaintext Password. Change password immediately!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'malware' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 font-mono text-xs font-semibold">
                  AI BEHAVIORAL DETECTOR v4.2
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Real-Time AI Ransomware & Zero-Day Shield
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Traditional antivirus fails against unknown zero-day malware. AegisShield inspects active memory processes in real time, locking down unauthorized file encryption before ransomware strikes.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Instant automatic rollback of unauthorized file encryption attempts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Memory injection & kernel driver level protection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Ultra-low CPU overhead (&lt; 0.5% system impact)</span>
                  </li>
                </ul>
              </div>

              {/* Interactive Malware Scan Tester */}
              <div className="lg:col-span-6 bg-[#08080A] p-6 rounded-2xl border border-[#1F1F23] space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F1F23] pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-semibold text-slate-200">DEEP MALWARE SCAN SIMULATOR</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Scanning Memory & System Files:</span>
                    <span className="text-blue-400 font-mono">{scanPercent}%</span>
                  </div>
                  <div className="w-full bg-[#0C0C0E] rounded-full h-3 border border-[#1F1F23] overflow-hidden p-0.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${scanPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleRunScanDemo}
                  disabled={isScanningMalware}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isScanningMalware ? 'Scanning System...' : 'Simulate Deep Scan'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'antivirus' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 font-mono text-xs font-semibold">
                  HEURISTIC ENGINE & FIREWALL
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Heuristic Antivirus Engine & Web Download Guard
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Automatically scans browser downloads, email attachments, USB drives, and cloud syncing folders. Defends your system against trojans, rootkits, spyware, and keyloggers.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Hourly updated threat definition database feeds</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Automated isolated quarantine vault for suspicious files</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Two-way intelligent firewall blocking unwanted outbound connections</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 bg-[#08080A] p-6 rounded-2xl border border-[#1F1F23] space-y-3 font-mono text-xs">
                <div className="text-slate-400 font-semibold mb-2">Active Heuristic Defense Rules:</div>
                <div className="p-3 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] flex justify-between items-center text-slate-200">
                  <span>[RULE 101] Web Browser Executable Interceptor</span>
                  <span className="text-green-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> ACTIVE</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] flex justify-between items-center text-slate-200">
                  <span>[RULE 102] USB & External Storage Auto-Scan</span>
                  <span className="text-green-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> ACTIVE</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] flex justify-between items-center text-slate-200">
                  <span>[RULE 103] Keylogger & Screen Capture Blocker</span>
                  <span className="text-green-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
