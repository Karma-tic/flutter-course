import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Calendar, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { roadmap } from '../data/roadmap.generated';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenPlanner: () => void;
}

const TOTAL = roadmap.stages.reduce((n, s) => n + s.topics.length, 0);
const readDone = () => {
  try { return (JSON.parse(localStorage.getItem(`${siteConfig.storagePrefix}roadmap`) || '[]') as string[]).length; } catch { return 0; }
};

const primary = [
  { to: '/', label: 'Roadmap', end: true },
  { to: '/exam-prep', label: 'Mock tests' },
  { to: '/crud-lab', label: 'CRUD lab' },
  { to: '/practice', label: 'Practice lab' },
  { to: '/cheat-sheets', label: 'Cheat sheets' },
  { to: '/resources', label: 'Tools' },
];
const secondary = [
  { to: '/course', label: 'Notes' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/certifications', label: 'Certificates' },
  { to: '/about', label: 'About' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenPlanner }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(readDone);
  const location = useLocation();

  useEffect(() => {
    const on = (e: Event) => setDone((e as CustomEvent).detail.done);
    window.addEventListener('kx-roadmap-progress', on);
    return () => window.removeEventListener('kx-roadmap-progress', on);
  }, []);
  useEffect(() => { setOpen(false); setDone(readDone()); }, [location.pathname]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); onOpenSearch(); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onOpenSearch]);

  const pct = Math.round((done / (TOTAL || 1)) * 100);
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors ${isActive ? 'bg-neutral-900 text-neutral-100' : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100'}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link to="/" className="group inline-flex min-h-11 items-center gap-2 rounded-md" aria-label={`${siteConfig.shortName} roadmap, home`}>
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-ember transition-transform duration-500 group-hover:rotate-90" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 3v18" /><path d="M4.2 7.5l15.6 9" /><path d="M4.2 16.5l15.6-9" /></g>
            </svg>
            <span className="font-mono text-[15px] font-medium tracking-tight text-neutral-100">karmatix</span>
            <span className="font-mono text-[15px] text-neutral-500">/flutter</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {primary.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={linkCls}>{l.label}</NavLink>)}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button onClick={onOpenSearch} className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-800 px-3 text-sm text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-100" aria-label="Search">
            <Search className="h-4 w-4" /><span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 lg:inline-block">⌘K</kbd>
          </button>
          <button onClick={onOpenPlanner} className="hidden h-10 items-center gap-1.5 rounded-full border border-neutral-800 px-3 text-sm text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-100 sm:inline-flex" aria-label="Study planner">
            <Calendar className="h-4 w-4 text-ember" /><span className="hidden lg:inline">Plan</span>
          </button>
          <Link to="/" className="hidden h-10 items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 text-sm font-medium text-neutral-100 transition-colors hover:border-ember/70 md:inline-flex" title={`${done} of ${TOTAL} roadmap skills done`}>
            <span className="relative h-1.5 w-12 overflow-hidden rounded-full bg-neutral-800"><span className="absolute inset-y-0 left-0 rounded-full bg-ember" style={{ width: `${pct}%` }} /></span>
            {pct}%
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-100 xl:hidden" aria-expanded={open} aria-controls="kx-mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden border-t border-neutral-900 xl:block">
        <nav className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5 text-xs sm:px-6" aria-label="More">
          <span className="mr-1 text-neutral-600">More:</span>
          {secondary.map((l) => <NavLink key={l.to} to={l.to} className={({ isActive }) => `inline-flex min-h-8 items-center rounded-full px-2.5 transition-colors ${isActive ? 'text-neutral-100' : 'text-neutral-500 hover:text-neutral-100'}`}>{l.label}</NavLink>)}
          <a href="https://learn.karmatix.in/roadmaps/" className="ml-auto inline-flex min-h-8 items-center gap-1 rounded-full px-2.5 text-neutral-500 transition-colors hover:text-neutral-100">All stack roadmaps on Karmatix Learn <ArrowUpRight className="h-3 w-3" /></a>
        </nav>
      </div>

      {open && (
        <nav id="kx-mobile-nav" className="border-t border-neutral-800 bg-neutral-900 px-4 pb-5 pt-2 xl:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {[...primary, ...secondary].map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `flex min-h-12 items-center border-b border-neutral-800 text-base font-medium ${isActive ? 'text-ember' : 'text-neutral-100'}`}>{l.label}</NavLink>
              </li>
            ))}
            <li><button onClick={() => { setOpen(false); onOpenPlanner(); }} className="flex min-h-12 w-full items-center border-b border-neutral-800 text-left text-base font-medium text-neutral-100">Study planner</button></li>
            <li><a href="https://learn.karmatix.in/roadmaps/" className="flex min-h-12 items-center justify-between text-base text-neutral-400">All stack roadmaps <ArrowUpRight className="h-4 w-4" /></a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};
