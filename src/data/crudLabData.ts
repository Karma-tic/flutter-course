export interface CrudLabHint {
  nudge: string;
  syntaxOutline: string;
  solutionCode: string;
}

export interface CrudTestCheck {
  id: string;
  name: string;
  description?: string;
  validate: (code: string) => boolean;
  failureMessage: string;
}

export interface CrudFileTab {
  name: string;
  path: string;
  starterCode: string;
  solutionCode: string;
}

export interface CrudStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  activeFile: string;
  files: CrudFileTab[];
  mentalModelHook: {
    title: string;
    description: string;
    mnemonic: string;
  };
  whyItMatters: {
    title: string;
    description: string;
  };
  learningMarkdown: string;
  hints: CrudLabHint;
  tests: CrudTestCheck[];
  successConsoleOutput: string[];
}

export const CRUD_STEPS: CrudStep[] = [
  // -------------------------------------------------------------
  // STEP 1: DOMAIN MODEL & IMMUTABILITY
  // -------------------------------------------------------------
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Immutable Domain Model',
    subtitle: 'Build the Task entity with copyWith, toJson, and fromJson',
    badge: 'Step 1 of 6',
    activeFile: 'lib/models/task_model.dart',
    files: [
      {
        name: 'task_model.dart',
        path: 'lib/models/task_model.dart',
        starterCode: `// Step 1: Define the Task Model
// TODO: 1. Create TaskPriority enum (low, medium, high)
// TODO: 2. Create the immutable Task class with final fields:
//          id (String), title (String), description (String),
//          isCompleted (bool), priority (TaskPriority), createdAt (DateTime)
// TODO: 3. Implement constructor with defaults
// TODO: 4. Implement copyWith()
// TODO: 5. Implement toJson() and Task.fromJson()

enum TaskPriority {
  low,
  medium,
  high,
}

class Task {
  final String id;
  final String title;
  final String description;
  final bool isCompleted;
  final TaskPriority priority;
  final DateTime createdAt;

  const Task({
    required this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    this.priority = TaskPriority.medium,
    required this.createdAt,
  });

  // TODO: Add copyWith method here
  Task copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    TaskPriority? priority,
    DateTime? createdAt,
  }) {
    // Return a new Task with replaced or existing values
    throw UnimplementedError();
  }

  // TODO: Add toJson serialization
  Map<String, dynamic> toJson() {
    throw UnimplementedError();
  }

  // TODO: Add fromJson factory constructor
  factory Task.fromJson(Map<String, dynamic> json) {
    throw UnimplementedError();
  }
}
`,
        solutionCode: `enum TaskPriority {
  low,
  medium,
  high,
}

class Task {
  final String id;
  final String title;
  final String description;
  final bool isCompleted;
  final TaskPriority priority;
  final DateTime createdAt;

  const Task({
    required this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    this.priority = TaskPriority.medium,
    required this.createdAt,
  });

  Task copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    TaskPriority? priority,
    DateTime? createdAt,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      priority: priority ?? this.priority,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'priority': priority.name,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'] as String,
      title: json['title'] as String,
      description: (json['description'] as String?) ?? '',
      isCompleted: (json['isCompleted'] as bool?) ?? false,
      priority: TaskPriority.values.firstWhere(
        (e) => e.name == json['priority'],
        orElse: () => TaskPriority.medium,
      ),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }
}
`,
      },
    ],
    mentalModelHook: {
      title: 'The Blueprint Principle',
      mnemonic: 'Fields ➔ CopyWith ➔ JSON In/Out',
      description:
        'Never mutate an entity directly in Flutter. Think of an immutable model like a passport: you cannot scribble a new stamp with a pen; immigration issues an officially updated copy (`copyWith`). This prevents phantom UI rebuild bugs.',
    },
    whyItMatters: {
      title: 'Why Immutability & copyWith Matter in Production',
      description:
        'Flutter widgets compare object references to know when to repaint. If you mutate a `task.isCompleted = true` in place, widget equality checks (`oldWidget == newWidget`) return true and your screen fails to refresh! `copyWith` ensures fresh memory references.',
    },
    learningMarkdown: `### 🎯 Mission Goal
In this first milestone, you will build the bedrock **immutable domain entity** for our CRUD application.

### Key Concepts Explained
1. **\`final\` Fields**:
   Every field is marked \`final\`, meaning once initialized, it can never be reassigned.
2. **\`const\` Constructor**:
   Allows Flutter's compiler to optimize memory by creating canonical instances when properties are compile-time constants.
3. **\`copyWith()\` Pattern**:
   Takes optional nullable parameters (\`title?\`, \`isCompleted?\`). If a parameter is provided, it uses it; otherwise, it falls back to the existing instance (\`id: id ?? this.id\`).
4. **\`toJson()\` & \`fromJson()\`**:
   Converts Dart objects to primitive \`Map<String, dynamic>\` representation so we can persist to disk (SQLite, SharedPreferences, or REST APIs).`,
    hints: {
      nudge:
        'In copyWith, return a new Task(...) using the null-coalescing operator (??) between the parameter and this.field.',
      syntaxOutline: `// copyWith template:
return Task(
  id: id ?? this.id,
  title: title ?? this.title,
  description: description ?? this.description,
  isCompleted: isCompleted ?? this.isCompleted,
  priority: priority ?? this.priority,
  createdAt: createdAt ?? this.createdAt,
);`,
      solutionCode: `  Task copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    TaskPriority? priority,
    DateTime? createdAt,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      priority: priority ?? this.priority,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'priority': priority.name,
      'createdAt': createdAt.toIso8601String(),
    };
  }

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'] as String,
      title: json['title'] as String,
      description: (json['description'] as String?) ?? '',
      isCompleted: (json['isCompleted'] as bool?) ?? false,
      priority: TaskPriority.values.firstWhere(
        (e) => e.name == json['priority'],
        orElse: () => TaskPriority.medium,
      ),
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }`,
    },
    tests: [
      {
        id: 't1-1',
        name: 'TaskPriority enum exists',
        description: 'Verify TaskPriority contains low, medium, and high',
        validate: (code) =>
          code.includes('enum TaskPriority') &&
          code.includes('low') &&
          code.includes('medium') &&
          code.includes('high'),
        failureMessage:
          'Missing enum TaskPriority with values low, medium, and high.',
      },
      {
        id: 't1-2',
        name: 'Immutable Task class with final fields',
        description:
          'All fields (id, title, description, isCompleted, priority, createdAt) must be final',
        validate: (code) =>
          code.includes('final String id') &&
          code.includes('final String title') &&
          code.includes('final bool isCompleted') &&
          code.includes('final TaskPriority priority'),
        failureMessage:
          'Ensure id, title, isCompleted, and priority are declared as final fields.',
      },
      {
        id: 't1-3',
        name: 'copyWith implemented properly',
        validate: (code) => {
          const hasCopyWith =
            code.includes('copyWith(') &&
            code.includes('id ?? this.id') &&
            code.includes('isCompleted ?? this.isCompleted');
          const copyWithSection =
            code.split('copyWith(')[1]?.split('Map<String, dynamic> toJson()')[0] || '';
          return hasCopyWith && !copyWithSection.includes('throw UnimplementedError()');
        },
        failureMessage:
          'Implement copyWith() returning a new Task using the ?? operator.',
      },
      {
        id: 't1-4',
        name: 'toJson and Task.fromJson implemented',
        validate: (code) =>
          code.includes('Map<String, dynamic> toJson()') &&
          code.includes('factory Task.fromJson') &&
          code.includes('DateTime.parse'),
        failureMessage:
          'Implement toJson() returning a Map and factory Task.fromJson() parsing the map.',
      },
    ],
    successConsoleOutput: [
      '$ dart analyze lib/models/task_model.dart',
      'No issues found! (0 warnings, 0 errors)',
      '$ flutter test test/task_model_test.dart',
      '✓ Task instantiation with required fields (18ms)',
      '✓ Task copyWith produces new instance with modified fields (12ms)',
      '✓ Task toJson creates valid map serialization (15ms)',
      '✓ Task fromJson successfully parses ISO date and enum (21ms)',
      '════════════════════════════════════════════════════════════════',
      '✅ All 4 unit tests passed! Step 1 verification complete.',
    ],
  },

  // -------------------------------------------------------------
  // STEP 2: REPOSITORY CONTRACT & IN-MEMORY STORE
  // -------------------------------------------------------------
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Repository & Storage Layer',
    subtitle: 'Create the abstract TaskRepository contract & in-memory database',
    badge: 'Step 2 of 6',
    activeFile: 'lib/repositories/task_repository.dart',
    files: [
      {
        name: 'task_repository.dart',
        path: 'lib/repositories/task_repository.dart',
        starterCode: `import '../models/task_model.dart';

// Step 2: Repository Contract & In-Memory Implementation
// TODO: 1. Create abstract interface class TaskRepository
//          Define CRUD contract:
//          - Future<List<Task>> getTasks()
//          - Future<Task?> getTaskById(String id)
//          - Future<void> addTask(Task task)
//          - Future<void> updateTask(Task task)
//          - Future<void> deleteTask(String id)

abstract class TaskRepository {
  Future<List<Task>> getTasks();
  Future<Task?> getTaskById(String id);
  Future<void> addTask(Task task);
  Future<void> updateTask(Task task);
  Future<void> deleteTask(String id);
}

// TODO: 2. Implement InMemoryTaskRepository
class InMemoryTaskRepository implements TaskRepository {
  final List<Task> _tasks = [
    Task(
      id: 'task-1',
      title: 'Install Flutter SDK & Android Studio',
      description: 'Set up development environment with flutter doctor check',
      isCompleted: true,
      priority: TaskPriority.high,
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
    ),
    Task(
      id: 'task-2',
      title: 'Complete CRUD Application Lab',
      description: 'Build complete Create, Read, Update, Delete architecture',
      isCompleted: false,
      priority: TaskPriority.high,
      createdAt: DateTime.now(),
    ),
  ];

  @override
  Future<List<Task>> getTasks() async {
    // Simulate network/disk latency
    await Future.delayed(const Duration(milliseconds: 150));
    // Return an unmodifiable or copied list
    throw UnimplementedError();
  }

  @override
  Future<Task?> getTaskById(String id) async {
    throw UnimplementedError();
  }

  @override
  Future<void> addTask(Task task) async {
    throw UnimplementedError();
  }

  @override
  Future<void> updateTask(Task task) async {
    throw UnimplementedError();
  }

  @override
  Future<void> deleteTask(String id) async {
    throw UnimplementedError();
  }
}
`,
        solutionCode: `import '../models/task_model.dart';

abstract class TaskRepository {
  Future<List<Task>> getTasks();
  Future<Task?> getTaskById(String id);
  Future<void> addTask(Task task);
  Future<void> updateTask(Task task);
  Future<void> deleteTask(String id);
}

class InMemoryTaskRepository implements TaskRepository {
  final List<Task> _tasks = [
    Task(
      id: 'task-1',
      title: 'Install Flutter SDK & Android Studio',
      description: 'Set up development environment with flutter doctor check',
      isCompleted: true,
      priority: TaskPriority.high,
      createdAt: DateTime.now().subtract(const Duration(days: 2)),
    ),
    Task(
      id: 'task-2',
      title: 'Complete CRUD Application Lab',
      description: 'Build complete Create, Read, Update, Delete architecture',
      isCompleted: false,
      priority: TaskPriority.high,
      createdAt: DateTime.now(),
    ),
  ];

  @override
  Future<List<Task>> getTasks() async {
    await Future.delayed(const Duration(milliseconds: 100));
    return List.unmodifiable(_tasks);
  }

  @override
  Future<Task?> getTaskById(String id) async {
    await Future.delayed(const Duration(milliseconds: 50));
    try {
      return _tasks.firstWhere((t) => t.id == id);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> addTask(Task task) async {
    await Future.delayed(const Duration(milliseconds: 100));
    // Check if ID already exists
    if (_tasks.any((t) => t.id == task.id)) {
      throw Exception('Task with ID \${task.id} already exists');
    }
    _tasks.add(task);
  }

  @override
  Future<void> updateTask(Task task) async {
    await Future.delayed(const Duration(milliseconds: 100));
    final index = _tasks.indexWhere((t) => t.id == task.id);
    if (index == -1) {
      throw Exception('Task with ID \${task.id} not found');
    }
    _tasks[index] = task;
  }

  @override
  Future<void> deleteTask(String id) async {
    await Future.delayed(const Duration(milliseconds: 100));
    final index = _tasks.indexWhere((t) => t.id == id);
    if (index == -1) {
      throw Exception('Task with ID \$id not found');
    }
    _tasks.removeAt(index);
  }
}
`,
      },
      {
        name: 'task_model.dart',
        path: 'lib/models/task_model.dart',
        starterCode: `// Re-used from Step 1 (Read-Only reference)`,
        solutionCode: `// Re-used from Step 1`,
      },
    ],
    mentalModelHook: {
      title: 'The Contract & Vault Model',
      mnemonic: 'Abstract Interface = Contract | Implementation = Vault',
      description:
        'Your UI must never talk directly to raw SQL or API calls. The abstract class `TaskRepository` is the signed agreement; `InMemoryTaskRepository` is today\'s vault. Tomorrow you can swap it for `SqfliteTaskRepository` or `FirebaseTaskRepository` without changing a single line of UI code!',
    },
    whyItMatters: {
      title: 'Why Repository Pattern is Tested in Technical Interviews',
      description:
        'Interviewers look for Separation of Concerns. Tightly coupling widgets to SharedPreferences or HTTP makes automated testing impossible. With a repository interface, you can mock data instantly in unit tests.',
    },
    learningMarkdown: `### 🎯 Mission Goal
Implement the 5 core CRUD operations (Create, Read all, Read by ID, Update, Delete) behind an abstract repository interface.

### Key Operations Breakdown
- **Create**: \`addTask(Task task)\` validates unique ID and appends to storage.
- **Read**: \`getTasks()\` returns \`List.unmodifiable(_tasks)\` so consumers cannot mutate the internal list without going through repository methods.
- **Update**: \`updateTask(Task task)\` searches with \`indexWhere\` and replaces the item.
- **Delete**: \`deleteTask(String id)\` finds and removes the item.
- **Async Futures**: Even in-memory stores use \`Future\` to mirror real SQLite / REST network latencies.`,
    hints: {
      nudge:
        'Use indexWhere((t) => t.id == task.id) to find items to update or delete. Throw an Exception if index == -1.',
      syntaxOutline: `// In updateTask:
final index = _tasks.indexWhere((t) => t.id == task.id);
if (index == -1) throw Exception('Not found');
_tasks[index] = task;

// In deleteTask:
_tasks.removeWhere((t) => t.id == id);`,
      solutionCode: `  @override
  Future<List<Task>> getTasks() async {
    await Future.delayed(const Duration(milliseconds: 100));
    return List.unmodifiable(_tasks);
  }

  @override
  Future<Task?> getTaskById(String id) async {
    try {
      return _tasks.firstWhere((t) => t.id == id);
    } catch (_) {
      return null;
    }
  }

  @override
  Future<void> addTask(Task task) async {
    _tasks.add(task);
  }

  @override
  Future<void> updateTask(Task task) async {
    final index = _tasks.indexWhere((t) => t.id == task.id);
    if (index == -1) throw Exception('Task not found');
    _tasks[index] = task;
  }

  @override
  Future<void> deleteTask(String id) async {
    _tasks.removeWhere((t) => t.id == id);
  }`,
    },
    tests: [
      {
        id: 't2-1',
        name: 'Abstract TaskRepository interface defined',
        description: 'Contains getTasks, getTaskById, addTask, updateTask, deleteTask',
        validate: (code) =>
          code.includes('abstract class TaskRepository') &&
          code.includes('Future<List<Task>> getTasks()') &&
          code.includes('Future<void> addTask(Task task)') &&
          code.includes('Future<void> updateTask(Task task)') &&
          code.includes('Future<void> deleteTask(String id)'),
        failureMessage:
          'Ensure TaskRepository declares all 5 CRUD async methods.',
      },
      {
        id: 't2-2',
        name: 'InMemoryTaskRepository implements TaskRepository',
        description: 'Implements the interface with list operations',
        validate: (code) =>
          code.includes('class InMemoryTaskRepository implements TaskRepository') &&
          code.includes('_tasks.add(task)'),
        failureMessage:
          'Implement InMemoryTaskRepository adding items to the _tasks list.',
      },
      {
        id: 't2-3',
        name: 'Update & Delete error safety',
        description: 'Checks indexWhere or throws exception if task not found',
        validate: (code) =>
          code.includes('indexWhere') || code.includes('removeWhere'),
        failureMessage:
          'Use indexWhere or removeWhere to update and delete items by their unique ID.',
      },
    ],
    successConsoleOutput: [
      '$ flutter test test/task_repository_test.dart',
      '✓ InMemoryTaskRepository seeds 2 initial tasks (24ms)',
      '✓ addTask stores new task in internal database (19ms)',
      '✓ getTaskById returns matching task or null (14ms)',
      '✓ updateTask replaces existing task and reflects in getTasks (22ms)',
      '✓ deleteTask removes task from collection (18ms)',
      '✓ updateTask throws Exception on non-existent ID (12ms)',
      '════════════════════════════════════════════════════════════════',
      '✅ All 6 repository tests passed! Step 2 verification complete.',
    ],
  },

  // -------------------------------------------------------------
  // STEP 3: STATE PROVIDER / CONTROLLER
  // -------------------------------------------------------------
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'State Provider & Mutations',
    subtitle: 'Build TaskProvider with ChangeNotifier, async actions, and notifyListeners',
    badge: 'Step 3 of 6',
    activeFile: 'lib/providers/task_provider.dart',
    files: [
      {
        name: 'task_provider.dart',
        path: 'lib/providers/task_provider.dart',
        starterCode: `import 'package:flutter/foundation.dart';
import '../models/task_model.dart';
import '../repositories/task_repository.dart';

// Step 3: State Management Layer
// TODO: Build TaskProvider extending ChangeNotifier:
// - Inject TaskRepository via constructor
// - Private state: _tasks (List<Task>), _isLoading (bool), _errorMessage (String?)
// - Public getters
// - Methods: loadTasks(), addTask(), toggleTaskCompletion(), deleteTask()

class TaskProvider extends ChangeNotifier {
  final TaskRepository _repository;

  List<Task> _tasks = [];
  bool _isLoading = false;
  String? _errorMessage;

  TaskProvider(this._repository) {
    loadTasks();
  }

  // Getters
  List<Task> get tasks => List.unmodifiable(_tasks);
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  int get completedCount => _tasks.where((t) => t.isCompleted).length;
  int get pendingCount => _tasks.where((t) => !t.isCompleted).length;

  // TODO: Implement loadTasks()
  Future<void> loadTasks() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _tasks = await _repository.getTasks();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // TODO: Implement addTask(String title, String description, TaskPriority priority)
  Future<void> addTask(String title, String description, TaskPriority priority) async {
    // 1. Create a new Task with DateTime.now() and unique ID
    // 2. Call repository.addTask
    // 3. Reload or append to _tasks
    // 4. notifyListeners()
    throw UnimplementedError();
  }

  // TODO: Implement toggleTaskCompletion(String id)
  Future<void> toggleTaskCompletion(String id) async {
    // 1. Find the task
    // 2. Use copyWith(isCompleted: !task.isCompleted)
    // 3. Call repository.updateTask
    // 4. Update in _tasks & notifyListeners()
    throw UnimplementedError();
  }

  // TODO: Implement deleteTask(String id)
  Future<void> deleteTask(String id) async {
    // 1. Call repository.deleteTask
    // 2. Remove from _tasks & notifyListeners()
    throw UnimplementedError();
  }
}
`,
        solutionCode: `import 'package:flutter/foundation.dart';
import '../models/task_model.dart';
import '../repositories/task_repository.dart';

class TaskProvider extends ChangeNotifier {
  final TaskRepository _repository;

  List<Task> _tasks = [];
  bool _isLoading = false;
  String? _errorMessage;

  TaskProvider(this._repository) {
    loadTasks();
  }

  List<Task> get tasks => List.unmodifiable(_tasks);
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  int get completedCount => _tasks.where((t) => t.isCompleted).length;
  int get pendingCount => _tasks.where((t) => !t.isCompleted).length;

  Future<void> loadTasks() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _tasks = await _repository.getTasks();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addTask(String title, String description, TaskPriority priority) async {
    final newTask = Task(
      id: 'task-\${DateTime.now().millisecondsSinceEpoch}',
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      createdAt: DateTime.now(),
      isCompleted: false,
    );

    try {
      await _repository.addTask(newTask);
      _tasks = await _repository.getTasks();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  Future<void> toggleTaskCompletion(String id) async {
    final index = _tasks.indexWhere((t) => t.id == id);
    if (index == -1) return;

    final target = _tasks[index];
    final updated = target.copyWith(isCompleted: !target.isCompleted);

    try {
      await _repository.updateTask(updated);
      _tasks = await _repository.getTasks();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    }
  }

  Future<void> deleteTask(String id) async {
    try {
      await _repository.deleteTask(id);
      _tasks = await _repository.getTasks();
      notifyListeners();
    } catch (e) {
      _errorMessage = e.toString();
      notifyListeners();
    }
  }
}
`,
      },
    ],
    mentalModelHook: {
      title: 'The Megaphone Announcer',
      mnemonic: 'Action ➔ Await Repository ➔ notifyListeners() 📢',
      description:
        'ChangeNotifier is like an event announcer holding a megaphone. When state changes (`_tasks.add(newTask)`), calling `notifyListeners()` shouts to every listening screen: "Hey, data changed! Rebuild your widgets now!"',
    },
    whyItMatters: {
      title: 'Why ChangeNotifier is Crucial for Exam & Placement Success',
      description:
        'Company interviewers test whether candidates understand why `setState()` is insufficient in multi-screen apps. With `ChangeNotifier` and `Provider`, UI components observe data changes reactively without spaghetti callback passing.',
    },
    learningMarkdown: `### 🎯 Mission Goal
Connect the storage repository to Flutter's reactive UI using \`ChangeNotifier\`.

### State Lifecycle Rules
1. **Always broadcast with \`notifyListeners()\`** whenever \`_tasks\`, \`_isLoading\`, or \`_errorMessage\` changes.
2. **Encapsulate mutations**: Don't expose \`_tasks\` as a mutable list. Expose \`List.unmodifiable(_tasks)\` so outside widgets cannot bypass the provider.
3. **Async Error Handling**: Wrap repository calls in \`try/catch/finally\` blocks so exceptions don't crash the UI and \`_isLoading\` is reset safely.`,
    hints: {
      nudge:
        'In toggleTaskCompletion, use copyWith(isCompleted: !target.isCompleted) and pass it to repository.updateTask.',
      syntaxOutline: `// In toggleTaskCompletion:
final task = _tasks.firstWhere((t) => t.id == id);
final updated = task.copyWith(isCompleted: !task.isCompleted);
await _repository.updateTask(updated);
_tasks = await _repository.getTasks();
notifyListeners();`,
      solutionCode: `  Future<void> addTask(String title, String description, TaskPriority priority) async {
    final newTask = Task(
      id: 'task-\${DateTime.now().millisecondsSinceEpoch}',
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      createdAt: DateTime.now(),
    );
    await _repository.addTask(newTask);
    _tasks = await _repository.getTasks();
    notifyListeners();
  }

  Future<void> toggleTaskCompletion(String id) async {
    final target = _tasks.firstWhere((t) => t.id == id);
    final updated = target.copyWith(isCompleted: !target.isCompleted);
    await _repository.updateTask(updated);
    _tasks = await _repository.getTasks();
    notifyListeners();
  }

  Future<void> deleteTask(String id) async {
    await _repository.deleteTask(id);
    _tasks = await _repository.getTasks();
    notifyListeners();
  }`,
    },
    tests: [
      {
        id: 't3-1',
        name: 'TaskProvider extends ChangeNotifier',
        validate: (code) =>
          code.includes('class TaskProvider extends ChangeNotifier'),
        failureMessage: 'Ensure TaskProvider extends ChangeNotifier.',
      },
      {
        id: 't3-2',
        name: 'addTask creates Task and notifies listeners',
        validate: (code) => {
          const hasAddTask =
            code.includes('addTask(') &&
            code.includes('_repository.addTask') &&
            code.includes('notifyListeners()');
          const addTaskSection =
            code.split('addTask(')[1]?.split('toggleTaskCompletion(')[0] || '';
          return hasAddTask && !addTaskSection.includes('throw UnimplementedError()');
        },
        failureMessage:
          'Implement addTask to call _repository.addTask and notifyListeners().',
      },
      {
        id: 't3-3',
        name: 'toggleTaskCompletion toggles isCompleted',
        validate: (code) =>
          code.includes('toggleTaskCompletion(') &&
          code.includes('copyWith(isCompleted:') &&
          code.includes('_repository.updateTask'),
        failureMessage:
          'In toggleTaskCompletion, use copyWith(isCompleted: !...) and update via repository.',
      },
      {
        id: 't3-4',
        name: 'deleteTask removes task and notifies',
        validate: (code) =>
          code.includes('deleteTask(') &&
          code.includes('_repository.deleteTask'),
        failureMessage:
          'Implement deleteTask calling _repository.deleteTask(id) and notifyListeners().',
      },
    ],
    successConsoleOutput: [
      '$ flutter test test/task_provider_test.dart',
      '✓ TaskProvider auto-loads tasks on initialization (26ms)',
      '✓ addTask appends new task and triggers notifyListeners() (19ms)',
      '✓ toggleTaskCompletion flips boolean and updates state (22ms)',
      '✓ deleteTask removes task and recalculates completedCount (17ms)',
      '════════════════════════════════════════════════════════════════',
      '✅ All 4 state provider tests passed! Step 3 verification complete.',
    ],
  },

  // -------------------------------------------------------------
  // STEP 4: UI LIST VIEW & SWIPE-TO-DELETE
  // -------------------------------------------------------------
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'List View & Swipe-to-Delete',
    subtitle: 'Build TaskListScreen with ListView.separated and Dismissible gestures',
    badge: 'Step 4 of 6',
    activeFile: 'lib/screens/task_list_screen.dart',
    files: [
      {
        name: 'task_list_screen.dart',
        path: 'lib/screens/task_list_screen.dart',
        starterCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task_model.dart';
import '../providers/task_provider.dart';

// Step 4: Reactive List View UI
// TODO: Build TaskListScreen
// 1. Scaffold with AppBar showing task counts
// 2. Consume TaskProvider
// 3. Show CircularProgressIndicator when isLoading
// 4. Use ListView.separated
// 5. Wrap each item in Dismissible with swipe-to-delete
// 6. CheckboxListTile for toggling completion
// 7. FloatingActionButton to trigger add dialog

class TaskListScreen extends StatelessWidget {
  const TaskListScreen({super.key});

  Color _getPriorityColor(TaskPriority priority) {
    switch (priority) {
      case TaskPriority.high:
        return Colors.red;
      case TaskPriority.medium:
        return Colors.orange;
      case TaskPriority.low:
        return Colors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<TaskProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Karmatix Task Manager'),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: Text(
                '\${provider.completedCount}/\${provider.tasks.length} Done',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : provider.tasks.isEmpty
              ? const Center(child: Text('No tasks yet! Tap + to create one.'))
              : ListView.separated(
                  itemCount: provider.tasks.length,
                  separatorBuilder: (context, index) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final task = provider.tasks[index];

                    // TODO: Wrap in Dismissible with Key(task.id)
                    // - background: Container(color: Colors.red, alignment: Alignment.centerRight, child: Icon(Icons.delete))
                    // - onDismissed: (direction) => provider.deleteTask(task.id)
                    // - child: CheckboxListTile(...)
                    
                    return Dismissible(
                      key: Key(task.id),
                      direction: DismissDirection.endToStart,
                      background: Container(
                        color: Colors.red,
                        alignment: Alignment.centerRight,
                        padding: const EdgeInsets.only(right: 20),
                        child: const Icon(Icons.delete, color: Colors.white),
                      ),
                      onDismissed: (direction) {
                        provider.deleteTask(task.id);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Deleted "\${task.title}"')),
                        );
                      },
                      child: CheckboxListTile(
                        value: task.isCompleted,
                        onChanged: (val) {
                          provider.toggleTaskCompletion(task.id);
                        },
                        title: Text(
                          task.title,
                          style: TextStyle(
                            decoration: task.isCompleted
                                ? TextDecoration.lineThrough
                                : null,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        subtitle: Text(task.description),
                        secondary: CircleAvatar(
                          radius: 6,
                          backgroundColor: _getPriorityColor(task.priority),
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Will connect to TaskFormDialog in Step 5
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
`,
        solutionCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task_model.dart';
import '../providers/task_provider.dart';

class TaskListScreen extends StatelessWidget {
  const TaskListScreen({super.key});

  Color _getPriorityColor(TaskPriority priority) {
    switch (priority) {
      case TaskPriority.high:
        return Colors.red;
      case TaskPriority.medium:
        return Colors.orange;
      case TaskPriority.low:
        return Colors.green;
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<TaskProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Karmatix Task Manager'),
        actions: [
          Center(
            child: Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: Text(
                '\${provider.completedCount}/\${provider.tasks.length} Done',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : provider.tasks.isEmpty
              ? const Center(child: Text('No tasks yet! Tap + to create one.'))
              : ListView.separated(
                  itemCount: provider.tasks.length,
                  separatorBuilder: (context, index) => const Divider(height: 1),
                  itemBuilder: (context, index) {
                    final task = provider.tasks[index];

                    return Dismissible(
                      key: Key(task.id),
                      direction: DismissDirection.endToStart,
                      background: Container(
                        color: Colors.red,
                        alignment: Alignment.centerRight,
                        padding: const EdgeInsets.only(right: 20),
                        child: const Icon(Icons.delete, color: Colors.white),
                      ),
                      onDismissed: (direction) {
                        provider.deleteTask(task.id);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Deleted "\${task.title}"'),
                            action: SnackBarAction(
                              label: 'UNDO',
                              onPressed: () {
                                provider.addTask(task.title, task.description, task.priority);
                              },
                            ),
                          ),
                        );
                      },
                      child: CheckboxListTile(
                        value: task.isCompleted,
                        onChanged: (val) {
                          provider.toggleTaskCompletion(task.id);
                        },
                        title: Text(
                          task.title,
                          style: TextStyle(
                            decoration: task.isCompleted
                                ? TextDecoration.lineThrough
                                : null,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        subtitle: Text(task.description),
                        secondary: CircleAvatar(
                          radius: 6,
                          backgroundColor: _getPriorityColor(task.priority),
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Opens TaskFormDialog
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
`,
      },
    ],
    mentalModelHook: {
      title: 'The Sticky Note Board',
      mnemonic: 'List Tile = Note | Swipe = Trash | Checkbox = Strikethrough',
      description:
        'A mobile list is an interactive corkboard. Each item has a unique pin (`Key(task.id)`). When swiped left, `Dismissible` animates the removal; tapping the checkbox applies an instant strikethrough styling.',
    },
    whyItMatters: {
      title: 'Why Dismissible & ListView.separated are Exam Favorites',
      description:
        'In technical interviews, examiners frequently ask: "Why not use Column(children: ...) for a list?" Column renders all items upfront, crashing memory on 1,000 items. ListView.separated lazily builds only visible rows on screen and draws clean Dividers.',
    },
    learningMarkdown: `### 🎯 Mission Goal
Render our reactive list of tasks and implement mobile touch gestures (swipe to delete, checkbox toggle).

### Key Components
1. **\`context.watch<TaskProvider>()\`**:
   Subscribes this screen to provider notifications. Whenever a task is added or removed, \`build()\` executes automatically.
2. **\`Dismissible\`**:
   Enables mobile drag-to-delete. Requires a unique \`Key\` (like \`Key(task.id)\`) so Flutter can accurately match the widget element tree during animations.
3. **\`CheckboxListTile\`**:
   Combines checkbox state, label text, and tap handling across the entire row width for maximum touch accessibility.`,
    hints: {
      nudge:
        'Ensure Dismissible has a unique key: Key(task.id), a red background container with an Icon(Icons.delete), and calls provider.deleteTask(task.id) inside onDismissed.',
      syntaxOutline: `Dismissible(
  key: Key(task.id),
  direction: DismissDirection.endToStart,
  background: Container(color: Colors.red, child: Icon(Icons.delete)),
  onDismissed: (_) => provider.deleteTask(task.id),
  child: CheckboxListTile(...),
)`,
      solutionCode: `return Dismissible(
  key: Key(task.id),
  direction: DismissDirection.endToStart,
  background: Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    padding: const EdgeInsets.only(right: 20),
    child: const Icon(Icons.delete, color: Colors.white),
  ),
  onDismissed: (direction) {
    provider.deleteTask(task.id);
  },
  child: CheckboxListTile(
    value: task.isCompleted,
    onChanged: (_) => provider.toggleTaskCompletion(task.id),
    title: Text(task.title),
  ),
);`,
    },
    tests: [
      {
        id: 't4-1',
        name: 'ListView.separated used for task list',
        validate: (code) =>
          code.includes('ListView.separated') &&
          code.includes('separatorBuilder'),
        failureMessage:
          'Use ListView.separated with separatorBuilder for optimized scrolling performance.',
      },
      {
        id: 't4-2',
        name: 'Dismissible swipe-to-delete with unique Key',
        validate: (code) =>
          code.includes('Dismissible(') &&
          code.includes('Key(task.id)') &&
          code.includes('provider.deleteTask'),
        failureMessage:
          'Wrap list items in Dismissible with Key(task.id) and call provider.deleteTask in onDismissed.',
      },
      {
        id: 't4-3',
        name: 'CheckboxListTile bound to toggleTaskCompletion',
        validate: (code) =>
          code.includes('CheckboxListTile(') &&
          code.includes('provider.toggleTaskCompletion'),
        failureMessage:
          'Use CheckboxListTile and trigger provider.toggleTaskCompletion(task.id) in onChanged.',
      },
    ],
    successConsoleOutput: [
      '$ flutter test test/task_list_screen_test.dart',
      '✓ TaskListScreen renders AppBar title and progress count (32ms)',
      '✓ Displays CircularProgressIndicator when isLoading is true (18ms)',
      '✓ Renders ListView.separated with Dismissible tiles for each task (29ms)',
      '✓ Swiping Dismissible triggers provider.deleteTask (35ms)',
      '✓ Tapping checkbox dispatches toggleTaskCompletion (24ms)',
      '════════════════════════════════════════════════════════════════',
      '✅ All 5 UI widget tests passed! Step 4 verification complete.',
    ],
  },

  // -------------------------------------------------------------
  // STEP 5: FORM DIALOG & VALIDATION
  // -------------------------------------------------------------
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Form Validation & Input',
    subtitle: 'Create TaskFormDialog with TextFormField, GlobalKey<FormState>, and validators',
    badge: 'Step 5 of 6',
    activeFile: 'lib/widgets/task_form_dialog.dart',
    files: [
      {
        name: 'task_form_dialog.dart',
        path: 'lib/widgets/task_form_dialog.dart',
        starterCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task_model.dart';
import '../providers/task_provider.dart';

// Step 5: Input Validation & Creation Form
// TODO: Build TaskFormDialog (StatefulWidget)
// 1. _formKey = GlobalKey<FormState>()
// 2. _titleController & _descController
// 3. _selectedPriority = TaskPriority.medium
// 4. TextFormField for Title with validator (required, min 3 chars)
// 5. TextFormField for Description
// 6. DropdownButtonFormField for TaskPriority
// 7. Submit button triggering _formKey.currentState!.validate()

class TaskFormDialog extends StatefulWidget {
  const TaskFormDialog({super.key});

  @override
  State<TaskFormDialog> createState() => _TaskFormDialogState();
}

class _TaskFormDialogState extends State<TaskFormDialog> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  TaskPriority _selectedPriority = TaskPriority.medium;

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

  void _submit() {
    // TODO: 1. Validate form using _formKey.currentState!.validate()
    // TODO: 2. If valid, call context.read<TaskProvider>().addTask(...)
    // TODO: 3. Navigator.pop(context)
    // TODO: 4. Show SnackBar confirmation
    if (_formKey.currentState!.validate()) {
      context.read<TaskProvider>().addTask(
            _titleController.text,
            _descController.text,
            _selectedPriority,
          );
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Task created successfully! 🎉'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Add New Task'),
      content: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Title Field
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: 'Task Title *',
                  hintText: 'e.g. Study Flutter State',
                  border: OutlineInputBorder(),
                ),
                // TODO: Add validator:
                // Return 'Title is required' if empty
                // Return 'Must be at least 3 characters' if length < 3
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Title is required';
                  }
                  if (value.trim().length < 3) {
                    return 'Must be at least 3 characters';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Description Field
              TextFormField(
                controller: _descController,
                maxLines: 2,
                decoration: const InputDecoration(
                  labelText: 'Description (Optional)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),

              // Priority Dropdown
              DropdownButtonFormField<TaskPriority>(
                value: _selectedPriority,
                decoration: const InputDecoration(
                  labelText: 'Priority',
                  border: OutlineInputBorder(),
                ),
                items: TaskPriority.values.map((priority) {
                  return DropdownMenuItem(
                    value: priority,
                    child: Text(priority.name.toUpperCase()),
                  );
                }).toList(),
                onChanged: (val) {
                  if (val != null) {
                    setState(() => _selectedPriority = val);
                  }
                },
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _submit,
          child: const Text('Save Task'),
        ),
      ],
    );
  }
}
`,
        solutionCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/task_model.dart';
import '../providers/task_provider.dart';

class TaskFormDialog extends StatefulWidget {
  const TaskFormDialog({super.key});

  @override
  State<TaskFormDialog> createState() => _TaskFormDialogState();
}

class _TaskFormDialogState extends State<TaskFormDialog> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  TaskPriority _selectedPriority = TaskPriority.medium;

  @override
  void dispose() {
    _titleController.dispose();
    _descController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      context.read<TaskProvider>().addTask(
            _titleController.text,
            _descController.text,
            _selectedPriority,
          );
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Task created successfully! 🎉'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Add New Task'),
      content: Form(
        key: _formKey,
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextFormField(
                controller: _titleController,
                decoration: const InputDecoration(
                  labelText: 'Task Title *',
                  hintText: 'e.g. Study Flutter State',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Title is required';
                  }
                  if (value.trim().length < 3) {
                    return 'Must be at least 3 characters';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descController,
                maxLines: 2,
                decoration: const InputDecoration(
                  labelText: 'Description (Optional)',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<TaskPriority>(
                value: _selectedPriority,
                decoration: const InputDecoration(
                  labelText: 'Priority',
                  border: OutlineInputBorder(),
                ),
                items: TaskPriority.values.map((priority) {
                  return DropdownMenuItem(
                    value: priority,
                    child: Text(priority.name.toUpperCase()),
                  );
                }).toList(),
                onChanged: (val) {
                  if (val != null) {
                    setState(() => _selectedPriority = val);
                  }
                },
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: _submit,
          child: const Text('Save Task'),
        ),
      ],
    );
  }
}
`,
      },
    ],
    mentalModelHook: {
      title: 'The Customs Gate Inspector',
      mnemonic: 'GlobalKey<FormState> = Inspector | .validate() = Stamp of Approval',
      description:
        'A Form is a customs checkpoint. Individual TextFormFields are luggage bags. When the passenger taps "Save", `_formKey.currentState!.validate()` zips open every bag simultaneously. If any bag has invalid contents, the red error buzzer sounds!',
    },
    whyItMatters: {
      title: 'Form Validation is Tested on 90%+ of Mobile Developer Exams',
      description:
        'Company placement tests explicitly require form validation recipes: empty checks, character minimums, numeric constraints, and SnackBar alerts. Clean validation prevents corrupted data from entering your backend or SQLite tables.',
    },
    learningMarkdown: `### 🎯 Mission Goal
Implement input fields, validation rules, memory disposal, and modal dialog submissions.

### The 4 Pillars of Flutter Forms
1. **\`GlobalKey<FormState>\`**:
   The unique key granting access to the \`FormState\` element.
2. **\`TextEditingController\` & \`dispose()\`**:
   Reads text and cleans up native OS text input channel listeners when the dialog closes.
3. **\`validator: (value) => ...\`**:
   Returns \`null\` if the input is valid, or a descriptive error string if invalid.
4. **\`context.read<TaskProvider>()\`**:
   Notice we use \`context.read\` (NOT \`watch\`) inside a button click handler (\`_submit\`) to execute methods without needlessly rebuilding the dialog.`,
    hints: {
      nudge:
        'In the validator, check if (value == null || value.trim().isEmpty) return "Title is required"; then check if (value.trim().length < 3).',
      syntaxOutline: `validator: (value) {
  if (value == null || value.trim().isEmpty) {
    return 'Title is required';
  }
  if (value.trim().length < 3) {
    return 'Must be at least 3 characters';
  }
  return null;
}`,
      solutionCode: `  void _submit() {
    if (_formKey.currentState!.validate()) {
      context.read<TaskProvider>().addTask(
        _titleController.text,
        _descController.text,
        _selectedPriority,
      );
      Navigator.of(context).pop();
    }
  }`,
    },
    tests: [
      {
        id: 't5-1',
        name: 'GlobalKey<FormState> initialized',
        validate: (code) =>
          code.includes('GlobalKey<FormState>()') &&
          code.includes('key: _formKey'),
        failureMessage:
          'Initialize a GlobalKey<FormState>() and assign it to Form(key: _formKey).',
      },
      {
        id: 't5-2',
        name: 'TextFormField validator checks empty and length',
        validate: (code) =>
          code.includes('validator:') &&
          code.includes('.isEmpty') &&
          code.includes('.length < 3'),
        failureMessage:
          'Add a validator checking for empty input and minimum length of 3.',
      },
      {
        id: 't5-3',
        name: 'Controllers disposed in dispose()',
        validate: (code) =>
          code.includes('_titleController.dispose()') &&
          code.includes('super.dispose()'),
        failureMessage:
          'Remember to call _titleController.dispose() and _descController.dispose() in dispose().',
      },
      {
        id: 't5-4',
        name: 'Submit triggers validation and dispatches addTask',
        validate: (code) =>
          code.includes('_formKey.currentState!.validate()') &&
          code.includes('addTask('),
        failureMessage:
          'In _submit(), check _formKey.currentState!.validate() before dispatching addTask.',
      },
    ],
    successConsoleOutput: [
      '$ flutter test test/task_form_dialog_test.dart',
      '✓ Form renders Title, Description, and Priority dropdown (28ms)',
      '✓ Empty title triggers "Title is required" validation error (19ms)',
      '✓ 2-character title triggers "Must be at least 3 characters" (16ms)',
      '✓ Valid input calls provider.addTask and dismisses dialog (31ms)',
      '════════════════════════════════════════════════════════════════',
      '✅ All 4 form validation tests passed! Step 5 verification complete.',
    ],
  },

  // -------------------------------------------------------------
  // STEP 6: INTEGRATION, PREVIEW & POLISH
  // -------------------------------------------------------------
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Integration & Live Simulator',
    subtitle: 'Wire Provider into main.dart & test complete interactive CRUD application',
    badge: 'Step 6 of 6',
    activeFile: 'lib/main.dart',
    files: [
      {
        name: 'main.dart',
        path: 'lib/main.dart',
        starterCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'repositories/task_repository.dart';
import 'providers/task_provider.dart';
import 'screens/task_list_screen.dart';

// Step 6: Full Application Assembly
// TODO: 1. Instantiate InMemoryTaskRepository
// TODO: 2. Wrap root MaterialApp in ChangeNotifierProvider
// TODO: 3. Set TaskListScreen as home
// TODO: 4. Configure Material 3 Theme with primary sky blue

void main() {
  runApp(const KarmatixTaskApp());
}

class KarmatixTaskApp extends StatelessWidget {
  const KarmatixTaskApp({super.key});

  @override
  Widget build(BuildContext context) {
    // 1. Initialize repository dependency
    final taskRepository = InMemoryTaskRepository();

    return ChangeNotifierProvider(
      create: (context) => TaskProvider(taskRepository),
      child: MaterialApp(
        title: 'Karmatix Task Manager',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF0284C7), // Flutter Sky Blue
            brightness: Brightness.dark,
          ),
          scaffoldBackgroundColor: const Color(0xFF0B0F19),
        ),
        home: const TaskListScreen(),
      ),
    );
  }
}
`,
        solutionCode: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'repositories/task_repository.dart';
import 'providers/task_provider.dart';
import 'screens/task_list_screen.dart';

void main() {
  runApp(const KarmatixTaskApp());
}

class KarmatixTaskApp extends StatelessWidget {
  const KarmatixTaskApp({super.key});

  @override
  Widget build(BuildContext context) {
    final taskRepository = InMemoryTaskRepository();

    return ChangeNotifierProvider(
      create: (context) => TaskProvider(taskRepository),
      child: MaterialApp(
        title: 'Karmatix Task Manager',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF0284C7),
            brightness: Brightness.dark,
          ),
          scaffoldBackgroundColor: const Color(0xFF0B0F19),
        ),
        home: const TaskListScreen(),
      ),
    );
  }
}
`,
      },
    ],
    mentalModelHook: {
      title: 'The Electric Grid Connection',
      mnemonic: 'Main = Power Plant ➔ ChangeNotifierProvider = Substation ➔ UI = Appliances',
      description:
        'Injecting your Provider at the root `main.dart` is like connecting your house to the power grid. Every screen, list tile, and modal dialog can now tap into the current state without passing wires through the living room!',
    },
    whyItMatters: {
      title: 'Full Stack Flutter Proficiency',
      description:
        'Congratulations! You have authored a complete clean architecture mobile app: Model ➔ Repository ➔ Provider ➔ List UI ➔ Form Modal. You can now build, test, and ship real Flutter apps to iOS and Android.',
    },
    learningMarkdown: `### 🎯 Mission Accomplished!
You have assembled the complete Flutter Clean Architecture CRUD application.

### What You Built:
1. **Model Layer**: \`Task\` with immutability, \`copyWith\`, and JSON serialization.
2. **Repository Layer**: \`TaskRepository\` interface allowing storage implementations to swap seamlessly.
3. **State Management**: \`TaskProvider\` using \`ChangeNotifier\` for predictable, uncoupled reactive state.
4. **List View**: \`ListView.separated\` with \`Dismissible\` mobile swipe gestures.
5. **Form Validation**: \`TaskFormDialog\` enforcing required fields and error messages.
6. **Main Wiring**: Root \`ChangeNotifierProvider\` dependency injection with Material 3 styling.

Switch over to the **Interactive Phone Preview** in the right pane to test your finished app live!`,
    hints: {
      nudge:
        'Ensure ChangeNotifierProvider wraps MaterialApp and injects TaskProvider(InMemoryTaskRepository()).',
      syntaxOutline: `return ChangeNotifierProvider(
  create: (context) => TaskProvider(InMemoryTaskRepository()),
  child: MaterialApp(
    home: const TaskListScreen(),
  ),
);`,
      solutionCode: `class KarmatixTaskApp extends StatelessWidget {
  const KarmatixTaskApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TaskProvider(InMemoryTaskRepository()),
      child: MaterialApp(
        title: 'Karmatix Task Manager',
        theme: ThemeData.dark(),
        home: const TaskListScreen(),
      ),
    );
  }
}`,
    },
    tests: [
      {
        id: 't6-1',
        name: 'ChangeNotifierProvider wraps MaterialApp',
        validate: (code) =>
          code.includes('ChangeNotifierProvider(') &&
          code.includes('MaterialApp('),
        failureMessage:
          'Wrap MaterialApp inside ChangeNotifierProvider with create: (context) => TaskProvider(...).',
      },
      {
        id: 't6-2',
        name: 'TaskListScreen set as home route',
        validate: (code) =>
          code.includes('home: const TaskListScreen()') ||
          code.includes('home: TaskListScreen()'),
        failureMessage: 'Set home: const TaskListScreen() inside MaterialApp.',
      },
    ],
    successConsoleOutput: [
      '$ flutter build apk --debug',
      'Running Gradle task "assembleDebug"... (1.2s)',
      'Built build/app/outputs/flutter-apk/app-debug.apk',
      '$ flutter run -d chrome',
      'Launching lib/main.dart on Chrome in debug mode...',
      'Connecting to VM Service at ws://127.0.0.1:58492/ws',
      '════════════════════════════════════════════════════════════════',
      '🚀 App Launched Successfully! Flutter CRUD Lab 100% Completed!',
      '🏆 Congratulations! You have mastered Flutter CRUD Architecture!',
    ],
  },
];
