import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Smartphone,
  Layers,
  Terminal,
  Keyboard,
  Sparkles,
} from 'lucide-react';
import { cheatSheetsData } from '../data/cheatSheetsData';
import { CodeBlock } from '../components/CodeBlock';

export const CheatSheetsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Dart',
    'Widgets',
    'Layout',
    'Android Mapping',
    'Git',
    'Shortcuts',
  ];

  const filteredSections = cheatSheetsData
    .filter(
      (sec) => activeCategory === 'All' || sec.category === activeCategory
    )
    .map((sec) => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return sec;
      return {
        ...sec,
        items: sec.items.filter(
          (item) =>
            item.term.toLowerCase().includes(q) ||
            item.snippet.toLowerCase().includes(q) ||
            item.note.toLowerCase().includes(q)
        ),
      };
    })
    .filter((sec) => sec.items.length > 0);

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Quick Syntax Reference</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Flutter &amp; Dart Cheat Sheets
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Fast, high-density syntax cheat sheets covering core Dart language features, widget layouts, native Android equivalence tables, Git commands, and editor shortcuts.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-flutter-600 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cheat sheets..."
                className="rounded-xl border border-neutral-200 bg-white pl-8 pr-4 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
              />
            </div>
          </div>
        </div>

        {/* Cheat Sheet Sections */}
        <div className="space-y-8">
          {filteredSections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {section.title}
                </h2>
                <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {section.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950/40 space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                          {item.term}
                        </span>
                      </div>
                      <p className="mt-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.note}
                      </p>
                    </div>

                    <div className="pt-2">
                      <CodeBlock
                        code={item.snippet}
                        language={
                          section.category === 'Git'
                            ? 'bash'
                            : section.category === 'Shortcuts'
                            ? 'text'
                            : 'dart'
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
              No matching cheat sheet items found for &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
