import { Lesson } from '../../types';

export const module0Lessons: Lesson[] = [
  {
    id: 'm0-l1',
    moduleId: 'module-0',
    title: 'What is Flutter, Dart & Why Companies Use It',
    description: 'Understand the fundamental architecture of Flutter, how Dart works, what a widget is, and why top tech companies choose Flutter for building apps.',
    order: 1,
    durationMinutes: 10,
    difficulty: 'Beginner',
    prerequisites: ['None! Zero programming knowledge required.'],
    lastVerified: 'November 2026 (Flutter 3.29+ / Dart 3.7+ stable)',
    goal: 'Understand what Flutter and Dart are, why companies hire Flutter engineers, and how Flutter paints UI on a screen like a video game engine.',
    simpleExplanation: `Flutter is an open-source UI toolkit created by Google. It lets you write **one single codebase** and run it natively on Android, iOS, the Web, macOS, Windows, and Linux. You can explore the [Official Flutter Website](https://flutter.dev) for official case studies from companies like Google Pay, BMW, and Alibaba.

Instead of writing one app in Kotlin/Java for Android and another completely separate app in Swift for iPhone, you write your app once in Flutter using the **Dart** programming language. Check out the [Dart Official Portal](https://dart.dev) to see how Dart compiles to blazing-fast native machine code.

Unlike older hybrid tools (like Cordova or early React Native) which communicate through a slow "bridge" or render HTML inside a web view, Flutter comes with its own high-performance graphics engine (Impeller / Skia). Flutter literally draws every button, pixel, and animation directly onto a canvas at 60 or 120 frames per second.`,
    analogy: `Imagine you want to paint a beautiful portrait in two different cities: New York and Tokyo.

- **Old Cross-Platform Way:** You hire a translator in each city. You shout instructions through a telephone, the translator converts your words, and local contractors try their best to draw it. Things get lost in translation and it is slow.
- **The Flutter Way:** You bring your own master painter and your own box of paints (Flutter's Impeller rendering engine). You paint the exact same stunning masterpiece directly on both walls with lightning speed.`,
    codeSnippet: `// A complete, working, minimal Flutter app in Dart!
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Hello Flutter World!',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    ),
  );
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My First Flutter App'),
          backgroundColor: Colors.blue,
        ),
        body: const Center(
          child: Text(
            'Hello, Future Flutter Engineer! 🚀',
            style: TextStyle(fontSize: 22, color: Colors.blueAccent),
          ),
        ),
      ),
    ),
  );
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'import package:flutter/material.dart',
        description: 'Brings in Google Material Design widgets like buttons, toolbars, fonts, and themes so you do not have to build them from scratch.'
      },
      {
        step: 2,
        title: 'void main() { runApp(...); }',
        description: 'Every Dart program starts at main(). The runApp function takes your top-level widget and attaches it to the device screen.'
      },
      {
        step: 3,
        title: 'MaterialApp and Scaffold',
        description: 'MaterialApp sets up routing and theme. Scaffold provides the standard visual layout structure: top bar, background color, and body.'
      },
      {
        step: 4,
        title: 'Center and Text widgets',
        description: 'Center positions its child in the exact middle of the screen. Text draws the characters with custom size and styling.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Thinking Flutter is a programming language.',
        fix: 'Flutter is the UI framework (the toolkit of widgets and engine). Dart is the programming language you use to write Flutter apps.',
        why: 'In job interviews and written exams, confusing the two shows a lack of foundational clarity.'
      },
      {
        mistake: 'Assuming Flutter converts code into native Android XML layouts.',
        fix: 'Flutter does NOT create Android XML Views or iOS UIViews. It draws directly to the screen via GPU hardware rendering (Impeller).',
        why: 'This is why Flutter apps look and behave identically across Android and iOS versions.'
      }
    ],
    examAlerts: [
      'Exam Alert: You may be asked: "What is the difference between Flutter and Dart?" — Answer: Dart is the object-oriented, strongly-typed programming language; Flutter is Google\'s UI framework/SDK that provides widgets, rendering engine, and tooling.',
      'Exam Alert: "Does Flutter use a JavaScript bridge like React Native?" — Answer: No! Flutter compiles ahead-of-time (AOT) to native machine ARM/x86 code, eliminating runtime bridge overhead.'
    ],
    practiceTask: {
      task: 'Open the DartPad above. Change the text to say: "Welcome [Your Name] to Flutter Course!" and change the background color of the AppBar to Colors.deepPurple.',
      hint: 'Look for backgroundColor: Colors.blue inside AppBar and replace Colors.blue with Colors.deepPurple.',
      solution: `import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My First Flutter App'),
          backgroundColor: Colors.deepPurple,
        ),
        body: const Center(
          child: Text(
            'Welcome Alex to Flutter Course! 🚀',
            style: TextStyle(fontSize: 22, color: Colors.deepPurple),
          ),
        ),
      ),
    ),
  );
}`
    },
    quiz: [
      {
        id: 'q0-1-1',
        question: 'What is Dart in relation to Flutter?',
        options: [
          'A database engine used by Google Cloud',
          'The programming language used to code Flutter applications',
          'An Android emulator for Windows',
          'A CSS preprocessor for mobile design'
        ],
        correctIndex: 1,
        explanation: 'Dart is the client-optimized programming language created by Google that powers Flutter apps.'
      },
      {
        id: 'q0-1-2',
        question: 'How does Flutter render its UI onto mobile screens?',
        options: [
          'It translates Flutter code into HTML5 and embeds a hidden WebView',
          'It compiles to native Android XML and iOS Storyboards',
          'It renders every pixel directly onto a Skia or Impeller graphics canvas',
          'It relies on a JavaScript bridge to talk to native OEM widgets'
        ],
        correctIndex: 2,
        explanation: 'Flutter uses its own rendering engine (Impeller/Skia) to paint pixels directly on the screen at high refresh rates without OEM widget wrappers.'
      },
      {
        id: 'q0-1-3',
        question: 'Which function is the starting entry point of every Dart and Flutter application?',
        options: ['startApp()', 'run()', 'main()', 'init()'],
        correctIndex: 2,
        explanation: 'The entry point for any Dart application is always the void main() function.'
      },
      {
        id: 'q0-1-4',
        question: 'Why do companies prefer Flutter over building separate native apps?',
        options: [
          'It requires maintaining only one single codebase for iOS and Android',
          'Faster development speed and unified design across platforms',
          'Lower overall development and maintenance costs',
          'All of the above'
        ],
        correctIndex: 3,
        explanation: 'Flutter provides a single codebase, high performance, consistent UI, and faster time-to-market.'
      },
      {
        id: 'q0-1-5',
        question: 'What is the role of MaterialApp in a Flutter application?',
        options: [
          'It installs dependencies from pub.dev',
          'It provides root-level Material styling, theme configuration, and navigation',
          'It acts as the SQLite database connection',
          'It compiles Dart code to bytecode'
        ],
        correctIndex: 1,
        explanation: 'MaterialApp sets up the core app foundation including Material design guidelines, navigator, and theme system.'
      }
    ]
  },
  {
    id: 'm0-l2',
    moduleId: 'module-0',
    title: 'Installing Flutter SDK, VS Code & Android Studio',
    description: 'Set up your development machine cleanly on Windows, Mac, or Linux. Configure PATH, install Android Studio & VS Code, and master flutter doctor diagnostics.',
    order: 2,
    durationMinutes: 15,
    difficulty: 'Beginner',
    prerequisites: ['Basic familiarity with downloading files on your computer.'],
    lastVerified: 'November 2026',
    goal: 'Install Flutter SDK, configure command line PATH, accept Android licenses, set up an emulator or physical device, and achieve an all-green flutter doctor.',
    simpleExplanation: `To develop Flutter apps, your computer needs four primary tools:

1. **The Flutter SDK:** Download directly from the [Official Flutter Installation Guide](https://docs.flutter.dev/get-started/install). It contains the Dart compiler, Flutter command-line tools, and framework libraries.
2. **An Editor:** [Visual Studio Code](https://code.visualstudio.com/) (lightweight and super fast) with the [Official Flutter Extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter), or [Android Studio](https://developer.android.com/studio) (rich Android tooling). Both are 100% free.
3. **Android Studio & Command Line Tools:** Download from the [Android Developers Portal](https://developer.android.com/studio). Required to compile Android APKs, supply Android SDKs, and run the Android Emulator.
4. **Git Version Control:** Download from the [Official Git SCM Site](https://git-scm.com/downloads) so Flutter can automatically download dependencies and manage SDK upgrades.

Once installed, running \`flutter doctor\` in your terminal acts like a medical health checkup for your machine, pointing out exactly what is missing and how to fix it with step-by-step instructions. For troubleshooting tips, consult the [Flutter CLI Doctor Reference](https://docs.flutter.dev/reference/flutter-cli#flutter-doctor).`,
    analogy: `Think of setting up your development environment like setting up a carpenter's workshop:
- **Flutter SDK** is your workbench and raw power tools.
- **VS Code** is your drafting desk where you draw the blueprints.
- **Android Studio & Emulator** is the test room where you test your finished furniture to make sure it will fit inside a real house before delivering it to a client.`,
    codeSnippet: `# 1. Check your Flutter setup health
flutter doctor

# 2. Accept Android SDK licenses if flagged
flutter doctor --android-licenses

# 3. Create your first project via CLI
flutter create my_awesome_app

# 4. Open the project in VS Code
cd my_awesome_app
code .

# 5. Run the app on your connected device or emulator
flutter run`,
    walkthroughSteps: [
      {
        step: 1,
        title: 'Download and Extract Flutter SDK',
        description: 'Download the official stable release from the [Flutter Installation Docs](https://docs.flutter.dev/get-started/install) for Windows, macOS, or Linux. Never extract inside C:\\Program Files due to admin permission blocks.'
      },
      {
        step: 2,
        title: 'Add Flutter to Environment PATH',
        description: 'Add the flutter/bin folder to your user system PATH variable so running flutter from any terminal window is recognized.'
      },
      {
        step: 3,
        title: 'Install Android Studio & SDK Command-line Tools',
        description: 'Download [Android Studio](https://developer.android.com/studio) > open SDK Manager > SDK Tools tab > check "Android SDK Command-line Tools (latest)" and click Apply.'
      },
      {
        step: 4,
        title: 'Accept Android Licenses',
        description: 'Run flutter doctor --android-licenses in terminal and type "y" to accept each license agreement.'
      },
      {
        step: 5,
        title: 'Install VS Code Extensions',
        description: 'In [Visual Studio Code](https://code.visualstudio.com/), install both the [Official Flutter Extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) and Dart extensions.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Command "flutter" not found after installation.',
        fix: 'The flutter/bin directory was not added to your system PATH or you did not restart your terminal after updating PATH.',
        why: 'Terminals load environment variables only upon opening a new session.'
      },
      {
        mistake: 'Missing "Android SDK Command-line Tools".',
        fix: 'In Android Studio, navigate to SDK Manager -> SDK Tools tab -> check Android SDK Command-line Tools (latest) -> Click Apply.',
        why: 'Flutter needs these CLI tools to inspect installed Android platforms and build gradle scripts.'
      }
    ],
    examAlerts: [
      'Exam Alert: What command checks the status of your Flutter installation and dependencies? Answer: "flutter doctor".',
      'Exam Alert: How do you accept all Android licenses required by the SDK? Answer: "flutter doctor --android-licenses".'
    ],
    practiceTask: {
      task: 'Open your terminal (Command Prompt, PowerShell, or macOS Terminal) and run "flutter --version" and "flutter doctor". Read every line of the output.',
      hint: 'If you see an exclamation mark next to Android toolchain, run flutter doctor --android-licenses and press "y" to accept all.',
      solution: `Output should display:
Flutter 3.x.x • channel stable
Tools • Dart 3.x.x • DevTools 2.x.x
[✓] Flutter (Channel stable, 3.x.x)
[✓] Android toolchain - develop for Android devices
[✓] VS Code (version 1.x.x)
[✓] Connected device (1 available)
• No issues found!`
    },
    quiz: [
      {
        id: 'q0-2-1',
        question: 'Which CLI command verifies your Flutter installation and lists missing components?',
        options: ['flutter test', 'flutter check', 'flutter doctor', 'flutter status'],
        correctIndex: 2,
        explanation: 'flutter doctor inspects your local environment, SDKs, simulators, and IDE plugins, reporting actionable diagnostics.'
      },
      {
        id: 'q0-2-2',
        question: 'If flutter doctor warns about unaccepted Android licenses, what command resolves it?',
        options: [
          'flutter doctor --android-licenses',
          'flutter fix --all',
          'flutter install --licenses',
          'flutter clean'
        ],
        correctIndex: 0,
        explanation: 'flutter doctor --android-licenses prompts you through reviewing and accepting Android SDK licensing terms.'
      },
      {
        id: 'q0-2-3',
        question: 'What is the purpose of adding flutter/bin to your system PATH environment variable?',
        options: [
          'To download Flutter faster',
          'To run flutter and dart commands from any terminal or command prompt directory',
          'To increase emulator RAM',
          'To auto-compile code on save'
        ],
        correctIndex: 1,
        explanation: 'Adding the bin directory to PATH enables the operating system to find and execute the flutter executable from anywhere.'
      },
      {
        id: 'q0-2-4',
        question: 'Which two extensions should you always install in Visual Studio Code for Flutter development?',
        options: [
          'Python and C++',
          'Flutter and Dart',
          'React Native and TypeScript',
          'Kotlin and Gradle'
        ],
        correctIndex: 1,
        explanation: 'The official Flutter and Dart extensions provide code completion, debugging, hot reload, and widget refactoring tools in VS Code.'
      },
      {
        id: 'q0-2-5',
        question: 'What command creates a brand new Flutter project named "student_app"?',
        options: [
          'flutter init student_app',
          'flutter new student_app',
          'flutter create student_app',
          'dart create student_app'
        ],
        correctIndex: 2,
        explanation: 'flutter create <project_name> sets up a complete new Flutter project skeleton.'
      }
    ]
  },
  {
    id: 'm0-l3',
    moduleId: 'module-0',
    title: 'Your First App & Project Folder Structure',
    description: 'Learn what every folder and file in a Flutter project does: lib/, pubspec.yaml, android/, ios/, and build/. Understand why 99% of your code lives in lib/.',
    order: 3,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['Module 0 Lesson 2: Installed Flutter and IDE.'],
    lastVerified: 'November 2026',
    goal: 'Understand the directory structure of a Flutter project and know exactly where your code, images, dependencies, and native configs belong.',
    simpleExplanation: `When you run \`flutter create my_app\`, Flutter generates a complete folder structure. Here are the most important parts:

- **\`lib/\` (Library):** The heart of your application! 99% of your time will be spent here. The entry file is \`lib/main.dart\`.
- **\`pubspec.yaml\`:** The project configuration file. This is where you declare app metadata, version numbers, third-party packages from the [Official pub.dev Package Registry](https://pub.dev/) (like icons, HTTP, Firebase), and asset files (images, custom fonts). Consult the [Flutter Package Dependencies Guide](https://docs.flutter.dev/packages-and-plugins/using-packages) for best practices.
- **\`android/\`:** Contains a complete native Android Gradle project. You only touch this when configuring Android permissions (in AndroidManifest.xml), minSdk, or native plugins.
- **\`ios/\`:** Contains a complete native iOS Xcode workspace.
- **\`build/\`:** Contains the compiled outputs, APKs, and intermediate files. You never touch this directly (it is safe to delete with \`flutter clean\`).
- **\`test/\`:** Contains unit, widget, and integration tests.`,
    analogy: `Think of a Flutter project like a restaurant:
- **\`lib/\`** is the main kitchen where the chef cooks the dishes (your Dart code).
- **\`pubspec.yaml\`** is the pantry order manifest where you list all spices, ingredients, and menu details you purchase from suppliers.
- **\`android/\` and \`ios/\`** are the delivery scooters customized for different street laws (Android vs Apple).
- **\`build/\`** is the garbage bin and takeout packing area that gets cleaned up at the end of the shift.`,
    codeSnippet: `# Typical pubspec.yaml structure
name: student_tracker
description: "A student details tracking app."
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  # Third-party packages from pub.dev are added here:
  http: ^1.2.0
  shared_preferences: ^2.2.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true

  # Asset declarations:
  assets:
    - assets/images/logo.png
    - assets/icons/`,
    walkthroughSteps: [
      {
        step: 1,
        title: 'Open lib/main.dart',
        description: 'Locate the main() function and the MyApp widget class. This is where execution begins.'
      },
      {
        step: 2,
        title: 'Inspect pubspec.yaml indentation',
        description: 'YAML files strictly rely on 2-space indentation. Never use tabs in pubspec.yaml, or it will fail to parse!'
      },
      {
        step: 3,
        title: 'Running flutter pub get',
        description: 'Whenever you add a new library or asset to pubspec.yaml, flutter pub get downloads and links the packages.'
      },
      {
        step: 4,
        title: 'Notice .gitignore',
        description: 'Git tracks lib/ and pubspec.yaml, but automatically ignores .dart_tool/ and build/ folders.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using tabs instead of 2 spaces in pubspec.yaml.',
        fix: 'Always use exactly 2 spaces for nested keys in YAML files. VS Code will highlight YAML syntax errors.',
        why: 'YAML specification forbids tabs for indentation.'
      },
      {
        mistake: 'Putting images on disk without declaring them under "assets:" in pubspec.yaml.',
        fix: 'Every image asset must be placed in an assets/ folder AND declared under flutter: -> assets: in pubspec.yaml.',
        why: 'Flutter bundles assets into the binary only if explicitly listed in pubspec.yaml.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which file is used to manage third-party dependencies and assets in a Flutter project?" — Answer: pubspec.yaml.',
      'Exam Alert: "Where is the entry point file of a Flutter app located by default?" — Answer: lib/main.dart.'
    ],
    practiceTask: {
      task: 'Inspect the pubspec.yaml example above. If you wanted to add the official "google_fonts" package at version 6.1.0, under which section would you add it?',
      hint: 'It is a runtime dependency for your UI, not just a testing library.',
      solution: `dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.1.0`
    },
    quiz: [
      {
        id: 'q0-3-1',
        question: 'In which folder does 99% of your application Dart code live?',
        options: ['android/', 'build/', 'lib/', 'assets/'],
        correctIndex: 2,
        explanation: 'The lib/ folder contains all your Dart source code and the main.dart entry point.'
      },
      {
        id: 'q0-3-2',
        question: 'What is pubspec.yaml used for in a Flutter application?',
        options: [
          'Configuring app dependencies, assets, fonts, and SDK constraints',
          'Writing native Kotlin code for Android',
          'Storing user database records',
          'Compiling CSS into Tailwind'
        ],
        correctIndex: 0,
        explanation: 'pubspec.yaml is Flutter\'s project manifest file declaring dependencies, assets, and project versioning.'
      },
      {
        id: 'q0-3-3',
        question: 'What happens if you use TAB characters for indentation in pubspec.yaml?',
        options: [
          'It auto-converts to spaces silently',
          'It throws a YAML parsing syntax error and fails to load dependencies',
          'It makes the app run faster',
          'Nothing, tabs are preferred'
        ],
        correctIndex: 1,
        explanation: 'YAML strictly disallows tabs; it requires consistent spaces for indentation.'
      },
      {
        id: 'q0-3-4',
        question: 'Which command downloads all packages declared in pubspec.yaml?',
        options: ['npm install', 'flutter pub get', 'dart build', 'flutter pull'],
        correctIndex: 1,
        explanation: 'flutter pub get fetches the packages specified in pubspec.yaml from pub.dev and generates pubspec.lock.'
      },
      {
        id: 'q0-3-5',
        question: 'Is it safe to delete the "build/" directory in a Flutter project?',
        options: [
          'No, you will lose your source code',
          'Yes, it is generated at compile time and will regenerate on the next build (via flutter clean)',
          'No, it contains your database',
          'Only on Linux machines'
        ],
        correctIndex: 1,
        explanation: 'The build/ directory contains intermediate build artifacts and can be safely cleared with "flutter clean".'
      }
    ]
  },
  {
    id: 'm0-l4',
    moduleId: 'module-0',
    title: 'Hot Reload vs Hot Restart, Debugging & DevTools',
    description: 'Learn Flutter superpower: sub-second Hot Reload! Master the critical differences between Hot Reload and Hot Restart, and use Flutter DevTools.',
    order: 4,
    durationMinutes: 10,
    difficulty: 'Beginner',
    prerequisites: ['Module 0 Lesson 3: Project Structure.'],
    lastVerified: 'November 2026',
    goal: 'Understand how Hot Reload injects updated code without losing state, when you must use Hot Restart or full Rebuild, and how to debug issues.',
    simpleExplanation: `One of Flutter's greatest superpowers is **Stateful Hot Reload**. Learn more in the [Official Flutter Hot Reload Guide](https://docs.flutter.dev/tools/hot-reload).

- **Hot Reload (Press 'r' in terminal or Save in VS Code):**
  Takes updated code, sends it to the running Dart Virtual Machine, and rebuilds the widget tree in **under 1 second**. It **PRESERVES** your app state! For example, if you typed text into a form or scrolled down a list, your text and scroll position remain completely intact.
- **Hot Restart (Press 'R' in terminal):**
  Destroys the current state, restarts the Dart VM, re-runs \`main()\`, and reinitializes state from scratch. It takes about 2 to 3 seconds.
- **Full Rebuild / Stop & Run:**
  Required when changing native code in \`android/\` or \`ios/\`, or adding native plugins/assets in \`pubspec.yaml\`.
- **Flutter DevTools:**
  Open Google's [Official Flutter DevTools Suite](https://docs.flutter.dev/tools/devtools) to inspect widget layouts in real-time, profile memory leaks, and track 60/120 FPS performance.`,
    analogy: `Imagine you are decorating a living room:
- **Hot Reload** is changing the painting on the wall or changing the cushion covers while your guests are sitting on the couch. Nobody gets kicked out, the conversation keeps going.
- **Hot Restart** is asking all the guests to step outside, locking the door, resetting the clock to 6:00 PM, and welcoming everyone back inside.
- **Full Rebuild** is tearing down the house and laying new concrete foundations.`,
    codeSnippet: `// Example illustrating Hot Reload vs Hot Restart:
int counter = 0; // If you change this initial value to 10...

// 1. Hot Reload: 
// The on-screen counter remains whatever number it was (e.g. 5) 
// because state is PRESERVED!

// 2. Hot Restart:
// The counter resets to 10 because main() and initState() are re-run!`,
    walkthroughSteps: [
      {
        step: 1,
        title: 'Save your file (Ctrl+S / Cmd+S)',
        description: 'In VS Code with the Flutter extension, saving a Dart file automatically triggers a Hot Reload.'
      },
      {
        step: 2,
        title: 'Check the Debug Console',
        description: 'You will see: "Reloaded 1 of 628 libraries in 241ms". The screen updates instantly.'
      },
      {
        step: 3,
        title: 'When to use Hot Restart (Shift+Cmd+F5 / Press R)',
        description: 'Use Hot Restart when modifying global variables, static fields, or initState() methods.'
      },
      {
        step: 4,
        title: 'Open Flutter DevTools',
        description: 'Click the Flutter DevTools icon in VS Code to inspect widget layout bounds, detect slow frames, and inspect network requests.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Expecting changes inside initState() to show up with Hot Reload.',
        fix: 'initState() runs only once when a widget is first created. When you change initState(), you MUST perform a Hot Restart.',
        why: 'Hot Reload only re-executes the build() method, not initState().'
      },
      {
        mistake: 'Adding a new plugin in pubspec.yaml and just hitting Hot Reload.',
        fix: 'Adding a plugin with native Android/iOS code requires stopping the app and running flutter run again.',
        why: 'Native Gradle or CocoaPods binaries must be compiled into the APK/app bundle.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between Hot Reload and Hot Restart?" — Answer: Hot Reload injects updated code into the running Dart VM and re-executes build() while preserving app state (takes < 1s). Hot Restart restarts the app from main(), re-initializing all state (takes 2-3s).',
      'Exam Alert: "Does Hot Reload re-run initState()?" — Answer: No, initState() is only called once when the state object is created.'
    ],
    practiceTask: {
      task: 'Suppose you have a counter variable starting at 0, you click a button to increment it to 7, and then you change the button color from Blue to Red in your code. What will happen to the number 7 if you trigger a Hot Reload vs a Hot Restart?',
      hint: 'Remember which one preserves state and which one resets state to main().',
      solution: `- With Hot Reload: The button turns Red, and the counter stays at 7 (state preserved).
- With Hot Restart: The button turns Red, but the counter resets to 0 (state re-initialized).`
    },
    quiz: [
      {
        id: 'q0-4-1',
        question: 'What happens to the existing app state during a Hot Reload?',
        options: [
          'It is wiped and cleared',
          'It is completely preserved',
          'It is saved to SQLite',
          'It throws an exception'
        ],
        correctIndex: 1,
        explanation: 'Stateful Hot Reload injects new code and calls build() without destroying or resetting existing widget state.'
      },
      {
        id: 'q0-4-2',
        question: 'Which method in a StatefulWidget is NOT re-executed during a Hot Reload?',
        options: ['build()', 'initState()', 'didUpdateWidget()', 'None of the above'],
        correctIndex: 1,
        explanation: 'initState() runs only once when a State object is inserted into the tree; Hot Reload does not re-run initState().'
      },
      {
        id: 'q0-4-3',
        question: 'When must you completely stop and re-run (full rebuild) your Flutter app?',
        options: [
          'Whenever you change a Text color',
          'When you change native Android Java/Kotlin code, AndroidManifest, or add native plugins',
          'Whenever you add a new Column widget',
          'Every time you save a Dart file'
        ],
        correctIndex: 1,
        explanation: 'Native code changes (Gradle, Kotlin/Java, native Android permissions) cannot be injected into the running Dart VM; a full compile is required.'
      },
      {
        id: 'q0-4-4',
        question: 'What tool allows you to visually inspect widget layout boundaries and profile frame rendering times?',
        options: ['Chrome DevTools for HTML', 'Flutter DevTools (Widget Inspector)', 'Android Logcat only', 'Postman'],
        correctIndex: 1,
        explanation: 'Flutter DevTools includes the Widget Inspector, Memory Profiler, Network Monitor, and CPU Performance view.'
      },
      {
        id: 'q0-4-5',
        question: 'What is the shortcut key in the terminal running flutter run to trigger a Hot Restart?',
        options: ['Press lower-case "r"', 'Press upper-case "R"', 'Press "q"', 'Press "c"'],
        correctIndex: 1,
        explanation: 'In the terminal, typing "r" initiates a Hot Reload, while typing "R" initiates a Hot Restart.'
      }
    ]
  },
  {
    id: 'm0-l5',
    moduleId: 'module-0',
    title: 'Git and GitHub Basics for Beginners',
    description: 'Learn version control essentials every software engineer needs: git init, add, commit, push, branch, pull requests, and ignoring sensitive files.',
    order: 5,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['None.'],
    lastVerified: 'November 2026',
    goal: 'Understand why version control is mandatory in software engineering, learn the essential 5 Git commands, and push your Flutter code safely to GitHub.',
    simpleExplanation: `**Git** is a tool that tracks the history of changes made to your files over time. It allows you to take "snapshots" (commits) of your project. If you make a mistake, you can rewind back in time. Learn more in the [Official Git Documentation](https://git-scm.com/doc).

**GitHub** is a cloud hosting service for your Git repositories. It lets you back up your code, collaborate with teammates, and deploy automated test pipelines. Check out the [GitHub Official Quickstart Guide](https://docs.github.com/en/get-started/quickstart) to create your free account.

In a Flutter project, you should always have a \`.gitignore\` file. This prevents committing huge generated folders like \`build/\`, temporary cache files like \`.dart_tool/\`, or sensitive API keys. Use the [Official Flutter gitignore template](https://github.com/flutter/flutter/blob/master/.gitignore) as reference.`,
    analogy: `Think of Git like a video game save system:
- **Working Directory:** You are playing through a dangerous level.
- **\`git add\`:** You decide to stand at the save point.
- **\`git commit\`:** You press "Save Game" and write a description: "Defeated Level 2 Boss".
- **\`git push\`:** You upload your save file to the cloud (GitHub) so you never lose your progress if your computer crashes.`,
    codeSnippet: `# Essential Git Commands for Every Project:

# 1. Initialize git in your project
git init

# 2. Stage all your changes
git add .

# 3. Create a checkpoint with a meaningful message
git commit -m "feat: setup student details form UI"

# 4. Link your local project to your GitHub repository
git remote add origin https://github.com/Username/my-repo.git

# 5. Push your code to GitHub
git branch -M main
git push -u origin main`,
    walkthroughSteps: [
      {
        step: 1,
        title: 'Check git status',
        description: 'Run git status to see which files have been modified or staged for commit.'
      },
      {
        step: 2,
        title: 'Write descriptive commit messages',
        description: 'Follow conventions like "feat: add form validation" or "fix: resolve dropdown overflow error".'
      },
      {
        step: 3,
        title: 'Never commit secrets',
        description: 'Keep API keys, keystore passwords, and Firebase google-services.json out of public GitHub repositories.'
      },
      {
        step: 4,
        title: 'Branches for features',
        description: 'Use git checkout -b feature/auth to work on new features without breaking the working main branch.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Committing the build/ or .dart_tool/ folder to GitHub.',
        fix: 'Ensure your .gitignore includes /build and /.dart_tool before running git add .',
        why: 'Build folders contain gigabytes of platform-specific binary caches that should never be pushed to version control.'
      },
      {
        mistake: 'Vague commit messages like "update", "fixed", or "asdf".',
        fix: 'Write meaningful messages explaining WHAT changed and WHY, e.g., "fix: student grade calculation logic for marks 80 to 90".',
        why: 'In professional teams and code reviews, clear history is crucial for debugging regressions.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which file prevents specific files or folders from being tracked by Git?" — Answer: .gitignore.',
      'Exam Alert: "What command creates a new branch and switches to it simultaneously?" — Answer: git checkout -b <branch_name> (or git switch -c <branch_name>).'
    ],
    practiceTask: {
      task: 'Look at the following files in a Flutter project: (a) lib/main.dart, (b) pubspec.yaml, (c) build/app/outputs/flutter-apk/app-release.apk, (d) README.md. Which of these should be tracked by Git, and which should be ignored?',
      hint: 'Think about which files are written by you vs generated by the compiler.',
      solution: `- Tracked by Git: lib/main.dart, pubspec.yaml, README.md (source code & configuration).
- Ignored by Git: build/app/outputs/flutter-apk/app-release.apk (compiled binary output that belongs in .gitignore).`
    },
    quiz: [
      {
        id: 'q0-5-1',
        question: 'What is the purpose of the .gitignore file in a project?',
        options: [
          'It deletes files from your computer',
          'It tells Git which files and folders to ignore and avoid committing',
          'It speeds up your internet connection',
          'It hides Dart code from the browser'
        ],
        correctIndex: 1,
        explanation: '.gitignore specifies intentionally untracked files that Git should ignore, such as build outputs and local configuration.'
      },
      {
        id: 'q0-5-2',
        question: 'Which command stages all modified and newly created files for the next commit?',
        options: ['git push all', 'git stage now', 'git add .', 'git commit -a'],
        correctIndex: 2,
        explanation: 'git add . stages all changes in the current directory and subdirectories.'
      },
      {
        id: 'q0-5-3',
        question: 'What does a commit represent in Git?',
        options: [
          'A permanent snapshot of your staged changes at a specific point in time',
          'A request to merge two branches',
          'A download from GitHub',
          'A temporary scratchpad that disappears on reboot'
        ],
        correctIndex: 0,
        explanation: 'A commit records a snapshot of your staged files along with a commit message and metadata.'
      },
      {
        id: 'q0-5-4',
        question: 'Which command uploads your committed local changes to the remote repository on GitHub?',
        options: ['git fetch', 'git pull', 'git push', 'git upload'],
        correctIndex: 2,
        explanation: 'git push transmits your local commits to the designated remote repository (e.g. origin main).'
      },
      {
        id: 'q0-5-5',
        question: 'Why should the "build/" folder in Flutter never be committed to GitHub?',
        options: [
          'It is illegal to upload it',
          'It contains platform-dependent compiled binaries and caches that take up hundreds of megabytes and can be rebuilt anytime',
          'It would cause Dart to stop working',
          'GitHub does not support folders named build'
        ],
        correctIndex: 1,
        explanation: 'Build folders contain large generated binaries that differ by machine and OS; they should always remain in .gitignore.'
      }
    ]
  }
];

