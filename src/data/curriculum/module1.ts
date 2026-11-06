import { Lesson } from '../../types';

export const module1Lessons: Lesson[] = [
  {
    id: 'm1-l1',
    moduleId: 'module-1',
    title: 'Variables, Data Types, Null Safety & String Interpolation',
    description: 'Assume zero programming knowledge! Understand what variables are, Dart built-in data types (int, double, String, bool), Sound Null Safety, and string interpolation.',
    order: 1,
    durationMinutes: 14,
    difficulty: 'Beginner',
    prerequisites: ['Module 0: Start Here'],
    lastVerified: 'November 2026 (Dart 3.7+ null-safe)',
    goal: 'Understand variables, master Dart primitive data types, handle nullable vs non-nullable types (? and !), and format strings with $ and ${}.',
    simpleExplanation: `A **variable** is simply a labeled storage box in your computer's memory. You put a piece of data inside it, put a name on the box, and refer to that name whenever you need the data.

Dart is a **strongly typed** language, meaning every variable has a specific type:
- \`int\`: Whole numbers without decimals (e.g., \`42\`, \`-5\`, \`100\`).
- \`double\`: Numbers with decimal points (e.g., \`3.14\`, \`99.99\`, \`-0.5\`).
- \`String\`: Text surrounded by quotes (e.g., \`'Alice'\`, \`"Computer Science"\`).
- \`bool\`: True or false flags (e.g., \`true\`, \`false\`).

### Sound Null Safety (The Billion-Dollar Fix)
In older languages, variables could accidentally be \`null\` (meaning "empty" or "no value"), causing apps to crash with a dreaded NullPointerException.
In Dart:
- By default, variables **CANNOT be null**: \`String name = 'Alice';\` (trying to set \`name = null\` is a compile-time error!).
- If you WANT a variable to allow null, you explicitly add a question mark \`?\`: \`String? middleName = null;\`
- To tell Dart "I guarantee this variable is not null right now", use the exclamation mark \`!\`: \`print(middleName!.length);\`

### String Interpolation
To insert variables or math inside a String, use \`$variableName\` or \`\${expression}\`:
\`\`\`dart
int marks = 85;
print('Your score is $marks out of 100!');
print('Next year score will be \${marks + 5}');
\`\`\``,
    analogy: `Think of variables like storage jars in your kitchen:
- A jar labeled \`Sugar\` (non-nullable) must always have sugar inside. It can never be empty.
- A jar labeled \`Cookies?\` (nullable with a question mark) is allowed to be empty on days you haven't baked.
- String interpolation is like a label maker that automatically prints whatever is inside the jar directly onto the label: "Welcome, $guestName!"`,
    codeSnippet: `void main() {
  // Primitive data types
  String studentName = 'Sarah Connor';
  int rollNumber = 101;
  double marks = 88.5;
  bool isPassed = marks >= 50.0;

  // Nullable variable (can hold null)
  String? remarks; // currently null
  print('Remarks initially: \$remarks');

  remarks = 'Outstanding performance!';

  // String interpolation with $ and \${}
  print('Student: \$studentName (Roll: \$rollNumber)');
  print('Marks: \$marks / 100.0 | Status: \${isPassed ? "PASSED" : "FAILED"}');
  print('Remarks: \${remarks.toUpperCase()}');
}`,
    dartPadCode: `void main() {
  String studentName = 'Sarah Connor';
  int rollNumber = 101;
  double marks = 88.5;
  bool isPassed = marks >= 50.0;

  String? remarks = 'Outstanding performance!';

  print('=== Student Report Card ===');
  print('Name: \$studentName');
  print('Roll Number: \$rollNumber');
  print('Marks: \$marks / 100.0');
  print('Result: \${isPassed ? "PASS" : "FAIL"}');
  print('Remarks: \${remarks.toUpperCase()}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Declaring variables with explicit types',
        description: 'Writing "String studentName" tells Dart that only textual values can ever be assigned to studentName.'
      },
      {
        step: 2,
        title: 'Understanding var vs final vs const',
        description: '"var" lets Dart infer the type automatically. "final" can only be set once at runtime. "const" is a compile-time constant.'
      },
      {
        step: 3,
        title: 'Nullable types with ?',
        description: 'String? means the value can either be a valid String or null. Dart forces you to check before accessing its properties.'
      },
      {
        step: 4,
        title: 'String interpolation ($ and ${})',
        description: 'Use $variable for single variables, and ${expression} when calling methods, properties, or math.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting curly braces in string interpolation: print("$student.name");',
        fix: 'Use print("${student.name}"); with curly braces when accessing properties or methods.',
        why: '$ without braces only evaluates the immediate word, printing the object instance followed by literal .name.'
      },
      {
        mistake: 'Using the null assertion operator (!) on a variable that might actually be null.',
        fix: 'Use null-aware operator (?.) or an if check: if (middleName != null) { ... } instead of blindly using middleName!.',
        why: 'Calling ! on a null value throws an unhandled runtime exception.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is Sound Null Safety in Dart?" — Answer: A language feature ensuring variables cannot be null unless explicitly declared with "?", eliminating null reference errors at compile time.',
      'Exam Alert: "What is the difference between const and final in Dart?" — Answer: const is evaluated at compile time (known before running); final is evaluated at runtime (once set, it cannot be reassigned).'
    ],
    practiceTask: {
      task: 'Declare variables for a product in an online store: productName (String), originalPrice (double), discountPercent (int = 20). Calculate the finalPrice and print: "Product: [name], Final Price: $[finalPrice]" using string interpolation.',
      hint: 'finalPrice = originalPrice - (originalPrice * discountPercent / 100);',
      solution: `void main() {
  String productName = 'Flutter Hoodie';
  double originalPrice = 50.0;
  int discountPercent = 20;

  double finalPrice = originalPrice - (originalPrice * discountPercent / 100);

  print('Product: \$productName, Final Price: \$\$finalPrice');
}`
    },
    quiz: [
      {
        id: 'q1-1-1',
        question: 'Which symbol makes a data type nullable in Dart?',
        options: ['!', '?', '#', '&'],
        correctIndex: 1,
        explanation: 'Adding ? to a type (like int? or String?) marks it as nullable, allowing it to hold either a value or null.'
      },
      {
        id: 'q1-1-2',
        question: 'What is the output of: int a = 10; print("Value is \${a * 2}");?',
        options: ['Value is ${a * 2}', 'Value is 10 * 2', 'Value is 20', 'Compilation error'],
        correctIndex: 2,
        explanation: 'String interpolation evaluates the expression inside ${} and converts the result (20) to a string.'
      },
      {
        id: 'q1-1-3',
        question: 'What is the key difference between final and const in Dart?',
        options: [
          'final variables can be changed anytime; const cannot',
          'const is a compile-time constant; final can be initialized at runtime (e.g. DateTime.now())',
          'const is only for numbers; final is for strings',
          'There is no difference'
        ],
        correctIndex: 1,
        explanation: 'const requires values known at compile time, whereas final variables can be calculated at runtime but cannot be reassigned.'
      },
      {
        id: 'q1-1-4',
        question: 'Which of the following will cause a compile-time error under Dart Null Safety?',
        options: [
          'String? name = null;',
          'int age = 25;',
          'String title = null;',
          'bool isReady = false;'
        ],
        correctIndex: 2,
        explanation: 'String is non-nullable. You cannot assign null to it without declaring it as String?.'
      },
      {
        id: 'q1-1-5',
        question: 'What does the null assertion operator "!" do in Dart?',
        options: [
          'Inverts a boolean value',
          'Tells the compiler to treat a nullable expression as non-null, throwing an exception if it is actually null',
          'Deletes the variable from memory',
          'Converts a string to lowercase'
        ],
        correctIndex: 1,
        explanation: 'The ! operator asserts that a nullable value is guaranteed to not be null at that exact moment.'
      }
    ]
  },
  {
    id: 'm1-l2',
    moduleId: 'module-1',
    title: 'Conditions (if/else, switch), Loops & Functions',
    description: 'Master control flow: if/else decision making, switch expressions, for/while loops, and clean reusable functions with named, positional, and optional parameters.',
    order: 2,
    durationMinutes: 15,
    difficulty: 'Beginner',
    prerequisites: ['Module 1 Lesson 1: Variables & Data Types'],
    lastVerified: 'November 2026',
    goal: 'Write decision-making logic with if/else and switch, repeat actions with loops, and write modular functions with required and optional parameters.',
    simpleExplanation: `Programs make decisions and repeat tasks.

### 1. Conditions: \`if\` / \`else\` and \`switch\`
Use \`if\` to execute code only when a condition is true:
\`\`\`dart
if (marks >= 90) {
  grade = 'A+';
} else if (marks >= 80) {
  grade = 'A';
} else {
  grade = 'B';
}
\`\`\`

Dart also has modern pattern-matching **switch expressions**:
\`\`\`dart
String statusMessage = switch (statusCode) {
  200 => 'Success',
  404 => 'Not Found',
  500 => 'Server Error',
  _ => 'Unknown'
};
\`\`\`

### 2. Loops: \`for\`, \`for-in\`, and \`while\`
- \`for (int i = 0; i < 5; i++)\`: when you know the exact iteration count.
- \`for (var item in list)\`: clean loop through every element in a list.
- \`while (condition)\`: repeats as long as the condition remains true.

### 3. Functions
Functions group reusable instructions together. Dart supports:
- **Positional parameters:** \`double add(double a, double b) => a + b;\`
- **Named parameters (with curly braces \`{}\`):**
  \`\`\`dart
  void printStudent({required String name, int rollNumber = 0}) { ... }
  // Call with parameter names:
  printStudent(name: 'Sarah', rollNumber: 101);
  \`\`\`
  Named parameters are used EVERYWHERE in Flutter widget constructors!`,
    analogy: `Think of functions like a kitchen blender:
You drop ingredients into the lid (parameters), press the button (function execution), and pour out a delicious smoothie (return value).
Named parameters are like buttons clearly labeled: \`blend(speed: 3, timerSeconds: 30)\`. You never accidentally mix up which button is which!`,
    codeSnippet: `// 1. Grade calculation function using if-else (EXAM FAVORITE!)
String calculateGrade(double marks) {
  if (marks < 0 || marks > 100) {
    return 'Invalid Marks';
  } else if (marks >= 90) {
    return 'A+';
  } else if (marks >= 80) {
    return 'A';
  } else if (marks >= 70) {
    return 'B';
  } else if (marks >= 60) {
    return 'C';
  } else if (marks >= 50) {
    return 'D';
  } else {
    return 'F';
  }
}

// 2. Named parameters function (Flutter style)
void displayStudentInfo({
  required String name,
  required int rollNumber,
  required double marks,
}) {
  String grade = calculateGrade(marks);
  print('Student: \$name | Roll: \$rollNumber | Marks: \$marks | Grade: \$grade');
}

void main() {
  displayStudentInfo(name: 'Rahul Sharma', rollNumber: 45, marks: 92.5);
  displayStudentInfo(name: 'Priya Patel', rollNumber: 46, marks: 74.0);
}`,
    dartPadCode: `String calculateGrade(double marks) {
  if (marks < 0 || marks > 100) return 'Invalid';
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  return 'F';
}

void main() {
  List<double> examScores = [95, 82, 67, 45, 105];

  for (double score in examScores) {
    String grade = calculateGrade(score);
    print('Score: \$score -> Grade: \$grade');
  }
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Input validation condition (boundary checking)',
        description: 'Always check if marks < 0 || marks > 100 first to immediately reject invalid data.'
      },
      {
        step: 2,
        title: 'Ordered if-else cascade',
        description: 'Testing highest bounds first (>= 90, then >= 80) guarantees clean, mutually exclusive evaluation.'
      },
      {
        step: 3,
        title: 'Named parameters with "required"',
        description: 'Using curly braces {} marks parameters as named. Adding the "required" keyword prevents callers from omitting them.'
      },
      {
        step: 4,
        title: 'Arrow syntax (=>)',
        description: 'For functions containing only a single expression return, you can use "=>" instead of curly braces.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Checking lower boundary conditions in the wrong order: if (marks >= 50) return "D"; else if (marks >= 90) return "A+";',
        fix: 'Always test from the highest threshold down (90, then 80, then 70...) or use ranges (marks >= 80 && marks < 90).',
        why: 'If you check >= 50 first, a score of 95 will match >= 50 and immediately return "D"!'
      },
      {
        mistake: 'Forgetting "required" on named parameters that cannot be null.',
        fix: 'Add the "required" keyword: void foo({required String name}) { ... } or provide a default value.',
        why: 'Without required or a default value, named parameters default to null, causing compile errors on non-nullable types.'
      }
    ],
    examAlerts: [
      'Exam Alert (Extremely Frequent): Write a function or logic to take marks (0-100) and display Grade: 90+ = A+, 80-89 = A, 70-79 = B, 60-69 = C, 50-59 = D, below 50 = F.',
      'Exam Alert: "Why does Flutter use named parameters in almost all widget constructors?" — Answer: Widgets have dozens of properties; named parameters make code self-documenting, readable, and allow passing arguments in any order.'
    ],
    practiceTask: {
      task: 'Write a Dart function named "calculateDiscount" that accepts: originalPrice (double), discountPercent (double), and an optional couponCode (String?). If couponCode is "FESTIVAL10", subtract an extra 10 dollars from the bill. Return the final price.',
      hint: 'Use named parameters: double calculateDiscount({required double originalPrice, required double discountPercent, String? couponCode})',
      solution: `double calculateDiscount({
  required double originalPrice,
  required double discountPercent,
  String? couponCode,
}) {
  double discountAmount = (originalPrice * discountPercent) / 100.0;
  double priceAfterDiscount = originalPrice - discountAmount;

  if (couponCode == 'FESTIVAL10') {
    priceAfterDiscount -= 10.0;
  }

  // Ensure price never drops below 0
  return priceAfterDiscount < 0 ? 0.0 : priceAfterDiscount;
}

void main() {
  print(calculateDiscount(originalPrice: 100, discountPercent: 20, couponCode: 'FESTIVAL10')); // 70.0
}`
    },
    quiz: [
      {
        id: 'q1-2-1',
        question: 'What is the primary benefit of named parameters in Dart functions?',
        options: [
          'They execute 10x faster',
          'They make function calls explicit, self-documenting, and allow passing arguments in any order',
          'They allow functions to return multiple values without tuples',
          'They only work with numbers'
        ],
        correctIndex: 1,
        explanation: 'Named parameters (defined with {}) improve readability and prevent mistakes with argument ordering.'
      },
      {
        id: 'q1-2-2',
        question: 'Which loop is the cleanest for iterating over every item in a List?',
        options: ['for-in loop (for (var item in list))', 'do-while loop', 'goto loop', 'switch loop'],
        correctIndex: 0,
        explanation: 'The for-in loop is standard and concise for visiting each element of an iterable collection.'
      },
      {
        id: 'q1-2-3',
        question: 'What does the "required" keyword mean in a named parameter definition?',
        options: [
          'The parameter must be an integer',
          'The caller must provide an argument for this parameter when invoking the function',
          'The parameter cannot be printed',
          'The parameter is stored in the database'
        ],
        correctIndex: 1,
        explanation: 'The "required" modifier tells Dart that callers are strictly required to pass a value for that parameter.'
      },
      {
        id: 'q1-2-4',
        question: 'What does arrow syntax (=>) represent in Dart?',
        options: [
          'A pointer to native memory',
          'A shorthand notation for a function containing a single return expression',
          'An asynchronous channel',
          'A comparison operator'
        ],
        correctIndex: 1,
        explanation: 'Arrow syntax (=> expr) is syntactic shorthand for { return expr; }.'
      },
      {
        id: 'q1-2-5',
        question: 'In a grade calculation system, why must input validation check "marks < 0 || marks > 100" first?',
        options: [
          'Because negative numbers cause compiler crashes',
          'To ensure numbers outside the valid 0 to 100 range are caught before returning a false grade',
          'It is not necessary',
          'Dart does not support marks over 100'
        ],
        correctIndex: 1,
        explanation: 'Boundary checks protect business logic from corrupt or invalid data such as -10 or 999.'
      }
    ]
  },
  {
    id: 'm1-l3',
    moduleId: 'module-1',
    title: 'Lists, Sets, Maps & Collection Methods',
    description: 'Master Dart core collections: ordered Lists, unique Sets, key-value Maps, and powerful functional transformations (map, where, reduce, fold, any, every).',
    order: 3,
    durationMinutes: 14,
    difficulty: 'Beginner',
    prerequisites: ['Module 1 Lesson 2: Conditions, Loops & Functions'],
    lastVerified: 'November 2026',
    goal: 'Store and manipulate collections of data, search items, filter results with where(), transform data with map(), and prepare data for Flutter ListView widgets.',
    simpleExplanation: `Almost every app displays lists of items (contacts, products, chat messages, student records). Dart has three primary collection types:

1. **\`List<T>\` (Ordered Collection):**
   An ordered array of items indexed from 0. Duplicates are allowed.
   \`\`\`dart
   List<String> courses = ['Mobile App Dev', 'Cloud Computing', 'UI/UX Design'];
   print(courses[0]); // 'Mobile App Dev'
   \`\`\`

2. **\`Set<T>\` (Unique Collection):**
   An unordered collection where **duplicates are strictly forbidden**. Perfect for tracking unique student IDs or tags.
   \`\`\`dart
   Set<int> uniqueRolls = {101, 102, 101}; // Contains only {101, 102}
   \`\`\`

3. **\`Map<K, V>\` (Key-Value Dictionary):**
   Pairs of keys and values. Keys must be unique.
   \`\`\`dart
   Map<String, dynamic> student = {
     'name': 'Sarah',
     'roll': 101,
     'marks': 92.5,
   };
   print(student['name']); // 'Sarah'
   \`\`\`

### Powerful Collection Methods
Instead of writing clumsy for-loops, Dart provides modern functional methods:
- **\`.where((item) => ...)\`:** Filters items (like SQL \`WHERE\`).
- **\`.map((item) => ...)\`:** Transforms each item into something new (e.g. converting a list of student names into Flutter Text widgets!).
- **\`.any((item) => ...)\`:** Returns true if at least one item matches.
- **\`.reduce() / .fold()\`:** Combines all items into a single accumulated result (e.g. calculating total bill sum).`,
    analogy: `Think of these collections like everyday organizers:
- **List:** A lined notepad where you write your shopping list in order (item #0, item #1...).
- **Set:** A club VIP guest list where a person's name can only appear once, no matter how many times they RSVP.
- **Map:** A real physical dictionary where you look up a word (the key) to find its definition (the value).`,
    codeSnippet: `void main() {
  // List of student maps
  List<Map<String, dynamic>> students = [
    {'name': 'Aarav', 'roll': 1, 'marks': 92, 'course': 'Flutter'},
    {'name': 'Diya', 'roll': 2, 'marks': 78, 'course': 'Android'},
    {'name': 'Kabir', 'roll': 3, 'marks': 45, 'course': 'Flutter'},
    {'name': 'Ananya', 'roll': 4, 'marks': 88, 'course': 'Flutter'},
  ];

  // 1. Filter: find students who passed (marks >= 50)
  var passedStudents = students.where((s) => s['marks'] >= 50).toList();
  print('Passed count: \${passedStudents.length}');

  // 2. Transform: get just student names in uppercase
  var names = students.map((s) => (s['name'] as String).toUpperCase()).toList();
  print('Names: \$names');

  // 3. Filter by course
  var flutterStudents = students.where((s) => s['course'] == 'Flutter').toList();
  print('Flutter students count: \${flutterStudents.length}');

  // 4. Calculate class average marks using fold
  double totalMarks = students.fold(0.0, (sum, s) => sum + s['marks']);
  double averageMarks = totalMarks / students.length;
  print('Class Average: \$averageMarks');
}`,
    dartPadCode: `void main() {
  List<double> bills = [120.0, 45.5, 300.0, 89.9];

  // Filter bills over 100
  var largeBills = bills.where((b) => b > 100).toList();
  print('Bills over \$100: \$largeBills');

  // Apply 10% discount to all bills
  var discountedBills = bills.map((b) => b * 0.90).toList();
  print('Discounted: \$discountedBills');

  // Sum all bills
  double total = bills.reduce((sum, element) => sum + element);
  print('Total Sum: \$\$total');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Declaring typed collections',
        description: 'Always specify generic types (e.g., List<String>, Map<String, dynamic>) for compile-time safety.'
      },
      {
        step: 2,
        title: 'where() returns an Iterable',
        description: 'where() does not modify the original list. It returns a lazy Iterable. Use .toList() to convert it back into a List.'
      },
      {
        step: 3,
        title: 'map() transformations',
        description: 'In Flutter, list.map((item) => Text(item)).toList() is the fundamental pattern to turn data into widgets!'
      },
      {
        step: 4,
        title: 'fold() vs reduce()',
        description: 'reduce() requires all elements to be the same type and crashes on empty lists. fold() lets you specify an initial starting value.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting .toList() after .map() or .where().',
        fix: 'var result = list.where(...).toList();',
        why: 'where() and map() return an Iterable<T>. Many Flutter widgets (like Column(children: ...)) require an exact List<Widget>.'
      },
      {
        mistake: 'Index out of bounds crash: list[list.length].',
        fix: 'Remember lists are 0-indexed; the last element is at index list.length - 1, or use list.last.',
        why: 'In a list of 5 elements, valid indexes are 0, 1, 2, 3, 4. Accessing index 5 causes a RangeError.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between a List and a Set in Dart?" — Answer: A List is an ordered collection that allows duplicates; a Set is an unordered collection of unique elements with no duplicates allowed.',
      'Exam Alert: "How do you filter elements in a Dart List?" — Answer: Using the .where((element) => condition) method, followed by .toList().'
    ],
    practiceTask: {
      task: 'Given a List of scores: [45, 92, 85, 33, 76, 50, 99], write code to: (1) filter all passing scores (>= 50), (2) sort them in descending order, and (3) print the highest score.',
      hint: 'Use .where(), .sort(), and .first.',
      solution: `void main() {
  List<int> scores = [45, 92, 85, 33, 76, 50, 99];

  var passing = scores.where((s) => s >= 50).toList();
  passing.sort((a, b) => b.compareTo(a)); // descending

  print('Passing scores (descending): \$passing');
  print('Highest score: \${passing.first}');
}`
    },
    quiz: [
      {
        id: 'q1-3-1',
        question: 'What happens if you try to add a duplicate item into a Set in Dart?',
        options: [
          'It throws a DuplicateItemException',
          'The item is ignored and the Set remains unchanged',
          'It replaces all other items',
          'It clears the Set'
        ],
        correctIndex: 1,
        explanation: 'Sets only store unique elements. Adding an element already present in the Set is safely ignored.'
      },
      {
        id: 'q1-3-2',
        question: 'What method is used to transform elements of a list into another type or format in Dart?',
        options: ['.filter()', '.transform()', '.map()', '.convert()'],
        correctIndex: 2,
        explanation: '.map((element) => ...) transforms every item according to the provided function.'
      },
      {
        id: 'q1-3-3',
        question: 'How do you look up a value corresponding to a key in a Map?',
        options: ['map.get("key")', 'map["key"]', 'map.lookup("key")', 'map->key'],
        correctIndex: 1,
        explanation: 'Dart uses subscript notation map[key] to access values in a Map.'
      },
      {
        id: 'q1-3-4',
        question: 'What is the index of the first element in a Dart List?',
        options: ['1', '0', '-1', 'first'],
        correctIndex: 1,
        explanation: 'Dart Lists are zero-indexed, meaning the first element is always at index 0.'
      },
      {
        id: 'q1-3-5',
        question: 'What does .where((x) => x > 10) do when called on a List?',
        options: [
          'Deletes all numbers less than 10 permanently from the disk',
          'Returns an iterable containing only items greater than 10',
          'Counts how many items are equal to 10',
          'Sorts the list'
        ],
        correctIndex: 1,
        explanation: '.where() filters items according to the boolean predicate.'
      }
    ]
  },
  {
    id: 'm1-l4',
    moduleId: 'module-1',
    title: 'Object-Oriented Programming (OOP) in Dart',
    description: 'Learn classes, constructors, named constructors, inheritance, abstract classes, mixins, interfaces, and enums from the ground up.',
    order: 4,
    durationMinutes: 16,
    difficulty: 'Beginner',
    prerequisites: ['Module 1 Lesson 3: Collections'],
    lastVerified: 'November 2026',
    goal: 'Model real-world entities into Dart classes, use constructors (including const constructors), inherit properties with extends, use mixins with "with", and create type-safe enums.',
    simpleExplanation: `**Object-Oriented Programming (OOP)** is a way of organizing code by modeling real-world objects.

### 1. Classes and Objects
A **class** is a blueprint (like an architectural drawing of a house). An **object** is the actual house built from that blueprint.

\`\`\`dart
class Student {
  final String name;
  final int rollNumber;
  final double marks;

  // Constructor with initializing formals (super concise in Dart!)
  Student({
    required this.name,
    required this.rollNumber,
    required this.marks,
  });

  // Method
  String get grade {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 50) return 'Pass';
    return 'Fail';
  }
}
\`\`\`

### 2. Named Constructors
Dart doesn't support multiple constructors with the same name, so it provides **Named Constructors**:
\`\`\`dart
// Factory or named constructor from JSON:
Student.fromMap(Map<String, dynamic> map)
    : name = map['name'],
      rollNumber = map['roll'],
      marks = (map['marks'] as num).toDouble();
\`\`\`

### 3. Enums
Enums represent a fixed set of constant options (e.g., student course selection):
\`\`\`dart
enum Course { flutter, android, cloud, web }
\`\`\`

### 4. Inheritance (\`extends\`) and Mixins (\`with\`)
- \`extends\`: Inherit properties and methods from a parent class.
- \`abstract class\`: Defines a contract that subclasses must implement.
- \`mixin\`: Adds reusable functionality across multiple classes without multi-inheritance (\`class Bird extends Animal with Flying\`).`,
    analogy: `Think of a cookie cutter and cookies:
- **Class:** The steel cookie cutter (blueprint).
- **Object:** The delicious chocolate chip cookie you just baked (the instance).
- **Enums:** The fixed set of available cookie flavors: ChocolateChip, Oatmeal, or PeanutButter.
- **Mixins:** Sprinkles that you can shake on top of any cookie, ice cream, or cake regardless of what dough it was made from!`,
    codeSnippet: `enum Course { flutter, android, cloudDevOps }

// The Student Model (Used directly in our Exam Project!)
class Student {
  final String name;
  final String rollNumber;
  final double marks;
  final Course course;

  const Student({
    required this.name,
    required this.rollNumber,
    required this.marks,
    required this.course,
  });

  // Calculate grade based on marks
  String get grade {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }

  bool get isPassed => marks >= 50.0;
}

void main() {
  const student1 = Student(
    name: 'Neha Gupta',
    rollNumber: 'CS-2026-01',
    marks: 84.5,
    course: Course.flutter,
  );

  print('Student: \${student1.name}');
  print('Course: \${student1.course.name}');
  print('Grade: \${student1.grade} (Passed: \${student1.isPassed})');
}`,
    dartPadCode: `enum Course { flutter, android, python }

class Student {
  final String name;
  final int roll;
  final double marks;
  final Course course;

  const Student({
    required this.name,
    required this.roll,
    required this.marks,
    required this.course,
  });

  String get grade {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }
}

void main() {
  var s = Student(
    name: 'Rohan',
    roll: 101,
    marks: 93.0,
    course: Course.flutter,
  );

  print('\${s.name} enrolled in \${s.course.name.toUpperCase()} scored \${s.marks} and received Grade \${s.grade}!');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Class fields with "final"',
        description: 'Marking fields as "final" makes instances immutable. Immutable objects prevent accidental bugs and optimize Flutter widget rebuilds.'
      },
      {
        step: 2,
        title: 'const Constructor',
        description: 'If all fields in a class are final, you can declare a const constructor. Flutter can then reuse that exact memory instance.'
      },
      {
        step: 3,
        title: 'Getters ("get")',
        description: '"String get grade" looks like a property from the outside, but runs a computation dynamically whenever accessed.'
      },
      {
        step: 4,
        title: 'Type-safe enums',
        description: 'Using Course.flutter instead of raw strings like "flutter" prevents typos and makes switch statements exhaustive.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Re-assigning values to fields marked as "final".',
        fix: 'If a value needs to change, either do not mark it final or create a copyWith() method to produce a new updated instance.',
        why: 'In Flutter, immutable data structures with copyWith() are industry best-practice for predictable state.'
      },
      {
        mistake: 'Using strings instead of enums for fixed categories.',
        fix: 'Use enum Course { flutter, android } instead of String course = "fluter"; (with typos).',
        why: 'Enums are checked at compile time, catching spelling mistakes before your app ever runs.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is a named constructor in Dart and why is it used?" — Answer: A constructor with an identifier (e.g. ClassName.identifier()) used to implement multiple constructors with clear semantic purposes (like fromJson or guest).',
      'Exam Alert: "What is the difference between an abstract class and a mixin?" — Answer: An abstract class provides an interface or base class for single inheritance via extends; a mixin is reusable behavior applied to multiple class hierarchies using the "with" keyword without forming a parent-child relationship.'
    ],
    practiceTask: {
      task: 'Create a Dart class "DiscountBill" with fields: originalAmount (double) and discountRate (double). Add a getter "discountAmount" and a getter "finalPayable". Write a main() method to test it.',
      hint: 'discountAmount => (originalAmount * discountRate) / 100;',
      solution: `class DiscountBill {
  final double originalAmount;
  final double discountRate;

  const DiscountBill({
    required this.originalAmount,
    required this.discountRate,
  });

  double get discountAmount => (originalAmount * discountRate) / 100.0;
  double get finalPayable => originalAmount - discountAmount;
}

void main() {
  const bill = DiscountBill(originalAmount: 250.0, discountRate: 15.0);
  print('Original: \$\$250.0');
  print('Discount: \$\${bill.discountAmount}');
  print('Payable: \$\${bill.finalPayable}');
}`
    },
    quiz: [
      {
        id: 'q1-4-1',
        question: 'How do you define a constructor that initializes fields directly in Dart?',
        options: [
          'MyClass(String name) { this.name = name; }',
          'MyClass({required this.name});',
          'constructor(name) => this.name;',
          'def __init__(self, name):'
        ],
        correctIndex: 1,
        explanation: 'Dart supports "initializing formals" syntax: this.name directly assigns the passed argument to the instance field.'
      },
      {
        id: 'q1-4-2',
        question: 'Which keyword is used to incorporate a mixin into a class?',
        options: ['extends', 'implements', 'with', 'using'],
        correctIndex: 2,
        explanation: 'The "with" keyword applies one or more mixins to a class.'
      },
      {
        id: 'q1-4-3',
        question: 'What is the purpose of declaring a constructor as "const"?',
        options: [
          'It makes the constructor private',
          'It allows creating compile-time constant instances, saving memory and avoiding widget rebuilds',
          'It prevents other classes from extending it',
          'It automatically saves instances to SQLite'
        ],
        correctIndex: 1,
        explanation: 'const constructors allow Dart to canonicalize instances in memory, reusing identical instances across the widget tree.'
      },
      {
        id: 'q1-4-4',
        question: 'Can you instantiate an abstract class directly using "new AbstractClass()"?',
        options: [
          'Yes, anytime',
          'No, abstract classes cannot be directly instantiated; they must be extended or implemented',
          'Only in release mode',
          'Only if it has no methods'
        ],
        correctIndex: 1,
        explanation: 'Abstract classes are incomplete templates and cannot be constructed directly.'
      },
      {
        id: 'q1-4-5',
        question: 'What does an enum represent in Dart?',
        options: [
          'A floating-point calculation',
          'A special class representing a fixed set of discrete constant values',
          'A network error code',
          'A database table'
        ],
        correctIndex: 1,
        explanation: 'Enums provide type-safe constants for states, options, or categories.'
      }
    ]
  },
  {
    id: 'm1-l5',
    moduleId: 'module-1',
    title: 'Async Dart: Futures, async/await & Streams',
    description: 'Master asynchronous programming in Dart: how single-threaded event loops work, handling network latency with Future and async/await, and real-time data with Streams.',
    order: 5,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 1 Lesson 4: OOP in Dart'],
    lastVerified: 'November 2026',
    goal: 'Understand the Dart Event Loop, fetch data asynchronously without freezing the UI, handle errors with try/catch, and listen to real-time Streams.',
    simpleExplanation: `Dart code runs in a **single thread** with an **Event Loop**. This means your UI will never lag as long as you do not perform heavy blocking operations on the main thread.

When fetching data from a database, file, or web API, the result is not available instantly. Instead of freezing the screen, Dart gives you a **\`Future\`**.

### 1. What is a \`Future\`?
A \`Future<T>\` represents a promise that a value of type \`T\` will arrive in the future (or an error if something went wrong).

### 2. \`async\` and \`await\`
Instead of messy callbacks, Dart lets you write asynchronous code that reads like normal synchronous code using \`async\` and \`await\`:
\`\`\`dart
Future<String> fetchStudentData() async {
  // Simulates a 2-second network request
  await Future.delayed(const Duration(seconds: 2));
  return 'Student Record: Alex, Marks: 95';
}

void loadData() async {
  try {
    print('Loading...');
    String result = await fetchStudentData();
    print('Loaded: $result');
  } catch (error) {
    print('Something went wrong: $error');
  }
}
\`\`\`

### 3. What is a \`Stream\`?
While a \`Future\` delivers **one single result** once, a **\`Stream\`** delivers a **continuous pipe of multiple values over time** (like WebSocket messages, location updates, or real-time Firestore database changes).`,
    analogy: `Think of food ordering:
- **Synchronous (Blocking):** You order at a coffee shop and stand in front of the cashier staring at them for 10 minutes until they make your latte. Nobody else can order!
- **Future with async/await:** You order, the cashier hands you a vibrating buzzer (the Future), and you sit down to read. When the coffee is ready, the buzzer vibrates (await), and you pick it up.
- **Stream:** A conveyor belt at a sushi restaurant. Plates of sushi keep arriving one after another over time. You listen to the belt and pick plates as they arrive.`,
    codeSnippet: `// Simulating an asynchronous database fetch
Future<Map<String, dynamic>> getStudentFromDb(int rollNumber) async {
  print('Fetching student #\$rollNumber from server...');
  
  // Wait 1.5 seconds without freezing the app
  await Future.delayed(const Duration(milliseconds: 1500));

  if (rollNumber <= 0) {
    throw Exception('Invalid roll number: must be greater than zero.');
  }

  return {
    'name': 'Sophia Loren',
    'roll': rollNumber,
    'marks': 91.5,
    'grade': 'A+',
  };
}

void main() async {
  print('App started.');

  try {
    var student = await getStudentFromDb(101);
    print('Fetch successful: \${student['name']} scored \${student['marks']}');
  } catch (e) {
    print('Error occurred: \$e');
  } finally {
    print('Fetch operation complete.');
  }
}`,
    dartPadCode: `void main() async {
  print('1. Ordering food...');
  
  String order = await prepareBurger();
  print('3. Picked up: \$order');
}

Future<String> prepareBurger() async {
  await Future.delayed(Duration(seconds: 1));
  print('2. Burger is grilled and packed!');
  return 'Delicious Cheeseburger 🍔';
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Marking a function "async"',
        description: 'Any function that uses the "await" keyword must be marked with the "async" modifier and return a Future.'
      },
      {
        step: 2,
        title: 'The "await" keyword',
        description: '"await" pauses the execution of this specific function until the Future completes, while allowing the rest of the app to stay responsive.'
      },
      {
        step: 3,
        title: 'Error handling with try/catch',
        description: 'Always wrap asynchronous calls in try-catch blocks to catch network drops, timeout errors, or server failures.'
      },
      {
        step: 4,
        title: 'The "finally" block',
        description: 'Code inside finally always runs, whether the Future succeeded or failed (ideal for hiding loading spinners).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting "await" before a Future call: String data = fetchData();',
        fix: 'String data = await fetchData(); (inside an async function).',
        why: 'Without await, "data" becomes an incomplete Instance of Future<String> rather than the actual string value.'
      },
      {
        mistake: 'Putting long CPU calculations directly on the main event loop.',
        fix: 'For heavy calculations (like parsing 50,000 JSON records), use Isolate.run() to run on a background thread.',
        why: 'Blocking the main thread stops UI frame rendering, causing visible screen jank.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between a Future and a Stream in Dart?" — Answer: A Future delivers a single value or error asynchronously once; a Stream delivers zero or more values or errors over time.',
      'Exam Alert: "How do you handle exceptions in async/await code?" — Answer: Using standard try { await ... } catch (e) { ... } blocks.'
    ],
    practiceTask: {
      task: 'Write an asynchronous function "fetchDiscountRate()" that waits 1 second and returns 15.0. In main(), call it with await, calculate the discount for a $200 purchase, and print the result.',
      hint: 'Future<double> fetchDiscountRate() async { await Future.delayed(...); return 15.0; }',
      solution: `Future<double> fetchDiscountRate() async {
  await Future.delayed(const Duration(seconds: 1));
  return 15.0;
}

void main() async {
  double rate = await fetchDiscountRate();
  double original = 200.0;
  double discount = (original * rate) / 100.0;
  print('Discount Rate: \$rate%');
  print('Discount on \$\$original: \$\$discount');
  print('Final Total: \$\${original - discount}');
}`
    },
    quiz: [
      {
        id: 'q1-5-1',
        question: 'What return type must an async function have in Dart?',
        options: ['void or Future<T>', 'int', 'String only', 'Thread'],
        correctIndex: 0,
        explanation: 'Functions marked with async automatically wrap their return values into a Future<T> (or Future<void> / void).'
      },
      {
        id: 'q1-5-2',
        question: 'What happens to the mobile screen when you "await" a 3-second network request in Flutter?',
        options: [
          'The whole phone screen freezes and stops responding to touch',
          'The app crashes with an ANR (Application Not Responding)',
          'The UI remains completely responsive and interactive at 60fps while the background Future waits',
          'The phone reboots'
        ],
        correctIndex: 2,
        explanation: 'await yields control back to the event loop so frame rendering, button taps, and animations continue smoothly.'
      },
      {
        id: 'q1-5-3',
        question: 'Which Dart feature represents a continuous pipe of values delivered over time?',
        options: ['Future', 'Stream', 'Isolate', 'Iterator'],
        correctIndex: 1,
        explanation: 'A Stream provides an asynchronous sequence of data events over time.'
      },
      {
        id: 'q1-5-4',
        question: 'How do you catch an error thrown inside an async function using await?',
        options: ['using try-catch block', 'using onError() callback only', 'using an if-else check', 'errors cannot be caught'],
        correctIndex: 0,
        explanation: 'async/await allows idiomatic try-catch-finally syntax for handling asynchronous exceptions.'
      },
      {
        id: 'q1-5-5',
        question: 'What does the Dart Event Loop do?',
        options: [
          'It compiles code into C++',
          'It continuously processes events (taps, timers, I/O responses) from the event queue one by one',
          'It deletes unused variables',
          'It tests internet bandwidth'
        ],
        correctIndex: 1,
        explanation: 'The event loop continuously takes events from microtask and event queues and executes their handler code.'
      }
    ]
  },
  {
    id: 'm1-l6',
    moduleId: 'module-1',
    title: 'Generics, Extensions, Packages & Imports',
    description: 'Level up your Dart skills: create type-safe Generic classes and functions, extend existing types with extension methods, and import packages from pub.dev.',
    order: 6,
    durationMinutes: 12,
    difficulty: 'Intermediate',
    prerequisites: ['Module 1 Lesson 5: Async Dart'],
    lastVerified: 'November 2026',
    goal: 'Write generic functions, add custom utility methods to String or int using extension methods, and understand import directives (as, show, hide).',
    simpleExplanation: `### 1. Generics (\`<T>\`)
Generics allow you to write reusable code that works with **any data type** while maintaining 100% type safety.
You already use generics when writing \`List<String>\` or \`Map<String, int>\`.
\`\`\`dart
class ApiResponse<T> {
  final T? data;
  final String? errorMessage;
  final bool isSuccess;

  ApiResponse.success(this.data) : isSuccess = true, errorMessage = null;
  ApiResponse.error(this.errorMessage) : isSuccess = false, data = null;
}
\`\`\`

### 2. Extension Methods
Extensions allow you to add new methods to existing types (even built-in ones like \`String\`, \`DateTime\`, or \`double\`) without modifying their original source code!
\`\`\`dart
extension StringExtensions on String {
  // Check if string is a valid email
  bool get isValidEmail => contains('@') && contains('.');

  // Capitalize first letter
  String capitalize() => isEmpty ? '' : '\${this[0].toUpperCase()}\${substring(1)}';
}

// Usage:
print('alex@test.com'.isValidEmail); // true!
print('flutter'.capitalize()); // 'Flutter'!
\`\`\`

### 3. Imports and Packages
- \`import 'package:flutter/material.dart';\`
- \`import 'dart:math' as math;\` (alias prefix to avoid name clashes)
- \`import 'services.dart' show AuthService;\` (only import specific class)`,
    analogy: `Think of generics like a universal phone holder in your car:
It securely holds an iPhone, an Android phone, or a GPS unit without having to buy a different car mount for every model.
Extension methods are like snapping a kickstand onto your existing phone case: you didn't have to redesign the phone from scratch, but now it has a handy new superpower!`,
    codeSnippet: `// 1. Generic function to find the maximum in any comparable list
T findMax<T extends Comparable>(List<T> items) {
  if (items.isEmpty) throw Exception('List is empty');
  T maxItem = items.first;
  for (var item in items) {
    if (item.compareTo(maxItem) > 0) {
      maxItem = item;
    }
  }
  return maxItem;
}

// 2. Extension method on double to format as currency
extension CurrencyFormatter on double {
  String toCurrency() => '\$\${toStringAsFixed(2)}';
}

void main() {
  // Using generic function with integers
  print('Max score: \${findMax<int>([45, 92, 78, 99, 61])}');

  // Using generic function with strings
  print('Alphabetically last: \${findMax<String>(["Apple", "Zebra", "Mango"])}');

  // Using custom extension method
  double price = 49.9;
  print('Formatted price: \${price.toCurrency()}'); // $49.90
}`,
    dartPadCode: `extension MarkValidator on double {
  bool get isValidMark => this >= 0.0 && this <= 100.0;
  String get toPercentageString => '\${toStringAsFixed(1)}%';
}

void main() {
  double score = 88.543;
  print('Is valid: \${score.isValidMark}');
  print('Display: \${score.toPercentageString}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Declaring type parameter <T>',
        description: 'T is a placeholder convention representing Type. You can constrain it with extends (e.g. <T extends num>).'
      },
      {
        step: 2,
        title: 'Writing "extension on Type"',
        description: 'The keyword "on" specifies which target class is receiving the new extension capabilities.'
      },
      {
        step: 3,
        title: 'Using "this" inside extensions',
        description: '"this" refers to the specific instance of the object calling the extension method.'
      },
      {
        step: 4,
        title: 'Import prefixes with "as"',
        description: 'Use "import ... as prefix" when two libraries export a class with the exact same name.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Declaring List<dynamic> everywhere instead of specific Generics.',
        fix: 'Always use concrete generic types like List<Student> or List<String>.',
        why: 'dynamic disables compile-time type checking, letting typos cause crashes at runtime.'
      },
      {
        mistake: 'Putting heavy business logic or hidden mutable state inside extension methods.',
        fix: 'Keep extensions focused on lightweight formatting, validation, and conversion utilities.',
        why: 'Extensions do not add new storage fields to classes; they only provide syntactic helper methods.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What are extension methods in Dart?" — Answer: A feature allowing developers to add new methods, getters, and operators to existing classes and libraries without subclassing or modifying the original source.',
      'Exam Alert: "What is the purpose of generics in Dart?" — Answer: To write flexible, reusable code while preserving strict compile-time type safety.'
    ],
    practiceTask: {
      task: 'Create an extension on int named "DiscountMultiplier" that adds a method "applyDiscount(double amount)" which returns the amount after subtracting this integer as a percentage discount.',
      hint: 'extension DiscountMultiplier on int { double applyDiscount(double amount) => amount - (amount * this / 100); }',
      solution: `extension DiscountMultiplier on int {
  double applyDiscount(double amount) {
    return amount - (amount * this / 100.0);
  }
}

void main() {
  int discountPercent = 20;
  double bill = 150.0;
  print('Payable: \$\${discountPercent.applyDiscount(bill)}'); // $120.0
}`
    },
    quiz: [
      {
        id: 'q1-6-1',
        question: 'What is the primary benefit of using Generics (<T>) in Dart?',
        options: [
          'It eliminates the need for functions',
          'It provides code reusability while retaining compile-time type safety',
          'It connects directly to Firebase',
          'It forces variables to be nullable'
        ],
        correctIndex: 1,
        explanation: 'Generics let you write a single implementation (like List<T>) that works safely across any designated type.'
      },
      {
        id: 'q1-6-2',
        question: 'Which keyword is used to add new methods to an existing class in Dart without subclassing?',
        options: ['augment', 'extension', 'expand', 'mixin'],
        correctIndex: 1,
        explanation: 'Dart uses the "extension ... on Type" syntax to define extension methods.'
      },
      {
        id: 'q1-6-3',
        question: 'What does "import \'package:http/http.dart\' as http;" do?',
        options: [
          'Downloads HTTP faster',
          'Imports the library and assigns an alias prefix "http", so functions are called via http.get()',
          'Hides all HTTP errors',
          'Creates a local web server'
        ],
        correctIndex: 1,
        explanation: 'The "as" keyword creates a namespace prefix, preventing symbol collisions.'
      },
      {
        id: 'q1-6-4',
        question: 'Which import keyword is used to import ONLY a specific class from a library file?',
        options: ['only', 'include', 'show', 'select'],
        correctIndex: 2,
        explanation: 'The "show" combinator imports only the specified symbols from the target library.'
      },
      {
        id: 'q1-6-5',
        question: 'Can extension methods store new instance variables (state) in an existing class?',
        options: [
          'Yes, as many variables as you want',
          'No, extension methods can only declare methods, getters, and setters, not new instance fields',
          'Only if the class is abstract',
          'Only in Flutter Web'
        ],
        correctIndex: 1,
        explanation: 'Extensions do not change the memory layout or allocate new fields in existing objects.'
      }
    ]
  }
];
