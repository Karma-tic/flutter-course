// Generated from karmatix-learn (src/data). Do not edit by hand.
// Regenerate: node scripts/export-roadmap.mjs flutter <this file>

export type RoadmapResource = { id: string; name: string; by: string; url: string; type: string; cost: string; lang: string; why: string; tip: string };

export const roadmap = {
  "id": "flutter",
  "name": "Flutter",
  "icon": "smartphone",
  "role": "Flutter developer",
  "tagline": "Build Android and iOS apps from one Dart codebase and ship them to the stores.",
  "months": "5 to 8",
  "start": "No coding needed",
  "why": "Flutter is one of the most used cross-platform frameworks in Indian startups and service companies, and campus drives for mobile roles often test Dart, widgets and Android basics.",
  "stages": [
    {
      "title": "Setup and Dart",
      "weeks": "2 to 3",
      "goal": "Install the tools and get fluent in Dart before widgets.",
      "topics": [
        "Install Flutter, Android Studio and VS Code, fix everything flutter doctor reports",
        "Run an app on an emulator and a real phone",
        "Dart variables, types and sound null safety",
        "Functions, collections (List, Set, Map) and records",
        "Classes, constructors, mixins and abstract classes",
        "Futures, async and await, Streams",
        "Git basics: commit, branch, push to GitHub"
      ],
      "learn": [
        {
          "id": "flutter-docs",
          "name": "Flutter docs",
          "by": "Google",
          "url": "https://docs.flutter.dev/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Official Flutter documentation with a great getting-started path and cookbook.",
          "tip": "Do the first app codelab, then use the Cookbook for every feature you need."
        },
        {
          "id": "dart-language",
          "name": "Dart language tour",
          "by": "Dart team",
          "url": "https://dart.dev/language",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "The official tour of Dart: types, null safety, classes, async and records.",
          "tip": "Read it with DartPad open and run every snippet."
        },
        {
          "id": "karmatix-flutter",
          "name": "Karmatix Flutter Course",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/flutter-course/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free Flutter and Dart course with Kotlin comparisons and timed mock tests.",
          "tip": "Use the mock tests if you are preparing for company exams."
        }
      ],
      "practise": [
        {
          "id": "dartpad",
          "name": "DartPad",
          "by": "Dart team",
          "url": "https://dartpad.dev/",
          "type": "tool",
          "cost": "free",
          "lang": "en",
          "why": "Run Dart and Flutter in the browser with nothing installed.",
          "tip": "Use it to try a widget or a language feature in seconds."
        },
        {
          "id": "exercism",
          "name": "Exercism",
          "by": "Exercism",
          "url": "https://exercism.org/",
          "type": "practice",
          "cost": "free",
          "lang": "en",
          "why": "Free coding exercises in 70+ languages with optional human mentoring.",
          "tip": "Use it to pick up a second language fast. Request a mentor review on your solutions."
        }
      ],
      "build": "Ten small Dart console programs: a grade calculator, a discount calculator, a to-do list in memory, and a simple bank account class.",
      "prove": "A public GitHub repo with all ten programs and a README.",
      "hint": null
    },
    {
      "title": "Widgets and layout",
      "weeks": "3 to 4",
      "goal": "Think in widgets and build any screen from a design.",
      "topics": [
        "Stateless vs Stateful widgets and the build method",
        "Row, Column, Stack, Expanded, Flexible, Wrap",
        "Container, Padding, SizedBox, Card, ListTile",
        "Material 3 theming, dark mode and custom fonts",
        "Scaffold, AppBar, Drawer, BottomNavigationBar",
        "ListView and GridView builders",
        "Responsive layouts with LayoutBuilder and MediaQuery"
      ],
      "learn": [
        {
          "id": "flutter-codelabs",
          "name": "Flutter codelabs",
          "by": "Google",
          "url": "https://docs.flutter.dev/codelabs",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Guided, hands-on Flutter tutorials that end in a working app.",
          "tip": "Do Your first Flutter app, then the layout and animation codelabs."
        },
        {
          "id": "flutter-yt",
          "name": "Flutter (official channel)",
          "by": "YouTube",
          "url": "https://www.youtube.com/@flutterdev",
          "type": "video",
          "cost": "free",
          "lang": "en",
          "why": "Widget of the Week and official talks from the Flutter team.",
          "tip": "Watch Widget of the Week to learn widgets you did not know existed."
        }
      ],
      "practise": [
        {
          "id": "figma",
          "name": "Figma",
          "by": "Figma",
          "url": "https://www.figma.com/",
          "type": "tool",
          "cost": "freemium",
          "lang": "en",
          "why": "Where designs live. Developers need to read it even if they never design.",
          "tip": "Learn to inspect spacing, export assets and use Dev Mode. The free plan is enough."
        },
        {
          "id": "dartpad",
          "name": "DartPad",
          "by": "Dart team",
          "url": "https://dartpad.dev/",
          "type": "tool",
          "cost": "free",
          "lang": "en",
          "why": "Run Dart and Flutter in the browser with nothing installed.",
          "tip": "Use it to try a widget or a language feature in seconds."
        }
      ],
      "build": "Rebuild three real app screens from Figma community files: a login screen, a product list and a profile page, pixel close on phone and tablet.",
      "prove": "Screenshots side by side with the designs in your README.",
      "hint": null
    },
    {
      "title": "Forms, navigation and state",
      "weeks": "3 to 4",
      "goal": "Handle user input, move between screens and keep state sane.",
      "topics": [
        "TextFormField, Form and validation",
        "Navigation with Navigator and go_router, passing data between screens",
        "setState, InheritedWidget and Provider",
        "Riverpod or Bloc: pick one and learn it well",
        "Separating UI, state and data",
        "Local storage with shared_preferences and a database (sqflite, Drift or Hive)"
      ],
      "learn": [
        {
          "id": "riverpod",
          "name": "Riverpod docs",
          "by": "Remi Rousselet",
          "url": "https://riverpod.dev/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "A widely used state management and caching library for Flutter.",
          "tip": "Learn it after setState and Provider make sense. Do not start with it."
        },
        {
          "id": "bloc",
          "name": "Bloc library docs",
          "by": "Felix Angelov",
          "url": "https://bloclibrary.dev/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Event-driven state management that many Indian product companies ask for.",
          "tip": "Do the counter and weather tutorials. Know when Cubit is enough."
        }
      ],
      "practise": [
        {
          "id": "karmatix-flutter",
          "name": "Karmatix Flutter Course",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/flutter-course/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free Flutter and Dart course with Kotlin comparisons and timed mock tests.",
          "tip": "Use the mock tests if you are preparing for company exams."
        }
      ],
      "build": "A student records app with add, edit, delete, search and validation, data saved locally, state handled with Riverpod or Bloc.",
      "prove": "A short screen recording of the full CRUD flow in the README.",
      "hint": "Do not learn both Riverpod and Bloc at first. Check job posts in your city and pick the one they ask for."
    },
    {
      "title": "APIs, Firebase and real data",
      "weeks": "3 to 4",
      "goal": "Talk to servers, handle loading and errors, add sign-in.",
      "topics": [
        "HTTP with http or dio, JSON parsing and model classes",
        "Loading, empty and error states",
        "Pagination and pull to refresh",
        "Firebase Auth, Cloud Firestore and Storage",
        "Push notifications with Firebase Cloud Messaging",
        "Images, caching and offline basics"
      ],
      "learn": [
        {
          "id": "firebase",
          "name": "Firebase docs",
          "by": "Google",
          "url": "https://firebase.google.com/docs",
          "type": "docs",
          "cost": "freemium",
          "lang": "en",
          "why": "Auth, database, storage and notifications without running a server.",
          "tip": "Use it for your first apps, then learn a real backend so you are not locked in."
        },
        {
          "id": "pub-dev",
          "name": "pub.dev",
          "by": "Dart team",
          "url": "https://pub.dev/",
          "type": "tool",
          "cost": "free",
          "lang": "en",
          "why": "The package registry for Dart and Flutter, with scores and popularity.",
          "tip": "Prefer packages with Flutter Favorite badges, recent updates and high pub points."
        }
      ],
      "practise": [
        {
          "id": "devchallenges",
          "name": "devChallenges",
          "by": "devChallenges",
          "url": "https://devchallenges.io/",
          "type": "practice",
          "cost": "freemium",
          "lang": "en",
          "why": "Project briefs for frontend, backend and full-stack apps with designs included.",
          "tip": "Use the full-stack challenges as portfolio projects once you know a framework."
        }
      ],
      "build": "A news or movie app using a public API with search, pagination, favourites saved offline and Google sign-in.",
      "prove": "A release APK link and a demo video.",
      "hint": null
    },
    {
      "title": "Quality and release",
      "weeks": "2 to 3",
      "goal": "Make it reliable and publish it.",
      "topics": [
        "Unit, widget and integration tests",
        "Flutter DevTools: performance, memory and rebuilds",
        "Platform channels at a basic level",
        "App icons, splash screens, signing and build flavours",
        "CI with GitHub Actions or Codemagic",
        "Publishing on Google Play (internal testing first) and TestFlight"
      ],
      "learn": [
        {
          "id": "flutter-docs",
          "name": "Flutter docs",
          "by": "Google",
          "url": "https://docs.flutter.dev/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Official Flutter documentation with a great getting-started path and cookbook.",
          "tip": "Do the first app codelab, then use the Cookbook for every feature you need."
        },
        {
          "id": "github-actions",
          "name": "GitHub Actions docs",
          "by": "GitHub",
          "url": "https://docs.github.com/en/actions",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Free CI/CD built into GitHub. Every project should have a pipeline.",
          "tip": "Add tests and a deploy workflow to one project. Show the green badge in your README."
        }
      ],
      "practise": [
        {
          "id": "karmatix-flutter",
          "name": "Karmatix Flutter Course",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/flutter-course/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free Flutter and Dart course with Kotlin comparisons and timed mock tests.",
          "tip": "Use the mock tests if you are preparing for company exams."
        }
      ],
      "build": "Add tests and a CI pipeline to your best app and publish it on the Play Store.",
      "prove": "A live Play Store or TestFlight link on your resume.",
      "hint": null
    },
    {
      "title": "Interview and job ready",
      "weeks": "2 to 3",
      "goal": "Prepare for company exams and interviews.",
      "topics": [
        "Widget lifecycle, keys and BuildContext",
        "State management trade-offs explained in your own words",
        "Android basics: activities, intents, permissions, Gradle",
        "Dart and logic problems under time limits",
        "System design for a mobile app: caching, sync, offline",
        "Portfolio with two published apps"
      ],
      "learn": [
        {
          "id": "tech-interview-handbook",
          "name": "Tech Interview Handbook",
          "by": "Yangshun Tay",
          "url": "https://www.techinterviewhandbook.org/",
          "type": "docs",
          "cost": "free",
          "lang": "en",
          "why": "Free guide to the full interview process: resume, coding, behavioural and negotiation.",
          "tip": "Read the resume and behavioural sections. Most candidates skip them."
        }
      ],
      "practise": [
        {
          "id": "karmatix-flutter",
          "name": "Karmatix Flutter Course",
          "by": "Karmatix",
          "url": "https://karma-tic.github.io/flutter-course/",
          "type": "course",
          "cost": "free",
          "lang": "en",
          "why": "Our own free Flutter and Dart course with Kotlin comparisons and timed mock tests.",
          "tip": "Use the mock tests if you are preparing for company exams."
        },
        {
          "id": "leetcode",
          "name": "LeetCode",
          "by": "LeetCode",
          "url": "https://leetcode.com/",
          "type": "practice",
          "cost": "freemium",
          "lang": "en",
          "why": "The standard platform for coding interview practice.",
          "tip": "Do problems by pattern, not at random. Use the NeetCode list to stay focused."
        }
      ],
      "build": "Take every timed mock test in the Karmatix Flutter course and redo the ones you fail.",
      "prove": "Two published apps, a clean GitHub and mock test scores you can talk about.",
      "hint": null
    }
  ],
  "libs": [
    {
      "name": "go_router",
      "use": "Navigation and deep links"
    },
    {
      "name": "riverpod or flutter_bloc",
      "use": "State management"
    },
    {
      "name": "dio",
      "use": "HTTP with interceptors"
    },
    {
      "name": "freezed and json_serializable",
      "use": "Immutable models and JSON"
    },
    {
      "name": "drift or hive",
      "use": "Local database"
    },
    {
      "name": "firebase_core, firebase_auth, cloud_firestore",
      "use": "Backend as a service"
    },
    {
      "name": "cached_network_image",
      "use": "Image caching"
    },
    {
      "name": "flutter_test and mocktail",
      "use": "Testing"
    }
  ],
  "tools": [
    {
      "id": "vscode",
      "name": "Visual Studio Code",
      "by": "Microsoft",
      "url": "https://code.visualstudio.com/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "The default editor. Free, fast and has an extension for everything.",
      "tip": "Learn ten shortcuts (multi-cursor, go to definition, rename symbol). It saves hours every week."
    },
    {
      "id": "dartpad",
      "name": "DartPad",
      "by": "Dart team",
      "url": "https://dartpad.dev/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "Run Dart and Flutter in the browser with nothing installed.",
      "tip": "Use it to try a widget or a language feature in seconds."
    },
    {
      "id": "pub-dev",
      "name": "pub.dev",
      "by": "Dart team",
      "url": "https://pub.dev/",
      "type": "tool",
      "cost": "free",
      "lang": "en",
      "why": "The package registry for Dart and Flutter, with scores and popularity.",
      "tip": "Prefer packages with Flutter Favorite badges, recent updates and high pub points."
    },
    {
      "id": "firebase",
      "name": "Firebase docs",
      "by": "Google",
      "url": "https://firebase.google.com/docs",
      "type": "docs",
      "cost": "freemium",
      "lang": "en",
      "why": "Auth, database, storage and notifications without running a server.",
      "tip": "Use it for your first apps, then learn a real backend so you are not locked in."
    },
    {
      "id": "figma",
      "name": "Figma",
      "by": "Figma",
      "url": "https://www.figma.com/",
      "type": "tool",
      "cost": "freemium",
      "lang": "en",
      "why": "Where designs live. Developers need to read it even if they never design.",
      "tip": "Learn to inspect spacing, export assets and use Dev Mode. The free plan is enough."
    }
  ],
  "channels": [
    {
      "id": "flutter-yt",
      "name": "Flutter (official channel)",
      "by": "YouTube",
      "url": "https://www.youtube.com/@flutterdev",
      "type": "video",
      "cost": "free",
      "lang": "en",
      "why": "Widget of the Week and official talks from the Flutter team.",
      "tip": "Watch Widget of the Week to learn widgets you did not know existed."
    },
    {
      "id": "fireship",
      "name": "Fireship",
      "by": "YouTube",
      "url": "https://www.youtube.com/@Fireship",
      "type": "video",
      "cost": "free",
      "lang": "en",
      "why": "Fast, accurate overviews of tools and tech news in a few minutes.",
      "tip": "Use it to decide what to learn next, not to learn it. Follow up with the official docs."
    }
  ],
  "communities": [
    {
      "id": "r-flutterdev",
      "name": "r/FlutterDev",
      "by": "Reddit",
      "url": "https://www.reddit.com/r/FlutterDev/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "The largest Flutter discussion forum: news, packages and help.",
      "tip": "Search before asking. Share your finished app for feedback."
    },
    {
      "id": "gdg",
      "name": "Google Developer Groups",
      "by": "Google",
      "url": "https://gdg.community.dev/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "Free local meetups and DevFests in most Indian cities.",
      "tip": "Go to one event a month and talk to two people. Volunteer to get to know organisers."
    },
    {
      "id": "r-developersindia",
      "name": "r/developersIndia",
      "by": "Reddit",
      "url": "https://www.reddit.com/r/developersIndia/",
      "type": "community",
      "cost": "free",
      "lang": "en",
      "why": "India's largest developer forum: jobs, salaries, interviews and advice.",
      "tip": "Search before you ask. The salary and interview threads are gold."
    }
  ],
  "certs": [],
  "interview": [
    "Widget tree, element tree and render tree",
    "Stateless vs Stateful and when to use each",
    "Keys and why lists need them",
    "Hot reload vs hot restart",
    "Future vs Stream",
    "Provider vs Riverpod vs Bloc",
    "How you would make an app work offline",
    "How you reduce rebuilds and jank"
  ],
  "related": "mobile",
  "course": "https://karma-tic.github.io/flutter-course/",
  "note": "There is no Flutter certification worth paying for. A published app is the proof employers look for.",
  "source": "https://learn.karmatix.in/roadmaps/flutter/"
} as const;
