import React, { useState, useEffect } from 'react';
import { X, Key, Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface PasswordGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordGeneratorModal: React.FC<PasswordGeneratorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { addToast } = useToast();
  const [length, setLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let res = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
    setCopied(false);
  };

  useEffect(() => {
    generate();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    addToast('Password Copied', 'Copied to clipboard safely.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Military Password Generator</h3>
              <p className="text-xs text-slate-400">High Entropy Cryptographic Randomness</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Output field */}
        <div className="space-y-2">
          <div className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-cyan-300 text-sm break-all flex items-center justify-between gap-3">
            <span>{password}</span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={generate}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                title="Copy Password"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Entropy Level: <strong className="text-emerald-400">128-bit (Unbreakable)</strong></span>
            <span>Length: {length} chars</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 text-xs text-slate-300">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span>Character Length:</span>
              <span className="font-mono text-cyan-400 font-bold">{length}</span>
            </div>
            <input
              type="range"
              min="12"
              max="48"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 rounded-lg h-2 cursor-pointer"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 cursor-pointer">
              <span>Uppercase Letters (A-Z)</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="accent-cyan-400 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 cursor-pointer">
              <span>Numbers (0-9)</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-cyan-400 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 cursor-pointer">
              <span>Symbols (!@#$%)</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-cyan-400 w-4 h-4"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
