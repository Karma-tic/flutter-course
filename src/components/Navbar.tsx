import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Calendar,
  Award,
  Coffee,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { allLessons } from '../data/curriculum';
import { siteConfig } from '../config/site';

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Karmatix Brand + Portal Switcher */}
        <div className="flex items-center gap-3 shrink-0 mr-2 sm:mr-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1 shrink-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}brand/logo.svg`}
              alt="Karmatix Logo"
              className="w-8 h-8 rounded-lg shadow-xs"
            />
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Karmatix <span className="text-sky-600 dark:text-sky-400 font-semibold text-sm">Flutter</span>
              </span>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 -mt-1 leading-none font-medium">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Switch back to Karmatix Learning Catalog */}
          <a
            href={siteConfig.portalUrl || "https://learn.karmatix.in"}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-amber-500/50 hover:text-amber-500 transition-colors"
            title="Return to Karmatix Learning Catalog (learn.karmatix.in)"
          >
            <span className="text-amber-500 text-[10px]">◀</span>
            <span>All Tracks</span>
          </a>
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
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50/80 dark:bg-sky-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
            aria-label="Open search dialog"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden sm:inline-block rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Study Planner Button */}
          <button
            onClick={onOpenPlanner}
            title="Study Planner"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <Calendar className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span className="hidden lg:inline">Plan</span>
          </button>

          {/* Progress Pill */}
          <Link
            to="/course"
            className="hidden md:flex items-center gap-1.5 rounded-xl border border-sky-200/80 bg-sky-50/70 px-3 py-1 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300"
            title={`${completedCount} of ${totalLessons} lessons completed`}
          >
            <Award className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span>{percentage}%</span>
          </Link>

          {/* Ko-fi Chai Button */}
          <a
            href="https://ko-fi.com/karmatix"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a chai on Ko-fi (opens in new tab)"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-200/90 bg-amber-50/80 px-2.5 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-100 hover:border-amber-300 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Chai ☕</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 xl:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 xl:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between rounded-xl bg-sky-50/60 p-3 dark:bg-sky-950/30">
            <div className="text-xs">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Course Progress
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                {completedCount} / {totalLessons} Lessons Done ({percentage}%)
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanner();
              }}
              className="flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1.5 text-xs font-semibold text-white"
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
                      ? 'bg-slate-100 font-bold text-sky-600 dark:bg-slate-800 dark:text-sky-400'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
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

          {/* Switch back to Catalog */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <a
              href={siteConfig.portalUrl || "https://learn.karmatix.in"}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 transition"
            >
              <span className="text-amber-500 text-xs">◀</span>
              <span>All Courses on Karmatix Learning</span>
            </a>
          </div>

          {/* Mobile Ko-fi Chai Card */}
          <div className="mt-2">
            <a
              href="https://ko-fi.com/karmatix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-xs font-bold text-white shadow-xs transition hover:from-amber-600 hover:to-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Coffee className="h-4 w-4" />
              <span>Buy me a chai ☕</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
