import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Upload,
  RotateCcw,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Coffee,
  ExternalLink,
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
              The world-class, zero-to-job-ready curriculum built specifically for beginners preparing for technical interviews and Android-flavoured company exams. Self-paced, free forever, and runs privately in your browser.
            </p>

            {/* Ko-fi Support Pill Button */}
            <div>
              <a
                href="https://ko-fi.com/karmatix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-2xs transition hover:bg-amber-100 hover:border-amber-400 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Coffee className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Enjoyed this course? Buy me a chai ☕</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>

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
                  Practice Lab &amp; Drills
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
                  Verified Tools &amp; Links
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

          {/* Exam Focus & Practice Card */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Learning Focus
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every lesson is structured with analogies, short digestible paragraphs, and side-by-side native Android comparisons to make learning effortless and enjoyable.
            </p>
            <div className="pt-1">
              <Link
                to="/exam-prep"
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-900/50"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Visit Exam Prep Hub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-neutral-200/80 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-500">
          <p>
            Flutter and the related logo are trademarks of Google LLC. This course is an independent educational resource and is not affiliated with or endorsed by Google LLC.
          </p>
          <p className="mt-1">
            Free and open educational course for aspiring mobile developers.
          </p>
        </div>
      </div>
    </footer>
  );
};
