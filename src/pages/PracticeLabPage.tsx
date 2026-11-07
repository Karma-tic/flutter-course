import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Bug,
  Eye,
  RotateCw,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { dartPracticeProblems, flashcardsData } from '../data/practiceLabData';
import { CodeBlock } from '../components/CodeBlock';
import { DartPadEmbed } from '../components/DartPadEmbed';

export const PracticeLabPage: React.FC = () => {
  type LabTab = 'dart-problems' | 'mini-projects' | 'predict-output' | 'spot-bug' | 'flashcards';
  const [activeTab, setActiveTab] = useState<LabTab>('dart-problems');

  // Dart Problems filter
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchProblem, setSearchProblem] = useState('');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const toggleMastered = (id: string) => {
    setMasteredCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mini Projects Data
  const miniProjects = [
    {
      id: 'p1',
      title: 'Student Details App (The Exam Project)',
      moduleId: 'm10',
      lessonId: 'm10-l1',
      badge: 'Company Exam Project ★',
      desc: 'Build full student form with Name, Roll No, Marks (0-100), Course Dropdown, Validations, and Result View with Grade.',
      tags: ['Form', 'Validation', 'Dropdown', 'Grade Rubric'],
    },
    {
      id: 'p2',
      title: 'Smart Discount & Bill Calculator',
      moduleId: 'm10',
      lessonId: 'm10-l2',
      badge: 'Commercial Math',
      desc: 'Calculate tiered discounts, coupon validation, taxable subtotal, GST/tax additions, and step-by-step receipt.',
      tags: ['Commercial Math', 'StatefulWidget', 'TextEditingController'],
    },
    {
      id: 'p3',
      title: 'Offline To-Do App with SQLite',
      moduleId: 'm10',
      lessonId: 'm10-l3',
      badge: 'Data Persistence',
      desc: 'Complete CRUD task manager with local SQLite database (sqflite), task categories, and completed toggles.',
      tags: ['SQLite', 'CRUD', 'ListView.separated'],
    },
    {
      id: 'p4',
      title: 'Live Weather Forecast App',
      moduleId: 'm10',
      lessonId: 'm10-l4',
      badge: 'REST APIs & Dio',
      desc: 'Fetch live city weather data using Dio HTTP client, FutureBuilder, json_serializable models, and error handling.',
      tags: ['Dio', 'REST API', 'FutureBuilder'],
    },
    {
      id: 'p5',
      title: 'Offline Notes App with Search & Hive',
      moduleId: 'm10',
      lessonId: 'm10-l5',
      badge: 'NoSQL Local DB',
      desc: 'Fast notes notepad with pin note, color tagging, full-text instant search, and Hive NoSQL storage.',
      tags: ['Hive NoSQL', 'Search', 'Grid'],
    },
    {
      id: 'p6',
      title: 'E-Commerce Storefront & Firebase Auth',
      moduleId: 'm10',
      lessonId: 'm10-l6',
      badge: 'Firebase Backend',
      desc: 'Product catalog with Provider shopping cart, Firebase Email/Password Authentication, and Firestore checkout.',
      tags: ['Provider', 'Firebase Auth', 'Firestore'],
    },
    {
      id: 'p7',
      title: 'Device Battery Status via Native Platform Channel',
      moduleId: 'm10',
      lessonId: 'm10-l7',
      badge: 'Android Native Bridge',
      desc: 'Connect Flutter with native Android Kotlin via MethodChannel & EventChannel with BroadcastReceiver for battery changes.',
      tags: ['MethodChannel', 'BroadcastReceiver', 'Kotlin'],
    },
    {
      id: 'p8',
      title: 'Gym Workout Timer with Android Foreground Service',
      moduleId: 'm10',
      lessonId: 'm10-l8',
      badge: 'Background Execution',
      desc: 'A background workout interval timer that runs with persistent Android status bar notification even when screen locks.',
      tags: ['Foreground Service', 'WorkManager', 'Local Notifications'],
    },
  ];

  // Predict Output drills
  const predictDrills = [
    {
      id: 'po-1',
      title: 'Dart Cascades & List Mutations',
      code: `void main() {
  var list = [1, 2, 3]
    ..add(4)
    ..removeAt(0);
  print(list);
}`,
      options: ['[1, 2, 3, 4]', '[2, 3, 4]', '[1, 2, 3]', 'Error: cascade on list invalid'],
      correctIndex: 1,
      explanation: 'The cascade operator (..) calls .add(4) on the list mutating it to [1, 2, 3, 4], then calls .removeAt(0) which removes index 0 (item 1), leaving [2, 3, 4].',
    },
    {
      id: 'po-2',
      title: 'Null-Aware Elvis Assignment (??=)',
      code: `void main() {
  String? name;
  name ??= 'Guest';
  name ??= 'Admin';
  print(name);
}`,
      options: ['Guest', 'Admin', 'null', 'Error: duplicate assignment'],
      correctIndex: 0,
      explanation: 'The ??= operator only assigns the right-hand value if the left variable is currently null. The first line sets it to "Guest"; the second line does nothing because it is no longer null.',
    },
    {
      id: 'po-3',
      title: 'Async Future Execution Order',
      code: `void main() {
  print('1');
  Future(() => print('2'));
  scheduleMicrotask(() => print('3'));
  print('4');
}`,
      options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 3, 2, 4', '1, 4, 2, 3'],
      correctIndex: 1,
      explanation: 'Synchronous code runs first (prints 1, then 4). Next, microtask queue runs (prints 3). Lastly, event queue runs (prints 2). Result: 1, 4, 3, 2.',
    },
  ];

  // Spot the Bug drills
  const bugDrills = [
    {
      id: 'sb-1',
      title: 'Infinite ListView Unbounded Height Error',
      brokenCode: `Column(
  children: [
    Text('Recent Orders'),
    ListView.builder(
      itemCount: 20,
      itemBuilder: (context, i) => ListTile(title: Text('Order #$i')),
    ),
  ],
)`,
      bugReason: 'A vertical Column provides unbounded (infinite) height to its children, and ListView.builder also wants infinite height, causing a "Vertical viewport was given unbounded height" layout crash.',
      fixCode: `Column(
  children: [
    Text('Recent Orders'),
    Expanded( // <-- Wrap ListView with Expanded or set shrinkWrap: true
      child: ListView.builder(
        itemCount: 20,
        itemBuilder: (context, i) => ListTile(title: Text('Order #$i')),
      ),
    ),
  ],
)`,
    },
    {
      id: 'sb-2',
      title: 'Calling setState() during build()',
      brokenCode: `@override
Widget build(BuildContext context) {
  if (items.isEmpty) {
    setState(() {
      items.add('Default Item');
    });
  }
  return Text('Count: \${items.length}');
}`,
      bugReason: 'Calling setState() inside the build() method triggers an infinite rebuild loop error ("setState() or markNeedsBuild() called during build"). State mutations belong in initState() or event handlers.',
      fixCode: `@override
void initState() {
  super.initState();
  if (items.isEmpty) {
    items.add('Default Item'); // Safe initialization before first frame
  }
}`,
    },
  ];

  // Filter problems
  const filteredProblems = dartPracticeProblems.filter((p) => {
    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchProblem.toLowerCase()) ||
      p.description.toLowerCase().includes(searchProblem.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    'All',
    'Conditions & Logic',
    'Commercial Logic',
    'String Manipulation',
    'Collections & Filtering',
    'Async & Futures',
    'OOP & Modeling',
    'Commercial Math',
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Lab Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
              <Code2 className="h-3.5 w-3.5" />
              <span>Interactive Practice Lab</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Hands-On Coding Drills &amp; Projects
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Sharpen your muscle memory with 25+ curated Dart coding challenges, 8 real-world production projects, predict-the-output questions, and spaced repetition flashcards.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            {[
              { id: 'dart-problems', label: '25+ Dart Drills', icon: Code2 },
              { id: 'mini-projects', label: '8 Mini Projects', icon: Layers },
              { id: 'predict-output', label: 'Predict the Output', icon: Eye },
              { id: 'spot-bug', label: 'Spot the Bug', icon: Bug },
              { id: 'flashcards', label: 'Spaced Flashcards', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as LabTab)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    isActive
                      ? 'bg-flutter-600 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: 25+ Dart Drills */}
        {activeTab === 'dart-problems' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      categoryFilter === cat
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchProblem}
                  onChange={(e) => setSearchProblem(e.target.value)}
                  placeholder="Search problem title..."
                  className="rounded-xl border border-neutral-200 bg-white pl-8 pr-4 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Problems Grid */}
            <div className="space-y-4">
              {filteredProblems.map((prob, idx) => {
                const isRevealed = revealedSolutions[prob.id] ?? false;
                return (
                  <div
                    key={prob.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-flutter-50 px-2 py-0.5 text-[10px] font-bold uppercase text-flutter-700 dark:bg-flutter-950 dark:text-flutter-300">
                          Problem #{idx + 1}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {prob.category}
                        </span>
                      </div>
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                        {prob.difficulty}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {prob.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                        {prob.description}
                      </p>
                    </div>

                    {/* Starter Code */}
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        Starter Code (Copy to practice)
                      </span>
                      <CodeBlock
                        code={prob.starterCode}
                        language="dart"
                        title="Starter Template"
                      />
                    </div>

                    {/* Solution Reveal Button */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                      <button
                        onClick={() => toggleSolution(prob.id)}
                        className="rounded-lg border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      >
                        {isRevealed ? 'Hide Solution' : 'Reveal Solution'}
                      </button>

                      <a
                        href="https://dartpad.dev/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
                      >
                        <span>Open DartPad</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {/* Solution Container */}
                    {isRevealed && (
                      <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <CodeBlock
                          code={prob.solutionDart}
                          language="dart"
                          title="Complete Dart Solution"
                          showLineNumbers={true}
                        />

                        {prob.solutionKotlin && (
                          <CodeBlock
                            code={prob.solutionKotlin}
                            language="kotlin"
                            title="Native Android Kotlin Comparison"
                            showLineNumbers={true}
                          />
                        )}

                        <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-300">
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">
                            Why this works:{' '}
                          </span>
                          {prob.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 8 Mini Projects */}
        {activeTab === 'mini-projects' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                8 Guided Production Mini-Projects
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Each project includes complete, working, well-commented source code and a guided step-by-step build in Module 10.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {miniProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        Project #{idx + 1}
                      </span>
                      <span className="rounded-md bg-flutter-50 px-2 py-0.5 text-[10px] font-bold text-flutter-700 dark:bg-flutter-950 dark:text-flutter-300">
                        {p.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {p.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      to={`/course/${p.lessonId}`}
                      className="flex items-center justify-between text-xs font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
                    >
                      <span>View Full Guided Build &amp; Source</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Predict the Output */}
        {activeTab === 'predict-output' && (
          <div className="space-y-4">
            {predictDrills.map((drill, idx) => (
              <div
                key={drill.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
              >
                <div>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    Trace #{idx + 1}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {drill.title}
                  </h3>
                </div>

                <CodeBlock code={drill.code} language="dart" />

                <div className="space-y-2">
                  <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    What will be printed to the console?
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {drill.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`rounded-xl border p-3 text-xs font-mono transition ${
                          optIdx === drill.correctIndex
                            ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-200'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400'
                        }`}
                      >
                        <span className="font-bold mr-2">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-neutral-100 p-3 text-xs text-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300">
                  <span className="font-bold">Execution Walkthrough: </span>
                  {drill.explanation}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Spot the Bug */}
        {activeTab === 'spot-bug' && (
          <div className="space-y-4">
            {bugDrills.map((drill, idx) => (
              <div
                key={drill.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
              >
                <div>
                  <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700 dark:bg-red-950 dark:text-red-300">
                    Bug #{idx + 1}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {drill.title}
                  </h3>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    Broken Snippet (Contains Bug):
                  </span>
                  <CodeBlock code={drill.brokenCode} language="dart" />
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-xs text-red-950 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-200">
                  <span className="font-bold">What is wrong: </span>
                  {drill.bugReason}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Corrected Code:
                  </span>
                  <CodeBlock code={drill.fixCode} language="dart" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Spaced-Repetition Flashcards */}
        {activeTab === 'flashcards' && (
          <div className="mx-auto max-w-xl space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                <span>
                  Card {cardIndex + 1} of {flashcardsData.length}
                </span>
                <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  {flashcardsData[cardIndex].category}
                </span>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-56 cursor-pointer rounded-2xl border-2 border-dashed border-flutter-300 bg-flutter-50/30 p-8 flex flex-col items-center justify-center text-center transition hover:border-flutter-500 dark:border-flutter-900 dark:bg-flutter-950/20"
              >
                {!isFlipped ? (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-flutter-600 dark:text-flutter-400">
                      Tap / Click to Flip
                    </span>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                      {flashcardsData[cardIndex].front}
                    </h3>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Answer Definition
                    </span>
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                      {flashcardsData[cardIndex].back}
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((p) => Math.max(0, p - 1));
                  }}
                  disabled={cardIndex === 0}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300"
                >
                  Previous
                </button>

                <button
                  onClick={() => toggleMastered(flashcardsData[cardIndex].id)}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    masteredCards[flashcardsData[cardIndex].id]
                      ? 'bg-emerald-600 text-white'
                      : 'border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {masteredCards[flashcardsData[cardIndex].id]
                      ? 'Mastered'
                      : 'Mark Mastered'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((p) => Math.min(flashcardsData.length - 1, p + 1));
                  }}
                  disabled={cardIndex === flashcardsData.length - 1}
                  className="rounded-xl bg-flutter-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-flutter-700 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

