export interface TopicQuestion {
  id: string;
  topic: string;
  question: string;
  answer: string;
  codeSample?: string;
  examTip: string;
}

export const topicWiseQuestionBank: TopicQuestion[] = [
  {
    id: 'tb-1',
    topic: 'ListView & RecyclerView',
    question: 'What is the architectural difference between ListView and RecyclerView in Android, and what is Flutter\'s equivalent?',
    answer: 'In Android, the legacy ListView created new view objects or relied on convertViews clumsily. RecyclerView introduced the mandatory ViewHolder pattern, which aggressively caches references to view widgets and recycles off-screen views for high-performance scrolling. In Flutter, ListView.builder provides this exact lazy on-demand recycling behavior natively in just a few lines of code without requiring custom adapter classes.',
    codeSample: '// Flutter equivalent of Android RecyclerView:\nListView.builder(\n  itemCount: items.length,\n  itemBuilder: (context, index) => ListTile(title: Text(items[index])),\n)',
    examTip: 'Always mention the "ViewHolder recycling pattern" and compare it to Flutter\'s ListView.builder.',
  },
  {
    id: 'tb-2',
    topic: 'Spinner & Dropdown',
    question: 'How do you populate a Spinner in Android vs a DropdownButton in Flutter?',
    answer: 'In Android, a Spinner requires an ArrayAdapter or custom BaseAdapter initialized with a Context, layout resource (e.g. android.R.layout.simple_spinner_dropdown_item), and data array. In Flutter, DropdownButton or DropdownButtonFormField accepts a list of DropdownMenuItem<T> widgets created via list.map((item) => DropdownMenuItem(value: item, child: Text(item))).toList() and updates selected state in onChanged.',
    codeSample: '// Android: spinner.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, list)\n// Flutter: DropdownButtonFormField<String>(items: list.map(...).toList(), onChanged: (v) => ...)',
    examTip: 'Examiners look for the mention of "ArrayAdapter" for Android and "DropdownMenuItem" for Flutter.',
  },
  {
    id: 'tb-3',
    topic: 'EditText vs TextField',
    question: 'How do you extract text and handle validation in Android EditText vs Flutter TextFormField?',
    answer: 'In Android, you retrieve text via editText.text.toString().trim() and display errors with editText.error = "Error message". In Flutter, you attach a TextEditingController to read text via controller.text.trim(), and use a validator: (value) => ... callback inside a Form widget managed by a GlobalKey<FormState>.',
    codeSample: '// Android: if (et.text.isEmpty()) et.error = "Required"\n// Flutter: validator: (val) => val == null || val.isEmpty ? "Required" : null',
    examTip: 'Highlight that Flutter\'s validator returns null on success, and a String error message on failure.',
  },
  {
    id: 'tb-4',
    topic: 'BroadcastReceiver',
    question: 'Explain the purpose of a BroadcastReceiver, its primary callback, and how Flutter communicates with it.',
    answer: 'A BroadcastReceiver is an Android component that listens for system-wide announcements (e.g. battery low, boot completed, connectivity change) or app-specific custom broadcasts. Its primary callback is onReceive(Context context, Intent intent). Flutter communicates with BroadcastReceivers via an EventChannel, where onListen registers the native receiver and onReceive pipes event objects through an EventSink into a Dart Stream.',
    codeSample: '// Android: class MyReceiver : BroadcastReceiver() { override fun onReceive(c: Context?, i: Intent?) { ... } }',
    examTip: 'Always mention onReceive() and unregistering the receiver in onCancel() or onDestroy() to prevent memory leaks.',
  },
  {
    id: 'tb-5',
    topic: 'Services',
    question: 'Differentiate between a Started Service, a Bound Service, and a Foreground Service in Android.',
    answer: 'A Started Service is initiated via startService() and runs in the background indefinitely until it calls stopSelf() or is stopped. A Bound Service is started via bindService() and offers a client-server interface for inter-process communication (IPC), terminating when all clients unbind. A Foreground Service is an active service that performs operations noticeable to the user (e.g. audio playback, navigation) and is legally required by the Android OS to display an ongoing, non-dismissible notification.',
    codeSample: '// Android Manifest requirement: <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>',
    examTip: 'State clearly that Foreground Services MUST show a persistent notification in the status bar.',
  },
  {
    id: 'tb-6',
    topic: 'Android 4 Components',
    question: 'Name and describe the 4 core components of the Android operating system.',
    answer: '1. Activity: The user interface screen that users interact with. 2. Service: A background worker for long-running operations without UI. 3. Broadcast Receiver: A system event listener that wakes on OS announcements. 4. Content Provider: A mechanism for securely sharing structured application data between different apps.',
    examTip: 'This is the most asked question in junior/mid mobile engineering exams.',
  },
  {
    id: 'tb-7',
    topic: 'Intents',
    question: 'What is the distinction between Explicit and Implicit Intents?',
    answer: 'An Explicit Intent specifies the exact component/class name to launch (e.g. Intent(this, ProfileActivity::class.java)), typically used for intra-app navigation. An Implicit Intent specifies an action to perform (e.g. Intent.ACTION_VIEW or ACTION_SEND), allowing the Android OS to match capable third-party apps like browsers, cameras, or dialers.',
    codeSample: '// Explicit: Intent(this, SecondActivity::class.java)\n// Implicit: Intent(Intent.ACTION_VIEW, Uri.parse("https://flutter.dev"))',
    examTip: 'Explicit = exact class specified; Implicit = action specified, OS resolves.',
  },
  {
    id: 'tb-8',
    topic: 'Activity Lifecycle',
    question: 'Trace the lifecycle of an Android Activity when the home button is pressed and the app is later reopened.',
    answer: 'When the home button is pressed: onPause() -> onStop(). The activity is now stopped in the background. When reopened: onRestart() -> onStart() -> onResume(). If the OS ran out of memory while minimized, the activity may be destroyed (onDestroy) and recreated from scratch via onCreate().',
    examTip: 'Remember that onPause and onStop are called when minimized; onResume is called when active again.',
  },
  {
    id: 'tb-9',
    topic: 'SharedPreferences',
    question: 'What is SharedPreferences used for and how does Flutter access it?',
    answer: 'SharedPreferences is a lightweight persistent key-value store for storing primitive data (booleans, strings, ints, floats) across app restarts. In Flutter, the shared_preferences plugin wraps Android SharedPreferences (and iOS NSUserDefaults) with asynchronous Dart getters and setters: await prefs.setString("key", value).',
    codeSample: '// Flutter: final prefs = await SharedPreferences.getInstance(); await prefs.setString("roll", "101");',
    examTip: 'Remember that SharedPreferences is for small settings and flags, not for heavy relational datasets.',
  },
  {
    id: 'tb-10',
    topic: 'SQLite & Relational Storage',
    question: 'How is relational SQLite data managed in Android vs Flutter?',
    answer: 'In native Android, SQLite is managed either via the SQLiteOpenHelper class or Google\'s Room persistence library. In Flutter, SQLite is managed using the sqflite plugin (or Drift for type-safe reactive queries), which executes raw or mapped SQL statements asynchronously.',
    codeSample: '// Flutter: await db.insert("students", {"name": "Alex", "marks": 88});',
    examTip: 'Mention that sqflite operations are always asynchronous (returning Futures) to avoid blocking the UI thread.',
  },
  {
    id: 'tb-11',
    topic: 'Permissions',
    question: 'What is the difference between Normal and Dangerous permissions in Android?',
    answer: 'Normal permissions (e.g. INTERNET, ACCESS_NETWORK_STATE) present minimal risk to user privacy and are granted automatically at installation time upon declaration in AndroidManifest.xml. Dangerous permissions (e.g. CAMERA, ACCESS_FINE_LOCATION, READ_CONTACTS) access sensitive hardware or personal data and MUST be explicitly requested and granted by the user at runtime.',
    examTip: 'State that since Android 6.0 (Marshmallow / API 23), dangerous permissions require runtime prompts.',
  },
  {
    id: 'tb-12',
    topic: 'Student Marks Validation',
    question: 'Write the exact validation logic in both Flutter and Kotlin to verify student marks are between 0 and 100.',
    answer: 'In Flutter: parse with double.tryParse(); check if null or < 0 or > 100. In Kotlin: parse with text.toDoubleOrNull(); check if null or < 0 or > 100 and assign etMarks.error.',
    codeSample: '// Flutter: double? m = double.tryParse(val); if (m == null || m < 0 || m > 100) return "Invalid";\n// Kotlin: val m = et.text.toString().toDoubleOrNull(); if (m == null || m < 0 || m > 100) et.error = "Invalid"',
    examTip: 'Never use raw parse() without checking for null, or user typing letters will crash the app!',
  },
];

