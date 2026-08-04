import React, { useState } from 'react';
import { Shield, Lock, Menu, X, ChevronRight, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLanding: () => void;
  currentView: 'landing' | 'dashboard';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onNavigateToDashboard,
  onNavigateToLanding,
  currentView,
}) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigateToLanding();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F23] bg-[#020203]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onNavigateToLanding}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform duration-300 group-hover:scale-105">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              NEO-SHIELD
            </span>
            <span className="text-[10px] tracking-widest text-blue-400/80 font-mono uppercase -mt-1">
              Cyber Security Suite
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button
            onClick={() => scrollToSection('protections')}
            className="hover:text-white transition-colors"
          >
            Protections
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Risk Calculator</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-400 font-mono font-semibold border border-blue-500/20">
              Interactive
            </span>
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-white transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {currentView === 'landing' ? (
                <button
                  onClick={onNavigateToDashboard}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-slate-200 shadow-lg transition-all flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>User Dashboard</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNavigateToLanding}
                  className="px-4 py-2 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Back to Landing
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-colors shadow-lg flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-black" />
                <span>Get Protected</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1F1F23] bg-[#08080A]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('protections')}
              className="text-left py-1 hover:text-white"
            >
              Protections
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left py-1 hover:text-white flex items-center justify-between"
            >
              <span>Security Calculator</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-1 hover:text-white"
            >
              Pricing Plans
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-1 hover:text-white"
            >
              FAQ
            </button>
          </nav>
          <div className="pt-4 border-t border-[#1F1F23] flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToDashboard();
                }}
                className="w-full py-3 rounded-full bg-white text-black font-bold text-center"
              >
                Open Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0C0C0E] border border-[#1F1F23] text-slate-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-center shadow-lg"
                >
                  Get Protection Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
