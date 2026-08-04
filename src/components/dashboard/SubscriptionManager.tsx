import React, { useState } from 'react';
import { CreditCard, Zap, Check, AlertTriangle, ExternalLink, RefreshCw, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PLANS } from '../../data/mockData';
import { PlanId, BillingCycle } from '../../types';
import { formatDate, formatCurrency } from '../../lib/utils';
import { redirectToCustomerPortal, redirectToCheckout } from '../../lib/stripe';
import { useToast } from '../../context/ToastContext';

export const SubscriptionManager: React.FC = () => {
  const { user, updateSubscriptionPlan, cancelSubscription, reactivateSubscription } = useAuth();
  const { addToast } = useToast();

  const [loadingPortal, setLoadingPortal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!user) return null;

  const sub = user.subscription;
  const currentPlan = PLANS.find((p) => p.id === sub.planId) || PLANS[1];

  const handleOpenPortal = async () => {
    setLoadingPortal(true);
    try {
      const res = await redirectToCustomerPortal(sub.stripeCustomerId);
      if (res.url) {
        if (res.url.includes('demo_portal=true')) {
          addToast('Customer Portal Demo', 'Redirected to simulated Stripe billing settings.', 'info');
        } else {
          window.location.href = res.url;
        }
      }
    } catch (e: any) {
      addToast('Portal Error', e.message, 'error');
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleSwitchPlan = async (targetPlanId: PlanId) => {
    if (targetPlanId === sub.planId) return;

    try {
      const res = await redirectToCheckout({
        planId: targetPlanId,
        billingCycle: sub.billingCycle,
        userEmail: user.email,
        userId: user.id,
      });

      if (res.url && res.url.includes('demo_checkout=true')) {
        await updateSubscriptionPlan(targetPlanId, sub.billingCycle);
      } else if (res.url) {
        window.location.href = res.url;
      }
    } catch (e: any) {
      addToast('Plan Change Error', e.message, 'error');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Current Subscription Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-100">{currentPlan.name}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                sub.status === 'active'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {sub.cancelAtPeriodEnd ? 'Canceling at Period End' : sub.status}
              </span>
            </div>

            <p className="text-xs text-slate-400">{currentPlan.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenPortal}
              disabled={loadingPortal}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>{loadingPortal ? 'Opening Portal...' : 'Manage Stripe Billing & Invoices'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {sub.cancelAtPeriodEnd ? (
              <button
                onClick={reactivateSubscription}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Reactivate Subscription
              </button>
            ) : (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 text-xs transition-colors"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>

        {/* Subscription details matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">Billing Cycle:</span>
            <span className="text-slate-200 font-bold capitalize">{sub.billingCycle}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Recurring Price:</span>
            <span className="text-cyan-400 font-bold">{formatCurrency(sub.priceAmount)}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Next Billing Date:</span>
            <span className="text-slate-200 font-bold">{formatDate(sub.currentPeriodEnd)}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Protected Devices:</span>
            <span className="text-emerald-400 font-bold">{user.deviceCount} of {user.maxDevices} Allowed</span>
          </div>
        </div>
      </div>

      {/* Plan Switcher Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-100">Upgrade or Downgrade Subscription</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === sub.planId;
            const price = sub.billingCycle === 'yearly' ? plan.yearlyPriceTotal : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-500/80 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100">{plan.name}</span>
                    {isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                        CURRENT PLAN
                      </span>
                    )}
                  </div>

                  <div className="text-2xl font-extrabold font-mono text-slate-100">
                    ${price.toFixed(2)}
                    <span className="text-xs font-normal text-slate-400">/{sub.billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {isCurrent ? (
                    <div className="w-full py-2.5 rounded-xl bg-slate-950 text-slate-500 text-xs font-bold text-center border border-slate-800">
                      Active Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSwitchPlan(plan.id)}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      Switch to {plan.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancel Confirmation Dialog Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-100 text-base">Cancel AegisShield Protection?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              If you cancel, your WireGuard VPN encryption and 24/7 dark web breach alerts will remain active until <strong className="text-slate-100">{formatDate(sub.currentPeriodEnd)}</strong>, after which your devices will become unprotected.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Keep Protection Active
              </button>

              <button
                onClick={() => {
                  cancelSubscription();
                  setShowCancelModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold text-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
