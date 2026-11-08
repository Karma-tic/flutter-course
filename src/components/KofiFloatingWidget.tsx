import React from 'react';
import { Coffee } from 'lucide-react';

export const KofiFloatingWidget: React.FC = () => {
  return (
    <aside
      aria-label="Support Karmatix"
      className="fixed bottom-5 right-5 z-40"
    >
      <a
        href="https://ko-fi.com/karmatix"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a chai on Ko-fi (opens in new tab)"
        className="group flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 select-none"
      >
        <Coffee className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
        <span>Chai ☕</span>
      </a>
    </aside>
  );
};
