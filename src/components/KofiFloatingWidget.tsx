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
        className="group flex min-h-10 items-center gap-1.5 rounded-full bg-ember px-3.5 py-1.5 text-xs font-bold text-ember-ink shadow-md transition-[background-color,scale] duration-200 hover:scale-105 hover:bg-ember-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 select-none"
      >
        <Coffee className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
        <span>Chai ☕</span>
      </a>
    </aside>
  );
};
