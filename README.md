# Flutter Course — Zero to Job-Ready & Company Exam Prep

A complete, world-class, static Flutter & Dart self-paced learning website hosted on GitHub Pages. Built from the ground up for absolute beginners with zero prior programming background who need to become job-ready and pass technical interviews or Android-flavoured company exams.

🔗 **Live Website:** [https://karma-tic.github.io/flutter-course/](https://karma-tic.github.io/flutter-course/)  
📦 **Repository:** [https://github.com/Karma-tic/flutter-course](https://github.com/Karma-tic/flutter-course)

---

## 🌟 Key Features

- **Beginner First Philosophy:** Simple plain-English explanations, tangible real-world analogies, short readable paragraphs, and copy-paste ready code.
- **Android-Flavoured Exam Focus:** Side-by-side native Android (Kotlin + XML) vs Flutter comparisons for every single topic:
  - Activity Lifecycle vs StatefulWidget lifecycle
  - `EditText` vs `TextField` / `TextFormField`
  - `Spinner` + `ArrayAdapter` vs `DropdownButtonFormField`
  - `RecyclerView` + `ViewHolder` vs `ListView.builder`
  - `BroadcastReceiver` + `Intent` vs `EventChannel` / `connectivity_plus`
  - `Service` (Started vs Bound, Foreground) vs `flutter_background_service`
- **The Student Details Exam Project:** Complete, working, production-ready solution in both Flutter and native Kotlin + XML with line-by-line breakdown and official grading rubric.
- **20+ Commercial Discount & Bill Calculation Problems:** Tiered discounts, coupon codes, GST/tax calculations, and an interactive live calculator widget.
- **Timed Mock Exams:** 5 full 20-question mock exams (100 questions total) with an interactive 25-minute countdown timer and instant explanations.
- **Zero Backend / 100% Privacy:** All progress, quiz scores, custom exam checklists, and notes are saved in your browser's `localStorage` with full JSON Export & Import support.
- **Client-Side Search:** Instant `Cmd+K` / `Ctrl+K` global search across 57 lessons, glossary terms, and exam questions.
- **Interactive Sandbox:** Embedded live DartPad iframe so learners can run Flutter and Dart code right in their browser.
- **30/60/90-Day Study Planner:** Interactive timeline generator tailored to the student's daily available hours.
- **Honest Certifications Guide:** Transparent facts debunking fake "Google Flutter Developer" certifications, with reputable skill badges and a job-winning portfolio checklist.
- **Extensible Markdown Content:** Drop Markdown (`.md`) lessons into `/content` with frontmatter for easy customization.

---

## 📚 Curriculum Structure

| Module | Title | Lessons | Key Highlights |
|---|---|:---:|---|
| **Module 0** | Start Here & Tooling | 5 | SDK install, `flutter doctor` troubleshooting, DevTools, Hot Reload vs Restart, Git basics |
| **Module 1** | Dart Fundamentals | 6 | Sound null safety, arrow functions, OOP, mixins, streams, async/await |
| **Module 2** | Flutter UI Basics | 6 | Stateless vs Stateful, Row/Column/Stack, Material 3, Dark mode, MediaQuery |
| **Module 3** | Inputs, Forms & Validation | 6 | **EXAM CRITICAL:** `TextFormField`, `DropdownButtonFormField`, 6 validation recipes |
| **Module 4** | Lists, Grids & Navigation | 5 | **EXAM CRITICAL:** `ListView.builder` (recycling), Slivers, `Navigator 1.0` vs `go_router` |
| **Module 5** | State Management | 5 | Ephemeral vs App State, `ValueNotifier`, `Provider`, `Riverpod`, `BLoC`/`Cubit` |
| **Module 6** | Data & Networking | 4 | `SharedPreferences`, `sqflite` (SQLite), `Dio` REST APIs, Firebase Suite, MVVM |
| **Module 7** | Android Core in Flutter | 8 | **EXAM CRITICAL:** Activity lifecycle, 4 Components, `MethodChannel`, Kotlin + XML primer |
| **Module 8** | Animations, Media & Polish | 4 | Hero animations, CustomPainter, device camera, geolocation, internationalization |
| **Module 9** | Testing, Performance & Release | 4 | Unit/Widget/Integration tests, 60 FPS profiling, Play Store publishing, CI/CD |
| **Module 10** | Real-World Projects | 8 | Full source code for 8 apps including the Student Details App and Discount Calculator |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom Flutter palette (`#02569B`, `#0175C2`, `#54C5F8`)
- **Routing:** [React Router 7](https://reactrouter.com/) using `HashRouter` (ensures deep page reloads never trigger 404 errors on GitHub Pages)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** GitHub Pages via automated GitHub Actions workflow (`.github/workflows/deploy.yml`)

---

## 🚀 Local Development Setup

Ensure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed:

```bash
# 1. Clone the repository
git clone https://github.com/Karma-tic/flutter-course.git
cd flutter-course

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173/flutter-course/` in your browser.

---

## 📦 Building for Production

```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview the production build locally
npm run preview
```

The output files will be generated in `/dist`.

---

## 📝 Adding New Lessons via Markdown (/content)

You can easily author new lessons by dropping `.md` or `.mdx` files into the `/content/` directory.

### Example Frontmatter:
```markdown
---
id: "m4-l6"
moduleId: "m4"
title: "Custom Slivers and Collapsible AppBars"
description: "Learn how to build floating, pinned, and expandable headers in Flutter."
order: 6
duration: 15
difficulty: "Intermediate"
prerequisites: ["m4-l1", "m4-l2"]
lastVerified: "November 2026"
examAlerts:
  - "Understand the difference between SliverAppBar pinned vs floating properties."
---

# Goal of this lesson
...
```

See `/content/README.md` for full schema specifications.

---

## 🔒 Privacy & LocalStorage Data

This application requires **no account creation and has zero backend servers**. All user state is stored locally inside your browser:

- Completed lesson IDs
- Quiz scores (auto-marks complete when passed at 70%+)
- Bookmarks & personal study notes
- Last visited lesson
- Custom exam topic checklist
- Mock test scores
- Study planner daily hours

To export your progress as a backup JSON file or transfer it to another browser, click **Export JSON** in the footer. To restore, click **Import JSON**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

*Flutter and the related logo are trademarks of Google LLC. This course is an independent educational resource and is not affiliated with or endorsed by Google LLC.*
