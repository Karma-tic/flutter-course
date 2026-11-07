import React, { useState } from 'react';
import { Lightbulb, Sparkles, X, Smile, HelpCircle, CheckCircle } from 'lucide-react';
import { jargonDictionary, JargonTerm } from '../data/jargonBusterData';

export const JargonBusterWidget: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<JargonTerm | null>(null);

  const featuredKeys = [
    'sdk',
    'widget',
    'state',
    'hot reload',
    'null safety',
    'build context',
    'async',
    'future',
    'path',
    'activity',
    'broadcast receiver',
    'method channel',
  ];

  return (
    <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-amber-50/70 p-4 dark:border-amber-900/40 dark:from-amber-950/20 dark:via-neutral-900 dark:to-amber-950/20">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <span>Jargon Buster</span>
              <span className="rounded-full bg-amber-200/70 px-1.5 py-0.2 text-[10px] font-semibold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                Zero Fear Mode
              </span>
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Heard a strange tech word? Tap any term below for a fun, instant 5-second translation:
            </p>
          </div>
        </div>
      </div>

      {/* Quick Pills */}
      <div className="flex flex-wrap gap-1.5">
        {featuredKeys.map((key) => {
          const item = jargonDictionary[key];
          if (!item) return null;
          return (
            <button
              key={key}
              onClick={() => setSelectedTerm(item)}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-200/70 bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-800 transition hover:border-amber-400 hover:bg-amber-100/50 hover:scale-105 active:scale-95 dark:border-amber-900/50 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 shadow-2xs"
            >
              <span>{item.term.split(' ')[0]}</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400">💡</span>
            </button>
          );
        })}
      </div>

      {/* Selected Term Popover Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedTerm(null)}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-200 bg-white p-6 shadow-2xl dark:border-amber-900/50 dark:bg-neutral-900 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <Smile className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedTerm.term}
                  </h4>
                  <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    {selectedTerm.scaryRating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="rounded-xl bg-neutral-50 p-3.5 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">
                  🗣️ In Simple English:
                </span>
                {selectedTerm.simpleMeaning}
              </div>

              <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200 italic">
                <span className="font-bold not-italic text-amber-900 dark:text-amber-300 block mb-1">
                  💡 Real-Life Analogy:
                </span>
                &ldquo;{selectedTerm.funAnalogy}&rdquo;
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Zero stress: You don&apos;t have to memorize it today; you&apos;ll naturally master it through code.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTerm(null)}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Got It! Keep Learning 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
