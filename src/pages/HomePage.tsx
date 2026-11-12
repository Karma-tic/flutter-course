import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2,
  Sparkles,
  Code2,
  Layers,
  ChevronRight,
  Zap,
  Calendar,
  Wrench,
  Package,
  Bug,
  Compass,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { modules } from '../data/curriculum/modules';
import { allLessons } from '../data/curriculum';
import { BugHunterWidget } from '../components/BugHunterWidget';
import { StateManagementWizard } from '../components/StateManagementWizard';
import { PackagesShowcase } from '../components/PackagesShowcase';
import { DeveloperToolsShowcase } from '../components/DeveloperToolsShowcase';

interface HomePageProps {
  onOpenPlanner: () => void;
  onOpenCertificate?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenPlanner, onOpenCertificate }) => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'bughunter' | 'statemgmt'>('bughunter');

  const totalLessons = allLessons.length;
  const completedCount = progress.completedLessons.length;
  const percentage = Math.round((completedCount / (totalLessons || 1)) * 100);

  // Find next lesson to continue
  const lastLessonId = progress.lastVisitedLessonId;
  const nextIncomplete =
    allLessons.find((l) => !progress.completedLessons.includes(l.id)) ||
    allLessons[0];
  const continueLesson =
    (lastLessonId && allLessons.find((l) => l.id === lastLessonId)) ||
    nextIncomplete;

  // Remaining lessons list
  const remainingLessons = allLessons.filter(
    (l) => !progress.completedLessons.includes(l.id)
  );

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950/40">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            {/* High Contrast Target Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-100 px-3.5 py-1.5 text-xs font-extrabold text-sky-950 shadow-xs dark:border-sky-400 dark:bg-sky-950 dark:text-sky-100">
              <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-300" />
              <span>Tailored for Absolute Beginners &amp; Company Exam Takers</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl dark:text-white leading-tight">
              Master Flutter from Scratch.{' '}
              <span className="text-flutter-600 dark:text-flutter-400">
                Ace Your Exam.
              </span>{' '}
              Get Job-Ready.
            </h1>

            <p className="text-base text-neutral-600 dark:text-neutral-300 sm:text-lg leading-relaxed max-w-3xl">
              No programming background assumed. Simple real-world analogies, short bite-sized explanations, 1-click copy code, and side-by-side native Android Kotlin comparisons for every single topic.
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/course/${continueLesson.id}`}
                className="flex items-center gap-2 rounded-xl bg-flutter-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-flutter-700"
              >
                <span>Continue: {continueLesson.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                onClick={onOpenPlanner}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Calendar className="h-4 w-4 text-flutter-600 dark:text-flutter-400" />
                <span>Study Planner</span>
              </button>

              {onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    percentage === 100
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Award className={`h-4 w-4 ${percentage === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}`} />
                  <span>{percentage === 100 ? 'Claim Certificate 🎓' : `Certificate (${percentage}%)`}</span>
                </button>
              )}
            </div>
          </div>

          {/* 3 Outcome-Driven Fast-Tracks */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Track 1: CRUD Lab Speedrun */}
            <div className="relative rounded-2xl border border-sky-300/80 bg-gradient-to-br from-sky-50/60 to-white p-6 shadow-xs transition hover:shadow-md dark:border-sky-800/80 dark:bg-gradient-to-br dark:from-sky-950/40 dark:to-neutral-900 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-xs">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[10px] font-extrabold text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                    1-Hour Speedrun
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Interactive CRUD Studio
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Build a complete production-grade Flutter app from scratch with live AST code verification and a real-time phone emulator preview.
                  </p>
                </div>
              </div>

              <Link
                to="/crud-lab"
                className="inline-flex items-center justify-between rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-sky-700"
              >
                <span>Launch CRUD Lab 🚀</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Track 2: Exam Prep Cram Kit */}
            <div className="relative rounded-2xl border border-red-300/80 bg-gradient-to-br from-red-50/60 to-white p-6 shadow-xs transition hover:shadow-md dark:border-red-900/60 dark:bg-gradient-to-br dark:from-red-950/40 dark:to-neutral-900 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-extrabold text-red-800 dark:bg-red-900 dark:text-red-200">
                    72-Hour Placement Kit
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Exam Prep &amp; Mock Tests
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    5 timed mock exams (100 questions), Student Details practical project with solution code, and high-yield interview cheat sheets.
                  </p>
                </div>
              </div>

              <Link
                to="/exam-prep"
                className="inline-flex items-center justify-between rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-red-700"
              >
                <span>Open Exam Prep Hub 🎯</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Track 3: Complete 61-Lesson Encyclopedia */}
            <div className="relative rounded-2xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-xs transition hover:shadow-md dark:border-emerald-800/80 dark:bg-gradient-to-br dark:from-emerald-950/40 dark:to-neutral-900 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    61 Lessons • In-Depth
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Comprehensive Curriculum
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    11 progressive modules from Dart fundamentals to production release with native Android comparisons and interactive quizzes.
                  </p>
                </div>
              </div>

              <Link
                to="/course"
                className="inline-flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
              >
                <span>Browse All Lessons 📚</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats Banner */}
      <section className="border-b border-neutral-200/80 bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Overall Progress Gauge */}
            <div className="md:col-span-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Your Overall Mastery
                  </div>
                  <div className="mt-1 text-2xl font-black text-neutral-900 dark:text-neutral-100">
                    {completedCount} of {totalLessons} Lessons
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-flutter-600 dark:text-flutter-400">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-flutter-600 transition-all duration-700 dark:bg-flutter-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>{totalLessons - completedCount} lessons remaining</span>
                <span>
                  {progress.studyPlanDailyHours || 2} hrs/day goal
                </span>
              </div>
            </div>

            {/* Quick Fast-Tracks */}
            <div className="md:col-span-6 grid grid-cols-2 gap-3">
              <Link
                to="/roadmap"
                className="group rounded-xl border border-neutral-200 bg-white p-3.5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-1.5">
                  <Layers className="h-3.5 w-3.5" />
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-flutter-600">
                  Visual Roadmap
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Beginner to Job-Ready path
                </p>
              </Link>

              <Link
                to="/practice"
                className="group rounded-xl border border-neutral-200 bg-white p-3.5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-1.5">
                  <Code2 className="h-3.5 w-3.5" />
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-flutter-600">
                  Practice Lab
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  25+ Dart drills &amp; projects
                </p>
              </Link>

              <Link
                to="/cheat-sheets"
                className="group rounded-xl border border-neutral-200 bg-white p-3.5 shadow-xs transition hover:border-flutter-400 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 mb-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <div className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-flutter-600">
                  Cheat Sheets
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Widgets, Dart &amp; Android
                </p>
              </Link>

              <Link
                to="/exam-prep#mock-tests"
                className="group rounded-xl border border-red-200 bg-white p-3.5 shadow-xs transition hover:border-red-400 hover:shadow-sm dark:border-red-950 dark:bg-neutral-900"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 mb-1.5">
                  <Award className="h-3.5 w-3.5" />
                </div>
                <div className="font-semibold text-xs text-red-700 dark:text-red-400 group-hover:text-red-600">
                  Timed Mock Tests
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  5 tests • 100 questions
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Gamified Interactive Studio (Bug Hunter + State Management Wizard) */}
        <section aria-label="Interactive Diagnostic & Minigames" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Hands-On Interactive Labs</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                Gamified Drills &amp; Architecture Tools
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Test your debugging reflexes on real crashes and choose the perfect architecture for your app.
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveInteractiveTab('bughunter')}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  activeInteractiveTab === 'bughunter'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                }`}
              >
                <Bug className="h-4 w-4" />
                <span>Bug Hunter 🐛</span>
              </button>

              <button
                onClick={() => setActiveInteractiveTab('statemgmt')}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  activeInteractiveTab === 'statemgmt'
                    ? 'bg-flutter-600 text-white shadow-xs'
                    : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>State Decision Wizard 🧭</span>
              </button>
            </div>
          </div>

          {/* Active Interactive Widget */}
          {activeInteractiveTab === 'bughunter' ? (
            <BugHunterWidget />
          ) : (
            <StateManagementWizard />
          )}
        </section>

        {/* Section 2: Essential Developer Toolkit & Curated Video Vault */}
        <section aria-label="Developer Toolkit and Playlists" className="space-y-6">
          <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
              <Wrench className="h-3.5 w-3.5" />
              <span>Real Production Workflow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Developer Toolkit &amp; Curated Video Vault
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              The essential editors, generators, platforms, and official YouTube series used by senior Flutter engineers worldwide.
            </p>
          </div>

          <DeveloperToolsShowcase />
        </section>

        {/* Section 3: Top 14 Production Flutter Packages Directory */}
        <section aria-label="Top 14 Production Packages" className="space-y-6">
          <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-300 bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-800 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
              <Package className="h-3.5 w-3.5" />
              <span>Pub.dev Production Standards</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Top 14 Production Flutter Packages
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              What they do, why you need them, 1-click installation commands, and real code snippets.
            </p>
          </div>

          <PackagesShowcase />
        </section>

        {/* Section 4: Course Curriculum Overview Grid */}
        <section aria-label="Curriculum Overview" className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Reference Encyclopedia</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mt-1">
                Course Curriculum Overview
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                11 comprehensive modules spanning foundational Dart to production release
              </p>
            </div>
            <Link
              to="/course"
              className="flex items-center gap-1 text-xs font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
            >
              <span>View All 61 Lessons</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => {
              const modLessons = allLessons.filter((l) => l.moduleId === module.id);
              const doneCount = modLessons.filter((l) =>
                progress.completedLessons.includes(l.id)
              ).length;
              const modPercent = Math.round(
                (doneCount / (modLessons.length || 1)) * 100
              );
              const firstLesson = modLessons[0];

              return (
                <div
                  key={module.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                        {module.id.toUpperCase()}
                      </span>
                      {module.examFocus && (
                        <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                          Exam Critical
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {module.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar & Jump */}
                  <div className="mt-5 space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span>{doneCount} / {modLessons.length} done</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {modPercent}%
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-flutter-600 dark:bg-flutter-400 rounded-full"
                        style={{ width: `${modPercent}%` }}
                      />
                    </div>

                    <div className="pt-2">
                      <Link
                        to={firstLesson ? `/course/${firstLesson.id}` : '/course'}
                        className="flex items-center justify-between text-xs font-semibold text-flutter-600 transition hover:text-flutter-700 dark:text-flutter-400"
                      >
                        <span>Start Module</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Remaining Sections Checklist */}
        <section aria-label="Remaining Lessons Checklist" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Remaining Sections ({remainingLessons.length} Lessons Left)
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                A clear checklist of topics you haven&apos;t completed yet
              </p>
            </div>
            {remainingLessons.length === 0 && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                🎉 All {totalLessons} Lessons Completed!
              </span>
            )}
          </div>

          {remainingLessons.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto p-1">
              {remainingLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/course/${lesson.id}`}
                  className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/70 p-3 text-xs transition hover:border-flutter-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950/40 dark:hover:border-neutral-700"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="shrink-0 rounded-md border border-flutter-200/80 bg-flutter-50 px-2 py-0.5 text-[10px] font-extrabold uppercase text-flutter-700 dark:border-flutter-800/80 dark:bg-flutter-950/80 dark:text-flutter-300">
                      {lesson.moduleId.replace(/^module-?/, 'Mod ').toUpperCase()}
                    </span>
                    <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">
                      {lesson.title}
                    </span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-neutral-600 dark:text-neutral-300">
              You have completed every lesson in this course! You are ready to take the 5 timed mock tests in the Exam Prep Hub.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
