import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Printer, X, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InvoiceItem } from '../../types';
import { formatCurrency, formatDate } from '../../lib/utils';

export const BillingHistoryTable: React.FC = () => {
  const { invoices, user } = useAuth();
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-100">Billing History & Invoices</h3>
          <p className="text-xs text-slate-400">Tax-compliant receipts and transaction records</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Invoice ID</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Plan Description</th>
                <th className="py-4 px-6">Billing Period</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-200">{inv.invoiceNumber}</td>
                  <td className="py-4 px-6 font-mono">{formatDate(inv.date)}</td>
                  <td className="py-4 px-6 font-medium text-slate-100">{inv.planName}</td>
                  <td className="py-4 px-6 text-slate-400">{inv.billingPeriod}</td>
                  <td className="py-4 px-6 font-mono font-bold text-cyan-400">{formatCurrency(inv.amount)}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{inv.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal Simulation */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Receipt #{selectedInvoice.invoiceNumber}</h3>
                  <p className="text-[11px] text-slate-400">AegisShield Cyber Technologies Inc.</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Customer Email:</span>
                <span className="text-slate-100 font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Date:</span>
                <span className="text-slate-100">{formatDate(selectedInvoice.date)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Description:</span>
                <span className="text-slate-100">{selectedInvoice.planName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Billing Period:</span>
                <span className="text-slate-100">{selectedInvoice.billingPeriod}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-cyan-400">
                <span>Total Amount Paid:</span>
                <span>{formatCurrency(selectedInvoice.amount)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
