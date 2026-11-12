import React, { useState } from 'react';
import { Wrench, Video, ExternalLink, Sparkles, Terminal, Laptop, Layers } from 'lucide-react';
import { essentialDeveloperTools, curatedYouTubeGuides } from '../data/developerToolsData';

const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const DeveloperToolsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'videos'>('tools');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'tools'
              ? 'bg-flutter-600 text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
        >
          <Wrench className="h-4 w-4" />
          <span>Essential Developer Toolkit &amp; Platforms</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === 'videos'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          }`}
        >
          <YouTubeIcon className="h-4 w-4" />
          <span>Curated Video Vault &amp; Playlists</span>
        </button>
      </div>

      {/* Tab 1: Tools & Platforms */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {essentialDeveloperTools.map((tool) => (
            <div
              key={tool.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {tool.category}
                  </span>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    {tool.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {tool.name}
                </h4>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {tool.description}
                </p>

                <div className="rounded-xl bg-neutral-50 p-2.5 text-[11px] text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-300 leading-relaxed">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Why essential:
                  </span>{' '}
                  {tool.whyEssential}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
                >
                  <span>Open Official Platform</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Curated YouTube Videos */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {curatedYouTubeGuides.map((vid) => (
            <div
              key={vid.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-red-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                    <YouTubeIcon className="h-3.5 w-3.5" />
                    <span>{vid.channel}</span>
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    {vid.duration}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {vid.title}
                </h4>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <span>Watch Free Playlist on YouTube</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
