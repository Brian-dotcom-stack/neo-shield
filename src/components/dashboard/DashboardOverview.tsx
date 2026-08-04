import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Eye,
  Activity,
  Zap,
  Lock,
  Key,
  CreditCard,
  FileText,
  AlertTriangle,
  Play,
  RotateCw,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { calculateSecurityScore } from '../../lib/utils';
import { VpnManagerModal } from './VpnManagerModal';
import { MalwareScannerModal } from './MalwareScannerModal';
import { IdentityBreachModal } from './IdentityBreachModal';
import { PasswordGeneratorModal } from './PasswordGeneratorModal';
import { SubscriptionManager } from './SubscriptionManager';
import { BillingHistoryTable } from './BillingHistoryTable';

export const DashboardOverview: React.FC = () => {
  const {
    user,
    protections,
    toggleProtectionModule,
    breaches,
    runMalwareScan,
    logout,
    currentIpAddress,
    activeVpnLocation,
  } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'subscription' | 'billing'>('overview');

  // Modal triggers
  const [openVpnModal, setOpenVpnModal] = useState(false);
  const [openScannerModal, setOpenScannerModal] = useState(false);
  const [openBreachModal, setOpenBreachModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  if (!user) return null;

  const unresolvedBreachesCount = breaches.filter((b) => !b.resolved).length;
  const scoreInfo = calculateSecurityScore(protections, user.subscription, unresolvedBreachesCount);

  return (
    <div className="min-h-screen bg-[#020203] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* User Header & Protection Score Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0C0C0E] border border-[#1F1F23] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex items-center gap-4 text-center md:text-left">
          <img
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={user.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase">
                {user.subscription.planId} Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Score Dial Badge */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 bg-[#08080A] p-4 rounded-2xl border border-[#1F1F23]">
            <div className="relative flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="#1F1F23" strokeWidth="6" fill="transparent" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke={scoreInfo.color}
                  strokeWidth="6"
                  strokeDasharray={163}
                  strokeDashoffset={163 - (163 * scoreInfo.score) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute font-mono font-black text-sm text-white">{scoreInfo.score}</span>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Score</div>
              <div className="text-sm font-bold font-mono" style={{ color: scoreInfo.color }}>
                {scoreInfo.level} Defense
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-3 rounded-2xl bg-[#08080A] border border-[#1F1F23] hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-[#1F1F23] pb-3 text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeSubTab === 'overview'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Protection Overview
        </button>

        <button
          onClick={() => setActiveSubTab('subscription')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeSubTab === 'subscription'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Subscription Management
        </button>

        <button
          onClick={() => setActiveSubTab('billing')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeSubTab === 'billing'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Billing History
        </button>
      </div>

      {/* View 1: Overview */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Action Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => setOpenVpnModal(true)}
              className="p-4 rounded-2xl bg-[#0C0C0E] border border-[#1F1F23] hover:border-blue-500/50 text-left space-y-2 transition-all hover:-translate-y-0.5 group"
            >
              <Globe className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Configure VPN</div>
              <div className="text-[10px] text-slate-400">{activeVpnLocation.city} ({activeVpnLocation.pingMs}ms)</div>
            </button>

            <button
              onClick={() => setOpenScannerModal(true)}
              className="p-4 rounded-2xl bg-[#0C0C0E] border border-[#1F1F23] hover:border-purple-500/50 text-left space-y-2 transition-all hover:-translate-y-0.5 group"
            >
              <Activity className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Deep Malware Scan</div>
              <div className="text-[10px] text-slate-400">1.2M files clean</div>
            </button>

            <button
              onClick={() => setOpenBreachModal(true)}
              className="p-4 rounded-2xl bg-[#0C0C0E] border border-[#1F1F23] hover:border-indigo-500/50 text-left space-y-2 transition-all hover:-translate-y-0.5 group"
            >
              <Eye className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Dark Web Breaches</div>
              <div className="text-[10px] text-slate-400">{unresolvedBreachesCount} alerts requiring action</div>
            </button>

            <button
              onClick={() => setOpenPasswordModal(true)}
              className="p-4 rounded-2xl bg-[#0C0C0E] border border-[#1F1F23] hover:border-green-500/50 text-left space-y-2 transition-all hover:-translate-y-0.5 group"
            >
              <Key className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Password Generator</div>
              <div className="text-[10px] text-slate-400">128-bit Military Entropy</div>
            </button>
          </div>

          {/* 4 Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protections.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-[#0C0C0E] border border-[#1F1F23] flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {item.id === 'vpn' && <Globe className="w-5 h-5" />}
                        {item.id === 'identity' && <Eye className="w-5 h-5" />}
                        {item.id === 'malware' && <Activity className="w-5 h-5" />}
                        {item.id === 'antivirus' && <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{item.name}</h3>
                        <span className="text-[10px] text-slate-400 font-mono">Last check: {item.lastCheckTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleProtectionModule(item.id)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                        item.enabled ? 'bg-blue-600' : 'bg-[#08080A]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          item.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>

                  <div className="p-3 rounded-xl bg-[#08080A] border border-[#1F1F23] font-mono text-xs text-slate-300 flex items-center justify-between">
                    <span>{item.statusText}</span>
                    <span className="text-blue-400 font-bold">{item.threatsBlockedCount} blocked</span>
                  </div>
                </div>

                <div className="pt-2">
                  {item.id === 'vpn' && (
                    <button
                      onClick={() => setOpenVpnModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#08080A] hover:bg-[#111114] border border-[#1F1F23] text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Manage VPN Server Endpoints</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  )}

                  {item.id === 'identity' && (
                    <button
                      onClick={() => setOpenBreachModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#08080A] hover:bg-[#111114] border border-[#1F1F23] text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View Dark Web Breach Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                    </button>
                  )}

                  {(item.id === 'malware' || item.id === 'antivirus') && (
                    <button
                      onClick={() => setOpenScannerModal(true)}
                      className="w-full py-2.5 rounded-xl bg-[#08080A] hover:bg-[#111114] border border-[#1F1F23] text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Initiate Full System Scan</span>
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Subscription Management */}
      {activeSubTab === 'subscription' && <SubscriptionManager />}

      {/* View 3: Billing History */}
      {activeSubTab === 'billing' && <BillingHistoryTable />}

      {/* Modals */}
      <VpnManagerModal isOpen={openVpnModal} onClose={() => setOpenVpnModal(false)} />
      <MalwareScannerModal isOpen={openScannerModal} onClose={() => setOpenScannerModal(false)} />
      <IdentityBreachModal isOpen={openBreachModal} onClose={() => setOpenBreachModal(false)} />
      <PasswordGeneratorModal isOpen={openPasswordModal} onClose={() => setOpenPasswordModal(false)} />
    </div>
  );
};
