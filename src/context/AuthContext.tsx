import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserSubscription,
  ProtectionStatus,
  VpnLocation,
  DarkWebBreachItem,
  InvoiceItem,
  PlanId,
  BillingCycle,
  ProtectionModuleId,
} from '../types';
import { INITIAL_PROTECTIONS, VPN_LOCATIONS, SAMPLE_BREACHES, SAMPLE_INVOICES, PLANS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { generateRandomIp } from '../lib/utils';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  protections: ProtectionStatus[];
  vpnLocations: VpnLocation[];
  activeVpnLocation: VpnLocation;
  isVpnConnected: boolean;
  breaches: DarkWebBreachItem[];
  invoices: InvoiceItem[];
  isScanning: boolean;
  scanProgress: number;
  currentIpAddress: string;
  isSupabaseLive: boolean;
  
  // Actions
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (email: string, password?: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  toggleProtectionModule: (id: ProtectionModuleId) => void;
  setVpnLocation: (locationId: string) => void;
  toggleVpnConnection: () => void;
  runMalwareScan: () => Promise<void>;
  resolveBreach: (breachId: string) => void;
  updateSubscriptionPlan: (newPlanId: PlanId, cycle: BillingCycle) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  reactivateSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr_demo_8820',
  email: 'alex.cyber@aegisshield.io',
  fullName: 'Alex Vance',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2025-08-01',
  deviceCount: 3,
  maxDevices: 5,
  subscription: {
    planId: 'pro',
    billingCycle: 'yearly',
    status: 'active',
    currentPeriodEnd: '2027-08-01T00:00:00.000Z',
    cancelAtPeriodEnd: false,
    priceAmount: 95.88,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aegis_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [protections, setProtections] = useState<ProtectionStatus[]>(() => {
    const saved = localStorage.getItem('aegis_protections');
    return saved ? JSON.parse(saved) : INITIAL_PROTECTIONS;
  });
  const [vpnLocations] = useState<VpnLocation[]>(VPN_LOCATIONS);
  const [activeVpnLocation, setActiveVpnLocationState] = useState<VpnLocation>(VPN_LOCATIONS[0]);
  const [isVpnConnected, setIsVpnConnected] = useState<boolean>(true);
  const [breaches, setBreaches] = useState<DarkWebBreachItem[]>(SAMPLE_BREACHES);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(SAMPLE_INVOICES);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [currentIpAddress, setCurrentIpAddress] = useState<string>('185.220.101.42');

  // Save changes to localStorage for local persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('aegis_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aegis_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aegis_protections', JSON.stringify(protections));
  }, [protections]);

  // Sync with Supabase Auth if available
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            fullName: session.user.user_metadata?.full_name || 'Cyber Protection User',
            createdAt: session.user.created_at,
            deviceCount: 2,
            maxDevices: 5,
            subscription: DEMO_USER.subscription,
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            fullName: session.user.user_metadata?.full_name || 'Cyber Protection User',
            createdAt: session.user.created_at,
            deviceCount: 2,
            maxDevices: 5,
            subscription: DEMO_USER.subscription,
          });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          addToast('Authentication Failed', error.message, 'error');
          setLoading(false);
          return false;
        }
      }
      // Demo / Fallback login
      const loggedUser: UserProfile = {
        ...DEMO_USER,
        email,
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      };
      setUser(loggedUser);
      addToast('Welcome Back!', `Signed in as ${email}`, 'success');
      return true;
    } catch (e: any) {
      addToast('Sign in error', e.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password?: string, fullName?: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase && password) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) {
          addToast('Sign up failed', error.message, 'error');
          setLoading(false);
          return false;
        }
      }
      const newUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 8),
        email,
        fullName: fullName || email.split('@')[0],
        createdAt: new Date().toISOString(),
        deviceCount: 1,
        maxDevices: 5,
        subscription: DEMO_USER.subscription,
      };
      setUser(newUser);
      addToast('Account Created!', 'Welcome to AegisShield Defense.', 'success');
      return true;
    } catch (e: any) {
      addToast('Registration failed', e.message, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    addToast('Signed Out', 'You have been logged out safely.', 'info');
  };

  const toggleProtectionModule = (id: ProtectionModuleId) => {
    setProtections((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.enabled;
          addToast(
            `${p.name} ${nextState ? 'Activated' : 'Disabled'}`,
            nextState ? 'Shield engine running smoothly.' : 'Protection is currently paused.',
            nextState ? 'success' : 'warning'
          );
          return {
            ...p,
            enabled: nextState,
            statusText: nextState ? 'Active & Monitored' : 'Disabled by user',
          };
        }
        return p;
      })
    );
  };

  const setVpnLocation = (locationId: string) => {
    const loc = vpnLocations.find((l) => l.id === locationId);
    if (!loc) return;
    setActiveVpnLocationState(loc);
    setCurrentIpAddress(loc.ipAddress);
    setIsVpnConnected(true);
    
    // Update VPN protection text
    setProtections((prev) =>
      prev.map((p) =>
        p.id === 'vpn'
          ? {
              ...p,
              enabled: true,
              statusText: `Connected: ${loc.city}, ${loc.country} (${loc.pingMs}ms)`,
            }
          : p
      )
    );
    addToast('VPN Location Switched', `Tunnel re-routed via ${loc.city}, ${loc.country}`, 'success');
  };

  const toggleVpnConnection = () => {
    setIsVpnConnected((prev) => {
      const next = !prev;
      if (!next) {
        setCurrentIpAddress('192.168.1.100 (Unencrypted Home ISP)');
      } else {
        setCurrentIpAddress(activeVpnLocation.ipAddress);
      }
      setProtections((pList) =>
        pList.map((p) =>
          p.id === 'vpn'
            ? {
                ...p,
                enabled: next,
                statusText: next
                  ? `Connected: ${activeVpnLocation.city}, ${activeVpnLocation.country} (${activeVpnLocation.pingMs}ms)`
                  : 'VPN Tunnel Disconnected (Kill Switch Standby)',
              }
            : p
        )
      );
      addToast(
        next ? 'VPN Protection Active' : 'VPN Disconnected',
        next
          ? `Secured via ${activeVpnLocation.city} endpoint.`
          : 'Traffic is now visible to your local ISP.',
        next ? 'success' : 'warning'
      );
      return next;
    });
  };

  const runMalwareScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);

    addToast('Deep Scan Initiated', 'Scanning memory, registry, and active processes...', 'info');

    return new Promise<void>((resolve) => {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 15) + 5;
        if (current >= 100) {
          current = 100;
          clearInterval(interval);
          setIsScanning(false);
          setScanProgress(100);

          // Update protection scan date & threats blocked
          setProtections((prev) =>
            prev.map((p) =>
              p.id === 'malware' || p.id === 'antivirus'
                ? {
                    ...p,
                    lastCheckTime: 'Just now',
                    threatsBlockedCount: p.threatsBlockedCount + 1,
                  }
                : p
            )
          );

          addToast(
            'System Scan Completed',
            '1,248,910 items verified. 0 active malware threats detected.',
            'success'
          );
          resolve();
        } else {
          setScanProgress(current);
        }
      }, 300);
    });
  };

  const resolveBreach = (breachId: string) => {
    setBreaches((prev) =>
      prev.map((b) => (b.id === breachId ? { ...b, resolved: true } : b))
    );
    addToast('Breach Resolved', 'Credentials updated and marked secure.', 'success');
  };

  const updateSubscriptionPlan = async (newPlanId: PlanId, cycle: BillingCycle) => {
    const selectedPlan = PLANS.find((p) => p.id === newPlanId) || PLANS[1];
    const price = cycle === 'yearly' ? selectedPlan.yearlyPriceTotal : selectedPlan.monthlyPrice;

    if (user) {
      setUser({
        ...user,
        maxDevices: selectedPlan.maxDevices,
        subscription: {
          ...user.subscription,
          planId: newPlanId,
          billingCycle: cycle,
          status: 'active',
          priceAmount: price,
          cancelAtPeriodEnd: false,
        },
      });
    }

    addToast(
      'Plan Updated',
      `Upgraded to ${selectedPlan.name} (${cycle} billing).`,
      'success'
    );
  };

  const cancelSubscription = async () => {
    if (user) {
      setUser({
        ...user,
        subscription: {
          ...user.subscription,
          cancelAtPeriodEnd: true,
        },
      });
    }
    addToast(
      'Subscription Scheduled for Cancellation',
      'Your protection remains active until the current period ends.',
      'warning'
    );
  };

  const reactivateSubscription = async () => {
    if (user) {
      setUser({
        ...user,
        subscription: {
          ...user.subscription,
          cancelAtPeriodEnd: false,
        },
      });
    }
    addToast('Subscription Reactivated', 'Continuous auto-renewal restored.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        protections,
        vpnLocations,
        activeVpnLocation,
        isVpnConnected,
        breaches,
        invoices,
        isScanning,
        scanProgress,
        currentIpAddress,
        isSupabaseLive: isSupabaseConfigured,
        login,
        signup,
        logout,
        toggleProtectionModule,
        setVpnLocation,
        toggleVpnConnection,
        runMalwareScan,
        resolveBreach,
        updateSubscriptionPlan,
        cancelSubscription,
        reactivateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
