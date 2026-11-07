import { Lesson } from '../../types';

export const module3Lessons: Lesson[] = [
  {
    id: 'm3-l1',
    moduleId: 'module-3',
    title: 'TextField & TextFormField (Android EditText Equivalent)',
    description: 'Exam Critical: Master text input in Flutter! Learn TextField vs TextFormField, TextEditingController, keyboard types (number, email, phone), obscuring passwords, and decoration styling.',
    order: 1,
    durationMinutes: 15,
    difficulty: 'Beginner',
    prerequisites: ['Module 2: Flutter UI Basics'],
    lastVerified: 'November 2026',
    goal: 'Capture user text input, use TextEditingController to read and clear values, select appropriate keyboard types, and understand the direct mapping to Android EditText.',
    simpleExplanation: `In native Android development, when you want the user to type text or numbers, you use an [EditText](https://developer.android.com/reference/android/widget/EditText).
In Flutter, the exact equivalent is [TextField](https://api.flutter.dev/flutter/material/TextField-class.html) (or [TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html) when used inside a Form). Check out the official [Flutter Form Validation Cookbook](https://docs.flutter.dev/cookbook/forms/validation) for hands-on interactive recipes.

### 1. \`TextField\` vs \`TextFormField\`
- **\`TextField\`**: Standalone basic input field. Good for search bars or simple one-off inputs.
- **\`TextFormField\`**: Extends \`TextField\` with built-in **form validation**, error text display, and integration with a parent \`Form\` widget. **Always use \`TextFormField\` for forms!**

### 2. \`TextEditingController\`
To read what the user typed or programmatically clear the text:
1. Create a controller: \`final _nameController = TextEditingController();\`
2. Pass it to the field: \`TextFormField(controller: _nameController)\`
3. Read text: \`String name = _nameController.text;\`
4. **Always dispose it in \`dispose()\` to avoid memory leaks!**

### 3. Keyboard Types & Input Actions
Match the software keyboard to the expected input:
- **Numbers / Roll / Marks:** \`keyboardType: TextInputType.number\`
- **Email:** \`keyboardType: TextInputType.emailAddress\`
- **Phone:** \`keyboardType: TextInputType.phone\`
- **Password:** \`obscureText: true\` (masks characters with dots)`,
    analogy: `Think of an input field like a blank fill-in-the-blank line on a paper application form:
- **TextFormField:** The printed dotted line on the paper.
- **TextEditingController:** A personal assistant holding an eraser and pen watching that line. Whenever you ask: "What did the applicant write?", the assistant reads it out instantly.
- **Android EditText:** The exact same dotted line, just written in a different language!`,
    codeSnippet: `import 'package:flutter/material.dart';

class StudentInputWidget extends StatefulWidget {
  const StudentInputWidget({super.key});

  @override
  State<StudentInputWidget> createState() => _StudentInputWidgetState();
}

class _StudentInputWidgetState extends State<StudentInputWidget> {
  // 1. Declare TextEditingControllers
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _rollController = TextEditingController();
  final TextEditingController _marksController = TextEditingController();

  // 2. Memory cleanup: ALWAYS dispose controllers!
  @override
  void dispose() {
    _nameController.dispose();
    _rollController.dispose();
    _marksController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Student Name Field (Standard Text)
        TextFormField(
          controller: _nameController,
          decoration: const InputDecoration(
            labelText: 'Student Full Name',
            hintText: 'e.g. Alex Johnson',
            prefixIcon: Icon(Icons.person),
            border: OutlineInputBorder(),
          ),
          textCapitalization: TextCapitalization.words,
        ),
        const SizedBox(height: 16),
        // Roll Number Field (Alphanumeric or Number)
        TextFormField(
          controller: _rollController,
          decoration: const InputDecoration(
            labelText: 'Roll Number',
            hintText: 'e.g. 101 or CS-2026',
            prefixIcon: Icon(Icons.badge),
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 16),
        // Marks Field (Numeric Keyboard)
        TextFormField(
          controller: _marksController,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          decoration: const InputDecoration(
            labelText: 'Marks (0 - 100)',
            hintText: 'e.g. 88.5',
            prefixIcon: Icon(Icons.score),
            border: OutlineInputBorder(),
          ),
        ),
      ],
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: InputDemo()))));

class InputDemo extends StatefulWidget {
  const InputDemo({super.key});

  @override
  State<InputDemo> createState() => _InputDemoState();
}

class _InputDemoState extends State<InputDemo> {
  final _ctrl = TextEditingController();
  String _displayText = '';

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _ctrl,
            decoration: const InputDecoration(labelText: 'Type student name', border: OutlineInputBorder()),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: () => setState(() => _displayText = _ctrl.text),
            child: const Text('Read Text'),
          ),
          const SizedBox(height: 12),
          Text('Submitted: \$_displayText', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Create and attach TextEditingController',
        description: 'Initialize a TextEditingController in your State class and pass it into controller: _controller.'
      },
      {
        step: 2,
        title: 'InputDecoration styling',
        description: 'Use InputDecoration to set labelText (floating label), hintText (placeholder), prefixIcon, and OutlineInputBorder().'
      },
      {
        step: 3,
        title: 'Configure TextInputType',
        description: 'Set keyboardType: TextInputType.number for marks or roll numbers to bring up the numeric keypad on mobile devices.'
      },
      {
        step: 4,
        title: 'Dispose controller in dispose()',
        description: 'Controllers attach listeners to the operating system text services; disposing them prevents memory leaks.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting to dispose TextEditingController in dispose().',
        fix: 'Override dispose() and call _controller.dispose(); super.dispose();',
        why: 'In production apps, undisposed controllers leak memory every time the screen is opened and closed.'
      },
      {
        mistake: 'Re-instantiating TextEditingController inside the build() method.',
        fix: 'Declare the controller as a field of the State class, never inside build().',
        why: 'Recreating it in build() wipes out the user cursor position and clears input on every keystroke!'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the Flutter equivalent of the Android native EditText?" — Answer: TextField (or TextFormField for form validation).',
      'Exam Alert: "How do you read the text entered by a user into a TextField?" — Answer: Using a TextEditingController via controller.text.',
      'Exam Alert: "How do you hide/mask characters in a password field?" — Answer: Set obscureText: true on the TextField.'
    ],
    practiceTask: {
      task: 'Create a password input field that masks the typed characters with dots and shows a lock icon on the left.',
      hint: 'obscureText: true and prefixIcon: Icon(Icons.lock)',
      solution: `TextFormField(
  obscureText: true,
  decoration: const InputDecoration(
    labelText: 'Password',
    hintText: 'Enter secret password',
    prefixIcon: Icon(Icons.lock),
    border: OutlineInputBorder(),
  ),
)`
    },
    quiz: [
      {
        id: 'q3-1-1',
        question: 'What is the Flutter equivalent of the Android native EditText view?',
        options: ['TextView', 'TextField / TextFormField', 'Spinner', 'InputBox'],
        correctIndex: 1,
        explanation: 'TextField (and TextFormField) is Flutter\'s primary editable text input component, directly corresponding to Android\'s EditText.'
      },
      {
        id: 'q3-1-2',
        question: 'How do you retrieve the current text value from a TextField?',
        options: ['TextField.getValue()', 'controller.text', 'context.readText()', 'state.value'],
        correctIndex: 1,
        explanation: 'The TextEditingController provides a .text getter returning the current string value.'
      },
      {
        id: 'q3-1-3',
        question: 'Why MUST you dispose a TextEditingController in the dispose() method?',
        options: [
          'To clear the phone cache',
          'To prevent memory leaks by releasing native OS text listener resources',
          'It is required by Google Play Store policies',
          'Dart will not compile without it'
        ],
        correctIndex: 1,
        explanation: 'Controllers hold resources that must be released when the widget is permanently removed from the tree.'
      },
      {
        id: 'q3-1-4',
        question: 'Which property hides password characters with dots or asterisks?',
        options: ['isPassword: true', 'obscureText: true', 'maskText: true', 'hideInput: true'],
        correctIndex: 1,
        explanation: 'obscureText: true masks entered characters.'
      },
      {
        id: 'q3-1-5',
        question: 'Which TextInputType opens a numeric keypad on mobile devices?',
        options: ['TextInputType.text', 'TextInputType.number', 'TextInputType.multiline', 'TextInputType.url'],
        correctIndex: 1,
        explanation: 'TextInputType.number requests the virtual keyboard to display numeric keys.'
      }
    ]
  },
  {
    id: 'm3-l2',
    moduleId: 'module-3',
    title: 'DropdownButton & DropdownMenu (Android Spinner Equivalent)',
    description: 'Exam Critical: Master dropdown selection! Understand DropdownButton, DropdownButtonFormField, and Material 3 DropdownMenu, and learn how they map to the native Android Spinner.',
    order: 2,
    durationMinutes: 14,
    difficulty: 'Beginner',
    prerequisites: ['Module 3 Lesson 1: TextField'],
    lastVerified: 'November 2026',
    goal: 'Build dropdown selectors, manage selected value state, understand DropdownButtonFormField validation, and answer Android Spinner exam questions.',
    simpleExplanation: `In native Android development, a dropdown selection menu is called a [Spinner](https://developer.android.com/reference/android/widget/Spinner).
In Flutter, the exact equivalent is [DropdownButton](https://api.flutter.dev/flutter/material/DropdownButton-class.html) or [DropdownButtonFormField](https://api.flutter.dev/flutter/material/DropdownButtonFormField-class.html) (or the modern Material 3 [DropdownMenu](https://api.flutter.dev/flutter/material/DropdownMenu-class.html)).

### 1. \`DropdownButtonFormField<T>\` (Exam Project Choice)
For forms where the user must pick an option (such as choosing a student's course: "Flutter", "Android", "Cloud"):
- **\`value\`**: The currently selected value (e.g. \`_selectedCourse\`).
- **\`items\`**: A list of \`DropdownMenuItem<T>\` widgets.
- **\`onChanged\`**: A callback triggered whenever the user taps an option.
- **\`validator\`**: Validates whether the user made a selection!

### 2. How it Maps to Android Spinner:
- **Android Spinner:** Uses an \`ArrayAdapter\` or \`BaseAdapter\` to supply items from an XML array or string list, with \`setOnItemSelectedListener\`.
- **Flutter DropdownButtonFormField:** Takes a list of \`DropdownMenuItem\` objects and triggers \`onChanged: (newValue) { setState(() => _selected = newValue); }\`.`,
    analogy: `Think of a dropdown like a restaurant dessert cart:
Instead of all 10 cakes taking up room on your small dinner table, the waiter brings over a closed menu list (the dropdown). You tap it, a vertical list opens, you point to "Chocolate Cheesecake", and the cart rolls away, leaving just your selected choice on the table.
In Android it is called a **Spinner**; in Flutter it is called a **Dropdown**!`,
    codeSnippet: `import 'package:flutter/material.dart';

class CourseDropdownDemo extends StatefulWidget {
  const CourseDropdownDemo({super.key});

  @override
  State<CourseDropdownDemo> createState() => _CourseDropdownDemoState();
}

class _CourseDropdownDemoState extends State<CourseDropdownDemo> {
  // Available course options
  final List<String> _courses = [
    'Flutter Mobile Development',
    'Native Android (Kotlin)',
    'Cloud & DevOps Engineering',
    'Data Science & AI',
  ];

  // Currently selected course (nullable initially)
  String? _selectedCourse;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: _selectedCourse,
      decoration: const InputDecoration(
        labelText: 'Select Enrolled Course',
        prefixIcon: Icon(Icons.school),
        border: OutlineInputBorder(),
      ),
      hint: const Text('Choose a course...'),
      // Map strings to DropdownMenuItem widgets
      items: _courses.map((course) {
        return DropdownMenuItem<String>(
          value: course,
          child: Text(course),
        );
      }).toList(),
      onChanged: (String? newValue) {
        setState(() {
          _selectedCourse = newValue;
        });
      },
      // Validation rule: ensure user picked a course
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please select a course for the student';
        }
        return null; // Valid!
      },
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: DropdownDemo()))));

class DropdownDemo extends StatefulWidget {
  const DropdownDemo({super.key});

  @override
  State<DropdownDemo> createState() => _DropdownDemoState();
}

class _DropdownDemoState extends State<DropdownDemo> {
  String? selectedFruit = 'Apple';

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        DropdownButton<String>(
          value: selectedFruit,
          items: ['Apple', 'Banana', 'Orange', 'Mango'].map((fruit) {
            return DropdownMenuItem(value: fruit, child: Text(fruit));
          }).toList(),
          onChanged: (val) => setState(() => selectedFruit = val),
        ),
        const SizedBox(height: 16),
        Text('Selected: \$selectedFruit', style: const TextStyle(fontSize: 18)),
      ],
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Define items array and state variable',
        description: 'Declare a List<String> containing your choices and a String? state variable for the currently chosen value.'
      },
      {
        step: 2,
        title: 'Map list to DropdownMenuItem',
        description: 'Use _courses.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList().'
      },
      {
        step: 3,
        title: 'Update state in onChanged',
        description: 'Call setState(() => _selectedCourse = newValue) inside onChanged.'
      },
      {
        step: 4,
        title: 'Add form validation',
        description: 'DropdownButtonFormField provides a validator callback just like TextFormField.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Setting the initial "value" to a string not present in the "items" list.',
        fix: 'Ensure the initial value is either null or exactly matches one of the item values.',
        why: 'If value does not exist in the items list, Flutter throws an assertion failure exception.'
      },
      {
        mistake: 'Duplicate values in DropdownMenuItems.',
        fix: 'Every DropdownMenuItem must have a unique value.',
        why: 'Flutter identifies the active item by its value; duplicate values cause an assertion crash.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the Flutter equivalent of the Android native Spinner?" — Answer: DropdownButton or DropdownButtonFormField (or DropdownMenu in Material 3).',
      'Exam Alert: "Why is DropdownButtonFormField preferred over DropdownButton inside a Form?" — Answer: Because DropdownButtonFormField seamlessly integrates with Form validation (validator property) and decoration (InputDecoration).'
    ],
    practiceTask: {
      task: 'Build a DropdownButtonFormField with 3 student grades: "A", "B", "C". When selected, display the chosen grade in a Text widget below.',
      hint: 'Declare String? selectedGrade and update it in onChanged.',
      solution: `DropdownButtonFormField<String>(
  value: selectedGrade,
  hint: const Text('Pick Grade'),
  items: ['A', 'B', 'C'].map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
  onChanged: (val) => setState(() => selectedGrade = val),
)`
    },
    quiz: [
      {
        id: 'q3-2-1',
        question: 'What is the Flutter equivalent of the native Android Spinner component?',
        options: ['RadioGroup', 'DropdownButton / DropdownButtonFormField', 'ListView', 'Switch'],
        correctIndex: 1,
        explanation: 'DropdownButton and DropdownButtonFormField provide identical popup selection functionality to Android Spinner.'
      },
      {
        id: 'q3-2-2',
        question: 'What happens if the "value" passed to DropdownButton does not exist in its "items" list?',
        options: [
          'It auto-adds it to the list',
          'It crashes with a Flutter assertion error',
          'It displays an empty blank screen',
          'It defaults to the first item silently'
        ],
        correctIndex: 1,
        explanation: 'Flutter enforces that the active value must be null or match one of the DropdownMenuItem values.'
      },
      {
        id: 'q3-2-3',
        question: 'Which callback is fired when a user selects a new item in a DropdownButton?',
        options: ['onSelect()', 'onChanged()', 'onItemClick()', 'onTap()'],
        correctIndex: 1,
        explanation: 'onChanged: (newValue) { ... } is invoked with the newly selected value.'
      },
      {
        id: 'q3-2-4',
        question: 'How does DropdownButtonFormField differ from DropdownButton?',
        options: [
          'It only works with numbers',
          'It integrates with the Form widget, supporting InputDecoration styling and form validators',
          'It cannot be closed once opened',
          'It requires Firebase'
        ],
        correctIndex: 1,
        explanation: 'DropdownButtonFormField wraps DropdownButton with FormField capabilities like validator and decoration.'
      },
      {
        id: 'q3-2-5',
        question: 'In native Android, which adapter class is commonly used with a Spinner to populate items from a list?',
        options: ['ArrayAdapter', 'SpinnerAdapterPro', 'ListAdapter', 'LayoutAdapter'],
        correctIndex: 0,
        explanation: 'ArrayAdapter<String> is standard in native Android for populating Spinners from arrays.'
      }
    ]
  },
  {
    id: 'm3-l3',
    moduleId: 'module-3',
    title: 'Checkbox, Radio, Switch, Slider & Pickers',
    description: 'Master binary toggles and selections: CheckboxListTile, RadioListTile, SwitchListTile, Slider, showDatePicker, and showTimePicker.',
    order: 3,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['Module 3 Lesson 2: Dropdowns'],
    lastVerified: 'November 2026',
    goal: 'Handle multi-select with Checkboxes, single-select with Radio buttons, toggles with Switch, range selection with Slider, and date/time pickers.',
    simpleExplanation: `Forms frequently require boolean flags and multiple-choice options:

### 1. \`Checkbox\` & \`CheckboxListTile\`
- Used for multiple selections (e.g. "Select extracurricular clubs: Chess, Robotics, Music").
- \`CheckboxListTile\` pairs the checkbox with a title, subtitle, and tap area automatically.

### 2. \`Radio\` & \`RadioListTile\`
- Used for mutually exclusive single selections (e.g. "Gender: Male, Female, Other" or "Attendance: Present, Absent").
- All radio buttons in a group share the same \`groupValue\`.

### 3. \`Switch\` & \`SwitchListTile\`
- Used for instant toggle settings (e.g. "Enable Notifications", "Dark Mode").

### 4. Date & Time Pickers
- **\`showDatePicker()\`**: Opens the native calendar dialog to pick a date.
- **\`showTimePicker()\`**: Opens the clock dialog to pick a time.`,
    analogy: `Think of everyday controls:
- **Checkbox:** A grocery checklist where you can check off as many items as you want.
- **Radio Buttons:** A microwave preset knob: it can only be set to Defrost OR Popcorn OR Reheat, never two at once!
- **Switch:** A wall light switch: On or Off.
- **DatePicker:** A desktop calendar flipped to a specific date.`,
    codeSnippet: `import 'package:flutter/material.dart';

class FormControlsDemo extends StatefulWidget {
  const FormControlsDemo({super.key});

  @override
  State<FormControlsDemo> createState() => _FormControlsDemoState();
}

class _FormControlsDemoState extends State<FormControlsDemo> {
  bool _agreedToTerms = false;
  String _selectedGender = 'Female';
  bool _receiveNotifications = true;
  double _scholarshipPercentage = 25.0;
  DateTime? _enrollmentDate;

  void _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );
    if (picked != null) {
      setState(() => _enrollmentDate = picked);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 1. CheckboxListTile
        CheckboxListTile(
          title: const Text('I agree to the college rules and honor code'),
          value: _agreedToTerms,
          onChanged: (val) => setState(() => _agreedToTerms = val ?? false),
        ),
        // 2. RadioListTiles for Gender
        RadioListTile<String>(
          title: const Text('Female'),
          value: 'Female',
          groupValue: _selectedGender,
          onChanged: (val) => setState(() => _selectedGender = val!),
        ),
        RadioListTile<String>(
          title: const Text('Male'),
          value: 'Male',
          groupValue: _selectedGender,
          onChanged: (val) => setState(() => _selectedGender = val!),
        ),
        // 3. SwitchListTile
        SwitchListTile(
          title: const Text('Email Grade Notifications'),
          value: _receiveNotifications,
          onChanged: (val) => setState(() => _receiveNotifications = val),
        ),
        // 4. Slider for scholarship percentage
        Text('Requested Scholarship: \${_scholarshipPercentage.round()}%'),
        Slider(
          value: _scholarshipPercentage,
          min: 0,
          max: 100,
          divisions: 20,
          onChanged: (val) => setState(() => _scholarshipPercentage = val),
        ),
        // 5. Date Picker Button
        OutlinedButton.icon(
          onPressed: _pickDate,
          icon: const Icon(Icons.calendar_month),
          label: Text(_enrollmentDate == null
              ? 'Select Enrollment Date'
              : 'Date: \${_enrollmentDate!.day}/\${_enrollmentDate!.month}/\${_enrollmentDate!.year}'),
        ),
      ],
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: SwitchDemo()))));

class SwitchDemo extends StatefulWidget {
  const SwitchDemo({super.key});

  @override
  State<SwitchDemo> createState() => _SwitchDemoState();
}

class _SwitchDemoState extends State<SwitchDemo> {
  bool isDark = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Switch(
          value: isDark,
          onChanged: (val) => setState(() => isDark = val),
        ),
        Text('Status: \${isDark ? "DARK MODE" : "LIGHT MODE"}', style: const TextStyle(fontSize: 18)),
      ],
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Prefer ListTile variants',
        description: 'CheckboxListTile and SwitchListTile expand the tap target to the full row width, improving thumb accessibility.'
      },
      {
        step: 2,
        title: 'Radio groupValue connection',
        description: 'Radio buttons belong to the same group when they bind to the exact same groupValue state variable.'
      },
      {
        step: 3,
        title: 'Slider divisions',
        description: 'Setting divisions: 20 on a 0-100 Slider snaps values into discrete 5% increments.'
      },
      {
        step: 4,
        title: 'Async showDatePicker',
        description: 'showDatePicker returns a Future<DateTime?>. Always check if the returned value != null before using it.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using different groupValues for radio buttons that are supposed to be mutually exclusive.',
        fix: 'Ensure all Radio buttons in the group bind to the same variable in groupValue.',
        why: 'If groupValue variables differ, clicking one won\'t deselect the other.'
      },
      {
        mistake: 'Assuming showDatePicker always returns a DateTime.',
        fix: 'Check if (picked != null) because if the user taps Cancel, it returns null.',
        why: 'Accessing properties on a cancelled null picker causes a crash.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between Checkbox and Radio in a form?" — Answer: Checkbox allows multiple independent options to be selected; Radio allows only one option from a mutually exclusive group.',
      'Exam Alert: "How do you show a native date picker dialog in Flutter?" — Answer: Using showDatePicker(context: context, initialDate: ..., firstDate: ..., lastDate: ...).'
    ],
    practiceTask: {
      task: 'Create a SwitchListTile that toggles "Hostel Accommodation Required". Display a Text banner underneath stating whether hostel fees are applicable.',
      hint: 'bool needsHostel = false; SwitchListTile(value: needsHostel, onChanged: (v) => setState(() => needsHostel = v));',
      solution: `SwitchListTile(
  title: const Text('Hostel Accommodation Required'),
  value: needsHostel,
  onChanged: (val) => setState(() => needsHostel = val),
  subtitle: Text(needsHostel ? 'Hostel fee: \$500/semester' : 'No hostel fees'),
)`
    },
    quiz: [
      {
        id: 'q3-3-1',
        question: 'Which widget allows only one single selection from a group of mutually exclusive options?',
        options: ['Checkbox', 'Radio / RadioListTile', 'Switch', 'Slider'],
        correctIndex: 1,
        explanation: 'Radio buttons enforce single selection within their shared groupValue.'
      },
      {
        id: 'q3-3-2',
        question: 'What return type does showDatePicker() return?',
        options: ['DateTime', 'Future<DateTime?>', 'String', 'int'],
        correctIndex: 1,
        explanation: 'showDatePicker is asynchronous, returning a Future that resolves to the chosen DateTime or null if cancelled.'
      },
      {
        id: 'q3-3-3',
        question: 'Why is CheckboxListTile preferred over a bare Checkbox in forms?',
        options: [
          'It runs on a separate thread',
          'It bundles title text, subtitle, and an expanded touch target for the whole row',
          'It connects to SQL',
          'It validates emails'
        ],
        correctIndex: 1,
        explanation: 'CheckboxListTile provides a standard accessible Material list item layout.'
      },
      {
        id: 'q3-3-4',
        question: 'What does the "divisions" property do in a Slider widget?',
        options: [
          'Divides the slider into multiple parallel tracks',
          'Snaps the thumb to discrete incremental steps along the slider track',
          'Sets the font size',
          'Changes the slider color'
        ],
        correctIndex: 1,
        explanation: 'divisions breaks the range into discrete ticks that the slider thumb snaps to.'
      },
      {
        id: 'q3-3-5',
        question: 'What should you check before using the result of showDatePicker?',
        options: [
          'Check if the year is a leap year',
          'Check if the returned value != null in case the user dismissed or cancelled the dialog',
          'Check device battery',
          'Check Wi-Fi'
        ],
        correctIndex: 1,
        explanation: 'Users can cancel or tap outside the dialog, which results in null.'
      }
    ]
  },
  {
    id: 'm3-l4',
    moduleId: 'module-3',
    title: 'Form Widget, GlobalKey<FormState> & Validation Flow',
    description: 'Exam Critical: The core mechanism of Flutter forms! Learn the Form widget, GlobalKey<FormState>, formState.validate(), formState.save(), and formState.reset().',
    order: 4,
    durationMinutes: 16,
    difficulty: 'Beginner',
    prerequisites: ['Module 3 Lesson 1 & 2'],
    lastVerified: 'November 2026',
    goal: 'Wrap inputs in a Form widget, bind a GlobalKey<FormState>, trigger comprehensive validation on submit button click, and clear the form.',
    simpleExplanation: `In Flutter, individual \`TextFormField\` and \`DropdownButtonFormField\` widgets don't know about each other.
To validate all fields **together in one single click**, you wrap them inside a **\`Form\`** widget.

### The 4 Steps to Form Validation:
1. **Create the Key:**
   \`\`\`dart
   final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
   \`\`\`
2. **Wrap in \`Form\` widget:**
   \`\`\`dart
   Form(
     key: _formKey,
     child: Column(children: [ ...FormField widgets... ]),
   )
   \`\`\`
3. **Write the \`validator\` in each field:**
   Return \`null\` if the value is valid. Return an error message string if invalid!
   \`\`\`dart
   validator: (value) {
     if (value == null || value.trim().isEmpty) {
       return 'This field cannot be empty';
     }
     return null; // Valid!
   }
   \`\`\`
4. **Trigger validation in button \`onPressed\`:**
   \`\`\`dart
   if (_formKey.currentState!.validate()) {
     // ALL fields passed validation! Safe to process data!
   }
   \`\`\`

### Form Lifecycle Methods
- \`_formKey.currentState!.validate()\`: Runs the validator of every child field. Returns \`true\` if all pass, \`false\` if any fail.
- \`_formKey.currentState!.reset()\`: Resets all fields back to their initial values and clears red error messages.
- \`_formKey.currentState!.save()\`: Calls \`onSaved\` on every child field.`,
    analogy: `Think of a Form like an airport customs checkpoint:
- **Individual FormFields:** The passenger passport, boarding pass, and baggage.
- **Form with GlobalKey:** The customs officer.
- **\`.validate()\`:** The customs officer stamps their hand down. They inspect the passport, check the boarding pass, and scan the bag all at once. If even ONE document is missing or expired, a red alarm buzzes (red error message) and the passenger cannot pass through the gate!`,
    codeSnippet: `import 'package:flutter/material.dart';

class ValidatedStudentForm extends StatefulWidget {
  const ValidatedStudentForm({super.key});

  @override
  State<ValidatedStudentForm> createState() => _ValidatedStudentFormState();
}

class _ValidatedStudentFormState extends State<ValidatedStudentForm> {
  // 1. The GlobalKey to manage FormState
  final _formKey = GlobalKey<FormState>();

  final _nameController = TextEditingController();
  final _rollController = TextEditingController();
  final _marksController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _rollController.dispose();
    _marksController.dispose();
    super.dispose();
  }

  void _submitForm() {
    // 2. Validate all fields simultaneously
    if (_formKey.currentState!.validate()) {
      // If validation succeeds:
      String name = _nameController.text.trim();
      double marks = double.parse(_marksController.text.trim());

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Validation Passed for \$name! Marks: \$marks'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(labelText: 'Student Name', border: OutlineInputBorder()),
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Please enter student name';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: _marksController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(labelText: 'Marks (0 - 100)', border: OutlineInputBorder()),
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Please enter marks';
              }
              final num? score = num.tryParse(value.trim());
              if (score == null) return 'Marks must be a valid number';
              if (score < 0 || score > 100) return 'Marks must be between 0 and 100';
              return null;
            },
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: _submitForm,
            child: const Text('Submit Student Details'),
          ),
        ],
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: FormValidationDemo()))));

class FormValidationDemo extends StatefulWidget {
  const FormValidationDemo({super.key});

  @override
  State<FormValidationDemo> createState() => _FormValidationDemoState();
}

class _FormValidationDemoState extends State<FormValidationDemo> {
  final _formKey = GlobalKey<FormState>();
  final _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _controller,
              decoration: const InputDecoration(labelText: 'Roll Number', border: OutlineInputBorder()),
              validator: (val) => (val == null || val.isEmpty) ? 'Roll number is required!' : null,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Form Valid!')));
                }
              },
              child: const Text('Validate'),
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
        title: 'Declare GlobalKey<FormState>',
        description: 'GlobalKey provides a unique reference to the FormState object across the widget tree.'
      },
      {
        step: 2,
        title: 'Attach key to Form',
        description: 'Passing key: _formKey connects the key to the root Form container.'
      },
      {
        step: 3,
        title: 'Return null on valid input',
        description: 'Crucial: Form validators must return null when validation passes, and a String error message when it fails.'
      },
      {
        step: 4,
        title: 'Call _formKey.currentState!.validate()',
        description: 'Invokes every child validator. If any returns a string, red error text is rendered below that field automatically.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Returning an empty string "" instead of null when validation passes.',
        fix: 'Return null when valid! return null;',
        why: 'Returning an empty string "" tells Flutter there IS an error, rendering an empty red box.'
      },
      {
        mistake: 'Using standard TextField instead of TextFormField inside a Form.',
        fix: 'Use TextFormField so the validator property is recognized by FormState.',
        why: 'Standard TextField does not register with Form and will not participate in _formKey.currentState!.validate().'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the purpose of GlobalKey<FormState> in Flutter?" — Answer: It uniquely identifies the Form and provides access to its FormState to invoke validate(), reset(), or save().',
      'Exam Alert: "What should a validator function return when the input is completely valid?" — Answer: null.'
    ],
    practiceTask: {
      task: 'Write a validator for a Roll Number field that checks: (1) not empty, (2) must be at least 4 characters long.',
      hint: 'if (val == null || val.trim().isEmpty) return "..."; if (val.trim().length < 4) return "..."; return null;',
      solution: `validator: (value) {
  if (value == null || value.trim().isEmpty) {
    return 'Roll number cannot be empty';
  }
  if (value.trim().length < 4) {
    return 'Roll number must be at least 4 characters long';
  }
  return null;
}`
    },
    quiz: [
      {
        id: 'q3-4-1',
        question: 'What is the role of GlobalKey<FormState> in a Flutter form?',
        options: [
          'It sets the database password',
          'It provides a handle to access the FormState to trigger validate(), save(), and reset()',
          'It compiles the app to release mode',
          'It changes the app bar color'
        ],
        correctIndex: 1,
        explanation: 'GlobalKey<FormState> exposes the FormState methods like validate() across the widget hierarchy.'
      },
      {
        id: 'q3-4-2',
        question: 'What must a validator function return when the user input is valid and passes all checks?',
        options: ['true', '0', 'null', '"" (empty string)'],
        correctIndex: 2,
        explanation: 'Returning null indicates absence of error (i.e. input is valid).'
      },
      {
        id: 'q3-4-3',
        question: 'What does _formKey.currentState!.validate() return?',
        options: [
          'A List of strings',
          'A boolean: true if every field passed validation, false if any field failed',
          'void',
          'The user email'
        ],
        correctIndex: 1,
        explanation: 'validate() returns true only if all child FormField validators returned null.'
      },
      {
        id: 'q3-4-4',
        question: 'Which method clears all user inputs in a Form and removes validation error messages?',
        options: ['_formKey.currentState!.clear()', '_formKey.currentState!.reset()', '_formKey.currentState!.wipe()', 'form.undo()'],
        correctIndex: 1,
        explanation: 'reset() restores all FormFields back to their initial state and clears errors.'
      },
      {
        id: 'q3-4-5',
        question: 'Why does standard TextField NOT validate when calling _formKey.currentState!.validate()?',
        options: [
          'TextField is deprecated',
          'TextField is a basic widget that does not implement FormField; you must use TextFormField',
          'TextField only works on web',
          'TextField requires Firebase'
        ],
        correctIndex: 1,
        explanation: 'TextFormField is the FormField wrapper around TextField designed for form integration.'
      }
    ]
  },
  {
    id: 'm3-l5',
    moduleId: 'module-3',
    title: 'Exam Validation Recipes: Empty Check, Email, Phone & Marks Range (0-100)',
    description: 'Exam Critical: Copy-paste-ready validation recipes tested for company exams! Empty field checks, email regex, 10-digit phone number, numeric range (marks 0 to 100), and password strength.',
    order: 5,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 3 Lesson 4: Form & GlobalKey'],
    lastVerified: 'November 2026',
    goal: 'Write bulletproof input validation logic for Student Name, Roll Number, Marks (0-100), Email, and Phone, and understand how to handle these in both Flutter and Android.',
    simpleExplanation: `In almost every practical programming exam, you will be required to validate user input before processing.
Here are the exact validation recipes you need to memorize:

### Recipe 1: Non-Empty / Required Field (Student Name & Roll Number)
\`\`\`dart
String? validateRequired(String? value, String fieldName) {
  if (value == null || value.trim().isEmpty) {
    return '$fieldName is required and cannot be empty.';
  }
  return null;
}
\`\`\`

### Recipe 2: Marks Numeric Range (0 to 100) (THE EXAM FAVORITE!)
\`\`\`dart
String? validateMarks(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Marks field cannot be empty.';
  }
  final num? marks = num.tryParse(value.trim());
  if (marks == null) {
    return 'Please enter a valid numeric number.';
  }
  if (marks < 0.0 || marks > 100.0) {
    return 'Marks must be between 0 and 100.';
  }
  return null; // Valid!
}
\`\`\`

### Recipe 3: Email Address (Regex Pattern)
\`\`\`dart
String? validateEmail(String? value) {
  if (value == null || value.trim().isEmpty) return 'Email is required.';
  final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
  if (!emailRegex.hasMatch(value.trim())) {
    return 'Enter a valid email address (e.g. name@domain.com).';
  }
  return null;
}
\`\`\`

### Recipe 4: 10-Digit Mobile Phone Number
\`\`\`dart
String? validatePhone(String? value) {
  if (value == null || value.trim().isEmpty) return 'Phone number is required.';
  final phoneDigits = value.trim().replaceAll(RegExp(r'[^0-9]'), '');
  if (phoneDigits.length != 10) {
    return 'Phone number must contain exactly 10 digits.';
  }
  return null;
}
\`\`\``,
    analogy: `Think of validators like security guards at different gates:
- Guard 1 (Empty check): "Hey, you can't walk past without a badge!"
- Guard 2 (Marks check): "Your score badge must show a number between 0 and 100. If it says -5 or 150, step aside!"
- Guard 3 (Email check): "Does your badge have an '@' and a domain dot? If not, invalid format!"`,
    codeSnippet: `// Complete Reusable Validator Utility Class
class AppValidators {
  // 1. Empty Check
  static String? required(String? val, String fieldName) {
    if (val == null || val.trim().isEmpty) {
      return '\$fieldName cannot be empty.';
    }
    return null;
  }

  // 2. Marks Validator (0 to 100)
  static String? studentMarks(String? val) {
    if (val == null || val.trim().isEmpty) {
      return 'Please enter marks.';
    }
    final score = double.tryParse(val.trim());
    if (score == null) {
      return 'Marks must be a valid number.';
    }
    if (score < 0.0 || score > 100.0) {
      return 'Marks must be between 0.0 and 100.0.';
    }
    return null;
  }

  // 3. Email Check
  static String? email(String? val) {
    if (val == null || val.trim().isEmpty) return 'Email is required.';
    final regex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\$');
    if (!regex.hasMatch(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return null;
  }

  // 4. Roll Number Check
  static String? rollNumber(String? val) {
    if (val == null || val.trim().isEmpty) {
      return 'Roll Number is required.';
    }
    if (val.trim().length < 2) {
      return 'Roll Number must be at least 2 characters.';
    }
    return null;
  }
}`,
    dartPadCode: `void main() {
  List<String?> testMarks = ['', 'abc', '-10', '105', '85.5'];

  for (var m in testMarks) {
    String? error = validateMarks(m);
    print('Testing "\$m" -> \${error ?? "VALID! ✅"}');
  }
}

String? validateMarks(String? val) {
  if (val == null || val.trim().isEmpty) return 'Cannot be empty';
  final n = num.tryParse(val.trim());
  if (n == null) return 'Not a number';
  if (n < 0 || n > 100) return 'Must be 0-100';
  return null;
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Always trim input before checking',
        description: 'Using value.trim() strips leading and trailing whitespace, preventing users from passing validation by just typing spaces!'
      },
      {
        step: 2,
        title: 'Use num.tryParse or double.tryParse',
        description: 'tryParse returns null on non-numeric strings instead of throwing a FormatException crash.'
      },
      {
        step: 3,
        title: 'Check boundary conditions',
        description: 'Verify both lower (< 0) and upper (> 100) limits for exam marks validation.'
      },
      {
        step: 4,
        title: 'Clean error messages',
        description: 'Provide clear, actionable error feedback explaining exactly what the user must correct.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using int.parse(value) directly without try/catch or tryParse.',
        fix: 'Always use int.tryParse(value) or double.tryParse(value).',
        why: 'If the user types "abc" or leaves the field empty, int.parse() crashes the app immediately.'
      },
      {
        mistake: 'Checking value.isEmpty without value.trim().isEmpty.',
        fix: 'Use value.trim().isEmpty.',
        why: 'If the user types "    " (spaces), isEmpty is false, allowing empty spaces to slip through as valid input.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely Critical): "Write code to validate that Student Marks are between 0 and 100 and not empty." — Be prepared to write this exact validator in Dart and native Kotlin/Java.',
      'Exam Alert: "Why is double.tryParse() preferred over double.parse() for form validation?" — Answer: Because tryParse() safely returns null on invalid input instead of crashing with an unhandled FormatException.'
    ],
    practiceTask: {
      task: 'Write a validator function for a Discount Percentage field that ensures: (1) not empty, (2) is a valid number, (3) is between 1% and 50% discount.',
      hint: 'if (val < 1 || val > 50) return "Discount must be between 1% and 50%";',
      solution: `String? validateDiscount(String? value) {
  if (value == null || value.trim().isEmpty) {
    return 'Discount percentage is required';
  }
  final d = double.tryParse(value.trim());
  if (d == null) return 'Must be a valid number';
  if (d < 1.0 || d > 50.0) {
    return 'Discount must be between 1% and 50%';
  }
  return null;
}`
    },
    quiz: [
      {
        id: 'q3-5-1',
        question: 'Why should you always call .trim() before validating user text input?',
        options: [
          'To convert text to uppercase',
          'To remove accidental leading/trailing spaces and prevent blank spaces from passing as valid input',
          'To encrypt the string',
          'To make parsing 5x faster'
        ],
        correctIndex: 1,
        explanation: 'trim() ensures strings containing only whitespace like "   " are properly treated as empty.'
      },
      {
        id: 'q3-5-2',
        question: 'What does double.tryParse("95.5abc") return in Dart?',
        options: ['95.5', '0.0', 'null', 'Throws a FormatException'],
        correctIndex: 2,
        explanation: 'tryParse returns null safely whenever the string contains non-numeric characters.'
      },
      {
        id: 'q3-5-3',
        question: 'In a company exam asking to validate Student Marks (0-100), what boundary check is correct?',
        options: [
          'if (marks > 0 && marks < 100)',
          'if (marks < 0 || marks > 100) return "Invalid range";',
          'if (marks == 100)',
          'if (marks != 50)'
        ],
        correctIndex: 1,
        explanation: 'Marks must be inclusively between 0 and 100; anything < 0 or > 100 is invalid.'
      },
      {
        id: 'q3-5-4',
        question: 'Which regular expression pattern matches a standard email format?',
        options: [
          'RegExp(r"^[0-9]+$")',
          'RegExp(r"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$")',
          'RegExp(r"^http://")',
          'RegExp(r"^A-Z")'
        ],
        correctIndex: 1,
        explanation: 'This regex validates the standard username@domain.extension structure.'
      },
      {
        id: 'q3-5-5',
        question: 'How do you check that a mobile phone string has exactly 10 digits?',
        options: [
          'value.length == 10 after stripping all non-digit characters',
          'value == "10"',
          'value.contains("10")',
          'phone.isTenDigits()'
        ],
        correctIndex: 0,
        explanation: 'Strip spaces, dashes, or parentheses with regex, then verify length == 10.'
      }
    ]
  },
  {
    id: 'm3-l6',
    moduleId: 'module-3',
    title: 'Displaying Results: TextView Equivalent, SnackBar & Feedback',
    description: 'Exam Critical: Displaying submitted data! Understand the Text widget as the direct equivalent of Android TextView, render results inside a styled Card, and show confirmation SnackBars.',
    order: 6,
    durationMinutes: 12,
    difficulty: 'Beginner',
    prerequisites: ['Module 3 Lesson 5: Validation Recipes'],
    lastVerified: 'November 2026',
    goal: 'Display submitted student details (Name, Roll, Course, Marks, Grade) in a Text view card on button click, matching the exact company exam specification.',
    simpleExplanation: `In native Android, when you want to display non-editable text or submitted results on the screen, you use a **\`TextView\`**.
In Flutter, the exact equivalent is the **\`Text\`** widget (often styled inside a \`Container\` or \`Card\`).

### The Exam Workflow:
1. User enters: Name, Roll Number, Marks, and selects a Course from a dropdown.
2. User taps **Submit**.
3. Form validation runs. If valid:
4. Update the state with the submitted details:
   \`\`\`dart
   setState(() {
     _submittedStudent = Student(
       name: _nameCtrl.text,
       rollNumber: _rollCtrl.text,
       marks: double.parse(_marksCtrl.text),
       course: _selectedCourse!,
     );
   });
   \`\`\`
5. In the \`build()\` method, conditionally render the **Result Card (TextView equivalent)**:
   \`\`\`dart
   if (_submittedStudent != null)
     Card(
       child: Column(
         children: [
           Text('Name: \${_submittedStudent!.name}'),
           Text('Roll: \${_submittedStudent!.rollNumber}'),
           Text('Course: \${_submittedStudent!.course}'),
           Text('Marks: \${_submittedStudent!.marks}'),
           Text('Grade: \${_submittedStudent!.grade}'),
         ],
       ),
     )
   \`\`\``,
    analogy: `Think of a photo booth at an amusement park:
You step inside, type your name on the touchscreen (TextFormField), choose a fun digital frame (Dropdown), and press the big green "Print Photo" button.
The booth validates that you inserted a token, and instantly prints out a glossy souvenir card showing your picture, name, and score!`,
    codeSnippet: `import 'package:flutter/material.dart';

// The Result Card Component (Flutter equivalent of Android TextView card)
class StudentResultCard extends StatelessWidget {
  final String name;
  final String rollNumber;
  final String course;
  final double marks;
  final String grade;

  const StudentResultCard({
    super.key,
    required this.name,
    required this.rollNumber,
    required this.course,
    required this.marks,
    required this.grade,
  });

  @override
  Widget build(BuildContext context) {
    final isPassed = marks >= 50.0;

    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: isPassed ? Colors.green.shade50 : Colors.red.shade50,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Student Result Card', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: isPassed ? Colors.green : Colors.red,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text('GRADE $grade', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const Divider(),
            Text('Full Name: $name', style: const TextStyle(fontSize: 15)),
            const SizedBox(height: 4),
            Text('Roll Number: $rollNumber', style: const TextStyle(fontSize: 15)),
            const SizedBox(height: 4),
            Text('Enrolled Course: $course', style: const TextStyle(fontSize: 15)),
            const SizedBox(height: 4),
            Text('Marks: $marks / 100.0', style: const TextStyle(fontSize: 15)),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: Center(child: DisplayResultDemo()))));

class DisplayResultDemo extends StatefulWidget {
  const DisplayResultDemo({super.key});

  @override
  State<DisplayResultDemo> createState() => _DisplayResultDemoState();
}

class _DisplayResultDemoState extends State<DisplayResultDemo> {
  String? resultText;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ElevatedButton(
          onPressed: () {
            setState(() {
              resultText = 'Student: Alex | Roll: 101 | Marks: 92 | Grade: A+';
            });
          },
          child: const Text('Simulate Submit'),
        ),
        const SizedBox(height: 20),
        if (resultText != null)
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.amber.shade100,
            child: Text(resultText!, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ),
      ],
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Conditionally render result',
        description: 'Use Dart if (data != null) inside Column children to show the result card only after submit.'
      },
      {
        step: 2,
        title: 'Visual distinction for pass/fail',
        description: 'Change card background color (green for pass, red for fail) to make the feedback intuitive.'
      },
      {
        step: 3,
        title: 'Display SnackBar confirmation',
        description: 'Pair on-screen text update with a floating SnackBar so the user receives haptic and visual confirmation.'
      },
      {
        step: 4,
        title: 'Map to native Android TextView',
        description: 'In native Android, you would call textViewResult.setText("..."). In Flutter, you simply update the state and build() paints the Text widget!'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Trying to manipulate widgets like DOM elements: textWidget.setText("Hello").',
        fix: 'In Flutter, you do NOT call methods on widgets. You update your State variables inside setState(), and Flutter rebuilds the widget tree.',
        why: 'Flutter is declarative: UI = f(state).'
      },
      {
        mistake: 'Showing a blank empty card before the user has submitted anything.',
        fix: 'Use conditional rendering: if (submittedStudent != null) ...[ ResultCard(...) ]',
        why: 'Displaying an empty card with "null" values looks unpolished and confusing.'
      }
    ],
    examAlerts: [
      'Exam Alert (Critical): "What is the Flutter equivalent of the Android TextView?" — Answer: The Text widget.',
      'Exam Alert: "How does updating displayed text in Flutter differ from native Android?" — Answer: In native Android, you imperatively call textView.setText("..."). In Flutter, you declaratively update state variables inside setState(), which triggers the build() method to render the new Text widget.'
    ],
    practiceTask: {
      task: 'Create a Card that conditionally displays: "Congratulations! You scored Grade A+" in green bold text if marks >= 90.',
      hint: 'if (marks >= 90) Card(child: Text("...", style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)))',
      solution: `if (marks >= 90)
  Card(
    color: Colors.green.shade50,
    child: const Padding(
      padding: EdgeInsets.all(16),
      child: Text(
        'Congratulations! You scored Grade A+',
        style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 16),
      ),
    ),
  )`
    },
    quiz: [
      {
        id: 'q3-6-1',
        question: 'What is the Flutter equivalent of the Android native TextView component?',
        options: ['EditText', 'Text widget', 'LabelView', 'DisplayView'],
        correctIndex: 1,
        explanation: 'The Text widget is Flutter\'s primary non-editable text display component, directly corresponding to Android\'s TextView.'
      },
      {
        id: 'q3-6-2',
        question: 'How do you update the text displayed on the screen in Flutter?',
        options: [
          'Call textWidget.setText("new text")',
          'Update the string variable inside setState(() { ... }) and let Flutter rebuild the Text widget',
          'Call document.getElementById().innerText',
          'Restart the phone'
        ],
        correctIndex: 1,
        explanation: 'Flutter uses a declarative UI paradigm: UI is a function of state (UI = f(state)).'
      },
      {
        id: 'q3-6-3',
        question: 'How do you conditionally show a widget only after data has been submitted?',
        options: [
          'Using collection-if: if (submittedData != null) ResultWidget()',
          'By setting widget.visibility = "hidden"',
          'By deleting the widget file',
          'Using a while loop'
        ],
        correctIndex: 0,
        explanation: 'Dart collection-if syntax cleanly includes or omits widgets in a list.'
      },
      {
        id: 'q3-6-4',
        question: 'What property gives a Card widget a drop-shadow elevation in Flutter?',
        options: ['shadowDepth', 'elevation', 'zBuffer', 'blurRadius'],
        correctIndex: 1,
        explanation: 'elevation controls the z-coordinate shadow depth of Material surfaces.'
      },
      {
        id: 'q3-6-5',
        question: 'In the company exam Student Details project, where should the submitted details be displayed?',
        options: [
          'Printed only to the command line terminal',
          'Displayed on the screen in a Text widget / result card and/or a confirmation SnackBar',
          'Saved to a text file on Desktop',
          'Sent via SMS'
        ],
        correctIndex: 1,
        explanation: 'The exam specification states: "on clicking Submit displays all details in a text view (Text widget)".'
      }
    ]
  }
];

