import { PlanId, BillingCycle } from '../types';

export interface CheckoutOptions {
  planId: PlanId;
  billingCycle: BillingCycle;
  priceId?: string;
  userEmail?: string;
  userId?: string;
}

/**
 * Resolves the Stripe Price ID for a plan + billing cycle.
 * Uses Vite env vars (import.meta.env) when configured, otherwise returns ''.
 */
export function resolvePriceId(planId: PlanId, billingCycle: BillingCycle): string {
  const env = import.meta.env;
  const key = `${billingCycle === 'yearly' ? 'YEARLY' : 'MONTHLY'}`;
  const priceId = env[`VITE_STRIPE_PRICE_${planId.toUpperCase()}_${key}`] as string | undefined;

  return priceId || '';
}

/**
 * Initiates Stripe Checkout session via server API route
 */
export async function redirectToCheckout(options: CheckoutOptions): Promise<{ url?: string; error?: string }> {
  try {
    const priceId = options.priceId || resolvePriceId(options.planId, options.billingCycle);

    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId: options.userId,
        customerEmail: options.userEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    if (data.url) {
      return { url: data.url };
    }

    return { error: 'No checkout URL returned' };
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return { error: err.message || 'Error redirecting to Stripe Checkout' };
  }
}

/**
 * Initiates Stripe Customer Portal session
 */
export async function redirectToCustomerPortal(customerId?: string): Promise<{ url?: string; error?: string }> {
  try {
    const response = await fetch('/api/stripe/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create portal session');
    }

    if (data.url) {
      return { url: data.url };
    }

    return { error: 'No portal URL returned' };
  } catch (err: any) {
    console.error('Stripe portal error:', err);
    return { error: err.message || 'Error redirecting to Stripe Portal' };
  }
}
