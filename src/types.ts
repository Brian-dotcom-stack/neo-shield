export type ProtectionModuleId = 'vpn' | 'identity' | 'malware' | 'antivirus';

export type PlanId = 'basic' | 'pro' | 'family';

export type BillingCycle = 'monthly' | 'yearly';

export interface UserSubscription {
  planId: PlanId;
  billingCycle: BillingCycle;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: string; // ISO date string
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  priceAmount: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  subscription: UserSubscription;
  deviceCount: number;
  maxDevices: number;
}

export interface ProtectionStatus {
  id: ProtectionModuleId;
  name: string;
  description: string;
  enabled: boolean;
  statusText: string;
  lastCheckTime: string;
  threatsBlockedCount: number;
  health: 'optimal' | 'warning' | 'critical';
}

export interface VpnLocation {
  id: string;
  country: string;
  city: string;
  flag: string;
  pingMs: number;
  loadPercentage: number;
  isP2pSupported: boolean;
  isPremiumOnly: boolean;
  ipAddress: string;
}

export interface DarkWebBreachItem {
  id: string;
  sourceName: string;
  domain: string;
  breachDate: string;
  compromisedData: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  type: 'malware' | 'identity' | 'antivirus' | 'full';
  filesScanned: number;
  threatsFound: number;
  threatsQuarantined: number;
  durationSeconds: number;
  details: string[];
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  planName: string;
  billingPeriod: string;
  pdfUrl?: string;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPriceMonthlyEquivalent: number; // e.g. $7.99/mo billed $95.88 annually
  yearlyPriceTotal: number;
  popular?: boolean;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  features: string[];
  maxDevices: number;
  protectionModules: ProtectionModuleId[];
}
