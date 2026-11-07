import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allLessons } from '../data/curriculum';
import { glossaryData } from '../data/glossaryData';
import { modules } from '../data/curriculum/modules';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // parent should open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter lessons
  const normalized = query.trim().toLowerCase();

  const matchingLessons = normalized
    ? allLessons
        .filter(
          (l) =>
            l.title.toLowerCase().includes(normalized) ||
            l.description.toLowerCase().includes(normalized) ||
            l.goal.toLowerCase().includes(normalized) ||
            (l.examAlerts && l.examAlerts.some((a) => a.toLowerCase().includes(normalized)))
        )
        .slice(0, 6)
    : allLessons.slice(0, 4);

  const matchingGlossary = normalized
    ? glossaryData
        .filter(
          (g) =>
            g.term.toLowerCase().includes(normalized) ||
            g.definition.toLowerCase().includes(normalized)
        )
        .slice(0, 4)
    : [];

  const totalResults = matchingLessons.length + matchingGlossary.length;

  const handleSelectLesson = (lessonId: string) => {
    navigate(`/course/${lessonId}`);
    onClose();
  };

  const handleSelectGlossary = (termId: string) => {
    navigate(`/glossary#${termId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl transition-all dark:border-neutral-800 dark:bg-neutral-900">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <Search className="h-5 w-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search lessons, widgets, Dart concepts, exam questions..."
            className="w-full bg-transparent px-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:text-neutral-100"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 rounded-md p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Lessons Section */}
          <div>
            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {normalized ? 'Lessons & Modules' : 'Popular Lessons'}
            </div>
            <div className="mt-1 space-y-1">
              {matchingLessons.map((lesson) => {
                const parentModule = modules.find((m) => m.id === lesson.moduleId);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-flutter-50 text-flutter-600 dark:bg-flutter-950/60 dark:text-flutter-400">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {lesson.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {parentModule?.title} • {lesson.durationMinutes} min
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glossary Section */}
          {matchingGlossary.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Glossary Terms
              </div>
              <div className="mt-1 space-y-1">
                {matchingGlossary.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectGlossary(item.id)}
                    className="flex w-full items-start justify-between rounded-xl px-3 py-2 text-left text-xs transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {item.term}{' '}
                          <span className="text-[10px] font-normal text-neutral-400">
                            ({item.category})
                          </span>
                        </div>
                        <div className="line-clamp-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                          {item.definition}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <div className="py-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
              No matching lessons or terms found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-2.5 text-[11px] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span>Navigation: Click to jump</span>
            <span>•</span>
            <span>Shortcut: <kbd className="font-mono">Ctrl+K</kbd> / <kbd className="font-mono">Cmd+K</kbd></span>
          </div>
          <div>57 Lessons • 100+ Glossary Terms</div>
        </div>
      </div>
    </div>
  );
};

