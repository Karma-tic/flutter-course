import React from 'react';
import { Coffee, Heart, ExternalLink } from 'lucide-react';

export const KofiLessonBanner: React.FC = () => {
  return (
    <aside
      aria-label="Support Karmatix on Ko-fi"
      className="my-8 overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 p-5 sm:p-6 shadow-xs transition-colors dark:border-amber-900/50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Message */}
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
            <Coffee className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              <Heart className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span>Free &amp; Community-Supported</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Enjoyed this lesson? Help keep our courses 100% free and open for everyone.
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Every chai helps cover hosting costs, continuous curriculum updates, and ad-free learning for engineers worldwide.
            </p>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="shrink-0 sm:self-center">
          <a
            href="https://ko-fi.com/karmatix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95"
          >
            <Coffee className="h-4 w-4" />
            <span>Buy me a chai ☕</span>
            <ExternalLink className="h-3 w-3 opacity-80" />
          </a>
        </div>
      </div>
    </aside>
  );
};
