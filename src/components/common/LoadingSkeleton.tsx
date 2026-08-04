import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-slate-800" />
        <div className="w-20 h-6 rounded-full bg-slate-800" />
      </div>
      <div className="h-6 w-3/4 bg-slate-800 rounded" />
      <div className="h-4 w-full bg-slate-800/60 rounded" />
      <div className="h-4 w-5/6 bg-slate-800/60 rounded" />
      <div className="pt-4 flex justify-between items-center">
        <div className="h-8 w-28 bg-slate-800 rounded-lg" />
        <div className="h-8 w-24 bg-slate-800 rounded-lg" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/60 rounded-2xl border border-slate-800/80 p-6 animate-pulse space-y-4">
      <div className="h-6 w-48 bg-slate-800 rounded" />
      <div className="space-y-3 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-3 border-b border-slate-800/50">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-4 w-24 bg-slate-800 rounded" />
            <div className="h-4 w-16 bg-slate-800 rounded" />
            <div className="h-6 w-20 bg-slate-800 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
