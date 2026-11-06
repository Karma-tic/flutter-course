import { Lesson } from '../../types';

export const module4Lessons: Lesson[] = [
  {
    id: 'm4-l1',
    moduleId: 'module-4',
    title: 'ListView, ListView.builder & ListTile (Android ListView & RecyclerView)',
    description: 'Exam Critical: Master scrollable lists! Understand ListView, ListView.builder, ListView.separated, ListTile, and learn the exact architectural mapping to Android ListView, ArrayAdapter, and RecyclerView ViewHolder.',
    order: 1,
    durationMinutes: 16,
    difficulty: 'Beginner',
    prerequisites: ['Module 3: Inputs and Forms'],
    lastVerified: 'November 2026',
    goal: 'Render scrollable lists of items on demand, understand lazy loading / recycling mechanics, and compare Flutter ListView.builder with Android RecyclerView.',
    simpleExplanation: `When displaying collections of items (like a submitted student list or product catalog), a simple Column will overflow the screen. You need a scrollable list.

### 1. The 3 Types of ListView:
- **\`ListView(children: [...])\`**: Loads **ALL** children into memory immediately. Use only for tiny lists (< 10 items).
- **\`ListView.builder(itemCount: ..., itemBuilder: ...)\`**: **LAZY LOADS** items on demand! It only constructs widgets currently visible on screen plus a small buffer. **This is Flutter's direct equivalent of Android's RecyclerView!**
- **\`ListView.separated(...)\`**: Like \`ListView.builder\`, but automatically inserts a separator widget (like \`Divider()\`) between every item.

### 2. The \`ListTile\` Widget
Flutter provides \`ListTile\`, a ready-made row widget conforming to Material design standards:
- **\`leading\`**: Widget on the left (e.g. \`CircleAvatar\` with student initials).
- **\`title\`**: Primary text (e.g. Student Name).
- **\`subtitle\`**: Secondary text (e.g. "Roll: 101 | Marks: 88 | Grade: A").
- **\`trailing\`**: Widget on the right (e.g. delete button or chevron arrow).
- **\`onTap\`**: Callback when the row is tapped.

### 3. Flutter ListView.builder vs Android RecyclerView:
- In native Android, building a list requires:
  1. An XML layout for the row
  2. A \`RecyclerView\` in the activity layout
  3. A custom \`RecyclerView.Adapter\` class
  4. A \`RecyclerView.ViewHolder\` class to cache view lookups
  5. Binding data in \`onBindViewHolder\`
- In Flutter, you achieve the exact same recycling performance in **just 6 lines of code** with \`ListView.builder\`!`,
    analogy: `Think of a theatre ticket booth queue:
- **Default ListView:** Buying 10,000 plastic chairs and setting them all up across 5 miles of highway, even though only 10 people are standing at the booth right now. It uses massive amounts of space (RAM).
- **ListView.builder (RecyclerView):** Keeping only 12 chairs right by the booth. As the person at the front gets their ticket and leaves, that chair is picked up and placed at the back of the line for the next person!`,
    codeSnippet: `import 'package:flutter/material.dart';

// Student Data Model
class StudentRecord {
  final String name;
  final String roll;
  final double marks;
  final String course;

  StudentRecord({required this.name, required this.roll, required this.marks, required this.course});

  String get grade => marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 50 ? 'B' : 'F';
}

class StudentListScreen extends StatelessWidget {
  final List<StudentRecord> students = [
    StudentRecord(name: 'Aarav Sharma', roll: '101', marks: 94.0, course: 'Flutter'),
    StudentRecord(name: 'Diya Patel', roll: '102', marks: 82.5, course: 'Android'),
    StudentRecord(name: 'Kabir Singh', roll: '103', marks: 71.0, course: 'Cloud'),
    StudentRecord(name: 'Ananya Roy', roll: '104', marks: 48.0, course: 'Flutter'),
  ];

  StudentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Enrolled Students (RecyclerView Equivalent)')),
      // ListView.separated automatically inserts dividers!
      body: ListView.separated(
        itemCount: students.length,
        separatorBuilder: (context, index) => const Divider(height: 1),
        itemBuilder: (context, index) {
          final student = students[index];
          final isPassed = student.marks >= 50;

          return ListTile(
            leading: CircleAvatar(
              backgroundColor: isPassed ? Colors.blue.shade100 : Colors.red.shade100,
              child: Text(student.grade, style: TextStyle(fontWeight: FontWeight.bold, color: isPassed ? Colors.blue : Colors.red)),
            ),
            title: Text(student.name, style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text('Roll: \${student.roll} • \${student.course} • Marks: \${student.marks}'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Selected \${student.name}')),
              );
            },
          );
        },
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Scaffold(
  appBar: AppBar(title: const Text('ListView.builder Demo')),
  body: ListView.builder(
    itemCount: 20,
    itemBuilder: (context, index) {
      return ListTile(
        leading: CircleAvatar(child: Text('#\${index + 1}')),
        title: Text('Student Item \${index + 1}'),
        subtitle: Text('Score: \${(index * 5) % 100} / 100'),
        trailing: const Icon(Icons.chevron_right),
      );
    },
  ),
)));`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Specify itemCount',
        description: 'Tells the builder how many total items exist in the data source.'
      },
      {
        step: 2,
        title: 'itemBuilder callback',
        description: 'Called lazily only for items that enter the visible viewport. Index ranges from 0 to itemCount - 1.'
      },
      {
        step: 3,
        title: 'Compose with ListTile',
        description: 'ListTile gives leading, title, subtitle, and trailing slots out of the box.'
      },
      {
        step: 4,
        title: 'Compare with Android RecyclerView',
        description: 'ListView.builder eliminates the need for manual ViewHolder classes and adapter boilerplate.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using default ListView(children: ...) for 1,000+ items.',
        fix: 'Always use ListView.builder for dynamic or large datasets.',
        why: 'Default ListView constructs all 1,000 widgets immediately in memory, causing frame drops and Out-Of-Memory (OOM) crashes.'
      },
      {
        mistake: 'Placing a ListView.builder directly inside a Column without wrapping it in Expanded.',
        fix: 'Wrap ListView.builder in an Expanded widget (or set shrinkWrap: true).',
        why: 'Both Column and ListView have unbounded vertical constraints, causing a layout error.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the Flutter equivalent of Android\'s RecyclerView and ListView?" — Answer: ListView.builder (and ListView.separated).',
      'Exam Alert: "Why does ListView.builder perform better than standard ListView for large datasets?" — Answer: Because it lazily instantiates widgets only when they scroll into the viewport and recycles resources, rather than instantiating all children upfront.'
    ],
    practiceTask: {
      task: 'Build a ListView.builder that displays a list of 5 course names: ["Flutter", "Android", "React Native", "iOS Swift", "Cloud"]. Each row should have an Icon(Icons.book) leading and the course name as title.',
      hint: 'itemCount: courses.length, itemBuilder: (context, i) => ListTile(leading: Icon(Icons.book), title: Text(courses[i]))',
      solution: `ListView.builder(
  itemCount: courses.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: const Icon(Icons.book, color: Colors.blue),
      title: Text(courses[index]),
    );
  },
)`
    },
    quiz: [
      {
        id: 'q4-1-1',
        question: 'What is the Flutter equivalent of Android\'s RecyclerView with ViewHolder recycling?',
        options: ['SingleChildScrollView', 'ListView.builder', 'Table', 'Row'],
        correctIndex: 1,
        explanation: 'ListView.builder builds children on demand as they scroll into view, providing identical view recycling to RecyclerView.'
      },
      {
        id: 'q4-1-2',
        question: 'What happens if you omit the "itemCount" property in a ListView.builder?',
        options: [
          'It defaults to 0',
          'It creates an infinite list that continues building items as long as the user scrolls',
          'It throws a compile-time syntax error',
          'It loads only 10 items'
        ],
        correctIndex: 1,
        explanation: 'Without itemCount, ListView.builder assumes an infinite list.'
      },
      {
        id: 'q4-1-3',
        question: 'Which constructor automatically places a separator (such as a Divider) between list items?',
        options: ['ListView.custom', 'ListView.separated', 'ListView.grid', 'ListView.split'],
        correctIndex: 1,
        explanation: 'ListView.separated takes a separatorBuilder to render widgets between items.'
      },
      {
        id: 'q4-1-4',
        question: 'Which widget provides ready-to-use slots for leading icon, title, subtitle, and trailing action in a list row?',
        options: ['Card', 'ListTile', 'Row', 'Container'],
        correctIndex: 1,
        explanation: 'ListTile is the canonical Material widget for formatted list rows.'
      },
      {
        id: 'q4-1-5',
        question: 'In native Android, what pattern does RecyclerView enforce to prevent repetitive findViewById() calls?',
        options: ['Singleton Pattern', 'ViewHolder Pattern', 'Factory Pattern', 'Observer Pattern'],
        correctIndex: 1,
        explanation: 'The ViewHolder pattern caches view references, reducing expensive layout lookups.'
      }
    ]
  },
  {
    id: 'm4-l2',
    moduleId: 'module-4',
    title: 'GridView, CustomScrollView & Slivers',
    description: 'Build 2D layouts and advanced scrolling effects! Master GridView.count, GridView.builder, CustomScrollView, SliverAppBar, and collapsible headers.',
    order: 2,
    durationMinutes: 14,
    difficulty: 'Intermediate',
    prerequisites: ['Module 4 Lesson 1: ListView'],
    lastVerified: 'November 2026',
    goal: 'Create responsive grids with GridView.builder, build collapsing app bars with SliverAppBar, and combine multiple scroll effects in a CustomScrollView.',
    simpleExplanation: `While \`ListView\` arranges items in a 1D column, **\`GridView\`** arranges items in a 2D grid (rows and columns).

### 1. \`GridView.builder\`
Like \`ListView.builder\`, it renders grid tiles lazily on demand:
\`\`\`dart
GridView.builder(
  itemCount: products.length,
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2, // 2 items per row
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 0.8, // width-to-height ratio
  ),
  itemBuilder: (context, index) => ProductCard(products[index]),
)
\`\`\`

### 2. What are Slivers and CustomScrollView?
A **Sliver** is a portion of a scrollable area.
Standard widgets (like \`Container\` or \`Card\`) use the box protocol. Slivers use the sliver protocol, which allows them to react dynamically to scroll offsets (e.g. shrinking, expanding, sticking to the top).
- **\`SliverAppBar\`**: A top bar that expands, collapses, or floats as you scroll!
- **\`SliverList\`**: The sliver version of ListView.
- **\`SliverGrid\`**: The sliver version of GridView.`,
    analogy: `Think of a shopping mall escalator:
As you ride up the escalator (scroll), the storefront sign at the top shrinks into a smaller banner so it doesn't block the view of the new stores entering your sight. That expanding/shrinking sign is a **SliverAppBar**!`,
    codeSnippet: `import 'package:flutter/material.dart';

class CollapsibleStudentPortal extends StatelessWidget {
  const CollapsibleStudentPortal({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // 1. Collapsing SliverAppBar
          SliverAppBar(
            expandedHeight: 180.0,
            floating: false,
            pinned: true, // Stays pinned at top when collapsed
            flexibleSpace: FlexibleSpaceBar(
              title: const Text('Student Dashboard'),
              background: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF02569B), Color(0xFF54C5F8)],
                  ),
                ),
              ),
            ),
          ),
          // 2. SliverGrid of Quick Actions
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.2,
              ),
              delegate: SliverChildListDelegate([
                _buildActionCard(Icons.person, 'New Student', Colors.blue),
                _buildActionCard(Icons.calculate, 'Discount Calc', Colors.green),
                _buildActionCard(Icons.assignment, 'Exam Prep', Colors.orange),
                _buildActionCard(Icons.analytics, 'Grade Stats', Colors.purple),
              ]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionCard(IconData icon, String title, Color color) {
    return Card(
      elevation: 2,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 36, color: color),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Scaffold(
  body: GridView.count(
    crossAxisCount: 2,
    padding: const EdgeInsets.all(16),
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    children: List.generate(6, (index) => Card(
      color: Colors.blue.shade100,
      child: Center(child: Text('Card #\${index + 1}')),
    )),
  ),
)));`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Configure crossAxisCount',
        description: 'crossAxisCount: 2 defines a two-column grid. On tablets, you can increase this to 3 or 4.'
      },
      {
        step: 2,
        title: 'Understand childAspectRatio',
        description: 'childAspectRatio is width / height. If ratio is 1.0, items are square; if 2.0, items are twice as wide as tall.'
      },
      {
        step: 3,
        title: 'CustomScrollView container',
        description: 'CustomScrollView combines multiple slivers (app bar, list, grid) into a single coordinated scroll view.'
      },
      {
        step: 4,
        title: 'SliverAppBar "pinned" property',
        description: 'pinned: true keeps the collapsed toolbar visible at the top even when scrolled all the way to the bottom.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Placing standard Box widgets (like Container or Card) directly inside CustomScrollView slivers array.',
        fix: 'Wrap box widgets in SliverToBoxAdapter(child: Container(...)).',
        why: 'CustomScrollView strictly accepts Slivers; passing a regular Box widget causes an assertion crash.'
      },
      {
        mistake: 'Ignoring childAspectRatio in GridView and getting squished or overflowing cards.',
        fix: 'Tune childAspectRatio (e.g. 0.75 for tall cards with images, 1.2 for compact cards).',
        why: 'The default ratio is 1.0 (perfect square), which may not fit multi-line text and buttons.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between a Box widget and a Sliver in Flutter?" — Answer: A Box widget renders within a fixed 2D bounding box (BoxConstraints); a Sliver is a scrollable slice that dynamically calculates its layout based on scroll position.',
      'Exam Alert: "How do you place a standard non-sliver widget inside a CustomScrollView?" — Answer: Wrap it in a SliverToBoxAdapter.'
    ],
    practiceTask: {
      task: 'Build a GridView with 3 columns displaying numbers 1 to 9 inside circular badges.',
      hint: 'GridView.count(crossAxisCount: 3, children: ...)',
      solution: `GridView.count(
  crossAxisCount: 3,
  padding: const EdgeInsets.all(12),
  crossAxisSpacing: 8,
  mainAxisSpacing: 8,
  children: List.generate(9, (i) => CircleAvatar(child: Text('\${i + 1}'))),
)`
    },
    quiz: [
      {
        id: 'q4-2-1',
        question: 'Which gridDelegate defines a grid with a fixed number of columns across the screen?',
        options: [
          'SliverGridDelegateWithFixedCrossAxisCount',
          'SliverGridDelegateWithMaxCrossAxisExtent',
          'SliverGridFlow',
          'GridDelegateStatic'
        ],
        correctIndex: 0,
        explanation: 'SliverGridDelegateWithFixedCrossAxisCount creates a layout with a fixed crossAxisCount.'
      },
      {
        id: 'q4-2-2',
        question: 'What is a Sliver in Flutter architecture?',
        options: [
          'A lightweight database',
          'A portion of a scrollable area that changes its shape and position based on scroll offset',
          'A Dart string slicing function',
          'An Android emulator plugin'
        ],
        correctIndex: 1,
        explanation: 'Slivers are the building blocks of custom scrolling effects in Flutter.'
      },
      {
        id: 'q4-2-3',
        question: 'Which widget allows embedding a standard non-sliver widget inside a CustomScrollView slivers list?',
        options: ['SliverToBoxAdapter', 'SliverWrapper', 'BoxToSliver', 'SliverContainer'],
        correctIndex: 0,
        explanation: 'SliverToBoxAdapter bridges regular Box widgets into a Sliver viewport.'
      },
      {
        id: 'q4-2-4',
        question: 'In SliverAppBar, what does "pinned: true" do?',
        options: [
          'Locks the phone orientation',
          'Keeps the collapsed AppBar toolbar visible at the top of the screen when scrolled down',
          'Hides the AppBar immediately',
          'Pins the app to the home screen'
        ],
        correctIndex: 1,
        explanation: 'pinned: true prevents the collapsed header from scrolling offscreen.'
      },
      {
        id: 'q4-2-5',
        question: 'In a GridView, what does a childAspectRatio of 2.0 mean?',
        options: [
          'The height is twice the width',
          'The width is twice the height (width / height = 2.0)',
          'The grid has 2 columns',
          'Items are duplicated twice'
        ],
        correctIndex: 1,
        explanation: 'childAspectRatio is defined as the ratio of cross-axis width to main-axis height.'
      }
    ]
  },
  {
    id: 'm4-l3',
    moduleId: 'module-4',
    title: 'Interactive Lists: Pull to Refresh, Swipe to Delete & Pagination',
    description: 'Build polished lists: implement RefreshIndicator for pull-to-refresh, Dismissible for swipe-to-delete with undo SnackBar, and infinite scroll pagination with ScrollController.',
    order: 3,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 4 Lesson 1: ListView'],
    lastVerified: 'November 2026',
    goal: 'Add pull-to-refresh using RefreshIndicator, swipe-to-delete using Dismissible with background colors and confirmation, and detect scroll threshold for pagination.',
    simpleExplanation: `Modern apps require interactive lists:

### 1. Pull to Refresh (\`RefreshIndicator\`)
Wrap your \`ListView\` in a \`RefreshIndicator\`. When the user drags down from the top, a circular spinner appears and triggers an async callback:
\`\`\`dart
RefreshIndicator(
  onRefresh: () async {
    await fetchLatestStudents();
  },
  child: ListView.builder(...),
)
\`\`\`

### 2. Swipe to Delete (\`Dismissible\`)
Wrap each list item in a \`Dismissible\` widget:
- **\`key\`**: A unique \`Key\` (mandatory so Flutter tracks which item was deleted).
- **\`background\`**: Red container with a trash can icon revealed as the user swipes.
- **\`onDismissed\`**: Remove item from your data list and show an "Undo" SnackBar!

### 3. Infinite Scroll Pagination (\`ScrollController\`)
To load the next page of items when the user scrolls near the bottom:
\`\`\`dart
_scrollController.addListener(() {
  if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 200) {
    loadNextPage();
  }
});
\`\`\``,
    analogy: `Think of a deck of flashcards:
- **Pull to Refresh:** Tapping the deck on the table to shuffle in newly printed cards.
- **Swipe to Delete (Dismissible):** Flicking a card off the table into the wastebasket. If you made a mistake, you can quickly fish it back out with "Undo"!
- **Pagination:** Reaching for the next box of cards from the shelf only when your current stack is running low.`,
    codeSnippet: `import 'package:flutter/material.dart';

class InteractiveStudentList extends StatefulWidget {
  const InteractiveStudentList({super.key});

  @override
  State<InteractiveStudentList> createState() => _InteractiveStudentListState();
}

class _InteractiveStudentListState extends State<InteractiveStudentList> {
  List<String> _students = ['Alex', 'Beth', 'Carlos', 'David', 'Elena'];

  Future<void> _refreshList() async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      _students = ['Alex (Updated)', 'Beth', 'Carlos', 'David', 'Elena', 'Farhan (New)'];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Interactive Student List')),
      body: RefreshIndicator(
        onRefresh: _refreshList,
        child: ListView.builder(
          itemCount: _students.length,
          itemBuilder: (context, index) {
            final studentName = _students[index];

            return Dismissible(
              // Unique key is strictly mandatory!
              key: Key(studentName),
              direction: DismissDirection.endToStart,
              background: Container(
                color: Colors.red,
                alignment: Alignment.centerRight,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: const Icon(Icons.delete, color: Colors.white),
              ),
              onDismissed: (direction) {
                final removedStudent = studentName;
                final removedIndex = index;

                setState(() {
                  _students.removeAt(index);
                });

                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Removed \$removedStudent'),
                    action: SnackBarAction(
                      label: 'UNDO',
                      onPressed: () {
                        setState(() {
                          _students.insert(removedIndex, removedStudent);
                        });
                      },
                    ),
                  ),
                );
              },
              child: ListTile(
                leading: CircleAvatar(child: Text(studentName[0])),
                title: Text(studentName),
                subtitle: const Text('Swipe left to remove'),
              ),
            );
          },
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: Scaffold(
  body: RefreshIndicator(
    onRefresh: () async => await Future.delayed(Duration(seconds: 1)),
    child: ListView(
      children: const [
        ListTile(title: Text('Pull down to test RefreshIndicator!')),
        ListTile(title: Text('Item 2')),
      ],
    ),
  ),
)));`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Wrap with RefreshIndicator',
        description: 'Provide an onRefresh callback that returns a Future. When the Future resolves, the spinner dismisses.'
      },
      {
        step: 2,
        title: 'Wrap ListTile with Dismissible',
        description: 'Set key: ValueKey(item.id) to provide a stable identity.'
      },
      {
        step: 3,
        title: 'Define background widget',
        description: 'Provide visual cues (e.g. red background with trash icon) to indicate the swipe action.'
      },
      {
        step: 4,
        title: 'Implement Undo via SnackBarAction',
        description: 'Preserve the removed item and index so the user can re-insert it if they tap Undo.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using index as the key in Dismissible: key: Key(index.toString()).',
        fix: 'Always use a unique entity ID or unique property: key: ValueKey(student.id).',
        why: 'Using index causes Flutter to dismiss the wrong widget when list elements shift positions.'
      },
      {
        mistake: 'Forgetting to remove the item from the data source inside onDismissed.',
        fix: 'Call setState(() => list.removeAt(index)); in onDismissed.',
        why: 'If the data is not removed from the underlying list, Flutter throws an exception: "A dismissed Dismissible widget is still part of the tree".'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which widget provides swipe-to-dismiss functionality in Flutter?" — Answer: Dismissible.',
      'Exam Alert: "Why is a unique Key mandatory for Dismissible?" — Answer: To uniquely identify which widget in the element tree was dismissed and prevent visual reconciliation bugs.'
    ],
    practiceTask: {
      task: 'Create a Dismissible item with a confirmDismiss callback that displays an AlertDialog asking: "Are you sure you want to delete this student?" Return true if user taps Yes, false if Cancel.',
      hint: 'confirmDismiss: (direction) async { return await showDialog<bool>(...); }',
      solution: `Dismissible(
  key: const Key('item-1'),
  confirmDismiss: (direction) async {
    return await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Confirm Delete'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          ElevatedButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Delete')),
        ],
      ),
    );
  },
  child: const ListTile(title: Text('Student Item')),
)`
    },
    quiz: [
      {
        id: 'q4-3-1',
        question: 'Which widget enables pull-to-refresh behavior in Flutter?',
        options: ['SwipeToRefresh', 'RefreshIndicator', 'PullDownMenu', 'UpdateBox'],
        correctIndex: 1,
        explanation: 'RefreshIndicator is Flutter\'s Material pull-to-refresh component.'
      },
      {
        id: 'q4-3-2',
        question: 'What error occurs if you dismiss a Dismissible widget but forget to remove the item from your data list in onDismissed?',
        options: [
          'A compile error',
          'A runtime exception: "A dismissed Dismissible widget is still part of the tree"',
          'The phone restarts',
          'Nothing happens'
        ],
        correctIndex: 1,
        explanation: 'Flutter requires the underlying model list to reflect the removal immediately in onDismissed.'
      },
      {
        id: 'q4-3-3',
        question: 'Why should you avoid using list index (e.g. Key(index.toString())) for a Dismissible key?',
        options: [
          'Keys cannot be numbers',
          'When an item is deleted, subsequent items shift indexes, causing Flutter to associate old widgets with wrong data',
          'It is slower',
          'It disables animations'
        ],
        correctIndex: 1,
        explanation: 'Keys must follow the identity of the data object, not its transient array position.'
      },
      {
        id: 'q4-3-4',
        question: 'Which callback allows you to intercept a swipe and ask for confirmation before the item disappears?',
        options: ['onSwipe()', 'confirmDismiss', 'shouldDelete', 'beforeDismiss'],
        correctIndex: 1,
        explanation: 'confirmDismiss accepts an async callback returning Future<bool?> indicating whether to proceed with dismissal.'
      },
      {
        id: 'q4-3-5',
        question: 'How do you detect when a user has scrolled near the bottom of a list for pagination?',
        options: [
          'Using a ScrollController and listening to scrollController.position.pixels >= maxScrollExtent',
          'By counting seconds with a Timer',
          'Using MediaQuery',
          'By checking internet speed'
        ],
        correctIndex: 0,
        explanation: 'ScrollController notifies listeners of scroll metrics including current pixels and maxScrollExtent.'
      }
    ]
  },
  {
    id: 'm4-l4',
    moduleId: 'module-4',
    title: 'Navigator 1.0: Push, Pop, Passing & Returning Data',
    description: 'Exam Critical: Master screen transitions! Understand Navigator.push, Navigator.pop, passing arguments to new screens, and returning data back from a secondary screen.',
    order: 4,
    durationMinutes: 15,
    difficulty: 'Beginner',
    prerequisites: ['Module 4 Lesson 1: ListView'],
    lastVerified: 'November 2026',
    goal: 'Navigate between screens using Navigator.push and Navigator.pop, pass objects to new screens via constructors, and await return results.',
    simpleExplanation: `In mobile apps, screens are managed like a **stack of playing cards**.

### 1. \`Navigator.push()\` (Moving Forward)
Places a new screen on top of the stack:
\`\`\`dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => StudentDetailScreen(student: selectedStudent),
  ),
);
\`\`\`
On Android, this slides the new screen in from the bottom/right. Flutter automatically adds a back button in the AppBar!

### 2. \`Navigator.pop()\` (Going Back)
Removes the top screen from the stack, revealing the previous screen underneath:
\`\`\`dart
Navigator.pop(context);
\`\`\`

### 3. Returning Data Back to the Previous Screen (Exam Favorite!)
When screen B needs to send data back to screen A (e.g. picking a course or confirming a grade):
1. **In Screen A (Wait for the result):**
   \`\`\`dart
   final result = await Navigator.push(
     context,
     MaterialPageRoute(builder: (context) => CourseSelectionScreen()),
   );
   if (result != null) {
     print('User chose course: $result');
   }
   \`\`\`
2. **In Screen B (Return the result in \`pop\`):**
   \`\`\`dart
   Navigator.pop(context, 'Flutter Development');
   \`\`\``,
    analogy: `Think of a stack of dinner plates in a cafeteria:
- **Navigator.push:** The kitchen worker places a new clean dinner plate on top of the stack. Everyone sees the new plate.
- **Navigator.pop:** A hungry student picks up the top plate. The previous plate underneath is revealed again.
- **Returning data:** The student writes a feedback note on the plate before handing it back to the cashier!`,
    codeSnippet: `import 'package:flutter/material.dart';

// Screen A: The Main Form
class ScreenA extends StatefulWidget {
  const ScreenA({super.key});

  @override
  State<ScreenA> createState() => _ScreenAState();
}

class _ScreenAState extends State<ScreenA> {
  String _selectedCourse = 'None Selected';

  void _openCoursePicker() async {
    // 1. Await the data returned by Screen B!
    final result = await Navigator.push<String>(
      context,
      MaterialPageRoute(builder: (context) => const ScreenB()),
    );

    // 2. Update state if a course was returned
    if (result != null) {
      setState(() {
        _selectedCourse = result;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Screen A: Registration')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Selected Course: \$_selectedCourse', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _openCoursePicker,
              child: const Text('Pick Course from Screen B'),
            ),
          ],
        ),
      ),
    );
  }
}

// Screen B: The Secondary Screen that returns data
class ScreenB extends StatelessWidget {
  const ScreenB({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Screen B: Select Course')),
      body: ListView(
        children: [
          ListTile(
            title: const Text('Flutter & Dart'),
            onTap: () => Navigator.pop(context, 'Flutter & Dart'),
          ),
          ListTile(
            title: const Text('Native Android (Kotlin)'),
            onTap: () => Navigator.pop(context, 'Native Android (Kotlin)'),
          ),
          ListTile(
            title: const Text('Cloud Computing'),
            onTap: () => Navigator.pop(context, 'Cloud Computing'),
          ),
        ],
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: FirstScreen()));

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (c) => const SecondScreen()));
          },
          child: const Text('Go to Second Screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Screen')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Go Back'),
        ),
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'MaterialPageRoute creates transition',
        description: 'MaterialPageRoute adapts platform-specific animations (fade/slide on Android, slide-from-right on iOS).'
      },
      {
        step: 2,
        title: 'Pass data via constructor',
        description: 'To pass data forward to the next screen, pass it directly into the child widget\'s constructor.'
      },
      {
        step: 3,
        title: 'Pass data back in pop',
        description: 'Navigator.pop(context, resultValue) sends resultValue back as the resolved value of the push Future.'
      },
      {
        step: 4,
        title: 'Automatic Back Button',
        description: 'If Navigator.canPop(context) is true, AppBar automatically draws a back arrow that calls Navigator.pop().'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using context across an async gap after Navigator.push without mounted check.',
        fix: 'if (!mounted) return; before using context after an await.',
        why: 'If the user left the screen while the operation was running, the context is unmounted.'
      },
      {
        mistake: 'Calling Navigator.pop() when there are no screens left on the stack.',
        fix: 'Check if (Navigator.canPop(context)) Navigator.pop(context);',
        why: 'Popping an empty stack closes the app or crashes.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "How do you pass data back to the previous screen when popping in Flutter?" — Answer: Pass the data as the second argument to Navigator.pop(context, resultData), and await the Navigator.push() call on the calling screen.',
      'Exam Alert: "What is MaterialPageRoute?" — Answer: A modal route that replaces the entire screen with a platform-adaptive transition animation.'
    ],
    practiceTask: {
      task: 'Write a button that navigates to a "DiscountHelpScreen". When the user closes the help screen, show a SnackBar: "Help screen dismissed".',
      hint: 'await Navigator.push(...); ScaffoldMessenger.of(context).showSnackBar(...);',
      solution: `ElevatedButton(
  onPressed: () async {
    await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const DiscountHelpScreen()),
    );
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Help screen dismissed')),
    );
  },
  child: const Text('Help'),
)`
    },
    quiz: [
      {
        id: 'q4-4-1',
        question: 'Which method pushes a new route onto the navigation stack in Flutter?',
        options: ['Navigator.forward()', 'Navigator.push()', 'Navigator.next()', 'Navigator.route()'],
        correctIndex: 1,
        explanation: 'Navigator.push() places a new route on top of the navigation stack.'
      },
      {
        id: 'q4-4-2',
        question: 'How do you return data back to the calling screen using Navigator?',
        options: [
          'Pass the data as a parameter to Navigator.pop(context, returnData)',
          'Save the data to a global variable only',
          'Use an Android Intent bundle',
          'Data cannot be returned via Navigator'
        ],
        correctIndex: 0,
        explanation: 'Navigator.pop(context, result) resolves the Future returned by Navigator.push with the result value.'
      },
      {
        id: 'q4-4-3',
        question: 'What data structure manages screen routes in Flutter Navigator 1.0?',
        options: ['Queue (FIFO)', 'Stack (LIFO)', 'Linked List', 'Binary Tree'],
        correctIndex: 1,
        explanation: 'Navigator manages routes as a Last-In, First-Out (LIFO) stack.'
      },
      {
        id: 'q4-4-4',
        question: 'What does MaterialPageRoute provide automatically on Android and iOS?',
        options: [
          'Platform-appropriate transition animations (slide/fade) and gestures',
          'Google Maps integration',
          'Cloud storage',
          'Push notifications'
        ],
        correctIndex: 0,
        explanation: 'MaterialPageRoute handles native transition animations and swipe-to-back gestures.'
      },
      {
        id: 'q4-4-5',
        question: 'Why should you check "if (!mounted) return;" after an await Navigator.push() call?',
        options: [
          'To clean memory',
          'To ensure the current widget is still attached to the widget tree before using its BuildContext',
          'To speed up the app',
          'It is not needed'
        ],
        correctIndex: 1,
        explanation: 'If the widget was disposed while the pushed screen was active, referencing its context causes runtime errors.'
      }
    ]
  },
  {
    id: 'm4-l5',
    moduleId: 'module-4',
    title: 'Modern Routing with go_router & BottomNav State Preservation',
    description: 'Learn enterprise Flutter routing! Configure declarative routing with go_router, deep linking, path parameters (/student/:id), and preserving BottomNavigationBar tab state using IndexedStack.',
    order: 5,
    durationMinutes: 16,
    difficulty: 'Intermediate',
    prerequisites: ['Module 4 Lesson 4: Navigator 1.0'],
    lastVerified: 'November 2026',
    goal: 'Configure declarative go_router routes, handle web deep links, and preserve tab scroll positions using IndexedStack or StatefulShellRoute.',
    simpleExplanation: `While Navigator 1.0 is simple, modern enterprise apps and Flutter Web require **declarative routing** that supports deep links and URL synchronization. The official Google package for this is **\`go_router\`**.

### 1. What is \`go_router\`?
Instead of hardcoding transitions, you declare routes as URL paths:
\`\`\`dart
final GoRouter _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    GoRoute(
      path: '/student/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return StudentDetailScreen(studentId: id);
      },
    ),
  ],
);
\`\`\`

### 2. Navigating with \`go\` vs \`push\`
- **\`context.go('/student/101')\`**: Changes the active path (replaces URL in browser).
- **\`context.push('/student/101')\`**: Pushes a new route on top of the current route stack.

### 3. Preserving BottomNavigationBar Tab State (\`IndexedStack\`)
In a standard \`BottomNavigationBar\`, switching tabs normally destroys and recreates the child widget, losing scroll positions and form entries!
Wrapping your tabs in an **\`IndexedStack\`** keeps **all tab widgets alive in memory simultaneously**, toggling visibility instantly without re-running build!`,
    analogy: `Think of television channels:
- Without IndexedStack: Every time you switch from Channel 5 to Channel 7, Channel 5's TV station burns down, and when you switch back they have to rebuild the television station from scratch!
- With IndexedStack: Both Channel 5 and Channel 7 are playing simultaneously in the background. You simply switch which screen you are looking at with zero reload delay!`,
    codeSnippet: `import 'package:flutter/material.dart';

// Preserving Tab State with IndexedStack
class PersistentTabScaffold extends StatefulWidget {
  const PersistentTabScaffold({super.key});

  @override
  State<PersistentTabScaffold> createState() => _PersistentTabScaffoldState();
}

class _PersistentTabScaffoldState extends State<PersistentTabScaffold> {
  int _currentIndex = 0;

  // The 3 tab pages
  final List<Widget> _pages = const [
    StudentFormTab(),
    StudentListTab(),
    AnalyticsTab(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('State-Preserved Portal')),
      // IndexedStack preserves scroll position & form inputs across tabs!
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.edit_document), label: 'Register'),
          NavigationDestination(icon: Icon(Icons.list_alt), label: 'Students'),
          NavigationDestination(icon: Icon(Icons.bar_chart), label: 'Grades'),
        ],
      ),
    );
  }
}

class StudentFormTab extends StatelessWidget {
  const StudentFormTab({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Form Tab (Input preserved!)'));
}

class StudentListTab extends StatelessWidget {
  const StudentListTab({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('List Tab (Scroll preserved!)'));
}

class AnalyticsTab extends StatelessWidget {
  const AnalyticsTab({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Analytics Tab'));
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: IndexedStackDemo()));

class IndexedStackDemo extends StatefulWidget {
  const IndexedStackDemo({super.key});
  @override
  State<IndexedStackDemo> createState() => _IndexedStackDemoState();
}

class _IndexedStackDemoState extends State<IndexedStackDemo> {
  int index = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: index,
        children: const [
          Center(child: Text('Page 1', style: TextStyle(fontSize: 24))),
          Center(child: Text('Page 2', style: TextStyle(fontSize: 24))),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: index,
        onTap: (i) => setState(() => index = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Install go_router',
        description: 'Run flutter pub add go_router in terminal to install Google\'s recommended routing package.'
      },
      {
        step: 2,
        title: 'Use MaterialApp.router',
        description: 'Replace standard MaterialApp with MaterialApp.router(routerConfig: _router).'
      },
      {
        step: 3,
        title: 'Deep linking path parameters',
        description: 'Define dynamic segments with :id (e.g. /student/:id) and retrieve with state.pathParameters["id"].'
      },
      {
        step: 4,
        title: 'Preserve state with IndexedStack',
        description: 'Use IndexedStack for bottom navigation so users don\'t lose typed text or scroll offset when switching tabs.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using a switch statement on selectedTab without IndexedStack in body.',
        fix: 'Use IndexedStack(index: currentIndex, children: pages).',
        why: 'A switch statement destroys the previous widget from the tree, wiping scroll state and input values.'
      },
      {
        mistake: 'Hardcoding path parameters without URL encoding.',
        fix: 'Ensure dynamic segments are properly sanitized or encoded.',
        why: 'Special characters (like spaces or slashes) will break deep link URL matching.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which widget preserves the state and scroll position of inactive tabs in a BottomNavigationBar?" — Answer: IndexedStack (or StatefulShellRoute in go_router).',
      'Exam Alert: "What is Google\'s officially recommended declarative routing package for Flutter apps?" — Answer: go_router.'
    ],
    practiceTask: {
      task: 'Build a Scaffold with IndexedStack managing two tabs: Tab 1 has a TextField with "Type here", and Tab 2 has a Text("Tab 2"). Verify that typing into the text field persists when switching to Tab 2 and back.',
      hint: 'IndexedStack(index: activeIndex, children: [TextField(...), Text(...)])',
      solution: `Scaffold(
  body: IndexedStack(
    index: currentTab,
    children: [
      Padding(
        padding: const EdgeInsets.all(24.0),
        child: TextField(decoration: const InputDecoration(labelText: 'Type to test persistence')),
      ),
      const Center(child: Text('Tab 2 Content')),
    ],
  ),
  bottomNavigationBar: NavigationBar(
    selectedIndex: currentTab,
    onDestinationSelected: (i) => setState(() => currentTab = i),
    destinations: const [
      NavigationDestination(icon: Icon(Icons.edit), label: 'Tab 1'),
      NavigationDestination(icon: Icon(Icons.info), label: 'Tab 2'),
    ],
  ),
)`
    },
    quiz: [
      {
        id: 'q4-5-1',
        question: 'Which widget allows keeping multiple child widgets alive in memory while displaying only one at a given index?',
        options: ['IndexedStack', 'Stack', 'PageView', 'TabBarView'],
        correctIndex: 0,
        explanation: 'IndexedStack lays out all children but displays only the child at the specified index, preserving state.'
      },
      {
        id: 'q4-5-2',
        question: 'What is Google\'s officially maintained declarative routing package for Flutter?',
        options: ['flutter_route', 'go_router', 'auto_route', 'react_router'],
        correctIndex: 1,
        explanation: 'go_router is Google\'s recommended routing package supporting deep links, redirects, and state preservation.'
      },
      {
        id: 'q4-5-3',
        question: 'How do you extract a path parameter like "/student/:id" in go_router?',
        options: [
          'state.pathParameters["id"]',
          'request.query["id"]',
          'context.getId()',
          'RouteParams.id'
        ],
        correctIndex: 0,
        explanation: 'state.pathParameters provides a Map of URL path tokens.'
      },
      {
        id: 'q4-5-4',
        question: 'What is the main benefit of declarative routing (go_router) over imperative Navigator 1.0 on Flutter Web?',
        options: [
          'It changes browser address bar URLs seamlessly and supports deep links',
          'It uses less RAM',
          'It connects to Bluetooth',
          'It compiles Dart to Python'
        ],
        correctIndex: 0,
        explanation: 'Declarative routing synchronizes route state directly with browser URLs.'
      },
      {
        id: 'q4-5-5',
        question: 'What constructor of MaterialApp is required when using go_router?',
        options: ['MaterialApp.builder', 'MaterialApp.router', 'MaterialApp.custom', 'MaterialApp.modular'],
        correctIndex: 1,
        explanation: 'MaterialApp.router(routerConfig: ...) delegates route handling to a RouterDelegate.'
      }
    ]
  }
];
