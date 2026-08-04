import React, { useState } from 'react';
import { X, Globe, Shield, RefreshCw, Zap, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface VpnManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VpnManagerModal: React.FC<VpnManagerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    vpnLocations,
    activeVpnLocation,
    setVpnLocation,
    isVpnConnected,
    toggleVpnConnection,
    currentIpAddress,
  } = useAuth();

  const [protocol, setProtocol] = useState<'wireguard' | 'openvpn'>('wireguard');
  const [killSwitch, setKillSwitch] = useState(true);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">WireGuard VPN Protection Controller</h3>
              <p className="text-xs text-slate-400">65+ High-Speed Server Nodes • RAM-Only Diskless Nodes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Status & Connection Toggle Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isVpnConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                  }`}
                />
                <span className="font-mono text-xs font-bold text-slate-200">
                  {isVpnConnected ? 'PROTECTED & ENCRYPTED' : 'UNPROTECTED — HOME ISP EXPOSED'}
                </span>
              </div>

              <div className="text-xl font-bold text-slate-100 flex items-center justify-center sm:justify-start gap-2">
                <span>{activeVpnLocation.flag}</span>
                <span>{activeVpnLocation.city}, {activeVpnLocation.country}</span>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Virtual IP: <span className="text-cyan-400 font-bold">{currentIpAddress}</span> • Latency: {activeVpnLocation.pingMs}ms
              </div>
            </div>

            <button
              onClick={toggleVpnConnection}
              className={`px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all shrink-0 ${
                isVpnConnected
                  ? 'bg-rose-500/20 border border-rose-500/40 text-rose-200 hover:bg-rose-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/25'
              }`}
            >
              {isVpnConnected ? 'Disconnect VPN' : 'Connect VPN Now'}
            </button>
          </div>

          {/* Settings Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Kill Switch Protection</div>
                <div className="text-slate-400 text-[10px]">Blocks internet if VPN connection drops</div>
              </div>
              <button
                onClick={() => setKillSwitch(!killSwitch)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                  killSwitch ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                    killSwitch ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Protocol Selection</div>
                <div className="text-slate-400 text-[10px]">WireGuard (Recommended) vs OpenVPN UDP</div>
              </div>
              <select
                value={protocol}
                onChange={(e) => setProtocol(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
              >
                <option value="wireguard">WireGuard</option>
                <option value="openvpn">OpenVPN UDP</option>
              </select>
            </div>
          </div>

          {/* Server Locations Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm text-slate-200">Select Global Server Endpoint</h4>
              <span className="text-xs text-slate-500 font-mono">8 Server Clusters Shown</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vpnLocations.map((loc) => {
                const isSelected = activeVpnLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setVpnLocation(loc.id)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500 text-cyan-100 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{loc.flag}</span>
                      <div>
                        <div className="font-semibold text-xs text-slate-100">{loc.city}, {loc.country}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Load: {loc.loadPercentage}% • IP: {loc.ipAddress}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-xs font-mono font-bold text-emerald-400">{loc.pingMs} ms</span>
                      {loc.isP2pSupported && (
                        <span className="block text-[9px] font-mono text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">
                          P2P READY
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
