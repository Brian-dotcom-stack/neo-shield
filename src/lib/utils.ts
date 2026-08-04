import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ProtectionStatus, UserSubscription } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function calculateSecurityScore(
  protections: ProtectionStatus[],
  subscription: UserSubscription,
  unresolvedBreachesCount = 0
): { score: number; level: 'Critical' | 'Moderate' | 'Strong' | 'Optimal'; color: string } {
  let score = 50; // baseline

  // Subscription bonus
  if (subscription.status === 'active') {
    if (subscription.planId === 'family') score += 20;
    else if (subscription.planId === 'pro') score += 15;
    else score += 10;
  }

  // Active protection modules
  const activeCount = protections.filter((p) => p.enabled).length;
  score += activeCount * 8; // up to 32 points

  // Deductions for unresolved breaches
  score -= unresolvedBreachesCount * 12;

  // Cap between 0 and 100
  score = Math.max(12, Math.min(100, score));

  let level: 'Critical' | 'Moderate' | 'Strong' | 'Optimal' = 'Moderate';
  let color = '#f59e0b'; // amber

  if (score >= 90) {
    level = 'Optimal';
    color = '#10b981'; // emerald
  } else if (score >= 75) {
    level = 'Strong';
    color = '#3b82f6'; // blue
  } else if (score >= 50) {
    level = 'Moderate';
    color = '#f59e0b'; // amber
  } else {
    level = 'Critical';
    color = '#ef4444'; // red
  }

  return { score, level, color };
}

export function generateRandomIp(): string {
  const p1 = Math.floor(Math.random() * 200) + 10;
  const p2 = Math.floor(Math.random() * 255);
  const p3 = Math.floor(Math.random() * 255);
  const p4 = Math.floor(Math.random() * 254) + 1;
  return `${p1}.${p2}.${p3}.${p4}`;
}
