import React, { useState } from 'react';
import { X, Eye, AlertTriangle, CheckCircle2, Search, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface IdentityBreachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdentityBreachModal: React.FC<IdentityBreachModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { breaches, resolveBreach, user } = useAuth();
  const [searchEmail, setSearchEmail] = useState(user?.email || '');

  const unresolvedCount = breaches.filter((b) => !b.resolved).length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Dark Web Identity Surveillance</h3>
              <p className="text-xs text-slate-400">24/7 Scanning for Email & SSN Leak Dumps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status summary */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl border ${
                unresolvedCount > 0
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                {unresolvedCount > 0 ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm">
                  {unresolvedCount > 0 ? `${unresolvedCount} Active Breach Alert Require Attention` : 'All Known Leaks Resolved'}
                </h4>
                <p className="text-xs text-slate-400">
                  Monitoring {user?.email || 'monitored user accounts'} across dark web forums.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                $1M Insurance Active
              </span>
            </div>
          </div>

          {/* Breach items list */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-slate-200 uppercase tracking-wider">Detected Dark Web Breach Records</h4>

            <div className="space-y-3">
              {breaches.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all ${
                    item.resolved
                      ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                      : 'bg-slate-900 border-rose-500/30 text-slate-200 shadow-md shadow-rose-500/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-100">{item.sourceName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          item.severity === 'high'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {item.severity} SEVERITY
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 font-mono">
                        Domain: {item.domain} • Breached on: {item.breachDate}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.compromisedData.map((d, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] border border-slate-800">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {item.resolved ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Resolved</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveBreach(item.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md transition-all"
                        >
                          Mark Secured & Change Password
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
