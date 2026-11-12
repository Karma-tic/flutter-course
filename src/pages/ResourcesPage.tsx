import React, { useState } from 'react';
import {
  ExternalLink,
  Search,
  Sparkles,
  BookOpen,
  Wrench,
  Package,
  Layers,
} from 'lucide-react';
import { resourcesData } from '../data/resourcesData';
import { PackagesShowcase } from '../components/PackagesShowcase';
import { DeveloperToolsShowcase } from '../components/DeveloperToolsShowcase';

export const ResourcesPage: React.FC = () => {
  const [mainTab, setMainTab] = useState<'catalog' | 'packages' | 'tools'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedFreeStatus, setSelectedFreeStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Official',
    'Playground',
    'YouTube',
    'Tutorials',
    'Open Source',
    'Tools & Extensions',
    'Android Native',
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const freeStatuses = ['All', 'Free', 'Free to audit', 'Freemium'];

  const filteredResources = resourcesData.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLvl = selectedLevel === 'All' || item.level === selectedLevel;
    const matchesStatus =
      selectedFreeStatus === 'All' || item.freeStatus === selectedFreeStatus;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      item.title.toLowerCase().includes(query) ||
      item.whyGood.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCat && matchesLvl && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>100% Curated &amp; Verified</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Curated Free Flutter &amp; Dart Resources
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every course, documentation site, YouTube playlist, interactive sandbox, tool, and package has been manually tested and reviewed for accuracy. No outdated Flutter 1.x or null-safety broken tutorials.
            </p>
          </div>

          {/* Top-Level Tab Switcher */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            <button
              onClick={() => setMainTab('catalog')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                mainTab === 'catalog'
                  ? 'bg-flutter-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Verified Courses &amp; Sites</span>
            </button>

            <button
              onClick={() => setMainTab('packages')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                mainTab === 'packages'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Top 14 Production Packages</span>
            </button>

            <button
              onClick={() => setMainTab('tools')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                mainTab === 'tools'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              <Wrench className="h-4 w-4" />
              <span>Developer Toolkit &amp; Video Vault</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Catalog */}
        {mainTab === 'catalog' && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Search */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources, authors, topics (e.g. BLoC, Vandad, DartPad)..."
                    className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                  />
                </div>

                {/* Level Selector */}
                <div className="md:col-span-3">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-700 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Level: {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Status */}
                <div className="md:col-span-4">
                  <select
                    value={selectedFreeStatus}
                    onChange={(e) => setSelectedFreeStatus(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs text-neutral-700 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {freeStatuses.map((st) => (
                      <option key={st} value={st}>
                        Pricing: {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
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
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                        {item.category}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          item.freeStatus === 'Free'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : item.freeStatus === 'Free to audit'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {item.freeStatus}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                          Why it&apos;s recommended:{' '}
                        </span>
                        {item.whyGood}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-neutral-50 px-1.5 py-0.5 text-[10px] text-neutral-500 dark:bg-neutral-800/80 dark:text-neutral-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Metadata & Link */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-400">
                      Verified: {item.lastVerified}
                    </span>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-semibold text-flutter-600 transition hover:text-flutter-700 dark:text-flutter-400"
                    >
                      <span>Visit Resource</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
                No resources match your search criteria. Try choosing &ldquo;All&rdquo; categories or a different keyword.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Packages */}
        {mainTab === 'packages' && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Top 14 Production Flutter Packages
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Explore the industry standard libraries powering modern Flutter production applications with 1-click terminal install commands.
              </p>
            </div>
            <PackagesShowcase />
          </div>
        )}

        {/* Tab 3: Tools & Videos */}
        {mainTab === 'tools' && (
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Developer Toolkit &amp; Curated Video Vault
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Essential utilities, IDE setup, mock generators, and high-impact YouTube video series for Flutter engineers.
              </p>
            </div>
            <DeveloperToolsShowcase />
          </div>
        )}
      </div>
    </div>
  );
};
