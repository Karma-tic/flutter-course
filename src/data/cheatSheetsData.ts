export interface CheatSheetSection {
  title: string;
  category: string;
  items: { term: string; snippet: string; note: string }[];
}

export const cheatSheetsData: CheatSheetSection[] = [
  {
    title: 'Dart Syntax Cheat Sheet',
    category: 'Dart',
    items: [
      { term: 'Variables', snippet: 'int a = 10; double b = 3.14; String s = \'Hi\'; bool ok = true;', note: 'Strongly typed primitive types.' },
      { term: 'Null Safety', snippet: 'String? nullableName; String nonNull = nullableName ?? \'Default\';', note: '? allows null, ?? provides fallback, ! asserts non-null.' },
      { term: 'String Interpolation', snippet: '\'Name: \$name, Next year: \${age + 1}\'', note: 'Use \$var for single variables, \${expr} for math or properties.' },
      { term: 'Arrow Function', snippet: 'double add(double a, double b) => a + b;', note: 'Shorthand for { return expr; }.' },
      { term: 'Named Parameters', snippet: 'void register({required String name, int age = 18})', note: 'Enclosed in {}, callers use name: \'Alex\'.' },
      { term: 'Cascade Operator', snippet: 'var list = [1, 2]..add(3)..sort();', note: '.. performs operations on the same object.' },
      { term: 'Spread Operator', snippet: 'var combined = [...listA, ...?listB];', note: '... unpacks elements into a new collection; ...? handles null.' },
      { term: 'List Comprehension', snippet: 'var widgets = [for (var item in list) Text(item)];', note: 'Collection-for syntax directly inside widget lists.' },
    ],
  },
  {
    title: 'Common Flutter Widgets Cheat Sheet',
    category: 'Widgets',
    items: [
      { term: 'Text', snippet: 'Text(\'Hello\', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))', note: 'Displays styled text string.' },
      { term: 'ElevatedButton', snippet: 'ElevatedButton(onPressed: () {}, child: Text(\'Tap\'))', note: 'Material 3 button with subtle elevation shadow.' },
      { term: 'TextFormField', snippet: 'TextFormField(controller: _ctrl, validator: (v) => v!.isEmpty ? \'Error\' : null)', note: 'Form-integrated text input.' },
      { term: 'DropdownButtonFormField', snippet: 'DropdownButtonFormField(value: val, items: items.map(...).toList(), onChanged: (v) => ...)', note: 'Dropdown selector with form validation.' },
      { term: 'Card', snippet: 'Card(elevation: 2, shape: RoundedRectangleBorder(...), child: ...)', note: 'Elevated rounded Material container.' },
      { term: 'ListTile', snippet: 'ListTile(leading: Icon(...), title: Text(...), trailing: Icon(...))', note: 'Standard list row with icon, title, and subtitle.' },
      { term: 'CircularProgressIndicator', snippet: 'CircularProgressIndicator()', note: 'Material circular loading spinner.' },
      { term: 'Icon', snippet: 'Icon(Icons.school, color: Colors.blue, size: 24)', note: 'Built-in Material icon vector graphic.' },
    ],
  },
  {
    title: 'Layout Mechanics Cheat Sheet',
    category: 'Layout',
    items: [
      { term: 'Column', snippet: 'Column(mainAxisAlignment: MainAxisAlignment.center, children: [...])', note: 'Stacks children vertically.' },
      { term: 'Row', snippet: 'Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [...])', note: 'Places children horizontally.' },
      { term: 'Stack', snippet: 'Stack(children: [Image(...), Positioned(top: 10, right: 10, child: ...)])', note: 'Layers widgets on top of each other.' },
      { term: 'Expanded', snippet: 'Expanded(flex: 2, child: Container(...))', note: 'Forces child to fill remaining available space along main axis.' },
      { term: 'SizedBox', snippet: 'const SizedBox(height: 16)', note: 'Lightweight whitespace spacing between widgets.' },
      { term: 'Padding', snippet: 'Padding(padding: EdgeInsets.all(16.0), child: ...)', note: 'Adds interior spacing around child.' },
      { term: 'SafeArea', snippet: 'SafeArea(child: Scaffold(...))', note: 'Insets child away from device camera notch and home bar.' },
      { term: 'SingleChildScrollView', snippet: 'SingleChildScrollView(child: Column(...))', note: 'Prevents yellow-and-black keyboard overflow error.' },
    ],
  },
  {
    title: 'Android Native vs Flutter Widget Mapping',
    category: 'Android Mapping',
    items: [
      { term: 'EditText (Input)', snippet: 'Native Android: <EditText android:id="@+id/et" />\nFlutter: TextFormField(controller: _ctrl)', note: 'Direct text input counterpart.' },
      { term: 'Spinner (Dropdown)', snippet: 'Native Android: <Spinner android:id="@+id/sp" /> with ArrayAdapter\nFlutter: DropdownButtonFormField<String>', note: 'Direct dropdown selection counterpart.' },
      { term: 'TextView (Display)', snippet: 'Native Android: <TextView android:text="Hi" />\nFlutter: Text(\'Hi\')', note: 'Direct text presentation counterpart.' },
      { term: 'RecyclerView (List)', snippet: 'Native Android: RecyclerView + Adapter + ViewHolder\nFlutter: ListView.builder(itemCount: ..., itemBuilder: ...)', note: 'Direct view recycling counterpart.' },
      { term: 'Toast (Short Alert)', snippet: 'Native Android: Toast.makeText(this, "Msg", Toast.LENGTH_SHORT).show()\nFlutter: ScaffoldMessenger.of(context).showSnackBar(...)', note: 'Direct feedback counterpart.' },
      { term: 'Activity (Screen)', snippet: 'Native Android: AppCompatActivity + setContentView(R.layout.main)\nFlutter: StatefulWidget / Scaffold', note: 'Single screen window counterpart.' },
      { term: 'SharedPreferences', snippet: 'Native Android: getSharedPreferences("prefs", MODE_PRIVATE)\nFlutter: SharedPreferences.getInstance()', note: 'Persistent key-value counterpart.' },
    ],
  },
  {
    title: 'Git & Version Control Cheat Sheet',
    category: 'Git',
    items: [
      { term: 'Initialize Repo', snippet: 'git init', note: 'Creates a fresh Git repository in the current folder.' },
      { term: 'Stage Changes', snippet: 'git add .', note: 'Stages all modified and new files for commit.' },
      { term: 'Commit Snapshot', snippet: 'git commit -m "feat: student form validation"', note: 'Records staged changes with descriptive message.' },
      { term: 'Push to GitHub', snippet: 'git push -u origin main', note: 'Uploads local commits to GitHub repository.' },
      { term: 'Create Branch', snippet: 'git checkout -b feature/auth', note: 'Creates and switches to a new branch.' },
      { term: 'Check Status', snippet: 'git status', note: 'Lists tracked and unstaged file modifications.' },
      { term: 'Pull Updates', snippet: 'git pull origin main', note: 'Fetches and merges remote updates into local branch.' },
    ],
  },
  {
    title: 'VS Code & Android Studio Keyboard Shortcuts',
    category: 'Shortcuts',
    items: [
      { term: 'Refactor / Wrap Widget', snippet: 'Alt + Enter (Windows/Linux) or Option + Return (Mac)', note: 'Instantly wrap widget in Column, Row, Padding, or Container.' },
      { term: 'Hot Reload', snippet: 'Ctrl + S / Cmd + S (or press "r" in terminal)', note: 'Injects updated code into running Dart VM in < 1s.' },
      { term: 'Hot Restart', snippet: 'Shift + Cmd + F5 (or press "R" in terminal)', note: 'Restarts app from main(), reinitializing all state.' },
      { term: 'Format Document', snippet: 'Shift + Alt + F (Windows) or Shift + Option + F (Mac)', note: 'Formats Dart code automatically according to style rules.' },
      { term: 'Quick Open File', snippet: 'Ctrl + P (Windows) or Cmd + P (Mac)', note: 'Jump to any file in your project instantly.' },
      { term: 'Open DevTools', snippet: 'Ctrl/Cmd + Shift + P -> "Flutter: Open DevTools"', note: 'Opens widget inspector and memory profiler.' },
    ],
  },
];

