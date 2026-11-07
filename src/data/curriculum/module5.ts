import { Lesson } from '../../types';

export const module5Lessons: Lesson[] = [
  {
    id: 'm5-l1',
    moduleId: 'module-5',
    title: 'Why State Management is Needed: Ephemeral vs App State',
    description: 'Understand what state is, the difference between Ephemeral (local) and App (global) state, and why setState() falls short in multi-screen applications.',
    order: 1,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['Module 2: Flutter UI Basics'],
    lastVerified: 'November 2026',
    goal: 'Distinguish between Ephemeral state and App state, understand prop drilling, and know when a state management library is required.',
    simpleExplanation: `**State** is any piece of data that your app needs to remember and that can change over time (e.g. current user, cart items, theme setting, student records).

Flutter categorizes state into two types:

### 1. Ephemeral State (Local UI State)
State that only a **single widget** cares about and that doesn't need to be shared across screens:
- Current page in a \`PageView\`
- Whether a dropdown is expanded
- An obscure password toggle (eye icon)
- An animation progress tick
**Tool for Ephemeral State:** Simple \`setState()\` inside a \`StatefulWidget\`! No external library needed.

### 2. App State (Shared Global State)
State that is needed by **multiple different screens or distant widgets** in the tree:
- User login authentication status and profile
- A shopping cart badge showing item count across the whole app
- The list of submitted students shared between the Registration form and the Student Directory
- Application theme (Light vs Dark mode)

### The "Prop Drilling" Problem
Without an app state solution, to pass a \`Student\` object from Screen A down to a widget 6 levels deep, you have to pass it through every single intermediate widget constructor. This is called **prop drilling** and quickly becomes an unmaintainable nightmare!`,
    analogy: `Think of a house intercom vs a personal wristwatch:
- **Ephemeral State:** Your personal wristwatch. Only you check the time on your wrist. Nobody in the other room needs to know your watch brand.
- **App State:** The main front door doorbell and security alarm system. When someone rings the doorbell, the chime sounds in the living room, kitchen, bedroom, and backyard all at once!`,
    codeSnippet: `// Ephemeral State Example: perfectly fine with setState()!
class PasswordField extends StatefulWidget {
  const PasswordField({super.key});

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  // Only this single text field cares about whether password is obscured
  bool _obscure = true;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscureText: _obscure,
      decoration: InputDecoration(
        labelText: 'Password',
        suffixIcon: IconButton(
          icon: Icon(_obscure ? Icons.visibility_off : Icons.visibility),
          onPressed: () => setState(() => _obscure = !_obscure),
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: EphemeralDemo()))));

class EphemeralDemo extends StatefulWidget {
  const EphemeralDemo({super.key});
  @override
  State<EphemeralDemo> createState() => _EphemeralDemoState();
}

class _EphemeralDemoState extends State<EphemeralDemo> {
  bool isLiked = false;
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(isLiked ? Icons.favorite : Icons.favorite_border, color: Colors.red, size: 48),
      onPressed: () => setState(() => isLiked = !isLiked),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Identify state scope',
        description: 'Ask: "Do any other widgets outside this component need to read or modify this data?"'
      },
      {
        step: 2,
        title: 'Use setState for local widgets',
        description: 'If the answer is NO, use a StatefulWidget with setState(). Do not overengineer with global state.'
      },
      {
        step: 3,
        title: 'Use App State for shared data',
        description: 'If multiple widgets need the data, lift state up to an inherited provider, BLoC, or Riverpod.'
      },
      {
        step: 4,
        title: 'Avoid prop drilling',
        description: 'Passing callbacks and objects through 5 intermediate constructors is a red flag to adopt state management.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using complex BLoC or Riverpod for a simple single-screen animation or checkbox.',
        fix: 'Use basic setState() or ValueNotifier for isolated widget toggles.',
        why: 'Overengineering local state creates hundreds of lines of needless boilerplate.'
      },
      {
        mistake: 'Using setState() at the root MyApp level to update global data.',
        fix: 'Use Provider, Riverpod, or BLoC.',
        why: 'Calling setState() at the root forces the entire app and all subtrees to rebuild, destroying performance.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between Ephemeral State and App State?" — Answer: Ephemeral state is local to a single widget (e.g. animation ticker, tab index); App state is shared across multiple screens or throughout the entire app (e.g. authentication, cart items, user profile).',
      'Exam Alert: "What is prop drilling in Flutter?" — Answer: The tedious anti-pattern of passing data down through multiple levels of intermediate widget constructors that do not use the data themselves.'
    ],
    practiceTask: {
      task: 'Categorize the following as Ephemeral or App State: (1) Selected tab in BottomNavigationBar, (2) User Authentication Token, (3) Dropdown expanded status, (4) Cart items count.',
      hint: 'Local to 1 widget = Ephemeral; Needed across screens = App State.',
      solution: `1. Selected tab: Ephemeral State
2. User Auth Token: App State
3. Dropdown expanded: Ephemeral State
4. Cart items count: App State`
    },
    quiz: [
      {
        id: 'q5-1-1',
        question: 'Which of the following is the best example of Ephemeral (local) state?',
        options: [
          'User authentication status',
          'Current theme mode (dark vs light) for the whole app',
          'A boolean flag tracking whether a password field text is obscured',
          'Items in a global shopping cart'
        ],
        correctIndex: 2,
        explanation: 'Password obscuring is local to the single text field widget and doesn\'t affect other screens.'
      },
      {
        id: 'q5-1-2',
        question: 'What is the term for passing data down through several layers of widgets that don\'t need the data themselves?',
        options: ['State lifting', 'Prop drilling', 'Widget bubbling', 'Tree climbing'],
        correctIndex: 1,
        explanation: 'Prop drilling occurs when data is threaded through constructors solely to reach a deeply nested child.'
      },
      {
        id: 'q5-1-3',
        question: 'Why should you avoid calling setState() at the root MaterialApp widget to manage global state?',
        options: [
          'It deletes the SQLite database',
          'It causes the entire widget tree to rebuild unnecessarily, leading to frame drops and memory overhead',
          'It is illegal in Dart',
          'It disconnects from the internet'
        ],
        correctIndex: 1,
        explanation: 'Root rebuilds trigger rebuilds of all descendant widgets, eliminating the benefits of fine-grained rendering.'
      },
      {
        id: 'q5-1-4',
        question: 'What is the recommended tool for managing Ephemeral State in Flutter?',
        options: ['setState() inside a StatefulWidget', 'Redux', 'GetX controller', 'Raw WebSockets'],
        correctIndex: 0,
        explanation: 'Standard setState() is lightweight, built-in, and ideal for local ephemeral state.'
      },
      {
        id: 'q5-1-5',
        question: 'When a piece of state needs to be accessed by Screen A and Screen C simultaneously, what kind of state is it?',
        options: ['Static State', 'App State', 'Ephemeral State', 'Virtual State'],
        correctIndex: 1,
        explanation: 'State shared across distinct routes or distant branches of the tree is App State.'
      }
    ]
  },
  {
    id: 'm5-l2',
    moduleId: 'module-5',
    title: 'setState Deep Dive, InheritedWidget & ValueNotifier',
    description: 'Learn how Flutter passes state under the hood! Master how setState schedules frame rebuilds, how InheritedWidget provides ancestor lookup, and how ValueNotifier offers surgical reactivity.',
    order: 2,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 5 Lesson 1: Ephemeral vs App State'],
    lastVerified: 'November 2026',
    goal: 'Understand the internal mechanics of InheritedWidget (the foundation of Theme and MediaQuery) and build surgical reactive UI with ValueNotifier and ValueListenableBuilder.',
    simpleExplanation: `Before learning third-party packages, you must understand Flutter's **built-in state propagation mechanisms**:

### 1. \`InheritedWidget\` (The Engine of Flutter)
Have you ever wondered how \`Theme.of(context)\` or \`MediaQuery.of(context)\` works from anywhere in your app without passing it into constructors?
The answer is **\`InheritedWidget\`**!
An InheritedWidget sits high in the tree and allows any descendant widget below it to look it up in **O(1) time** using \`context.dependOnInheritedWidgetOfExactType<T>()\`.
When the InheritedWidget updates, only the descendants that actually read it are rebuilt!
*Note: Provider and Riverpod are both built directly on top of this exact mechanism.*

### 2. \`ValueNotifier\` and \`ValueListenableBuilder\`
If you want lightweight reactive state **without** writing a StatefulWidget:
1. Create a notifier: \`final ValueNotifier<int> scoreNotifier = ValueNotifier<int>(0);\`
2. Update value: \`scoreNotifier.value = 95;\`
3. Listen surgically:
\`\`\`dart
ValueListenableBuilder<int>(
  valueListenable: scoreNotifier,
  builder: (context, currentScore, child) {
    return Text('Score: $currentScore'); // ONLY this Text rebuilds!
  },
)
\`\`\`
This achieves surgical micro-rebuilds without rebuilding the surrounding page!`,
    analogy: `Think of radio broadcasting vs shouting:
- **Prop drilling:** Shouting a message down a long hallway of 10 people whisper-by-whisper.
- **InheritedWidget:** A radio broadcast tower on top of the hill. Anyone with a radio receiver (\`Theme.of(context)\`) tunes in and hears the broadcast instantly.
- **ValueNotifier:** A pager in your pocket. It stays quiet until a specific notification arrives, vibrating only your pocket without disturbing anyone else in the room.`,
    codeSnippet: `import 'package:flutter/material.dart';

// Surgical reactivity using ValueNotifier (Zero StatefulWidget boilerplate!)
class StudentScoreNotifierScreen extends StatelessWidget {
  // ValueNotifier holding double score
  final ValueNotifier<double> _marks = ValueNotifier<double>(75.0);

  StudentScoreNotifierScreen({super.key});

  @override
  Widget build(BuildContext context) {
    print('Whole Screen Built (Runs only ONCE!)');

    return Scaffold(
      appBar: AppBar(title: const Text('ValueNotifier Demo')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Static Header (Never rebuilds)'),
            const SizedBox(height: 20),
            // Only this builder widget rebuilds when _marks changes!
            ValueListenableBuilder<double>(
              valueListenable: _marks,
              builder: (context, currentMarks, child) {
                print('Only ValueListenableBuilder Rebuilt!');
                final grade = currentMarks >= 90 ? 'A+' : currentMarks >= 80 ? 'A' : 'B';
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      'Marks: \$currentMarks / 100.0 (Grade: \$grade)',
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => _marks.value = (_marks.value - 5).clamp(0, 100),
                  child: const Text('-5'),
                ),
                const SizedBox(width: 16),
                ElevatedButton(
                  onPressed: () => _marks.value = (_marks.value + 5).clamp(0, 100),
                  child: const Text('+5'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: ScoreDemo()));

class ScoreDemo extends StatelessWidget {
  final ValueNotifier<int> count = ValueNotifier<int>(10);
  ScoreDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ValueListenableBuilder<int>(
          valueListenable: count,
          builder: (context, val, _) => Text('Count: \$val', style: TextStyle(fontSize: 32)),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => count.value++,
        child: Icon(Icons.add),
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Instantiate ValueNotifier<T>',
        description: 'ValueNotifier wraps any primitive or object and notifies listeners whenever .value is assigned.'
      },
      {
        step: 2,
        title: 'Bind with ValueListenableBuilder',
        description: 'Provide valueListenable: notifier and a builder function taking (context, value, child).'
      },
      {
        step: 3,
        title: 'Use the optional child parameter',
        description: 'Heavy static widgets passed to the "child" property are never rebuilt, optimizing performance.'
      },
      {
        step: 4,
        title: 'InheritedWidget connection',
        description: 'InheritedWidget provides the foundational O(1) context lookup powering Provider and Theme.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Mutating properties inside an object held by ValueNotifier without reassigning .value.',
        fix: 'Assign a new instance or notifyListeners(): notifier.value = notifier.value.copyWith(...);',
        why: 'ValueNotifier uses equality (==); mutating an internal field does not trigger the setter notification.'
      },
      {
        mistake: 'Forgetting to dispose ValueNotifier when used inside a StatefulWidget.',
        fix: 'Call notifier.dispose() inside dispose().',
        why: 'Undisposed listeners remain registered in memory.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is an InheritedWidget in Flutter and why is it important?" — Answer: A special base class for widgets that efficiently propagate information down the widget tree and allow O(1) ancestor lookups (e.g. Theme.of(context), MediaQuery.of(context)).',
      'Exam Alert: "How does ValueListenableBuilder improve Flutter app performance?" — Answer: It rebuilds ONLY the specific sub-widget wrapped inside its builder when the notifier changes, preventing the parent page from rebuilding.'
    ],
    practiceTask: {
      task: 'Create a ValueNotifier<bool> named "isExamSubmitted". Build a ValueListenableBuilder that displays a red Text("Not Submitted") when false, and green Text("Submitted! 🎉") when true.',
      hint: 'ValueListenableBuilder<bool>(valueListenable: isExamSubmitted, builder: (ctx, submitted, _) => ...)',
      solution: `ValueListenableBuilder<bool>(
  valueListenable: isExamSubmitted,
  builder: (context, submitted, _) {
    return Text(
      submitted ? 'Submitted! 🎉' : 'Not Submitted',
      style: TextStyle(
        color: submitted ? Colors.green : Colors.red,
        fontWeight: FontWeight.bold,
      ),
    );
  },
)`
    },
    quiz: [
      {
        id: 'q5-2-1',
        question: 'Which built-in Flutter widget provides O(1) data lookup down the widget tree hierarchy?',
        options: ['StatefulWidget', 'InheritedWidget', 'Column', 'FutureBuilder'],
        correctIndex: 1,
        explanation: 'InheritedWidget registers dependencies in the element tree for constant-time lookups.'
      },
      {
        id: 'q5-2-2',
        question: 'What triggers a rebuild in a ValueListenableBuilder?',
        options: [
          'Calling setState() anywhere on the phone',
          'Assigning a new value to the ValueNotifier\'s .value property',
          'Every clock second',
          'A screen rotation only'
        ],
        correctIndex: 1,
        explanation: 'Setting notifier.value = newValue alerts all registered listener builders.'
      },
      {
        id: 'q5-2-3',
        question: 'What is the performance advantage of ValueListenableBuilder over setState()?',
        options: [
          'It compiles to C code',
          'It rebuilds only the small sub-tree inside its builder instead of the entire parent widget',
          'It deletes the garbage collector',
          'It prevents phone sleep'
        ],
        correctIndex: 1,
        explanation: 'Fine-grained rebuilds isolate widget repainting to the exact nodes that consume changed data.'
      },
      {
        id: 'q5-2-4',
        question: 'Which method on InheritedWidget dictates whether dependent widgets should rebuild when the widget updates?',
        options: ['shouldRebuild()', 'updateShouldNotify()', 'notifyListeners()', 'canUpdate()'],
        correctIndex: 1,
        explanation: 'updateShouldNotify(covariant InheritedWidget oldWidget) returns true if dependents need rebuilding.'
      },
      {
        id: 'q5-2-5',
        question: 'Which core Flutter classes are implemented using InheritedWidget?',
        options: ['Theme', 'MediaQuery', 'Directionality', 'All of the above'],
        correctIndex: 3,
        explanation: 'Theme, MediaQuery, Directionality, and ScaffoldMessenger all rely on InheritedWidget under the hood.'
      }
    ]
  },
  {
    id: 'm5-l3',
    moduleId: 'module-5',
    title: 'Provider in Depth: ChangeNotifier, Consumer & context.watch',
    description: 'Master Google\'s recommended state management library: Provider! Build ChangeNotifier models, inject with ChangeNotifierProvider, listen with context.watch vs context.read, and optimize with Consumer.',
    order: 3,
    durationMinutes: 18,
    difficulty: 'Intermediate',
    prerequisites: ['Module 5 Lesson 2: InheritedWidget & ValueNotifier'],
    lastVerified: 'November 2026',
    goal: 'Build a production-grade student management store using ChangeNotifier, inject it at the root with MultiProvider, and consume it using context.watch, context.read, and Consumer.',
    simpleExplanation: `[Provider](https://pub.dev/packages/provider) is a wrapper around \`InheritedWidget\` that makes state management clean, testable, and beginner-friendly. It is officially highlighted in the [Flutter Simple App State Management Guide](https://docs.flutter.dev/data-and-backend/state-mgmt/simple).

### The 3 Core Concepts of Provider:

### 1. \`ChangeNotifier\` (The Model Store)
A class that holds state and business logic. When data changes, you call \`notifyListeners()\`:
\`\`\`dart
class StudentProvider extends ChangeNotifier {
  final List<Student> _students = [];
  List<Student> get students => _students;

  void addStudent(Student student) {
    _students.add(student);
    notifyListeners(); // Tells all listening widgets to rebuild!
  }
}
\`\`\`

### 2. \`ChangeNotifierProvider\` (The Injector)
Places the model into the widget tree:
\`\`\`dart
ChangeNotifierProvider(
  create: (context) => StudentProvider(),
  child: const MyApp(),
)
\`\`\`

### 3. Reading and Watching State
- **\`context.watch<T>()\`**: Listens for changes. Whenever \`notifyListeners()\` is called, this widget **rebuilds**. Use inside \`build()\`.
- **\`context.read<T>()\`**: Reads the model **WITHOUT** subscribing to rebuilds. Use inside click handlers (\`onPressed\`) to trigger methods!
- **\`Consumer<T>\`**: Rebuilds only a small targeted part of the widget tree.`,
    analogy: `Think of a newspaper publishing house:
- **ChangeNotifier:** The newspaper editorial office. When breaking news happens, the editor hits the printing press button (\`notifyListeners()\`).
- **ChangeNotifierProvider:** The delivery vans delivering fresh newspapers to every house in the neighborhood.
- **context.watch:** A subscriber who reads every morning paper at their kitchen table.
- **context.read:** A detective who walks into the newspaper office, asks for the publisher's phone number, and leaves without reading today's paper!`,
    codeSnippet: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// 1. The State Model (ChangeNotifier)
class StudentStore extends ChangeNotifier {
  final List<String> _studentNames = ['Aarav', 'Diya'];

  List<String> get students => List.unmodifiable(_studentNames);
  int get totalCount => _studentNames.length;

  void addStudent(String name) {
    if (name.trim().isNotEmpty) {
      _studentNames.add(name.trim());
      notifyListeners(); // Broadcasts updates to all listeners!
    }
  }

  void removeStudent(int index) {
    _studentNames.removeAt(index);
    notifyListeners();
  }
}

// 2. The UI Consumer Screen
class StudentStoreScreen extends StatelessWidget {
  const StudentStoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // context.watch subscribes to rebuilds whenever students list changes!
    final studentStore = context.watch<StudentStore>();

    return Scaffold(
      appBar: AppBar(
        title: Text('Students Count: \${studentStore.totalCount}'),
      ),
      body: ListView.builder(
        itemCount: studentStore.students.length,
        itemBuilder: (context, index) {
          final name = studentStore.students[index];
          return ListTile(
            title: Text(name),
            trailing: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              // context.read executes methods without unnecessary rebuild subscription!
              onPressed: () => context.read<StudentStore>().removeStudent(index),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add a new student
          context.read<StudentStore>().addStudent('New Student #\${studentStore.totalCount + 1}');
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
    dartPadCode: `// Mental model for Provider ChangeNotifier:
class CounterModel {
  int count = 0;
  List<Function> listeners = [];

  void addListener(Function fn) => listeners.add(fn);

  void increment() {
    count++;
    for (var l in listeners) l(); // notifyListeners!
  }
}

void main() {
  var model = CounterModel();
  model.addListener(() => print('UI Rebuilt! New count: \${model.count}'));

  model.increment();
  model.increment();
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Extend ChangeNotifier',
        description: 'Create your store class and extend ChangeNotifier.'
      },
      {
        step: 2,
        title: 'Call notifyListeners()',
        description: 'Call notifyListeners() whenever state is modified to broadcast the change.'
      },
      {
        step: 3,
        title: 'Use MultiProvider at app root',
        description: 'Wrap MaterialApp in MultiProvider(providers: [ChangeNotifierProvider(...)]) to make stores globally accessible.'
      },
      {
        step: 4,
        title: 'Remember: watch in build(), read in callbacks',
        description: 'Golden Rule: context.watch inside build() to read data; context.read inside button onPressed callbacks to call methods.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using context.watch inside an onPressed button handler: onPressed: () => context.watch<Store>().add();',
        fix: 'Use context.read inside event callbacks: context.read<Store>().add();',
        why: 'context.watch is for listening to changes during widget building; using it inside an event callback throws a ProviderNotFoundException or assertion.'
      },
      {
        mistake: 'Forgetting to call notifyListeners() after changing a list or variable.',
        fix: 'Always invoke notifyListeners() after state mutations.',
        why: 'Without notifyListeners(), the data changes in memory but zero widgets are alerted to rebuild.'
      }
    ],
    examAlerts: [
      'Exam Alert (Very Common): "What is the difference between context.watch() and context.read() in Provider?" — Answer: context.watch<T>() subscribes the widget to changes and triggers a rebuild when notifyListeners() is called; context.read<T>() retrieves the object without subscribing to rebuilds (ideal for calling methods inside onPressed callbacks).',
      'Exam Alert: "What method in ChangeNotifier alerts listening widgets that data has changed?" — Answer: notifyListeners().'
    ],
    practiceTask: {
      task: 'Write a ChangeNotifier named "CartStore" with a double totalPrice = 0.0. Add a method "applyDiscount(double discountAmount)" that subtracts the discount and calls notifyListeners().',
      hint: 'totalPrice -= discountAmount; notifyListeners();',
      solution: `class CartStore extends ChangeNotifier {
  double _totalPrice = 100.0;
  double get totalPrice => _totalPrice;

  void applyDiscount(double discountAmount) {
    _totalPrice = (_totalPrice - discountAmount).clamp(0.0, double.infinity);
    notifyListeners();
  }
}`
    },
    quiz: [
      {
        id: 'q5-3-1',
        question: 'Which method must be called inside a ChangeNotifier to alert all listening widgets to rebuild?',
        options: ['setState()', 'notifyListeners()', 'rebuildNow()', 'updateState()'],
        correctIndex: 1,
        explanation: 'notifyListeners() invokes all registered listener callbacks.'
      },
      {
        id: 'q5-3-2',
        question: 'Where should context.read<T>() be used instead of context.watch<T>()?',
        options: [
          'Inside the build() method when rendering a Text widget',
          'Inside event callbacks like button onPressed where you only want to invoke a method without rebuilding',
          'In main()',
          'In pubspec.yaml'
        ],
        correctIndex: 1,
        explanation: 'context.read returns the model without registering a rebuild dependency.'
      },
      {
        id: 'q5-3-3',
        question: 'What is the purpose of the Consumer<T> widget in Provider?',
        options: [
          'It connects to a credit card terminal',
          'It isolates widget rebuilds to only its specific child builder rather than rebuilding the entire parent widget',
          'It downloads JSON from APIs',
          'It deletes unused variables'
        ],
        correctIndex: 1,
        explanation: 'Consumer allows granular, fine-grained rebuilds in large widget trees.'
      },
      {
        id: 'q5-3-4',
        question: 'Which widget is used to inject multiple Providers cleanly at the root of a Flutter application?',
        options: ['ProviderGroup', 'MultiProvider', 'ProviderStack', 'CompositeProvider'],
        correctIndex: 1,
        explanation: 'MultiProvider flattens nested Provider declarations into a clean list.'
      },
      {
        id: 'q5-3-5',
        question: 'What error occurs if you call context.watch<MyStore>() in a widget that has no Provider<MyStore> above it in the tree?',
        options: [
          'It silently creates a dummy store',
          'ProviderNotFoundException',
          'The phone crashes',
          'Null pointer compile error'
        ],
        correctIndex: 1,
        explanation: 'Provider throws a ProviderNotFoundException explaining that no matching provider ancestor was located.'
      }
    ]
  },
  {
    id: 'm5-l4',
    moduleId: 'module-5',
    title: 'Riverpod & BLoC/Cubit Architectures',
    description: 'Learn modern industry standards: Riverpod (compile-safe provider evolution) and BLoC / Cubit (Business Logic Component with event streams and immutable states).',
    order: 4,
    durationMinutes: 20,
    difficulty: 'Intermediate',
    prerequisites: ['Module 5 Lesson 3: Provider'],
    lastVerified: 'November 2026',
    goal: 'Understand the architecture of BLoC (Events -> BLoC -> States) and Cubit (Methods -> States), and compare them with Riverpod.',
    simpleExplanation: `For large enterprise codebases with strict architectural rules, two patterns dominate the Flutter industry:

### 1. BLoC (Business Logic Component) & Cubit
Created by Google and popularized by Felix Angelov via [bloclibrary.dev](https://bloclibrary.dev/) and the [flutter_bloc package](https://pub.dev/packages/flutter_bloc).
- **BLoC Core Philosophy:** UI is completely separated from Business Logic!
- **Cubit (Simplified BLoC):** Exposes direct methods that emit immutable states:
  \`\`\`dart
  // States
  sealed class StudentState {}
  class StudentLoading extends StudentState {}
  class StudentLoaded extends StudentState { final List<Student> students; StudentLoaded(this.students); }
  class StudentError extends StudentState { final String message; StudentError(this.message); }

  // Cubit
  class StudentCubit extends Cubit<StudentState> {
    StudentCubit() : super(StudentLoading());

    void loadStudents() async {
      try {
        final list = await repository.fetch();
        emit(StudentLoaded(list));
      } catch (e) {
        emit(StudentError(e.toString()));
      }
    }
  }
  \`\`\`
- **BlocBuilder / BlocConsumer:** Rebuilds UI cleanly in response to \`emit()\`.

### 2. Riverpod (Provider 2.0)
Created by Remi Rousselet (the same creator of Provider), explore the official [Riverpod Documentation](https://riverpod.dev/):
- Doesn't depend on \`BuildContext\` to declare providers (compile-safe!).
- Providers are declared as top-level final global variables.
- Catches missing provider bugs at **compile time** instead of runtime!`,
    analogy: `Think of a fast-food order counter vs a high-security bank vault:
- **Provider:** A friendly fast-food counter. You ask for a burger, they hand it over. Simple, fast, and works for most meals.
- **BLoC:** A high-security automated bank deposit chute. You cannot touch the money directly. You slide a deposit slip (Event) through a locked pneumatic tube. The automated vault processes it and displays the updated balance on a tamper-proof digital screen (State). Completely predictable and 100% auditable!`,
    codeSnippet: `// Complete Cubit Example
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// 1. Immutable States
abstract class ExamGradeState {}
class ExamGradeInitial extends ExamGradeState {}
class ExamGradeCalculated extends ExamGradeState {
  final double marks;
  final String grade;
  ExamGradeCalculated(this.marks, this.grade);
}

// 2. Cubit Business Logic
class ExamGradeCubit extends Cubit<ExamGradeState> {
  ExamGradeCubit() : super(ExamGradeInitial());

  void calculate(double marks) {
    String grade;
    if (marks >= 90) grade = 'A+';
    else if (marks >= 80) grade = 'A';
    else if (marks >= 50) grade = 'Pass';
    else grade = 'Fail';

    emit(ExamGradeCalculated(marks, grade));
  }
}

// 3. UI with BlocBuilder
class ExamGradeView extends StatelessWidget {
  const ExamGradeView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ExamGradeCubit, ExamGradeState>(
      builder: (context, state) {
        if (state is ExamGradeCalculated) {
          return Text('Result: \${state.grade} (\${state.marks} marks)');
        }
        return const Text('Enter marks to calculate grade');
      },
    );
  }
}`,
    dartPadCode: `// Mental model of Cubit State Emission:
class SimpleCubit<T> {
  T state;
  SimpleCubit(this.state);

  void emit(T newState) {
    state = newState;
    print('State changed to: \$state');
  }
}

void main() {
  var cubit = SimpleCubit<String>('Initial');
  cubit.emit('Loading...');
  cubit.emit('Success: Student Alex Added!');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Define distinct States',
        description: 'Model all possible screen conditions: Initial, Loading, Success, and Failure as explicit classes.'
      },
      {
        step: 2,
        title: 'Emit states with Cubit',
        description: 'Inside your Cubit methods, call emit(NewState()) to broadcast state transitions.'
      },
      {
        step: 3,
        title: 'Consume with BlocBuilder',
        description: 'BlocBuilder<CubitType, StateType> executes its builder callback whenever a new state is emitted.'
      },
      {
        step: 4,
        title: 'BlocListener for one-time events',
        description: 'Use BlocListener (not BlocBuilder) to show SnackBars, dialogs, or perform navigation in response to errors.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Emitting the exact same state instance with identical equality.',
        fix: 'Use Equatable or distinct classes so state == newState evaluates to false.',
        why: 'BLoC ignores state emissions if the new state equals the current state (to avoid redundant rebuilds).'
      },
      {
        mistake: 'Calling Navigator.push or showing a SnackBar directly inside BlocBuilder.',
        fix: 'Use BlocListener or BlocConsumer for navigation and alerts.',
        why: 'BlocBuilder can re-run multiple times during layout; triggering side-effects in a builder causes duplicate dialogs and navigation bugs.'
      }
    ],
    examAlerts: [
      'Exam Alert (Interview Standard): "What is the difference between BLoC and Cubit?" — Answer: Cubit exposes functions/methods that directly call emit(State); full BLoC uses an event-driven architecture where incoming Events are added to a stream (add(Event)) and transformed into States via on<Event>().',
      'Exam Alert: "Why should side-effects (like showing SnackBars or navigation) be placed in BlocListener rather than BlocBuilder?" — Answer: Because BlocBuilder is meant purely for returning widgets; side-effects belong in BlocListener which fires exactly once per state transition.'
    ],
    practiceTask: {
      task: 'Design the state classes for a "DiscountCalculatorCubit". Define: DiscountInitial, DiscountLoading, and DiscountCalculated(double original, double discount, double finalPrice).',
      hint: 'abstract class DiscountState {} ...',
      solution: `abstract class DiscountState {}
class DiscountInitial extends DiscountState {}
class DiscountLoading extends DiscountState {}
class DiscountCalculated extends DiscountState {
  final double originalPrice;
  final double discountAmount;
  final double payableTotal;

  DiscountCalculated({
    required this.originalPrice,
    required this.discountAmount,
    required this.payableTotal,
  });
}`
    },
    quiz: [
      {
        id: 'q5-4-1',
        question: 'What method does a Cubit invoke to transition and publish a new state to the UI?',
        options: ['setState()', 'emit()', 'publish()', 'dispatch()'],
        correctIndex: 1,
        explanation: 'In flutter_bloc, Cubits call emit(newState) to transition states.'
      },
      {
        id: 'q5-4-2',
        question: 'Which widget in flutter_bloc should be used to display a SnackBar or navigate to another screen in response to a state change?',
        options: ['BlocBuilder', 'BlocListener (or BlocConsumer)', 'BlocProvider only', 'BlocWidget'],
        correctIndex: 1,
        explanation: 'BlocListener guarantees that its listener callback is called exactly once per state change, making it safe for side-effects.'
      },
      {
        id: 'q5-4-3',
        question: 'What is the primary difference between full BLoC and Cubit?',
        options: [
          'BLoC is written in Java; Cubit is written in Dart',
          'Cubit triggers state transitions with direct methods; BLoC triggers transitions via asynchronous Event streams',
          'Cubit is deprecated',
          'BLoC does not support streams'
        ],
        correctIndex: 1,
        explanation: 'Cubit is a lighter-weight subset of BLoC that trades event streams for straightforward method calls.'
      },
      {
        id: 'q5-4-4',
        question: 'What key advantage does Riverpod offer over legacy Provider?',
        options: [
          'It doesn\'t require BuildContext for provider declarations, eliminating ProviderNotFoundException at compile-time',
          'It eliminates all widgets',
          'It connects directly to Bluetooth',
          'It only works on iOS'
        ],
        correctIndex: 0,
        explanation: 'Riverpod is compile-safe and decoupled from the Flutter widget tree.'
      },
      {
        id: 'q5-4-5',
        question: 'In BLoC architecture, what flow of data is strictly enforced?',
        options: [
          'UI -> Database -> UI',
          'UI dispatches Event -> BLoC processes logic -> BLoC emits State -> UI rebuilds',
          'State -> Event -> BLoC',
          'Direct variable mutation'
        ],
        correctIndex: 1,
        explanation: 'BLoC enforces unidirectional data flow: Events in, States out.'
      }
    ]
  },
  {
    id: 'm5-l5',
    moduleId: 'module-5',
    title: 'State Management Decision Matrix & Why Avoid GetX in Production',
    description: 'How to choose the right state management for any project: clear decision flowchart, comparing setState vs Provider vs Riverpod vs BLoC, and why senior engineers avoid GetX in production.',
    order: 5,
    durationMinutes: 12,
    difficulty: 'Intermediate',
    prerequisites: ['Module 5 Lessons 1-4'],
    lastVerified: 'November 2026',
    goal: 'Confidently select the right state management solution based on project size and requirements, and understand architectural drawbacks of GetX in production enterprise apps.',
    simpleExplanation: `Beginners are often overwhelmed by the state management debate. Here is the definitive decision matrix used by senior Flutter engineers:

### The Decision Matrix:
1. **Single isolated widget (checkbox, password mask, local animation):**
   👉 **\`setState()\`** or **\`ValueNotifier\`** (Zero third-party dependencies).
2. **Small to Medium app (student details app, to-do list, course catalog):**
   👉 **\`Provider\`** (Simple, clean, officially recommended by Google).
3. **Medium to Large production app (e-commerce, modern enterprise, full test suite):**
   👉 **\`Riverpod\`** (Compile-safe, testable without mocks, robust).
4. **Mission-critical enterprise / banking / multi-team project:**
   👉 **\`BLoC / Cubit\`** (Strict state machines, 100% predictable, rock-solid event logging).

---

### Why Senior Engineers and Tech Leads Avoid GetX in Production:
GetX claims to do everything: state management, routing, dependency injection, and snackbars without \`BuildContext\`. While tempting for quick YouTube tutorials, tech leads avoid it in enterprise environments for serious reasons:
1. **Global Mutable Singletons:** Bypasses Flutter's tree lifecycle, causing memory leaks and hard-to-reproduce test failures.
2. **BuildContext Bypass Anti-Pattern:** Flutter's entire architecture relies on \`BuildContext\` for themes, localization, and safe navigation. Bypassing it breaks when running background services, dialogs, or multiple windows.
3. **Monolithic "God Object" Dependency:** Couples your entire app to a single third-party framework rather than standard Flutter APIs. If the maintainer abandons it, migration is nearly impossible.
4. **Poor Testability:** Testing GetX controllers requires resetting global static state between test runs.`,
    analogy: `Think of building a vehicle:
- **setState:** A bicycle. Perfect for a quick run down the driveway.
- **Provider:** A reliable family sedan. Easy to drive, comfortable, and gets you everywhere.
- **BLoC / Riverpod:** A commercial airliner with twin jet engines and strict cockpit checklists. Every button has a dedicated warning light and pilot logbook.
- **GetX:** Bolting rocket boosters, lawnmower blades, and a microwave oven to a skateboard with duct tape. It might be fast on day one, but it is dangerous at 100 mph!`,
    codeSnippet: `// Decision Flowchart in Dart Logic:
String recommendStateManagement({
  required bool isSingleWidgetOnly,
  required bool isEnterpriseOrBanking,
  required int screenCount,
}) {
  if (isSingleWidgetOnly) {
    return 'Use setState() or ValueNotifier (Built-in, zero overhead)';
  } else if (isEnterpriseOrBanking) {
    return 'Use BLoC / Cubit (Strict state separation, event-driven, auditable)';
  } else if (screenCount > 10) {
    return 'Use Riverpod (Compile-safe, excellent testability)';
  } else {
    return 'Use Provider (Official Google recommendation, beginner-friendly)';
  }
}

void main() {
  print(recommendStateManagement(
    isSingleWidgetOnly: false,
    isEnterpriseOrBanking: false,
    screenCount: 4,
  )); // Recommends: Provider
}`,
    dartPadCode: `void main() {
  List<String> guidelines = [
    '1. Ephemeral UI -> setState()',
    '2. Small/Medium -> Provider',
    '3. Reactive & Compile-Safe -> Riverpod',
    '4. Enterprise & FinTech -> BLoC / Cubit',
    '5. Avoid GetX for maintainable production architectures'
  ];

  for (var rule in guidelines) print(rule);
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Evaluate project scale',
        description: 'Choose the simplest tool that satisfies your maintenance and testability goals.'
      },
      {
        step: 2,
        title: 'Prioritize predictability',
        description: 'BLoC and Riverpod prioritize immutable state transitions and easy unit testing.'
      },
      {
        step: 3,
        title: 'Respect Flutter architecture',
        description: 'Embrace BuildContext rather than fighting against Flutter\'s design fundamentals.'
      },
      {
        step: 4,
        title: 'Answer exam questions accurately',
        description: 'Interviewers love asking why you chose Provider or BLoC over alternatives.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using GetX because "it doesn\'t need BuildContext".',
        fix: 'Understand that BuildContext is Flutter\'s superpower for themes, localizations, and navigation.',
        why: 'Hiding BuildContext causes subtle bugs in multi-window, tablets, and background tasks.'
      },
      {
        mistake: 'Switching state management libraries mid-project without clear justification.',
        fix: 'Stick to one primary pattern per team/app (e.g. Provider or BLoC).',
        why: 'Mixing multiple competing paradigms in one codebase creates confusion.'
      }
    ],
    examAlerts: [
      'Exam Alert (Interview Standard): "What criteria do you use to choose a state management solution for a Flutter app?" — Answer: Project scale, team size, requirement for strict state machine predictability (BLoC), simplicity and official recommendation (Provider), or compile-time safety (Riverpod).',
      'Exam Alert: "Why is context-dependent state management preferred in standard Flutter architecture?" — Answer: Because BuildContext anchors state lookups to the element tree, ensuring proper lifecycle cleanup, memory disposal, and theme propagation.'
    ],
    practiceTask: {
      task: 'Write a short 3-sentence justification for why you would choose Provider for a 4-screen Student Details & Grading app.',
      hint: 'Mention official Google endorsement, simplicity of ChangeNotifier, and zero need for complex event streams.',
      solution: `1. The app has a straightforward data model (Student list and grade calculation) that fits naturally in a ChangeNotifier.
2. Provider is officially recommended by Google, offering minimal boilerplate and intuitive context.watch and context.read APIs.
3. It avoids overengineering while maintaining full testability and clean separation of concerns.`
    },
    quiz: [
      {
        id: 'q5-5-1',
        question: 'Which state management library is officially endorsed in the Flutter documentation for beginners and general apps?',
        options: ['Redux', 'Provider', 'MobX', 'Vuex'],
        correctIndex: 1,
        explanation: 'Provider is officially endorsed in the Flutter docs as an approachable wrapper around InheritedWidget.'
      },
      {
        id: 'q5-5-2',
        question: 'Why do many senior Flutter engineers advise against using GetX in large production apps?',
        options: [
          'It is written in Python',
          'It relies on static global state that bypasses Flutter\'s BuildContext and widget tree lifecycle, complicating testing and maintenance',
          'It is not on pub.dev',
          'Google blocked it'
        ],
        correctIndex: 1,
        explanation: 'Bypassing BuildContext and widget tree lifecycles creates architectural debt, memory leaks, and testing difficulties.'
      },
      {
        id: 'q5-5-3',
        question: 'For a banking or fintech application requiring strict event logging and auditable state machines, which pattern is the industry standard?',
        options: ['setState() only', 'BLoC / Cubit', 'Raw global variables', 'GetX'],
        correctIndex: 1,
        explanation: 'BLoC\'s unidirectional event-to-state architecture makes every user action traceable and testable.'
      },
      {
        id: 'q5-5-4',
        question: 'What is the primary architectural role of BuildContext in Flutter state propagation?',
        options: [
          'It tracks battery level',
          'It anchors widgets to their position in the Element tree, allowing scoped ancestor lookup and lifecycle teardown',
          'It converts Dart code into HTML',
          'It encrypts SQLite databases'
        ],
        correctIndex: 1,
        explanation: 'BuildContext connects widgets to their tree location, enabling safe scoped lookups and cleanup.'
      },
      {
        id: 'q5-5-5',
        question: 'What is the best tool for an isolated single-widget toggle like password visibility?',
        options: ['Full BLoC with 3 state classes', 'setState() or ValueNotifier', 'Riverpod StateNotifierProvider', 'Redux store'],
        correctIndex: 1,
        explanation: 'Simple ephemeral state is best solved with standard built-in setState() or ValueNotifier without extra dependencies.'
      }
    ]
  }
];

