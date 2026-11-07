import React from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  Calendar,
  Download,
  Upload,
  HardDrive,
  Code2,
  FileText,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { CodeBlock } from '../components/CodeBlock';
import { Callout } from '../components/Callout';

export const AboutPage: React.FC = () => {
  const sampleFrontmatter = `---
title: "Building Custom Slivers in Flutter"
module: "m4"
order: 6
duration: 18
difficulty: "Intermediate"
prerequisites: ["m4-l1", "m4-l2"]
lastVerified: "November 2026"
---

# Goal of this lesson
Understand how CustomScrollView and SliverAppBar create collapsible, floating headers.

## Simple Explanation
A Sliver is a portion of a scrollable area that changes its size or layout lazily...
`;

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-flutter-200 bg-flutter-50 px-3 py-1 text-xs font-semibold text-flutter-800 dark:border-flutter-900/50 dark:bg-flutter-950/40 dark:text-flutter-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Course Guide &amp; Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              About Flutter Course &amp; How to Learn
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Designed specifically for students and engineers with zero programming background who need to pass technical exams and become job-ready Flutter developers.
            </p>
          </div>
        </div>

        {/* The 3-Pillar Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flutter-50 text-flutter-600 dark:bg-flutter-950 dark:text-flutter-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              1. Zero Jargon Assumption
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every abstract concept—from Null Safety to InheritedWidget—is explained through tangible real-world analogies (lightbulbs, restaurant buzzers, LEGO bricks) before showing code.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              2. Android-Flavoured Exam Focus
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Company exams frequently quiz students on native Android concepts (Activity lifecycle, EditText, Spinner, Services, BroadcastReceivers). Every topic provides native Kotlin + XML equivalents side-by-side.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <HardDrive className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              3. 100% Privacy &amp; Offline-Ready
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No login required, no tracking cookies, and no database server. Your lesson completions, quiz scores, and personal notes live safely in your browser and export cleanly as JSON anytime.
            </p>
          </div>
        </div>

        {/* How Progress Tracking Works */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            How Browser Progress Tracking Works
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>
              Your course state is stored in your browser&apos;s <code>localStorage</code> under the key <code>flutter_course_progress_v1</code>. This stores:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>Completed lesson IDs</li>
              <li>Quiz scores for each lesson (automatically marks complete if you score 70%+)</li>
              <li>Your last visited lesson (so the dashboard button always resumes where you left off)</li>
              <li>Personal notes written in lesson tabs</li>
              <li>Bookmarked lessons</li>
              <li>Custom exam checklist items and mock test scores</li>
            </ul>
            <div className="pt-2">
              <Callout type="tip" title="Switching Computers or Browsers?">
                Scroll to the footer at any time and click <strong>&ldquo;Export JSON&rdquo;</strong> to save a backup file to your computer. On your new device, click <strong>&ldquo;Import JSON&rdquo;</strong> to restore 100% of your progress instantly.
              </Callout>
            </div>
          </div>
        </div>

        {/* How to Add or Edit Lessons with Markdown in /content */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-flutter-600 dark:text-flutter-400" />
              Extensibility: Adding Lessons via Markdown in /content
            </h2>
            <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold uppercase text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              Developer Guide
            </span>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The platform is built to be easily extended by educators and students. You can author standalone Markdown (.md) or MDX lessons in the <code>/content</code> folder at the root of the project with YAML frontmatter:
          </p>

          <CodeBlock
            code={sampleFrontmatter}
            language="yaml"
            title="content/m4-l6-slivers.md"
          />

          <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <p><strong>Supported Frontmatter Fields:</strong></p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li><code>title</code>: String (Lesson name)</li>
              <li><code>module</code>: String (&ldquo;m0&rdquo; through &ldquo;m10&rdquo;)</li>
              <li><code>order</code>: Number (1-indexed order within module)</li>
              <li><code>duration</code>: Number (estimated reading time in minutes)</li>
              <li><code>difficulty</code>: &ldquo;Beginner&rdquo; | &ldquo;Intermediate&rdquo; | &ldquo;Advanced&rdquo;</li>
              <li><code>prerequisites</code>: Array of prerequisite lesson IDs</li>
            </ul>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-flutter-600 dark:text-flutter-400" />
            Frequently Asked Beginner Questions
          </h2>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/40 space-y-1">
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                Q: I have never written a single line of code. Can I really learn Flutter?
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes! Flutter uses Dart, which is one of the most beginner-friendly modern languages in existence. Module 1 teaches variables, loops, and conditions from literal scratch with zero assumed knowledge.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/40 space-y-1">
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                Q: Why does this course teach both Flutter and Native Android (Kotlin)?
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Most company technical interviews and college placement exams are designed by senior engineers with native Android backgrounds. They will ask you about the Android Activity lifecycle, Spinners, and Background Services. By learning the direct mapping, you will stand out effortlessly over other applicants.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/40 space-y-1">
              <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                Q: Can I run this course without an active internet connection?
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes! The entire site is compiled into static assets (HTML/JS/CSS). Once loaded in your browser or cloned locally with <code>npm run dev</code>, all 57 lessons, quizzes, formulas, and cheat sheets work completely offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

