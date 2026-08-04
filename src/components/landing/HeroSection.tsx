import React, { useState, useEffect } from 'react';
import { Shield, Lock, Zap, ArrowRight, CheckCircle2, Globe, Activity, Eye, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onOpenAuth: () => void;
  onExplorePricing: () => void;
}

const RECENT_BLOCKED_THREATS = [
  'IP 185.220.101.42 intercepted ransomware payload (SHA-256 matched)',
  'Phishing attempt neutralized on dark web breach lookup',
  'WireGuard tunnel encrypted 14.2 GB sensitive traffic in Zurich',
  'Zero-day memory injection blocked by AI Behavioral Engine',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth, onExplorePricing }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [threatCount, setThreatCount] = useState(14829104);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % RECENT_BLOCKED_THREATS.length);
    }, 4000);

    const threatInterval = setInterval(() => {
      setThreatCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1500);

    return () => {
      clearInterval(tickerInterval);
      clearInterval(threatInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[#020203]">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ticker banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#08080A] border border-[#1F1F23] text-xs font-mono text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-semibold text-white">LIVE DEFENSE:</span>
            <span className="text-slate-300">{RECENT_BLOCKED_THREATS[tickerIndex]}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Next-Gen Cybersecurity Suite 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Military-Grade Defense for Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300">Digital Life.</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              One seamless subscription protecting your family across four critical security vectors: Ultra-fast WireGuard VPN, Dark Web Identity Theft Monitoring, AI Behavioral Malware Defense, and Heuristic Antivirus.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExplorePricing}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-bold text-base hover:bg-slate-200 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Lock className="w-5 h-5 text-black" />
                <span>Get Protected Now</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>

              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0C0C0E] hover:bg-[#111114] border border-[#1F1F23] text-slate-200 font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Try Instant Demo</span>
              </button>
            </div>

            {/* Badges checklist */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Zero-Logs Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Multi-Device Support</span>
              </div>
            </div>
          </div>

          {/* Animated Interactive Shield Widget */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-[#0C0C0E] border border-[#1F1F23] shadow-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Top status bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1F1F23]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-xs text-slate-300 font-semibold">SHIELD SYSTEM ONLINE</span>
                </div>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  AES-256 ACTIVE
                </span>
              </div>

              {/* Central Shield Hologram */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                <div className="relative p-6 rounded-full bg-gradient-to-b from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
                  <Shield className="w-20 h-20 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping opacity-25 pointer-events-none" />
                </div>

                <div className="mt-6 text-center">
                  <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {threatCount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                    Threats Intercepted Worldwide Today
                  </div>
                </div>
              </div>

              {/* Live Protection Matrix Mini Status */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#1F1F23] text-xs">
                <div className="p-3 rounded-xl bg-[#08080A] border border-[#1F1F23] flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-slate-300 font-medium">VPN Protection</div>
                    <div className="text-[10px] text-green-400 font-mono">Encrypted (Zurich)</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-[#1F1F23] flex items-center gap-2.5">
                  <Eye className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-slate-300 font-medium">Identity Monitor</div>
                    <div className="text-[10px] text-green-400 font-mono">0 New Leaks</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-[#1F1F23] flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-slate-300 font-medium">Malware Shield</div>
                    <div className="text-[10px] text-green-400 font-mono">AI Scan Active</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08080A] border border-[#1F1F23] flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-slate-300 font-medium">Antivirus Guard</div>
                    <div className="text-[10px] text-green-400 font-mono">v2026 Updated</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
