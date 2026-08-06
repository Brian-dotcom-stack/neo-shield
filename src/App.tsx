import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { ProtectionsSection } from './components/landing/ProtectionsSection';
import { SecurityCalculator } from './components/landing/SecurityCalculator';
import { PricingSection } from './components/landing/PricingSection';
import { TrustSection } from './components/landing/TrustSection';
import { FaqSection } from './components/landing/FaqSection';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardOverview } from './components/dashboard/DashboardOverview';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);

// Automatically switch to dashboard if user logs in
  useEffect(() => {
    // Check URL search parameters for Stripe return (success=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      addToast('Payment Successful!', 'Your AegisShield subscription is now active.', 'success');
      setCurrentView('dashboard');
      // Clean query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [addToast]);

return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onNavigateToDashboard={() => setCurrentView('dashboard')}
        onNavigateToLanding={() => setCurrentView('landing')}
        currentView={currentView}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <>
            <HeroSection
              onOpenAuth={() => setAuthModalOpen(true)}
              onExplorePricing={() => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <ProtectionsSection />
            <SecurityCalculator
              onSelectPlan={(planId) => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
<PricingSection onOpenAuth={() => setAuthModalOpen(true)} />
            <TrustSection />
            <FaqSection />
          </>
        ) : (
          <DashboardOverview />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => setCurrentView('dashboard')}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </ToastProvider>
  );
}
