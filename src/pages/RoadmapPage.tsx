import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Terminal,
  Cpu,
  Layout,
  FormInput,
  ListTree,
  Repeat,
  Database,
  Smartphone,
  Sparkles,
  TestTube,
  Rocket,
  Award,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { allLessons } from '../data/curriculum';

export const RoadmapPage: React.FC = () => {
  const { progress } = useProgress();

  const stages = [
    {
      id: 'stage-0',
      moduleId: 'm0',
      title: 'Phase 0: Absolute Beginner Onboarding',
      icon: Terminal,
      time: '1–2 Days',
      badge: 'Foundation',
      description: 'Understanding Flutter architecture, setting up VS Code & Android Studio, fixing flutter doctor issues, and Git basics.',
      keyTopics: ['What is Flutter/Dart', 'Doctor & Emulator Setup', 'lib/ & pubspec.yaml', 'Hot Reload vs Hot Restart', 'Git Commits & Push'],
    },
    {
      id: 'stage-1',
      moduleId: 'm1',
      title: 'Phase 1: Dart Programming Mastery',
      icon: Cpu,
      time: '3–5 Days',
      badge: 'Zero-Coding Friendly',
      description: 'From zero coding to confident Dart developer: null safety, arrow functions, object-oriented programming, and async/await.',
      keyTopics: ['Variables & Sound Null Safety', 'Loops & Functions', 'Lists, Sets, Maps', 'OOP, Mixins & Abstract Classes', 'Futures & Streams', 'Discount & Grade Logic'],
    },
    {
      id: 'stage-2',
      moduleId: 'm2',
      title: 'Phase 2: Flutter UI & Layout Engine',
      icon: Layout,
      time: '4–6 Days',
      badge: 'Core UI',
      description: 'The core mental model: Everything is a widget. Build responsive, pixel-perfect layouts using Material 3 design.',
      keyTopics: ['Stateless vs Stateful', 'Row, Column, Stack, Expanded', 'Buttons, Cards, Fonts', 'Material 3 & Dark Theme', 'Scaffold, AppBar, Drawers', 'MediaQuery & Responsive'],
    },
    {
      id: 'stage-3',
      moduleId: 'm3',
      title: 'Phase 3: Inputs, Forms & Validation',
      icon: FormInput,
      time: '3–4 Days',
      badge: 'Exam Critical ★',
      isExamCritical: true,
      description: 'Building professional forms, handling user inputs, dropdowns, radio buttons, and strict regex/marks validation algorithms.',
      keyTopics: ['TextField & TextEditingController', 'DropdownButtonFormField', 'Form & GlobalKey<FormState>', '6 Validation Recipes (Marks 0-100, Phone, Email)', 'Displaying Results on Screen'],
    },
    {
      id: 'stage-4',
      moduleId: 'm4',
      title: 'Phase 4: Dynamic Lists & Navigation',
      icon: ListTree,
      time: '3–4 Days',
      badge: 'Exam Critical ★',
      isExamCritical: true,
      description: 'Efficient high-performance scrolling with recycling, slivers, pull-to-refresh, swipe-to-delete, and modern route management.',
      keyTopics: ['ListView.builder (Recycling)', 'GridView & CustomScrollView', 'Dismissible & Pull to Refresh', 'Navigator 1.0 vs go_router', 'Preserving BottomNav State'],
    },
    {
      id: 'stage-5',
      moduleId: 'm5',
      title: 'Phase 5: State Management Architecture',
      icon: Repeat,
      time: '4–5 Days',
      badge: 'Industry Standard',
      description: 'Stop passing data 10 levels deep. Master Provider, Riverpod, and BLoC/Cubit to write clean, maintainable architecture.',
      keyTopics: ['Ephemeral vs App State', 'ValueNotifier & InheritedWidget', 'Provider In-Depth', 'Riverpod & BLoC/Cubit', 'State Decision Flowchart'],
    },
    {
      id: 'stage-6',
      moduleId: 'm6',
      title: 'Phase 6: Data Persistence & Networking',
      icon: Database,
      time: '4–5 Days',
      badge: 'Production Backend',
      description: 'Connect your apps to the world: REST APIs with Dio, offline SQLite databases, and Firebase cloud services.',
      keyTopics: ['SharedPreferences & SQLite (sqflite)', 'Dio / HTTP REST APIs', 'FutureBuilder & StreamBuilder', 'Firebase Auth & Cloud Firestore', 'Clean Architecture & MVVM'],
    },
    {
      id: 'stage-7',
      moduleId: 'm7',
      title: 'Phase 7: Android Core & Native Channels',
      icon: Smartphone,
      time: '5–7 Days',
      badge: 'Company Exam Core ★',
      isExamCritical: true,
      description: 'Understand the Android operating system beneath Flutter: Activity lifecycle, Intents, Services, BroadcastReceivers, and Kotlin MethodChannels.',
      keyTopics: ['Activity Lifecycle vs StatefulWidget', 'Explicit/Implicit Intents', 'Native Kotlin BroadcastReceivers', 'Foreground Services & WorkManager', 'MethodChannel & EventChannel', 'Pure Kotlin + XML Native Primer'],
    },
    {
      id: 'stage-8',
      moduleId: 'm8',
      title: 'Phase 8: Animations, Hardware & Polish',
      icon: Sparkles,
      time: '3–4 Days',
      badge: 'UI Polish',
      description: 'Make apps delightful with Hero transitions, custom painters, device camera, GPS geolocation, and internationalization.',
      keyTopics: ['Implicit vs Explicit Animations', 'Hero Transitions', 'CustomPainter Canvas', 'Camera & Device Sensors', 'Localization (i18n)'],
    },
    {
      id: 'stage-9',
      moduleId: 'm9',
      title: 'Phase 9: Testing, Profiling & Publishing',
      icon: Rocket,
      time: '3–4 Days',
      badge: 'DevOps & Release',
      description: 'Ensure rock-solid reliability with automated testing, optimize 60fps rendering, build signed release APK/AABs, and set up CI/CD.',
      keyTopics: ['Unit, Widget & Integration Tests', 'Profiling Memory & 60 FPS Jank', 'Building Signed APK & AAB', 'Google Play Console Publishing', 'GitHub Actions CI/CD'],
    },
    {
      id: 'stage-10',
      moduleId: 'm10',
      title: 'Phase 10: Guided Real-World Projects',
      icon: TestTube,
      time: '5–8 Days',
      badge: 'Portfolio Ready',
      description: 'Step-by-step builds of 8 production-grade apps including the Student Details Exam App and Smart Discount Calculator.',
      keyTopics: ['Student Details App (Flutter + Kotlin)', 'Smart Discount / Bill Calculator', 'Offline SQLite Notes & Todo', 'Live Weather & API App', 'Battery Broadcast Channel App'],
    },
    {
      id: 'stage-11',
      moduleId: 'exam-hub',
      title: 'Phase 11: Company Exam Prep & Mock Tests',
      icon: Award,
      time: '2–4 Days',
      badge: 'Final Hurdle ★',
      isExamCritical: true,
      description: 'Crack technical interviews and company exams: 5 timed mock tests, 50+ Android theory questions, and 150+ Flutter interview Q&As.',
      keyTopics: ['5 Timed Mock Tests (100 MCQs)', 'Student Details App Line-by-Line Code', '20+ Commercial Discount Problems', '52 Android Core Theory Q&As', '150+ Flutter Interview Questions'],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 py-12 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
            <span>Career Progression Plan</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            The Flutter Developer Roadmap
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A sequenced, battle-tested learning path taking you from absolute beginner to confident, job-ready Flutter engineer and company exam champion.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative mt-16 space-y-8 before:absolute before:inset-0 before:left-5 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-neutral-200 dark:before:bg-neutral-800">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isEven = idx % 2 === 0;

            // Module progress
            const isExamHub = stage.moduleId === 'exam-hub';
            const modLessons = isExamHub
              ? []
              : allLessons.filter((l) => l.moduleId === stage.moduleId);
            const doneLessons = modLessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            );
            const isCompleted =
              modLessons.length > 0 && doneLessons.length === modLessons.length;

            return (
              <div
                key={stage.id}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-2xl border-4 border-white bg-flutter-600 text-white shadow-md dark:border-neutral-900 z-10">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-14 sm:ml-0 w-full sm:w-[calc(50%-2rem)] ${
                    isEven ? 'sm:text-left sm:pr-4' : 'sm:text-left sm:pl-4'
                  }`}
                >
                  <div
                    className={`rounded-2xl border p-6 shadow-xs transition hover:shadow-md ${
                      stage.isExamCritical
                        ? 'border-red-200 bg-white dark:border-red-900/40 dark:bg-neutral-900'
                        : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          stage.isExamCritical
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'bg-flutter-50 text-flutter-700 dark:bg-flutter-950/60 dark:text-flutter-300'
                        }`}
                      >
                        {stage.badge}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {stage.time}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Key Topics List */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stage.keyTopics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                      {modLessons.length > 0 ? (
                        <span className="text-neutral-400">
                          {doneLessons.length}/{modLessons.length} lessons done
                        </span>
                      ) : (
                        <span className="text-neutral-400">Hub &amp; Tools</span>
                      )}

                      <Link
                        to={isExamHub ? '/exam-prep' : `/course/${modLessons[0]?.id || ''}`}
                        className="flex items-center gap-1 font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
                      >
                        <span>{isExamHub ? 'Open Exam Hub' : 'Enter Module'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
