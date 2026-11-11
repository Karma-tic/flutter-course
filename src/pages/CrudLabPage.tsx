import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  FileCode,
  Smartphone,
  Sparkles,
  Terminal,
  Lock,
  Unlock,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Eye,
  Award,
} from 'lucide-react';
import { CRUD_STEPS, CrudStep } from '../data/crudLabData';
import { CrudPhoneSimulator } from '../components/CrudPhoneSimulator';
import { RichTextRenderer } from '../components/RichTextRenderer';

const LOCAL_STORAGE_KEY = 'karmatix_flutter_crud_lab_v1';

interface LabState {
  currentStepIndex: number;
  completedStepIds: string[];
  codeDrafts: Record<string, string>; // path -> code
}

export const CrudLabPage: React.FC = () => {
  // Load initial state from LocalStorage
  const [labState, setLabState] = useState<LabState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse CRUD lab state from localStorage', e);
    }
    // Default initial files populated from Step 1
    const initialDrafts: Record<string, string> = {};
    CRUD_STEPS.forEach((step) => {
      step.files.forEach((f) => {
        if (!initialDrafts[f.path]) {
          initialDrafts[f.path] = f.starterCode;
        }
      });
    });
    return {
      currentStepIndex: 0,
      completedStepIds: [],
      codeDrafts: initialDrafts,
    };
  });

  const [activeTabMobile, setActiveTabMobile] = useState<'guide' | 'studio'>('guide');
  const [studioMode, setStudioMode] = useState<'editor' | 'preview'>('editor');
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2 | 3>(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{ name: string; passed: boolean; error?: string }>
  >([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [verificationPassed, setVerificationPassed] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentStep: CrudStep = CRUD_STEPS[labState.currentStepIndex] || CRUD_STEPS[0];
  const activeFilePath = currentStep.activeFile;
  const currentCode =
    labState.codeDrafts[activeFilePath] ??
    currentStep.files.find((f) => f.path === activeFilePath)?.starterCode ??
    '';

  // Sync to LocalStorage on update
  useEffect(() => {
    setAutosaveStatus('saving');
    const timer = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(labState));
      setAutosaveStatus('saved');
    }, 500);
    return () => clearTimeout(timer);
  }, [labState]);

  // Reset hint level and verification status when switching steps
  useEffect(() => {
    setHintLevel(0);
    const isStepDone = labState.completedStepIds.includes(currentStep.id);
    setVerificationPassed(isStepDone);
    if (isStepDone) {
      setConsoleLogs(currentStep.successConsoleOutput);
      setTestResults(currentStep.tests.map((t) => ({ name: t.name, passed: true })));
    } else {
      setConsoleLogs([
        `$ flutter test (Step ${currentStep.stepNumber}: ${currentStep.title})`,
        'Ready to verify. Write your code and click "Run & Verify".',
      ]);
      setTestResults([]);
    }
  }, [labState.currentStepIndex, currentStep.id]);

  // Code change handler
  const handleCodeChange = (newCode: string) => {
    setLabState((prev) => ({
      ...prev,
      codeDrafts: {
        ...prev.codeDrafts,
        [activeFilePath]: newCode,
      },
    }));
    // If user modifies code, require re-verification unless already finished
    if (verificationPassed && !labState.completedStepIds.includes(currentStep.id)) {
      setVerificationPassed(false);
    }
  };

  // Run and verify code
  const handleVerify = () => {
    setIsVerifying(true);
    setConsoleLogs([
      `$ dart analyze ${activeFilePath}`,
      'Analyzing syntax and checking contracts...',
    ]);

    setTimeout(() => {
      const results: Array<{ name: string; passed: boolean; error?: string }> = [];
      let allPassed = true;

      for (const test of currentStep.tests) {
        const passed = test.validate(currentCode);
        if (!passed) {
          allPassed = false;
          results.push({
            name: test.name,
            passed: false,
            error: test.failureMessage,
          });
        } else {
          results.push({
            name: test.name,
            passed: true,
          });
        }
      }

      setTestResults(results);

      if (allPassed) {
        setVerificationPassed(true);
        setConsoleLogs(currentStep.successConsoleOutput);
        setLabState((prev) => {
          if (!prev.completedStepIds.includes(currentStep.id)) {
            return {
              ...prev,
              completedStepIds: [...prev.completedStepIds, currentStep.id],
            };
          }
          return prev;
        });
      } else {
        setVerificationPassed(false);
        const failed = results.filter((r) => !r.passed);
        setConsoleLogs([
          `$ dart analyze ${activeFilePath}`,
          `❌ Verification Failed: ${failed.length} of ${results.length} checks did not pass.`,
          '',
          ...failed.map((f) => `• [FAILED] ${f.name}: ${f.error}`),
          '',
          '💡 Check the Hint System in the left panel for guidance!',
        ]);
      }
      setIsVerifying(false);
    }, 600);
  };

  // Reset to Step Starter Code
  const handleResetStarter = () => {
    const defaultStarter =
      currentStep.files.find((f) => f.path === activeFilePath)?.starterCode || '';
    handleCodeChange(defaultStarter);
    setVerificationPassed(false);
    setShowResetConfirm(false);
    setConsoleLogs([
      `[Reset] ${activeFilePath} restored to default step starter code.`,
    ]);
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      console.warn('Clipboard copy failed', e);
    }
  };

  // Apply solution to editor
  const handleApplySolution = () => {
    const solution =
      currentStep.files.find((f) => f.path === activeFilePath)?.solutionCode ||
      currentStep.hints.solutionCode;
    handleCodeChange(solution);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  // Format code (basic whitespace indent normalization)
  const handleFormatCode = () => {
    const lines = currentCode.split('\n');
    const cleaned = lines.map((l) => l.trimEnd()).join('\n');
    handleCodeChange(cleaned);
  };

  // Handle Tab key in textarea for clean 2-space indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      handleCodeChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Error attempting to exit fullscreen:', err);
      });
      setIsFullscreen(false);
    }
  };

  // Step navigation
  const goToStep = (index: number) => {
    if (index >= 0 && index < CRUD_STEPS.length) {
      setLabState((prev) => ({ ...prev, currentStepIndex: index }));
    }
  };

  const progressPercent = Math.round(
    (labState.completedStepIds.length / CRUD_STEPS.length) * 100
  );

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-[#0b0f19] text-neutral-100 flex flex-col font-sans ${
        isFullscreen ? 'p-0 fixed inset-0 z-50 overflow-hidden' : ''
      }`}
    >
      {/* ------------------------------------------------------------- */}
      {/* LAB TOP NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="h-14 border-b border-[#1e293b] bg-[#111827] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            <span>Course</span>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white hidden sm:inline">
              Flutter Interactive CRUD Lab
            </span>
            <span className="font-bold text-xs text-white sm:hidden">
              CRUD Lab
            </span>
            <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-500/30">
              Clean Architecture
            </span>
          </div>
        </div>

        {/* Center: Step Stepper Indicators (Desktop) */}
        <nav
          aria-label="CRUD Lab Steps"
          className="hidden md:flex items-center gap-1.5"
        >
          {CRUD_STEPS.map((step, idx) => {
            const isCompleted = labState.completedStepIds.includes(step.id);
            const isCurrent = idx === labState.currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => goToStep(idx)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  isCurrent
                    ? 'bg-sky-500 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-[#1e293b] text-sky-400 hover:bg-neutral-800'
                    : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#1e293b]/50'
                }`}
                title={step.title}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] font-mono">{idx + 1}</span>
                )}
                <span className="hidden lg:inline">{step.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Progress, Reset, Fullscreen */}
        <div className="flex items-center gap-2.5">
          {/* Progress pill */}
          <div className="flex items-center gap-2 rounded-lg bg-[#1e293b] px-2.5 py-1 text-xs font-mono text-neutral-300">
            <span className="text-[11px] text-sky-400 font-bold">
              {progressPercent}%
            </span>
            <div className="h-1.5 w-12 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e293b] text-neutral-400 hover:bg-[#1e293b] hover:text-white transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Distraction-free Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher (< 1024px) */}
      <div className="flex lg:hidden border-b border-[#1e293b] bg-[#111827] px-4 py-2 gap-2 shrink-0">
        <button
          onClick={() => setActiveTabMobile('guide')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTabMobile === 'guide'
              ? 'bg-sky-500 text-white'
              : 'text-neutral-400 bg-[#1e293b]/60 hover:text-white'
          }`}
        >
          📘 Step Walkthrough
        </button>
        <button
          onClick={() => setActiveTabMobile('studio')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
            activeTabMobile === 'studio'
              ? 'bg-sky-500 text-white'
              : 'text-neutral-400 bg-[#1e293b]/60 hover:text-white'
          }`}
        >
          💻 Code Studio &amp; Simulator
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN SPLIT-PANE WORKSPACE */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================= */}
        {/* LEFT PANE: GUIDED LEARNING & STEP WALKTHROUGH (50%)       */}
        {/* ========================================================= */}
        <section
          aria-label="Guided Learning Step Walkthrough"
          className={`w-full lg:w-1/2 border-r border-[#1e293b] flex flex-col bg-[#0b0f19] overflow-y-auto ${
            activeTabMobile === 'guide' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-6 sm:p-8 space-y-6 max-w-2xl mx-auto w-full">
            {/* Step Header */}
            <div className="space-y-2 border-b border-[#1e293b] pb-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 px-3 py-1 text-xs font-bold text-sky-400">
                  <Sparkles className="h-3 w-3" />
                  <span>{currentStep.badge}</span>
                </span>
                {verificationPassed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {currentStep.title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Mental Model & Memory Hook Callout */}
            <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-950/40 via-[#111827] to-[#111827] p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Lightbulb className="h-4 w-4 text-sky-400" />
                <span>Mental Model &amp; Memory Hook</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {currentStep.mentalModelHook.title}
              </h4>
              <div className="inline-block rounded-lg bg-sky-500/20 px-2.5 py-1 text-xs font-mono font-bold text-sky-300 border border-sky-500/40">
                💡 Mnemonic: {currentStep.mentalModelHook.mnemonic}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                {currentStep.mentalModelHook.description}
              </p>
            </div>

            {/* Why This Decision Matters Callout */}
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-[#111827] to-[#111827] p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span>Why This Decision Matters (Production Reality)</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {currentStep.whyItMatters.title}
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {currentStep.whyItMatters.description}
              </p>
            </div>

            {/* Step Pedagogical Walkthrough (The Karmatix Way) */}
            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-[#1e293b] pt-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>The Step-by-Step Blueprint</span>
              </h3>
              <RichTextRenderer content={currentStep.learningMarkdown} />
            </div>

            {/* Multi-Level Hint System */}
            <div className="rounded-2xl border border-[#1e293b] bg-[#111827] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <HelpCircle className="h-4 w-4" />
                  <span>Stuck? 3-Tier Progressive Hint System</span>
                </div>
                <span className="text-[11px] text-neutral-500">
                  Level {hintLevel} of 3
                </span>
              </div>

              {/* Hint Level Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setHintLevel(1)}
                  className={`py-2 px-3 rounded-xl border transition ${
                    hintLevel === 1
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                      : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  1. Nudge Clue
                </button>
                <button
                  onClick={() => setHintLevel(2)}
                  className={`py-2 px-3 rounded-xl border transition ${
                    hintLevel === 2
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                      : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  2. Syntax Outline
                </button>
                <button
                  onClick={() => setHintLevel(3)}
                  className={`py-2 px-3 rounded-xl border transition ${
                    hintLevel === 3
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                      : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  3. Full Solution
                </button>
              </div>

              {/* Hint Content Area */}
              {hintLevel === 1 && (
                <div className="rounded-xl bg-amber-950/30 border border-amber-900/50 p-4 text-xs text-amber-200 leading-relaxed animate-fade-in">
                  <span className="font-bold block mb-1">
                    🔍 Level 1 (Conceptual Nudge):
                  </span>
                  {currentStep.hints.nudge}
                </div>
              )}

              {hintLevel === 2 && (
                <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 text-xs font-mono text-neutral-200 space-y-2 animate-fade-in">
                  <span className="font-bold text-amber-400 block font-sans">
                    📝 Level 2 (Syntax Skeleton):
                  </span>
                  <pre className="overflow-x-auto p-2 bg-[#0b0f19] rounded-lg text-[11px] leading-relaxed">
                    {currentStep.hints.syntaxOutline}
                  </pre>
                </div>
              )}

              {hintLevel === 3 && (
                <div className="rounded-xl bg-neutral-900 border border-emerald-900/50 p-4 text-xs space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">
                      ✅ Level 3 (Complete Solution):
                    </span>
                    <button
                      onClick={handleApplySolution}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                    >
                      {copiedSolution ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Applied to Editor!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Apply to Editor</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="overflow-x-auto p-3 bg-[#0b0f19] rounded-lg text-[11px] font-mono text-neutral-300 leading-relaxed max-h-60 overflow-y-auto">
                    {currentStep.hints.solutionCode}
                  </pre>
                </div>
              )}
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between border-t border-[#1e293b] pt-6 pb-4">
              <button
                onClick={() => goToStep(labState.currentStepIndex - 1)}
                disabled={labState.currentStepIndex === 0}
                className="flex items-center gap-2 rounded-xl border border-[#1e293b] bg-[#111827] px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Step</span>
              </button>

              {labState.currentStepIndex < CRUD_STEPS.length - 1 ? (
                <button
                  onClick={() => goToStep(labState.currentStepIndex + 1)}
                  disabled={!verificationPassed}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    verificationPassed
                      ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-md'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700/50'
                  }`}
                  title={
                    verificationPassed
                      ? 'Proceed to next step'
                      : 'Pass verification to unlock the next step'
                  }
                >
                  {verificationPassed ? (
                    <>
                      <span>Next Step</span>
                      <ChevronRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      <span>Next Step (Locked)</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span>Lab Completed 100%!</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* RIGHT PANE: LIVE CODE STUDIO & SIMULATOR (50%)            */}
        {/* ========================================================= */}
        <section
          aria-label="Interactive Live Code Studio"
          className={`w-full lg:w-1/2 flex flex-col bg-[#070b14] overflow-hidden ${
            activeTabMobile === 'studio' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Studio Header: File Selector & Mode Switcher */}
          <div className="h-11 border-b border-[#1e293b] bg-[#0d1322] px-4 flex items-center justify-between shrink-0 select-none">
            {/* File Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
              <div className="flex items-center gap-1.5 rounded-lg bg-[#141c2e] border border-sky-500/30 px-3 py-1 text-xs font-mono font-semibold text-sky-300">
                <FileCode className="h-3.5 w-3.5 text-sky-400" />
                <span>{activeFilePath.split('/').pop()}</span>
              </div>
            </div>

            {/* Studio Mode Selector (Code vs Phone Preview) */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-[#1e293b] bg-[#111827] p-0.5 text-xs font-medium">
                <button
                  onClick={() => setStudioMode('editor')}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md transition ${
                    studioMode === 'editor'
                      ? 'bg-sky-500 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Code2 className="h-3 w-3" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setStudioMode('preview')}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md transition ${
                    studioMode === 'preview'
                      ? 'bg-sky-500 text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="h-3 w-3" />
                  <span>Preview 📱</span>
                </button>
              </div>

              {/* Reset to Starter Button */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1 rounded-lg border border-[#1e293b] px-2 py-1 text-[11px] text-neutral-400 hover:bg-[#1e293b] hover:text-white transition"
                title="Reset active file to step starter code"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              {/* Copy Code */}
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 rounded-lg border border-[#1e293b] px-2 py-1 text-[11px] text-neutral-400 hover:bg-[#1e293b] hover:text-white transition"
                title="Copy editor code"
              >
                {copiedCode ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span className="hidden sm:inline">
                  {copiedCode ? 'Copied' : 'Copy'}
                </span>
              </button>

              {/* Format Code */}
              <button
                onClick={handleFormatCode}
                className="hidden sm:flex items-center gap-1 rounded-lg border border-[#1e293b] px-2 py-1 text-[11px] text-neutral-400 hover:bg-[#1e293b] hover:text-white transition"
                title="Clean whitespace and formatting"
              >
                <span>Format</span>
              </button>
            </div>
          </div>

          {/* Editor Body OR Phone Simulator */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {studioMode === 'editor' ? (
              <div className="flex-1 flex overflow-hidden relative">
                {/* Line Numbers Bar */}
                <div className="w-11 bg-[#0b0f19] border-r border-[#1e293b] py-3 text-right pr-2 text-neutral-600 font-mono text-xs select-none shrink-0 overflow-hidden leading-6">
                  {currentCode.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Live Editable Textarea */}
                <div className="flex-1 relative overflow-auto bg-[#070b14]">
                  <textarea
                    ref={textareaRef}
                    value={currentCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    className="w-full h-full bg-transparent p-3 font-mono text-xs text-neutral-200 outline-none resize-none leading-6 whitespace-pre tab-2 selection:bg-sky-500/30"
                    placeholder="// Write your Dart code here..."
                  />
                </div>

                {/* Floating Autosave Pill */}
                <div className="absolute top-2 right-4 pointer-events-none text-[10px] font-mono text-neutral-500 bg-[#111827]/80 px-2 py-0.5 rounded border border-[#1e293b]">
                  {autosaveStatus === 'saving'
                    ? 'Saving draft...'
                    : 'Saved to browser storage'}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto bg-[#070b14]">
                <CrudPhoneSimulator />
              </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* BOTTOM CONSOLE & TEST RUNNER SIMULATOR                   */}
            {/* --------------------------------------------------------- */}
            <div className="h-56 border-t border-[#1e293b] bg-[#0b0f19] flex flex-col shrink-0">
              {/* Console Header Bar */}
              <div className="h-9 border-b border-[#1e293b] bg-[#111827] px-4 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="font-mono text-xs font-bold text-neutral-300">
                    Dart Analyzer &amp; Test Suite
                  </span>
                  {verificationPassed && (
                    <span className="flex items-center gap-1 rounded bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[10px] font-bold border border-emerald-500/40">
                      All Passed
                    </span>
                  )}
                </div>

                {/* "Run & Verify" Button */}
                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1 text-xs font-extrabold text-white shadow-xs hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition disabled:opacity-50"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>{isVerifying ? 'Verifying...' : 'Run & Verify'}</span>
                </button>
              </div>

              {/* Console Body Output */}
              <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1 bg-[#050811] text-neutral-300">
                {consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.startsWith('✓') || log.includes('✅') || log.includes('🚀')
                        ? 'text-emerald-400 font-bold'
                        : log.startsWith('❌') || log.includes('[FAILED]')
                        ? 'text-red-400 font-bold'
                        : log.startsWith('$')
                        ? 'text-sky-400 font-semibold'
                        : 'text-neutral-400'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal for Resetting to Starter Code */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-700 bg-[#111827] p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="h-6 w-6 shrink-0" />
              <h4 className="text-sm font-bold text-white">
                Reset {activeFilePath.split('/').pop()}?
              </h4>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              This will overwrite your current code with the default starter template for Step {currentStep.stepNumber}. Are you sure you want to reset?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-700 text-xs text-neutral-300 hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetStarter}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs text-white font-bold transition"
              >
                Reset Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
