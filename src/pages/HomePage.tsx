import React from 'react';
import { Link } from 'react-router-dom';
import { siFlutter, siDart, siAndroid, siFirebase, siAndroidstudio } from 'simple-icons';
import { RoadmapView, type RoadmapData } from '../components/RoadmapView';
import { roadmap } from '../data/roadmap.generated';
import { stageExtras } from '../data/roadmapExtras';
import { CounterDemo } from '../components/CounterDemo';
import { BrandIcon } from '../components/BrandIcon';
import { siteConfig } from '../config/site';

interface HomePageProps {
  onOpenPlanner?: () => void;
  onOpenCertificate?: () => void;
}

const InternalLink = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => (
  <Link to={to} className={className}>{children}</Link>
);

const STACK = [
  { icon: siFlutter, label: 'Flutter' },
  { icon: siDart, label: 'Dart' },
  { icon: siAndroid, label: 'Android' },
  { icon: siFirebase, label: 'Firebase' },
  { icon: siAndroidstudio, label: 'Android Studio' },
];

const Stack = () => (
  <ul className="flex flex-wrap gap-2" aria-label="What you will use">
    {STACK.map((t) => (
      <li key={t.label} className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/70 pl-2.5 pr-3.5 text-sm text-neutral-300">
        <BrandIcon icon={t.icon} className="h-4 w-4" color={t.label === 'Flutter' ? '#13b9fd' : t.label === 'Dart' ? '#40c4ff' : undefined} />
        {t.label}
      </li>
    ))}
  </ul>
);

export const HomePage: React.FC<HomePageProps> = () => (
  <RoadmapView
    roadmap={roadmap as unknown as RoadmapData}
    extras={stageExtras}
    storageKey={`${siteConfig.storagePrefix}roadmap`}
    heroCta={{ to: '/exam-prep', label: 'Take a mock test' }}
    InternalLink={InternalLink}
    heroVisual={<CounterDemo />}
    stack={<Stack />}
  />
);

export default HomePage;
