import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Search,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';
import { modules } from '../data/curriculum/modules';
import { allLessons } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { lessonId } = useParams<{ lessonId?: string }>();
  const { progress } = useProgress();

  // Find active module based on lessonId
  const activeLesson = allLessons.find((l) => l.id === lessonId);
  const activeModuleId = activeLesson ? activeLesson.moduleId : 'module-0';

  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    [activeModuleId]: true,
    'module-0': true,
    'module-1': true,
  });

  // Keep current active module expanded
  React.useEffect(() => {
    if (activeLesson) {
      setOpenModules((prev) => ({
        ...prev,
        [activeLesson.moduleId]: true,
      }));
    }
  }, [activeLesson?.moduleId]);

  const [filterQuery, setFilterQuery] = useState('');

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const filteredLessons = filterQuery.trim()
    ? allLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          l.description.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : null;

  return (
    <aside className="flex h-full w-full flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 transition-colors">
      {/* Sidebar Top Filter */}
      <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter lessons..."
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-8 pr-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* Lesson Tree / Filtered List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredLessons ? (
          /* Filtered Flat List */
          <div className="space-y-1">
            <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Matches ({filteredLessons.length})
            </div>
            {filteredLessons.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isCurrent = lesson.id === lessonId;

              return (
                <NavLink
                  key={lesson.id}
                  to={`/course/${lesson.id}`}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
                    isCurrent
                      ? 'bg-flutter-50 font-bold text-flutter-700 dark:bg-flutter-950/50 dark:text-flutter-300 ring-1 ring-flutter-500/20'
                      : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-neutral-300 dark:text-neutral-600" />
                  )}
                  <span className="truncate">{lesson.title}</span>
                </NavLink>
              );
            })}
          </div>
        ) : (
          /* Full Modules Accordion */
          modules.map((module) => {
            const moduleLessons = allLessons.filter((l) => l.moduleId === module.id);
            const isOpen = openModules[module.id] ?? false;
            const completedInModule = moduleLessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const isFullyDone =
              moduleLessons.length > 0 &&
              completedInModule === moduleLessons.length;

            return (
              <div
                key={module.id}
                className="overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50/40 dark:border-neutral-800/60 dark:bg-neutral-950/30"
              >
                {/* Module Accordion Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/50"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                    )}
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {module.id.toUpperCase()}
                        </span>
                        {module.examFocus && (
                          <span className="rounded bg-red-100 px-1 py-0.2 text-[9px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                            Exam
                          </span>
                        )}
                      </div>
                      <div className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                        {module.title}
                      </div>
                    </div>
                  </div>

                  <div className="ml-2 flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-mono text-neutral-400">
                      {completedInModule}/{moduleLessons.length}
                    </span>
                    {isFullyDone && (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </div>
                </button>

                {/* Lesson Links */}
                {isOpen && (
                  <div className="space-y-0.5 px-2 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/40">
                    {moduleLessons.map((lesson) => {
                      const isCompleted = progress.completedLessons.includes(
                        lesson.id
                      );
                      const isCurrent = lesson.id === lessonId;

                      return (
                        <NavLink
                          key={lesson.id}
                          to={`/course/${lesson.id}`}
                          onClick={onCloseMobile}
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition ${
                            isCurrent
                              ? 'bg-flutter-500/10 font-bold text-flutter-700 dark:text-flutter-300'
                              : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isCompleted ? (
                              <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-neutral-400 shrink-0 ml-1">
                            {lesson.durationMinutes}m
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer with Quick Stats */}
      <div className="border-t border-neutral-200 bg-neutral-50/50 p-3 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40 dark:text-neutral-400">
        <div className="flex items-center justify-between">
          <span>Overall:</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {progress.completedLessons.length} / {allLessons.length} Done (
            {Math.round(
              (progress.completedLessons.length / (allLessons.length || 1)) * 100
            )}
            %)
          </span>
        </div>
      </div>
    </aside>
  );
};

