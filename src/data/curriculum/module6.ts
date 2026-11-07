import { Lesson } from '../../types';

export const module6Lessons: Lesson[] = [
  {
    id: 'm6-l1',
    moduleId: 'module-6',
    title: 'Local Persistence: SharedPreferences, Hive, SQLite (sqflite & Drift)',
    description: 'Exam Critical: Persist data on the device! Master SharedPreferences (key-value), Hive (fast NoSQL), sqflite / Drift (relational SQL tables), and path_provider for file storage.',
    order: 1,
    durationMinutes: 18,
    difficulty: 'Intermediate',
    prerequisites: ['Module 5: State Management'],
    lastVerified: 'November 2026',
    goal: 'Persist settings with SharedPreferences, store offline student records using SQLite (sqflite), and know the exact mapping to Android SharedPreferences and Room/SQLite.',
    simpleExplanation: `When a user closes an app, all variables in RAM are wiped clean. To keep data permanently on the device, Flutter offers three main storage tiers:

### 1. \`shared_preferences\` (Key-Value Primitive Storage)
Direct equivalent to Android [SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences) and iOS UserDefaults. Install via the official [shared_preferences package](https://pub.dev/packages/shared_preferences).
Best for: user preferences, theme setting, auth tokens, remember-me flags.
\`\`\`dart
final prefs = await SharedPreferences.getInstance();
// Save:
await prefs.setString('student_name', 'Sarah');
await prefs.setDouble('last_marks', 92.5);
// Read:
String? name = prefs.getString('student_name');
\`\`\`

### 2. \`sqflite\` & \`Drift\` (Relational SQLite Database)
Direct equivalent to Android SQLiteOpenHelper or Room. Available via the [sqflite package](https://pub.dev/packages/sqflite) and [Drift Documentation](https://drift.simonbinder.eu/).
Best for: structured relational tables, complex queries, filtering, and large datasets (thousands of student rows).
\`\`\`dart
// Create table:
await db.execute('''
  CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll TEXT NOT NULL,
    marks REAL NOT NULL,
    grade TEXT NOT NULL
  )
''');

// Insert record:
await db.insert('students', {
  'name': 'Alex',
  'roll': '101',
  'marks': 88.0,
  'grade': 'A',
});
\`\`\`

### 3. \`Hive\` (Fast NoSQL Key-Value / Document Store)
Written in pure Dart. Super fast, zero native SQLite dependencies, stores objects directly in binary boxes. Explore [Hive on pub.dev](https://pub.dev/packages/hive).`,
    analogy: `Think of home storage:
- **SharedPreferences:** Sticky notes on your refrigerator. Perfect for quick reminders: "Milk in fridge", "Light theme enabled".
- **Hive:** A set of plastic storage tubs in your closet. Fast to open, toss clothes in, and pull out.
- **SQLite (sqflite):** A fireproof steel filing cabinet with labeled color-coded drawers, alphabetical folders, and index cards (SQL tables with rows and columns).`,
    codeSnippet: `import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Example: Saving and Loading Last Submitted Student with SharedPreferences
class PrefsStudentService {
  static const _keyName = 'saved_student_name';
  static const _keyMarks = 'saved_student_marks';

  // Save to disk
  Future<void> saveStudent({required String name, required double marks}) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyName, name);
    await prefs.setDouble(_keyMarks, marks);
  }

  // Load from disk
  Future<Map<String, dynamic>?> loadStudent() async {
    final prefs = await SharedPreferences.getInstance();
    final name = prefs.getString(_keyName);
    final marks = prefs.getDouble(_keyMarks);

    if (name != null && marks != null) {
      return {'name': name, 'marks': marks};
    }
    return null;
  }

  // Clear data
  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_keyName);
    await prefs.remove(_keyMarks);
  }
}`,
    dartPadCode: `// Simulated Key-Value Store logic:
class MockStorage {
  final Map<String, dynamic> _disk = {};

  Future<void> setString(String key, String val) async => _disk[key] = val;
  String? getString(String key) => _disk[key];
}

void main() async {
  var storage = MockStorage();
  await storage.setString('course', 'Flutter Course 2026');
  print('Saved on disk: \${storage.getString("course")}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Choose the storage tier',
        description: 'For small key-value flags, choose SharedPreferences. For tables and queries, choose SQLite.'
      },
      {
        step: 2,
        title: 'SharedPreferences is asynchronous',
        description: 'Always use await SharedPreferences.getInstance() since reading from disk is an I/O operation.'
      },
      {
        step: 3,
        title: 'SQLite schema definition',
        description: 'In sqflite, define primary keys (id INTEGER PRIMARY KEY) to identify rows uniquely.'
      },
      {
        step: 4,
        title: 'path_provider for custom files',
        description: 'Use getApplicationDocumentsDirectory() from path_provider to find the OS-approved sandbox directory.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Storing thousands of records in SharedPreferences as a huge serialized JSON string.',
        fix: 'Use SQLite (sqflite/Drift) or Hive for lists of items.',
        why: 'SharedPreferences loads all keys into memory upon startup; storing megabytes of data causes app launch freezes.'
      },
      {
        mistake: 'Hardcoding file paths like /data/data/com.example/files/.',
        fix: 'Always use path_provider to resolve getApplicationDocumentsDirectory() dynamically.',
        why: 'File paths change across Android versions, storage partitions, and iOS sandboxes.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the Flutter equivalent of Android\'s SharedPreferences?" — Answer: The shared_preferences plugin (providing asynchronous key-value storage backed by NSUserDefaults on iOS and SharedPreferences on Android).',
      'Exam Alert: "Which database package is used for relational SQL database persistence in Flutter?" — Answer: sqflite (or Drift).'
    ],
    practiceTask: {
      task: 'Write a Dart function using SharedPreferences that stores the student\'s dark mode preference (bool isDarkMode) and a function to read it with a fallback default of false.',
      hint: 'await prefs.setBool("dark_mode", isDark); return prefs.getBool("dark_mode") ?? false;',
      solution: `Future<void> saveThemeMode(bool isDark) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool('dark_mode', isDark);
}

Future<bool> getThemeMode() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool('dark_mode') ?? false;
}`
    },
    quiz: [
      {
        id: 'q6-1-1',
        question: 'Which Flutter plugin is used for simple key-value persistence equivalent to native Android SharedPreferences?',
        options: ['sqflite', 'shared_preferences', 'path_provider', 'http'],
        correctIndex: 1,
        explanation: 'shared_preferences wraps platform-specific persistent key-value storage.'
      },
      {
        id: 'q6-1-2',
        question: 'What type of database is SQLite (sqflite in Flutter)?',
        options: ['Graph Database', 'Relational SQL Database with tables and columns', 'NoSQL Key-Value only', 'Cloud Memory Cache'],
        correctIndex: 1,
        explanation: 'SQLite is a lightweight, relational, serverless SQL database engine.'
      },
      {
        id: 'q6-1-3',
        question: 'Which package is required to find safe system directory paths (such as ApplicationDocumentsDirectory) on mobile devices?',
        options: ['path_provider', 'directory_finder', 'storage_locator', 'os_files'],
        correctIndex: 0,
        explanation: 'path_provider finds commonly used locations on the host filesystem (Temporary, Documents, Support).'
      },
      {
        id: 'q6-1-4',
        question: 'Why does SharedPreferences.getInstance() return a Future?',
        options: [
          'Because reading from disk flash storage requires an asynchronous I/O operation that cannot block the UI',
          'It downloads from Google Drive',
          'It is a bug',
          'Only on Windows'
        ],
        correctIndex: 0,
        explanation: 'Asynchronous initialization prevents disk reads from blocking the 60fps main UI thread.'
      },
      {
        id: 'q6-1-5',
        question: 'When should you choose sqflite over shared_preferences?',
        options: [
          'When saving a single boolean switch setting',
          'When storing structured relational tables, indexing, searching, or managing large datasets',
          'Never',
          'Only when building for web'
        ],
        correctIndex: 1,
        explanation: 'sqflite is optimized for complex queries and tabular structured persistence.'
      }
    ]
  },
  {
    id: 'm6-l2',
    moduleId: 'module-6',
    title: 'HTTP & Dio: REST APIs, JSON Parsing, json_serializable & FutureBuilder',
    description: 'Connect Flutter to the world! Fetch data with http and Dio, serialize and deserialize JSON models, display loading/error/success states, and master FutureBuilder.',
    order: 2,
    durationMinutes: 18,
    difficulty: 'Intermediate',
    prerequisites: ['Module 6 Lesson 1: Local Storage'],
    lastVerified: 'November 2026',
    goal: 'Make GET and POST requests using http/Dio, convert JSON into strongly-typed Dart objects with fromJson, and render asynchronous UI cleanly with FutureBuilder.',
    simpleExplanation: `Almost every real-world mobile app talks to a backend server through **REST APIs** using HTTP and JSON. Check the official packages: [http on pub.dev](https://pub.dev/packages/http) and [Dio on pub.dev](https://pub.dev/packages/dio), plus the [Flutter Cookbook on Fetching Data](https://docs.flutter.dev/cookbook/networking/fetch-data).

### 1. The \`http\` Package
\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Student> fetchStudent() async {
  final response = await http.get(Uri.parse('https://api.example.com/students/101'));

  if (response.statusCode == 200) {
    // Parse JSON string into Map
    final Map<String, dynamic> data = jsonDecode(response.body);
    return Student.fromJson(data);
  } else {
    throw Exception('Failed to load student: \${response.statusCode}');
  }
}
\`\`\`

### 2. Serializing JSON with \`fromJson\` and \`toJson\`
Always parse raw JSON maps into strongly-typed model objects:
\`\`\`dart
class Student {
  final String name;
  final double marks;

  Student({required this.name, required this.marks});

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      name: json['name'] as String,
      marks: (json['marks'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {'name': name, 'marks': marks};
}
\`\`\`

### 3. Rendering with \`FutureBuilder\`
\`FutureBuilder\` takes a Future and automatically handles the 3 visual states:
- **Loading:** \`snapshot.connectionState == ConnectionState.waiting\` (show \`CircularProgressIndicator\`)
- **Error:** \`snapshot.hasError\` (show error text or retry button)
- **Success:** \`snapshot.hasData\` (show the loaded widget!)`,
    analogy: `Think of ordering room service at a hotel:
- **FutureBuilder:** The hotel room TV screen.
- **ConnectionState.waiting:** The screen shows: "Your pizza is baking in the oven..." with a rotating chef hat.
- **snapshot.hasError:** The screen shows: "Our oven broke! Tap here to re-order."
- **snapshot.hasData:** The doorbell rings and the pizza is served hot on your table!`,
    codeSnippet: `import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class StudentApiDemo extends StatelessWidget {
  const StudentApiDemo({super.key});

  Future<Map<String, dynamic>> fetchStudentData() async {
    final uri = Uri.parse('https://jsonplaceholder.typicode.com/users/1');
    final res = await http.get(uri);

    if (res.statusCode == 200) {
      return jsonDecode(res.body);
    } else {
      throw Exception('Server error: \${res.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('API & FutureBuilder Demo')),
      body: Center(
        child: FutureBuilder<Map<String, dynamic>>(
          future: fetchStudentData(),
          builder: (context, snapshot) {
            // 1. Loading State
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            }
            // 2. Error State
            if (snapshot.hasError) {
              return Text('Error: \${snapshot.error}', style: const TextStyle(color: Colors.red));
            }
            // 3. Success State
            if (snapshot.hasData) {
              final user = snapshot.data!;
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('Name: \${user['name']}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      Text('Email: \${user['email']}'),
                      Text('City: \${user['address']['city']}'),
                    ],
                  ),
                ),
              );
            }
            return const Text('No data');
          },
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'dart:convert';

class Student {
  final String name;
  final int marks;
  Student({required this.name, required this.marks});

  factory Student.fromJson(Map<String, dynamic> json) =>
      Student(name: json['name'], marks: json['marks']);
}

void main() {
  String jsonString = '{"name": "Alex", "marks": 94}';
  Map<String, dynamic> map = jsonDecode(jsonString);
  Student s = Student.fromJson(map);

  print('Parsed Student: \${s.name}, Marks: \${s.marks}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Parse URI with Uri.parse()',
        description: 'Modern http package requires a Uri object rather than a raw string.'
      },
      {
        step: 2,
        title: 'Check response.statusCode == 200',
        description: 'HTTP status 200 means OK. Any other status (400, 404, 500) must be handled gracefully.'
      },
      {
        step: 3,
        title: 'jsonDecode transforms text to Map',
        description: 'dart:convert provides jsonDecode() to convert raw JSON strings into Map<String, dynamic>.'
      },
      {
        step: 4,
        title: 'Handle connection states in FutureBuilder',
        description: 'Always handle ConnectionState.waiting, snapshot.hasError, and snapshot.hasData.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Instantiating the Future directly inside FutureBuilder: future: fetchStudentData().',
        fix: 'Assign the Future to a variable in initState() or use a state manager.',
        why: 'If created directly inside build(), every time the widget rebuilds, it re-executes the network call in an infinite loop!'
      },
      {
        mistake: 'Assuming JSON numbers are always int: int marks = json["marks"];',
        fix: 'Use (json["marks"] as num).toDouble() or double.tryParse().',
        why: 'In JSON, 90 might be parsed as an int, but 90.5 is a double. Using "as num" safely handles both.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What are the three states handled by a FutureBuilder?" — Answer: Waiting / Loading (ConnectionState.waiting), Error (snapshot.hasError), and Success / Done (snapshot.hasData).',
      'Exam Alert: "Which built-in Dart library converts JSON strings to Dart maps?" — Answer: dart:convert (using jsonDecode() and jsonEncode()).'
    ],
    practiceTask: {
      task: 'Write a factory constructor "Student.fromJson(Map<String, dynamic> json)" for a model with fields: id (int), name (String), and marks (double).',
      hint: 'marks: (json["marks"] as num).toDouble()',
      solution: `factory Student.fromJson(Map<String, dynamic> json) {
  return Student(
    id: json['id'] as int,
    name: json['name'] as String,
    marks: (json['marks'] as num).toDouble(),
  );
}`
    },
    quiz: [
      {
        id: 'q6-2-1',
        question: 'Which Dart library function parses a JSON-formatted string into a Dart Map or List?',
        options: ['jsonDecode()', 'jsonParse()', 'JSON.parse()', 'jsonExtract()'],
        correctIndex: 0,
        explanation: 'jsonDecode() from dart:convert deserializes JSON strings into Dart objects.'
      },
      {
        id: 'q6-2-2',
        question: 'What HTTP status code indicates a successful GET request?',
        options: ['404', '200', '500', '301'],
        correctIndex: 1,
        explanation: 'HTTP 200 OK signals that the request succeeded.'
      },
      {
        id: 'q6-2-3',
        question: 'Why should you avoid creating a new Future directly inside the future: parameter of FutureBuilder during build()?',
        options: [
          'It is unsupported on iOS',
          'Every time the parent widget rebuilds, the Future will re-trigger, resulting in redundant network requests',
          'It deletes the app',
          'It causes a Dart syntax error'
        ],
        correctIndex: 1,
        explanation: 'Creating futures inside build() causes repeated network requests on every frame update.'
      },
      {
        id: 'q6-2-4',
        question: 'How do you check if an error occurred during asynchronous data retrieval in FutureBuilder?',
        options: ['if (snapshot.hasError)', 'if (snapshot.failed)', 'if (snapshot.isError())', 'if (error != null)'],
        correctIndex: 0,
        explanation: 'snapshot.hasError returns true if the Future completed with an exception.'
      },
      {
        id: 'q6-2-5',
        question: 'What is the advantage of Dio over the standard http package?',
        options: [
          'Dio includes interceptors, global base URL configuration, request cancellation, and file upload progress out of the box',
          'Dio is written in Java',
          'Dio works without internet',
          'Dio doesn\'t need JSON'
        ],
        correctIndex: 0,
        explanation: 'Dio is an advanced HTTP client featuring interceptors, transformer, and request cancellation.'
      }
    ]
  },
  {
    id: 'm6-l3',
    moduleId: 'module-6',
    title: 'Firebase Suite: Auth, Firestore, Storage & Push Notifications',
    description: 'Add a full Google backend! Configure FlutterFire, authenticate users (email/password), store real-time documents in Cloud Firestore, upload files to Storage, and receive FCM push notifications.',
    order: 3,
    durationMinutes: 20,
    difficulty: 'Intermediate',
    prerequisites: ['Module 6 Lesson 2: HTTP & REST'],
    lastVerified: 'November 2026',
    goal: 'Initialize Firebase using flutterfire configure, authenticate users with firebase_auth, perform CRUD operations in Cloud Firestore, and understand push notifications.',
    simpleExplanation: `[Firebase](https://firebase.google.com/) is Google's Backend-as-a-Service (BaaS). It lets Flutter developers build complete serverless applications without writing a custom backend. Get started with the [FlutterFire CLI & Docs](https://firebase.google.com/docs/flutter/setup) and explore the [Firebase Console](https://console.firebase.google.com/).

### 1. \`firebase_auth\` (User Authentication)
Supports Email/Password, Google Sign-In, Phone SMS, and Apple ID in minutes via [firebase_auth on pub.dev](https://pub.dev/packages/firebase_auth):
\`\`\`dart
// Sign In
await FirebaseAuth.instance.signInWithEmailAndPassword(
  email: 'alex@example.com',
  password: 'SecurePassword123',
);

// Auth state stream (reacts instantly when user logs in or out!)
FirebaseAuth.instance.authStateChanges().listen((User? user) {
  print(user == null ? 'User logged out' : 'User: \${user.email}');
});
\`\`\`

### 2. \`cloud_firestore\` (Real-Time NoSQL Database)
Organized into **Collections** (like folders) containing **Documents** (like JSON files), powered by [cloud_firestore on pub.dev](https://pub.dev/packages/cloud_firestore):
\`\`\`dart
// Save student document
await FirebaseFirestore.instance.collection('students').add({
  'name': 'Sarah Connor',
  'roll': '101',
  'marks': 95.0,
  'createdAt': FieldValue.serverTimestamp(),
});

// Realtime Stream of students (updates UI automatically!)
StreamBuilder<QuerySnapshot>(
  stream: FirebaseFirestore.instance.collection('students').snapshots(),
  builder: (context, snapshot) { ... },
)
\`\`\`

### 3. \`firebase_storage\`
Upload student profile photos, PDF certificates, or audio recordings.

### 4. \`firebase_messaging\` (FCM - Push Notifications)
Send remote notifications from the cloud to wake up the app and alert the user.`,
    analogy: `Think of Firebase like a ready-built luxury apartment building:
- **Firebase Auth:** The front desk security guard who checks IDs and hands out room keys.
- **Cloud Firestore:** A shared digital whiteboard in the lobby. The moment anyone writes a note on the board, every resident's personal monitor updates instantly in real time!
- **Firebase Storage:** The building's locker room where residents store bulky luggage and photo albums.
- **FCM:** The building PA loudspeaker that broadcasts urgent announcements to all apartments!`,
    codeSnippet: `import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

// Real-time Student List reading from Cloud Firestore
class FirestoreStudentList extends StatelessWidget {
  const FirestoreStudentList({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Realtime Firestore Students')),
      body: StreamBuilder<QuerySnapshot>(
        // Stream updates automatically when ANY device changes Firestore!
        stream: FirebaseFirestore.instance
            .collection('students')
            .orderBy('marks', descending: true)
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: \${snapshot.error}'));
          }
          final docs = snapshot.data?.docs ?? [];
          if (docs.isEmpty) {
            return const Center(child: Text('No students enrolled yet.'));
          }

          return ListView.builder(
            itemCount: docs.length,
            itemBuilder: (context, index) {
              final data = docs[index].data() as Map<String, dynamic>;
              return ListTile(
                leading: CircleAvatar(child: Text('\${index + 1}')),
                title: Text(data['name'] ?? 'Unknown'),
                subtitle: Text('Roll: \${data['roll']} • Marks: \${data['marks']}'),
              );
            },
          );
        },
      ),
    );
  }
}`,
    dartPadCode: `// Mental model of Firestore Collection/Document hierarchy:
void main() {
  Map<String, dynamic> firestore = {
    "students": {
      "doc_001": {"name": "Aarav", "marks": 92.5, "course": "Flutter"},
      "doc_002": {"name": "Diya", "marks": 88.0, "course": "Android"}
    }
  };

  print('Firestore collection "students":');
  firestore["students"]!.forEach((docId, data) {
    print('Document: \$docId -> \${data["name"]} scored \${data["marks"]}');
  });
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Run flutterfire configure',
        description: 'The official FlutterFire CLI generates firebase_options.dart, automatically registering Android and iOS apps.'
      },
      {
        step: 2,
        title: 'Initialize in main()',
        description: 'Call WidgetsFlutterBinding.ensureInitialized(); await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform); before runApp.'
      },
      {
        step: 3,
        title: 'Use StreamBuilder with snapshots()',
        description: '.snapshots() returns a real-time Stream; StreamBuilder updates UI automatically whenever Firestore data changes.'
      },
      {
        step: 4,
        title: 'Firestore security rules',
        description: 'Never leave Firestore open with allow read, write: if true; in production. Always enforce authentication rules.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting WidgetsFlutterBinding.ensureInitialized() before Firebase.initializeApp().',
        fix: 'Always add WidgetsFlutterBinding.ensureInitialized(); at the very start of main().',
        why: 'Flutter must initialize native platform channels before Firebase native bridges can be contacted.'
      },
      {
        mistake: 'Leaving Firestore security rules in Test Mode permanently.',
        fix: 'Configure production rules that verify request.auth != null.',
        why: 'Test mode rules expire after 30 days or leave your database exposed to unauthorized access.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What line of code must be called before Firebase.initializeApp() in main()?" — Answer: WidgetsFlutterBinding.ensureInitialized().',
      'Exam Alert: "How do you listen to real-time database updates from Cloud Firestore in Flutter?" — Answer: Using StreamBuilder bound to a collection or document .snapshots() stream.'
    ],
    practiceTask: {
      task: 'Write a function "addStudentRecord" that adds a new document containing {name, roll, marks, timestamp} to the "students" collection in Cloud Firestore.',
      hint: 'await FirebaseFirestore.instance.collection("students").add({...})',
      solution: `Future<void> addStudentRecord({
  required String name,
  required String roll,
  required double marks,
}) async {
  await FirebaseFirestore.instance.collection('students').add({
    'name': name,
    'roll': roll,
    'marks': marks,
    'timestamp': FieldValue.serverTimestamp(),
  });
}`
    },
    quiz: [
      {
        id: 'q6-3-1',
        question: 'What method must be called in main() before initializing Firebase in a Flutter app?',
        options: [
          'WidgetsFlutterBinding.ensureInitialized()',
          'runApp()',
          'SystemChrome.setOrientation()',
          'Dart.start()'
        ],
        correctIndex: 0,
        explanation: 'WidgetsFlutterBinding.ensureInitialized() ensures binary messenger channels are active for native plugins.'
      },
      {
        id: 'q6-3-2',
        question: 'How is data organized inside Google Cloud Firestore?',
        options: [
          'Tables and rows with foreign keys',
          'Collections containing Documents (NoSQL JSON-like structure)',
          'Single CSV text files',
          'Binary blobs only'
        ],
        correctIndex: 1,
        explanation: 'Cloud Firestore is a document-oriented NoSQL database organized into collections and documents.'
      },
      {
        id: 'q6-3-3',
        question: 'Which method on a Firestore collection returns a real-time Stream of query changes?',
        options: ['.get()', '.snapshots()', '.stream()', '.listenOnce()'],
        correctIndex: 1,
        explanation: '.snapshots() yields real-time query updates as documents are added, modified, or removed.'
      },
      {
        id: 'q6-3-4',
        question: 'What is the purpose of Firebase Cloud Messaging (FCM)?',
        options: [
          'Sending push notifications and data messages to client devices across Android and iOS',
          'Compressing videos',
          'Managing SQL joins',
          'Generating passwords'
        ],
        correctIndex: 0,
        explanation: 'FCM is a cross-platform messaging solution for sending push notifications.'
      },
      {
        id: 'q6-3-5',
        question: 'Which Firebase service is designed specifically for storing user-uploaded media files like images and videos?',
        options: ['Firebase Storage', 'Cloud Firestore', 'Firebase Hosting', 'Crashlytics'],
        correctIndex: 0,
        explanation: 'Firebase Storage provides secure Google Cloud Storage buckets for user-generated content.'
      }
    ]
  },
  {
    id: 'm6-l4',
    moduleId: 'module-6',
    title: 'Clean Architecture, MVVM & Dependency Injection with get_it',
    description: 'Learn enterprise software craftsmanship: Model-View-ViewModel (MVVM), Clean Architecture layering (Data, Domain, Presentation), Repository pattern, and Service Locator with get_it.',
    order: 4,
    durationMinutes: 16,
    difficulty: 'Advanced',
    prerequisites: ['Module 6 Lessons 1-3'],
    lastVerified: 'November 2026',
    goal: 'Structure enterprise Flutter projects using MVVM and the Repository pattern, decouple dependencies via interfaces, and register services with get_it.',
    simpleExplanation: `Putting network calls, database queries, and UI widgets all inside one file creates spaghetti code that is impossible to test. Professional Flutter engineers use **Clean Architecture** and **MVVM**.

### The 3 Layers of Clean Architecture:
1. **Presentation Layer (UI & ViewModels):**
   - **Views (Widgets):** Renders the screen, collects user taps.
   - **ViewModels (or Cubits / Providers):** Holds UI state and handles presentation logic.
2. **Domain Layer (Core Business Rules):**
   - **Entities:** Pure Dart classes (e.g. \`Student\`).
   - **Use Cases:** Actions the user can perform (e.g. \`CalculateGradeUseCase\`, \`RegisterStudentUseCase\`).
   - **Repository Interfaces:** Defines the contract (\`abstract class StudentRepository\`).
3. **Data Layer (Data Sources & Impls):**
   - **Data Sources:** Local database (sqflite/Hive) or Remote API (http/Dio).
   - **Repository Implementation:** Decides whether to fetch from cache or API.

### Dependency Injection with \`get_it\`
Instead of creating instances with \`new StudentService()\` everywhere, register them in a **Service Locator** (\`get_it\`):
\`\`\`dart
final getIt = GetIt.instance;

void setupLocator() {
  getIt.registerLazySingleton<StudentRepository>(() => StudentRepositoryImpl());
}

// Anywhere in your app:
final repo = getIt<StudentRepository>();
\`\`\`
This makes it trivial to swap in a fake/mock repository during testing!`,
    analogy: `Think of a luxury restaurant:
- **Presentation Layer (View):** The elegant dining room, the menu card, and the waiter taking your order.
- **Domain Layer (Use Case):** The head chef's secret recipes and menu standards: "A steak must always be seasoned with garlic and butter."
- **Data Layer (Data Source):** The refrigerator, pantry, and local butcher where raw ingredients are sourced.
The diner in the dining room never walks into the kitchen to inspect the freezer!`,
    codeSnippet: `import 'package:flutter/material.dart';

// 1. Domain: Entity
class StudentEntity {
  final String name;
  final double marks;
  StudentEntity({required this.name, required this.marks});

  String get grade => marks >= 90 ? 'A+' : marks >= 80 ? 'A' : 'Pass';
}

// 2. Domain: Repository Interface (Contract)
abstract class StudentRepository {
  Future<List<StudentEntity>> getStudents();
  Future<void> saveStudent(StudentEntity student);
}

// 3. Data: Concrete Implementation
class MockStudentRepositoryImpl implements StudentRepository {
  final List<StudentEntity> _inMemoryDb = [
    StudentEntity(name: 'Aarav', marks: 95.0),
    StudentEntity(name: 'Diya', marks: 84.0),
  ];

  @override
  Future<List<StudentEntity>> getStudents() async {
    await Future.delayed(const Duration(milliseconds: 300));
    return _inMemoryDb;
  }

  @override
  Future<void> saveStudent(StudentEntity student) async {
    _inMemoryDb.add(student);
  }
}

// 4. Presentation: ViewModel
class StudentViewModel extends ChangeNotifier {
  final StudentRepository _repository;
  StudentViewModel({required StudentRepository repository}) : _repository = repository;

  List<StudentEntity> _students = [];
  List<StudentEntity> get students => _students;

  Future<void> load() async {
    _students = await _repository.getStudents();
    notifyListeners();
  }
}`,
    dartPadCode: `// Demonstration of Dependency Inversion:
abstract class DiscountService {
  double getDiscount(double bill);
}

class StandardDiscount implements DiscountService {
  double getDiscount(double bill) => bill * 0.10;
}

class Checkout {
  final DiscountService discountService;
  Checkout(this.discountService); // Injected!

  double computePayable(double bill) => bill - discountService.getDiscount(bill);
}

void main() {
  var checkout = Checkout(StandardDiscount());
  print('Payable on \$200: \$\${checkout.computePayable(200)}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Define abstract Repository interface',
        description: 'Define the methods your app needs without caring whether data comes from SQLite, REST, or Firebase.'
      },
      {
        step: 2,
        title: 'Implement repository in data layer',
        description: 'The implementation calls API or database and converts raw maps to domain entities.'
      },
      {
        step: 3,
        title: 'Inject via constructor',
        description: 'Pass the repository interface into your ViewModel / Cubit constructor.'
      },
      {
        step: 4,
        title: 'Register in get_it',
        description: 'Use getIt.registerLazySingleton<Repository>(() => RepositoryImpl()) for clean dependency management.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Directly calling http.get() or database queries inside a Widget build() or State class.',
        fix: 'Delegate all data fetching to a Repository or Service class.',
        why: 'Coupling UI to network calls violates separation of concerns and makes unit testing impossible.'
      },
      {
        mistake: 'Leaking UI models or BuildContext into the Domain layer.',
        fix: 'Domain layer must contain 100% pure Dart code with zero Flutter widget imports.',
        why: 'Domain logic should be testable on any machine without rendering Flutter UI.'
      }
    ],
    examAlerts: [
      'Exam Alert (Architecture Question): "What is the Repository Pattern in Flutter?" — Answer: An architectural design pattern that mediates between the domain/business logic and data mapping layers, providing a clean abstract interface for data access regardless of the underlying source (API, SQLite, Firebase).',
      'Exam Alert: "What is the purpose of the get_it package?" — Answer: It is a simple Service Locator for Dart and Flutter used for Dependency Injection (DI) to decouple class creation from class usage.'
    ],
    practiceTask: {
      task: 'Define an abstract class "DiscountCalculator" with method double calculate(double originalPrice, double percentage). Create a class "SimpleDiscountCalculator" that implements it.',
      hint: 'abstract class DiscountCalculator { double calculate(double originalPrice, double percentage); }',
      solution: `abstract class DiscountCalculator {
  double calculate(double originalPrice, double percentage);
}

class SimpleDiscountCalculator implements DiscountCalculator {
  @override
  double calculate(double originalPrice, double percentage) {
    return originalPrice - (originalPrice * percentage / 100.0);
  }
}`
    },
    quiz: [
      {
        id: 'q6-4-1',
        question: 'What is the primary role of the Repository Pattern?',
        options: [
          'To format text with CSS',
          'To isolate the domain and UI from the concrete details of data sources (API, SQLite, Firebase) behind an abstract contract',
          'To speed up CPU clock speed',
          'To replace Flutter widgets'
        ],
        correctIndex: 1,
        explanation: 'Repositories abstract data access logic, making applications modular and testable.'
      },
      {
        id: 'q6-4-2',
        question: 'What is get_it commonly used for in Flutter applications?',
        options: [
          'Service Locator / Dependency Injection',
          'Rendering SVG icons',
          'Managing SQLite transactions',
          'Bluetooth communication'
        ],
        correctIndex: 0,
        explanation: 'get_it is the standard Service Locator in Dart for dependency injection.'
      },
      {
        id: 'q6-4-3',
        question: 'Why should the Domain layer in Clean Architecture avoid importing package:flutter/material.dart?',
        options: [
          'Because material.dart is illegal in Dart',
          'To keep business rules pure, platform-independent, and easily testable without UI dependencies',
          'It causes compile crashes on Mac',
          'To save battery'
        ],
        correctIndex: 1,
        explanation: 'The Domain layer contains pure business logic and should have no dependence on UI frameworks.'
      },
      {
        id: 'q6-4-4',
        question: 'In MVVM architecture, what does the ViewModel do?',
        options: [
          'Renders pixels on the GPU',
          'Holds the presentation state and executes business use cases, exposing observable data to the View',
          'Executes raw SQL queries directly',
          'Manages phone orientation'
        ],
        correctIndex: 1,
        explanation: 'The ViewModel transforms domain data into view-ready state.'
      },
      {
        id: 'q6-4-5',
        question: 'What is the main benefit of Dependency Injection when writing unit tests?',
        options: [
          'You can inject mock or fake implementations of repositories without hitting real servers or databases',
          'Tests run on real phones',
          'It writes the tests automatically',
          'It requires no assertions'
        ],
        correctIndex: 0,
        explanation: 'DI allows injecting fake or mock repositories, enabling fast, isolated, deterministic tests.'
      }
    ]
  }
];

