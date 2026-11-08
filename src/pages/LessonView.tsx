import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Lightbulb,
  AlertTriangle,
  FileEdit,
  Save,
  Bookmark,
  Menu,
  X,
  Sparkles,
  Smile,
  Zap,
} from 'lucide-react';
import { allLessons } from '../data/curriculum';
import { modules } from '../data/curriculum/modules';
import { useProgress } from '../context/ProgressContext';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';
import { DartPadEmbed } from '../components/DartPadEmbed';
import { QuizWidget } from '../components/QuizWidget';
import { Sidebar } from '../components/Sidebar';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { JargonBusterWidget } from '../components/JargonBusterWidget';
import { KofiLessonBanner } from '../components/KofiLessonBanner';

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const {
    progress,
    markLessonComplete,
    unmarkLessonComplete,
    saveNote,
    setLastVisited,
    toggleBookmark,
  } = useProgress();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'notes'>('lesson');
  const [noteText, setNoteText] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [isEli5Mode, setIsEli5Mode] = useState(false);

  // Find current lesson
  const currentLesson =
    allLessons.find((l) => l.id === lessonId) || allLessons[0];
  const currentModule = modules.find((m) => m.id === currentLesson.moduleId);

  // Lesson index in list
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = progress.completedLessons.includes(currentLesson.id);
  const isBookmarked = progress.bookmarks.includes(currentLesson.id);

  // Scroll to top on lesson switch & update last visited
  useEffect(() => {
    window.scrollTo(0, 0);
    setLastVisited(currentLesson.id);
    setNoteText(progress.notes[currentLesson.id] || '');
    setShowSolution(false);
    setIsEli5Mode(false);
  }, [currentLesson.id]);

  const handleToggleComplete = () => {
    if (isCompleted) {
      unmarkLessonComplete(currentLesson.id);
    } else {
      markLessonComplete(currentLesson.id);
    }
  };

  const handleSaveNote = () => {
    saveNote(currentLesson.id, noteText);
    alert('Note saved to browser storage!');
  };

  // Fun trivia tailored to keep dopamine high
  const funFacts: Record<string, string> = {
    'm0-l1': 'Google Pay was completely rebuilt from scratch using Flutter. Over 150 million users across the world use this single Flutter codebase every single day!',
    'm0-l2': 'Flutter uses Impeller, a graphics engine written from scratch in C++ that talks directly to your phone’s GPU via Vulkan and Metal. That’s why it hits 120 FPS buttery-smooth frame rates!',
    'm0-l3': 'The "pubspec.yaml" format is named after the Latin word "publicus", meaning public. It connects to pub.dev, which hosts over 50,000 community packages!',
    'm0-l4': 'Hot Reload doesn’t just re-run your app: it injects updated bytecode into the running Dart VM while preserving your variable values in memory! You can literally change your app while you are mid-checkout!',
    'm1-l1': 'Dart was originally created by Lars Bak and Kasper Lund, the same legendary Danish computer scientists who built Google Chrome’s V8 JavaScript engine!',
    'm2-l1': 'In Flutter, even padding, alignment, and gesture detectors are widgets. If it influences pixels on screen, it’s a widget!',
    'm3-l1': 'In native Android, an EditText requires lots of XML wiring and findViewById calls. In Flutter, TextFormField does text editing, regex validation, and error decoration in just 10 lines of code!',
    'm4-l1': 'ListView.builder calculates what is visible on your screen and destroys widgets that scroll out of view, saving 90% of device RAM compared to static lists!',
    'm7-l1': 'An Android Activity can be destroyed by the OS at any second when you rotate your phone! Learning how to preserve state here is the #1 trick asked in technical exams.',
  };

  const currentFunFact =
    funFacts[currentLesson.id] ||
    'You are building real, production-ready mobile engineering skills! Every line of code you write here is directly applicable to both personal projects and technical interview exams.';

  // Table of Contents anchors
  const tocItems = [
    { id: 'goal', label: '1. Goal & Objectives' },
    { id: 'explanation', label: '2. Simple Explanation' },
    { id: 'analogy', label: '3. Real-World Analogy' },
    { id: 'code-example', label: '4. Code Example' },
    { id: 'walkthrough', label: '5. Step-by-Step Breakdown' },
    { id: 'common-mistakes', label: '6. Common Traps & Fixes' },
    { id: 'practice-task', label: '7. Hands-on Practice' },
    { id: 'concept-quiz', label: '8. Concept Quiz' },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50/40 dark:bg-neutral-950/40">
      {/* Desktop Left Sidebar */}
      <div className="hidden lg:block w-72 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-neutral-900 h-full z-10 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                Course Curriculum
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar onCloseMobile={() => setSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Central Lesson Body */}
      <div className="flex-1 min-w-0">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-10">
          {/* Top Bar with Mobile Menu & Breadcrumbs */}
          <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-1 rounded-lg border border-neutral-200 p-1.5 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 mr-2"
                aria-label="Open lessons drawer"
              >
                <Menu className="h-4 w-4" />
              </button>
              <Link to="/course" className="hover:underline">
                Course
              </Link>
              <span>/</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-[150px] sm:max-w-none">
                {currentModule?.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Bookmark Toggle */}
              <button
                onClick={() => toggleBookmark(currentLesson.id)}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark this lesson'}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  isBookmarked
                    ? 'border-flutter-500 bg-flutter-50 text-flutter-600 dark:bg-flutter-950/60 dark:text-flutter-300'
                    : 'border-neutral-200 text-neutral-400 hover:text-neutral-700 dark:border-neutral-700 dark:hover:text-neutral-200'
                }`}
              >
                <Bookmark className="h-4 w-4 fill-current" />
              </button>

              {/* Mark Complete Button */}
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs hover:bg-emerald-700'
                    : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>

          {/* Lesson Header */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {currentModule?.id.toUpperCase()} • Lesson {currentLesson.order}
              </span>

              <span className="flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                <Clock className="h-3 w-3" />
                {currentLesson.durationMinutes} min read
              </span>

              <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                {currentLesson.difficulty}
              </span>

              {currentLesson.lastVerified && (
                <span className="text-[10px] text-neutral-400">
                  Verified: {currentLesson.lastVerified}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              {currentLesson.title}
            </h1>

            <div className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <RichTextRenderer content={currentLesson.description} />
            </div>

            {/* Exam Alerts (if any) */}
            {currentLesson.examAlerts && currentLesson.examAlerts.length > 0 && (
              <div className="space-y-2">
                {currentLesson.examAlerts.map((alertText, idx) => (
                  <Callout key={idx} type="exam" title="Company Exam Alert">
                    <RichTextRenderer content={alertText} />
                  </Callout>
                ))}
              </div>
            )}

            {/* Interactive Jargon Buster Quick Widget */}
            <JargonBusterWidget />
          </div>

          {/* Tabs: Lesson vs Personal Notes & ELI5 Mode Toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-between border-b border-neutral-200 pb-1 gap-2 dark:border-neutral-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'lesson'
                    ? 'border-flutter-600 text-flutter-600 dark:text-flutter-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Lesson Content</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'notes'
                    ? 'border-flutter-600 text-flutter-600 dark:text-flutter-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                <FileEdit className="h-4 w-4" />
                <span>My Notes {noteText ? '(Saved)' : ''}</span>
              </button>
            </div>

            {/* ELI5 Toggle Button */}
            {activeTab === 'lesson' && (
              <button
                onClick={() => setIsEli5Mode(!isEli5Mode)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shadow-2xs ${
                  isEli5Mode
                    ? 'bg-amber-500 text-white ring-2 ring-amber-400/40'
                    : 'border border-amber-300 bg-amber-50/70 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                }`}
              >
                <Smile className="h-3.5 w-3.5" />
                <span>{isEli5Mode ? '👶 ELI5 Active (Ultra-Simple)' : '👶 Switch to ELI5 Mode'}</span>
              </button>
            )}
          </div>

          {/* Tab 1: Lesson Content */}
          {activeTab === 'lesson' ? (
            <div className="mt-8 space-y-10 text-neutral-800 dark:text-neutral-200">
              {/* ELI5 Mode Banner if active */}
              {isEli5Mode && (
                <div className="rounded-2xl border-2 border-amber-400 bg-amber-50/90 p-5 shadow-xs dark:border-amber-700 dark:bg-amber-950/30 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👶</span>
                    <h3 className="font-extrabold text-sm text-amber-950 dark:text-amber-200">
                      Explain Like I&apos;m 5 (ELI5) Breakdown:
                    </h3>
                  </div>
                  <div className="text-xs space-y-2 text-amber-900 dark:text-amber-300 leading-relaxed font-medium">
                    <p>
                      <strong>1. What this topic is really doing:</strong>{' '}
                      {currentLesson.goal.replace(/^Understand\s+/i, 'We are learning ')}
                    </p>
                    <p>
                      <strong>2. Real-life comparison:</strong> &ldquo;{currentLesson.analogy.split('\n')[0]}&rdquo;
                    </p>
                    <p>
                      <strong>3. The golden rule for exams &amp; jobs:</strong> Don&apos;t memorize syntax word-for-word. Focus on what happens when you press the button or type in the box!
                    </p>
                  </div>
                </div>
              )}

              {/* 1. Goal */}
              <section id="goal" className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-flutter-600 dark:text-flutter-400">
                  Goal of this Lesson
                </h3>
                <div className="rounded-xl border border-flutter-200/80 bg-flutter-50/40 p-4 text-sm font-medium text-neutral-900 dark:border-flutter-900/50 dark:bg-flutter-950/20 dark:text-neutral-100">
                  <RichTextRenderer content={currentLesson.goal} />
                </div>
              </section>

              {/* 2. Simple Explanation */}
              <section id="explanation" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Simple Explanation
                  </h3>
                  <span className="text-xs text-neutral-400">No jargon assumed</span>
                </div>
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                  <RichTextRenderer content={currentLesson.simpleExplanation} />
                </div>
              </section>

              {/* 3. Real-World Analogy */}
              <section id="analogy" className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" />
                  Real-World Beginner Analogy
                </h3>
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200 leading-relaxed italic">
                  <RichTextRenderer content={currentLesson.analogy} />
                </div>
              </section>

              {/* Mind Blown Fun Fact Card */}
              <div className="rounded-2xl border border-purple-200/70 bg-gradient-to-r from-purple-50/60 to-indigo-50/40 p-4 text-xs dark:border-purple-900/40 dark:from-purple-950/20 dark:to-neutral-900 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 text-[10px]">
                    Mind Blown 🤯 Did You Know?
                  </span>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {currentFunFact}
                  </p>
                </div>
              </div>

              {/* 4. Code Example */}
              <section id="code-example" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Code Example
                  </h3>
                  <span className="text-xs text-neutral-400 font-mono">
                    {currentLesson.codeLanguage || 'dart'}
                  </span>
                </div>
                <CodeBlock
                  code={currentLesson.codeSnippet}
                  language={currentLesson.codeLanguage || 'dart'}
                  showLineNumbers={true}
                />
              </section>

              {/* Interactive DartPad Sandbox */}
              <DartPadEmbed
                initialCode={currentLesson.dartPadCode || currentLesson.codeSnippet}
                type={currentLesson.dartPadType || 'flutter'}
                title={`Interactive Sandbox: ${currentLesson.title}`}
              />

              {/* 5. Step-by-Step Breakdown */}
              {currentLesson.walkthroughSteps &&
                currentLesson.walkthroughSteps.length > 0 && (
                  <section id="walkthrough" className="space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Step-by-Step Code Walkthrough
                    </h3>
                    <div className="space-y-3">
                      {currentLesson.walkthroughSteps.map((step) => (
                        <div
                          key={step.step}
                          className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-flutter-600 text-xs font-bold text-white">
                            {step.step}
                          </span>
                          <div className="space-y-1 flex-1">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {step.title}
                            </h4>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              <RichTextRenderer content={step.description} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {/* 6. Common Mistakes */}
              {currentLesson.commonMistakes &&
                currentLesson.commonMistakes.length > 0 && (
                  <section id="common-mistakes" className="space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      Common Beginner Mistakes &amp; How to Fix Them
                    </h3>
                    <div className="space-y-3">
                      {currentLesson.commonMistakes.map((item, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2 text-xs"
                        >
                          <div className="font-semibold text-red-600 dark:text-red-400 flex items-start gap-1.5">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>Mistake: {item.mistake}</span>
                          </div>
                          <div className="rounded-lg bg-neutral-100 p-2.5 font-medium text-emerald-800 dark:bg-neutral-800 dark:text-emerald-300">
                            <span className="font-bold">The Fix: </span>
                            <RichTextRenderer content={item.fix} />
                          </div>
                          <div className="text-neutral-500 dark:text-neutral-400">
                            <span className="font-semibold text-neutral-700 dark:text-neutral-300">Why this happens: </span>{' '}
                            <RichTextRenderer content={item.why} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              {/* Tips */}
              {currentLesson.tips && currentLesson.tips.length > 0 && (
                <div className="space-y-2">
                  {currentLesson.tips.map((tip, tIdx) => (
                    <Callout key={tIdx} type="tip" title="Practical Pro Tip">
                      <RichTextRenderer content={tip} />
                    </Callout>
                  ))}
                </div>
              )}

              {/* 7. Practice Task */}
              {currentLesson.practiceTask && (
                <section
                  id="practice-task"
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                      🎯 Hands-on Practice Task
                    </h3>
                    <span className="text-xs text-flutter-600 dark:text-flutter-400 font-semibold">
                      Coding Drill
                    </span>
                  </div>

                  <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    <RichTextRenderer content={currentLesson.practiceTask.task} />
                  </div>

                  <div className="rounded-xl bg-neutral-50 p-3.5 text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-neutral-200">
                      💡 Hint:{' '}
                    </span>
                    <RichTextRenderer content={currentLesson.practiceTask.hint} />
                  </div>

                  <div>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    >
                      {showSolution ? 'Hide Solution' : 'Reveal Solution Code'}
                    </button>

                    {showSolution && (
                      <div className="mt-3">
                        <CodeBlock
                          code={currentLesson.practiceTask.solution}
                          language="dart"
                          title="Practice Task Solution"
                        />
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 8. Concept Quiz */}
              <section id="concept-quiz">
                <QuizWidget
                  lessonId={currentLesson.id}
                  questions={currentLesson.quiz || currentLesson.quizQuestions || []}
                />
              </section>

              {/* End-of-Lesson Ko-fi Support Banner */}
              <KofiLessonBanner />

              {/* Bottom Navigation (Prev / Next) */}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
                {prevLesson ? (
                  <button
                    onClick={() => navigate(`/course/${prevLesson.id}`)}
                    className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-[10px] text-neutral-400 font-normal">
                        Previous Lesson
                      </div>
                      <div className="truncate max-w-[140px] sm:max-w-xs">
                        {prevLesson.title}
                      </div>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <button
                    onClick={() => navigate(`/course/${nextLesson.id}`)}
                    className="flex items-center gap-2 rounded-xl bg-flutter-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-flutter-700"
                  >
                    <div className="text-right">
                      <div className="text-[10px] text-flutter-200 font-normal">
                        Next Lesson
                      </div>
                      <div className="truncate max-w-[140px] sm:max-w-xs">
                        {nextLesson.title}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    to="/exam-prep"
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-red-700"
                  >
                    <span>Proceed to Exam Prep Hub</span>
                    <Award className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Personal Notes */
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Your Private Notes for &ldquo;{currentLesson.title}&rdquo;
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Notes are stored directly in your browser&apos;s localStorage. They survive page reloads and can be exported as JSON in the footer.
                </p>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={10}
                placeholder="Write your key takeaways, code ideas, or exam reminders here..."
                className="w-full rounded-xl border border-neutral-200 bg-white p-4 font-mono text-xs text-neutral-900 focus:border-flutter-500 focus:outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 rounded-xl bg-flutter-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-flutter-700"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Table of Contents (Desktop only) */}
      <aside className="hidden xl:block w-64 shrink-0 border-l border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          On This Page
        </h4>
        <nav className="space-y-1.5 text-xs">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block rounded-md px-2 py-1 text-neutral-600 transition hover:bg-neutral-100 hover:text-flutter-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-flutter-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Quick Quiz Pass Indicator */}
        <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Quiz Status
          </div>
          {progress.quizScores[currentLesson.id] !== undefined ? (
            <div className="rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              Score: {progress.quizScores[currentLesson.id]}%
              {progress.quizScores[currentLesson.id] >= 70
                ? ' (Passed ✓)'
                : ' (Retake for 70%)'}
            </div>
          ) : (
            <div className="text-xs text-neutral-400">Not taken yet</div>
          )}
        </div>
      </aside>
    </div>
  );
};

export const CoursePage: React.FC = () => {
  return <LessonView />;
};
