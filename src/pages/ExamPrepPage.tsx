import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock,
  Code2,
  FileCheck,
  HelpCircle,
  Smartphone,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  Filter,
  CheckSquare,
  Square,
  RotateCcw,
  Play,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { allLessons } from '../data/curriculum';
import {
  studentDetailsExamProject,
  topicWiseQuestionBank,
  discountProblemsData,
  androidTheoryData,
  flutterInterviewQuestions,
  mockTestsData,
  sevenDayRevisionPlan,
  examSyllabusAdvice,
  validationRecipesData,
} from '../data/examPrepData';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { DiscountCalculatorWidget } from '../components/DiscountCalculatorWidget';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { useProgress } from '../context/ProgressContext';
import { MockTestItem } from '../types';

export const ExamPrepPage: React.FC = () => {
  const location = useLocation();
  const { progress, toggleExamChecklistTopic, saveMockTestScore } = useProgress();

  // Active Tab
  type TabKey =
    | 'project'
    | 'questions'
    | 'discount'
    | 'validation'
    | 'android-theory'
    | 'interview'
    | 'mock-tests'
    | 'revision-plan';

  const [activeTab, setActiveTab] = useState<TabKey>('project');

  useEffect(() => {
    if (location.hash) {
      const cleanHash = location.hash.replace('#', '') as TabKey;
      if (
        [
          'project',
          'questions',
          'discount',
          'validation',
          'android-theory',
          'interview',
          'mock-tests',
          'revision-plan',
        ].includes(cleanHash)
      ) {
        setActiveTab(cleanHash);
      }
    }
  }, [location.hash]);

  // Project Code Toggle (Flutter vs Kotlin + XML)
  const [projectCodeView, setProjectCodeView] = useState<'flutter' | 'kotlin' | 'xml'>('flutter');

  // Question Bank Category Filter
  const questionTopics = [
    'All',
    ...Array.from(new Set(topicWiseQuestionBank.map((q) => q.topic))),
  ];
  const [activeQuestionTopic, setActiveQuestionTopic] = useState<string>('All');

  // Interview Questions Filters
  const [interviewLevel, setInterviewLevel] = useState<string>('All');
  const [interviewSearch, setInterviewSearch] = useState<string>('');

  // Android Theory Category Filter
  const [androidCategory, setAndroidCategory] = useState<string>('All');

  // Mock Test State
  const [activeMockTest, setActiveMockTest] = useState<MockTestItem | null>(null);
  const [mockCurrentQ, setMockCurrentQ] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<Record<number, number>>({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [mockTimeRemaining, setMockTimeRemaining] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [unlockedOverrides, setUnlockedOverrides] = useState<Record<string, boolean>>({});

  const checkMockUnlocked = (idx: number): { isUnlocked: boolean; requirement: string } => {
    if (unlockedOverrides[`mock-${idx + 1}`]) {
      return { isUnlocked: true, requirement: 'Unlocked via Practice Override' };
    }

    const m0m1Lessons = allLessons.filter((l) => l.moduleId === 'module-0' || l.moduleId === 'module-1');
    const m0m1Done = m0m1Lessons.every((l) => progress.completedLessons.includes(l.id));

    const m2Lessons = allLessons.filter((l) => l.moduleId === 'module-2');
    const m2Done = m2Lessons.every((l) => progress.completedLessons.includes(l.id));

    const m3Lessons = allLessons.filter((l) => l.moduleId === 'module-3');
    const m3Done = m3Lessons.every((l) => progress.completedLessons.includes(l.id));

    const m5Lessons = allLessons.filter((l) => l.moduleId === 'module-5');
    const m5Done = m5Lessons.every((l) => progress.completedLessons.includes(l.id));

    const mock1Passed = (progress.mockTestScores['mock-1'] || 0) >= 60;
    const mock2Passed = (progress.mockTestScores['mock-2'] || 0) >= 60;
    const mock3Passed = (progress.mockTestScores['mock-3'] || 0) >= 60;
    const mock4Passed = (progress.mockTestScores['mock-4'] || 0) >= 60;

    switch (idx) {
      case 0:
        return {
          isUnlocked: m0m1Done,
          requirement: 'Complete Module 0 & Module 1 (Dart Fundamentals)',
        };
      case 1:
        return {
          isUnlocked: m0m1Done && m2Done && mock1Passed,
          requirement: 'Complete Module 2 (Flutter UI) + Pass Mock Test 1 (≥ 60%)',
        };
      case 2:
        return {
          isUnlocked: m3Done && mock2Passed,
          requirement: 'Complete Module 3 (Forms & Validation) + Pass Mock Test 2 (≥ 60%)',
        };
      case 3:
        return {
          isUnlocked: m5Done && mock3Passed,
          requirement: 'Complete Module 5 (State Management) + Pass Mock Test 3 (≥ 60%)',
        };
      case 4:
        return {
          isUnlocked: progress.completedLessons.length >= 45 && mock4Passed,
          requirement: 'Complete at least 45 lessons + Pass Mock Test 4 (≥ 60%)',
        };
      default:
        return { isUnlocked: true, requirement: '' };
    }
  };

  // Timer effect for mock test
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && mockTimeRemaining > 0 && !mockSubmitted) {
      timer = setInterval(() => {
        setMockTimeRemaining((prev) => {
          if (prev <= 1) {
            handleMockSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, mockTimeRemaining, mockSubmitted]);

  const handleStartMock = (test: MockTestItem) => {
    setActiveMockTest(test);
    setMockCurrentQ(0);
    setMockAnswers({});
    setMockSubmitted(false);
    setMockTimeRemaining(test.durationMinutes * 60);
    setTimerActive(true);
  };

  const handleMockSubmit = () => {
    if (!activeMockTest) return;
    setTimerActive(false);
    setMockSubmitted(true);
    let correct = 0;
    activeMockTest.questions.forEach((q, idx) => {
      if (mockAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / activeMockTest.questions.length) * 100);
    saveMockTestScore(activeMockTest.id, score);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  // Checklist items
  const syllabusTopics = [
    'Student Details App (Full UI + Validations + Grade Table)',
    'Activity Lifecycle vs StatefulWidget (All callbacks)',
    'Form & GlobalKey<FormState> & TextEditingController',
    'DropdownButtonFormField vs Android Spinner with ArrayAdapter',
    'ListView.builder vs Android RecyclerView + ViewHolder pattern',
    'Commercial Discount & Tax Formulas (Flat, Tiered, Coupon)',
    'Passing Data between Screens & Explicit vs Implicit Intents',
    'Platform Channels (MethodChannel & EventChannel)',
    'Android Services (Started vs Bound, Foreground execution)',
    'BroadcastReceivers (Dynamic vs Manifest registration)',
    'Input Validations (Regex, Marks 0-100, Phone, Email)',
  ];

  const checkedCount = syllabusTopics.filter((t) =>
    progress.customExamTopics.includes(t)
  ).length;

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="rounded-3xl border border-red-200/80 bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 p-6 sm:p-8 shadow-xs dark:border-red-900/40 dark:from-red-950/30 dark:via-neutral-900 dark:to-neutral-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-100/70 px-3 py-1 text-xs font-bold text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300">
                <Award className="h-3.5 w-3.5" />
                <span>Highest Priority Module</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Company Exam &amp; Interview Prep Hub
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Everything required to pass your company exam and technical interview: complete Student Details app code in both Flutter and native Kotlin+XML, 20+ discount problems, 52 Android core Q&amp;As, 150 Flutter interview answers, and 5 timed mock tests.
              </p>
            </div>

            {/* Checklist Mini Status */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-center shadow-xs dark:border-neutral-800 dark:bg-neutral-900/90 shrink-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Exam Readiness
              </div>
              <div className="mt-1 text-2xl font-black text-red-600 dark:text-red-400">
                {checkedCount}/{syllabusTopics.length}
              </div>
              <div className="text-[11px] text-neutral-500">Core Topics Mastered</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-red-100 pt-6 dark:border-neutral-800">
            {[
              { id: 'project', label: 'Student Details App', icon: Code2 },
              { id: 'questions', label: 'Topic Question Bank', icon: BookOpen },
              { id: 'discount', label: 'Discount Problems (20+)', icon: Calculator },
              { id: 'validation', label: 'Validation Recipes', icon: FileCheck },
              { id: 'android-theory', label: 'Android Core (50+)', icon: Smartphone },
              { id: 'interview', label: 'Flutter Interview (150+)', icon: HelpCircle },
              { id: 'mock-tests', label: '5 Timed Mock Tests', icon: Clock },
              { id: 'revision-plan', label: '7-Day Plan & Checklist', icon: CheckSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabKey);
                    window.location.hash = tab.id;
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: Student Details App (The Exam Project) */}
        {activeTab === 'project' && (
          <div className="mt-8 space-y-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div>
                  <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 dark:bg-red-950 dark:text-red-300">
                    The Main Exam Problem
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {studentDetailsExamProject.title}
                  </h2>
                </div>

                {/* Language Switcher */}
                <div className="flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800">
                  <button
                    onClick={() => setProjectCodeView('flutter')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      projectCodeView === 'flutter'
                        ? 'bg-flutter-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Flutter (Dart)
                  </button>
                  <button
                    onClick={() => setProjectCodeView('kotlin')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      projectCodeView === 'kotlin'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Native Android (Kotlin)
                  </button>
                  <button
                    onClick={() => setProjectCodeView('xml')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      projectCodeView === 'xml'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    Layout (XML)
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="rounded-xl bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                <span className="font-bold text-neutral-900 dark:text-neutral-100">
                  Problem Description:{' '}
                </span>
                Create an application that takes Student Name, Roll Number, Marks (0 to 100), and Course selection from a Dropdown/Spinner. Validate that no fields are empty, roll number is alphanumeric, and marks are within the valid 0-100 range. Compute the letter grade according to university grading rules and display the result formatted on screen.
              </div>

              {/* Exam Scoring Rubric / Grade Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Standard University Grading Rubric
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {studentDetailsExamProject.gradeTableRules.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 text-xs dark:border-neutral-800 dark:bg-neutral-950/40"
                    >
                      <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                        <span>{item.range}</span>
                        <span className="text-flutter-600 dark:text-flutter-400 font-mono font-bold">
                          {item.grade}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        {item.remarks}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Display */}
              <div className="mt-4">
                {projectCodeView === 'flutter' && (
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-flutter-600 dark:text-flutter-400">
                        Full Flutter Solution (`main.dart`)
                      </span>
                      <span>Single-file copy-paste ready</span>
                    </div>
                    <CodeBlock
                      code={studentDetailsExamProject.flutterCode}
                      language="dart"
                      showLineNumbers={true}
                    />
                  </div>
                )}

                {projectCodeView === 'kotlin' && (
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        Full Native Android Solution (`MainActivity.kt`)
                      </span>
                      <span>Kotlin + ViewBinding + Spinner + Validations</span>
                    </div>
                    <CodeBlock
                      code={studentDetailsExamProject.kotlinCode}
                      language="kotlin"
                      showLineNumbers={true}
                    />
                  </div>
                )}

                {projectCodeView === 'xml' && (
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        Native Android Layout (`activity_main.xml`)
                      </span>
                      <span>ConstraintLayout / ScrollView</span>
                    </div>
                    <CodeBlock
                      code={studentDetailsExamProject.xmlCode}
                      language="xml"
                      showLineNumbers={true}
                    />
                  </div>
                )}
              </div>

              {/* Line-by-Line Breakdown */}
              <div className="mt-8 space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Line-by-Line Technical Breakdown &amp; Viva Questions
                </h4>
                <div className="space-y-3">
                  {studentDetailsExamProject.lineByLineExplanation.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-200 bg-white p-4 text-xs dark:border-neutral-800 dark:bg-neutral-900"
                    >
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-flutter-50 font-mono text-[10px] text-flutter-700 dark:bg-flutter-950 dark:text-flutter-300">
                          {idx + 1}
                        </span>
                        <span>{item.lineRef}</span>
                      </div>

                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-flutter-50/40 p-2.5 dark:bg-flutter-950/20">
                          <span className="font-semibold text-flutter-800 dark:text-flutter-300">
                            Flutter Implementation:
                          </span>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-300">
                            {item.flutterExplanation}
                          </p>
                        </div>
                        <div className="rounded-lg bg-purple-50/40 p-2.5 dark:bg-purple-950/20">
                          <span className="font-semibold text-purple-800 dark:text-purple-300">
                            Native Kotlin Implementation:
                          </span>
                          <p className="mt-0.5 text-neutral-600 dark:text-neutral-300">
                            {item.androidExplanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Topic-wise Question Bank */}
        {activeTab === 'questions' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              {questionTopics.map((topicName) => (
                <button
                  key={topicName}
                  onClick={() => setActiveQuestionTopic(topicName)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    activeQuestionTopic === topicName
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                      : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                  }`}
                >
                  {topicName}
                </button>
              ))}
            </div>

            {/* Questions for Selected Topic */}
            <div className="space-y-4">
              {topicWiseQuestionBank
                .filter(
                  (q) =>
                    activeQuestionTopic === 'All' ||
                    q.topic === activeQuestionTopic
                )
                .map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {idx + 1}. {q.question}
                      </h3>
                      <span className="shrink-0 rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                        {q.topic}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <RichTextRenderer content={q.answer} />
                    </div>

                    {q.codeSample && (
                      <CodeBlock
                        code={q.codeSample}
                        language="dart"
                        title="Key Implementation"
                      />
                    )}

                    <div className="rounded-xl border border-red-200 bg-red-50/50 p-3 text-xs text-red-900 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-200">
                      <span className="font-bold">Exam Tip: </span>
                      <RichTextRenderer content={q.examTip} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: Discount Problems & Live Interactive Calculator */}
        {activeTab === 'discount' && (
          <div className="mt-8 space-y-8">
            {/* Live Interactive Calculator Widget */}
            <DiscountCalculatorWidget />

            {/* 20+ Commercial Discount Problems */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  20+ Real-World Commercial Discount &amp; Bill Problems
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Every problem includes the explicit formula, Dart solution, Kotlin solution, and sample input/output.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {discountProblemsData.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950/40 space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                          #{idx + 1} • {item.type}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.problemStatement}
                      </p>
                    </div>

                    <div className="rounded-lg bg-neutral-100 p-2.5 font-mono text-[11px] text-flutter-700 dark:bg-neutral-800 dark:text-flutter-300">
                      Formula: {item.formula}
                    </div>

                    <div className="space-y-2">
                      <CodeBlock
                        code={item.dartCode}
                        language="dart"
                        title="Dart Solution"
                      />
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {item.sampleInputOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Validation Recipes */}
        {activeTab === 'validation' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Copy-Paste Input Validation Recipes (Flutter vs Kotlin)
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Standardized validation rules tested for company exams.
                </p>
              </div>

              <div className="space-y-4">
                {validationRecipesData.map((recipe, idx) => (
                  <div
                    key={recipe.id}
                    className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {idx + 1}. {recipe.title}
                      </h4>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Copy-Paste Ready
                      </span>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400">
                      {recipe.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-flutter-600 dark:text-flutter-400">
                          Flutter TextFormField validator:
                        </span>
                        <CodeBlock code={recipe.flutterValidator} language="dart" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                          Android Kotlin EditText validate:
                        </span>
                        <CodeBlock code={recipe.nativeKotlinValidator} language="kotlin" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Android Core Theory */}
        {activeTab === 'android-theory' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-2">
              {['All', 'Activity & Lifecycle', 'Android Components', 'Intents', 'BroadcastReceiver', 'Services', 'Platform Channels'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setAndroidCategory(cat)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      androidCategory === cat
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <div className="space-y-4">
              {androidTheoryData
                .filter(
                  (item) =>
                    androidCategory === 'All' || item.category === androidCategory
                )
                .map((item, idx) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                        {idx + 1}. {item.question}
                      </div>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          item.examImportance === 'Critical'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        }`}
                      >
                        {item.examImportance}
                      </span>
                    </div>

                    <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <RichTextRenderer content={item.answer} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 6: Flutter Interview Questions (150+) */}
        {activeTab === 'interview' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setInterviewLevel(lvl)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      interviewLevel === lvl
                        ? 'bg-flutter-600 text-white'
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={interviewSearch}
                onChange={(e) => setInterviewSearch(e.target.value)}
                placeholder="Search interview questions..."
                className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="space-y-4">
              {flutterInterviewQuestions
                .filter(
                  (q) =>
                    (interviewLevel === 'All' || q.level === interviewLevel) &&
                    (q.question.toLowerCase().includes(interviewSearch.toLowerCase()) ||
                      q.answer.toLowerCase().includes(interviewSearch.toLowerCase()))
                )
                .slice(0, 30)
                .map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                        {q.level} • {q.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {idx + 1}. {q.question}
                    </h4>

                    <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <RichTextRenderer content={q.answer} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 7: 5 Timed Mock Tests */}
        {activeTab === 'mock-tests' && (
          <div className="mt-8 space-y-6">
            {!activeMockTest ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    5 Timed Company Mock Tests (100 Questions Total)
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Simulate the actual company exam environment. Each test has 20 questions with a strict 25-minute countdown timer.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockTestsData.map((test, idx) => {
                    const score = progress.mockTestScores[test.id];
                    const { isUnlocked, requirement } = checkMockUnlocked(idx);

                    return (
                      <div
                        key={test.id}
                        className={`rounded-2xl border p-5 shadow-xs space-y-3 transition ${
                          isUnlocked
                            ? 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                            : 'border-amber-200/70 bg-amber-50/20 dark:border-amber-900/40 dark:bg-neutral-900/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                              Mock Exam #{idx + 1}
                            </span>
                            {!isUnlocked && (
                              <span className="inline-flex items-center gap-1 rounded-md border border-amber-300/80 bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:border-amber-800/80 dark:bg-amber-950/80 dark:text-amber-300">
                                <Lock className="h-3 w-3" />
                                <span>Locked</span>
                              </span>
                            )}
                          </div>
                          {score !== undefined && (
                            <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                              score >= 60
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                            }`}>
                              Best: {score}%
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                            {test.title}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {test.description}
                          </p>
                        </div>

                        {!isUnlocked && (
                          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-2.5 text-[11px] text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200 leading-snug">
                            <span className="font-bold">Prerequisite: </span>
                            <span>{requirement}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                          <span className="text-neutral-400">
                            20 MCQs • {test.durationMinutes} minutes
                          </span>

                          <div className="flex items-center gap-2">
                            {!isUnlocked && (
                              <button
                                onClick={() => setUnlockedOverrides((prev) => ({ ...prev, [test.id]: true }))}
                                className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 underline decoration-dotted"
                                title="Bypass lock for practice/review"
                              >
                                Practice Mode
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (!isUnlocked) {
                                  alert(`Prerequisite not yet met:\n${requirement}\n\nTip: You can click "Practice Mode" to take this exam anyway.`);
                                  return;
                                }
                                handleStartMock(test);
                              }}
                              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-xs transition ${
                                isUnlocked
                                  ? 'bg-red-600 text-white hover:bg-red-700'
                                  : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 cursor-not-allowed'
                              }`}
                            >
                              {isUnlocked ? (
                                <Play className="h-3 w-3 fill-current" />
                              ) : (
                                <Lock className="h-3 w-3" />
                              )}
                              <span>{isUnlocked ? 'Start Test' : 'Locked'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Active Mock Test Screen */
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      {activeMockTest.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Question {mockCurrentQ + 1} of {activeMockTest.questions.length}
                    </p>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
                    <Clock className="h-4 w-4" />
                    <span>Time Left: {formatTimer(mockTimeRemaining)}</span>
                  </div>
                </div>

                {!mockSubmitted ? (
                  <div className="space-y-6">
                    {/* Progress Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                      {activeMockTest.questions.map((_, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => setMockCurrentQ(qIdx)}
                          className={`h-7 w-7 shrink-0 rounded-lg text-xs font-bold transition ${
                            mockCurrentQ === qIdx
                              ? 'bg-red-600 text-white'
                              : mockAnswers[qIdx] !== undefined
                              ? 'bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
                              : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500'
                          }`}
                        >
                          {qIdx + 1}
                        </button>
                      ))}
                    </div>

                    {/* Question */}
                    <div>
                      <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        {activeMockTest.questions[mockCurrentQ].question}
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {activeMockTest.questions[mockCurrentQ].options.map(
                        (opt, optIdx) => {
                          const isSelected = mockAnswers[mockCurrentQ] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() =>
                                setMockAnswers((prev) => ({
                                  ...prev,
                                  [mockCurrentQ]: optIdx,
                                }))
                              }
                              className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs transition ${
                                isSelected
                                  ? 'border-red-600 bg-red-50 text-neutral-900 dark:border-red-500 dark:bg-red-950/40 dark:text-neutral-100'
                                  : 'border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60'
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                                  isSelected
                                    ? 'border-red-600 bg-red-600 text-white'
                                    : 'border-neutral-300 text-neutral-500 dark:border-neutral-700'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="flex-1 leading-snug">{opt}</span>
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <button
                        onClick={() => setMockCurrentQ((p) => Math.max(0, p - 1))}
                        disabled={mockCurrentQ === 0}
                        className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-400"
                      >
                        Previous
                      </button>

                      {mockCurrentQ < activeMockTest.questions.length - 1 ? (
                        <button
                          onClick={() => setMockCurrentQ((p) => p + 1)}
                          className="rounded-lg bg-neutral-900 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={handleMockSubmit}
                          className="rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-700"
                        >
                          Submit Exam
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Mock Exam Results */
                  <div className="space-y-6">
                    <div className="rounded-2xl bg-neutral-100 p-6 text-center dark:bg-neutral-800">
                      <div className="text-3xl font-black text-red-600 dark:text-red-400">
                        {Math.round(
                          (activeMockTest.questions.filter(
                            (q, i) => mockAnswers[i] === q.correctIndex
                          ).length /
                            activeMockTest.questions.length) *
                            100
                        )}
                        %
                      </div>
                      <div className="mt-1 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Exam Completed
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">
                        You got{' '}
                        {
                          activeMockTest.questions.filter(
                            (q, i) => mockAnswers[i] === q.correctIndex
                          ).length
                        }{' '}
                        out of {activeMockTest.questions.length} correct.
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setActiveMockTest(null)}
                        className="rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
                      >
                        ← Back to Mock Tests
                      </button>

                      <button
                        onClick={() => handleStartMock(activeMockTest)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white"
                      >
                        Retake Test
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: 7-Day Revision Plan & Custom Syllabus Checklist */}
        {activeTab === 'revision-plan' && (
          <div className="mt-8 space-y-8">
            {/* Interactive Syllabus Checklist */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Custom Exam Syllabus Checklist
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Tick off each high-probability topic as you master it (persists in your browser)
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                  {checkedCount} / {syllabusTopics.length} Checked
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {syllabusTopics.map((topic, idx) => {
                  const isChecked = progress.customExamTopics.includes(topic);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleExamChecklistTopic(topic)}
                      className={`flex items-start gap-2.5 rounded-xl border p-3 text-left text-xs transition ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-200'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      ) : (
                        <Square className="h-4 w-4 shrink-0 text-neutral-400 mt-0.5" />
                      )}
                      <span className={isChecked ? 'line-through opacity-80' : 'font-medium'}>
                        {topic}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7-Day Day-by-Day Schedule */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                7-Day Final Revision Schedule
              </h3>
              <div className="space-y-3">
                {sevenDayRevisionPlan.map((day) => (
                  <div
                    key={day.day}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950/40 space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                      <span className="text-red-600 dark:text-red-400">
                        Day {day.day}: {day.title}
                      </span>
                      <span className="text-neutral-400 font-mono">
                        ~{day.estimatedHours} hrs
                      </span>
                    </div>

                    <div className="space-y-1">
                      {day.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                          <span className="text-flutter-600 dark:text-flutter-400">•</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
