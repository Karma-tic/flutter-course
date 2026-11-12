import React, { useState } from 'react';
import { Package, ExternalLink, Copy, Check, Search, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { topFlutterPackages, FlutterPackage } from '../data/packagesData';
import { CodeBlock } from './CodeBlock';

export const PackagesShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);

  const categories = [
    'All',
    'State Management',
    'Networking & APIs',
    'Local Storage & DB',
    'UI & Styling',
    'Routing & Navigation',
  ];

  const filteredPackages = topFlutterPackages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === 'All' || pkg.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      pkg.name.toLowerCase().includes(q) ||
      pkg.whatItDoes.toLowerCase().includes(q) ||
      pkg.whyYouNeedIt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCode = (id: string) => {
    setExpandedCodeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-flutter-600 text-white shadow-xs'
                  : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search package (e.g. dio, riverpod)..."
            className="rounded-xl border border-neutral-200 bg-white pl-8 pr-4 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPackages.map((pkg) => {
          const isCopied = copiedId === pkg.id;
          const isExpanded = expandedCodeId === pkg.id;

          return (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold text-neutral-900 dark:text-white">
                      {pkg.name}
                    </span>
                    <span className="rounded-md bg-flutter-50 px-2 py-0.5 text-[10px] font-bold text-flutter-700 dark:bg-flutter-950 dark:text-flutter-300">
                      {pkg.category}
                    </span>
                  </div>

                  <a
                    href={pkg.pubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-flutter-600 transition"
                    title="View on Pub.dev (opens in new tab)"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                  {pkg.whatItDoes}
                </p>

                <div className="rounded-xl bg-neutral-50 p-3 text-[11px] text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-300 leading-relaxed">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    Why you need it:
                  </span>{' '}
                  {pkg.whyYouNeedIt}
                </div>
              </div>

              {/* Install Command & Code Toggle */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between rounded-xl bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                  <span className="truncate">{pkg.command}</span>
                  <button
                    onClick={() => handleCopy(pkg.id, pkg.command)}
                    className="ml-2 flex items-center gap-1 font-sans text-[11px] font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400 shrink-0"
                    title="Copy install command"
                  >
                    {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => toggleCode(pkg.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    <Code2 className="h-3 w-3" />
                    <span>{isExpanded ? 'Hide Snippet' : 'View Code Snippet'}</span>
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-2 animate-in fade-in">
                    <CodeBlock code={pkg.codeSnippet} language="dart" title={`${pkg.name}_usage.dart`} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
