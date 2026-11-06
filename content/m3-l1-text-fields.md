---
id: "m3-l1"
moduleId: "m3"
title: "TextField and TextEditingController (Android EditText Mapping)"
description: "Master user input handling in Flutter and compare it directly to Android native EditText."
order: 1
duration: 15
difficulty: "Beginner"
prerequisites: ["m2-l1", "m2-l2"]
lastVerified: "November 2026"
examAlerts:
  - "EXAM CRITICAL: TextEditingController MUST be disposed inside dispose(). Examiners test for this memory leak trap."
  - "Android Mapping: Flutter's TextField is equivalent to Android's EditText widget."
tips:
  - "Use obscureText: true for password inputs and keyboardType: TextInputType.number for numeric entries."
---

# Goal of this lesson
Learn how to create editable text inputs in Flutter, read the entered text using `TextEditingController`, and understand how it maps to Android's `EditText`.

## Simple Explanation
When you want a user to type their name, email, or marks, you use a `TextField` (or `TextFormField`).

To read what the user typed or clear the input programmatically, you attach a `TextEditingController`. In native Android, you would write `<EditText android:id="@+id/etName" />` and in Kotlin read `binding.etName.text.toString()`.

In Flutter, the controller is your remote control to the text field:
- `controller.text` gets or sets the text.
- `controller.clear()` wipes the input.
- `controller.dispose()` releases device memory when the screen closes.

## Real-World Analogy
Think of a physical typewriter with a remote control wire attached. You can type on the keys directly, or press a button on your remote control from across the room to read what is written on the paper or hit backspace to erase it.

## Code Example

```dart
import 'package:flutter/material.dart';

class NameInputScreen extends StatefulWidget {
  const NameInputScreen({super.key});

  @override
  State<NameInputScreen> createState() => _NameInputScreenState();
}

class _NameInputScreenState extends State<NameInputScreen> {
  final TextEditingController _nameController = TextEditingController();
  String _displayName = '';

  @override
  void dispose() {
    _nameController.dispose(); // CRITICAL: Always dispose controllers
    super.dispose();
  }

  void _submit() {
    setState(() {
      _displayName = _nameController.text.trim();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Input Example')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Student Name',
                hintText: 'Enter full name',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.person),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _submit,
              child: const Text('Submit Name'),
            ),
            const SizedBox(height: 16),
            if (_displayName.isNotEmpty)
              Text('Hello, $_displayName!', style: const TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}
```

## Step-by-Step Walkthrough
1. Create a `StatefulWidget` so the screen can hold mutable state.
2. Instantiate `final _nameController = TextEditingController();`.
3. Override `dispose()` and call `_nameController.dispose();` before `super.dispose();`.
4. Pass `controller: _nameController` into `TextField`.
5. In `_submit()`, read `_nameController.text` and call `setState()`.

## Common Mistakes & How to Fix Them
- **Mistake:** Forgetting to call `dispose()` on `TextEditingController`.
  - **Error:** Memory leak warning in Flutter DevTools; examiner deducts viva marks.
  - **Fix:** Always write `@override void dispose() { controller.dispose(); super.dispose(); }`.
