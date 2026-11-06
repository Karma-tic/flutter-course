import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Upload,
  RotateCcw,
  Layers,
  Heart,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const Footer: React.FC = () => {
  const { exportProgressJSON, importProgressJSON, resetProgress } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = exportProgressJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flutter-course-progress-${new Date().toISOString().slice(0, 10)}.json`;
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
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-flutter-600 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-neutral-900 dark:text-white">
                Flutter Course
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              The world-class, zero-to-job-ready curriculum built specifically for beginners preparing for technical interviews and Android-flavoured company exams. No backend, 100% free, runs entirely in your browser.
            </p>

            {/* Progress Backup Controls */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Your Browser Storage &amp; Progress
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Import JSON</span>
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
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/40 dark:bg-neutral-800 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Curriculum
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/roadmap" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  Visual Roadmap
                </Link>
              </li>
              <li>
                <Link to="/course" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  All 11 Modules
                </Link>
              </li>
              <li>
                <Link to="/exam-prep" className="font-semibold text-red-600 dark:text-red-400">
                  Exam Prep Hub ★
                </Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  Practice Lab &amp; Flashcards
                </Link>
              </li>
            </ul>
          </div>

          {/* Reference Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              References
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <Link to="/cheat-sheets" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  Quick Cheat Sheets
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  100+ Term Glossary
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  Verified Resources
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  Certifications Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-flutter-600 dark:hover:text-flutter-400">
                  How to Study
                </Link>
              </li>
            </ul>
          </div>

          {/* GitHub & Deploy Notice */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Open Source
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Designed for deployment to GitHub Pages. All code samples are open source and MIT licensed.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/Karma-tic/flutter-course"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <span>View on GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-neutral-200/80 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-500">
          <p>
            Flutter and the related logo are trademarks of Google LLC. This course is an independent educational resource and is not affiliated with or endorsed by Google LLC.
          </p>
          <p className="mt-1">
            Built with Vite, React, TypeScript, and Tailwind CSS. Hosted statically on GitHub Pages.
          </p>
        </div>
      </div>
    </footer>
  );
};
