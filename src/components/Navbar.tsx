import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Layers,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Award,
  Calendar,
  Sparkles,
  BookOpen,
  Code2,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { allLessons } from '../data/curriculum';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenPlanner: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenPlanner }) => {
  const { theme, toggleTheme } = useTheme();
  const { progress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalLessons = allLessons.length;
  const completedCount = progress.completedLessons.length;
  const percentage = Math.round((completedCount / (totalLessons || 1)) * 100);

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/course', label: 'Course' },
    { to: '/exam-prep', label: 'Exam Prep', isExam: true },
    { to: '/practice', label: 'Practice Lab' },
    { to: '/resources', label: 'Resources' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/cheat-sheets', label: 'Cheat Sheets' },
    { to: '/glossary', label: 'Glossary' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flutter-600 text-white shadow-xs transition group-hover:scale-105">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold leading-none">Flutter Course</span>
              <span className="text-[10px] font-medium text-flutter-600 dark:text-flutter-400">
                Beginner to Job & Exam Ready
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-neutral-100 text-flutter-600 dark:bg-neutral-800 dark:text-flutter-400'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-white'
                } ${link.isExam ? 'text-red-600 dark:text-red-400' : ''}`
              }
            >
              <span className="flex items-center gap-1">
                {link.label}
                {link.isExam && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                )}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50/70 px-3 py-1.5 text-xs text-neutral-500 transition hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600"
            aria-label="Open search dialog"
          >
            <Search className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden sm:inline-block rounded bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-mono text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
              ⌘K
            </kbd>
          </button>

          {/* Study Planner Button */}
          <button
            onClick={onOpenPlanner}
            title="Study Planner"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <Calendar className="h-3.5 w-3.5 text-flutter-600 dark:text-flutter-400" />
            <span className="hidden lg:inline">Plan</span>
          </button>

          {/* Progress Pill */}
          <Link
            to="/"
            title={`${completedCount} of ${totalLessons} lessons completed`}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-200"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-flutter-600 dark:text-flutter-400" />
              <span>{percentage}%</span>
            </div>
            <div className="h-1.5 w-12 rounded-full bg-neutral-200 overflow-hidden dark:bg-neutral-700">
              <div
                className="h-full bg-flutter-600 transition-all duration-500 dark:bg-flutter-400"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 xl:hidden dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 pt-3 pb-6 xl:hidden dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-flutter-50/60 p-3 dark:bg-flutter-950/30">
            <div className="text-xs">
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                Course Progress
              </div>
              <div className="text-neutral-500 dark:text-neutral-400">
                {completedCount} / {totalLessons} Lessons Done ({percentage}%)
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="flex items-center gap-1 rounded-lg bg-flutter-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              <Calendar className="h-3 w-3" />
              <span>Planner</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-3 py-2.5 transition ${
                    isActive
                      ? 'bg-neutral-100 font-bold text-flutter-600 dark:bg-neutral-800 dark:text-flutter-400'
                      : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                  } ${link.isExam ? 'text-red-600 dark:text-red-400' : ''}`
                }
              >
                <span>{link.label}</span>
                {link.isExam && (
                  <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-700 dark:bg-red-900/60 dark:text-red-300">
                    Exam
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
