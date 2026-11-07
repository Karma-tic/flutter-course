import { Lesson } from '../../types';

export const module2Lessons: Lesson[] = [
  {
    id: 'm2-l1',
    moduleId: 'module-2',
    title: 'Everything is a Widget: StatelessWidget vs StatefulWidget',
    description: 'Understand the fundamental rule of Flutter: Everything is a Widget! Master the difference between StatelessWidget and StatefulWidget, the build() method, setState(), and BuildContext.',
    order: 1,
    durationMinutes: 14,
    difficulty: 'Beginner',
    prerequisites: ['Module 1: Dart Fundamentals'],
    lastVerified: 'November 2026',
    goal: 'Know when to choose StatelessWidget vs StatefulWidget, understand how setState() triggers the build() method, and understand what BuildContext is.',
    simpleExplanation: `In Flutter, **EVERYTHING YOU SEE ON THE SCREEN IS A WIDGET**. Explore the [Official Flutter Widget Catalog](https://docs.flutter.dev/ui/widgets) to see hundreds of pre-built widgets created by Google.
A button is a widget. A piece of text is a widget. The padding around a widget is a widget. Even the entire app itself is a widget! Read [Introduction to Widgets (Flutter Docs)](https://docs.flutter.dev/ui) for official architectural diagrams.

Flutter has two main types of widgets:

### 1. StatelessWidget (Immutable / Never Changes)
Use this when the UI depends **only on the information passed into it** and never changes on its own (e.g. a static title, an icon, a copyright footer).
Once built, it never updates unless its parent rebuilds it with new data.

### 2. StatefulWidget (Mutable / Dynamic State)
Use this when the UI needs to **change dynamically in response to user interaction** (e.g. typing in a text field, checking a checkbox, clicking a counter button, or loading data from an API).
A StatefulWidget is split into two classes:
1. The widget class itself (extends \`StatefulWidget\`), which is immutable.
2. The companion State class (extends \`State<MyWidget>\`), which holds the mutable variables and the \`build()\` method.

### How \`setState()\` Works
When you want to update the screen, you call \`setState(() { ... })\`.
Flutter immediately marks that widget as "dirty" and schedules its \`build()\` method to re-run on the very next frame (1/60th of a second), repainting the new values on the screen!

### What is \`BuildContext\`?
\`BuildContext\` is like your widget's **location card** inside the giant widget tree. It tells Flutter where this widget sits relative to its parent, siblings, and ancestors, allowing it to look up themes, screen dimensions, and navigation controllers.`,
    analogy: `Think of a picture frame vs an electronic digital scoreboard:
- **StatelessWidget:** A printed photograph of your family in a wooden picture frame. Once printed and hung on the wall, the photograph never changes.
- **StatefulWidget:** A digital scoreboard at a basketball game. When a team scores, the referee presses a button (\`setState\`), the digits instantly update on the board, and the crowd cheers!
- **BuildContext:** The row and seat number on your stadium ticket. It tells the usher exactly where you are sitting in the arena.`,
    codeSnippet: `import 'package:flutter/material.dart';

// 1. A clean StatelessWidget
class WelcomeHeader extends StatelessWidget {
  final String title;
  const WelcomeHeader({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
    );
  }
}

// 2. An interactive StatefulWidget
class ClickCounter extends StatefulWidget {
  const ClickCounter({super.key});

  @override
  State<ClickCounter> createState() => _ClickCounterState();
}

class _ClickCounterState extends State<ClickCounter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++; // Tells Flutter: "Counter changed, repaint the UI!"
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Taps count: \$_counter', style: const TextStyle(fontSize: 18)),
        const SizedBox(height: 12),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Tap Me!'),
        ),
      ],
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: CounterDemo()));

class CounterDemo extends StatefulWidget {
  const CounterDemo({super.key});

  @override
  State<CounterDemo> createState() => _CounterDemoState();
}

class _CounterDemoState extends State<CounterDemo> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('StatefulWidget Demo')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Count: \$count', style: const TextStyle(fontSize: 28)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => setState(() => count++),
              child: const Text('Increment Count'),
            ),
          ],
        ),
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'StatelessWidget override build()',
        description: 'Every widget must override the build(BuildContext context) method and return a Widget.'
      },
      {
        step: 2,
        title: 'StatefulWidget creates State',
        description: 'StatefulWidget overrides createState() to instantiate its companion State object.'
      },
      {
        step: 3,
        title: 'Calling setState()',
        description: 'Never modify state variables directly without setState(). Wrapping the mutation in setState() alerts Flutter to schedule a rebuild.'
      },
      {
        step: 4,
        title: 'BuildContext role',
        description: 'BuildContext gives access to Theme.of(context), MediaQuery.of(context), and Navigator.of(context).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Modifying state variables without calling setState(): _counter++;',
        fix: 'Wrap the change in setState(() { _counter++; });',
        why: 'Without setState(), the variable changes in memory, but Flutter is never notified to repaint the screen.'
      },
      {
        mistake: 'Calling setState() inside the build() method.',
        fix: 'Only call setState() in event handlers (like onPressed, onChanged) or callbacks, never inside build().',
        why: 'Calling setState() inside build() triggers an infinite rebuild loop, crashing the app.'
      }
    ],
    examAlerts: [
      'Exam Alert (Very Common): "What is the difference between a StatelessWidget and a StatefulWidget?" — Answer: A StatelessWidget is immutable and cannot change its internal state during its lifetime; a StatefulWidget maintains a mutable State object that can change dynamically and trigger UI rebuilds via setState().',
      'Exam Alert: "What is BuildContext in Flutter?" — Answer: A handle to the location of a widget in the widget tree.'
    ],
    practiceTask: {
      task: 'Create a StatefulWidget with an initial double variable "marks = 50.0". Add two buttons: one that increases marks by 5 (up to 100), and one that decreases marks by 5 (down to 0). Display the current marks and Grade on screen.',
      hint: 'Use setState(() { if (marks < 100) marks += 5; });',
      solution: `class MarksChanger extends StatefulWidget {
  const MarksChanger({super.key});

  @override
  State<MarksChanger> createState() => _MarksChangerState();
}

class _MarksChangerState extends State<MarksChanger> {
  double marks = 50.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Marks: \$marks / 100'),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => setState(() => marks = (marks - 5).clamp(0, 100)),
              child: const Text('-5'),
            ),
            const SizedBox(width: 12),
            ElevatedButton(
              onPressed: () => setState(() => marks = (marks + 5).clamp(0, 100)),
              child: const Text('+5'),
            ),
          ],
        ),
      ],
    );
  }
}`
    },
    quiz: [
      {
        id: 'q2-1-1',
        question: 'When should you choose a StatelessWidget over a StatefulWidget?',
        options: [
          'When the widget contains animations and user inputs',
          'When the UI is static and depends solely on immutable configuration passed via constructor',
          'Only when building for iOS',
          'When you need to store data in SQLite'
        ],
        correctIndex: 1,
        explanation: 'StatelessWidgets are lightweight and ideal for UI elements that do not change dynamically after construction.'
      },
      {
        id: 'q2-1-2',
        question: 'What is the exact purpose of calling setState() in a State object?',
        options: [
          'It clears the phone memory',
          'It notifies the framework that the internal state has changed, scheduling a rebuild of the widget',
          'It restarts the entire mobile phone',
          'It sends an HTTP POST request'
        ],
        correctIndex: 1,
        explanation: 'setState() marks the widget as dirty, instructing Flutter to re-run build() with the updated values.'
      },
      {
        id: 'q2-1-3',
        question: 'What is BuildContext in Flutter?',
        options: [
          'A database connection object',
          'A handle that identifies the location of a widget within the application widget tree hierarchy',
          'A tool to build APK files',
          'A CSS compiler'
        ],
        correctIndex: 1,
        explanation: 'BuildContext defines where a widget is situated within the overall tree structure.'
      },
      {
        id: 'q2-1-4',
        question: 'What will happen if you change a variable without wrapping it in setState()?',
        options: [
          'The computer will explode',
          'The variable updates in memory, but the on-screen UI will NOT refresh until another event rebuilds it',
          'A compile error will occur immediately',
          'Flutter will delete the widget'
        ],
        correctIndex: 1,
        explanation: 'Without setState(), Flutter does not know that the visual display needs to be refreshed.'
      },
      {
        id: 'q2-1-5',
        question: 'Why is a StatefulWidget split into two separate classes (Widget and State)?',
        options: [
          'Because Flutter requires one class for iOS and one for Android',
          'For performance: the Widget class is lightweight and immutable, while the State class persists across rebuilds',
          'It was a programming mistake in Dart 1.0',
          'To make the code longer'
        ],
        correctIndex: 1,
        explanation: 'Splitting widget configuration from persistent state allows Flutter to cheaply recreate widgets while preserving user state.'
      }
    ]
  },
  {
    id: 'm2-l2',
    moduleId: 'module-2',
    title: 'Layout Essentials: Row, Column, Stack, Expanded & Padding',
    description: 'Master Flutter layout engine: arrange widgets vertically with Column, horizontally with Row, layer widgets with Stack, distribute space with Expanded/Flexible, and position with Padding, Align, and SizedBox.',
    order: 2,
    durationMinutes: 16,
    difficulty: 'Beginner',
    prerequisites: ['Module 2 Lesson 1: Widgets Basics'],
    lastVerified: 'November 2026',
    goal: 'Build any modern mobile app layout without overflow errors, master mainAxisAlignment vs crossAxisAlignment, and use Expanded to prevent yellow-and-black overflow stripes.',
    simpleExplanation: `Layout in Flutter is built by composing simple layout widgets:

### 1. \`Column\` (Vertical) and \`Row\` (Horizontal)
- **\`Column\`**: Places child widgets in a vertical list from top to bottom.
- **\`Row\`**: Places child widgets in a horizontal line from left to right.

Both share two key alignment properties:
- **\`mainAxisAlignment\`**: Alignment along the primary direction (vertical for Column, horizontal for Row). Options: \`center\`, \`start\`, \`end\`, \`spaceBetween\`, \`spaceAround\`, \`spaceEvenly\`.
- **\`crossAxisAlignment\`**: Alignment across the opposing direction.

### 2. \`Expanded\` & \`Flexible\` (The Overflow Protectors)
If widgets inside a Row or Column are wider or taller than the screen, Flutter shows the infamous **Yellow-and-Black striped overflow error**!
Wrapping a child in \`Expanded\` forces it to take up the remaining available space and adjust flexibly.

### 3. \`Stack\` (Layering on Top of Each Other)
While Row and Column place items side-by-side, **\`Stack\`** stacks widgets on top of each other (like layers in Photoshop or a deck of cards). Use \`Positioned\` to pin a badge or avatar on top.

### 4. Spacing Widgets: \`Padding\`, \`SizedBox\`, \`SafeArea\`
- \`SizedBox(height: 16)\`: The cleanest way to add whitespace between widgets.
- \`Padding(padding: EdgeInsets.all(16), child: ...)\`: Adds interior breathing room.
- \`SafeArea\`: Automatically insets UI so it never gets clipped behind the camera notch or status bar.`,
    analogy: `Think of layout like packing a bento lunchbox:
- **Column:** Stacking food layers from top to bottom (salad on top, rice in the middle, fruit on the bottom).
- **Row:** Placing chopsticks, spoon, and fork side-by-side.
- **Stack:** Putting a cherry directly on top of the cake.
- **Expanded:** A soft sandwich that fills up whatever remaining empty space is left in the box so food does not slide around.`,
    codeSnippet: `import 'package:flutter/material.dart';

class StudentCardLayout extends StatelessWidget {
  const StudentCardLayout({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.grey.shade300),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Row with Avatar, Name, and Course Badge
              Row(
                children: [
                  const CircleAvatar(child: Text('RK')),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Rahul Kumar', style: TextStyle(fontWeight: FontWeight.bold)),
                        Text('Roll: CS-104', style: TextStyle(color: Colors.grey)),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade100,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text('Flutter', style: TextStyle(color: Colors.blue)),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const Divider(),
              const SizedBox(height: 8),
              // Marks & Grade Summary Row
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Marks: 88 / 100'),
                  Text('Grade: A', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: CardDemo()))));

class CardDemo extends StatelessWidget {
  const CardDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 320,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.lightBlue.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blueAccent),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Student Profile', style: TextStyle(fontWeight: FontWeight.bold)),
              Icon(Icons.school, color: Colors.blue),
            ],
          ),
          const SizedBox(height: 12),
          const Text('Mastering Flutter Layouts like a pro!'),
        ],
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Wrap with SafeArea',
        description: 'Always wrap top-level page content in SafeArea to avoid overlaps with the notch, camera cutout, or home bar.'
      },
      {
        step: 2,
        title: 'Choose Column vs Row',
        description: 'If widgets stack vertically, choose Column. If they sit side-by-side, choose Row.'
      },
      {
        step: 3,
        title: 'Prevent overflows with Expanded',
        description: 'Whenever a text widget or card inside a Row could grow too wide, wrap it in Expanded.'
      },
      {
        step: 4,
        title: 'Adjust mainAxisAlignment',
        description: 'Use MainAxisAlignment.spaceBetween to push items to opposite ends (e.g. title on the left, button on the right).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting unbounded widgets (like a ListView) directly inside a Column without Expanded.',
        fix: 'Wrap the ListView in an Expanded or specify shrinkWrap: true.',
        why: 'Both Column and ListView try to take infinite vertical height, causing an unbounded height layout crash.'
      },
      {
        mistake: 'Forgetting SizedBox between widgets and using empty Text(" ") for spacing.',
        fix: 'Use const SizedBox(height: 16) or const SizedBox(width: 12).',
        why: 'SizedBox is lightweight, explicit, and can be declared const for zero runtime allocation.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What causes the Yellow-and-Black striped error in Flutter?" — Answer: An overflow error (RenderFlex overflowed by X pixels) when children widgets exceed the physical screen boundaries of a Row or Column.',
      'Exam Alert: "How do you stack widgets on top of each other in the Z-axis?" — Answer: Using the Stack widget.'
    ],
    practiceTask: {
      task: 'Build a Row with two elements: on the left, an Icon(Icons.person), and on the right, a long Text description that could span multiple lines. Prevent any horizontal overflow.',
      hint: 'Wrap the Text widget in an Expanded widget so it wraps lines instead of pushing beyond the right edge.',
      solution: `Row(
  children: const [
    Icon(Icons.person, size: 36),
    SizedBox(width: 12),
    Expanded(
      child: Text(
        'This is a very long student bio description that wraps onto multiple lines safely without throwing any overflow error!',
      ),
    ),
  ],
)`
    },
    quiz: [
      {
        id: 'q2-2-1',
        question: 'Which widget is used to lay out its children vertically?',
        options: ['Row', 'Column', 'Stack', 'Wrap'],
        correctIndex: 1,
        explanation: 'Column lays out its children in a vertical array.'
      },
      {
        id: 'q2-2-2',
        question: 'What happens when a Row\'s children are wider than the phone screen?',
        options: [
          'The app automatically zooms out',
          'Flutter displays a yellow-and-black striped RenderFlex overflow error',
          'The extra text is deleted',
          'The phone rotates to landscape automatically'
        ],
        correctIndex: 1,
        explanation: 'If contents exceed the allocated boundary, Flutter flags a layout overflow warning with hazard stripes.'
      },
      {
        id: 'q2-2-3',
        question: 'Which widget expands a child of a Row or Column to fill the remaining available space?',
        options: ['Expanded', 'Padding', 'SizedBox', 'Center'],
        correctIndex: 0,
        explanation: 'Expanded fills the remaining available space along the main axis.'
      },
      {
        id: 'q2-2-4',
        question: 'What is the purpose of the SafeArea widget?',
        options: [
          'It provides password encryption',
          'It insets its child to avoid operating system intrusions like camera notches, status bars, and navigation handles',
          'It prevents phone screen scratches',
          'It backs up files'
        ],
        correctIndex: 1,
        explanation: 'SafeArea calculates device insets and pads content away from physical cutouts.'
      },
      {
        id: 'q2-2-5',
        question: 'Which widget allows widgets to overlap each other (Z-axis layering)?',
        options: ['Row', 'Column', 'Stack', 'Table'],
        correctIndex: 2,
        explanation: 'Stack positions widgets on top of each other in layers from back to front.'
      }
    ]
  },
  {
    id: 'm2-l3',
    moduleId: 'module-2',
    title: 'Text, Images, Icons, Cards & Modern Buttons',
    description: 'Master core content widgets: styled Text, Network & Asset Images, Material Icons, Card containers, and all modern button types (ElevatedButton, OutlinedButton, TextButton, IconButton).',
    order: 3,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['Module 2 Lesson 2: Layout Essentials'],
    lastVerified: 'November 2026',
    goal: 'Render text with typography and colors, display local and network images with error fallbacks, use Material icons, and wire up button clicks.',
    simpleExplanation: `Every user interface communicates through text, images, icons, and buttons.

### 1. \`Text\` and \`TextStyle\`
\`\`\`dart
Text(
  'Student Details Report',
  style: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.blue.shade900,
    letterSpacing: 0.5,
  ),
)
\`\`\`

### 2. \`Image\` (Asset vs Network)
- **\`Image.asset('assets/images/logo.png')\`**: For bundled images inside your app (instant loading, works offline). Must be declared in \`pubspec.yaml\`.
- **\`Image.network('https://...')\`**: Fetches an image from the web with loading and error builders.

### 3. \`Icon\`
Material symbols built directly into Flutter:
\`\`\`dart
Icon(Icons.school, color: Colors.indigo, size: 28);
\`\`\`

### 4. Modern Button Types (Material 3)
In modern Flutter, older buttons like \`RaisedButton\` and \`FlatButton\` are obsolete! Always use:
- **\`ElevatedButton\`**: Primary action with slight shadow/elevation.
- **\`OutlinedButton\`**: Secondary action with a clean border outline.
- **\`TextButton\`**: Low-emphasis action (e.g. "Cancel", "Learn more").
- **\`IconButton\`**: Compact circular button with just an icon.
- **\`FloatingActionButton\`**: The prominent circular floating action button in a Scaffold.`,
    analogy: `Think of buttons like physical doors in a building:
- **ElevatedButton:** The big main front entrance door with brass handles and lights.
- **OutlinedButton:** The side conference room door with frosted glass borders.
- **TextButton:** A simple privacy curtain you push aside.
- **IconButton:** A circular doorbell button on the wall.`,
    codeSnippet: `import 'package:flutter/material.dart';

class ButtonsAndCardDemo extends StatelessWidget {
  const ButtonsAndCardDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Row(
              children: [
                Icon(Icons.verified_user, color: Colors.blue),
                SizedBox(width: 8),
                Text('Verified Student Profile', style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            // The 3 major button styles side by side
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton.icon(
                  onPressed: () => print('Submitted!'),
                  icon: const Icon(Icons.check),
                  label: const Text('Submit'),
                ),
                OutlinedButton(
                  onPressed: () => print('Reset clicked'),
                  child: const Text('Reset'),
                ),
                IconButton(
                  onPressed: () => print('Deleted!'),
                  icon: const Icon(Icons.delete_outline, color: Colors.red),
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

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: ButtonDemo()))));

class ButtonDemo extends StatelessWidget {
  const ButtonDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
          onPressed: () {},
          child: const Text('Elevated Button'),
        ),
        const SizedBox(height: 12),
        OutlinedButton(
          onPressed: () {},
          child: const Text('Outlined Button'),
        ),
        const SizedBox(height: 12),
        TextButton(
          onPressed: () {},
          child: const Text('Text Button'),
        ),
      ],
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'onPressed callback',
        description: 'Passing null to onPressed disables the button automatically and grays out its color.'
      },
      {
        step: 2,
        title: 'Adding icons to buttons',
        description: 'Use the .icon constructor: ElevatedButton.icon(onPressed: ..., icon: ..., label: ...).'
      },
      {
        step: 3,
        title: 'Customizing button styles',
        description: 'Use style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white).'
      },
      {
        step: 4,
        title: 'Card widget benefits',
        description: 'Card provides consistent background color, rounded corners, and subtle elevation shadow.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using deprecated RaisedButton or FlatButton in modern code.',
        fix: 'Use ElevatedButton, OutlinedButton, and TextButton.',
        why: 'RaisedButton and FlatButton were removed in Flutter 3; using them causes compile errors.'
      },
      {
        mistake: 'Leaving onPressed: () {} with no logic and wondering why nothing happens.',
        fix: 'Pass a valid handler function or pass null if you intentionally want the button disabled.',
        why: 'onPressed: null signals Flutter to render the button in its disabled visual state.'
      }
    ],
    examAlerts: [
      'Exam Alert: "How do you disable a button in Flutter?" — Answer: Set its onPressed property to null (onPressed: null).',
      'Exam Alert: "Which modern buttons replace the deprecated RaisedButton and FlatButton?" — Answer: ElevatedButton and TextButton.'
    ],
    practiceTask: {
      task: 'Create an ElevatedButton with an icon of a printer and label "Print Report Card". When clicked, print "Printing report card..." to the debug console.',
      hint: 'Use ElevatedButton.icon(...) with icon: Icon(Icons.print) and label: Text(...).',
      solution: `ElevatedButton.icon(
  onPressed: () {
    print('Printing report card...');
  },
  icon: const Icon(Icons.print),
  label: const Text('Print Report Card'),
)`
    },
    quiz: [
      {
        id: 'q2-3-1',
        question: 'How do you programmatically disable an ElevatedButton so it cannot be tapped?',
        options: [
          'Set enabled: false',
          'Set onPressed: null',
          'Set isClickable: false',
          'Wrap it in an IgnorePointer only'
        ],
        correctIndex: 1,
        explanation: 'In Flutter buttons, setting onPressed: null automatically puts the button into disabled mode.'
      },
      {
        id: 'q2-3-2',
        question: 'Which constructor is used to load an image bundled inside your local Flutter app project?',
        options: ['Image.file()', 'Image.network()', 'Image.asset()', 'Image.memory()'],
        correctIndex: 2,
        explanation: 'Image.asset() loads local images declared in pubspec.yaml.'
      },
      {
        id: 'q2-3-3',
        question: 'Which modern widget replaced the legacy RaisedButton in Flutter?',
        options: ['ElevatedButton', 'SuperButton', 'CustomButton', 'ShadowButton'],
        correctIndex: 0,
        explanation: 'ElevatedButton is the official Material 3 replacement for RaisedButton.'
      },
      {
        id: 'q2-3-4',
        question: 'What is the purpose of the Card widget?',
        options: [
          'It connects to a credit card payment gateway',
          'It provides a Material surface with rounded corners, padding, and elevation shadow',
          'It generates QR codes',
          'It validates form input'
        ],
        correctIndex: 1,
        explanation: 'Card encapsulates related UI content on a distinct elevated surface with standard styling.'
      },
      {
        id: 'q2-3-5',
        question: 'How do you change the text color inside a Text widget?',
        options: [
          'Text("Hello", color: Colors.blue)',
          'Text("Hello", style: TextStyle(color: Colors.blue))',
          'Text("Hello", fontColor: Colors.blue)',
          'Text.color(Colors.blue, "Hello")'
        ],
        correctIndex: 1,
        explanation: 'Text appearance is customized via the style parameter using a TextStyle object.'
      }
    ]
  },
  {
    id: 'm2-l4',
    moduleId: 'module-2',
    title: 'Material 3, Themes, Colors & Dark Mode',
    description: 'Design beautiful apps with Google Material 3! Configure ThemeData, custom ColorSchemes, typography, and support seamless Light and Dark modes.',
    order: 4,
    durationMinutes: 14,
    difficulty: 'Beginner',
    prerequisites: ['Module 2 Lesson 3: Core Widgets'],
    lastVerified: 'November 2026',
    goal: 'Configure ThemeData in MaterialApp, enable Material 3, generate tonal ColorSchemes from a seed color, and support automatic Dark Mode.',
    simpleExplanation: `**Material 3 (M3)** is Google's modern design system. It brings dynamic color, smoother shapes, and expressive components to Flutter.

### 1. Enabling Material 3
Material 3 is enabled by default in Flutter 3.16+:
\`\`\`dart
theme: ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
),
\`\`\`

### 2. Generating ColorSchemes with \`fromSeed\`
Instead of manually picking 30 different shades of primary, secondary, and container colors, you supply **one single seed color**. Flutter algorithmically generates an entire harmonized palette!

### 3. Supporting Dark Mode
In \`MaterialApp\`, configure both \`theme\` and \`darkTheme\`:
\`\`\`dart
MaterialApp(
  themeMode: ThemeMode.system, // follows device setting!
  theme: ThemeData(
    brightness: Brightness.light,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue, brightness: Brightness.light),
  ),
  darkTheme: ThemeData(
    brightness: Brightness.dark,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue, brightness: Brightness.dark),
  ),
)
\`\`\`

### 4. Reading Colors in Widgets
Never hardcode \`Colors.black\` or \`Colors.white\`! Instead, read from the active theme:
\`\`\`dart
final theme = Theme.of(context);
Text('Title', style: TextStyle(color: theme.colorScheme.onSurface));
\`\`\`
This ensures your app looks gorgeous in both Light and Dark modes automatically!`,
    analogy: `Think of a Theme like an interior designer's color swatch card:
Instead of painting each wall, chair, and curtain with random paint cans you bought at different stores, the designer picks one signature color (seed color) and hands the crew a matching palette where all curtains, carpets, and lights naturally harmonize together in daylight and at night!`,
    codeSnippet: `import 'package:flutter/material.dart';

void main() {
  runApp(const ThemedApp());
}

class ThemedApp extends StatelessWidget {
  const ThemedApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Material 3 Demo',
      // Automatic light/dark switching
      themeMode: ThemeMode.system,
      // Light Theme
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF02569B), // Flutter Deep Blue
          brightness: Brightness.light,
        ),
      ),
      // Dark Theme
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF02569B),
          brightness: Brightness.dark,
        ),
      ),
      home: const ThemedHomeScreen(),
    );
  }
}

class ThemedHomeScreen extends StatelessWidget {
  const ThemedHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Material 3 Harmonized Theme'),
        backgroundColor: colorScheme.primaryContainer,
        foregroundColor: colorScheme.onPrimaryContainer,
      ),
      body: Center(
        child: Card(
          color: colorScheme.surfaceVariant,
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Text(
              'Dynamic Theming Active!',
              style: TextStyle(color: colorScheme.onSurfaceVariant, fontSize: 18),
            ),
          ),
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
  ),
  home: Scaffold(
    appBar: AppBar(title: const Text('M3 Seed Palette')),
    body: Center(
      child: ElevatedButton(
        onPressed: () {},
        child: const Text('Elevated with Seed Color'),
      ),
    ),
  ),
));`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'ColorScheme.fromSeed',
        description: 'Provide a single brand color (like Flutter blue #02569B) to generate full tonal palettes.'
      },
      {
        step: 2,
        title: 'ThemeMode.system',
        description: 'Setting themeMode to system lets the OS automatically switch between light and dark themes.'
      },
      {
        step: 3,
        title: 'Theme.of(context)',
        description: 'Access the current theme properties dynamically anywhere in your widget tree.'
      },
      {
        step: 4,
        title: 'onPrimary, onSurface pairs',
        description: 'Always pair background colors with their corresponding "on" color (e.g. primary with onPrimary) to guarantee WCAG contrast accessibility.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hardcoding Colors.black or Colors.white for text.',
        fix: 'Use Theme.of(context).colorScheme.onSurface or onBackground.',
        why: 'In Dark Mode, hardcoded black text becomes completely invisible against a dark background!'
      },
      {
        mistake: 'Setting primaryColor directly instead of using ColorScheme.',
        fix: 'Use colorScheme: ColorScheme.fromSeed(seedColor: ...) in ThemeData.',
        why: 'In Material 3, individual color properties like primaryColor and accentColor are superseded by ColorScheme.'
      }
    ],
    examAlerts: [
      'Exam Alert: "How do you access the active application theme inside a widget build method?" — Answer: Using Theme.of(context).',
      'Exam Alert: "What method in Flutter automatically generates a harmonized Material 3 color palette from a single color?" — Answer: ColorScheme.fromSeed(seedColor: ...).'
    ],
    practiceTask: {
      task: 'Define a MaterialApp with an emerald green seed color (Colors.teal) in Material 3 mode. Create a Scaffold that displays an AppBar and an ElevatedButton that uses the generated theme colors.',
      hint: 'colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal)',
      solution: `MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
  ),
  home: Scaffold(
    appBar: AppBar(title: const Text('Teal Material 3 Theme')),
    body: Center(
      child: ElevatedButton(
        onPressed: () {},
        child: const Text('Styled by Teal Palette'),
      ),
    ),
  ),
)`
    },
    quiz: [
      {
        id: 'q2-4-1',
        question: 'Which factory method creates a complete Material 3 ColorScheme based on a single brand color?',
        options: ['ColorScheme.fromSeed()', 'ColorScheme.auto()', 'ColorScheme.generate()', 'ColorScheme.rgb()'],
        correctIndex: 0,
        explanation: 'ColorScheme.fromSeed(seedColor: ...) generates tonal palettes that satisfy Material 3 design tokens.'
      },
      {
        id: 'q2-4-2',
        question: 'What happens when ThemeMode is set to ThemeMode.system in MaterialApp?',
        options: [
          'The app is locked to light mode',
          'The app is locked to dark mode',
          'The app automatically adopts the light or dark appearance configured in the user phone operating system settings',
          'It shows a theme selection dialog on every launch'
        ],
        correctIndex: 2,
        explanation: 'ThemeMode.system queries the platform brightness and renders theme or darkTheme accordingly.'
      },
      {
        id: 'q2-4-3',
        question: 'Why should you avoid hardcoding "color: Colors.black" for body text in a Flutter app?',
        options: [
          'Black color uses more battery',
          'When the user switches their device to Dark Mode, black text becomes unreadable on dark backgrounds',
          'Dart does not allow black text',
          'It slows down compile times'
        ],
        correctIndex: 1,
        explanation: 'Using Theme.of(context).colorScheme.onSurface ensures high-contrast readability in both light and dark themes.'
      },
      {
        id: 'q2-4-4',
        question: 'Which property in ThemeData enables Google Material 3 specifications?',
        options: ['useMaterial3: true', 'materialVersion: 3', 'enableM3: true', 'isMaterial3: true'],
        correctIndex: 0,
        explanation: 'The useMaterial3 boolean flag controls whether Flutter uses Material 3 styles.'
      },
      {
        id: 'q2-4-5',
        question: 'In Material 3 terminology, what does "onPrimary" mean?',
        options: [
          'A color to be drawn on top of the primary color to ensure readable contrast',
          'The secondary color',
          'The shadow color of a button',
          'A click event listener'
        ],
        correctIndex: 0,
        explanation: 'The "on" prefix (onPrimary, onSurface) signifies the color intended for text and icons drawn over that surface.'
      }
    ]
  },
  {
    id: 'm2-l5',
    moduleId: 'module-2',
    title: 'Responsive Design: MediaQuery & LayoutBuilder',
    description: 'Learn how to make your Flutter app look fantastic across small phones, foldables, tablets, and desktop monitors using MediaQuery, LayoutBuilder, and breakpoint strategies.',
    order: 5,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 2 Lesson 2: Layout Essentials'],
    lastVerified: 'November 2026',
    goal: 'Query device screen size and orientation using MediaQuery, build adaptive layouts using LayoutBuilder, and apply responsive breakpoints.',
    simpleExplanation: `Your Flutter app will run on a tiny 4.7-inch phone, a 6.7-inch flagship, an iPad tablet, and a 27-inch desktop monitor! Responsive design ensures your content looks proportional on every screen.

### 1. \`MediaQuery.of(context)\`
Queries the physical screen specifications:
\`\`\`dart
final size = MediaQuery.of(context).size;
final screenWidth = size.width;
final screenHeight = size.height;
final isPortrait = MediaQuery.of(context).orientation == Orientation.portrait;
\`\`\`

### 2. \`LayoutBuilder\` (Preferred for Adaptive Widgets!)
While \`MediaQuery\` gives you the size of the **entire device window**, \`LayoutBuilder\` gives you the exact **constraints of the parent widget**:
\`\`\`dart
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      // Wide screen: show side-by-side Row
      return Row(children: [FormView(), ResultView()]);
    } else {
      // Narrow phone: show stacked Column
      return Column(children: [FormView(), ResultView()]);
    }
  },
)
\`\`\`

### 3. Industry Standard Breakpoints
- **Mobile Phones:** \`< 600 px\` (Single column layout)
- **Tablets / Foldables:** \`600 - 900 px\` (Two columns / master-detail)
- **Desktop / Web:** \`> 900 px\` (Multi-column with fixed navigation drawer)`,
    analogy: `Think of water vs ice:
- A rigid non-responsive app is like a solid block of ice: if you force it into a smaller bowl or a wider plate, it either breaks or leaves huge awkward gaps.
- A responsive Flutter app is like water: it gracefully flows and takes the exact shape of whatever container or glass you pour it into!`,
    codeSnippet: `import 'package:flutter/material.dart';

class ResponsiveStudentDashboard extends StatelessWidget {
  const ResponsiveStudentDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Responsive Student Portal')),
      body: LayoutBuilder(
        builder: (context, constraints) {
          // If screen width is greater than 600px (Tablet/Web)
          if (constraints.maxWidth >= 600) {
            return Row(
              children: [
                Expanded(
                  flex: 1,
                  child: Container(
                    color: Colors.blue.shade50,
                    child: const Center(child: Text('Student Form Input Area')),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  flex: 1,
                  child: Container(
                    color: Colors.grey.shade50,
                    child: const Center(child: Text('Live Results & Grade Card')),
                  ),
                ),
              ],
            );
          } else {
            // Standard mobile phone screen (< 600px)
            return SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    height: 250,
                    color: Colors.blue.shade50,
                    child: const Center(child: Text('Student Form Input Area')),
                  ),
                  const Divider(),
                  Container(
                    height: 250,
                    color: Colors.grey.shade50,
                    child: const Center(child: Text('Live Results & Grade Card')),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: ResponsiveDemo()));

class ResponsiveDemo extends StatelessWidget {
  const ResponsiveDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LayoutBuilder(
        builder: (context, constraints) {
          bool isWide = constraints.maxWidth > 500;
          return Center(
            child: Text(
              isWide ? 'Wide Screen (Tablet/Desktop)' : 'Mobile Phone Screen',
              style: TextStyle(fontSize: 22, color: isWide ? Colors.green : Colors.blue),
            ),
          );
        },
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Use LayoutBuilder for local components',
        description: 'LayoutBuilder rebuilds whenever the parent width changes, making components reusable inside sidebars or modals.'
      },
      {
        step: 2,
        title: 'Choose responsive breakpoint',
        description: '600px is the classic mobile-to-tablet threshold recognized across Android and Material guidelines.'
      },
      {
        step: 3,
        title: 'Use Expanded with flex factors',
        description: 'Expanded(flex: 2) vs Expanded(flex: 1) gives a 2/3 and 1/3 proportional screen split effortlessly.'
      },
      {
        step: 4,
        title: 'Prevent keyboard overflow',
        description: 'Wrap mobile columns in SingleChildScrollView so popping up the on-screen keyboard doesn\'t trigger an overflow error.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using MediaQuery to get width inside an isolated component in a multi-window layout.',
        fix: 'Use LayoutBuilder so the widget adapts to its allocated space rather than the entire device screen.',
        why: 'On iPad Split View or foldable phones, a widget might only occupy half the screen width.'
      },
      {
        mistake: 'Hardcoding fixed pixel widths like width: 400 on small mobile screens.',
        fix: 'Use double.infinity, Expanded, or percentage-based widths (MediaQuery.of(context).size.width * 0.9).',
        why: 'Fixed widths will overflow and crash on narrower 320px or 360px budget devices.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between MediaQuery and LayoutBuilder?" — Answer: MediaQuery provides information about the entire app window (screen size, orientation, keyboard insets), whereas LayoutBuilder provides the BoxConstraints of the immediate parent widget.',
      'Exam Alert: "How do you detect whether the device is in portrait or landscape orientation?" — Answer: Using MediaQuery.of(context).orientation.'
    ],
    practiceTask: {
      task: 'Write a widget using LayoutBuilder that displays 2 columns if width >= 500, or a single Column if width < 500.',
      hint: 'LayoutBuilder(builder: (context, constraints) { return constraints.maxWidth >= 500 ? Row(...) : Column(...); });',
      solution: `LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth >= 500) {
      return Row(
        children: const [
          Expanded(child: Card(child: Center(child: Text('Panel 1')))),
          Expanded(child: Card(child: Center(child: Text('Panel 2')))),
        ],
      );
    } else {
      return Column(
        children: const [
          Card(child: Center(child: Text('Panel 1'))),
          Card(child: Center(child: Text('Panel 2'))),
        ],
      );
    }
  },
)`
    },
    quiz: [
      {
        id: 'q2-5-1',
        question: 'What information does LayoutBuilder provide in its builder callback?',
        options: [
          'The battery percentage',
          'The BoxConstraints (min/max width and height) imposed by the parent widget',
          'The user GPS location',
          'The database schema'
        ],
        correctIndex: 1,
        explanation: 'LayoutBuilder gives you constraints representing the maximum and minimum width/height available for this child.'
      },
      {
        id: 'q2-5-2',
        question: 'What is the standard screen width breakpoint often used to differentiate mobile phones from tablets?',
        options: ['100 px', '600 px', '2000 px', '1080 px'],
        correctIndex: 1,
        explanation: '600dp is the standard Android and Material breakpoint separating phones from small tablets and foldables.'
      },
      {
        id: 'q2-5-3',
        question: 'How do you check if the device keyboard is currently visible using MediaQuery?',
        options: [
          'MediaQuery.of(context).viewInsets.bottom > 0',
          'MediaQuery.of(context).hasKeyboard',
          'MediaQuery.of(context).isKeyboardOpen()',
          'Keyboard.isOpen'
        ],
        correctIndex: 0,
        explanation: 'viewInsets.bottom reflects the height taken up by system overlays like the soft on-screen keyboard.'
      },
      {
        id: 'q2-5-4',
        question: 'Which widget prevents overflow errors when the software keyboard pops up over a form?',
        options: ['SingleChildScrollView', 'Container', 'Card', 'Spacer'],
        correctIndex: 0,
        explanation: 'SingleChildScrollView enables scrolling when screen height is constricted by the on-screen keyboard.'
      },
      {
        id: 'q2-5-5',
        question: 'In an Expanded widget, what does the "flex" property specify?',
        options: [
          'The CSS flexbox class',
          'The proportional share of free space to distribute to this child relative to other Expanded siblings',
          'The animation speed',
          'The border radius'
        ],
        correctIndex: 1,
        explanation: 'Flex factors dictate relative proportions (e.g. flex: 2 gets double the space of flex: 1).'
      }
    ]
  },
  {
    id: 'm2-l6',
    moduleId: 'module-2',
    title: 'Scaffold, AppBar, Drawer, BottomNavigationBar & Dialogs',
    description: 'Build complete app shells! Master Scaffold structure, customized AppBar, Drawer slide menus, BottomNavigationBar tabs, SnackBar feedback alerts, Dialogs, and ModalBottomSheet.',
    order: 6,
    durationMinutes: 16,
    difficulty: 'Beginner',
    prerequisites: ['Module 2 Lesson 4: Themes & Material 3'],
    lastVerified: 'November 2026',
    goal: 'Build an industry-standard mobile app structure with Scaffold, top navigation AppBar, side Drawer, BottomNavigationBar, and show SnackBars and AlertDialogs.',
    simpleExplanation: `The **\`Scaffold\`** widget is the backbone of almost every mobile screen in Flutter. It implements the basic Material visual layout structure.

### 1. Key Properties of Scaffold:
- **\`appBar\`**: The top header bar showing title, navigation back icon, and action buttons.
- **\`body\`**: The primary content displayed in the center of the screen.
- **\`drawer\`**: A slide-out navigation drawer from the left side of the screen.
- **\`bottomNavigationBar\`**: The bottom tab bar for primary page switching.
- **\`floatingActionButton (FAB)\`**: A prominent circular button pinned above the bottom bar.

### 2. User Feedback: \`SnackBar\`
To show a temporary pop-up message at the bottom of the screen (e.g., "Student details submitted successfully!"):
\`\`\`dart
ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(
    content: Text('Details saved successfully!'),
    backgroundColor: Colors.green,
  ),
);
\`\`\`

### 3. Confirmation: \`showDialog\` (AlertDialog)
To show a modal popup asking for confirmation:
\`\`\`dart
showDialog(
  context: context,
  builder: (context) => AlertDialog(
    title: const Text('Confirm Submission'),
    content: const Text('Are you sure you want to submit student details?'),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
      ElevatedButton(onPressed: () => Navigator.pop(context), child: const Text('Yes')),
    ],
  ),
);
\`\`\``,
    analogy: `Think of Scaffold like the physical body and dashboard of a car:
- **Scaffold:** The car chassis.
- **AppBar:** The windshield and rear-view mirror at the top.
- **Body:** The passenger seats where you sit and travel.
- **Drawer:** The glove compartment that slides out when you open it.
- **BottomNavigationBar:** The gear shifter and pedal controls at your feet.
- **SnackBar:** The dashboard alert light that briefly flashes "Low Fuel" and turns off.`,
    codeSnippet: `import 'package:flutter/material.dart';

class MasterScaffoldScreen extends StatefulWidget {
  const MasterScaffoldScreen({super.key});

  @override
  State<MasterScaffoldScreen> createState() => _MasterScaffoldScreenState();
}

class _MasterScaffoldScreenState extends State<MasterScaffoldScreen> {
  int _currentTabIndex = 0;

  void _showConfirmDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Submit Records'),
        content: const Text('Confirm student data entry?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('No')),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Student successfully enrolled! 🎉'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: const Text('Confirm'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Portal'),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            onPressed: () => print('Info tapped'),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: const [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue),
              child: Text('Navigation Menu', style: TextStyle(color: Colors.white, fontSize: 20)),
            ),
            ListTile(leading: Icon(Icons.home), title: Text('Dashboard')),
            ListTile(leading: Icon(Icons.school), title: Text('Courses')),
            ListTile(leading: Icon(Icons.settings), title: Text('Settings')),
          ],
        ),
      ),
      body: Center(
        child: ElevatedButton.icon(
          onPressed: _showConfirmDialog,
          icon: const Icon(Icons.send),
          label: const Text('Submit Details'),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentTabIndex,
        onDestinationSelected: (index) => setState(() => _currentTabIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          NavigationDestination(icon: Icon(Icons.person), label: 'Students'),
          NavigationDestination(icon: Icon(Icons.assessment), label: 'Grades'),
        ],
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: ScaffoldDemo()));

class ScaffoldDemo extends StatelessWidget {
  const ScaffoldDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scaffold Structure')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Hello from SnackBar!')),
            );
          },
          child: const Text('Show SnackBar'),
        ),
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Initialize Scaffold',
        description: 'Provide an AppBar and body to give your screen standard Material layout geometry.'
      },
      {
        step: 2,
        title: 'Add a Drawer',
        description: 'Adding a drawer automatically inserts a hamburger menu icon in the AppBar that opens the drawer on tap or swipe.'
      },
      {
        step: 3,
        title: 'Show a SnackBar using ScaffoldMessenger',
        description: 'Always use ScaffoldMessenger.of(context).showSnackBar(...) rather than older deprecated methods.'
      },
      {
        step: 4,
        title: 'ModalBottomSheet vs Dialog',
        description: 'Use showModalBottomSheet for options sliding up from the bottom; use showDialog for central alert boxes.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using multiple nested Scaffolds on the same screen.',
        fix: 'A screen should typically have only one root Scaffold.',
        why: 'Nesting Scaffolds causes duplicate app bars, conflicting SnackBars, and incorrect safe area calculations.'
      },
      {
        mistake: 'Calling Navigator.pop() with the wrong context after showing a dialog.',
        fix: 'Use the dialog\'s own context from builder: (ctx) => ... and call Navigator.pop(ctx).',
        why: 'Popping the wrong context can accidentally dismiss the underlying page rather than the dialog.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What widget provides the fundamental visual structure and components (AppBar, Drawer, FAB, SnackBar) for a screen?" — Answer: Scaffold.',
      'Exam Alert: "How do you display a SnackBar in modern Flutter?" — Answer: Using ScaffoldMessenger.of(context).showSnackBar(SnackBar(...)).'
    ],
    practiceTask: {
      task: 'Write a Scaffold containing an AppBar with title "Exam Ready", a FloatingActionButton with an icon of a checkmark, and when clicked, displays a SnackBar saying: "Exam prep in progress!"',
      hint: 'floatingActionButton: FloatingActionButton(onPressed: () { ScaffoldMessenger.of(context).showSnackBar(...); }, child: Icon(Icons.check))',
      solution: `Scaffold(
  appBar: AppBar(title: const Text('Exam Ready')),
  body: const Center(child: Text('Welcome Learner')),
  floatingActionButton: FloatingActionButton(
    onPressed: () {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Exam prep in progress!')),
      );
    },
    child: const Icon(Icons.check),
  ),
)`
    },
    quiz: [
      {
        id: 'q2-6-1',
        question: 'Which widget provides the standard top App bar, Drawer, and Floating Action Button slots?',
        options: ['Container', 'Scaffold', 'MaterialApp', 'Card'],
        correctIndex: 1,
        explanation: 'Scaffold is the core layout skeleton implementing standard Material app interfaces.'
      },
      {
        id: 'q2-6-2',
        question: 'What is the modern, recommended way to display a temporary SnackBar message on screen?',
        options: [
          'Scaffold.of(context).showSnackBar()',
          'ScaffoldMessenger.of(context).showSnackBar()',
          'SnackBar.display(context)',
          'Toast.makeText()'
        ],
        correctIndex: 1,
        explanation: 'ScaffoldMessenger manages SnackBar lifecycles across routes reliably without context bugs.'
      },
      {
        id: 'q2-6-3',
        question: 'How do you close or dismiss an active AlertDialog programmatically?',
        options: ['dialog.close()', 'Navigator.pop(context)', 'context.dismiss()', 'Scaffold.close()'],
        correctIndex: 1,
        explanation: 'Dialogs are routes pushed onto the Navigator stack; calling Navigator.pop(context) pops and closes them.'
      },
      {
        id: 'q2-6-4',
        question: 'What happens automatically to the AppBar when you add a drawer property to a Scaffold?',
        options: [
          'The AppBar turns transparent',
          'A hamburger menu icon is automatically added on the leading edge that opens the Drawer on tap',
          'The AppBar is removed',
          'A compile error occurs'
        ],
        correctIndex: 1,
        explanation: 'Scaffold automatically configures the AppBar leading action to toggle the Drawer.'
      },
      {
        id: 'q2-6-5',
        question: 'Which widget is used to present a sheet of choices sliding upwards from the bottom of the screen?',
        options: ['showModalBottomSheet()', 'showDialog()', 'SnackBar', 'Banner'],
        correctIndex: 0,
        explanation: 'showModalBottomSheet creates a standard bottom sheet overlay.'
      }
    ]
  }
];

