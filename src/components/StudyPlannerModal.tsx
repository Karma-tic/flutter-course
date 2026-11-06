import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { modules } from '../data/curriculum/modules';

interface StudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyPlannerModal: React.FC<StudyPlannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { progress, setDailyStudyHours } = useProgress();
  const [selectedHours, setSelectedHours] = useState<number>(
    progress.studyPlanDailyHours || 2
  );
  const [targetDays, setTargetDays] = useState<30 | 60 | 90>(30);

  if (!isOpen) return null;

  const totalCourseHours = 65; // Approx 57 lessons + projects + practice
  const daysNeeded = Math.ceil(totalCourseHours / selectedHours);

  const handleSave = (hours: number) => {
    setSelectedHours(hours);
    setDailyStudyHours(hours);
  };

  // 30 / 60 / 90 day schedule breakdown
  const plans = {
    30: [
      { week: 'Week 1 (Days 1–7)', focus: 'Module 0 & 1: Dart Mastery & Tooling', hours: '14 hrs', desc: 'Syntax, null safety, OOP, collections, 25 practice problems.' },
      { week: 'Week 2 (Days 8–14)', focus: 'Module 2 & 3: Flutter UI, Forms & Validation', hours: '15 hrs', desc: 'Layouts, Material 3, Student Details App form fields & validations.' },
      { week: 'Week 3 (Days 15–21)', focus: 'Module 4 & 5 & 7: Lists, State & Android Core', hours: '18 hrs', desc: 'ListView.builder, Provider/BLoC, Android Lifecycle, Platform Channels & BroadcastReceivers.' },
      { week: 'Week 4 (Days 22–30)', focus: 'Module 6, 9, 10 & Exam Hub', hours: '18 hrs', desc: 'SQLite, Timed Mock Tests (all 5), Discount calculation drill, Project polish.' },
    ],
    60: [
      { week: 'Weeks 1–2 (Days 1–15)', focus: 'Module 0 & 1: Dart Fundamentals from Scratch', hours: '20 hrs', desc: 'Zero-pressure foundational Dart, asynchronous coding, collections methods.' },
      { week: 'Weeks 3–4 (Days 16–30)', focus: 'Module 2 & 3: UI, Material Design & Form Validation', hours: '20 hrs', desc: 'Scaffold, responsive layout, TextFormField, regex, error snacks.' },
      { week: 'Weeks 5–6 (Days 31–45)', focus: 'Module 4, 5 & 7: Lists, State & Android Deep Dive', hours: '22 hrs', desc: 'Navigation, Provider, Riverpod, native Kotlin vs Flutter side-by-side.' },
      { week: 'Weeks 7–8 (Days 46–60)', focus: 'Module 6, 8, 9, 10 & 5 Full Mock Tests', hours: '25 hrs', desc: 'Projects 1-8, clean architecture, performance profiling, exam revision.' },
    ],
    90: [
      { week: 'Month 1 (Days 1–30)', focus: 'Dart Fundamentals & Basic Flutter UI', hours: '30 hrs', desc: 'Solid foundation for absolute beginners with zero programming experience.' },
      { week: 'Month 2 (Days 31–60)', focus: 'Forms, Lists, State Management & Networking', hours: '35 hrs', desc: 'Student Details project, Provider/BLoC, REST APIs, local SQLite databases.' },
      { week: 'Month 3 (Days 61–90)', focus: 'Android Core, Advanced Projects & Company Exam Prep', hours: '35 hrs', desc: 'Platform channels, BroadcastReceivers, Services, 5 timed mock tests, interview drill.' },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flutter-500/10 text-flutter-600 dark:text-flutter-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Personalized Study Planner
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Tailor your study pace to reach job-ready & exam-ready status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Daily Commitment Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Select Your Daily Study Commitment
            </label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[1, 2, 3, 4].map((hours) => (
                <button
                  key={hours}
                  onClick={() => handleSave(hours)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition ${
                    selectedHours === hours
                      ? 'border-flutter-600 bg-flutter-50/50 text-flutter-900 ring-2 ring-flutter-500/20 dark:border-flutter-500 dark:bg-flutter-950/40 dark:text-flutter-200'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                  }`}
                >
                  <Clock className="h-4 w-4 mb-1 text-flutter-600 dark:text-flutter-400" />
                  <span className="text-sm font-bold">{hours} hr{hours > 1 ? 's' : ''}/day</span>
                  <span className="text-[10px] text-neutral-400 mt-0.5">
                    ~{Math.ceil(totalCourseHours / hours)} days total
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Track Selector */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Choose Schedule Timeline
              </label>
              <span className="text-xs text-flutter-600 font-semibold dark:text-flutter-400">
                Recommended: {selectedHours >= 2 ? '30-Day Sprint' : '60-Day Pace'}
              </span>
            </div>
            <div className="mt-2.5 flex rounded-xl border border-neutral-200 bg-neutral-100/70 p-1 dark:border-neutral-800 dark:bg-neutral-950">
              {([30, 60, 90] as const).map((days) => (
                <button
                  key={days}
                  onClick={() => setTargetDays(days)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                    targetDays === days
                      ? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {days}-Day {days === 30 ? 'Sprint' : days === 60 ? 'Standard' : 'Casual'}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {targetDays}-Day Milestone Schedule Breakdown
            </div>
            <div className="space-y-2.5">
              {plans[targetDays].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-3.5 text-xs dark:border-neutral-800 dark:bg-neutral-950/40"
                >
                  <div className="flex items-center justify-between font-semibold text-neutral-900 dark:text-neutral-100">
                    <span className="text-flutter-600 dark:text-flutter-400">
                      {item.week}
                    </span>
                    <span className="text-[11px] text-neutral-400">{item.hours}</span>
                  </div>
                  <div className="mt-1 font-medium text-neutral-800 dark:text-neutral-200">
                    {item.focus}
                  </div>
                  <div className="mt-0.5 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="rounded-xl border border-flutter-200 bg-flutter-50/50 p-4 text-xs dark:border-flutter-900/40 dark:bg-flutter-950/30">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 shrink-0 text-flutter-600 dark:text-flutter-400 mt-0.5" />
              <div className="text-neutral-800 dark:text-neutral-200">
                <span className="font-bold">Your Progress Status:</span> You have completed{' '}
                <span className="font-semibold text-flutter-600 dark:text-flutter-400">
                  {progress.completedLessons.length}
                </span>{' '}
                of 57 lessons. At {selectedHours} hr/day, you are on track to be fully job and exam ready in approximately {Math.max(1, daysNeeded - Math.round(progress.completedLessons.length * 1.1))} days!
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-neutral-200 bg-neutral-50 px-6 py-3 dark:border-neutral-800 dark:bg-neutral-950/50">
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Got It, Let&apos;s Study!
          </button>
        </div>
      </div>
    </div>
  );
};
