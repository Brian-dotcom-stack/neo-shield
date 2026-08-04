import React, { useState } from 'react';
import { Shield, Lock, ExternalLink, Send, Check, Heart, Award } from 'lucide-react';
import { LegalModal } from '../common/LegalModal';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const { addToast } = useToast();
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'soc2' | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast('Subscribed to Cyber Threat Advisories', 'You will receive urgent breach alerts.', 'success');
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm relative overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-100">
                Aegis<span className="text-cyan-400">Shield</span>
              </span>
            </div>

            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Next-generation military-grade digital security platform protecting users worldwide against VPN interception, dark web identity theft, ransomware, and zero-day malware.
            </p>

            {/* Live Infrastructure Pulse */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Global Threat Nodes: 100% Operational (99.9% Uptime)</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 mb-2">Subscribe to Threat Intelligence Updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter security analyst email..."
                  required
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1 shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Products Col */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Protection Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#protections" className="hover:text-cyan-400 transition-colors">WireGuard VPN Protection</a></li>
              <li><a href="#protections" className="hover:text-cyan-400 transition-colors">Identity & Dark Web Monitor</a></li>
              <li><a href="#protections" className="hover:text-cyan-400 transition-colors">AI Behavioral Malware Shield</a></li>
              <li><a href="#protections" className="hover:text-cyan-400 transition-colors">Heuristic Antivirus Engine</a></li>
              <li><a href="#protections" className="hover:text-cyan-400 transition-colors">Military Password Generator</a></li>
            </ul>
          </div>

          {/* Trust & Compliance */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Security Audits</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setLegalType('soc2')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SOC 2 Type II Certified</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalType('privacy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Independent Audit Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalType('privacy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Zero-Logs Court Guarantee
                </button>
              </li>
              <li>
                <span className="text-slate-500">AES-256-GCM Verified</span>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-4">Legal & Privacy</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setLegalType('privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setLegalType('terms')} className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setLegalType('terms')} className="hover:text-cyan-400 transition-colors">
                  Service Level Agreement
                </button>
              </li>
              <li>
                <button onClick={() => setLegalType('privacy')} className="hover:text-cyan-400 transition-colors">
                  GDPR & Swiss Privacy Compliance
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AegisShield Cyber Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>AV-TEST Certified 2026</span>
            <span>Bitdefender Security Partner</span>
            <span>Powered by WireGuard®</span>
          </div>
        </div>
      </div>

      <LegalModal isOpen={Boolean(legalType)} type={legalType} onClose={() => setLegalType(null)} />
    </footer>
  );
};
