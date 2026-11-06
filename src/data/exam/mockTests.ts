import { MockTestItem } from '../../types';

export const mockTestsData: MockTestItem[] = [
  {
    id: 'mock-1',
    title: 'Mock Test 1: Dart Fundamentals, OOP & Async',
    description: 'Test your grasp of Dart primitive types, null safety (? and !), functions, collection methods (where, map, fold), OOP classes/constructors, Futures, and async/await.',
    durationMinutes: 20,
    questions: [
      {
        id: 'm1-q1',
        question: 'Which Dart feature guarantees variables cannot be null unless declared with a question mark (?)?',
        options: ['Sound Null Safety', 'Strict Mode', 'Dynamic Casting', 'Null Pointer Shield'],
        correctIndex: 0,
        explanation: 'Sound Null Safety eliminates null dereference bugs at compile time.',
      },
      {
        id: 'm1-q2',
        question: 'What is the output of: int a = 15; print("Sum: ${a + 5}");?',
        options: ['Sum: 15 + 5', 'Sum: 20', 'Sum: ${a + 5}', 'Compile error'],
        correctIndex: 1,
        explanation: '${expression} evaluates the expression inside the string.',
      },
      {
        id: 'm1-q3',
        question: 'What is the primary difference between final and const in Dart?',
        options: [
          'final is for numbers, const is for strings',
          'const is a compile-time constant; final can be evaluated at runtime once',
          'final can be reassigned; const cannot',
          'They are 100% identical'
        ],
        correctIndex: 1,
        explanation: 'const requires compile-time evaluation; final allows runtime initialization.',
      },
      {
        id: 'm1-q4',
        question: 'Which method transforms every item in a Dart List into a new type or format?',
        options: ['.filter()', '.transform()', '.map()', '.reduce()'],
        correctIndex: 2,
        explanation: '.map((item) => ...) projects each element to a new representation.',
      },
      {
        id: 'm1-q5',
        question: 'What collection type in Dart forbids duplicate elements?',
        options: ['List', 'Set', 'Map', 'Queue'],
        correctIndex: 1,
        explanation: 'A Set is an unordered collection of unique elements.',
      },
      {
        id: 'm1-q6',
        question: 'What does the ~/ operator do in Dart (e.g. 10 ~/ 3)?',
        options: ['Bitwise NOT', 'Integer division returning truncated quotient (3)', 'Float division', 'Modulo remainder'],
        correctIndex: 1,
        explanation: '~/ performs truncating integer division.',
      },
      {
        id: 'm1-q7',
        question: 'Which keyword adds reusable functionality from a mixin into a class hierarchy?',
        options: ['extends', 'with', 'implements', 'mixin_use'],
        correctIndex: 1,
        explanation: 'The "with" keyword applies mixins to a class.',
      },
      {
        id: 'm1-q8',
        question: 'What return type is required for a function marked with the "async" keyword?',
        options: ['Future<T> or void', 'Stream<T> only', 'Isolate', 'Thread'],
        correctIndex: 0,
        explanation: 'Async functions always wrap return values in a Future.',
      },
      {
        id: 'm1-q9',
        question: 'What does the "required" modifier mean in a named parameter declaration?',
        options: [
          'The parameter cannot be printed',
          'Callers are strictly required to provide an argument for this parameter',
          'The parameter must be an integer',
          'The parameter is stored in SQLite'
        ],
        correctIndex: 1,
        explanation: 'required enforces that the caller must pass a non-null value.',
      },
      {
        id: 'm1-q10',
        question: 'What does the null assertion operator (!) do at runtime?',
        options: [
          'Inverts a boolean',
          'Asserts that a nullable variable is non-null, throwing an exception if null',
          'Deletes the variable',
          'Rounds a double'
        ],
        correctIndex: 1,
        explanation: 'The ! operator bypasses compile-time checks, asserting the value is non-null.',
      },
      {
        id: 'm1-q11',
        question: 'Which method filters elements in a List based on a boolean condition in Dart?',
        options: ['.where()', '.filter()', '.select()', '.match()'],
        correctIndex: 0,
        explanation: '.where((element) => condition) returns matching items.',
      },
      {
        id: 'm1-q12',
        question: 'What is a named constructor in Dart?',
        options: [
          'A constructor that has a specific identifier (e.g. Student.fromJson)',
          'A constructor without arguments',
          'A constructor that takes only strings',
          'A private constructor'
        ],
        correctIndex: 0,
        explanation: 'Named constructors clarify the intent of object creation (e.g. fromJson).',
      },
      {
        id: 'm1-q13',
        question: 'What is the purpose of an abstract class in Dart?',
        options: [
          'To define an interface or base class that cannot be directly instantiated',
          'To run code faster',
          'To encrypt strings',
          'To store files on disk'
        ],
        correctIndex: 0,
        explanation: 'Abstract classes define templates to be extended or implemented.',
      },
      {
        id: 'm1-q14',
        question: 'Which Dart feature represents a continuous pipe of values delivered over time?',
        options: ['Future', 'Stream', 'Isolate', 'Iterator'],
        correctIndex: 1,
        explanation: 'Streams deliver asynchronous sequences of events over time.',
      },
      {
        id: 'm1-q15',
        question: 'What does double.tryParse("abc") return in Dart?',
        options: ['0.0', 'null', 'Throws a FormatException', 'NaN'],
        correctIndex: 1,
        explanation: 'tryParse returns null on non-numeric strings safely.',
      },
      {
        id: 'm1-q16',
        question: 'What is an extension method in Dart?',
        options: [
          'A method added to an existing class without modifying its source code or subclassing',
          'A plugin from pub.dev',
          'A method that extends phone battery',
          'An Android native channel'
        ],
        correctIndex: 0,
        explanation: 'Extension methods add new functionality to existing types.',
      },
      {
        id: 'm1-q17',
        question: 'What is the entry point function of every Dart program?',
        options: ['start()', 'run()', 'main()', 'init()'],
        correctIndex: 2,
        explanation: 'void main() is the universal entry point in Dart.',
      },
      {
        id: 'm1-q18',
        question: 'What does the arrow syntax (=>) represent in Dart?',
        options: [
          'A shorthand return syntax for single-expression functions: { return expr; }',
          'An asynchronous channel',
          'A pointer to native memory',
          'An arrow icon'
        ],
        correctIndex: 0,
        explanation: '=> is syntactic shorthand for returning a single expression.',
      },
      {
        id: 'm1-q19',
        question: 'How do you handle exceptions in async/await Dart code?',
        options: ['try-catch-finally blocks', 'onError callback only', 'if-else check only', 'catch block without try'],
        correctIndex: 0,
        explanation: 'Standard try-catch blocks handle asynchronous await exceptions.',
      },
      {
        id: 'm1-q20',
        question: 'Which keyword defines a fixed set of named constant values in Dart?',
        options: ['enum', 'const_list', 'static_set', 'type_def'],
        correctIndex: 0,
        explanation: 'enum defines type-safe enumerated values.',
      },
    ],
  },
  {
    id: 'mock-2',
    title: 'Mock Test 2: Flutter UI, Layouts & Theming',
    description: 'Test your understanding of StatelessWidget vs StatefulWidget, BuildContext, Layout widgets (Row, Column, Stack, Expanded), Material 3 theming, and responsive designs.',
    durationMinutes: 20,
    questions: [
      {
        id: 'm2-q1',
        question: 'When should you choose a StatelessWidget over a StatefulWidget?',
        options: [
          'When the UI is static and depends solely on immutable properties passed to it',
          'When the widget has checkboxes and sliders',
          'When making HTTP requests',
          'Only when building for desktop'
        ],
        correctIndex: 0,
        explanation: 'StatelessWidgets are immutable and ideal for static UI components.',
      },
      {
        id: 'm2-q2',
        question: 'What is the role of BuildContext in Flutter?',
        options: [
          'A database connection handle',
          'A handle that locates a widget within the application widget tree hierarchy',
          'A tool to build APK files',
          'A CSS preprocessor'
        ],
        correctIndex: 1,
        explanation: 'BuildContext defines where a widget sits in the element tree.',
      },
      {
        id: 'm2-q3',
        question: 'What does calling setState() inside a State class do?',
        options: [
          'Clears device RAM',
          'Marks the widget as dirty and schedules a rebuild on the next frame',
          'Restarts the phone',
          'Recompiles Dart bytecode'
        ],
        correctIndex: 1,
        explanation: 'setState alerts Flutter to re-run the build method with updated state.',
      },
      {
        id: 'm2-q4',
        question: 'Which widget lays out its children in a horizontal line?',
        options: ['Column', 'Row', 'Stack', 'Wrap'],
        correctIndex: 1,
        explanation: 'Row arranges its children along the horizontal X-axis.',
      },
      {
        id: 'm2-q5',
        question: 'What causes the Yellow-and-Black striped visual error in Flutter?',
        options: [
          'A RenderFlex overflow when content exceeds the boundaries of a Row or Column',
          'A syntax error',
          'Battery warning',
          'Missing internet'
        ],
        correctIndex: 0,
        explanation: 'Yellow-and-black stripes signify a layout boundary overflow.',
      },
      {
        id: 'm2-q6',
        question: 'Which widget expands a child of a Row or Column to take up remaining space and prevents overflows?',
        options: ['Padding', 'Expanded', 'Card', 'SizedBox'],
        correctIndex: 1,
        explanation: 'Expanded forces its child to consume remaining available space along the main axis.',
      },
      {
        id: 'm2-q7',
        question: 'Which widget layers its children on top of each other along the Z-axis?',
        options: ['Row', 'Column', 'Stack', 'Table'],
        correctIndex: 2,
        explanation: 'Stack overlays children in layers from back to front.',
      },
      {
        id: 'm2-q8',
        question: 'What is the purpose of the SafeArea widget?',
        options: [
          'To encrypt user passwords',
          'To inset content and avoid notches, status bars, and home gesture areas',
          'To prevent phone drops',
          'To backup files'
        ],
        correctIndex: 1,
        explanation: 'SafeArea prevents content from being clipped by physical device cutouts.',
      },
      {
        id: 'm2-q9',
        question: 'Which widget provides the standard visual layout skeleton (AppBar, Body, Drawer, BottomNavigationBar) for a screen?',
        options: ['Container', 'Scaffold', 'MaterialApp', 'Card'],
        correctIndex: 1,
        explanation: 'Scaffold implements the standard Material screen layout.',
      },
      {
        id: 'm2-q10',
        question: 'What factory method generates a harmonized Material 3 ColorScheme from a single seed color?',
        options: ['ColorScheme.fromSeed()', 'ColorScheme.auto()', 'ColorScheme.palette()', 'ColorScheme.rgb()'],
        correctIndex: 0,
        explanation: 'ColorScheme.fromSeed(seedColor: ...) algorithmically generates tonal palettes.',
      },
      {
        id: 'm2-q11',
        question: 'How do you access the active Theme in a widget build method?',
        options: ['Theme.of(context)', 'context.getTheme()', 'AppTheme.active', 'Theme.current'],
        correctIndex: 0,
        explanation: 'Theme.of(context) retrieves the closest ThemeData ancestor.',
      },
      {
        id: 'm2-q12',
        question: 'Why should you avoid hardcoding "color: Colors.black" for text in Flutter?',
        options: [
          'Because black text becomes invisible on dark backgrounds when the user switches to Dark Mode',
          'Black color uses more battery',
          'It causes compile errors',
          'Dart doesn\'t allow black'
        ],
        correctIndex: 0,
        explanation: 'Use Theme.of(context).colorScheme.onSurface for automatic theme contrast.',
      },
      {
        id: 'm2-q13',
        question: 'Which modern widget replaced the legacy RaisedButton in Flutter?',
        options: ['ElevatedButton', 'SuperButton', 'CustomButton', 'ShadowButton'],
        correctIndex: 0,
        explanation: 'ElevatedButton is the official Material 3 elevated button.',
      },
      {
        id: 'm2-q14',
        question: 'How do you disable an ElevatedButton programmatically?',
        options: ['Set enabled: false', 'Set onPressed: null', 'Set isClickable: false', 'Wrap in IgnorePointer only'],
        correctIndex: 1,
        explanation: 'Setting onPressed: null automatically disables the button and applies disabled styling.',
      },
      {
        id: 'm2-q15',
        question: 'What is the difference between MediaQuery and LayoutBuilder?',
        options: [
          'MediaQuery gives window/screen dimensions; LayoutBuilder gives parent BoxConstraints',
          'MediaQuery is for web; LayoutBuilder is for Android',
          'They are identical',
          'MediaQuery is deprecated'
        ],
        correctIndex: 0,
        explanation: 'MediaQuery queries window metrics; LayoutBuilder provides parent constraints.',
      },
      {
        id: 'm2-q16',
        question: 'How do you display a temporary SnackBar message in modern Flutter?',
        options: [
          'ScaffoldMessenger.of(context).showSnackBar()',
          'Scaffold.of(context).showSnackBar()',
          'SnackBar.show()',
          'Toast.makeText()'
        ],
        correctIndex: 0,
        explanation: 'ScaffoldMessenger manages SnackBars reliably without context issues.',
      },
      {
        id: 'm2-q17',
        question: 'Which constructor loads an image packaged inside your local project assets?',
        options: ['Image.file()', 'Image.network()', 'Image.asset()', 'Image.memory()'],
        correctIndex: 2,
        explanation: 'Image.asset() loads local assets declared in pubspec.yaml.',
      },
      {
        id: 'm2-q18',
        question: 'Which widget allows a single child to be scrolled when screen space is limited?',
        options: ['SingleChildScrollView', 'Container', 'Card', 'SizedBox'],
        correctIndex: 0,
        explanation: 'SingleChildScrollView adds scrolling to a single child.',
      },
      {
        id: 'm2-q19',
        question: 'What is the purpose of the Card widget?',
        options: [
          'To process credit cards',
          'To present content on an elevated Material surface with rounded corners',
          'To display barcodes',
          'To handle form input'
        ],
        correctIndex: 1,
        explanation: 'Card encapsulates content with consistent styling and elevation.',
      },
      {
        id: 'm2-q20',
        question: 'What does setting themeMode: ThemeMode.system do in MaterialApp?',
        options: [
          'Locks app to light mode',
          'Automatically follows the user\'s OS light or dark mode setting',
          'Locks app to dark mode',
          'Prompts user on every launch'
        ],
        correctIndex: 1,
        explanation: 'ThemeMode.system queries device brightness automatically.',
      },
    ],
  },
  {
    id: 'mock-3',
    title: 'Mock Test 3: Inputs, Forms, Validations & Lists (EXAM FOCUS)',
    description: 'Exam Critical: Practice questions on TextField/TextFormField, TextEditingController, DropdownButtonFormField, Form validation flow, marks range (0-100), and ListView.builder.',
    durationMinutes: 20,
    questions: [
      {
        id: 'm3-q1',
        question: 'What is the Flutter equivalent of the Android native EditText view?',
        options: ['TextView', 'TextField / TextFormField', 'Spinner', 'InputView'],
        correctIndex: 1,
        explanation: 'TextField/TextFormField is the direct counterpart to Android\'s EditText.',
      },
      {
        id: 'm3-q2',
        question: 'What is the Flutter equivalent of the Android native Spinner dropdown?',
        options: ['DropdownButton / DropdownButtonFormField', 'RadioGroup', 'ListView', 'Switch'],
        correctIndex: 0,
        explanation: 'DropdownButtonFormField provides dropdown selection with form validation support.',
      },
      {
        id: 'm3-q3',
        question: 'What is the Flutter equivalent of the Android native TextView display?',
        options: ['EditText', 'Text widget', 'LabelBox', 'DisplayView'],
        correctIndex: 1,
        explanation: 'The Text widget is Flutter\'s primary text display component.',
      },
      {
        id: 'm3-q4',
        question: 'What is the Flutter equivalent of Android\'s RecyclerView with ViewHolder recycling?',
        options: ['ListView.builder', 'SingleChildScrollView', 'Column', 'Row'],
        correctIndex: 0,
        explanation: 'ListView.builder recycles views lazily on demand like RecyclerView.',
      },
      {
        id: 'm3-q5',
        question: 'What must a validator callback return when user input passes validation completely?',
        options: ['true', 'null', '0', '"" (empty string)'],
        correctIndex: 1,
        explanation: 'Returning null signals absence of validation error.',
      },
      {
        id: 'm3-q6',
        question: 'How do you trigger validation on all FormFields inside a Form at once?',
        options: ['_formKey.currentState!.validate()', 'form.checkAll()', 'validateForm()', 'Form.submit()'],
        correctIndex: 0,
        explanation: '_formKey.currentState!.validate() executes all child validators.',
      },
      {
        id: 'm3-q7',
        question: 'How do you extract text typed into a TextField?',
        options: ['TextField.getValue()', 'controller.text', 'state.value', 'readText()'],
        correctIndex: 1,
        explanation: 'TextEditingController.text returns the current input string.',
      },
      {
        id: 'm3-q8',
        question: 'Why MUST you dispose a TextEditingController in the dispose() method?',
        options: [
          'To clear the browser history',
          'To release OS listener handles and prevent memory leaks',
          'It is required by Google Play Store',
          'Dart throws a compile error without it'
        ],
        correctIndex: 1,
        explanation: 'Undisposed controllers continue holding listener handles in memory.',
      },
      {
        id: 'm3-q9',
        question: 'Which TextInputType opens a numeric keypad on mobile devices?',
        options: ['TextInputType.text', 'TextInputType.number', 'TextInputType.multiline', 'TextInputType.url'],
        correctIndex: 1,
        explanation: 'TextInputType.number opens the virtual numeric keypad.',
      },
      {
        id: 'm3-q10',
        question: 'In the Student Details Exam Project, what grade is awarded for marks = 92.5 according to the standard rubric?',
        options: ['A+', 'A', 'B', 'C'],
        correctIndex: 0,
        explanation: '90.0 to 100.0 receives Grade A+.',
      },
      {
        id: 'm3-q11',
        question: 'What boundary condition correctly validates that student marks are between 0 and 100?',
        options: [
          'if (marks < 0 || marks > 100) return "Invalid range";',
          'if (marks > 0 && marks < 100)',
          'if (marks == 100)',
          'if (marks != 50)'
        ],
        correctIndex: 0,
        explanation: 'Marks must be inclusively between 0.0 and 100.0.',
      },
      {
        id: 'm3-q12',
        question: 'Why should you always call .trim() on input strings before validating?',
        options: [
          'To convert text to uppercase',
          'To remove accidental leading/trailing whitespace and prevent strings of spaces from passing validation',
          'To encrypt the string',
          'To make it faster'
        ],
        correctIndex: 1,
        explanation: 'trim() strips spaces so "   " is treated as empty.',
      },
      {
        id: 'm3-q13',
        question: 'Why is double.tryParse() preferred over double.parse() for marks validation?',
        options: [
          'Because tryParse returns null on non-numeric strings instead of crashing with a FormatException',
          'It is 10x faster',
          'It rounds numbers',
          'It is required by Dart'
        ],
        correctIndex: 0,
        explanation: 'tryParse safely returns null on invalid text input.',
      },
      {
        id: 'm3-q14',
        question: 'Which method clears all inputs and resets validation error messages in a Form?',
        options: ['_formKey.currentState!.reset()', '_formKey.currentState!.clear()', '_formKey.currentState!.wipe()', 'form.undo()'],
        correctIndex: 0,
        explanation: 'reset() restores all FormFields to their initial state.',
      },
      {
        id: 'm3-q15',
        question: 'Which widget provides leading icon, title, subtitle, and trailing action slots in a list row?',
        options: ['ListTile', 'Card', 'Row', 'Container'],
        correctIndex: 0,
        explanation: 'ListTile is the standard Material list item widget.',
      },
      {
        id: 'm3-q16',
        question: 'Which ListView constructor automatically inserts a divider widget between every item?',
        options: ['ListView.separated', 'ListView.builder', 'ListView.custom', 'ListView.split'],
        correctIndex: 0,
        explanation: 'ListView.separated renders separator widgets between children.',
      },
      {
        id: 'm3-q17',
        question: 'What happens if the "value" passed to DropdownButton does not match any item in its items list?',
        options: [
          'It adds it to the list automatically',
          'It crashes with an assertion failure',
          'It defaults to the first item silently',
          'It shows a blank item'
        ],
        correctIndex: 1,
        explanation: 'The active value must be null or match one of the DropdownMenuItem values.',
      },
      {
        id: 'm3-q18',
        question: 'Which widget allows only one single selection from a group of options?',
        options: ['Radio / RadioListTile', 'Checkbox', 'Switch', 'Slider'],
        correctIndex: 0,
        explanation: 'Radio buttons enforce single selection within their shared groupValue.',
      },
      {
        id: 'm3-q19',
        question: 'Which widget allows multiple independent options to be toggled in a form?',
        options: ['Checkbox / CheckboxListTile', 'Radio', 'Switch only', 'Slider'],
        correctIndex: 0,
        explanation: 'Checkboxes permit multiple independent selections.',
      },
      {
        id: 'm3-q20',
        question: 'How do you hide password characters with dots in a TextFormField?',
        options: ['obscureText: true', 'isPassword: true', 'maskText: true', 'hideInput: true'],
        correctIndex: 0,
        explanation: 'obscureText: true masks entered characters.',
      },
    ],
  },
  {
    id: 'mock-4',
    title: 'Mock Test 4: Android Core, Lifecycle, Components & Platform Channels',
    description: 'Exam Critical: Practice questions on Activity lifecycle, 4 Android Components, Manifest permissions, Gradle, MethodChannel, BroadcastReceivers, and Services.',
    durationMinutes: 20,
    questions: [
      {
        id: 'm4-q1',
        question: 'What are the 4 core components of the Android operating system?',
        options: [
          'Activity, Service, Broadcast Receiver, Content Provider',
          'Fragment, Activity, View, Widget',
          'Intent, Gradle, Manifest, Logcat',
          'SQLite, Room, SharedPreferences, File'
        ],
        correctIndex: 0,
        explanation: 'Activity, Service, Broadcast Receiver, and Content Provider are the 4 core components.',
      },
      {
        id: 'm4-q2',
        question: 'What is the first lifecycle callback executed when an Android Activity is initialized?',
        options: ['onStart()', 'onCreate()', 'onResume()', 'onInit()'],
        correctIndex: 1,
        explanation: 'onCreate() is the initial creation callback where layouts are inflated.',
      },
      {
        id: 'm4-q3',
        question: 'Which Flutter StatefulWidget method corresponds directly to Android\'s onDestroy()?',
        options: ['deactivate()', 'dispose()', 'destroy()', 'finish()'],
        correctIndex: 1,
        explanation: 'dispose() performs resource teardown when a State object is permanently removed.',
      },
      {
        id: 'm4-q4',
        question: 'What is the difference between onPause() and onStop() in Android?',
        options: [
          'onPause is when activity loses focus/partially obscured; onStop is when activity is completely hidden',
          'onPause is for tablets only',
          'onStop runs first, then onPause',
          'There is no difference'
        ],
        correctIndex: 0,
        explanation: 'onPause fires when partially obscured; onStop fires when completely hidden from view.',
      },
      {
        id: 'm4-q5',
        question: 'What is an Explicit Intent in native Android?',
        options: [
          'An intent that specifies the exact target activity class by name',
          'An intent that is broadcast to all apps',
          'An encrypted network request',
          'A background service'
        ],
        correctIndex: 0,
        explanation: 'Explicit Intents name the specific target component class to launch.',
      },
      {
        id: 'm4-q6',
        question: 'Which Android Intent action constant is used to trigger the native share chooser sheet?',
        options: ['Intent.ACTION_VIEW', 'Intent.ACTION_SEND', 'Intent.ACTION_SHARE', 'Intent.ACTION_DIAL'],
        correctIndex: 1,
        explanation: 'Intent.ACTION_SEND invokes the system share sheet.',
      },
      {
        id: 'm4-q7',
        question: 'Where are application permissions declared in an Android Flutter project?',
        options: ['android/app/src/main/AndroidManifest.xml', 'build.gradle', 'pubspec.yaml', 'settings.gradle'],
        correctIndex: 0,
        explanation: 'Permissions are declared via <uses-permission> tags in AndroidManifest.xml.',
      },
      {
        id: 'm4-q8',
        question: 'What is the difference between minSdk and targetSdk in build.gradle?',
        options: [
          'minSdk is lowest supported OS version; targetSdk is the version the app was designed and tested for',
          'minSdk is for iOS; targetSdk is for Android',
          'minSdk is the download size limit',
          'They must always be equal'
        ],
        correctIndex: 0,
        explanation: 'minSdk restricts older devices; targetSdk enables modern OS behavior.',
      },
      {
        id: 'm4-q9',
        question: 'What is a mandatory requirement for an Android Foreground Service?',
        options: [
          'It must display an ongoing, non-dismissible notification in the status bar',
          'It must use Bluetooth',
          'It can only run for 5 seconds',
          'It must be written in C++'
        ],
        correctIndex: 0,
        explanation: 'Foreground Services require an ongoing notification to inform users of active resource use.',
      },
      {
        id: 'm4-q10',
        question: 'Do standard native Android Services run on a background thread by default?',
        options: [
          'Yes, they always run on a background thread',
          'NO! They run on the application MAIN (UI) thread by default unless explicitly spawned on a worker thread',
          'Only on Android 12+',
          'Only when connected to Wi-Fi'
        ],
        correctIndex: 1,
        explanation: 'Services run on the main thread by default; heavy work triggers an ANR without worker threads.',
      },
      {
        id: 'm4-q11',
        question: 'What is an ANR in Android?',
        options: [
          'Application Not Responding, triggered when the main UI thread is blocked for > 5 seconds',
          'Android Network Router',
          'Automated Name Resolution',
          'A database error'
        ],
        correctIndex: 0,
        explanation: 'ANR dialogs appear when the main thread fails to process inputs within 5 seconds.',
      },
      {
        id: 'm4-q12',
        question: 'Which method must be overridden in a native Android BroadcastReceiver class?',
        options: ['onCreate()', 'onReceive(context: Context?, intent: Intent?)', 'onBroadcast()', 'onStart()'],
        correctIndex: 1,
        explanation: 'onReceive() handles intercepted broadcast intents.',
      },
      {
        id: 'm4-q13',
        question: 'Which Platform Channel type is used to execute a one-off Kotlin method and return a value in Flutter?',
        options: ['EventChannel', 'MethodChannel', 'StreamChannel', 'MessageChannel'],
        correctIndex: 1,
        explanation: 'MethodChannel handles asynchronous request-response RPC calls.',
      },
      {
        id: 'm4-q14',
        question: 'Which Platform Channel type streams continuous events from a BroadcastReceiver to Flutter?',
        options: ['EventChannel', 'MethodChannel', 'StreamChannel', 'SocketChannel'],
        correctIndex: 0,
        explanation: 'EventChannel delivers continuous event streams from native code to Dart.',
      },
      {
        id: 'm4-q15',
        question: 'What is the purpose of the ViewHolder pattern in RecyclerView?',
        options: [
          'To cache references to child views and avoid expensive findViewById calls during scrolling',
          'To download images',
          'To format text',
          'To compress the database'
        ],
        correctIndex: 0,
        explanation: 'ViewHolder caches view references to achieve 60fps recycling performance.',
      },
      {
        id: 'm4-q16',
        question: 'In native Android, which adapter class is standard for binding an array of Strings into a Spinner?',
        options: ['ArrayAdapter', 'BaseAdapter', 'RecyclerAdapter', 'StringAdapter'],
        correctIndex: 0,
        explanation: 'ArrayAdapter<String> binds simple arrays to Spinners and ListViews.',
      },
      {
        id: 'm4-q17',
        question: 'Which command lists all connected Android devices and running emulators via terminal?',
        options: ['adb devices', 'flutter list', 'android check', 'phone-cli list'],
        correctIndex: 0,
        explanation: 'adb devices lists connected Android instances.',
      },
      {
        id: 'm4-q18',
        question: 'What happens to an Android Bound Service when all client components unbind from it?',
        options: [
          'It continues running forever',
          'It is automatically destroyed by the Android OS',
          'It turns into an Activity',
          'It restarts'
        ],
        correctIndex: 1,
        explanation: 'Bound Services terminate when all bound clients disconnect.',
      },
      {
        id: 'm4-q19',
        question: 'What does the mixin WidgetsBindingObserver do in a Flutter StatefulWidget?',
        options: [
          'Observes system-level app lifecycle state changes (resumed, paused, inactive, detached)',
          'Observes network speed',
          'Observes keyboard typing',
          'Observes battery drain'
        ],
        correctIndex: 0,
        explanation: 'WidgetsBindingObserver receives didChangeAppLifecycleState events from the OS.',
      },
      {
        id: 'm4-q20',
        question: 'Which file format is mandatory when publishing a new app to the Google Play Store?',
        options: ['.aab (Android App Bundle)', '.apk only', '.zip', '.jar'],
        correctIndex: 0,
        explanation: 'Google Play requires submissions in the Android App Bundle (.aab) format.',
      },
    ],
  },
  {
    id: 'mock-5',
    title: 'Mock Test 5: Comprehensive Full-Length Company Readiness Exam',
    description: 'The ultimate readiness test! 20 mixed questions spanning Dart algorithms, Flutter UI, Form validations, Android core, state management, and real-world edge cases.',
    durationMinutes: 20,
    questions: [
      {
        id: 'm5-q1',
        question: 'In the Student Details Exam Project, what three actions happen when the user taps Submit?',
        options: [
          '1. Validate all fields are non-empty and marks are 0-100; 2. Calculate Grade; 3. Display all details in the TextView/Card and confirmation SnackBar',
          '1. Restart app; 2. Save to Google Drive; 3. Send SMS',
          '1. Clear form; 2. Exit app; 3. Reboot device',
          '1. Open browser; 2. Dial phone; 3. Take photo'
        ],
        correctIndex: 0,
        explanation: 'The exam specification requires input validation, grade calculation, and result card display.',
      },
      {
        id: 'm5-q2',
        question: 'What grade is awarded for marks = 74.0 under the standard exam rubric?',
        options: ['A+', 'A', 'B', 'C'],
        correctIndex: 2,
        explanation: '70.0 to 79.9 corresponds to Grade B.',
      },
      {
        id: 'm5-q3',
        question: 'A customer buys 8 shirts priced at $20 each on a "Buy 2, Get 1 Free" offer. What is their final bill?',
        options: ['$120.00 (6 paid, 2 free)', '$160.00', '$100.00', '$140.00'],
        correctIndex: 0,
        explanation: '8 ~/ 3 = 2 free items. 8 - 2 = 6 payable items * $20 = $120.00.',
      },
      {
        id: 'm5-q4',
        question: 'Which state management pattern uses unidirectional data flow: Events in -> BLoC logic -> States out?',
        options: ['BLoC Pattern', 'setState', 'InheritedWidget', 'MVC'],
        correctIndex: 0,
        explanation: 'BLoC enforces event-to-state stream transformations.',
      },
      {
        id: 'm5-q5',
        question: 'What is the role of GlobalKey<FormState> in Flutter?',
        options: [
          'Uniquely identifies the Form and provides access to FormState to invoke validate(), reset(), and save()',
          'Stores data in SQLite',
          'Sets the app color',
          'Compiles to release mode'
        ],
        correctIndex: 0,
        explanation: 'GlobalKey<FormState> gives access to form lifecycle operations.',
      },
      {
        id: 'm5-q6',
        question: 'What does .where((item) => condition).toList() do in Dart?',
        options: [
          'Filters items in a collection based on a predicate function',
          'Deletes the list',
          'Sorts the list',
          'Reverses the list'
        ],
        correctIndex: 0,
        explanation: 'where() filters collections according to the boolean predicate.',
      },
      {
        id: 'm5-q7',
        question: 'What is the difference between context.watch() and context.read() in Provider?',
        options: [
          'watch() subscribes the widget to rebuilds; read() gets the object without subscribing (for callbacks)',
          'watch() is for iOS; read() is for Android',
          'read() is deprecated',
          'They do the exact same thing'
        ],
        correctIndex: 0,
        explanation: 'watch() creates a rebuild dependency; read() fetches the instance once.'
      },
      {
        id: 'm5-q8',
        question: 'In native Android Kotlin, how do you set an error message on an EditText?',
        options: ['editText.error = "Error message"', 'editText.setErrorText()', 'editText.validate()', 'editText.showRedBox()'],
        correctIndex: 0,
        explanation: 'Assigning to editText.error triggers native Android validation warning UI.',
      },
      {
        id: 'm5-q9',
        question: 'How do you pop an active AlertDialog off the screen in Flutter?',
        options: ['Navigator.pop(context)', 'dialog.close()', 'dismiss()', 'Scaffold.close()'],
        correctIndex: 0,
        explanation: 'Dialogs are modal routes popped via Navigator.pop(context).',
      },
      {
        id: 'm5-q10',
        question: 'Which widget allows items to be dismissed with a swipe gesture?',
        options: ['Dismissible', 'SwipeBox', 'SlideItem', 'FlingWidget'],
        correctIndex: 0,
        explanation: 'Dismissible provides swipe-to-dismiss behavior with direction and background styling.',
      },
      {
        id: 'm5-q11',
        question: 'What is the difference between const widgets and non-const widgets in Flutter?',
        options: [
          'const widgets are instantiated once at compile-time and skipped during parent rebuilds',
          'const widgets cannot have text',
          'non-const widgets are 100x faster',
          'const widgets are for iOS only'
        ],
        correctIndex: 0,
        explanation: 'const widgets short-circuit rebuilds and reuse existing memory instances.',
      },
      {
        id: 'm5-q12',
        question: 'What is the primary role of the AndroidManifest.xml file?',
        options: [
          'It is the root manifest declaring app package name, components, permissions, and metadata to the OS',
          'It compiles Kotlin to Java',
          'It sets the database password',
          'It formats images'
        ],
        correctIndex: 0,
        explanation: 'AndroidManifest.xml informs the Android OS of app capabilities and structure.',
      },
      {
        id: 'm5-q13',
        question: 'Which method starts an Android Service that runs indefinitely until calling stopSelf()?',
        options: ['startService(intent)', 'bindService(intent)', 'runService()', 'executeService()'],
        correctIndex: 0,
        explanation: 'startService() starts an independent Started Service.',
      },
      {
        id: 'm5-q14',
        question: 'How do you check whether a phone has network connectivity in Flutter?',
        options: [
          'Using the connectivity_plus plugin or testing socket connections',
          'By checking battery level',
          'Using MediaQuery',
          'By reading SharedPreferences'
        ],
        correctIndex: 0,
        explanation: 'connectivity_plus listens to native network broadcast changes.',
      },
      {
        id: 'm5-q15',
        question: 'What does the Dart expression "int.tryParse(str) ?? 0" do?',
        options: [
          'Attempts to parse str as an integer; if parsing fails (returns null), falls back to 0',
          'Always returns 0',
          'Throws an exception if str is not an int',
          'Multiplies str by 0'
        ],
        correctIndex: 0,
        explanation: 'tryParse returns null on failure, and ?? provides the default fallback value.'
      },
      {
        id: 'm5-q16',
        question: 'In Android Activity lifecycle, which method is called immediately before an activity is destroyed from memory?',
        options: ['onDestroy()', 'onStop()', 'onPause()', 'onFinish()'],
        correctIndex: 0,
        explanation: 'onDestroy() is the final teardown callback in the Activity lifecycle.',
      },
      {
        id: 'm5-q17',
        question: 'What does a childAspectRatio of 1.0 signify in a GridView?',
        options: [
          'Each grid tile has an equal width and height (square aspect ratio)',
          'The grid has 1 column',
          'The grid is 1 pixel wide',
          'Tiles are rectangular'
        ],
        correctIndex: 0,
        explanation: 'childAspectRatio is width / height; 1.0 produces square tiles.',
      },
      {
        id: 'm5-q18',
        question: 'Which Flutter widget allows embedding a normal Box widget into a CustomScrollView slivers list?',
        options: ['SliverToBoxAdapter', 'SliverBox', 'BoxToSliver', 'SliverContainer'],
        correctIndex: 0,
        explanation: 'SliverToBoxAdapter bridges regular Box widgets into a Sliver viewport.',
      },
      {
        id: 'm5-q19',
        question: 'What is the purpose of the Hero widget in Flutter navigation transitions?',
        options: [
          'To smoothly fly a shared visual element from one screen to another across routes',
          'To display superhero icons',
          'To handle authentication',
          'To compress video files'
        ],
        correctIndex: 0,
        explanation: 'Hero provides shared-element flight animations between routes.'
      },
      {
        id: 'm5-q20',
        question: 'What command compiles a release Android App Bundle ready for Google Play Store upload?',
        options: ['flutter build appbundle', 'flutter compile playstore', 'flutter make release', 'dart release'],
        correctIndex: 0,
        explanation: 'flutter build appbundle generates the release AAB package.'
      },
    ],
  },
];
