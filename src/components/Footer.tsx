import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Upload,
  RotateCcw,
  Heart,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  const { exportProgressJSON, importProgressJSON, resetProgress } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = exportProgressJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `karmatix-flutter-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importProgressJSON(content);
      if (success) {
        alert('Progress successfully imported!');
      } else {
        alert('Invalid progress JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all your course progress? This action cannot be undone unless you have an exported backup.'
      )
    ) {
      resetProgress();
      alert('Your progress has been reset.');
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}brand/logo.svg`}
                alt="Karmatix"
                className="w-7 h-7 rounded"
              />
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Karmatix Flutter Course
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {siteConfig.description} Designed and engineered by Karmatix for aspiring developers and mobile engineers worldwide.
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-sky-500 fill-sky-500 inline" />
              <span>for the Flutter community by <a href={siteConfig.publisherUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors">Karmatix</a></span>
            </div>
            <div className="pt-2">
              <a
                href="https://ko-fi.com/karmatix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
              >
                <span>Enjoyed this course? Buy me a chai ☕</span>
              </a>
            </div>
          </div>

          {/* Curriculum & Paths Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Curriculum & Paths
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href={siteConfig.portalUrl || "https://learn.karmatix.in"}
                  className="hover:text-amber-500 font-medium transition-colors flex items-center gap-1 text-amber-600 dark:text-amber-400"
                >
                  <span>◀ All Karmatix Tracks</span>
                </a>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Visual Roadmap
                </Link>
              </li>
              <li>
                <Link to="/course" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Curriculum &amp; Modules
                </Link>
              </li>
              <li>
                <Link to="/exam-prep" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                  <span>Exam Prep Hub ★</span>
                </Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Practice Lab &amp; Drills
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference & Guides Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Reference & Guides
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/cheat-sheets" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Offline Cheat Sheets
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  100+ Term Glossary
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Verified Tools &amp; Links
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Certifications Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  How to Study Flutter
                </Link>
              </li>
            </ul>
          </div>

          {/* Progress & Storage Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Browser Progress
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your study notes and completion progress are stored 100% locally in your browser.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Progress JSON</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import Backup File</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100/60 dark:hover:bg-red-950/40 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-3 leading-relaxed">
          <p>
            {siteConfig.trademarkDisclaimer}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <p>
              &copy; {siteConfig.copyrightYear} <a href={siteConfig.publisherUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline text-slate-700 dark:text-slate-300">Karmatix</a>. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Zero trackers &bull; Local storage only &bull; Static high-performance architecture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
