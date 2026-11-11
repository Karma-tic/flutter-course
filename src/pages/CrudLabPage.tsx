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
  ChevronDown,
  ChevronUp,
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
  Award,
  ListChecks,
  Compass,
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

  // New UI controls: Step dropdown & Collapsible Accordion states
  const [stepDropdownOpen, setStepDropdownOpen] = useState(false);
  const [openSections, setOpenSections] = useState<{
    mentalModel: boolean;
    whyItMatters: boolean;
    walkthrough: boolean;
    hints: boolean;
  }>({
    mentalModel: false,
    whyItMatters: false,
    walkthrough: false,
    hints: false,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentStep: CrudStep = CRUD_STEPS[labState.currentStepIndex] || CRUD_STEPS[0];
  const activeFilePath = currentStep.activeFile;
  const currentCode =
    labState.codeDrafts[activeFilePath] ??
    currentStep.files.find((f) => f.path === activeFilePath)?.starterCode ??
    '';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStepDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Check if a step is unlocked (Step 1 is always unlocked; subsequent steps require previous step completed)
  const isStepUnlocked = (idx: number): boolean => {
    if (idx === 0) return true;
    return (
      labState.completedStepIds.includes(CRUD_STEPS[idx - 1].id) ||
      labState.completedStepIds.includes(CRUD_STEPS[idx].id)
    );
  };

  // Code change handler
  const handleCodeChange = (newCode: string) => {
    setLabState((prev) => ({
      ...prev,
      codeDrafts: {
        ...prev.codeDrafts,
        [activeFilePath]: newCode,
      },
    }));
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

  // Format code
  const handleFormatCode = () => {
    const lines = currentCode.split('\n');
    const cleaned = lines.map((l) => l.trimEnd()).join('\n');
    handleCodeChange(cleaned);
  };

  // Handle Tab key in textarea
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

  // Step navigation (guarded by unlock logic)
  const goToStep = (index: number) => {
    if (index >= 0 && index < CRUD_STEPS.length && isStepUnlocked(index)) {
      setLabState((prev) => ({ ...prev, currentStepIndex: index }));
      setStepDropdownOpen(false);
    }
  };

  const toggleSection = (key: 'mentalModel' | 'whyItMatters' | 'walkthrough' | 'hints') => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
      {/* COMPACT TOP NAVIGATION BAR                                    */}
      {/* ------------------------------------------------------------- */}
      <header className="h-14 border-b border-[#1e293b] bg-[#111827] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            <span>Course</span>
            <ChevronRight className="h-3.5 w-3.5 text-neutral-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white hidden sm:inline">
              CRUD Lab
            </span>
            <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-500/30 hidden md:inline">
              Clean Architecture
            </span>
          </div>
        </div>

        {/* Center: Clean Step Dropdown Selector (Replaces congested horizontal buttons) */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setStepDropdownOpen(!stepDropdownOpen)}
            className="flex items-center gap-2 rounded-xl border border-[#334155] bg-[#1e293b] px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800 hover:border-sky-500/50 transition shadow-xs"
            aria-expanded={stepDropdownOpen}
            aria-label="Select Step"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-white text-[11px] font-bold">
              {labState.currentStepIndex + 1}
            </span>
            <span className="font-bold text-white max-w-[130px] sm:max-w-[220px] truncate">
              {currentStep.title}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
              ({labState.currentStepIndex + 1}/{CRUD_STEPS.length})
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${
                stepDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Sequential Steps Dropdown Menu */}
          {stepDropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-72 sm:w-80 rounded-2xl border border-[#1e293b] bg-[#111827] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3.5 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-[#1e293b] flex items-center justify-between">
                <span>Sequential Roadmap</span>
                <span className="text-sky-400 font-bold">{progressPercent}% Completed</span>
              </div>
              <div className="py-1 max-h-80 overflow-y-auto">
                {CRUD_STEPS.map((step, idx) => {
                  const isCompleted = labState.completedStepIds.includes(step.id);
                  const isCurrent = idx === labState.currentStepIndex;
                  const isUnlocked = isStepUnlocked(idx);

                  return (
                    <button
                      key={step.id}
                      disabled={!isUnlocked}
                      onClick={() => goToStep(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition text-left ${
                        isCurrent
                          ? 'bg-sky-500/15 text-sky-300 font-bold border-l-2 border-sky-400'
                          : isUnlocked
                          ? 'text-neutral-200 hover:bg-[#1e293b] hover:text-white'
                          : 'text-neutral-600 cursor-not-allowed opacity-45'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : isUnlocked ? (
                          <span
                            className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isCurrent
                                ? 'bg-sky-500 text-white'
                                : 'bg-[#1e293b] text-neutral-300'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        ) : (
                          <Lock className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                        )}
                        <div className="truncate">
                          <div className="truncate font-semibold">
                            {idx + 1}. {step.title}
                          </div>
                          <div className="text-[10px] text-neutral-500 truncate">
                            {step.activeFile.split('/').pop()}
                          </div>
                        </div>
                      </div>
                      {!isUnlocked ? (
                        <span className="text-[10px] text-neutral-500 font-mono ml-2 shrink-0 flex items-center gap-1">
                          <Lock className="h-2.5 w-2.5" /> Locked
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[10px] text-emerald-400 font-mono ml-2 shrink-0">
                          Passed ✓
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[10px] text-sky-400 font-mono ml-2 shrink-0">
                          Active
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Progress & Fullscreen */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-lg bg-[#1e293b] px-2.5 py-1 text-xs font-mono text-neutral-300">
            <span className="text-[11px] text-sky-400 font-bold">
              {progressPercent}%
            </span>
            <div className="h-1.5 w-10 sm:w-14 rounded-full bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

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
          📘 Step Guide
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
        {/* LEFT PANE: INTUITIVE STEP WALKTHROUGH (CLEAN & NON-CONGESTED) */}
        {/* ========================================================= */}
        <section
          aria-label="Guided Learning Step Walkthrough"
          className={`w-full lg:w-1/2 border-r border-[#1e293b] flex flex-col bg-[#0b0f19] overflow-y-auto ${
            activeTabMobile === 'guide' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-5 sm:p-7 space-y-5 max-w-2xl mx-auto w-full">
            {/* Step Header */}
            <div className="space-y-1.5 border-b border-[#1e293b] pb-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 px-3 py-0.5 text-[11px] font-bold text-sky-400">
                  <Sparkles className="h-3 w-3" />
                  <span>Step {currentStep.stepNumber} of {CRUD_STEPS.length}</span>
                </span>
                {verificationPassed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
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

            {/* Verification Success Celebration Callout */}
            {verificationPassed && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Step {currentStep.stepNumber} Verified Successfully!</span>
                  </div>
                  {labState.currentStepIndex < CRUD_STEPS.length - 1 && (
                    <button
                      onClick={() => goToStep(labState.currentStepIndex + 1)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-400 transition shadow-xs"
                    >
                      <span>Continue to Step {currentStep.stepNumber + 1}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-neutral-300">
                  All tests for this milestone have passed. You can review your code or proceed to the next step.
                </p>
              </div>
            )}

            {/* 1. EASY "HOW TO START HERE" GUIDE FOR BEGINNERS */}
            <div className="rounded-xl border border-sky-500/30 bg-gradient-to-br from-sky-950/30 via-[#111827] to-[#111827] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <Compass className="h-4 w-4 text-sky-400" />
                <span>Quick Start Guide (3 Simple Steps)</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 font-bold text-[11px]">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Review the Goal:</strong> Check the task checklist below for what to write in{' '}
                    <code className="text-sky-300 font-mono bg-sky-950/40 px-1 py-0.5 rounded">
                      {activeFilePath.split('/').pop()}
                    </code>.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 font-bold text-[11px]">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Code in the Right Panel:</strong> Follow the{' '}
                    <code className="text-sky-300 font-mono bg-sky-950/40 px-1 py-0.5 rounded">// TODO</code> comments in the editor.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 font-bold text-[11px]">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Run &amp; Verify:</strong> Click the green{' '}
                    <span className="text-emerald-400 font-semibold font-mono">Run &amp; Verify</span> button below the editor to test and unlock the next step!
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ACTIONABLE CHECKLIST (Clear, Simple & Direct) */}
            <div className="rounded-xl border border-[#1e293b] bg-[#111827] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-sky-400" />
                  <span>Tasks to Complete</span>
                </h3>
                <span className="text-[11px] font-mono text-neutral-400">
                  {currentStep.tests.filter((t) => t.validate(currentCode)).length} of{' '}
                  {currentStep.tests.length} Complete
                </span>
              </div>
              <div className="space-y-2">
                {currentStep.tests.map((test, i) => {
                  const isPassed = test.validate(currentCode);
                  return (
                    <div
                      key={test.id || i}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs transition ${
                        isPassed
                          ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'
                          : 'border-[#1e293b] bg-[#0b0f19] text-neutral-300'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-neutral-600 shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-neutral-500 font-mono">
                          {i + 1}
                        </div>
                      )}
                      <div>
                        <div
                          className={`font-semibold ${
                            isPassed ? 'text-emerald-200 line-through opacity-80' : 'text-white'
                          }`}
                        >
                          {test.name}
                        </div>
                        {test.description && (
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {test.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. CLEAN COLLAPSIBLE ACCORDIONS (No screen congestion!) */}
            <div className="space-y-2.5 pt-1">
              {/* ACCORDION 1: MENTAL MODEL & MEMORY HOOK */}
              <div className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
                <button
                  onClick={() => toggleSection('mentalModel')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-left hover:bg-[#1e293b]/50 transition"
                  aria-expanded={openSections.mentalModel}
                >
                  <div className="flex items-center gap-2 text-sky-400">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-white">Mental Model &amp; Memory Hook</span>
                    <span className="rounded bg-sky-500/20 text-sky-300 text-[10px] px-1.5 py-0.5 font-mono">
                      How to remember
                    </span>
                  </div>
                  {openSections.mentalModel ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
                {openSections.mentalModel && (
                  <div className="p-4 pt-1 border-t border-[#1e293b] text-xs text-neutral-300 space-y-2 bg-[#0b0f19]">
                    <h4 className="text-xs font-bold text-white pt-1">
                      {currentStep.mentalModelHook.title}
                    </h4>
                    <div className="inline-block rounded-lg bg-sky-500/20 px-2.5 py-1 text-xs font-mono font-bold text-sky-300 border border-sky-500/30">
                      💡 Mnemonic: {currentStep.mentalModelHook.mnemonic}
                    </div>
                    <p className="leading-relaxed text-neutral-400">
                      {currentStep.mentalModelHook.description}
                    </p>
                  </div>
                )}
              </div>

              {/* ACCORDION 2: WHY THIS DECISION MATTERS */}
              <div className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
                <button
                  onClick={() => toggleSection('whyItMatters')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-left hover:bg-[#1e293b]/50 transition"
                  aria-expanded={openSections.whyItMatters}
                >
                  <div className="flex items-center gap-2 text-purple-400">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-white">Why This Matters (Production Reality)</span>
                  </div>
                  {openSections.whyItMatters ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
                {openSections.whyItMatters && (
                  <div className="p-4 pt-1 border-t border-[#1e293b] text-xs text-neutral-300 space-y-2 bg-[#0b0f19]">
                    <h4 className="text-xs font-bold text-white pt-1">
                      {currentStep.whyItMatters.title}
                    </h4>
                    <p className="leading-relaxed text-neutral-400">
                      {currentStep.whyItMatters.description}
                    </p>
                  </div>
                )}
              </div>

              {/* ACCORDION 3: DETAILED STEP BLUEPRINT (Full explanations on demand) */}
              <div className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
                <button
                  onClick={() => toggleSection('walkthrough')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-left hover:bg-[#1e293b]/50 transition"
                  aria-expanded={openSections.walkthrough}
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Code2 className="h-4 w-4" />
                    <span className="text-white">Detailed Code Walkthrough &amp; Concepts</span>
                  </div>
                  {openSections.walkthrough ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
                {openSections.walkthrough && (
                  <div className="p-4 pt-2 border-t border-[#1e293b] text-xs text-neutral-300 space-y-3 bg-[#0b0f19]">
                    <RichTextRenderer content={currentStep.learningMarkdown} />
                  </div>
                )}
              </div>

              {/* ACCORDION 4: PROGRESSIVE HINTS SYSTEM */}
              <div className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
                <button
                  onClick={() => toggleSection('hints')}
                  className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-left hover:bg-[#1e293b]/50 transition"
                  aria-expanded={openSections.hints}
                >
                  <div className="flex items-center gap-2 text-amber-400">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-white">Need Help? 3-Tier Progressive Hints</span>
                  </div>
                  {openSections.hints ? (
                    <ChevronUp className="h-4 w-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
                {openSections.hints && (
                  <div className="p-4 pt-2 border-t border-[#1e293b] space-y-3 bg-[#0b0f19]">
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                      <button
                        onClick={() => setHintLevel(1)}
                        className={`py-1.5 px-2.5 rounded-lg border transition ${
                          hintLevel === 1
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                            : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                        }`}
                      >
                        1. Nudge
                      </button>
                      <button
                        onClick={() => setHintLevel(2)}
                        className={`py-1.5 px-2.5 rounded-lg border transition ${
                          hintLevel === 2
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                            : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                        }`}
                      >
                        2. Syntax Outline
                      </button>
                      <button
                        onClick={() => setHintLevel(3)}
                        className={`py-1.5 px-2.5 rounded-lg border transition ${
                          hintLevel === 3
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                            : 'border-[#1e293b] bg-neutral-900 text-neutral-400 hover:text-white'
                        }`}
                      >
                        3. Full Solution
                      </button>
                    </div>

                    {hintLevel === 1 && (
                      <div className="rounded-lg bg-amber-950/30 border border-amber-900/50 p-3 text-xs text-amber-200 leading-relaxed">
                        <strong className="block mb-1">🔍 Level 1 Clue:</strong>
                        {currentStep.hints.nudge}
                      </div>
                    )}

                    {hintLevel === 2 && (
                      <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 text-xs font-mono text-neutral-200 space-y-1">
                        <strong className="block font-sans text-amber-400">
                          📝 Level 2 Syntax Skeleton:
                        </strong>
                        <pre className="overflow-x-auto p-2 bg-[#0b0f19] rounded text-[11px] leading-relaxed">
                          {currentStep.hints.syntaxOutline}
                        </pre>
                      </div>
                    )}

                    {hintLevel === 3 && (
                      <div className="rounded-lg bg-neutral-900 border border-emerald-900/50 p-3 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-emerald-400">
                            ✅ Level 3 Full Solution:
                          </strong>
                          <button
                            onClick={handleApplySolution}
                            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                          >
                            {copiedSolution ? (
                              <>
                                <Check className="h-3 w-3" />
                                <span>Applied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Apply to Editor</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="overflow-x-auto p-2 bg-[#0b0f19] rounded text-[11px] font-mono text-neutral-300 leading-relaxed max-h-48 overflow-y-auto">
                          {currentStep.hints.solutionCode}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stepper Navigation Footer */}
            <div className="flex items-center justify-between border-t border-[#1e293b] pt-5 pb-4">
              <button
                onClick={() => goToStep(labState.currentStepIndex - 1)}
                disabled={labState.currentStepIndex === 0}
                className="flex items-center gap-1.5 rounded-xl border border-[#1e293b] bg-[#111827] px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {labState.currentStepIndex < CRUD_STEPS.length - 1 ? (
                <button
                  onClick={() => goToStep(labState.currentStepIndex + 1)}
                  disabled={!verificationPassed}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
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
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
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
                    <span className="flex items-center gap-1 rounded bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 text-[10px] font-bold border border-emerald-500/40">
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
