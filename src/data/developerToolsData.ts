export interface DeveloperTool {
  id: string;
  name: string;
  category: 'Editor & IDE' | 'API & Testing' | 'Design & Assets' | 'Official Platform' | 'Generators';
  badge: string;
  url: string;
  description: string;
  whyEssential: string;
}

export const essentialDeveloperTools: DeveloperTool[] = [
  {
    id: 'tool-vscode',
    name: 'Visual Studio Code + Flutter Extension',
    category: 'Editor & IDE',
    badge: '100% Free • Recommended',
    url: 'https://code.visualstudio.com/',
    description: 'Lightweight, ultra-fast code editor paired with the official Dart-Code extension for sub-second hot reloads, widget inspection, and refactoring.',
    whyEssential: 'Used by 70%+ of professional Flutter developers. Pressing Alt+Enter / Option+Enter wraps, extracts, and moves widgets instantly.',
  },
  {
    id: 'tool-android-studio',
    name: 'Android Studio & Device Emulator',
    category: 'Editor & IDE',
    badge: 'Official Google Android IDE',
    url: 'https://developer.android.com/studio',
    description: 'Provides Android SDK Command-line Tools, Android Virtual Device (AVD) emulators, and Logcat diagnostics.',
    whyEssential: 'Mandatory on your computer to compile native Android APKs and test realistic phone hardware.',
  },
  {
    id: 'tool-devtools',
    name: 'Flutter DevTools Suite',
    category: 'Editor & IDE',
    badge: 'Built Into Flutter SDK',
    url: 'https://docs.flutter.dev/tools/devtools',
    description: 'Browser-based suite of performance profiling, memory leak tracking, network request inspection, and widget tree debugger.',
    whyEssential: 'Diagnoses 60/120 FPS jank, oversized images, and unnecessary widget rebuilds with one click.',
  },
  {
    id: 'tool-dartpad',
    name: 'DartPad (In-Browser Execution)',
    category: 'Official Platform',
    badge: 'Zero Installation Needed',
    url: 'https://dartpad.dev/',
    description: 'Google’s open-source web application where you can write and run live Flutter and Dart code from any browser without installing an SDK.',
    whyEssential: 'Ideal for experimenting with layout algorithms, sharing code snippets, and testing logic on a Chromebook or tablet.',
  },
  {
    id: 'tool-postman',
    name: 'Postman & Bruno (API Testing)',
    category: 'API & Testing',
    badge: 'REST & JSON Debugging',
    url: 'https://www.usebruno.com/',
    description: 'Tools for sending GET, POST, PUT, and DELETE requests to test backend endpoints before writing Flutter frontend code.',
    whyEssential: 'Saves hours of debugging by verifying your server status codes, JSON payload shapes, and auth headers first.',
  },
  {
    id: 'tool-quicktype',
    name: 'quicktype.io (Instant JSON to Dart)',
    category: 'Generators',
    badge: 'Boilerplate Killer',
    url: 'https://quicktype.io/',
    description: 'Paste any raw JSON API response and it automatically generates type-safe Dart classes with fromJson(), toJson(), and null-safety.',
    whyEssential: 'Never write tedious Map<String, dynamic> parsing manually again. Converts 1,000 lines of JSON into Dart models in 1 second.',
  },
  {
    id: 'tool-appicon',
    name: 'AppIcon.co (All Mobile Icon Sizes)',
    category: 'Design & Assets',
    badge: 'Asset Generator',
    url: 'https://www.appicon.co/',
    description: 'Upload a single 1024x1024 app icon PNG and download all generated resolutions for Android mipmap and iOS Assets.xcassets.',
    whyEssential: 'Generates hdpi, mdpi, xhdpi, xxhdpi, and xxxhdpi asset packs with zero manual cropping.',
  },
  {
    id: 'tool-figma',
    name: 'Figma (UI/UX Design & Inspection)',
    category: 'Design & Assets',
    badge: 'Industry Design Tool',
    url: 'https://www.figma.com/',
    description: 'The global standard collaborative design tool used by UI/UX designers to create mobile layouts, design systems, and component states.',
    whyEssential: 'Inspect exact hex colors, paddings, border radii, and typography to convert designer mockups into pixel-perfect Flutter widgets.',
  },
  {
    id: 'tool-pub-dev',
    name: 'Pub.dev (The Official Package Registry)',
    category: 'Official Platform',
    badge: 'The App Store for Code',
    url: 'https://pub.dev/',
    description: 'The official open-source package catalog where the global Flutter community publishes verified plugins, SDKs, and widgets.',
    whyEssential: 'Browse popularity scores, verified publishers, and copy one-line installation commands for any functionality you need.',
  },
];

export interface CuratedVideo {
  id: string;
  title: string;
  channel: string;
  badge: string;
  url: string;
  description: string;
  duration: string;
}

export const curatedYouTubeGuides: CuratedVideo[] = [
  {
    id: 'yt-1',
    title: 'Flutter "Widget of the Week" Official Series',
    channel: 'Flutter (Official Google Channel)',
    badge: '1–2 Min Bite-Sized',
    url: 'https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG',
    description: 'Hyper-focused 90-second animated videos explaining every single built-in Flutter widget (LayoutBuilder, AnimatedContainer, FutureBuilder, Stack).',
    duration: '100+ Videos (1-2m each)',
  },
  {
    id: 'yt-2',
    title: 'Decoding Flutter: Deep Under the Hood',
    channel: 'Flutter (Official Google Channel)',
    badge: 'Architecture & Internals',
    url: 'https://www.youtube.com/playlist?list=PLjxrf2q8roU2HdJQDjJzOeO6J3FoFLWr2',
    description: 'Google engineers answer tough technical questions: why widgets rebuild, Keys mechanics, Impeller rendering, and memory allocations.',
    duration: '20+ Episodes',
  },
  {
    id: 'yt-3',
    title: 'Mitch Koko - Fast-Paced Modern UI Projects',
    channel: 'Mitch Koko',
    badge: 'High Dopamine Builds',
    url: 'https://www.youtube.com/@mitchkoko',
    description: 'Clean, modern, aesthetic UI builds from scratch: E-commerce shopping carts, Nike shoe store, habit trackers, and responsive dashboards.',
    duration: 'Beginner Friendly',
  },
  {
    id: 'yt-4',
    title: 'Vandad Nahavandipoor - 37-Hour Pure Dart & Flutter Masterclass',
    channel: 'freeCodeCamp.org',
    badge: 'Zero to Mastery',
    url: 'https://www.youtube.com/watch?v=VPvVD8t02U8',
    description: 'The most comprehensive, in-depth free Flutter course on YouTube covering Sound Null Safety, Streams, BLoC, and production deployment.',
    duration: '37 Hours (Free)',
  },
  {
    id: 'yt-5',
    title: 'Flutter Package of the Week',
    channel: 'Flutter (Official Google Channel)',
    badge: 'Top Ecosystem Plugins',
    url: 'https://www.youtube.com/playlist?list=PLjxrf2q8roU0o0wKRHSLEjTU7VkCYvOU8',
    description: 'Quick walkthroughs showing how to supercharge your app with community plugins like shared_preferences, url_launcher, and device_info_plus.',
    duration: '50+ Videos',
  },
];
