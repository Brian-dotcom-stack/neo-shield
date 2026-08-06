import React, { useState } from 'react';
import { Check, Shield, Sparkles, Lock, Zap } from 'lucide-react';
import { PLANS } from '../../data/mockData';
import { BillingCycle, PlanId } from '../../types';
import { redirectToCheckout } from '../../lib/stripe';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface PricingSectionProps {
  onOpenAuth: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAuth }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  const handleSelectPlan = async (planId: PlanId) => {
    setLoadingPlanId(planId);

    try {
      if (user) {
        // Resolve the Stripe Price ID for the selected plan + billing cycle
        const plan = PLANS.find((p) => p.id === planId);
        const priceId =
          billingCycle === 'yearly'
            ? plan?.stripePriceIdYearly
            : plan?.stripePriceIdMonthly;

        // Trigger Stripe Checkout
        const res = await redirectToCheckout({
          planId,
          billingCycle,
          priceId: priceId || undefined,
          userEmail: user.email,
          userId: user.id,
        });

        // Always redirect to the real Stripe Checkout page
        if (res.url) {
          window.location.href = res.url;
        } else {
          addToast('Checkout Error', res.error || 'No checkout URL returned.', 'error');
        }
      } else {
        // Open Auth modal directly
        addToast('Account Required', 'Please sign in or create an account to activate your plan.', 'info');
        onOpenAuth();
      }
    } catch (e: any) {
      addToast('Checkout Error', e.message, 'error');
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#020203] border-t border-[#1F1F23] relative overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span>Transparent Subscription Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Unbeatable Cyber Security. Zero Hidden Fees.
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Choose the subscription plan tailored to your device setup. All plans backed by our 30-day risk-free money-back guarantee.
          </p>

          {/* Billing Toggle (Monthly vs Yearly with 20% discount badge) */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>

            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-8 rounded-full bg-[#08080A] border border-[#1F1F23] p-1 transition-colors focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-transform duration-300 shadow-md ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                Yearly Billing
              </span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 text-[10px] font-bold">
                SAVE ~20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isPopular = plan.popular;
            const price = billingCycle === 'yearly' ? plan.yearlyPriceMonthlyEquivalent : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#08080A] border-2 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.25)] scale-105 z-20'
                    : 'bg-[#0C0C0E] border border-[#1F1F23] hover:border-slate-700'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      Up to {plan.maxDevices} Devices
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6">{plan.tagline}</p>

                  <div className="mb-6 pb-6 border-b border-[#1F1F23]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white font-mono">${price.toFixed(2)}</span>
                      <span className="text-xs text-slate-400 font-medium">/ month</span>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1">
                      {billingCycle === 'yearly'
                        ? `Billed annually at $${plan.yearlyPriceTotal.toFixed(2)} / year`
                        : 'Billed monthly. Cancel anytime.'}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loadingPlanId === plan.id}
                  className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-white text-black hover:bg-slate-200 shadow-lg'
                      : 'bg-[#08080A] hover:bg-[#111114] text-white border border-[#1F1F23]'
                  }`}
                >
                  <Lock className={`w-4 h-4 ${isPopular ? 'text-black' : 'text-blue-400'}`} />
                  <span>
                    {loadingPlanId === plan.id
                      ? 'Redirecting...'
                      : user
                      ? `Select ${plan.name}`
                      : 'Subscribe Now'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Money-Back Seal */}
        <div className="mt-16 p-6 rounded-2xl bg-[#0C0C0E] border border-[#1F1F23] max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 shrink-0">
            <Shield className="w-8 h-8" />
          </div>
          <div className="text-left space-y-1">
            <h4 className="font-bold text-white text-sm">30-Day Unconditional Money-Back Guarantee</h4>
            <p className="text-xs text-slate-400">
              Try AegisShield completely risk-free. If you are not 100% satisfied with our WireGuard speeds or malware protection, contact support within 30 days for an instant full refund.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
