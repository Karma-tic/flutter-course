import { Lesson } from '../../types';

export const module7Lessons: Lesson[] = [
  {
    id: 'm7-l1',
    moduleId: 'module-7',
    title: 'Activity Lifecycle vs Flutter StatefulWidget & WidgetsBindingObserver',
    description: 'Exam Critical: Compare the 6 native Android Activity lifecycle callbacks (onCreate, onStart, onResume, onPause, onStop, onDestroy) with Flutter StatefulWidget (initState, didChangeDependencies, dispose) and AppLifecycleState.',
    order: 1,
    durationMinutes: 18,
    difficulty: 'Intermediate',
    prerequisites: ['Module 2: Flutter UI Basics'],
    lastVerified: 'November 2026',
    goal: 'Master Android Activity lifecycle callbacks in Kotlin, compare them directly to Flutter StatefulWidget lifecycle, and listen to system app pauses using WidgetsBindingObserver.',
    simpleExplanation: `In native Android, an **Activity** represents a single screen that a user interacts with. Its lifecycle is managed strictly by the Android operating system. Refer to the official [Android Activity Lifecycle Guide](https://developer.android.com/guide/components/activities/activity-lifecycle) and Flutter's [WidgetsBindingObserver API](https://api.flutter.dev/flutter/widgets/WidgetsBindingObserver-class.html).

### (a) Native Android Activity Lifecycle (Kotlin)
An Activity goes through 6 primary lifecycle stages:
1. **\`onCreate()\`**: Activity is first initialized; views are inflated via \`setContentView(R.layout.activity_main)\`.
2. **\`onStart()\`**: Activity becomes visible on screen to the user.
3. **\`onResume()\`**: Activity enters the foreground and receives user input/touch events.
4. **\`onPause()\`**: Another activity is coming into the foreground (partially obscured or screen turning off). Save transient data here!
5. **\`onStop()\`**: Activity is no longer visible to the user.
6. **\`onDestroy()\`**: Activity is destroyed and removed from memory.

\`\`\`kotlin
// Native Android (MainActivity.kt)
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d("Lifecycle", "onCreate called")
    }

    override fun onResume() {
        super.onResume()
        Log.d("Lifecycle", "onResume: user interacting with screen")
    }

    override fun onPause() {
        super.onPause()
        Log.d("Lifecycle", "onPause: app going into background")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("Lifecycle", "onDestroy: cleaning up resources")
    }
}
\`\`\`

---

### (b) The Flutter StatefulWidget Equivalent
In Flutter, individual screens are widgets with their own lifecycle:
1. **\`createState()\`**: Creates the mutable State instance.
2. **\`initState()\`** *(matches onCreate)*: Called once when widget is inserted into tree. Initialize controllers and listeners here!
3. **\`didChangeDependencies()\`**: Called when InheritedWidget dependencies change.
4. **\`build()\`**: Renders the UI widgets on the canvas.
5. **\`dispose()\`** *(matches onDestroy)*: Called when widget is permanently removed. Cancel subscriptions and dispose controllers!

### (c) App-Level Lifecycle (\`WidgetsBindingObserver\`)
To detect when the entire Flutter app is minimized (matches Android \`onPause\` / \`onStop\`), Flutter provides **\`WidgetsBindingObserver\`** and **\`AppLifecycleState\`**:
- \`AppLifecycleState.resumed\`: App is visible and responding to user input (Android onResume).
- \`AppLifecycleState.inactive\`: App is in an inactive state (e.g. phone call received).
- \`AppLifecycleState.paused\`: App is hidden in the background (Android onStop / onPause).
- \`AppLifecycleState.detached\`: Flutter engine is running but detached from any host view.`,
    analogy: `Think of an actor in a theatre play:
- **onCreate / initState:** The actor puts on their costume and makeup in the dressing room.
- **onStart:** The curtains open and the audience can see the actor standing on stage.
- **onResume:** The actor starts speaking and interacting with the other actors.
- **onPause:** Another actor interrupts or a loud bell rings; the actor pauses their line.
- **onStop:** The curtains close for intermission.
- **onDestroy / dispose:** The show ends, the actor takes off the costume, wipes off the makeup, and heads home!`,
    codeSnippet: `import 'package:flutter/material.dart';

// Complete Flutter Example listening to OS AppLifecycleState
class LifecycleWatcherScreen extends StatefulWidget {
  const LifecycleWatcherScreen({super.key});

  @override
  State<LifecycleWatcherScreen> createState() => _LifecycleWatcherScreenState();
}

class _LifecycleWatcherScreenState extends State<LifecycleWatcherScreen>
    with WidgetsBindingObserver {
  AppLifecycleState _lastLifecycleState = AppLifecycleState.resumed;

  // 1. Flutter equivalent of Android onCreate()
  @override
  void initState() {
    super.initState();
    // Register this state as a system lifecycle observer
    WidgetsBinding.instance.addObserver(this);
    print('initState: Widget created & observer registered');
  }

  // 2. Flutter listener matching Android onResume / onPause / onStop
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecycleState = state;
    });

    switch (state) {
      case AppLifecycleState.resumed:
        print('Android onResume equivalent: App in foreground');
        break;
      case AppLifecycleState.inactive:
        print('Android transition: Incoming call or split screen');
        break;
      case AppLifecycleState.paused:
        print('Android onPause/onStop equivalent: App in background');
        break;
      case AppLifecycleState.detached:
        print('Android onDestroy equivalent: Engine detached');
        break;
      case AppLifecycleState.hidden:
        print('App window hidden');
        break;
    }
  }

  // 3. Flutter equivalent of Android onDestroy()
  @override
  void dispose() {
    // Unregister observer to avoid memory leaks
    WidgetsBinding.instance.removeObserver(this);
    print('dispose: Widget destroyed & observer unregistered');
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Activity Lifecycle Demo')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.sync_alt, size: 64, color: Colors.blue),
            const SizedBox(height: 16),
            Text(
              'Current OS State: \${_lastLifecycleState.name.toUpperCase()}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text('Minimize app or switch apps to see lifecycle updates!'),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Lifecycle callback sequence mental model:
void main() {
  print('1. onCreate() / initState() -> Initialized');
  print('2. onStart() -> Visible');
  print('3. onResume() -> User interacting (active)');
  print('4. onPause() -> Losing focus');
  print('5. onStop() -> Hidden in background');
  print('6. onDestroy() / dispose() -> Destroyed & memory freed');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Add WidgetsBindingObserver mixin',
        description: 'Add "with WidgetsBindingObserver" to your State class.'
      },
      {
        step: 2,
        title: 'Register in initState()',
        description: 'Call WidgetsBinding.instance.addObserver(this) to start receiving system notifications.'
      },
      {
        step: 3,
        title: 'Override didChangeAppLifecycleState()',
        description: 'React to AppLifecycleState.resumed, paused, inactive, and detached.'
      },
      {
        step: 4,
        title: 'Clean up in dispose()',
        description: 'Always call WidgetsBinding.instance.removeObserver(this) to release memory.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting async calls directly inside dispose() and expecting them to complete.',
        fix: 'Cancel listeners and save state synchronously, or trigger background tasks with WorkManager.',
        why: 'dispose() executes synchronously as the widget is torn down; the State object cannot be accessed afterwards.'
      },
      {
        mistake: 'Forgetting to remove the WidgetsBindingObserver in dispose().',
        fix: 'WidgetsBinding.instance.removeObserver(this); in dispose().',
        why: 'Leaving dead observers registered causes memory leaks and ghost callback triggers.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely Common in Android Exams): "List the 6 lifecycle callbacks of an Android Activity in order." — Answer: onCreate() -> onStart() -> onResume() -> onPause() -> onStop() -> onDestroy().',
      'Exam Alert: "Which Flutter StatefulWidget method is the equivalent of Android\'s onCreate()?" — Answer: initState().',
      'Exam Alert: "Which Flutter StatefulWidget method is the equivalent of Android\'s onDestroy()?" — Answer: dispose().',
      'Exam Alert: "How do you detect when a Flutter app is paused or resumed by the Android OS?" — Answer: By implementing WidgetsBindingObserver and overriding didChangeAppLifecycleState(AppLifecycleState state).'
    ],
    practiceTask: {
      task: 'Write a quick matching table on paper matching Android: (1) onCreate, (2) onResume, (3) onDestroy with their Flutter equivalents.',
      hint: '1 -> initState, 2 -> AppLifecycleState.resumed, 3 -> dispose',
      solution: `1. Android onCreate() <---> Flutter initState() (widget level)
2. Android onResume() <---> Flutter AppLifecycleState.resumed (via WidgetsBindingObserver)
3. Android onDestroy() <---> Flutter dispose() (widget level)`
    },
    quiz: [
      {
        id: 'q7-1-1',
        question: 'What is the first lifecycle method called when an Android Activity is created?',
        options: ['onStart()', 'onCreate()', 'onResume()', 'onInit()'],
        correctIndex: 1,
        explanation: 'onCreate() is the initial entry callback of an Android Activity where views are initialized.'
      },
      {
        id: 'q7-1-2',
        question: 'Which Flutter StatefulWidget method directly corresponds to Android\'s onDestroy() for resource cleanup?',
        options: ['deactivate()', 'dispose()', 'destroy()', 'finish()'],
        correctIndex: 1,
        explanation: 'dispose() is called when a State object is permanently removed from the widget tree.'
      },
      {
        id: 'q7-1-3',
        question: 'Which mixin is used in Flutter to observe application-level OS lifecycle changes?',
        options: ['WidgetsBindingObserver', 'LifecycleListener', 'AppObserverMixin', 'ActivityBridge'],
        correctIndex: 0,
        explanation: 'WidgetsBindingObserver receives didChangeAppLifecycleState events from the operating system.'
      },
      {
        id: 'q7-1-4',
        question: 'Which Android Activity lifecycle callback is executed when an app is minimized to the background?',
        options: ['onStop() and onPause()', 'onRestart()', 'onResume()', 'onCreate()'],
        correctIndex: 0,
        explanation: 'When minimized, the activity is paused and stopped (onPause followed by onStop).'
      },
      {
        id: 'q7-1-5',
        question: 'What is the Flutter AppLifecycleState equivalent of Android\'s onResume() when the app returns to the foreground?',
        options: ['AppLifecycleState.active', 'AppLifecycleState.resumed', 'AppLifecycleState.foreground', 'AppLifecycleState.running'],
        correctIndex: 1,
        explanation: 'AppLifecycleState.resumed indicates the app is visible and responding to user interactions.'
      }
    ]
  },
  {
    id: 'm7-l2',
    moduleId: 'module-7',
    title: 'Intents (Explicit vs Implicit) vs Flutter Navigation & url_launcher',
    description: 'Exam Critical: Master Android Intents! Understand Explicit Intents (opening specific activities) vs Implicit Intents (sharing, opening browser, camera) and how they map to Flutter Navigator, url_launcher, and share_plus.',
    order: 2,
    durationMinutes: 15,
    difficulty: 'Beginner',
    prerequisites: ['Module 7 Lesson 1: Lifecycle'],
    lastVerified: 'November 2026',
    goal: 'Understand Android Intents (Explicit vs Implicit) in Kotlin, pass intent extras, and implement the Flutter equivalents using Navigator, url_launcher, and share_plus.',
    simpleExplanation: `In native Android, an **Intent** is an asynchronous messaging object used to request an action from another app component or another app entirely.

### (a) Native Android Intents (Kotlin)
There are two distinct types of Intents:

1. **Explicit Intent:**
   Specifies the exact target class to start (used for navigating between screens in your own app):
   \`\`\`kotlin
   // Kotlin Explicit Intent
   val intent = Intent(this, StudentDetailActivity::class.java)
   intent.putExtra("student_name", "Alex")
   intent.putExtra("marks", 92.5)
   startActivity(intent)
   \`\`\`

2. **Implicit Intent:**
   Does not name a specific component. Instead, it declares a general action (like \`ACTION_VIEW\`, \`ACTION_SEND\`, or \`ACTION_DIAL\`), and the Android OS finds all apps on the phone capable of handling it (e.g. Chrome, WhatsApp, Phone dialer):
   \`\`\`kotlin
   // Kotlin Implicit Intent to open a website
   val webpage = Uri.parse("https://flutter.dev")
   val intent = Intent(Intent.ACTION_VIEW, webpage)
   startActivity(intent)

   // Kotlin Implicit Intent to share text
   val shareIntent = Intent(Intent.ACTION_SEND).apply {
       type = "text/plain"
       putExtra(Intent.EXTRA_TEXT, "Alex passed with Grade A+!")
   }
   startActivity(Intent.createChooser(shareIntent, "Share via"))
   \`\`\`

---

### (b) The Flutter Equivalents:
- **Explicit Intent Equivalent:** \`Navigator.push(context, MaterialPageRoute(builder: (c) => Screen(name: "Alex", marks: 92.5)))\`. In Flutter, arguments are passed cleanly via the widget constructor!
- **Implicit Intent (Opening URLs / Phone / Email):** The official **\`url_launcher\`** package.
- **Implicit Intent (Sharing text / files):** The official **\`share_plus\`** package.`,
    analogy: `Think of mail delivery:
- **Explicit Intent:** Writing the exact street name, house number, and person's name on an envelope: "Deliver directly to Apartment 4B in this building."
- **Implicit Intent:** Shouting into the street: "Is anyone here a taxi driver? I need a ride to the airport!" Any taxi app (Uber, Lyft, local cab) can pull up and answer your request!`,
    codeSnippet: `import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:share_plus/share_plus.dart';

class IntentsComparisonDemo extends StatelessWidget {
  const IntentsComparisonDemo({super.key});

  // 1. Flutter equivalent of Android Implicit Intent: ACTION_VIEW (Open Web Browser)
  void _openWebsite() async {
    final Uri url = Uri.parse('https://flutter.dev');
    if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
      throw Exception('Could not launch \$url');
    }
  }

  // 2. Flutter equivalent of Android Implicit Intent: ACTION_DIAL (Phone Call)
  void _makePhoneCall() async {
    final Uri phoneUri = Uri.parse('tel:+1234567890');
    if (await canLaunchUrl(phoneUri)) {
      await launchUrl(phoneUri);
    }
  }

  // 3. Flutter equivalent of Android Implicit Intent: ACTION_SEND (Share Sheet)
  void _shareStudentRecord() {
    Share.share(
      'Student Report: Alex Johnson | Roll: 101 | Marks: 92.0 | Grade: A+',
      subject: 'Exam Results Announcement',
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Android Intents in Flutter')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton.icon(
              onPressed: _openWebsite,
              icon: const Icon(Icons.language),
              label: const Text('Launch URL (Implicit Intent ACTION_VIEW)'),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _makePhoneCall,
              icon: const Icon(Icons.phone),
              label: const Text('Dial Phone (Implicit Intent ACTION_DIAL)'),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _shareStudentRecord,
              icon: const Icon(Icons.share),
              label: const Text('Share Result (Implicit Intent ACTION_SEND)'),
            ),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Intent mapping mental model:
void main() {
  print('Android Explicit Intent -> Navigator.push() with constructor parameters');
  print('Android Implicit Intent (ACTION_VIEW) -> url_launcher package');
  print('Android Implicit Intent (ACTION_SEND) -> share_plus package');
  print('Android Intent Extras (putExtra) -> Constructor arguments in Flutter');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Understand Intent Extras',
        description: 'In native Android, intent.putExtra("key", value) passes data. In Flutter, constructor parameters replace intent extras.'
      },
      {
        step: 2,
        title: 'Configure Android Queries in AndroidManifest.xml',
        description: 'For url_launcher on Android 11+ (API 30+), you must declare <queries> in AndroidManifest.xml for https, tel, and mailto schemes.'
      },
      {
        step: 3,
        title: 'Use launchUrl with LaunchMode',
        description: 'LaunchMode.externalApplication opens Chrome/Safari; inAppWebView opens an embedded in-app browser.'
      },
      {
        step: 4,
        title: 'Share sheet with share_plus',
        description: 'Share.share(...) opens the native system share drawer allowing users to send text to WhatsApp, Gmail, Slack, etc.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting <queries> tags in AndroidManifest.xml on Android 11+ for url_launcher.',
        fix: 'Add <queries><intent><action android:name="android.intent.action.VIEW" /><data android:scheme="https" /></intent></queries> to AndroidManifest.xml.',
        why: 'Android 11 introduced package visibility filtering; apps cannot query external URL handlers without explicit manifest declarations.'
      },
      {
        mistake: 'Using launch() instead of launchUrl().',
        fix: 'Use launchUrl(Uri.parse(...)) from url_launcher.',
        why: 'The older launch() method is deprecated in modern url_launcher versions.'
      }
    ],
    examAlerts: [
      'Exam Alert (Very Common): "What is the difference between an Explicit Intent and an Implicit Intent in Android?" — Answer: An Explicit Intent specifies the exact target component/activity by name (e.g. Intent(this, SecondActivity::class.java)); an Implicit Intent specifies an action to perform (e.g. ACTION_VIEW, ACTION_SEND) without specifying the target class, letting the Android OS resolve capable apps.',
      'Exam Alert: "Which Flutter packages are used to achieve the functionality of Android Implicit Intents?" — Answer: url_launcher (for opening web links, dialing, and emails) and share_plus (for the native system share sheet).'
    ],
    practiceTask: {
      task: 'Write the native Kotlin code to create an Explicit Intent that opens StudentDetailsActivity and passes an extra named "roll_number" with value 101.',
      hint: 'val intent = Intent(this, StudentDetailsActivity::class.java); intent.putExtra(...); startActivity(intent);',
      solution: `val intent = Intent(this, StudentDetailsActivity::class.java)
intent.putExtra("roll_number", 101)
startActivity(intent)`
    },
    quiz: [
      {
        id: 'q7-2-1',
        question: 'What is an Explicit Intent in native Android development?',
        options: [
          'An intent that specifies the exact target activity class by name',
          'An intent that is broadcast to all apps on the phone',
          'An encrypted network request',
          'A background service'
        ],
        correctIndex: 0,
        explanation: 'Explicit Intents name the specific target component to be invoked.'
      },
      {
        id: 'q7-2-2',
        question: 'What is the Flutter equivalent of an Android Explicit Intent with extras for navigating to a new screen?',
        options: [
          'Navigator.push() passing data directly via the destination widget\'s constructor parameters',
          'SharedPreferences.setString()',
          'Native Kotlin JNI call only',
          'Flutter does not support navigation'
        ],
        correctIndex: 0,
        explanation: 'Flutter widgets pass data directly through constructor arguments when pushed with Navigator.'
      },
      {
        id: 'q7-2-3',
        question: 'Which Flutter package is used to trigger implicit actions like opening web URLs, dialing phone numbers, or sending emails?',
        options: ['url_launcher', 'web_opener', 'phone_dialer_pro', 'browser_kit'],
        correctIndex: 0,
        explanation: 'url_launcher is the standard package for handling web, tel, sms, and mailto schemas.'
      },
      {
        id: 'q7-2-4',
        question: 'Which Android Intent action constant is used to share text or files to other apps (like WhatsApp or Gmail)?',
        options: ['Intent.ACTION_VIEW', 'Intent.ACTION_SEND', 'Intent.ACTION_CALL', 'Intent.ACTION_RUN'],
        correctIndex: 1,
        explanation: 'Intent.ACTION_SEND invokes the Android share chooser sheet.'
      },
      {
        id: 'q7-2-5',
        question: 'In Android 11+ (API 30+), what must be added to AndroidManifest.xml for url_launcher to recognize installed web browsers?',
        options: ['<permission>', '<queries> declaration with intent actions/schemes', '<application-name>', '<sdk-version>'],
        correctIndex: 1,
        explanation: '<queries> elements declare package visibility requirements for intent resolution.'
      }
    ]
  },
  {
    id: 'm7-l3',
    moduleId: 'module-7',
    title: 'Android Manifest, Permissions, Gradle Files & Signing',
    description: 'Exam Critical: Android configuration masterclass! Understand AndroidManifest.xml, runtime permissions with permission_handler, build.gradle (minSdk, targetSdk, compileSdk), app icons, splash screen, and release signing.',
    order: 3,
    durationMinutes: 16,
    difficulty: 'Intermediate',
    prerequisites: ['Module 7 Lesson 2: Intents'],
    lastVerified: 'November 2026',
    goal: 'Configure AndroidManifest.xml permissions, handle runtime permissions in Flutter using permission_handler, understand Gradle SDK versions, and configure release keystore signing.',
    simpleExplanation: `Even though you write Flutter in Dart, your Android app is ultimately compiled and packaged by the Android build system.

### 1. \`AndroidManifest.xml\`
Located at \`android/app/src/main/AndroidManifest.xml\`.
It is the master declaration file that tells the Android OS:
- The app package name (e.g. \`com.example.student_course\`)
- App launcher icon and label
- Declared permissions:
  \`\`\`xml
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.CAMERA"/>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
  \`\`\`

### 2. Runtime Permissions in Flutter (\`permission_handler\`)
In modern Android (API 23+), sensitive permissions (Camera, Location, Microphone, Storage) cannot just be declared in the manifest; you must ask the user **at runtime**:
\`\`\`dart
import 'package:permission_handler/permission_handler.dart';

void requestCameraPermission() async {
  PermissionStatus status = await Permission.camera.request();
  if (status.isGranted) {
    print('Camera access granted!');
  } else if (status.isPermanentlyDenied) {
    openAppSettings(); // Open device Settings app
  }
}
\`\`\`

### 3. Gradle Files (\`android/app/build.gradle\`)
Controls compilation settings and versions:
- **\`compileSdk\`**: The version of the Android SDK used to compile the app (e.g. 34 or 35).
- **\`minSdk\`**: The oldest Android OS version that can install your app (e.g. 21 = Android 5.0 Lollipop).
- **\`targetSdk\`**: The Android version your app was tested and designed for (e.g. 34). Google Play requires targeting modern versions!
- **\`versionCode\`**: An integer incremented with every Play Store update (1, 2, 3...).
- **\`versionName\`**: The user-visible version string ("1.0.0").`,
    analogy: `Think of traveling internationally:
- **AndroidManifest.xml:** Your international passport. It lists your full legal name, photo, and visa stamps.
- **Runtime Permission (permission_handler):** The customs officer at the gate asking: "May I inspect the contents of your luggage right now?" You can say Yes or No.
- **minSdk:** The minimum age limit on a roller coaster: "You must be at least this tall (Android 5.0) to ride!"`,
    codeSnippet: `// 1. AndroidManifest.xml declarations (android/app/src/main/AndroidManifest.xml)
/*
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Internet permission (Normal - granted automatically) -->
    <uses-permission android:name="android.permission.INTERNET"/>
    
    <!-- Camera permission (Dangerous - requires runtime request) -->
    <uses-permission android:name="android.permission.CAMERA"/>

    <application
        android:label="Student Course App"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        ...
    </application>
</manifest>
*/

// 2. Flutter Runtime Permission Code
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

class PermissionDemoScreen extends StatefulWidget {
  const PermissionDemoScreen({super.key});

  @override
  State<PermissionDemoScreen> createState() => _PermissionDemoScreenState();
}

class _PermissionDemoScreenState extends State<PermissionDemoScreen> {
  String _status = 'Permission Not Requested';

  void _askCameraPermission() async {
    // Check current status
    var current = await Permission.camera.status;

    if (current.isGranted) {
      setState(() => _status = 'Camera Permission: GRANTED ✅');
      return;
    }

    // Request permission dialog
    var result = await Permission.camera.request();

    if (result.isGranted) {
      setState(() => _status = 'Camera Permission: GRANTED ✅');
    } else if (result.isPermanentlyDenied) {
      setState(() => _status = 'Permanently Denied: Open Settings');
      openAppSettings();
    } else {
      setState(() => _status = 'Camera Permission: DENIED ❌');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Android Permissions in Flutter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_status, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              onPressed: _askCameraPermission,
              icon: const Icon(Icons.camera_alt),
              label: const Text('Request Camera Permission'),
            ),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Android build.gradle key variables mental model:
void main() {
  print('minSdk -> Minimum supported Android OS version (e.g. 21)');
  print('targetSdk -> Android version tested against for modern behavior (e.g. 34)');
  print('compileSdk -> SDK version used by Gradle compiler');
  print('versionCode -> Integer incremented on each Play Store release (e.g. 4)');
  print('versionName -> Semantic version shown to users (e.g. 1.2.0)');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Declare permission in AndroidManifest.xml',
        description: 'Add <uses-permission android:name="android.permission.CAMERA"/> inside <manifest>.'
      },
      {
        step: 2,
        title: 'Add permission_handler plugin',
        description: 'Run flutter pub add permission_handler in terminal.'
      },
      {
        step: 3,
        title: 'Handle PermissionStatus outcomes',
        description: 'Handle isGranted, isDenied, and isPermanentlyDenied (which requires openAppSettings()).'
      },
      {
        step: 4,
        title: 'Configure minSdk in build.gradle',
        description: 'Many native plugins require minSdk 21 or higher in android/app/build.gradle.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Requesting permission in Flutter code without declaring it in AndroidManifest.xml.',
        fix: 'Always add the <uses-permission> tag in AndroidManifest.xml first.',
        why: 'If omitted from the manifest, Android silently auto-denies the runtime permission dialog.'
      },
      {
        mistake: 'Uploading an update to Google Play Store with the same versionCode.',
        fix: 'Always increment versionCode by at least 1 in pubspec.yaml (e.g. version: 1.0.1+2) or build.gradle.',
        why: 'Google Play Console strictly rejects APKs/AABs with existing version codes.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the difference between minSdk, targetSdk, and compileSdk in Android build.gradle?" — Answer: minSdk is the lowest Android API level capable of running the app; targetSdk specifies the API level the app is tested against and designed to target; compileSdk is the Android SDK version used to compile the source code.',
      'Exam Alert: "Where are Android app permissions declared?" — Answer: In android/app/src/main/AndroidManifest.xml using <uses-permission android:name="..."/> tags.',
      'Exam Alert: "What is the difference between Normal and Dangerous permissions in Android?" — Answer: Normal permissions (e.g. INTERNET) are granted automatically at installation; Dangerous permissions (e.g. CAMERA, LOCATION) access private user data and must be requested at runtime.'
    ],
    practiceTask: {
      task: 'Write the XML code to declare Internet access and Fine Location permissions in AndroidManifest.xml.',
      hint: '<uses-permission android:name="android.permission.INTERNET" />',
      solution: `<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`
    },
    quiz: [
      {
        id: 'q7-3-1',
        question: 'In which file are Android application permissions and package name declared?',
        options: ['AndroidManifest.xml', 'build.gradle', 'settings.gradle', 'pubspec.yaml'],
        correctIndex: 0,
        explanation: 'AndroidManifest.xml defines core app metadata, permissions, and components.'
      },
      {
        id: 'q7-3-2',
        question: 'What does "minSdk" signify in an Android build.gradle file?',
        options: [
          'The maximum RAM the app can use',
          'The minimum Android OS API level required to install and run the application',
          'The screen brightness limit',
          'The download file size'
        ],
        correctIndex: 1,
        explanation: 'Devices running Android versions below minSdk are blocked by Google Play from installing the app.'
      },
      {
        id: 'q7-3-3',
        question: 'Why does Android require "Dangerous" permissions (like CAMERA and LOCATION) to be requested at runtime?',
        options: [
          'To protect user privacy and allow users to grant or deny sensitive device hardware access',
          'To save battery',
          'Because Java cannot read hardware',
          'Only for Xiaomi phones'
        ],
        correctIndex: 0,
        explanation: 'Runtime permissions ensure transparent user consent before accessing sensitive hardware or private data.'
      },
      {
        id: 'q7-3-4',
        question: 'Which Flutter package is the industry standard for handling runtime permissions?',
        options: ['permission_handler', 'app_permissions', 'android_perms', 'allow_me'],
        correctIndex: 0,
        explanation: 'permission_handler provides cross-platform APIs to check and request permissions.'
      },
      {
        id: 'q7-3-5',
        question: 'When updating an app on Google Play Store, which value in build.gradle / pubspec.yaml MUST be incremented?',
        options: ['versionCode', 'applicationId', 'minSdk', 'compileSdk'],
        correctIndex: 0,
        explanation: 'Google Play requires each uploaded artifact to have a strictly higher positive integer versionCode.'
      }
    ]
  },
  {
    id: 'm7-l4',
    moduleId: 'module-7',
    title: 'Android 4 Components (Activity, Service, Receiver, Provider) in Flutter',
    description: 'Exam Critical: The fundamental pillar of Android architecture! Learn the 4 Core Components of Android: Activity, Service, BroadcastReceiver, ContentProvider, and how each is reached or implemented in Flutter.',
    order: 4,
    durationMinutes: 16,
    difficulty: 'Intermediate',
    prerequisites: ['Module 7 Lesson 1-3'],
    lastVerified: 'November 2026',
    goal: 'Explain the 4 Core Components of Android, answer classic company exam questions, and know how Flutter interacts with each component.',
    simpleExplanation: `Almost every Android written exam and interview begins with:
**"What are the 4 fundamental building blocks of Android?"**

Here is the complete breakdown and how each works with Flutter:

### 1. Activity (Single User Screen)
- **Native Android:** A single focused window that displays UI and receives touch events (e.g. \`MainActivity\`).
- **In Flutter:** A standard Flutter app has **one single root \`FlutterActivity\`** created by Android. Inside this single Activity, Flutter draws its entire widget tree! You navigate between Flutter screens without starting new Android Activities.

### 2. Service (Background Execution without UI)
- **Native Android:** A component that runs in the background to perform long-running operations without providing a user interface (e.g. playing music, downloading a file, syncing data).
- **In Flutter:** Reached via **\`flutter_background_service\`**, **\`workmanager\`**, or native Kotlin services connected via \`MethodChannel\`.

### 3. Broadcast Receiver (System Announcement Listener)
- **Native Android:** A component that listens for system-wide broadcast announcements from the Android OS or other apps (e.g. battery low, device booted, incoming SMS, airplane mode toggled).
- **In Flutter:** Listens via **\`EventChannel\`** or ready-made packages like **\`battery_plus\`** and **\`connectivity_plus\`**.

### 4. Content Provider (Inter-App Data Sharing)
- **Native Android:** Manages access to a central repository of data, allowing one app to securely share structured data with other apps (e.g. Android Contacts Provider, MediaStore, Calendar).
- **In Flutter:** Accessed using plugins like \`contacts_service\`, \`photo_manager\`, or custom \`MethodChannel\` queries to the \`ContentResolver\`.`,
    analogy: `Think of a City Hospital:
- **Activity:** The Doctor's Consultation Room where a patient sits face-to-face with the doctor (interactive UI).
- **Service:** The Hospital Oxygen Generator running silently in the basement 24/7 without patients ever seeing it (background work).
- **Broadcast Receiver:** The Hospital Emergency Siren that sounds when a hurricane or fire is detected (system announcement).
- **Content Provider:** The Central Medical Records Vault where authorized doctors from other clinics can request blood test reports (inter-app data sharing).`,
    codeSnippet: `// SUMMARY TABLE: 4 Android Components vs Flutter Reach
/*
+--------------------+--------------------------------+--------------------------------------+
| Android Component  | What it Does in Native Android | How Reached / Implemented in Flutter |
+--------------------+--------------------------------+--------------------------------------+
| 1. Activity        | Interactive UI screen window   | Hosted in FlutterActivity; widgets   |
|                    |                                | replace Android sub-activities       |
+--------------------+--------------------------------+--------------------------------------+
| 2. Service         | Background tasks without UI    | flutter_background_service,          |
|                    | (Music, downloads, sync)       | workmanager, Dart Isolates           |
+--------------------+--------------------------------+--------------------------------------+
| 3. Broadcast       | Listens for OS announcements   | EventChannel, battery_plus,          |
|    Receiver        | (Battery, airplane, boot)      | connectivity_plus                    |
+--------------------+--------------------------------+--------------------------------------+
| 4. Content         | Secure data sharing between    | contacts_service, photo_manager,     |
|    Provider        | apps (Contacts, MediaStore)    | MethodChannel ContentResolver queries|
+--------------------+--------------------------------+--------------------------------------+
*/

// Example checking Android Connectivity Broadcast in Flutter
import 'package:flutter/material.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class ConnectivityReceiverDemo extends StatelessWidget {
  const ConnectivityReceiverDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Android Broadcast Receiver Demo')),
      body: Center(
        child: StreamBuilder<List<ConnectivityResult>>(
          // Listens to native Android CONNECTIVITY_ACTION broadcast!
          stream: Connectivity().onConnectivityChanged,
          builder: (context, snapshot) {
            final results = snapshot.data ?? [ConnectivityResult.none];
            final isConnected = !results.contains(ConnectivityResult.none);

            return Card(
              color: isConnected ? Colors.green.shade50 : Colors.red.shade50,
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Text(
                  isConnected ? 'Network Connected (Wi-Fi/Cellular) 🌐' : 'Network Disconnected (No Internet) ⚠️',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: isConnected ? Colors.green : Colors.red,
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}`,
    dartPadCode: `void main() {
  List<String> android4Components = [
    '1. Activity: Single focused screen with user interface',
    '2. Service: Background task execution without UI',
    '3. Broadcast Receiver: Listens for system or app-wide announcements',
    '4. Content Provider: Shares structured data between different applications'
  ];

  print('=== 4 CORE COMPONENTS OF ANDROID ===');
  for (var c in android4Components) print(c);
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Memorize the 4 components',
        description: 'Activity, Service, Broadcast Receiver, Content Provider. This is the #1 Android interview question.'
      },
      {
        step: 2,
        title: 'Single-Activity Architecture in Flutter',
        description: 'Flutter uses a Single-Activity architecture. FlutterActivity is the host window; Dart handles the screens.'
      },
      {
        step: 3,
        title: 'Background work with Services',
        description: 'Use Started/Foreground Services for active playback/tracking, and WorkManager for scheduled background sync.'
      },
      {
        step: 4,
        title: 'Receivers and Content Providers',
        description: 'Broadcast Receivers feed into Flutter EventChannels; Content Providers feed into data plugins.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing an Activity with an Application.',
        fix: 'An Application contains multiple Activities, Services, and Receivers. An Activity is just one screen.',
        why: 'Confusing the two demonstrates fundamental Android architectural confusion in interviews.'
      },
      {
        mistake: 'Thinking Services run on a separate background thread by default in native Android.',
        fix: 'In native Android, a Service runs on the MAIN thread by default unless explicitly spawned on a background thread/coroutine.',
        why: 'Performing heavy calculations in a standard native Service without a worker thread triggers an ANR (Application Not Responding).'
      }
    ],
    examAlerts: [
      'Exam Alert (THE MOST FREQUENT EXAM QUESTION): "What are the four essential components of an Android application?" — Answer: 1. Activity, 2. Service, 3. Broadcast Receiver, 4. Content Provider.',
      'Exam Alert: "Does a Service in Android have a user interface?" — Answer: No! A Service performs background operations without providing a user interface.',
      'Exam Alert: "What is a Content Provider used for?" — Answer: To manage and share structured application data between different independent applications (e.g. system Contacts or MediaStore).'
    ],
    practiceTask: {
      task: 'Write a 1-line definition for each of the 4 Android components in simple English.',
      hint: 'Activity = UI screen; Service = background task; Broadcast Receiver = system listener; Content Provider = data sharing.',
      solution: `1. Activity: A single focused screen where the user interacts with the app UI.
2. Service: A background worker that performs long tasks without displaying any UI.
3. Broadcast Receiver: A listener that responds to system-wide broadcast announcements (like battery low or boot).
4. Content Provider: A secure gateway that shares structured data between different applications.`
    },
    quiz: [
      {
        id: 'q7-4-1',
        question: 'Which of the following is NOT one of the four core components of Android?',
        options: ['Activity', 'Service', 'Fragment', 'Content Provider'],
        correctIndex: 2,
        explanation: 'The four core components are Activity, Service, Broadcast Receiver, and Content Provider. Fragments are UI sub-components.'
      },
      {
        id: 'q7-4-2',
        question: 'Does a standard Android Service have a visual user interface?',
        options: [
          'Yes, it always displays a dialog',
          'No, Services run in the background without any user interface',
          'Only when the phone is plugged in',
          'Yes, on Android tablets only'
        ],
        correctIndex: 1,
        explanation: 'Services perform background work without a visual interface.'
      },
      {
        id: 'q7-4-3',
        question: 'What is the role of a Broadcast Receiver in Android?',
        options: [
          'To paint pixels on the GPU',
          'To listen for and respond to system-wide broadcast announcements from the OS or other apps',
          'To store passwords in SQLite',
          'To format strings'
        ],
        correctIndex: 1,
        explanation: 'Broadcast Receivers act as event listeners for system announcements like battery low or network change.'
      },
      {
        id: 'q7-4-4',
        question: 'How does Flutter handle Android Activities by default?',
        options: [
          'It creates a new Android Activity for every single widget',
          'It runs within a Single-Activity architecture (FlutterActivity) and renders its own widget tree',
          'It does not use Activities',
          'It converts Dart into XML Activities'
        ],
        correctIndex: 1,
        explanation: 'Flutter uses a Single-Activity architecture where FlutterActivity hosts the Flutter rendering engine.'
      },
      {
        id: 'q7-4-5',
        question: 'Which Android component allows an app to securely share its database or media files with other applications?',
        options: ['Activity', 'Service', 'Broadcast Receiver', 'Content Provider'],
        correctIndex: 3,
        explanation: 'Content Providers supply a secure interface for inter-process data sharing.'
      }
    ]
  },
  {
    id: 'm7-l5',
    moduleId: 'module-7',
    title: 'Platform Channels: MethodChannel & EventChannel to Call Kotlin Code',
    description: 'Exam Critical: Bridging Flutter and Native Android! Learn how Platform Channels work, write a MethodChannel to invoke Kotlin code and return battery level, and stream continuous sensor events with EventChannel.',
    order: 5,
    durationMinutes: 20,
    difficulty: 'Advanced',
    prerequisites: ['Module 7 Lesson 4: Android Components'],
    lastVerified: 'November 2026',
    goal: 'Understand the binary message pipeline between Flutter and native Android, write a MethodChannel in Dart and Kotlin, and invoke native Kotlin functions from Flutter.',
    simpleExplanation: `What happens when you need an Android feature that has no ready-made Flutter package (or your company exam explicitly asks you to call native Kotlin code)?
You use **Platform Channels**! See the official [Flutter Writing Custom Platform-Specific Code Guide](https://docs.flutter.dev/platform-integration/platform-channels).

Flutter communicates with the host Android OS via asynchronous messaging:

### 1. \`MethodChannel\` (Request-Response Calls)
Used for one-off method calls (like requesting native Battery Level or hardware serial number):
- **Dart:** \`final platform = MethodChannel('com.example/battery');\`
  Calls: \`final int level = await platform.invokeMethod('getBatteryLevel');\`
- **Kotlin (MainActivity.kt):**
  Listens for \`getBatteryLevel\`, queries \`BatteryManager\`, and returns the result via \`result.success(batteryLevel)\`!

### 2. \`EventChannel\` (Continuous Real-Time Streams)
Used for continuous data streams from Android to Flutter (like accelerometer sensor ticks, ongoing battery charging state, or native broadcast receiver events):
- **Dart:** \`EventChannel('com.example/battery_stream').receiveBroadcastStream()\`
- **Kotlin:** Implements \`EventChannel.StreamHandler\` with \`onListen(arguments, events)\` and \`onCancel(arguments)\`.`,
    analogy: `Think of a walkie-talkie between two rooms:
- **Room 1 (Flutter / Dart):** The pilot in the cockpit.
- **Room 2 (Native Android / Kotlin):** The mechanic in the engine bay.
- **MethodChannel:** The pilot presses the button: "Mechanic, report fuel level!" The mechanic checks the physical tank and radios back: "Fuel is at 85%." (Request -> Response).
- **EventChannel:** The mechanic attaches a live thermometer to the engine pipe that continuously beeps temperatures back to the cockpit screen every second (Stream).`,
    codeSnippet: `// 1. DART CODE (Flutter side)
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class NativeBatteryDemo extends StatefulWidget {
  const NativeBatteryDemo({super.key});

  @override
  State<NativeBatteryDemo> createState() => _NativeBatteryDemoState();
}

class _NativeBatteryDemoState extends State<NativeBatteryDemo> {
  // 1. Define MethodChannel matching native channel name
  static const MethodChannel _batteryChannel = MethodChannel('com.example.course/battery');

  String _batteryLevel = 'Unknown';

  // 2. Invoke native Kotlin method
  Future<void> _getNativeBatteryLevel() async {
    try {
      final int result = await _batteryChannel.invokeMethod('getBatteryLevel');
      setState(() {
        _batteryLevel = '\$result%';
      });
    } on PlatformException catch (e) {
      setState(() {
        _batteryLevel = 'Failed to get battery: \${e.message}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('MethodChannel Native Kotlin Demo')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.battery_charging_full, size: 64, color: Colors.green),
            const SizedBox(height: 16),
            Text('Native Device Battery: \$_batteryLevel', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _getNativeBatteryLevel,
              child: const Text('Invoke Native Kotlin Method'),
            ),
          ],
        ),
      ),
    );
  }
}

// 2. KOTLIN CODE (android/app/src/main/kotlin/.../MainActivity.kt)
/*
package com.example.course

import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.example.course/battery"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        // Register MethodChannel handler
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "getBatteryLevel") {
                val batteryLevel = getBatteryLevel()
                if (batteryLevel != -1) {
                    result.success(batteryLevel) // Send integer back to Flutter!
                } else {
                    result.error("UNAVAILABLE", "Battery level not available.", null)
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun getBatteryLevel(): Int {
        val batteryLevel: Int
        if (VERSION.SDK_INT >= VERSION_CODES.LOLLIPOP) {
            val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
            batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
        } else {
            val intent = ContextWrapper(applicationContext).registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
            batteryLevel = intent!!.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) * 100 / intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
        }
        return batteryLevel
    }
}
*/`,
    dartPadCode: `// Mental model of PlatformChannel communication:
void main() {
  print('1. Dart calls: MethodChannel("channel_id").invokeMethod("methodName")');
  print('2. BinaryMessenger serializes arguments into standard byte format');
  print('3. Native Android receives MethodCall(call.method, call.arguments)');
  print('4. Kotlin executes native Android SDK API (e.g. BatteryManager)');
  print('5. Kotlin calls result.success(data)');
  print('6. Dart Future resolves with returned data!');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Define unique Channel identifier',
        description: 'Use reverse domain notation (e.g. com.example.app/service) to guarantee uniqueness.'
      },
      {
        step: 2,
        title: 'Override configureFlutterEngine in MainActivity',
        description: 'In MainActivity.kt, override configureFlutterEngine(flutterEngine) and attach the MethodChannel handler.'
      },
      {
        step: 3,
        title: 'Handle call.method and result callbacks',
        description: 'Verify if (call.method == "getBatteryLevel") and return data with result.success(value).'
      },
      {
        step: 4,
        title: 'Catch PlatformException in Dart',
        description: 'Always wrap invokeMethod in a try-on PlatformException catch block.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Channel name typo between Dart and Kotlin.',
        fix: 'Ensure the channel name string in Dart exactly matches the CHANNEL constant in Kotlin byte-for-byte.',
        why: 'Even a minor spelling difference prevents messages from routing to the native handler.'
      },
      {
        mistake: 'Forgetting to call result.notImplemented() for unrecognized method calls.',
        fix: 'Always add else { result.notImplemented() } in Kotlin.',
        why: 'Failing to respond hangs the calling Dart Future indefinitely.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely High Probability): "What are Platform Channels in Flutter and what are the two main types?" — Answer: Platform Channels enable communication between Flutter Dart code and native platform code (Kotlin/Java/Swift). The two main types are MethodChannel (for asynchronous request-response method calls) and EventChannel (for continuous event streams).',
      'Exam Alert: "How do you return a successful response from native Kotlin back to Flutter in a MethodChannel?" — Answer: Using result.success(data).'
    ],
    practiceTask: {
      task: 'Write the Dart code to call a native MethodChannel "com.exam/calculator" with method "add" passing arguments {"a": 10, "b": 20}.',
      hint: 'MethodChannel("com.exam/calculator").invokeMethod("add", {"a": 10, "b": 20})',
      solution: `final platform = MethodChannel('com.exam/calculator');
final int sum = await platform.invokeMethod('add', {'a': 10, 'b': 20});
print('Sum from native Kotlin: \$sum');`
    },
    quiz: [
      {
        id: 'q7-5-1',
        question: 'Which Platform Channel type is used to execute a one-off native Kotlin function and await a single return value in Flutter?',
        options: ['EventChannel', 'MethodChannel', 'StreamChannel', 'SocketChannel'],
        correctIndex: 1,
        explanation: 'MethodChannel provides one-off RPC (remote procedure call) messaging between Flutter and host platforms.'
      },
      {
        id: 'q7-5-2',
        question: 'Which Platform Channel type is designed for continuous streaming of data events (like sensor updates) from native Android to Flutter?',
        options: ['EventChannel', 'MethodChannel', 'BasicMessageChannel', 'PipeChannel'],
        correctIndex: 0,
        explanation: 'EventChannel delivers continuous asynchronous streams using the StreamHandler interface.'
      },
      {
        id: 'q7-5-3',
        question: 'In native Kotlin MainActivity, which method of FlutterActivity is overridden to register Platform Channels?',
        options: ['onCreate()', 'configureFlutterEngine(flutterEngine: FlutterEngine)', 'onResume()', 'onInit()'],
        correctIndex: 1,
        explanation: 'configureFlutterEngine is the standard Flutter v2 embedding method to register channels.'
      },
      {
        id: 'q7-5-4',
        question: 'What method is called on the MethodChannel.Result object in Kotlin when a method is successfully executed?',
        options: ['result.done()', 'result.success(value)', 'result.return(value)', 'result.send()'],
        correctIndex: 1,
        explanation: 'result.success(data) delivers the return payload back to the awaiting Dart Future.'
      },
      {
        id: 'q7-5-5',
        question: 'What exception is thrown in Dart when a native MethodChannel call fails or throws an error in Kotlin?',
        options: ['PlatformException', 'KotlinCrashException', 'NetworkException', 'NativeException'],
        correctIndex: 0,
        explanation: 'PlatformException captures error codes and messages returned via result.error().'
      }
    ]
  },
  {
    id: 'm7-l6',
    moduleId: 'module-7',
    title: 'BroadcastReceivers: Native Kotlin Receiver Forwarded to Flutter via EventChannel',
    description: 'Exam Critical: Master Broadcast Receivers! Learn native Kotlin BroadcastReceiver implementation for system events (battery low, airplane mode, boot completed, custom broadcasts) and forward them to Flutter via EventChannel.',
    order: 6,
    durationMinutes: 18,
    difficulty: 'Advanced',
    prerequisites: ['Module 7 Lesson 5: Platform Channels'],
    lastVerified: 'November 2026',
    goal: 'Write a native Android BroadcastReceiver in Kotlin, register it dynamically with IntentFilter, stream events to Flutter using EventChannel, and use battery_plus / connectivity_plus.',
    simpleExplanation: `In native Android, the OS constantly broadcasts system events: "Battery is critically low!", "Airplane mode turned ON", "Charger connected".

A **\`BroadcastReceiver\`** is the native Android component that sleeps until a registered broadcast occurs, wakes up, and runs its \`onReceive()\` method.

### (a) Native Android BroadcastReceiver (Kotlin)
\`\`\`kotlin
class AirplaneModeReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action == Intent.ACTION_AIRPLANE_MODE_CHANGED) {
            val isEnabled = intent.getBooleanExtra("state", false)
            Log.d("AirplaneReceiver", "Airplane Mode changed: $isEnabled")
        }
    }
}
\`\`\`

---

### (b) Forwarding Broadcasts to Flutter via \`EventChannel\`
To receive these native OS broadcasts in Flutter:
1. In Kotlin, create an \`EventChannel.StreamHandler\`.
2. Inside \`onListen()\`, register the native \`BroadcastReceiver\` using \`context.registerReceiver(...)\`.
3. Inside \`onReceive()\`, call \`events?.success(isCharging)\` to beam the event into Flutter!
4. Inside \`onCancel()\`, unregister the receiver with \`context.unregisterReceiver(...)\`.
5. In Flutter Dart, simply listen to the \`Stream\`:
   \`\`\`dart
   EventChannel('com.example/battery_stream')
       .receiveBroadcastStream()
       .listen((event) => print('Battery status: $event'));
   \`\`\`

### (c) Ready-Made Flutter Packages
For common broadcasts, official Flutter plugins already bundle this native code:
- **\`battery_plus\`**: Battery level and charging status stream.
- **\`connectivity_plus\`**: Wi-Fi, cellular, and offline connection changes.`,
    analogy: `Think of a weather radio in a ship's captain cabin:
The national coast guard broadcasts emergency weather alerts across open radio frequencies. The ship's receiver radio sits quietly on the wall.
The moment the coast guard broadcasts: "Gale Warning!", the radio sounds an alarm and pipes the voice directly into the captain's headset (Flutter Stream) so they can steer the ship away from the storm!`,
    codeSnippet: `// 1. KOTLIN CODE: Native BroadcastReceiver bridged to Flutter EventChannel
/*
package com.example.course

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.EventChannel

class MainActivity: FlutterActivity() {
    private val CHARGING_CHANNEL = "com.example.course/charging_stream"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        EventChannel(flutterEngine.dartExecutor.binaryMessenger, CHARGING_CHANNEL)
            .setStreamHandler(object : EventChannel.StreamHandler {
                private var chargingReceiver: BroadcastReceiver? = null

                override fun onListen(arguments: Any?, events: EventChannel.EventSink?) {
                    chargingReceiver = object : BroadcastReceiver() {
                        override fun onReceive(context: Context?, intent: Intent?) {
                            val status = intent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1
                            val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING ||
                                             status == BatteryManager.BATTERY_STATUS_FULL
                            // Send real-time event to Flutter!
                            events?.success(isCharging)
                        }
                    }
                    val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
                    registerReceiver(chargingReceiver, filter)
                }

                override fun onCancel(arguments: Any?) {
                    unregisterReceiver(chargingReceiver)
                    chargingReceiver = null
                }
            })
    }
}
*/

// 2. DART CODE: Consuming the native broadcast stream in Flutter
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class NativeChargingStreamScreen extends StatefulWidget {
  const NativeChargingStreamScreen({super.key});

  @override
  State<NativeChargingStreamScreen> createState() => _NativeChargingStreamScreenState();
}

class _NativeChargingStreamScreenState extends State<NativeChargingStreamScreen> {
  static const EventChannel _chargingChannel = EventChannel('com.example.course/charging_stream');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Native BroadcastReceiver Stream')),
      body: Center(
        child: StreamBuilder<dynamic>(
          // Listen to native Kotlin BroadcastReceiver!
          stream: _chargingChannel.receiveBroadcastStream(),
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Text('Error: \${snapshot.error}');
            }
            if (!snapshot.hasData) {
              return const Text('Waiting for native battery broadcast...');
            }

            final bool isCharging = snapshot.data == true;

            return Card(
              color: isCharging ? Colors.amber.shade100 : Colors.blue.shade50,
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      isCharging ? Icons.power : Icons.power_off,
                      size: 64,
                      color: isCharging ? Colors.orange : Colors.grey,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      isCharging ? 'CHARGING VIA NATIVE BROADCAST ⚡' : 'DISCHARGING / ON BATTERY 🔋',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}`,
    dartPadCode: `// BroadcastReceiver workflow mental model:
void main() {
  print('1. Native Android OS posts broadcast: Intent.ACTION_BATTERY_CHANGED');
  print('2. Kotlin BroadcastReceiver triggers onReceive(context, intent)');
  print('3. Kotlin extracts data and sends via EventSink: events.success(isCharging)');
  print('4. Flutter StreamBuilder receives new event and updates on-screen UI!');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Create EventChannel in Kotlin',
        description: 'Call EventChannel(binaryMessenger, name).setStreamHandler(StreamHandler).'
      },
      {
        step: 2,
        title: 'Register receiver in onListen()',
        description: 'Instantiate your BroadcastReceiver and register it with context.registerReceiver(receiver, filter).'
      },
      {
        step: 3,
        title: 'Emit events with EventSink',
        description: 'Call events?.success(data) inside onReceive() to forward the broadcast payload to Dart.'
      },
      {
        step: 4,
        title: 'Unregister in onCancel()',
        description: 'Always unregister receivers in onCancel() to prevent memory leaks when the Flutter stream cancels.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to unregister the native BroadcastReceiver in onCancel().',
        fix: 'Call unregisterReceiver(chargingReceiver) in onCancel().',
        why: 'Failing to unregister native receivers causes an Android ReceiverLeakedException and drains battery.'
      },
      {
        mistake: 'Using MethodChannel instead of EventChannel for continuous events.',
        fix: 'Use EventChannel for streams and ongoing updates.',
        why: 'MethodChannels are designed for one-time request/response, not continuous event streams.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "Which native Android component listens for system-wide announcements such as battery level changes, boot completion, or connectivity transitions?" — Answer: BroadcastReceiver.',
      'Exam Alert: "Which Flutter channel mechanism is used to forward continuous broadcasts from an Android BroadcastReceiver into Flutter?" — Answer: EventChannel (via EventChannel.StreamHandler and EventSink).'
    ],
    practiceTask: {
      task: 'Write the native Kotlin onReceive() method of a BroadcastReceiver that checks if the intent action is Intent.ACTION_BOOT_COMPLETED and logs "Device rebooted".',
      hint: 'if (intent?.action == Intent.ACTION_BOOT_COMPLETED) Log.d("Boot", "Device rebooted")',
      solution: `override fun onReceive(context: Context?, intent: Intent?) {
    if (intent?.action == Intent.ACTION_BOOT_COMPLETED) {
        Log.d("BootReceiver", "Device reboot completed!")
    }
}`
    },
    quiz: [
      {
        id: 'q7-6-1',
        question: 'Which method must be overridden in a native Android BroadcastReceiver class?',
        options: ['onCreate()', 'onReceive(context: Context?, intent: Intent?)', 'onBroadcast()', 'onStart()'],
        correctIndex: 1,
        explanation: 'onReceive() is the mandatory callback invoked whenever a matching broadcast is intercepted.'
      },
      {
        id: 'q7-6-2',
        question: 'Which Flutter Platform Channel interface is used to stream continuous events from a BroadcastReceiver to Dart?',
        options: ['MethodChannel', 'EventChannel', 'SocketChannel', 'MessageChannel'],
        correctIndex: 1,
        explanation: 'EventChannel delivers continuous asynchronous streams from native code to Dart.'
      },
      {
        id: 'q7-6-3',
        question: 'What happens if an Android app registers a BroadcastReceiver dynamically but never unregisters it?',
        options: [
          'It runs 10x faster',
          'It leaks memory and crashes with a ReceiverLeakedException',
          'It deletes the app',
          'Android ignores it'
        ],
        correctIndex: 1,
        explanation: 'Unregistered receivers cause memory leaks and are flagged by the Android OS runtime.'
      },
      {
        id: 'q7-6-4',
        question: 'Which ready-made Flutter plugin listens to native Android network broadcasts and streams connectivity changes?',
        options: ['connectivity_plus', 'wifi_listener', 'net_watcher', 'flutter_web'],
        correctIndex: 0,
        explanation: 'connectivity_plus wraps Android\'s ConnectivityManager broadcast receiver into a Dart stream.'
      },
      {
        id: 'q7-6-5',
        question: 'What permission is required in AndroidManifest.xml to receive the ACTION_BOOT_COMPLETED broadcast?',
        options: [
          'android.permission.RECEIVE_BOOT_COMPLETED',
          'android.permission.INTERNET',
          'android.permission.REBOOT',
          'android.permission.SYSTEM_ALERT_WINDOW'
        ],
        correctIndex: 0,
        explanation: 'RECEIVE_BOOT_COMPLETED is required to allow the receiver to register for device startup broadcasts.'
      }
    ]
  },
  {
    id: 'm7-l7',
    moduleId: 'module-7',
    title: 'Android Services: Foreground Service, WorkManager, Bound vs Started & Isolates',
    description: 'Exam Critical: Master background processing! Understand Started vs Bound Services, Foreground Services with persistent notification, WorkManager periodic tasks, Dart Isolates, and flutter_local_notifications.',
    order: 7,
    durationMinutes: 20,
    difficulty: 'Advanced',
    prerequisites: ['Module 7 Lesson 4: Android Components'],
    lastVerified: 'November 2026',
    goal: 'Distinguish between Started Services, Bound Services, and Foreground Services, configure WorkManager for background jobs, and use Dart Isolates for heavy CPU computations.',
    simpleExplanation: `Android severely restricts background work to protect battery life. If your app goes to the background, Android can kill its process after a few minutes.

To perform ongoing background work, you must use **Android Services**:

### (a) Started vs Bound Services (EXAM FAVORITE!)
- **Started Service (\`startService()\`):**
  A component calls \`startService()\`. The service runs in the background indefinitely until it stops itself (\`stopSelf()\`) or another component stops it (\`stopService()\`). It usually performs a single independent operation (e.g. downloading a file) and does not return a result to the caller.
- **Bound Service (\`bindService()\`):**
  Acts like a server in a client-server interface. Multiple components (activities) can bind to the service to send requests, receive results, or perform Inter-Process Communication (IPC). When all clients unbind, the service is destroyed automatically!

---

### (b) Foreground Service (With Persistent Notification)
If your app needs to run while minimized for user-critical tasks (e.g. playing audio, GPS navigation, active workout tracking):
- Android **strictly requires** a **Foreground Service**.
- A Foreground Service **MUST display an ongoing, non-dismissible notification** in the status bar so the user is actively aware that the app is using resources.
- In Flutter, you implement this using **\`flutter_background_service\`** and **\`flutter_local_notifications\`**.

---

### (c) WorkManager (Deferred / Periodic Background Tasks)
For tasks that do NOT need to run immediately, but must run eventually even if the app is killed or device reboots (e.g. daily database backup, sync student grades at midnight):
- Use the **\`workmanager\`** plugin (wraps Android\'s native \`WorkManager\` architecture component).

---

### (d) Dart Isolates (Heavy CPU Tasks in Memory)
Remember: Android Services are for background OS tasks when the app is minimized.
For heavy in-memory CPU calculations (like sorting 500,000 numbers or resizing a 20MB image) while your app is running:
Use a **Dart Isolate** (\`Isolate.run()\`) to run calculations on a separate CPU core without dropping UI frames!`,
    analogy: `Think of staff at a hotel:
- **Started Service:** A courier sent across town to deliver a package. They leave, complete the job, and clock out.
- **Bound Service:** A hotel concierge at the front desk. Guests walk up, ask questions, get answers, and walk away. When no guests are left in the hotel, the concierge goes home.
- **Foreground Service:** The hotel night watchman patrolling the corridors wearing a high-visibility glowing neon vest with a flashlight (the persistent notification). Everyone can clearly see they are on active duty!
- **WorkManager:** The automated sprinkler system scheduled to water the garden lawn every night at 2:00 AM, but only if it hasn't rained and battery is above 20%.`,
    codeSnippet: `// 1. AndroidManifest.xml Foreground Service Declaration
/*
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>

<application ...>
    <service
        android:name="com.example.app.MyForegroundService"
        android:foregroundServiceType="specialUse"
        android:exported="false" />
</application>
*/

// 2. Heavy CPU Task using Dart Isolate (Zero UI Lag!)
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class IsolateCalculationDemo extends StatefulWidget {
  const IsolateCalculationDemo({super.key});

  @override
  State<IsolateCalculationDemo> createState() => _IsolateCalculationDemoState();
}

class _IsolateCalculationDemoState extends State<IsolateCalculationDemo> {
  String _status = 'Idle';
  bool _isLoading = false;

  // Function to run on background Isolate
  static int _computeHeavyCalculation(int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
      sum += (i % 7);
    }
    return sum;
  }

  void _runOnSeparateThread() async {
    setState(() {
      _isLoading = true;
      _status = 'Calculating 50,000,000 operations in background Isolate...';
    });

    // Isolate.run spawns a new Dart thread on another CPU core!
    final result = await compute(_computeHeavyCalculation, 50000000);

    setState(() {
      _isLoading = false;
      _status = 'Completed! Result: \$result (UI never dropped a single frame!)';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Background Execution Demo')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (_isLoading) const CircularProgressIndicator(),
              const SizedBox(height: 20),
              Text(_status, textAlign: TextAlign.center, style: const TextStyle(fontSize: 16)),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _isLoading ? null : _runOnSeparateThread,
                icon: const Icon(Icons.memory),
                label: const Text('Run Isolate on Background Thread'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Services Comparison mental model:
void main() {
  print('1. Started Service: Started via startService(), runs until stopSelf()');
  print('2. Bound Service: Bound via bindService(), client-server IPC, dies when all unbind');
  print('3. Foreground Service: Required for active background audio/GPS, MUST show persistent notification');
  print('4. WorkManager: Scheduled, battery-friendly deferred jobs (sync, backup)');
  print('5. Dart Isolate: Heavy in-app CPU crunching on separate core');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Understand Foreground Service requirements',
        description: 'Android requires FOREGROUND_SERVICE permission and an ongoing NotificationChannel.'
      },
      {
        step: 2,
        title: 'Use WorkManager for deferred sync',
        description: 'WorkManager guarantees execution with constraints (e.g. requires charging or unmetered Wi-Fi).'
      },
      {
        step: 3,
        title: 'Compute with compute() or Isolate.run()',
        description: 'Flutter\'s compute(fn, data) handles isolate creation, data transmission, and teardown automatically.'
      },
      {
        step: 4,
        title: 'Remember: Isolates do not share memory',
        description: 'Dart isolates have separate memory heaps; they communicate purely by passing messages (SendPort/ReceivePort).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Running an infinite while(true) loop in an Activity to perform background work.',
        fix: 'Use a Foreground Service or WorkManager.',
        why: 'The Android OS will kill the activity or throw an ANR (Application Not Responding) crash.'
      },
      {
        mistake: 'Trying to start a background service from the background on Android 8.0+ (API 26+).',
        fix: 'Use startForegroundService() and call startForeground(id, notification) within 5 seconds.',
        why: 'Android enforces background execution limits; starting a background service while not in the foreground throws an IllegalStateException.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely Frequent): "What is the difference between a Started Service and a Bound Service in Android?" — Answer: A Started Service is started by calling startService() and runs indefinitely until it stops itself or is stopped; a Bound Service offers a client-server interface by calling bindService(), allowing components to interact with it, and is destroyed when all clients unbind.',
      'Exam Alert: "What is an Android Foreground Service and what is its mandatory requirement?" — Answer: A service that performs operations noticeable to the user (like music playback or GPS tracking); it MUST display an ongoing persistent notification in the status bar.',
      'Exam Alert: "How does a Dart Isolate differ from traditional threads?" — Answer: Traditional threads share the same memory heap; Dart Isolates have completely isolated memory heaps and communicate solely via asynchronous message passing.'
    ],
    practiceTask: {
      task: 'State whether you would choose a Foreground Service, WorkManager, or Dart Isolate for: (1) Playing music while using other apps, (2) Backing up SQLite database to server at 3 AM on Wi-Fi, (3) Filtering 100,000 student grades in memory.',
      hint: '1 -> Foreground Service; 2 -> WorkManager; 3 -> Dart Isolate',
      solution: `1. Playing music: Foreground Service (requires continuous execution and persistent notification)
2. 3 AM backup: WorkManager (battery-friendly, deferred execution with Wi-Fi constraint)
3. 100,000 grades in memory: Dart Isolate (CPU-heavy parallel thread)`
    },
    quiz: [
      {
        id: 'q7-7-1',
        question: 'What is a mandatory requirement for an Android Foreground Service?',
        options: [
          'It must display an ongoing, non-dismissible notification in the status bar',
          'It must use Bluetooth',
          'It must be written in C++',
          'It can only run for 10 seconds'
        ],
        correctIndex: 0,
        explanation: 'Android requires Foreground Services to show an ongoing notification so users are aware of active resource usage.'
      },
      {
        id: 'q7-7-2',
        question: 'What happens to an Android Bound Service when all client components unbind from it?',
        options: [
          'It continues running forever',
          'It is automatically destroyed by the Android operating system',
          'It reboots the phone',
          'It turns into an Activity'
        ],
        correctIndex: 1,
        explanation: 'Bound Services live only as long as at least one active client remains bound to them.'
      },
      {
        id: 'q7-7-3',
        question: 'Which tool is recommended for deferred, guaranteed background tasks that require network or charging constraints?',
        options: ['Timer.periodic()', 'WorkManager (workmanager plugin)', 'Raw Thread.sleep()', 'Async/await only'],
        correctIndex: 1,
        explanation: 'WorkManager gracefully handles deferred jobs across app restarts and device reboots.'
      },
      {
        id: 'q7-7-4',
        question: 'Do Dart Isolates share memory with each other?',
        options: [
          'Yes, they share all global variables',
          'No, each Isolate has its own isolated memory heap and communicates exclusively via message passing (ports)',
          'Only in release mode',
          'Only on Android'
        ],
        correctIndex: 1,
        explanation: 'Dart Isolates do not share mutable memory, preventing race conditions and thread lock issues.'
      },
      {
        id: 'q7-7-5',
        question: 'Within how many seconds must an app call startForeground(notification) after starting a foreground service on modern Android?',
        options: ['5 seconds', '60 seconds', '10 minutes', 'There is no limit'],
        correctIndex: 0,
        explanation: 'Android strictly enforces calling startForeground() within 5 seconds or it throws an ANR/crash.'
      }
    ]
  },
  {
    id: 'm7-l8',
    moduleId: 'module-7',
    title: 'Native Android Primer (Kotlin + XML) for Pure-Android Exam Questions',
    description: 'Exam Critical: Answer pure-native Android exam questions with 100% confidence! Master Kotlin syntax, XML layouts, Activity, EditText, Spinner, RecyclerView with Adapter and ViewHolder, ListView with ArrayAdapter, SharedPreferences, and SQLite.',
    order: 8,
    durationMinutes: 22,
    difficulty: 'Intermediate',
    prerequisites: ['Module 7 Lessons 1-7'],
    lastVerified: 'November 2026',
    goal: 'Write complete, compilable native Android code (Kotlin + XML) for the Student Details exam project, understand Adapters/ViewHolders, and master Android Studio Logcat and ADB commands.',
    simpleExplanation: `Because your company exam is Android-flavoured, you may be asked to write or explain native **Android (Kotlin + XML)** code alongside Flutter!

Here is your complete Native Android Primer:

---

### 1. The Direct Mapping Table (Memorize for Exam!)
| Native Android Concept | Native Class (Kotlin/Java) | Flutter Equivalent |
|:---|:---|:---|
| Text Display | \`TextView\` | \`Text\` widget |
| Text Input | \`EditText\` | \`TextField\` / \`TextFormField\` |
| Dropdown Menu | \`Spinner\` | \`DropdownButtonFormField\` |
| Button | \`Button\` | \`ElevatedButton\` |
| Recycled List | \`RecyclerView\` + \`Adapter\` + \`ViewHolder\` | \`ListView.builder\` |
| Simple List | \`ListView\` + \`ArrayAdapter\` | \`ListView\` |
| Screen / Page | \`Activity\` (\`AppCompatActivity\`) | \`StatefulWidget\` / \`Scaffold\` |
| Key-Value Storage | \`SharedPreferences\` | \`shared_preferences\` package |
| Relational DB | \`SQLiteOpenHelper\` / \`Room\` | \`sqflite\` / \`Drift\` package |
| Brief Pop-up Alert | \`Toast.makeText(...).show()\` | \`ScaffoldMessenger.showSnackBar()\` |
| Modal Confirmation | \`AlertDialog.Builder\` | \`showDialog\` + \`AlertDialog\` |

---

### 2. Native Android Layout XML (\`activity_main.xml\`)
In native Android, UI is written in XML layout files:
\`\`\`xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <!-- Student Name EditText -->
    <EditText
        android:id="@+id/etStudentName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Student Name"
        android:inputType="textPersonName" />

    <!-- Roll Number EditText -->
    <EditText
        android:id="@+id/etRollNumber"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Roll Number"
        android:inputType="number" />

    <!-- Marks EditText -->
    <EditText
        android:id="@+id/etMarks"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter Marks (0-100)"
        android:inputType="numberDecimal" />

    <!-- Course Spinner (Dropdown) -->
    <Spinner
        android:id="@+id/spinnerCourse"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp" />

    <!-- Submit Button -->
    <Button
        android:id="@+id/btnSubmit"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Submit Details"
        android:layout_marginTop="16dp" />

    <!-- Result Display TextView -->
    <TextView
        android:id="@+id/tvResult"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="16sp"
        android:textStyle="bold"
        android:textColor="#02569B"
        android:layout_marginTop="20dp" />

</LinearLayout>
\`\`\`

---

### 3. Native Android Activity (\`MainActivity.kt\`)
\`\`\`kotlin
package com.example.studentapp

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Find views by ID
        val etName = findViewById<EditText>(R.id.etStudentName)
        val etRoll = findViewById<EditText>(R.id.etRollNumber)
        val etMarks = findViewById<EditText>(R.id.etMarks)
        val spinnerCourse = findViewById<Spinner>(R.id.spinnerCourse)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)
        val tvResult = findViewById<TextView>(R.id.tvResult)

        // 2. Populate Spinner with ArrayAdapter
        val courses = arrayOf("Flutter Development", "Native Android", "Cloud Computing")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, courses)
        spinnerCourse.adapter = adapter

        // 3. Submit click listener
        btnSubmit.setOnClickListener {
            val name = etName.text.toString().trim()
            val roll = etRoll.text.toString().trim()
            val marksStr = etMarks.text.toString().trim()
            val selectedCourse = spinnerCourse.selectedItem.toString()

            // 4. Input Validations (Exam Critical!)
            if (name.isEmpty()) {
                etName.error = "Name cannot be empty"
                etName.requestFocus()
                return@setOnClickListener
            }
            if (roll.isEmpty()) {
                etRoll.error = "Roll number cannot be empty"
                etRoll.requestFocus()
                return@setOnClickListener
            }
            if (marksStr.isEmpty()) {
                etMarks.error = "Marks cannot be empty"
                etMarks.requestFocus()
                return@setOnClickListener
            }

            val marks = marksStr.toDoubleOrNull()
            if (marks == null || marks < 0 || marks > 100) {
                etMarks.error = "Marks must be between 0 and 100"
                etMarks.requestFocus()
                return@setOnClickListener
            }

            // 5. Calculate Grade
            val grade = when {
                marks >= 90 -> "A+"
                marks >= 80 -> "A"
                marks >= 70 -> "B"
                marks >= 60 -> "C"
                marks >= 50 -> "D"
                else -> "F"
            }

            // 6. Display Result in TextView
            val resultText = """
                === Student Details ===
                Name: $name
                Roll Number: $roll
                Course: $selectedCourse
                Marks: $marks / 100.0
                Grade: $grade
            """.trimIndent()

            tvResult.text = resultText
            Toast.makeText(this, "Student registered! Grade: $grade", Toast.LENGTH_SHORT).show()
        }
    }
}
\`\`\`

---

### 4. Essential Android Studio & ADB Commands
- **Logcat filtering:** In Android Studio Logcat, filter by \`package:mine\` or \`level:error\` to view crashes and stacktraces.
- **Key ADB Terminal Commands:**
  - \`adb devices\`: Lists all connected physical phones and running emulators.
  - \`adb logcat\`: Streams system logs directly in terminal.
  - \`adb install app-release.apk\`: Installs APK directly onto connected phone.
  - \`adb uninstall com.example.app\`: Uninstalls app and wipes app sandbox.`,
    analogy: `Think of learning two languages for the same song:
- In English (Flutter): You sing "I love building mobile apps!"
- In Spanish (Native Kotlin + XML): You sing "¡Me encanta crear aplicaciones móviles!"
The melody, rhythm, and meaning are 100% identical; only the grammar and syntax differ! Knowing both makes you an unbeatable software engineer!`,
    codeSnippet: `// Android Native RecyclerView Adapter Pattern (Kotlin)
/*
class StudentAdapter(private val studentList: List<Student>) :
    RecyclerView.Adapter<StudentAdapter.StudentViewHolder>() {

    // 1. ViewHolder caches view references
    class StudentViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvName: TextView = view.findViewById(R.id.tvName)
        val tvGrade: TextView = view.findViewById(R.id.tvGrade)
    }

    // 2. Inflates row layout
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StudentViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_student, parent, false)
        return StudentViewHolder(view)
    }

    // 3. Binds data to views
    override fun onBindViewHolder(holder: StudentViewHolder, position: Int) {
        val student = studentList[position]
        holder.tvName.text = student.name
        holder.tvGrade.text = "Grade: \${student.grade}"
    }

    override fun getItemCount() = studentList.size
}
*/`,
    dartPadCode: `void main() {
  print('=== MAPPING QUICK CHEAT SHEET ===');
  print('TextView <--> Text widget');
  print('EditText <--> TextField / TextFormField');
  print('Spinner <--> DropdownButtonFormField');
  print('Button <--> ElevatedButton');
  print('RecyclerView <--> ListView.builder');
  print('Toast <--> ScaffoldMessenger SnackBar');
  print('SharedPreferences <--> shared_preferences plugin');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Review XML layout elements',
        description: 'LinearLayout (orientation=vertical), EditText, Spinner, Button, TextView.'
      },
      {
        step: 2,
        title: 'Connect views via findViewById',
        description: 'val etName = findViewById<EditText>(R.id.etStudentName).'
      },
      {
        step: 3,
        title: 'Populate Spinner with ArrayAdapter',
        description: 'ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, array).'
      },
      {
        step: 4,
        title: 'Set text on TextView',
        description: 'tvResult.text = resultText to display output.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting .toString() on etName.text in Kotlin.',
        fix: 'val name = etName.text.toString().trim()',
        why: 'etName.text returns an Editable, not a String; calling methods without toString() causes type mismatch errors.'
      },
      {
        mistake: 'Calling findViewById() before setContentView() in onCreate().',
        fix: 'Always call setContentView(R.layout.activity_main) first.',
        why: 'Calling findViewById() before the layout is inflated returns null and throws a NullPointerException.'
      }
    ],
    examAlerts: [
      'Exam Alert (The Master Project): "Create an application that takes Student Name, Roll Number, and Marks; uses a dropdown to select a course; on clicking Submit displays all details in a text view; validates no field is empty; shows Grade according to marks." — Study the complete Kotlin + XML code in this lesson!',
      'Exam Alert: "What is an ArrayAdapter in Android?" — Answer: An adapter that bridges a List or array of data into View items inside a Spinner or ListView.'
    ],
    practiceTask: {
      task: 'Write the 3 lines of Kotlin code to: (1) Find a Button with id "btnSubmit", (2) set an onClickListener, and (3) show a Toast saying "Button Clicked!".',
      hint: 'val btn = findViewById<Button>(R.id.btnSubmit); btn.setOnClickListener { Toast.makeText(this, "...", Toast.LENGTH_SHORT).show() }',
      solution: `val btn = findViewById<Button>(R.id.btnSubmit)
btn.setOnClickListener {
    Toast.makeText(this, "Button Clicked!", Toast.LENGTH_SHORT).show()
}`
    },
    quiz: [
      {
        id: 'q7-8-1',
        question: 'Which method inflates an XML layout and associates it with an Android Activity in Kotlin?',
        options: ['setContentView(R.layout.activity_main)', 'inflateLayout()', 'attachView()', 'loadXml()'],
        correctIndex: 0,
        explanation: 'setContentView() specifies the XML layout resource to be rendered by the Activity window.'
      },
      {
        id: 'q7-8-2',
        question: 'In native Android, which adapter class is commonly used to bind an array of Strings into a Spinner?',
        options: ['ArrayAdapter', 'BaseRecyclerViewAdapter', 'StringBinder', 'DropdownBridge'],
        correctIndex: 0,
        explanation: 'ArrayAdapter<String> is the standard collection adapter for Spinners and simple ListViews.'
      },
      {
        id: 'q7-8-3',
        question: 'What is the purpose of the ViewHolder class in a native Android RecyclerView.Adapter?',
        options: [
          'To download images from the internet',
          'To cache references to item views (findViewById) and avoid expensive layout traversals during scroll recycling',
          'To encrypt the SQLite database',
          'To compile Kotlin to bytecode'
        ],
        correctIndex: 1,
        explanation: 'ViewHolder caches child view lookups, ensuring 60fps smooth list scrolling.'
      },
      {
        id: 'q7-8-4',
        question: 'Which command lists all connected physical Android devices and running emulators via terminal?',
        options: ['adb devices', 'flutter list-phones', 'android check', 'phone-cli list'],
        correctIndex: 0,
        explanation: 'adb devices lists the serial numbers and states of all active Android instances.'
      },
      {
        id: 'q7-8-5',
        question: 'How do you set red validation error text directly on a native Android EditText in Kotlin?',
        options: ['editText.error = "Field is required"', 'editText.setErrorText()', 'editText.validate()', 'editText.showRedBox()'],
        correctIndex: 0,
        explanation: 'Setting editText.error = "..." displays a standard warning icon and popup message in native Android.'
      }
    ]
  }
];

