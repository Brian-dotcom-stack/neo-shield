import React from 'react';
import { ShieldCheck, Star, Award, Lock, CheckCircle2, UserCheck } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus Thorne',
    role: 'Lead Security Auditor @ FinTech Corp',
    comment:
      'AegisShield replaced three separate subscriptions for my family. The WireGuard VPN latency in Zurich is practically zero, and dark web monitoring caught an exposed credential within hours.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Cybersecurity Researcher',
    comment:
      'The zero-knowledge password vault and ransomware rollback engine give me complete peace of mind when connected to untrusted public networks across Europe.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'David Chen',
    role: 'Senior DevOps Specialist',
    comment:
      'Clean UI, no bloated adware, and native WireGuard support. The 10-device Family Vault plan easily covers all our iPhones, MacBooks, and Android devices.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Bar */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div className="space-y-1">
              <div className="flex justify-center text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-lg font-bold text-slate-100 font-mono">4.9 / 5.0</div>
              <div className="text-xs text-slate-400">50,000+ Active Subscribers</div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-center text-cyan-400 mb-1">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-slate-100">AV-TEST Certified</div>
              <div className="text-xs text-slate-400">100% Protection Rating 2026</div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-center text-purple-400 mb-1">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-slate-100">Zero-Logs Certified</div>
              <div className="text-xs text-slate-400">Swiss Jurisdiction Audit</div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-center text-emerald-400 mb-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-slate-100">99.99% Uptime</div>
              <div className="text-xs text-slate-400">Global Server Infrastructure</div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Trusted by Security Engineers & Families Worldwide
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Read verified feedback from cybersecurity professionals who rely on AegisShield daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-xs font-bold text-slate-200">{rev.name}</div>
                  <div className="text-[10px] text-slate-400">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
