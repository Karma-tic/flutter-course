export interface RevisionDay {
  day: number;
  title: string;
  focusAreas: string[];
  tasks: string[];
  estimatedHours: number;
}

export const sevenDayRevisionPlan: RevisionDay[] = [
  {
    day: 1,
    title: 'Day 1: Dart Fundamentals, Null Safety & OOP',
    focusAreas: [
      'Primitive data types (int, double, String, bool)',
      'Sound Null Safety (? and ! operators, ?? fallback)',
      'Collection methods: .where(), .map(), .fold()',
      'OOP: Classes, constructors (const & named fromJson), inheritance, enums',
      'Async: Futures, async/await, try/catch',
    ],
    tasks: [
      'Solve 10 practice Dart problems in Practice Lab',
      'Write a grade calculation function without looking at notes',
      'Take Mock Test 1 (Dart Fundamentals)',
    ],
    estimatedHours: 2.5,
  },
  {
    day: 2,
    title: 'Day 2: Flutter UI, Layouts, Material 3 & Scaffolds',
    focusAreas: [
      'StatelessWidget vs StatefulWidget',
      'Row, Column, Stack, Expanded, SizedBox, Padding',
      'Scaffold, AppBar, Drawer, FloatingActionButton',
      'Material 3 theming (ColorScheme.fromSeed, useMaterial3: true)',
      'Avoiding the yellow-and-black overflow error',
    ],
    tasks: [
      'Build a responsive card with Row, Column, and Expanded',
      'Configure light/dark theme using Theme.of(context)',
      'Take Mock Test 2 (UI & Layouts)',
    ],
    estimatedHours: 2.5,
  },
  {
    day: 3,
    title: 'Day 3: Forms, Inputs, Validations & The Student Details Project (Flutter)',
    focusAreas: [
      'TextFormField and TextEditingController with dispose()',
      'DropdownButtonFormField (Android Spinner equivalent)',
      'Form widget and GlobalKey<FormState> validation flow',
      'Validation recipes: non-empty check, marks range (0-100), email',
      'Displaying results in a Card/Text view on button click',
    ],
    tasks: [
      'Build the complete Student Details app in Flutter from scratch in under 25 minutes',
      'Test edge cases: empty fields, marks = -5, marks = 105, spaces only',
      'Take Mock Test 3 (Inputs & Forms)',
    ],
    estimatedHours: 3.0,
  },
  {
    day: 4,
    title: 'Day 4: Lists, Grids, Navigation & Data Persistence',
    focusAreas: [
      'ListView.builder (Android RecyclerView equivalent)',
      'ListTile slots (leading, title, subtitle, trailing)',
      'Navigator.push, Navigator.pop, and returning data from routes',
      'Dismissible swipe-to-delete with Undo SnackBar',
      'SharedPreferences key-value storage vs SQLite (sqflite)',
    ],
    tasks: [
      'Add a ListView history of submitted students underneath the form',
      'Save the last submitted student name in SharedPreferences',
      'Review Dismissible key requirements',
    ],
    estimatedHours: 2.5,
  },
  {
    day: 5,
    title: 'Day 5: Native Android Primer (Kotlin + XML) for Pure-Android Exam Questions',
    focusAreas: [
      'The 4 Core Components: Activity, Service, BroadcastReceiver, ContentProvider',
      'Activity Lifecycle: onCreate, onStart, onResume, onPause, onStop, onDestroy',
      'Native XML: LinearLayout, EditText, Spinner, Button, TextView',
      'Kotlin MainActivity: findViewById, ArrayAdapter, setOnClickListener, et.error',
      'AndroidManifest.xml and permissions (Normal vs Dangerous)',
    ],
    tasks: [
      'Write the complete Student Details app in native Kotlin + XML on paper',
      'Memorize the Activity lifecycle diagram and callback sequences',
      'Take Mock Test 4 (Android Core)',
    ],
    estimatedHours: 3.5,
  },
  {
    day: 6,
    title: 'Day 6: Platform Channels, BroadcastReceivers & Discount Calculations',
    focusAreas: [
      'MethodChannel and EventChannel architecture',
      'Android BroadcastReceivers (battery, airplane, boot completed)',
      'Started vs Bound vs Foreground Services (persistent notifications)',
      'All 6 Discount calculation formulas: Flat, %, Tiered, B2G1, GST, Coupons',
    ],
    tasks: [
      'Solve 10 Discount & Billing problems in the Exam Hub',
      'Use the live interactive Discount Calculator to verify boundary cases',
      'Review the Native Kotlin Battery MethodChannel sample',
    ],
    estimatedHours: 3.0,
  },
  {
    day: 7,
    title: 'Day 7: Full Timed Mock Exam & Final Polish',
    focusAreas: [
      'Complete timed simulation of the company exam',
      '50+ Android Theory rapid-fire review',
      '150+ Flutter Interview Questions flashcards',
      'Verifying custom syllabus checklist with HR/Senior',
    ],
    tasks: [
      'Complete Mock Test 5 (Comprehensive Full-Length Exam)',
      'Build the Student Details app without looking at any reference notes in 20 minutes',
      'Rest early and review the one-page cheat sheets before exam day!',
    ],
    estimatedHours: 3.0,
  },
];

export const examSyllabusAdvice = `### ⚠️ Important Advice on Exam Syllabus
Every software company and university has subtle variations in their testing expectations:
- Some companies focus **70% on Flutter with 30% Android core theory**.
- Some require **writing the exam project in BOTH Flutter and Native Android (Kotlin + XML)**.
- Some focus heavily on **commercial business logic (Discount & Bill calculations, GST, form validation)**.

> [!IMPORTANT]
> **Action Item:** Confirm the exact syllabus and allowed tools with your company HR, technical lead, or examiner:
> 1. Is the exam purely on Flutter, or will there be native Android questions?
> 2. Are you expected to run code in an IDE (VS Code / Android Studio) or write code in a web browser / on paper?
> 3. Are third-party packages allowed, or should you stick to the Flutter SDK and standard libraries?

Use the **Custom Exam Syllabus Checklist** below to paste any extra company-specific topics and track your mastery!`;

