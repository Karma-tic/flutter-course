---
id: "m0-l1"
moduleId: "m0"
title: "What is Flutter, Dart, and Why Companies Use It"
description: "Understand the high-level architecture of Flutter, how Dart compiles to machine code, and why top tech companies build with Flutter."
order: 1
duration: 12
difficulty: "Beginner"
prerequisites: []
lastVerified: "November 2026"
examAlerts:
  - "Exam Viva Question: Does Flutter use native Android views or paint its own pixels? Answer: Flutter paints its own pixels directly using its rendering engine!"
tips:
  - "Think of Flutter not as a web-view wrapper, but as a high-performance game engine specifically designed for user interfaces."
---

# Goal of this lesson
Understand what Flutter and Dart are, how Flutter differs from native Android and React Native, and why companies choose it.

## Simple Explanation
Flutter is an open-source UI software development kit created by Google. It allows you to write one single codebase in the Dart programming language and compile it directly into high-performance native machine code for Android, iOS, Web, Windows, macOS, and Linux.

Unlike other cross-platform frameworks that wrap a web browser or bridge native OEM buttons, Flutter draws every single pixel directly onto a canvas on your screen at 60 or 120 frames per second.

Dart is the programming language that powers Flutter. Dart is developed by Google and was chosen because it supports both **Just-In-Time (JIT)** compilation for blazing-fast Hot Reload during development, and **Ahead-Of-Time (AOT)** compilation to native ARM/x86 machine code for production releases.

## Real-World Analogy
Imagine an architect who wants to build identical beautiful houses in 5 different countries.

- **The Traditional Approach (Native):** Hiring 5 different construction crews speaking 5 different languages, buying 5 completely different types of bricks and tools.
- **The Hybrid Web Approach:** Shipping a television showing a video of a house inside a cardboard box.
- **The Flutter Approach:** Giving a single master painter a magical, high-speed paintbrush (the Skia/Impeller engine) that paints the exact same house with perfection directly onto the land in seconds.

## Code Example

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Hello Flutter!',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    ),
  );
}
```

## Step-by-Step Walkthrough
1. `import 'package:flutter/material.dart';` — Imports Google's Material Design widget library.
2. `void main()` — The entry point of every Dart program. Execution starts here.
3. `runApp()` — Takes the given Widget and inflates it to fill the entire physical screen.
4. `MaterialApp` — Configures the title, theme, and navigation engine.
5. `Scaffold` — Provides the standard white screen background and visual structure.
6. `Center` & `Text` — Centers the greeting message on the screen.

## Common Mistakes & How to Fix Them
- **Mistake:** Forgetting to wrap text in a `MaterialApp` or `Directionality` widget.
  - **Error:** Red screen with yellow underlined text "No Directionality widget found".
  - **Fix:** Always wrap your root widget with `MaterialApp` or `Scaffold`.

## Hands-on Practice Task
Modify the `Text` widget to display your own name and change its color to `Colors.blue`.

