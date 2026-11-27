import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RoadmapView, type RoadmapData } from '../components/RoadmapView';
import { roadmap } from '../data/roadmap.generated';
import { stageExtras } from '../data/roadmapExtras';
import { BugHunterWidget } from '../components/BugHunterWidget';
import { StateManagementWizard } from '../components/StateManagementWizard';
import { siteConfig } from '../config/site';

interface HomePageProps {
  onOpenPlanner?: () => void;
  onOpenCertificate?: () => void;
}

const InternalLink = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => (
  <Link to={to} className={className}>{children}</Link>
);

export const HomePage: React.FC<HomePageProps> = () => {
  const [tab, setTab] = useState<'bug' | 'state'>('bug');
  return (
    <RoadmapView
      roadmap={roadmap as unknown as RoadmapData}
      extras={stageExtras}
      storageKey={`${siteConfig.storagePrefix}roadmap`}
      heroCta={{ to: '/exam-prep', label: 'Take a mock test' }}
      InternalLink={InternalLink}
      after={
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="drills-h">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 id="drills-h" className="text-3xl font-semibold tracking-tight text-neutral-100">Two-minute drills</h2>
              <p className="mt-2 text-neutral-400">Quick practice you can do right now: find the bug, or pick the right state management for a real scenario.</p>
            </div>
            <div className="flex gap-2" role="group" aria-label="Drill">
              <button type="button" aria-pressed={tab === 'bug'} onClick={() => setTab('bug')} className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${tab === 'bug' ? 'border-ember/60 bg-ember/10 text-neutral-100' : 'border-neutral-800 text-neutral-400 hover:text-neutral-100'}`}>Find the bug</button>
              <button type="button" aria-pressed={tab === 'state'} onClick={() => setTab('state')} className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${tab === 'state' ? 'border-ember/60 bg-ember/10 text-neutral-100' : 'border-neutral-800 text-neutral-400 hover:text-neutral-100'}`}>Pick the state tool</button>
            </div>
          </div>
          <div className="mt-6">{tab === 'bug' ? <BugHunterWidget /> : <StateManagementWizard />}</div>
        </section>
      }
    />
  );
};

export default HomePage;
