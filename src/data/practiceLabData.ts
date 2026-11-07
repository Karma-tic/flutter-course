import { DartProblemItem, FlashcardItem } from '../types';

export const dartPracticeProblems: DartProblemItem[] = [
  {
    id: 'dp-1',
    title: 'Calculate Student Grade from Marks',
    category: 'Conditions & Logic',
    difficulty: 'Beginner',
    description: 'Write a function "getGrade(double marks)" that returns "A+" for 90+, "A" for 80-89, "B" for 70-79, "C" for 60-69, "D" for 50-59, and "F" for below 50. Throw ArgumentError if marks < 0 or > 100.',
    starterCode: `String getGrade(double marks) {\n  // Your code here\n  return '';\n}`,
    solutionDart: `String getGrade(double marks) {
  if (marks < 0.0 || marks > 100.0) {
    throw ArgumentError('Marks must be between 0 and 100');
  }
  if (marks >= 90.0) return 'A+';
  if (marks >= 80.0) return 'A';
  if (marks >= 70.0) return 'B';
  if (marks >= 60.0) return 'C';
  if (marks >= 50.0) return 'D';
  return 'F';
}`,
    explanation: 'Evaluate boundary check first, then test descending thresholds from 90 downwards.',
  },
  {
    id: 'dp-2',
    title: 'Calculate Discounted Price and Savings',
    category: 'Commercial Logic',
    difficulty: 'Beginner',
    description: 'Write a function "calculateBill(double originalPrice, double discountPercent)" that returns a Map with {"savings": discountAmount, "payable": finalPrice}.',
    starterCode: `Map<String, double> calculateBill(double original, double discountPercent) {\n  // Your code here\n  return {};\n}`,
    solutionDart: `Map<String, double> calculateBill(double original, double discountPercent) {
  double savings = (original * discountPercent) / 100.0;
  double payable = original - savings;
  return {
    'savings': savings,
    'payable': payable < 0 ? 0.0 : payable,
  };
}`,
    explanation: 'Savings = (original * percent) / 100. Payable = original - savings.',
  },
  {
    id: 'dp-3',
    title: 'Reverse a String without Built-in Reverse',
    category: 'String Manipulation',
    difficulty: 'Beginner',
    description: 'Write a function "reverseString(String text)" that reverses the characters of a string manually without using .reversed.',
    starterCode: `String reverseString(String text) {\n  // Your code here\n  return '';\n}`,
    solutionDart: `String reverseString(String text) {
  String result = '';
  for (int i = text.length - 1; i >= 0; i--) {
    result += text[i];
  }
  return result;
}`,
    explanation: 'Iterate backwards from text.length - 1 down to 0 and append characters.',
  },
  {
    id: 'dp-4',
    title: 'Check for Palindrome',
    category: 'String Manipulation',
    difficulty: 'Beginner',
    description: 'Write a function "isPalindrome(String word)" that returns true if the word reads the same backwards and forwards (ignoring casing and spaces).',
    starterCode: `bool isPalindrome(String word) {\n  // Your code here\n  return false;\n}`,
    solutionDart: `bool isPalindrome(String word) {
  String clean = word.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
  String reversed = clean.split('').reversed.join('');
  return clean == reversed;
}`,
    explanation: 'Clean non-alphanumeric characters and compare with its reversed string.',
  },
  {
    id: 'dp-5',
    title: 'Find Maximum Number in a List',
    category: 'Lists & Math',
    difficulty: 'Beginner',
    description: 'Write a function "findMax(List<int> numbers)" that returns the largest number in the list without using the reduce method.',
    starterCode: `int findMax(List<int> numbers) {\n  // Your code here\n  return 0;\n}`,
    solutionDart: `int findMax(List<int> numbers) {
  if (numbers.isEmpty) throw ArgumentError('List cannot be empty');
  int maxVal = numbers[0];
  for (int num in numbers) {
    if (num > maxVal) {
      maxVal = num;
    }
  }
  return maxVal;
}`,
    explanation: 'Initialize max with the first item and update whenever a larger element is found.',
  },
  {
    id: 'dp-6',
    title: 'Filter Even Numbers from a List',
    category: 'Collections',
    difficulty: 'Beginner',
    description: 'Write a function "getEvenNumbers(List<int> numbers)" that returns only the even numbers.',
    starterCode: `List<int> getEvenNumbers(List<int> numbers) {\n  // Your code here\n  return [];\n}`,
    solutionDart: `List<int> getEvenNumbers(List<int> numbers) {
  return numbers.where((n) => n % 2 == 0).toList();
}`,
    explanation: 'Use .where((n) => n % 2 == 0) and convert the iterable to a list with .toList().',
  },
  {
    id: 'dp-7',
    title: 'Check Prime Number',
    category: 'Math & Algorithms',
    difficulty: 'Beginner',
    description: 'Write a function "isPrime(int n)" that returns true if n is a prime number (greater than 1 with no divisors other than 1 and itself).',
    starterCode: `bool isPrime(int n) {\n  // Your code here\n  return false;\n}`,
    solutionDart: `import 'dart:math';

bool isPrime(int n) {
  if (n <= 1) return false;
  for (int i = 2; i <= sqrt(n).toInt(); i++) {
    if (n % i == 0) return false;
  }
  return true;
}`,
    explanation: 'Numbers <= 1 are not prime. Test divisors up to sqrt(n).',
  },
  {
    id: 'dp-8',
    title: 'Fibonacci Series Generator',
    category: 'Recursion & Loops',
    difficulty: 'Intermediate',
    description: 'Write a function "generateFibonacci(int count)" that returns the first "count" terms of the Fibonacci sequence starting with [0, 1].',
    starterCode: `List<int> generateFibonacci(int count) {\n  // Your code here\n  return [];\n}`,
    solutionDart: `List<int> generateFibonacci(int count) {
  if (count <= 0) return [];
  if (count == 1) return [0];
  List<int> fib = [0, 1];
  while (fib.length < count) {
    fib.add(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
}`,
    explanation: 'Each term is the sum of the previous two terms.',
  },
  {
    id: 'dp-9',
    title: 'Count Vowels in a String',
    category: 'String Manipulation',
    difficulty: 'Beginner',
    description: 'Write a function "countVowels(String text)" that counts how many vowels (a, e, i, o, u) appear in the text (case-insensitive).',
    starterCode: `int countVowels(String text) {\n  // Your code here\n  return 0;\n}`,
    solutionDart: `int countVowels(String text) {
  final vowels = {'a', 'e', 'i', 'o', 'u'};
  int count = 0;
  for (var char in text.toLowerCase().split('')) {
    if (vowels.contains(char)) {
      count++;
    }
  }
  return count;
}`,
    explanation: 'Convert to lowercase and check membership against a Set of vowels.',
  },
  {
    id: 'dp-10',
    title: 'Factorial of a Number',
    category: 'Math & Recursion',
    difficulty: 'Beginner',
    description: 'Write a function "factorial(int n)" that calculates n! (e.g. 5! = 5 * 4 * 3 * 2 * 1 = 120). 0! = 1.',
    starterCode: `int factorial(int n) {\n  // Your code here\n  return 1;\n}`,
    solutionDart: `int factorial(int n) {
  if (n < 0) throw ArgumentError('Negative numbers do not have factorials');
  int result = 1;
  for (int i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`,
    explanation: 'Multiply consecutive integers from 2 up to n.',
  },
  {
    id: 'dp-11',
    title: 'Remove Duplicates from a List Preserving Order',
    category: 'Collections',
    difficulty: 'Beginner',
    description: 'Write a function "removeDuplicates(List<T> list)" that removes repeated elements while preserving the original appearance order.',
    starterCode: `List<T> removeDuplicates<T>(List<T> list) {\n  // Your code here\n  return [];\n}`,
    solutionDart: `List<T> removeDuplicates<T>(List<T> list) {
  final seen = <T>{};
  return list.where((item) => seen.add(item)).toList();
}`,
    explanation: 'Set.add(item) returns true only if the item was newly added and not seen before.',
  },
  {
    id: 'dp-12',
    title: 'Check Leap Year',
    category: 'Math & Logic',
    difficulty: 'Beginner',
    description: 'Write a function "isLeapYear(int year)" that returns true if year is divisible by 4, except end-of-century years which must be divisible by 400.',
    starterCode: `bool isLeapYear(int year) {\n  // Your code here\n  return false;\n}`,
    solutionDart: `bool isLeapYear(int year) {
  if (year % 400 == 0) return true;
  if (year % 100 == 0) return false;
  return year % 4 == 0;
}`,
    explanation: 'Divisible by 4, not 100, unless divisible by 400.',
  },
  {
    id: 'dp-13',
    title: 'Temperature Conversion (Celsius to Fahrenheit)',
    category: 'Math',
    difficulty: 'Beginner',
    description: 'Write a function "celsiusToFahrenheit(double c)" that returns the temperature in Fahrenheit rounded to 1 decimal place.',
    starterCode: `double celsiusToFahrenheit(double c) {\n  // Your code here\n  return 0.0;\n}`,
    solutionDart: `double celsiusToFahrenheit(double c) {
  double f = (c * 9.0 / 5.0) + 32.0;
  return double.parse(f.toStringAsFixed(1));
}`,
    explanation: 'F = (C * 9/5) + 32.',
  },
  {
    id: 'dp-14',
    title: 'Calculate Simple Interest',
    category: 'Financial Math',
    difficulty: 'Beginner',
    description: 'Write a function "calculateSimpleInterest(double principal, double rate, double timeYears)" returning total interest earned.',
    starterCode: `double calculateSimpleInterest(double p, double r, double t) {\n  // Your code here\n  return 0.0;\n}`,
    solutionDart: `double calculateSimpleInterest(double principal, double rate, double timeYears) {
  return (principal * rate * timeYears) / 100.0;
}`,
    explanation: 'SI = (P * R * T) / 100.',
  },
  {
    id: 'dp-15',
    title: 'Check Anagram of Two Words',
    category: 'String Manipulation',
    difficulty: 'Intermediate',
    description: 'Write a function "isAnagram(String s1, String s2)" that returns true if s1 and s2 contain the exact same letters in different order (e.g. "silent" and "listen").',
    starterCode: `bool isAnagram(String s1, String s2) {\n  // Your code here\n  return false;\n}`,
    solutionDart: `bool isAnagram(String s1, String s2) {
  List<String> sortChars(String str) {
    var chars = str.toLowerCase().replaceAll(RegExp(r'\\s+'), '').split('');
    chars.sort();
    return chars;
  }
  return sortChars(s1).join() == sortChars(s2).join();
}`,
    explanation: 'Sort the characters of both words and compare for equality.',
  },
  {
    id: 'dp-16',
    title: 'Body Mass Index (BMI) & Category',
    category: 'Health Math',
    difficulty: 'Beginner',
    description: 'Write a function "calculateBMI(double weightKg, double heightMeters)" returning a map {"bmi": value, "category": "Underweight"|"Normal"|"Overweight"|"Obese"}.',
    starterCode: `Map<String, dynamic> calculateBMI(double weight, double height) {\n  // Your code here\n  return {};\n}`,
    solutionDart: `Map<String, dynamic> calculateBMI(double weightKg, double heightMeters) {
  double bmi = weightKg / (heightMeters * heightMeters);
  String category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25.0) category = 'Normal';
  else if (bmi < 30.0) category = 'Overweight';
  else category = 'Obese';

  return {
    'bmi': double.parse(bmi.toStringAsFixed(1)),
    'category': category,
  };
}`,
    explanation: 'BMI = weight / (height * height).',
  },
  {
    id: 'dp-17',
    title: 'Count Words in a Sentence',
    category: 'String Manipulation',
    difficulty: 'Beginner',
    description: 'Write a function "countWords(String sentence)" that counts words separated by spaces, ignoring multiple consecutive spaces.',
    starterCode: `int countWords(String sentence) {\n  // Your code here\n  return 0;\n}`,
    solutionDart: `int countWords(String sentence) {
  String trimmed = sentence.trim();
  if (trimmed.isEmpty) return 0;
  return trimmed.split(RegExp(r'\\s+')).length;
}`,
    explanation: 'Split by regex whitespace pattern \\s+ after trimming.',
  },
  {
    id: 'dp-18',
    title: 'Find Second Largest Number in List',
    category: 'Algorithms',
    difficulty: 'Intermediate',
    description: 'Write a function "findSecondLargest(List<int> numbers)" that finds the second distinct largest number.',
    starterCode: `int? findSecondLargest(List<int> numbers) {\n  // Your code here\n  return null;\n}`,
    solutionDart: `int? findSecondLargest(List<int> numbers) {
  final unique = numbers.toSet().toList();
  if (unique.length < 2) return null;
  unique.sort((a, b) => b.compareTo(a)); // descending
  return unique[1];
}`,
    explanation: 'Deduplicate with a Set, sort descending, and return index 1.',
  },
  {
    id: 'dp-19',
    title: 'Validate Email String Format',
    category: 'Regex',
    difficulty: 'Beginner',
    description: 'Write a function "isValidEmail(String email)" that verifies standard email structure using a RegExp.',
    starterCode: `bool isValidEmail(String email) {\n  // Your code here\n  return false;\n}`,
    solutionDart: `bool isValidEmail(String email) {
  final regex = RegExp(r'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$');
  return regex.hasMatch(email.trim());
}`,
    explanation: 'Matches alphanumeric username, @, domain, and 2-4 character TLD.',
  },
  {
    id: 'dp-20',
    title: 'Flatten a 2D Nested List',
    category: 'Collections',
    difficulty: 'Intermediate',
    description: 'Write a function "flatten(List<List<T>> nested)" that collapses a list of lists into a single flat list.',
    starterCode: `List<T> flatten<T>(List<List<T>> nested) {\n  // Your code here\n  return [];\n}`,
    solutionDart: `List<T> flatten<T>(List<List<T>> nested) {
  return nested.expand((element) => element).toList();
}`,
    explanation: 'The .expand() method flattens nested iterables cleanly.',
  },
  {
    id: 'dp-21',
    title: 'Sum of Digits in a Number',
    category: 'Math',
    difficulty: 'Beginner',
    description: 'Write a function "sumOfDigits(int number)" that sums all digits (e.g. 1234 -> 1+2+3+4 = 10).',
    starterCode: `int sumOfDigits(int number) {\n  // Your code here\n  return 0;\n}`,
    solutionDart: `int sumOfDigits(int number) {
  int n = number.abs();
  int sum = 0;
  while (n > 0) {
    sum += n % 10;
    n ~/= 10;
  }
  return sum;
}`,
    explanation: 'Extract last digit with % 10 and truncate with ~/= 10.',
  },
  {
    id: 'dp-22',
    title: 'Matrix Transposition (Rows to Columns)',
    category: '2D Arrays',
    difficulty: 'Intermediate',
    description: 'Write a function "transposeMatrix(List<List<int>> matrix)" that switches rows and columns.',
    starterCode: `List<List<int>> transposeMatrix(List<List<int>> matrix) {\n  // Your code here\n  return [];\n}`,
    solutionDart: `List<List<int>> transposeMatrix(List<List<int>> matrix) {
  if (matrix.isEmpty) return [];
  int rows = matrix.length;
  int cols = matrix[0].length;
  return List.generate(cols, (c) => List.generate(rows, (r) => matrix[r][c]));
}`,
    explanation: 'Generate new dimensions and swap indices [r][c] to [c][r].',
  },
  {
    id: 'dp-23',
    title: 'Find Missing Number from 1 to N',
    category: 'Algorithms',
    difficulty: 'Intermediate',
    description: 'Given a list containing numbers from 1 to N with exactly one missing, find the missing number in O(N) time.',
    starterCode: `int findMissingNumber(List<int> numbers, int n) {\n  // Your code here\n  return 0;\n}`,
    solutionDart: `int findMissingNumber(List<int> numbers, int n) {
  int expectedSum = (n * (n + 1)) ~/ 2;
  int actualSum = numbers.fold(0, (sum, num) => sum + num);
  return expectedSum - actualSum;
}`,
    explanation: 'Use Gauss\'s formula (N * (N + 1)) / 2 and subtract the actual sum.',
  },
  {
    id: 'dp-24',
    title: 'Clamp Number in Range',
    category: 'Math',
    difficulty: 'Beginner',
    description: 'Write a function "clampValue(double val, double min, double max)" that restricts val to remain within min and max bounds.',
    starterCode: `double clampValue(double val, double min, double max) {\n  // Your code here\n  return 0.0;\n}`,
    solutionDart: `double clampValue(double val, double min, double max) {
  return val.clamp(min, max);
}`,
    explanation: 'Dart num.clamp() handles lower and upper boundary clamping natively.',
  },
  {
    id: 'dp-25',
    title: 'Buy 2 Get 1 Free Calculation',
    category: 'Commercial Math',
    difficulty: 'Beginner',
    description: 'Write a function "calculateB2G1(int itemsCount, double itemPrice)" that calculates payable bill.',
    starterCode: `double calculateB2G1(int count, double price) {\n  // Your code here\n  return 0.0;\n}`,
    solutionDart: `double calculateB2G1(int itemsCount, double itemPrice) {
  int freeItems = itemsCount ~/ 3;
  int payableItems = itemsCount - freeItems;
  return payableItems * itemPrice;
}`,
    explanation: 'Divide count by 3 to find free items and charge for remainder.',
  },
];

export const flashcardsData: FlashcardItem[] = [
  {
    id: 'fc-1',
    category: 'Flutter UI',
    front: 'StatelessWidget',
    back: 'An immutable widget that cannot change its internal state during its lifetime. It describes user interface elements that depend solely on configuration info passed to its constructor.',
  },
  {
    id: 'fc-2',
    category: 'Flutter UI',
    front: 'StatefulWidget',
    back: 'A widget that maintains mutable state across its lifetime. It is split into two classes: the immutable Widget class and the persistent State class which holds mutable fields and build().',
  },
  {
    id: 'fc-3',
    category: 'Flutter Architecture',
    front: 'BuildContext',
    back: 'A handle to the location of a widget within the application widget tree hierarchy. Used to locate parent themes, media queries, and navigators.',
  },
  {
    id: 'fc-4',
    category: 'Flutter Performance',
    front: 'const Widget',
    back: 'A compile-time canonicalized widget instance. When a parent widget rebuilds, Flutter completely skips rebuilding const subtrees, optimizing CPU and memory.',
  },
  {
    id: 'fc-5',
    category: 'Android Equivalent',
    front: 'Android EditText <--> ?',
    back: 'TextField (or TextFormField when used with Form validation).',
  },
  {
    id: 'fc-6',
    category: 'Android Equivalent',
    front: 'Android Spinner <--> ?',
    back: 'DropdownButton or DropdownButtonFormField (or DropdownMenu in Material 3).',
  },
  {
    id: 'fc-7',
    category: 'Android Equivalent',
    front: 'Android TextView <--> ?',
    back: 'The Text widget.',
  },
  {
    id: 'fc-8',
    category: 'Android Equivalent',
    front: 'Android RecyclerView <--> ?',
    back: 'ListView.builder (recycles items lazily on demand).',
  },
  {
    id: 'fc-9',
    category: 'Android Core',
    front: '4 Components of Android',
    back: '1. Activity (UI screen)\n2. Service (Background work)\n3. Broadcast Receiver (OS event listener)\n4. Content Provider (Data sharing)',
  },
  {
    id: 'fc-10',
    category: 'Android Lifecycle',
    front: '6 Activity Lifecycle Callbacks',
    back: 'onCreate() -> onStart() -> onResume() -> onPause() -> onStop() -> onDestroy().',
  },
  {
    id: 'fc-11',
    category: 'Platform Channels',
    front: 'MethodChannel vs EventChannel',
    back: 'MethodChannel is for one-off asynchronous request-response method calls; EventChannel is for continuous event streams from native Android to Flutter.',
  },
  {
    id: 'fc-12',
    category: 'State Management',
    front: 'context.watch() vs context.read()',
    back: 'context.watch() subscribes the widget to changes and triggers a rebuild when notifyListeners() is called; context.read() retrieves the model without subscribing (used in click callbacks).',
  },
];

