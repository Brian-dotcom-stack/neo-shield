import React from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'soc2' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const titles = {
    privacy: 'Privacy Policy & Zero-Logs Guarantee',
    terms: 'Terms of Service & SLA',
    soc2: 'SOC 2 Type II Security Compliance Audit',
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">{titles[type]}</h3>
              <p className="text-xs text-slate-400">Last updated: August 2026 • AegisShield Legal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
          {type === 'privacy' && (
            <>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Strict No-Logs Certified:</strong> AegisShield operates under strict Swiss privacy jurisdiction. We do NOT track, log, or store your browsing activity, IP origin, or DNS queries.
                </span>
              </div>
              <h4 className="font-semibold text-slate-100 pt-2">1. Data Collection Philosophy</h4>
              <p>
                We process only the absolute minimum telemetry required to manage your account and subscription. Your encrypted tunnel payload is never monitored, inspected, or recorded.
              </p>
              <h4 className="font-semibold text-slate-100 pt-2">2. Zero-Knowledge Encryption</h4>
              <p>
                All identity monitoring and password vaults utilize client-side zero-knowledge architecture. Your passwords and sensitive notes are encrypted with your master key before leaving your device.
              </p>
              <h4 className="font-semibold text-slate-100 pt-2">3. Third-Party Sharing</h4>
              <p>
                We do not sell, rent, or trade your personal data to third parties under any circumstances. Payment processing is safely delegated to Stripe.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-semibold text-slate-100">1. Acceptance of Terms</h4>
              <p>
                By creating an account or subscribing to AegisShield Defense services, you agree to comply with all applicable cybersecurity and software usage guidelines.
              </p>
              <h4 className="font-semibold text-slate-100 pt-2">2. 99.9% Uptime SLA</h4>
              <p>
                We guarantee 99.9% operational uptime across all high-speed WireGuard VPN server nodes and real-time malware threat intelligence feeds.
              </p>
              <h4 className="font-semibold text-slate-100 pt-2">3. Subscription & 30-Day Money-Back Guarantee</h4>
              <p>
                Subscriptions auto-renew according to your chosen cycle (monthly or yearly). You may cancel at any time directly through your Customer Portal. New subscribers are entitled to a 100% refund within 30 days.
              </p>
            </>
          )}

          {type === 'soc2' && (
            <>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-3">
                <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Audit Statement:</strong> AegisShield has successfully completed the SOC 2 Type II independent audit conducted by KPMG Cyber Security Services, verifying strict compliance with security, availability, and confidentiality trust principles.
                </div>
              </div>
              <h4 className="font-semibold text-slate-100 pt-2">Security Controls Verified</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>AES-256-GCM End-to-End Encryption in transit and at rest</li>
                <li>Automated penetration testing and vulnerability management</li>
                <li>Multi-factor authentication mandatory across infrastructure access</li>
                <li>Isolated microservice architecture with zero-trust network boundaries</li>
              </ul>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-800 bg-slate-900/40">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
