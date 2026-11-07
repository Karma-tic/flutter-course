import { Lesson } from '../../types';

export const module9Lessons: Lesson[] = [
  {
    id: 'm9-l1',
    moduleId: 'module-9',
    title: 'Testing Flutter Apps: Unit Tests, Widget Tests & Integration Tests',
    description: 'Master the testing pyramid: test business logic with Unit Tests (flutter_test), verify UI widgets and simulate user taps with Widget Tests, and test complete end-to-end user flows with Integration Tests.',
    order: 1,
    durationMinutes: 16,
    difficulty: 'Intermediate',
    prerequisites: ['Module 6: Data & Networking'],
    lastVerified: 'November 2026',
    goal: 'Write unit tests with expect(), test widget UI interactions with testWidgets() and tester.pump(), and mock external APIs.',
    simpleExplanation: `Professional teams never ship code without tests. Flutter provides three tiers of automated testing:

### 1. Unit Tests (Testing Pure Dart Logic)
Tests a single function, method, or class in isolation (fastest, runs in milliseconds):
\`\`\`dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('calculateGrade returns A+ for marks >= 90', () {
    expect(calculateGrade(95.0), 'A+');
    expect(calculateGrade(89.9), 'A');
    expect(calculateGrade(45.0), 'F');
  });
}
\`\`\`

### 2. Widget Tests (Testing UI Components in Isolation)
Renders a widget in an off-screen virtual test harness without starting an emulator:
- **\`tester.pumpWidget(widget)\`**: Renders the widget.
- **\`find.text('Submit')\`**: Finds widgets by text, type, or key.
- **\`tester.tap(finder)\`**: Simulates a touch tap.
- **\`tester.pumpAndSettle()\`**: Waits for all animations and futures to finish.
\`\`\`dart
testWidgets('Submitting empty student form shows validation error', (WidgetTester tester) async {
  await tester.pumpWidget(const MaterialApp(home: StudentFormScreen()));

  // Tap submit without typing anything
  await tester.tap(find.byType(ElevatedButton));
  await tester.pump(); // trigger frame rebuild

  // Verify error text is displayed
  expect(find.text('Please enter student name'), findsOneWidget);
});
\`\`\`

### 3. Integration Tests (Full End-to-End Test on Real Device)
Tests the complete application on a real Android phone or iOS simulator from app launch to final screen.`,
    analogy: `Think of manufacturing a high-speed sports car:
- **Unit Test:** Testing the spark plug on a laboratory test bench to verify it sparks at the right voltage.
- **Widget Test:** Assembling the steering wheel and dashboard to make sure the speedometer needle moves when you turn the dial.
- **Integration Test:** Putting the fully assembled sports car on the actual test track and driving it at 120 mph through rain, curves, and sudden braking!`,
    codeSnippet: `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

// The function to test
String calculateDiscountedPrice(double original, double discountPercent) {
  if (original < 0 || discountPercent < 0 || discountPercent > 100) {
    throw ArgumentError('Invalid input');
  }
  return (original - (original * discountPercent / 100)).toStringAsFixed(2);
}

void main() {
  group('Discount Calculation Unit Tests', () {
    test('Standard 20% discount on \$100', () {
      final result = calculateDiscountedPrice(100.0, 20.0);
      expect(result, '80.00');
    });

    test('0% discount preserves original price', () {
      final result = calculateDiscountedPrice(50.0, 0.0);
      expect(result, '50.00');
    });

    test('Throws ArgumentError for negative price', () {
      expect(() => calculateDiscountedPrice(-10.0, 10.0), throwsArgumentError);
    });
  });

  group('Widget Tests for Counter', () {
    testWidgets('Tapping + increments counter value', (WidgetTester tester) async {
      int count = 0;
      await tester.pumpWidget(
        MaterialApp(
          home: StatefulBuilder(
            builder: (context, setState) {
              return Scaffold(
                body: Text('Count: \$count'),
                floatingActionButton: FloatingActionButton(
                  onPressed: () => setState(() => count++),
                  child: const Icon(Icons.add),
                ),
              );
            },
          ),
        ),
      );

      expect(find.text('Count: 0'), findsOneWidget);

      await tester.tap(find.byType(FloatingActionButton));
      await tester.pump();

      expect(find.text('Count: 1'), findsOneWidget);
    });
  });
}`,
    dartPadCode: `// Unit test assert mental model:
void expectEqual(dynamic actual, dynamic expected) {
  if (actual == expected) {
    print('Test Passed: \$actual == \$expected ✅');
  } else {
    throw Exception('Test Failed! Expected \$expected but got \$actual ❌');
  }
}

void main() {
  expectEqual(10 + 5, 15);
  expectEqual('A+'.toLowerCase(), 'a+');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Run flutter test via CLI',
        description: 'Executing flutter test in terminal runs all test files in the test/ directory.'
      },
      {
        step: 2,
        title: 'Use group() for organization',
        description: 'Group related test cases under descriptive group("Category", () { ... }) blocks.'
      },
      {
        step: 3,
        title: 'tester.pump() vs tester.pumpAndSettle()',
        description: 'tester.pump() advances a single frame; pumpAndSettle() continuously pumps frames until no scheduled animations remain.'
      },
      {
        step: 4,
        title: 'Matchers in expect()',
        description: 'Use findOneWidget, findsNothing, findsNWidgets(n) to assert UI presence.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to call tester.pump() after simulating a tap or text entry.',
        fix: 'Always call await tester.pump(); or await tester.pumpAndSettle(); after tester.tap() or enterText().',
        why: 'In widget tests, frames do not tick automatically; you must manually trigger the rebuild pump.'
      },
      {
        mistake: 'Putting unit tests that hit real external web servers or real disk files.',
        fix: 'Mock external services using mockito or mocktail.',
        why: 'Tests that hit real networks are flaky, fail when offline, and run too slowly.'
      }
    ],
    examAlerts: [
      'Exam Alert (Testing Basics): "What are the three main types of tests in Flutter?" — Answer: 1. Unit Tests (test pure functions/classes), 2. Widget Tests (test individual UI widgets and interactions), 3. Integration Tests (test the complete app flow on a device/emulator).',
      'Exam Alert: "What is the difference between tester.pump() and tester.pumpAndSettle() in a widget test?" — Answer: tester.pump() triggers a single frame rebuild; tester.pumpAndSettle() repeatedly pumps frames until all animations, timers, and scheduled frames have completely finished settling.'
    ],
    practiceTask: {
      task: 'Write a unit test that verifies a function "isPassingGrade(double marks)" returns true for marks = 50.0 and false for marks = 49.9.',
      hint: 'test("Passing grade threshold", () { expect(isPassingGrade(50.0), isTrue); ... });',
      solution: `test('isPassingGrade thresholds', () {
  expect(isPassingGrade(50.0), isTrue);
  expect(isPassingGrade(49.9), isFalse);
});`
    },
    quiz: [
      {
        id: 'q9-1-1',
        question: 'Which Flutter testing tier tests individual functions and algorithms in isolation without rendering UI?',
        options: ['Unit Tests', 'Widget Tests', 'Golden Tests', 'Integration Tests'],
        correctIndex: 0,
        explanation: 'Unit tests verify discrete units of business logic, models, and utility functions.'
      },
      {
        id: 'q9-1-2',
        question: 'What does tester.pumpAndSettle() do in a Flutter widget test?',
        options: [
          'It reboots the testing computer',
          'It repeatedly advances frames until all animations, futures, and transitions have completely settled',
          'It deletes the test database',
          'It uploads screenshots to GitHub'
        ],
        correctIndex: 1,
        explanation: 'pumpAndSettle drains the microtask queue and settles all active animations.'
      },
      {
        id: 'q9-1-3',
        question: 'Which method simulates typing text into a TextFormField during a widget test?',
        options: ['tester.enterText(finder, "text")', 'tester.type("text")', 'tester.write("text")', 'tester.input("text")'],
        correctIndex: 0,
        explanation: 'tester.enterText locates the field and emits text input events.'
      },
      {
        id: 'q9-1-4',
        question: 'Which matcher asserts that a widget appears exactly once in the tree?',
        options: ['findsOneWidget', 'hasSingle()', 'isUnique', 'findsAtLeastOne'],
        correctIndex: 0,
        explanation: 'findsOneWidget checks that the finder matches exactly one widget instance.'
      },
      {
        id: 'q9-1-5',
        question: 'Which command runs the entire automated test suite from the terminal in a Flutter project?',
        options: ['flutter test', 'dart run tests', 'flutter verify', 'npm test'],
        correctIndex: 0,
        explanation: 'flutter test discovers and executes all tests in the test/ folder.'
      }
    ]
  },
  {
    id: 'm9-l2',
    moduleId: 'module-9',
    title: 'Performance Optimization: Eliminating Rebuilds, const Widgets & Keys',
    description: 'Ensure 60/120 FPS buttery smooth performance! Learn how the const keyword saves RAM and CPU, how to eliminate unnecessary widget rebuilds, master ValueKey/GlobalKey, and use Flutter DevTools profiler.',
    order: 2,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 9 Lesson 1: Testing'],
    lastVerified: 'November 2026',
    goal: 'Eliminate jank, understand how const canonicalizes widgets, know when to use Keys (ValueKey, ObjectKey, UniqueKey, GlobalKey), and profile with DevTools.',
    simpleExplanation: `Flutter is engineered to render at **60 or 120 frames per second** (16ms or 8ms per frame). If your code spends longer than 16ms building a frame, the app stutters. This is called **jank**.

Here are the 4 golden rules of Flutter performance:

### 1. Use the \`const\` Keyword Everywhere!
Whenever a widget doesn't depend on runtime variables, add \`const\`:
\`\`\`dart
const SizedBox(height: 16);
const Text('Student Portal');
\`\`\`
**Why it matters:** Flutter instantiates a \`const\` widget **exactly ONCE in memory at compile-time**. When its parent widget rebuilds, Flutter completely skips rebuilding \`const\` subtrees!

### 2. Push State Down (Don't Rebuild the Whole Screen)
If only a single star icon needs to animate when favorited, extract that icon into its own small \`StatefulWidget\` or wrap it in a \`ValueListenableBuilder\`. Do not call \`setState()\` on the whole page!

### 3. Understanding Flutter Keys (When and Why)
Widgets are cheap configurations; **Elements** are persistent nodes that manage state.
Flutter matches new widgets to old elements by their **runtimeType** and **Key**.
- **\`ValueKey('unique-id')\`**: Used in scrollable lists or Dismissible items to preserve state when items are reordered or deleted.
- **\`GlobalKey\`**: Used to access state across the tree (like \`GlobalKey<FormState>\`). Expensive; use sparingly!
- **\`UniqueKey()\`**: Forces a completely new element creation every time.

### 4. DevTools Performance Overlay
In VS Code, press **Ctrl/Cmd+Shift+P** and select **Flutter: Open DevTools**.
- Inspect the CPU Profiler and Memory allocation.
- Watch for red spike bars indicating slow raster/UI frames.`,
    analogy: `Think of a car assembly line:
- **Without const:** Every time you repaint the car's mirror, the factory tears down the entire engine, tires, seats, and chassis and rebuilds the whole car from scratch!
- **With const:** The factory replaces only the mirror while the entire car remains sitting on the assembly line untouched.`,
    codeSnippet: `import 'package:flutter/material.dart';

// Demonstrating ValueKey to preserve widget state in dynamic lists
class StudentItem {
  final String id;
  final String name;
  StudentItem(this.id, this.name);
}

class OptimizedStudentList extends StatefulWidget {
  const OptimizedStudentList({super.key});

  @override
  State<OptimizedStudentList> createState() => _OptimizedStudentListState();
}

class _OptimizedStudentListState extends State<OptimizedStudentList> {
  final List<StudentItem> _students = [
    StudentItem('id-101', 'Alex Johnson'),
    StudentItem('id-102', 'Bethany Smith'),
    StudentItem('id-103', 'Carlos Gomez'),
  ];

  void _removeFirst() {
    setState(() {
      _students.removeAt(0);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Performance & Keys Demo'),
        actions: [
          IconButton(onPressed: _removeFirst, icon: const Icon(Icons.remove_circle_outline)),
        ],
      ),
      body: ListView.builder(
        itemCount: _students.length,
        itemBuilder: (context, index) {
          final student = _students[index];

          // Crucial: ValueKey prevents state mismatch when items are removed!
          return StudentRowItem(
            key: ValueKey(student.id),
            student: student,
          );
        },
      ),
    );
  }
}

class StudentRowItem extends StatefulWidget {
  final StudentItem student;
  const StudentRowItem({super.key, required this.student});

  @override
  State<StudentRowItem> createState() => _StudentRowItemState();
}

class _StudentRowItemState extends State<StudentRowItem> {
  bool _isChecked = false;

  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
      title: Text(widget.student.name),
      subtitle: Text('ID: \${widget.student.id}'),
      value: _isChecked,
      onChanged: (val) => setState(() => _isChecked = val ?? false),
    );
  }
}`,
    dartPadCode: `void main() {
  print('Performance checklist:');
  print('1. Add const constructors wherever possible');
  print('2. Use ValueKey on dynamic/reorderable list items');
  print('3. Avoid heavy computations in build() methods');
  print('4. Use ListView.builder for lists over 10 items');
  print('5. Profile in Profile/Release mode, NEVER in Debug mode!');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Enable prefer_const_constructors lint',
        description: 'Ensure analysis_options.yaml has prefer_const_constructors enabled to get blue squiggly suggestions.'
      },
      {
        step: 2,
        title: 'Profile in Release or Profile mode',
        description: 'Never evaluate performance in Debug mode! Debug mode includes assertions, debug banners, and unoptimized JIT compilation.'
      },
      {
        step: 3,
        title: 'Use ValueKey for reorderable items',
        description: 'Keys ensure that when item 0 is removed, the remaining items keep their correct state.'
      },
      {
        step: 4,
        title: 'Use RepaintBoundary',
        description: 'Wrap complex isolated animations in RepaintBoundary to prevent repainting adjacent static widgets.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Measuring performance or frame rates in Debug mode.',
        fix: 'Always run flutter run --profile or flutter run --release to test performance.',
        why: 'Debug mode is intentionally unoptimized and slow because it runs the JIT Dart VM with DevTools telemetry.'
      },
      {
        mistake: 'Performing heavy file reads or JSON parsing inside the build() method.',
        fix: 'Move all I/O and calculations to initState(), ViewModels, or background Isolates.',
        why: 'build() runs at 60 or 120 times per second during animations; any blocking work causes visible jank.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely Frequent): "Why should you use the const keyword when instantiating widgets in Flutter?" — Answer: const widgets are canonicalized in memory at compile-time and reused; Flutter completely skips rebuilding const subtrees when parent widgets rebuild, significantly improving CPU and RAM performance.',
      'Exam Alert: "When is a Key strictly required in Flutter?" — Answer: When modifying, reordering, filtering, or deleting widgets of the same type in a collection that hold internal state (e.g. stateful list items or Dismissible items).'
    ],
    practiceTask: {
      task: 'Identify which of these two widgets can be declared with const: (1) Text("Student Details"), (2) Text("Score: \$marks").',
      hint: 'const requires values known at compile-time.',
      solution: `1. const Text("Student Details") -> CAN be const (fixed compile-time string literal).
2. Text("Score: \$marks") -> CANNOT be const (depends on runtime variable "marks").`
    },
    quiz: [
      {
        id: 'q9-2-1',
        question: 'Why does adding the "const" keyword to widget constructors improve Flutter performance?',
        options: [
          'It deletes the widget tree',
          'It creates a single compile-time instance and instructs Flutter to skip rebuilding that widget subtree when parents update',
          'It increases download speed',
          'It enables Bluetooth'
        ],
        correctIndex: 1,
        explanation: 'const widgets are instantiated once and short-circuit subtree rebuild traversals.'
      },
      {
        id: 'q9-2-2',
        question: 'In which build mode should you evaluate the actual rendering performance and frame rate of your app?',
        options: ['Debug Mode', 'Profile or Release Mode', 'Test Mode', 'Maintenance Mode'],
        correctIndex: 1,
        explanation: 'Profile and Release modes compile with AOT (ahead-of-time) optimization without debug overhead.'
      },
      {
        id: 'q9-2-3',
        question: 'What is "jank" in a mobile user interface?',
        options: [
          'A dropped frame causing visible visual stuttering when a frame takes longer than 16ms to render',
          'A syntax error in Dart',
          'A failed network request',
          'A virus'
        ],
        correctIndex: 0,
        explanation: 'Jank occurs when the UI thread or raster thread misses the hardware display VSync deadline.'
      },
      {
        id: 'q9-2-4',
        question: 'What type of Key is best for identifying items in a dynamic list of objects by their database ID?',
        options: ['ValueKey', 'GlobalKey', 'UniqueKey', 'StaticKey'],
        correctIndex: 0,
        explanation: 'ValueKey(item.id) links the widget identity directly to the underlying object\'s primary key.'
      },
      {
        id: 'q9-2-5',
        question: 'Which tool allows visual inspection of widget rebuild counts and GPU frame rendering bars?',
        options: ['Flutter DevTools', 'Chrome Console only', 'Android Logcat text filter', 'Git bash'],
        correctIndex: 0,
        explanation: 'Flutter DevTools provides the Widget Inspector, Performance View, and Memory Profiler.'
      }
    ]
  },
  {
    id: 'm9-l3',
    moduleId: 'module-9',
    title: 'Building APK & AAB, App Signing & Google Play Store Publishing',
    description: 'Ship your app to millions of users! Master generating release keystores (keytool), configuring key.properties in Gradle, building App Bundles (AAB) and APKs, and navigating the Google Play Console checklist.',
    order: 3,
    durationMinutes: 18,
    difficulty: 'Intermediate',
    prerequisites: ['Module 7 Lesson 3: Android Manifest & Gradle'],
    lastVerified: 'November 2026',
    goal: 'Create an Android upload keystore, configure Gradle signingConfigs securely, build release APK and AAB binaries, and understand Google Play submission requirements.',
    simpleExplanation: `To publish your app on the Google Play Store, you cannot simply upload a debug APK. You must build an **Android App Bundle (.aab)** signed with a cryptographic private key. Follow the official [Flutter Android Deployment Guide](https://docs.flutter.dev/deployment/android) and sign in at the [Google Play Console](https://play.google.com/console/).

### Step 1: Create an Upload Keystore
Run in terminal (using the Java \`keytool\` utility):
\`\`\`bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
\`\`\`
Keep your keystore and password secure! If you lose your upload keystore, Google Play will not let you update your app.

### Step 2: Reference Keystore in Gradle
1. Create \`android/key.properties\` (and add it to \`.gitignore\`!):
   \`\`\`properties
   storePassword=your_store_password
   keyPassword=your_key_password
   keyAlias=upload
   storeFile=/path/to/upload-keystore.jks
   \`\`\`
2. Configure \`android/app/build.gradle\`:
   \`\`\`groovy
   signingConfigs {
       release {
           storeFile file(keystoreProperties['storeFile'])
           storePassword keystoreProperties['storePassword']
           keyAlias keystoreProperties['keyAlias']
           keyPassword keystoreProperties['keyPassword']
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
   \`\`\`

### Step 3: Build the Binaries
- **For Google Play Store (Mandatory format):**
  \`\`\`bash
  flutter build appbundle
  \`\`\`
  Generates: \`build/app/outputs/bundle/release/app-release.aab\`
- **For Direct Device Sideloading / Testing:**
  \`\`\`bash
  flutter build apk --split-per-abi
  \`\`\`

### Step 4: Google Play Console Release Steps
1. Create App Listing (Title, Short Description, Full Description, Screenshots, Privacy Policy URL).
2. Set Target Audience & Content Rating Questionnaire.
3. Upload \`.aab\` bundle to Closed Testing (Internal track).
4. Review and Rollout to Production!`,
    analogy: `Think of releasing a bestselling book:
- **Debug build:** Your rough handwritten draft with notes scribbled in margins.
- **Upload Keystore:** The author's legal signature and official wax seal stamped on the publishing contract.
- **App Bundle (.aab):** The master printing press plates sent to the publisher (Google Play). Google Play automatically prints only the specific page size and language needed by each reader (device) so the downloaded book is as light as possible!`,
    codeSnippet: `# Terminal Commands for Building Release Binaries:

# 1. Check for any compile errors or deprecations
flutter analyze

# 2. Clean temporary build caches
flutter clean
flutter pub get

# 3. Build Google Play Store App Bundle (AAB)
flutter build appbundle --release

# 4. Build standalone APKs split by CPU architecture (armeabi-v7a, arm64-v8a)
flutter build apk --split-per-abi --release

# 5. Inspect the generated files
# AAB location: build/app/outputs/bundle/release/app-release.aab
# APK location: build/app/outputs/flutter-apk/app-arm64-v8a-release.apk`,
    dartPadCode: `// APK vs AAB comparison mental model:
void main() {
  print('APK (Android Package Kit): Complete standalone binary. Can be sideloaded directly on any device.');
  print('AAB (Android App Bundle): Publishing format required by Google Play.');
  print('Google Play uses the AAB to generate optimized, smaller APKs tailored to each specific user device (Dynamic Delivery).');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Generate keystore with keytool',
        description: 'Store ~/upload-keystore.jks in a safe location outside your Git project repository.'
      },
      {
        step: 2,
        title: 'Add key.properties to .gitignore',
        description: 'Never commit keystore passwords or certificate files to public GitHub repositories!'
      },
      {
        step: 3,
        title: 'Increment versionCode',
        description: 'Update version: 1.0.0+1 in pubspec.yaml to 1.0.1+2 for the next release.'
      },
      {
        step: 4,
        title: 'Build with flutter build appbundle',
        description: 'Upload the resulting .aab file to Google Play Console.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Committing upload-keystore.jks or key.properties to public GitHub.',
        fix: 'Add *.jks and key.properties to .gitignore immediately.',
        why: 'Anyone with your keystore and password can sign malicious APK updates under your app ID.'
      },
      {
        mistake: 'Uploading a debug APK to Google Play Console.',
        fix: 'Google Play strictly rejects debug APKs; always build a signed release AAB.',
        why: 'Debug binaries contain debug symbols, insecure keys, and unoptimized JIT bytecode.'
      }
    ],
    examAlerts: [
      'Exam Alert (Publishing Basics): "What is the difference between an APK and an AAB (Android App Bundle)?" — Answer: An APK is a standalone executable installer that runs directly on an Android device; an AAB is a publishing format required by Google Play that allows Google to generate optimized, smaller APKs tailored to each user\'s specific device architecture and screen density.',
      'Exam Alert: "Which command builds a release Android App Bundle in Flutter?" — Answer: flutter build appbundle.'
    ],
    practiceTask: {
      task: 'Look at pubspec.yaml: "version: 1.2.0+5". What does "1.2.0" represent, and what does "5" represent in Android?',
      hint: 'One is versionName; one is versionCode.',
      solution: `- "1.2.0" represents versionName (the semantic version string displayed to users in the Play Store and Settings).
- "5" represents versionCode (the internal integer build number that must increment on every release).`
    },
    quiz: [
      {
        id: 'q9-3-1',
        question: 'Which file format is mandatory when publishing a new application to the Google Play Store?',
        options: ['.aab (Android App Bundle)', '.apk only', '.zip', '.jar'],
        correctIndex: 0,
        explanation: 'Google Play requires new apps to be submitted as Android App Bundles (.aab).'
      },
      {
        id: 'q9-3-2',
        question: 'What is the purpose of the keytool command in the Android release pipeline?',
        options: [
          'To generate a private cryptographic signing keystore (.jks) for authenticating app updates',
          'To format hard drives',
          'To unlock locked Android phones',
          'To compress video files'
        ],
        correctIndex: 0,
        explanation: 'keytool is a Java security tool used to generate cryptographic keys and certificates.'
      },
      {
        id: 'q9-3-3',
        question: 'Why should key.properties and *.jks files ALWAYS be included in .gitignore?',
        options: [
          'Because Git crashes on large files',
          'To prevent exposing private signing certificates and keystore passwords in public version control',
          'Google blocks repositories containing keystores',
          'They don\'t work on Linux'
        ],
        correctIndex: 1,
        explanation: 'Private keys must remain secret to prevent unauthorized application impersonation.'
      },
      {
        id: 'q9-3-4',
        question: 'What command generates a release Android App Bundle in a Flutter project?',
        options: ['flutter build appbundle', 'flutter make release', 'flutter compile playstore', 'dart bundle'],
        correctIndex: 0,
        explanation: 'flutter build appbundle compiles the release bundle into build/app/outputs/bundle/release/.'
      },
      {
        id: 'q9-3-5',
        question: 'What is the main benefit of Android App Bundles over monolithic universal APKs?',
        options: [
          'Smaller download sizes for users because Google Play serves only the resources and native binaries required for their specific device',
          'Free cloud storage',
          'No need for AndroidManifest.xml',
          'Runs on Windows XP'
        ],
        correctIndex: 0,
        explanation: 'Dynamic delivery tailors generated APK downloads to device CPU and screen density.'
      }
    ]
  },
  {
    id: 'm9-l4',
    moduleId: 'module-9',
    title: 'CI/CD with GitHub Actions & Fastlane, Flutter Web & Desktop Targets',
    description: 'Automate testing and deployment! Build automated CI/CD pipelines with GitHub Actions and Fastlane, and learn multi-platform deployment targets (Flutter Web and Desktop).',
    order: 4,
    durationMinutes: 15,
    difficulty: 'Advanced',
    prerequisites: ['Module 9 Lesson 3: Building & Publishing'],
    lastVerified: 'November 2026',
    goal: 'Configure GitHub Actions to test and build Flutter on every pull request, understand Fastlane for automated store deployment, and deploy Flutter Web to GitHub Pages.',
    simpleExplanation: `In modern engineering teams, developers don't manually build APKs on their laptops. Every time code is pushed to GitHub, automated robots run tests and build release artifacts using **CI/CD (Continuous Integration & Continuous Deployment)**.

### 1. GitHub Actions for Flutter
A \`.github/workflows/build.yml\` file defines automated jobs that run in the cloud on virtual Ubuntu/macOS runners:
- Check formatting: \`dart format --set-exit-if-changed .\`
- Analyze code: \`flutter analyze\`
- Run automated tests: \`flutter test\`
- Build APK/AAB or deploy Flutter Web to GitHub Pages!

### 2. Fastlane
**Fastlane** is an open-source tool that automates mundane mobile tasks:
- Capturing localized store screenshots across 10 device sizes
- Incrementing build numbers
- Uploading AABs directly to Google Play Internal Testing tracks with a single command (\`fastlane deploy\`).

### 3. Deploying to Flutter Web & Desktop
Flutter runs on macOS, Windows, Linux, and Web using the exact same codebase:
- **Build for Web:** \`flutter build web --base-href "/flutter-course/"\`
- The generated \`build/web\` directory contains standard HTML, JS, and WebAssembly (Wasm) files that can be hosted on GitHub Pages, Netlify, or Firebase Hosting!`,
    analogy: `Think of a robotic automobile factory:
Instead of a human mechanic tightening every bolt by hand, the car frame glides along an automated conveyor belt. Robot arms scan the alignment (flutter analyze), run safety crash tests (flutter test), paint the exterior (flutter build), and load the finished car onto the transport train (Fastlane deployment) automatically!`,
    codeSnippet: `# Sample GitHub Actions Workflow (.github/workflows/ci.yml)
name: Flutter CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test_and_build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Setup Flutter SDK
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.29.x'
          channel: 'stable'

      - name: Install Dependencies
        run: flutter pub get

      - name: Verify Code Formatting & Linting
        run: |
          dart format --set-exit-if-changed .
          flutter analyze

      - name: Run Automated Test Suite
        run: flutter test

      - name: Build Release APK
        run: flutter build apk --release`,
    dartPadCode: `// CI/CD Pipeline Steps mental model:
void main() {
  List<String> pipeline = [
    '1. git push to GitHub',
    '2. GitHub Actions wakes up cloud runner',
    '3. dart format & flutter analyze (Lint checks)',
    '4. flutter test (Runs all Unit and Widget tests)',
    '5. flutter build web / flutter build appbundle',
    '6. Automatic deployment to GitHub Pages or Google Play!'
  ];

  for (var step in pipeline) print(step);
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Create .github/workflows directory',
        description: 'GitHub looks for YAML workflow files inside .github/workflows/ in the repo root.'
      },
      {
        step: 2,
        title: 'Use subosito/flutter-action',
        description: 'This community standard action installs and caches the Flutter SDK on GitHub runners.'
      },
      {
        step: 3,
        title: 'Run flutter analyze and test',
        description: 'If any test fails, the GitHub Action fails the PR build, blocking broken code from merging.'
      },
      {
        step: 4,
        title: 'GitHub Pages deployment',
        description: 'Deploy static build/web files using official actions/upload-pages-artifact and actions/deploy-pages.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hardcoding secrets (keystore passwords, API keys) directly in workflow YAML files.',
        fix: 'Use GitHub Repository Secrets: Settings -> Secrets and variables -> Actions.',
        why: 'Hardcoded secrets in public YAML files are readable by anyone on the internet.'
      },
      {
        mistake: 'Forgetting the --base-href flag when deploying Flutter Web to GitHub Pages subdirectories.',
        fix: 'flutter build web --base-href "/repo-name/"',
        why: 'Without base-href, assets and scripts attempt to load from the root domain rather than the repository subpath.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is CI/CD in mobile app development?" — Answer: Continuous Integration (automatically testing and validating code on push) and Continuous Deployment (automatically building, signing, and releasing apps to testing tracks or app stores).',
      'Exam Alert: "What flag in flutter build web specifies the subpath for GitHub Pages hosting?" — Answer: --base-href (e.g. --base-href "/flutter-course/").'
    ],
    practiceTask: {
      task: 'Write the command to build Flutter for Web hosted at the subdirectory "/flutter-course/".',
      hint: 'flutter build web --base-href "/flutter-course/"',
      solution: `flutter build web --base-href "/flutter-course/"`
    },
    quiz: [
      {
        id: 'q9-4-1',
        question: 'What does "CI/CD" stand for in software engineering?',
        options: [
          'Code Inspection / Code Design',
          'Continuous Integration / Continuous Deployment',
          'Computer Interface / Computer Display',
          'Cloud Infrastructure / Cloud Data'
        ],
        correctIndex: 1,
        explanation: 'CI/CD refers to automated code verification, testing, and continuous delivery.'
      },
      {
        id: 'q9-4-2',
        question: 'In which folder are GitHub Actions workflow files stored in a repository?',
        options: ['.github/workflows/', '.git/actions/', 'workflows/', 'build/actions/'],
        correctIndex: 0,
        explanation: 'GitHub automatically looks for YAML workflow definitions inside .github/workflows/.'
      },
      {
        id: 'q9-4-3',
        question: 'What is Fastlane primarily used for in mobile engineering?',
        options: [
          'Automating mobile screenshots, code signing, and app store deployment',
          'Writing Flutter UI',
          'Speeding up internet bandwidth',
          'Replacing Dart'
        ],
        correctIndex: 0,
        explanation: 'Fastlane automates mobile release pipelines for iOS and Android.'
      },
      {
        id: 'q9-4-4',
        question: 'Why is the "--base-href" flag required when deploying Flutter Web to GitHub Pages under a sub-path?',
        options: [
          'To ensure asset and JavaScript paths are resolved relative to the repository URL path instead of the root domain',
          'To enable Dark Mode',
          'It is not required',
          'To compress HTML'
        ],
        correctIndex: 0,
        explanation: 'base-href configures the base URL for relative asset and router resolution.'
      },
      {
        id: 'q9-4-5',
        question: 'Where should sensitive signing passwords and API tokens be stored for GitHub Actions workflows?',
        options: ['Directly in the YAML code', 'In GitHub Repository Secrets', 'In README.md', 'In a public text file'],
        correctIndex: 1,
        explanation: 'GitHub Secrets securely encrypts environment variables exposed only to workflow runners.'
      }
    ]
  }
];

