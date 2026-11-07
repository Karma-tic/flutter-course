import React from 'react';
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  FolderGit2,
  FileText,
  Star,
  Compass,
} from 'lucide-react';
import { certificationsData, portfolioChecklist } from '../data/certificationsData';
import { Callout } from '../components/Callout';

export const CertificationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Career Advice &amp; Scam Prevention</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              The Honest Flutter Certifications Guide
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Before spending hundreds of dollars on third-party certifications, read the facts about what employers actually care about when hiring Flutter engineers.
            </p>
          </div>
        </div>

        {/* The Google Certification Truth Alert */}
        <Callout type="warning" title="Crucial Truth: Does Google Offer a Flutter Certificate?">
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              <strong>NO.</strong> As of 2026, Google does <strong>NOT</strong> offer an official &ldquo;Google Certified Flutter Developer&rdquo; exam or certification.
            </p>
            <p>
              Furthermore, Google&apos;s older <em>Associate Android Developer</em> certification was officially <strong>retired and discontinued</strong>.
            </p>
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              ⚠️ Warning: Any website charging $200–$500 claiming to issue an &ldquo;Official Google Endorsed Flutter Certificate&rdquo; is a misleading marketing scheme. Hiring managers and tech leads evaluate your GitHub code, architecture choices, and live apps—not paid completion certificates.
            </p>
          </div>
        </Callout>

        {/* What Actually Gets You Hired: Portfolio Checklist */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-current" />
                The Job-Winning Portfolio Checklist
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Build these 5 assets. They outweigh every online certificate combined.
              </p>
            </div>
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Recruiter Approved
            </span>
          </div>

          <div className="space-y-3">
            {portfolioChecklist.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-950/40 space-y-1.5"
              >
                <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-neutral-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.item}</span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] uppercase font-bold shrink-0 ${
                      item.importance === 'Critical'
                        ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        : 'bg-flutter-100 text-flutter-800 dark:bg-flutter-950 dark:text-flutter-300'
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 pl-6 leading-relaxed">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Why it matters: </span>
                  {item.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reputable Industry Badges & Audit Courses */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Legitimate Skill Badges &amp; Audit Platforms
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              If you want verifiable proof of coursework for college credit or LinkedIn, these are legitimate, cost-effective options:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {cert.provider}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        cert.isCertificateFree
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}
                    >
                      {cert.cost}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {cert.title}
                  </h3>

                  <div className="text-[11px] text-neutral-500 space-y-0.5">
                    <div>Time required: {cert.timeEstimate}</div>
                    <div>Employer Recognition: {cert.recognition}</div>
                  </div>

                  <div className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-300">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      Our Verdict:{' '}
                    </span>
                    {cert.verdict}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs font-semibold text-flutter-600 hover:text-flutter-700 dark:text-flutter-400"
                  >
                    <span>View Platform</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Visual Roadmap Reference */}
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-r from-sky-50 to-flutter-50 p-6 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-flutter-600 text-white">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Our Interactive Career Progression Roadmap
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Track your journey step-by-step from zero programming experience to job-ready Flutter engineer and company exam champion.
                </p>
              </div>
            </div>

            <a
              href="#/roadmap"
              className="flex items-center gap-1.5 rounded-xl bg-flutter-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-flutter-700 shadow-xs"
            >
              <span>Explore Visual Roadmap</span>
              <Compass className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

