import React from 'react';
import { AlertCircle, AlertTriangle, Lightbulb, Award } from 'lucide-react';

interface CalloutProps {
  type: 'tip' | 'warning' | 'exam' | 'note';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const configs = {
    tip: {
      border: 'border-emerald-500/40 dark:border-emerald-500/30',
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      text: 'text-emerald-900 dark:text-emerald-200',
      titleColor: 'text-emerald-800 dark:text-emerald-300',
      icon: Lightbulb,
      defaultTitle: 'Pro Tip',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    },
    warning: {
      border: 'border-amber-500/40 dark:border-amber-500/30',
      bg: 'bg-amber-50/60 dark:bg-amber-950/20',
      text: 'text-amber-900 dark:text-amber-200',
      titleColor: 'text-amber-800 dark:text-amber-300',
      icon: AlertTriangle,
      defaultTitle: 'Common Trap & Warning',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    },
    exam: {
      border: 'border-red-500/50 dark:border-red-500/40',
      bg: 'bg-red-50/70 dark:bg-red-950/25',
      text: 'text-red-950 dark:text-red-200',
      titleColor: 'text-red-900 dark:text-red-300',
      icon: Award,
      defaultTitle: 'Company Exam Alert',
      badgeBg: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200 ring-1 ring-red-400/30',
    },
    note: {
      border: 'border-sky-500/40 dark:border-sky-500/30',
      bg: 'bg-sky-50/60 dark:bg-sky-950/20',
      text: 'text-sky-950 dark:text-sky-200',
      titleColor: 'text-sky-900 dark:text-sky-300',
      icon: AlertCircle,
      defaultTitle: 'Key Note',
      badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
    },
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div
      className={`my-4 rounded-xl border p-4 transition-all ${current.border} ${current.bg}`}
      role="region"
      aria-label={title || current.defaultTitle}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon className={`h-5 w-5 ${current.titleColor}`} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide uppercase ${current.badgeBg}`}
            >
              {title || current.defaultTitle}
            </span>
          </div>
          <div className={`text-sm leading-relaxed ${current.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
