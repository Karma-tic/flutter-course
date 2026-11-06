export interface ValidationRecipe {
  id: string;
  title: string;
  description: string;
  flutterValidator: string;
  nativeKotlinValidator: string;
  regexPattern?: string;
  explanation: string;
}

export const validationRecipesData: ValidationRecipe[] = [
  {
    id: 'val-1',
    title: 'Empty / Required Field Check',
    description: 'Ensures the user typed at least one non-whitespace character.',
    flutterValidator: `String? validateRequired(String? value, String fieldName) {
  if (value == null || value.trim().isEmpty) {
    return '\$fieldName cannot be empty';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validateRequired(text: String, fieldName: String): String? {
    if (text.trim().isEmpty()) {
        return "\$fieldName cannot be empty"
    }
    return null
}`,
    explanation: 'Always use .trim() so strings containing only spaces (e.g. "   ") are properly rejected.',
  },
  {
    id: 'val-2',
    title: 'Numeric Range (Marks 0 to 100)',
    description: 'Ensures student marks are a valid decimal/integer between 0.0 and 100.0 inclusive.',
    flutterValidator: `String? validateMarks(String? value) {
  if (value == null || value.trim().isEmpty) return 'Marks are required';
  final marks = double.tryParse(value.trim());
  if (marks == null) return 'Please enter a valid numeric value';
  if (marks < 0.0 || marks > 100.0) {
    return 'Marks must be between 0 and 100';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validateMarks(input: String): String? {
    if (input.trim().isEmpty()) return "Marks are required"
    val marks = input.trim().toDoubleOrNull()
        ?: return "Please enter a valid numeric value"
    if (marks < 0.0 || marks > 100.0) {
        return "Marks must be between 0 and 100"
    }
    return null
}`,
    explanation: 'Using double.tryParse() or toDoubleOrNull() safely handles non-numeric strings without throwing an uncaught exception.',
  },
  {
    id: 'val-3',
    title: 'Email Address Format (Regex)',
    description: 'Validates email structure (username@domain.extension).',
    regexPattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    flutterValidator: `String? validateEmail(String? value) {
  if (value == null || value.trim().isEmpty) return 'Email is required';
  final emailRegex = RegExp(r'^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$');
  if (!emailRegex.hasMatch(value.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validateEmail(email: String): String? {
    if (email.trim().isEmpty()) return "Email is required"
    val regex = Regex("^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}\$")
    if (!regex.matches(email.trim())) {
        return "Enter a valid email address"
    }
    return null
}`,
    explanation: 'Tests for @ symbol, non-empty domain name, and standard top-level domain suffix.',
  },
  {
    id: 'val-4',
    title: '10-Digit Mobile Phone Number',
    description: 'Ensures the input contains exactly 10 numeric digits after stripping punctuation.',
    flutterValidator: `String? validatePhone(String? value) {
  if (value == null || value.trim().isEmpty) return 'Phone number is required';
  final digitsOnly = value.trim().replaceAll(RegExp(r'[^0-9]'), '');
  if (digitsOnly.length != 10) {
    return 'Phone number must be exactly 10 digits';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validatePhone(phone: String): String? {
    if (phone.trim().isEmpty()) return "Phone is required"
    val digits = phone.trim().replace(Regex("[^0-9]"), "")
    if (digits.length != 10) {
        return "Phone must be exactly 10 digits"
    }
    return null
}`,
    explanation: 'Strips out dashes, spaces, and brackets before evaluating the digit length.',
  },
  {
    id: 'val-5',
    title: 'Password Strength (Min 8 chars, 1 digit, 1 special char)',
    description: 'Enforces minimum password security standards.',
    flutterValidator: `String? validatePassword(String? value) {
  if (value == null || value.isEmpty) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!value.contains(RegExp(r'[0-9]'))) return 'Must contain at least 1 number';
  if (!value.contains(RegExp(r'[!@#\\$%^&*(),.?":{}|<>]'))) {
    return 'Must contain at least 1 special character';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validatePassword(password: String): String? {
    if (password.isEmpty()) return "Password is required"
    if (password.length < 8) return "Must be at least 8 characters"
    if (!password.any { it.isDigit() }) return "Must contain at least 1 digit"
    if (!password.any { "!@#$%^&*()_+-=[]{}|;':,./<>?".contains(it) }) {
        return "Must contain at least 1 special character"
    }
    return null
}`,
    explanation: 'Provides clear actionable guidance on why a password failed strength criteria.',
  },
  {
    id: 'val-6',
    title: 'Roll Number (Alphanumeric)',
    description: 'Ensures the roll number is 2 to 12 characters and only contains letters, digits, and hyphens.',
    flutterValidator: `String? validateRollNumber(String? value) {
  if (value == null || value.trim().isEmpty) return 'Roll number is required';
  final rollRegex = RegExp(r'^[a-zA-Z0-9-]{2,12}\$');
  if (!rollRegex.hasMatch(value.trim())) {
    return 'Roll number must be 2-12 alphanumeric characters (e.g. CS-101)';
  }
  return null;
}`,
    nativeKotlinValidator: `fun validateRollNumber(roll: String): String? {
    if (roll.trim().isEmpty()) return "Roll number is required"
    val regex = Regex("^[a-zA-Z0-9-]{2,12}\$")
    if (!regex.matches(roll.trim())) {
        return "Roll number must be 2-12 alphanumeric characters"
    }
    return null
}`,
    explanation: 'Permits hyphenated university formats like CS-2026 or 104523.',
  },
];
