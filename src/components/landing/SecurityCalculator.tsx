import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Lock } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { label: string; scoreImpact: number; note: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'wifi',
    question: 'How frequently do you connect to public Wi-Fi networks (airports, cafes, hotels)?',
    options: [
      { label: 'Daily or multiple times a week', scoreImpact: -30, note: 'High risk of man-in-the-middle packet sniffing without VPN.' },
      { label: 'Occasionally when traveling', scoreImpact: -15, note: 'Moderate exposure risk.' },
      { label: 'Never, strictly home/cellular', scoreImpact: 0, note: 'Low public Wi-Fi risk.' },
    ],
  },
  {
    id: 'passwords',
    question: 'Do you reuse passwords across multiple personal or work accounts?',
    options: [
      { label: 'Yes, I reuse 2-3 master passwords', scoreImpact: -35, note: 'Credential stuffing vulnerability.' },
      { label: 'Only for non-important sites', scoreImpact: -15, note: 'Partial vulnerability.' },
      { label: 'No, every site uses a unique generated password', scoreImpact: 0, note: 'Excellent password hygiene.' },
    ],
  },
  {
    id: 'devices',
    question: 'How many laptops, smartphones, and tablets do you or your family use daily?',
    options: [
      { label: '1 - 2 devices', scoreImpact: 0, note: 'Basic Shield tier appropriate.' },
      { label: '3 - 5 devices', scoreImpact: -10, note: 'Pro Protection tier recommended.' },
      { label: '6+ devices (Household / Family)', scoreImpact: -20, note: 'Family Vault tier required.' },
    ],
  },
];

export const SecurityCalculator: React.FC<{ onSelectPlan: (planId: string) => void }> = ({ onSelectPlan }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, impact: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: impact }));
  };

  const calculateTotalScore = () => {
    let score = 100;
    Object.values(answers).forEach((val) => {
      score += val as number;
    });
    return Math.max(15, Math.min(100, score));
  };

  const isCompleted = Object.keys(answers).length === QUESTIONS.length;

  const score = calculateTotalScore();

  return (
    <section id="calculator" className="py-20 bg-slate-950/90 border-t border-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Cyber Risk Assessment</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Calculate Your Personal Cyber Risk Score
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Answer 3 quick questions about your online habits to evaluate your vulnerability to password leaks, ISP tracking, and malware infection.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
          {!showResults ? (
            <div className="space-y-8">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{q.question}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = answers[q.id] === opt.scoreImpact;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelect(q.id, opt.scoreImpact)}
                          className={`p-4 rounded-xl border text-left text-xs transition-all ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100 font-semibold shadow-md shadow-cyan-500/10'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div>{opt.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  disabled={!isCompleted}
                  onClick={() => setShowResults(true)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Generate Risk Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center py-4 animate-fade-in">
              <div className="inline-flex flex-col items-center p-6 rounded-full bg-slate-950 border-4 border-slate-800 relative">
                <span
                  className={`text-5xl font-black font-mono ${
                    score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'
                  }`}
                >
                  {score}/100
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold mt-1">Estimated Protection Level</span>
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-bold text-slate-100">
                  {score >= 80
                    ? 'Strong Hygiene — Minor Blind Spots'
                    : score >= 50
                    ? 'Moderate Vulnerability — Action Advised'
                    : 'High Vulnerability — Immediate Protection Required'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Based on your answers, your current browsing habits leave your IP address and passwords vulnerable to public Wi-Fi sniffing and credential dumps.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => onSelectPlan(score < 50 ? 'family' : 'pro')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Down Devices with {score < 50 ? 'Family Vault' : 'Pro Defense'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
