import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, Filter, Lightbulb } from 'lucide-react';
import { glossaryData } from '../data/glossaryData';

export const GlossaryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Flutter', 'Dart', 'Android', 'General'];

  const filteredTerms = glossaryData
    .filter(
      (item) =>
        selectedCategory === 'All' || item.category === selectedCategory
    )
    .filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.analogyOrTip && item.analogyOrTip.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  // Get unique first letters for alphabet quick jump
  const letters = Array.from(
    new Set(filteredTerms.map((t) => t.term[0].toUpperCase()))
  ).sort();

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
              <BookOpen className="h-3.5 w-3.5" />
              <span>100+ Essential Terms</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              The 1-Line Flutter &amp; Android Glossary
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every technical term explained in a single, crisp, plain-English sentence accompanied by a simple real-world analogy. Never be confused by jargon again.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-flutter-600 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search term or definition..."
                className="rounded-xl border border-neutral-200 bg-white pl-8 pr-4 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>

          {/* Alphabet Quick Jump */}
          {letters.length > 1 && (
            <div className="mt-4 flex flex-wrap items-center gap-1 border-t border-neutral-100 pt-3 dark:border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 uppercase mr-1">
                Jump:
              </span>
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-700 transition hover:bg-flutter-100 hover:text-flutter-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  {letter}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Glossary Terms List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item, idx) => {
            const firstLetter = item.term[0].toUpperCase();
            const isFirstOfLetter =
              idx === 0 ||
              filteredTerms[idx - 1].term[0].toUpperCase() !== firstLetter;

            return (
              <div
                key={item.id}
                id={item.id}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      id={isFirstOfLetter ? `letter-${firstLetter}` : undefined}
                      className="font-bold text-base text-neutral-900 dark:text-neutral-100"
                    >
                      {item.term}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                        item.category === 'Flutter'
                          ? 'bg-flutter-50 text-flutter-700 dark:bg-flutter-950 dark:text-flutter-300'
                          : item.category === 'Dart'
                          ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                          : item.category === 'Android'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {item.definition}
                  </p>
                </div>

                {item.analogyOrTip && (
                  <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3 text-xs text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200 flex items-start gap-2">
                    <Lightbulb className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <p className="italic leading-snug">
                      &ldquo;{item.analogyOrTip}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
            No terms found for &ldquo;{searchQuery}&rdquo;. Try another search term.
          </div>
        )}
      </div>
    </div>
  );
};

