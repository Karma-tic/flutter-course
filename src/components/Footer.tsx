import React from 'react';
import { Link } from 'react-router-dom';
import { siFlutter } from 'simple-icons';
import { BrandIcon } from './BrandIcon';
import { siteConfig } from '../config/site';

const links = [
  { to: '/', label: 'Roadmap' },
  { to: '/crud-lab', label: 'CRUD lab' },
  { to: '/practice', label: 'Practice lab' },
  { to: '/exam-prep', label: 'Mock tests' },
  { to: '/cheat-sheets', label: 'Cheat sheets' },
  { to: '/course', label: 'Notes' },
  { to: '/glossary', label: 'Glossary' },
];

export const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-neutral-800">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
      <div className="max-w-sm">
        <p className="inline-flex items-center gap-2 font-semibold text-neutral-100">
          <BrandIcon icon={siFlutter} className="h-4 w-4" color="#13b9fd" />Flutter roadmap by Karmatix
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">Free, no sign-up. Your progress stays in this browser.</p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <a href="https://learn.karmatix.in/roadmaps/" className="inline-flex min-h-9 items-center text-ember-soft underline-offset-4 hover:underline">All stack roadmaps</a>
          <a href="https://ko-fi.com/karmatix" className="inline-flex min-h-9 items-center text-neutral-400 underline-offset-4 hover:text-neutral-100 hover:underline">Support on Ko-fi</a>
        </p>
      </div>
      <nav aria-label="Footer">
        <ul className="grid grid-cols-2 gap-x-10 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.to}><Link to={l.to} className="inline-flex min-h-9 items-center text-sm text-neutral-400 transition-colors hover:text-neutral-100">{l.label}</Link></li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="border-t border-neutral-900">
      <p className="mx-auto max-w-6xl px-4 py-5 text-xs leading-relaxed text-neutral-600 sm:px-6">{siteConfig.trademarkDisclaimer}</p>
    </div>
  </footer>
);
