# Content Directory — Markdown Course Lessons

Welcome to the `/content` folder of the **Flutter Course** learning platform.

This directory supports authoring lessons directly as Markdown (`.md`) or MDX files. Each file represents a single self-contained lesson with YAML frontmatter.

---

## Frontmatter Schema Specification

Every lesson file must begin with a YAML frontmatter block enclosed between `---`:

```yaml
---
id: "m3-l1"
moduleId: "m3"
title: "TextField and TextEditingController"
description: "Master user input handling in Flutter and compare it to Android's native EditText."
order: 1
duration: 15
difficulty: "Beginner"
prerequisites: ["m2-l1", "m2-l2"]
lastVerified: "November 2026"
examAlerts:
  - "The company exam specifically tests reading values via TextEditingController and clearing fields on submit."
tips:
  - "Always call controller.dispose() inside dispose() to prevent memory leaks."
---
```

### Required Fields:
- `title`: The human-readable title of the lesson.
- `moduleId`: The target module identifier (`m0` through `m10`).
- `order`: The sequential order of the lesson inside the module (1, 2, 3...).
- `duration`: Estimated completion time in minutes.
- `difficulty`: `'Beginner'` | `'Intermediate'` | `'Advanced'`.
- `prerequisites`: An array of prerequisite lesson IDs (e.g. `["m0-l1"]`).

### Optional Fields:
- `lastVerified`: Month/year string of last content verification (e.g. `"November 2026"`).
- `examAlerts`: String list of critical warnings for company exams.
- `tips`: Helpful pro tips for learners.

---

## Lesson Section Structure

To maintain consistency for absolute beginners, please format your markdown body with the standard sections:

1. `## Goal of this lesson`
   A concise statement of what the learner will be able to do.

2. `## Simple Explanation`
   Short paragraphs explaining the concept without unnecessary jargon.

3. `## Real-World Analogy`
   A tangible physical analogy (e.g., mailboxes, TV remotes, LEGO blocks).

4. `## Code Example`
   Fenced code block (` ```dart `) with comments.

5. `## Step-by-Step Walkthrough`
   Numbered steps explaining line-by-line mechanics.

6. `## Common Mistakes & How to Fix Them`
   Typical pitfalls that beginners make, with the exact error message and the code fix.

7. `## Hands-on Practice Task`
   A mini assignment with an optional hint.

8. `## Concept Check Quiz`
   Multiple-choice questions with answer explanations.

