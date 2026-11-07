import { Lesson } from '../../types';

export const module8Lessons: Lesson[] = [
  {
    id: 'm8-l1',
    moduleId: 'module-8',
    title: 'Implicit vs Explicit Animations, Hero & AnimatedContainer',
    description: 'Bring apps to life! Master the difference between Implicit animations (AnimatedContainer, AnimatedOpacity) and Explicit animations (AnimationController, CurvedAnimation), and create Hero transitions.',
    order: 1,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    prerequisites: ['Module 2: Flutter UI Basics'],
    lastVerified: 'November 2026',
    goal: 'Animate widget properties automatically using AnimatedContainer, build custom choreography with AnimationController, and share elements across routes with Hero.',
    simpleExplanation: `Flutter animations are divided into two categories:

### 1. Implicit Animations (Simple & Automatic)
If you just want a property (color, width, height, opacity) to smoothly transition when a value changes, use an **AnimatedFoo** widget:
- \`AnimatedContainer(duration: Duration(milliseconds: 300), width: isExpanded ? 200 : 100)\`
- \`AnimatedOpacity(opacity: isVisible ? 1.0 : 0.0, duration: ...)\`
- \`AnimatedAlign\`, \`AnimatedPadding\`, \`AnimatedCrossFade\`
Flutter handles the animation controller, ticker, and interpolation for you!

### 2. Explicit Animations (Fine-Grained Choreography)
Use when you need:
- Looping / repeating animations (like a rotating loading gear or pulsing radar)
- Staggered animations (step 1, then step 2, then step 3)
- Reverse animations or pausing at exact millisecond marks
Requires: \`AnimationController\` with \`SingleTickerProviderStateMixin\`.

### 3. \`Hero\` Widget (Shared Element Transitions)
Smoothly flies an image or card from Screen A to Screen B during a route push!
Simply wrap the widget in both screens with \`Hero(tag: 'student-avatar-101', child: ...)\`.`,
    analogy: `Think of automatic transmission vs manual stick-shift:
- **Implicit Animation (AnimatedContainer):** An automatic car. You just press the gas pedal (change a property) and the car smoothly shifts gears for you.
- **Explicit Animation (AnimationController):** A race car manual stick-shift. You control the clutch, gear ratio, RPM limit, and reverse gear.
- **Hero Animation:** Superman flying across the city sky from the Daily Planet building (Screen A) directly into the Fortress of Solitude (Screen B).`,
    codeSnippet: `import 'package:flutter/material.dart';

class ImplicitAnimationDemo extends StatefulWidget {
  const ImplicitAnimationDemo({super.key});

  @override
  State<ImplicitAnimationDemo> createState() => _ImplicitAnimationDemoState();
}

class _ImplicitAnimationDemoState extends State<ImplicitAnimationDemo> {
  bool _isEnrolled = false;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // AnimatedContainer automatically interpolates color, size, and border!
          AnimatedContainer(
            duration: const Duration(milliseconds: 400),
            curve: Curves.easeInOutBack,
            width: _isEnrolled ? 260 : 180,
            height: _isEnrolled ? 100 : 80,
            decoration: BoxDecoration(
              color: _isEnrolled ? Colors.green.shade600 : const Color(0xFF02569B),
              borderRadius: BorderRadius.circular(_isEnrolled ? 24 : 8),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.15),
                  blurRadius: _isEnrolled ? 16 : 4,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Center(
              child: Text(
                _isEnrolled ? 'Enrolled Successfully! 🎉' : 'Tap to Enroll',
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () => setState(() => _isEnrolled = !_isEnrolled),
            child: Text(_isEnrolled ? 'Reset Status' : 'Trigger Animation'),
          ),
        ],
      ),
    );
  }
}`,
    dartPadCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: Scaffold(body: AnimatedBoxDemo())));

class AnimatedBoxDemo extends StatefulWidget {
  const AnimatedBoxDemo({super.key});
  @override
  State<AnimatedBoxDemo> createState() => _AnimatedBoxDemoState();
}

class _AnimatedBoxDemoState extends State<AnimatedBoxDemo> {
  bool big = false;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        onTap: () => setState(() => big = !big),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          width: big ? 150 : 80,
          height: big ? 150 : 80,
          color: big ? Colors.deepPurple : Colors.orange,
          child: const Center(child: Text('Tap Me', style: TextStyle(color: Colors.white))),
        ),
      ),
    );
  }
}`,
    dartPadType: 'flutter',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Choose AnimatedContainer',
        description: 'Provide a Duration and Curve to animate width, height, color, and borderRadius effortlessly.'
      },
      {
        step: 2,
        title: 'SingleTickerProviderStateMixin',
        description: 'When building explicit animations, add this mixin to bind your controller to the screen refresh ticker.'
      },
      {
        step: 3,
        title: 'Matching Hero tags',
        description: 'Hero widgets on Screen A and Screen B must share the exact same tag string.'
      },
      {
        step: 4,
        title: 'Dispose AnimationController',
        description: 'Always call controller.dispose() in dispose() to halt the hardware ticker.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using duplicate Hero tags on the same screen.',
        fix: 'Ensure each Hero tag on a screen is unique (e.g. hero-student-\${student.id}).',
        why: 'Flutter throws an assertion error if two Hero widgets share identical tags in the same route.'
      },
      {
        mistake: 'Forgetting to dispose AnimationController in dispose().',
        fix: 'Override dispose() and call _controller.dispose().',
        why: 'Undisposed controllers continue requesting VSync ticks, draining battery in the background.'
      }
    ],
    examAlerts: [
      'Exam Alert: "What is the difference between Implicit and Explicit animations in Flutter?" — Answer: Implicit animations (e.g. AnimatedContainer) animate property changes automatically without an AnimationController; Explicit animations require an AnimationController to manage playback, loops, and custom curves.',
      'Exam Alert: "Which widget animates a shared visual element across different routes during navigation?" — Answer: The Hero widget.'
    ],
    practiceTask: {
      task: 'Create an AnimatedOpacity widget that fades a student result badge between 0.0 (invisible) and 1.0 (visible) over 500 milliseconds on button tap.',
      hint: 'AnimatedOpacity(opacity: isVisible ? 1.0 : 0.0, duration: Duration(milliseconds: 500), child: ...)',
      solution: `AnimatedOpacity(
  opacity: isVisible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 500),
  child: const Chip(
    label: Text('Top Scorer Award 🏆'),
    backgroundColor: Colors.amber,
  ),
)`
    },
    quiz: [
      {
        id: 'q8-1-1',
        question: 'Which widget smoothly animates a shared element from one screen to another during route transitions?',
        options: ['FlyWidget', 'Hero', 'SharedAxis', 'PageRoute'],
        correctIndex: 1,
        explanation: 'The Hero widget flies its child widget from the source route to the destination route.'
      },
      {
        id: 'q8-1-2',
        question: 'What is required for an Explicit animation in Flutter that is NOT required for an Implicit animation?',
        options: [
          'An AnimationController to drive the animation ticker and playback manually',
          'A physical graphics card',
          'A web browser',
          'SQLite database'
        ],
        correctIndex: 0,
        explanation: 'Explicit animations require an AnimationController to manage start, stop, reverse, and timing.'
      },
      {
        id: 'q8-1-3',
        question: 'Which mixin is applied to a State class to provide a VSync ticker for a single AnimationController?',
        options: [
          'SingleTickerProviderStateMixin',
          'TickerProviderStateMixin',
          'WidgetsBindingObserver',
          'AnimationMixin'
        ],
        correctIndex: 0,
        explanation: 'SingleTickerProviderStateMixin provides a single ticker bound to the display refresh rate.'
      },
      {
        id: 'q8-1-4',
        question: 'What happens if two Hero widgets on the same screen share the exact same tag?',
        options: [
          'They merge into one',
          'Flutter throws an assertion error during route transition',
          'They animate simultaneously without issue',
          'One turns transparent'
        ],
        correctIndex: 1,
        explanation: 'Hero tags must be uniquely identifiable within the route.'
      },
      {
        id: 'q8-1-5',
        question: 'Which widget smoothly interpolates changes to width, height, color, and padding automatically without a controller?',
        options: ['Container', 'AnimatedContainer', 'CustomBox', 'DynamicBox'],
        correctIndex: 1,
        explanation: 'AnimatedContainer is the most versatile implicit animation widget in Flutter.'
      }
    ]
  },
  {
    id: 'm8-l2',
    moduleId: 'module-8',
    title: 'Custom Painters, Canvas & Touch Gestures',
    description: 'Paint custom pixels directly onto the screen! Master CustomPaint, CustomPainter, Canvas drawing primitives (lines, circles, arcs, paths, paint shaders), and GestureDetector.',
    order: 2,
    durationMinutes: 16,
    difficulty: 'Advanced',
    prerequisites: ['Module 8 Lesson 1: Animations'],
    lastVerified: 'November 2026',
    goal: 'Draw custom charts, circular progress rings, and shapes using CustomPainter, and capture touch gestures like drag, scale, and tap.',
    simpleExplanation: `When standard widgets can\'t build the custom visual you need (like a circular grade progress meter, signature pad, or custom graph), Flutter gives you direct access to the low-level **Canvas** via **\`CustomPaint\`**!

### 1. \`CustomPainter\`
Extend \`CustomPainter\` and override two methods:
- **\`paint(Canvas canvas, Size size)\`**: Where you draw!
  - \`canvas.drawLine(p1, p2, paint)\`
  - \`canvas.drawCircle(center, radius, paint)\`
  - \`canvas.drawRect(rect, paint)\`
  - \`canvas.drawArc(rect, startAngle, sweepAngle, useCenter, paint)\`
- **\`shouldRepaint(covariant CustomPainter oldDelegate)\`**: Returns \`true\` if the canvas needs redrawing.

### 2. The \`Paint\` Object
The \`Paint\` object is your paintbrush:
- \`color\`: Color of the stroke or fill.
- \`style\`: \`PaintingStyle.stroke\` (outline) or \`PaintingStyle.fill\` (solid).
- \`strokeWidth\`: Thickness in pixels.
- \`strokeCap\`: \`StrokeCap.round\` for smooth circular line ends.

### 3. Capturing Gestures with \`GestureDetector\`
- \`onTap\`, \`onDoubleTap\`, \`onLongPress\`
- \`onPanUpdate\` (freehand dragging for signature pads or drawing apps)
- \`onScaleUpdate\` (pinch-to-zoom gestures)`,
    analogy: `Think of traditional oil painting:
- **Canvas:** The blank stretched white canvas on your easel.
- **Paint:** The palette knife and oil tubes in your hand where you mix colors and brush widths.
- **GestureDetector:** Your hand holding the brush and moving across the canvas.`,
    codeSnippet: `import 'dart:math';
import 'package:flutter/material.dart';

// Circular Grade Progress Ring drawn via CustomPainter
class GradeProgressPainter extends CustomPainter {
  final double percentage; // 0.0 to 100.0

  GradeProgressPainter({required this.percentage});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width / 2, size.height / 2) - 10;

    // 1. Background Gray Track Paint
    final backgroundPaint = Paint()
      ..color = Colors.grey.shade200
      ..strokeWidth = 12
      ..style = PaintingStyle.stroke;

    canvas.drawCircle(center, radius, backgroundPaint);

    // 2. Active Progress Arc Paint
    final progressPaint = Paint()
      ..color = percentage >= 80 ? Colors.green : percentage >= 50 ? Colors.orange : Colors.red
      ..strokeWidth = 12
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    // Convert percentage to radians (-pi/2 starts at 12 o'clock)
    double sweepAngle = 2 * pi * (percentage / 100.0);
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -pi / 2,
      sweepAngle,
      false,
      progressPaint,
    );
  }

  @override
  bool shouldRepaint(covariant GradeProgressPainter oldDelegate) {
    return oldDelegate.percentage != percentage;
  }
}

class GradeProgressWidget extends StatelessWidget {
  final double marks; // e.g. 88.5
  const GradeProgressWidget({super.key, required this.marks});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: const Size(140, 140),
      painter: GradeProgressPainter(percentage: marks),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('\${marks.toStringAsFixed(1)}%', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const Text('Marks', style: TextStyle(fontSize: 12, color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Angle conversion in Dart Canvas:
import 'dart:math';

void main() {
  double marks = 85.0; // 85%
  double radians = 2 * pi * (marks / 100.0);
  print('Marks: \$marks% -> Arc sweep angle: \$radians radians');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Extend CustomPainter',
        description: 'Create a class extending CustomPainter and pass necessary styling parameters.'
      },
      {
        step: 2,
        title: 'Configure Paint object',
        description: 'Set style to PaintingStyle.stroke and strokeCap to StrokeCap.round.'
      },
      {
        step: 3,
        title: 'Draw arcs and circles',
        description: 'Canvas drawArc takes startAngle (-pi/2 is top) and sweepAngle in radians.'
      },
      {
        step: 4,
        title: 'Optimize shouldRepaint',
        description: 'Return true only if values changed to prevent redundant GPU repainting.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Allocating new Paint() objects inside the paint() method loop.',
        fix: 'Create Paint instances as class fields or outside loops.',
        why: 'paint() runs on every frame; allocating objects inside it triggers frequent garbage collection pauses.'
      },
      {
        mistake: 'Returning true blindly in shouldRepaint() without checking oldDelegate.',
        fix: 'return oldDelegate.property != property;',
        why: 'Returning true unconditionally forces repainting even when the parent widget did not change data.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which class is extended to draw custom graphics and canvas shapes in Flutter?" — Answer: CustomPainter (rendered via the CustomPaint widget).',
      'Exam Alert: "What unit of measurement does Canvas.drawArc() expect for angles in Flutter?" — Answer: Radians (not degrees). Use radians = degrees * (pi / 180).'
    ],
    practiceTask: {
      task: 'Write a CustomPainter that draws a simple red diagonal line from the top-left (0, 0) to bottom-right (size.width, size.height) of its canvas.',
      hint: 'canvas.drawLine(Offset.zero, Offset(size.width, size.height), paint);',
      solution: `class DiagonalLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.red
      ..strokeWidth = 4;
    canvas.drawLine(Offset.zero, Offset(size.width, size.height), paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}`
    },
    quiz: [
      {
        id: 'q8-2-1',
        question: 'Which widget hosts a CustomPainter and provides it with canvas bounds?',
        options: ['CustomPaint', 'CanvasWidget', 'DrawContainer', 'PaintBox'],
        correctIndex: 0,
        explanation: 'CustomPaint acts as the widget tree container for a CustomPainter delegate.'
      },
      {
        id: 'q8-2-2',
        question: 'What angle in radians corresponds to the top (12 o\'clock) position on a Canvas?',
        options: ['0', '-pi / 2', 'pi', '2 * pi'],
        correctIndex: 1,
        explanation: 'In computer graphics, 0 radians is 3 o\'clock; -pi/2 (-90 degrees) points directly up to 12 o\'clock.'
      },
      {
        id: 'q8-2-3',
        question: 'What does returning "false" from shouldRepaint() indicate to Flutter?',
        options: [
          'The painter has crashed',
          'The data has not changed, so the existing painted raster can be reused without redrawing',
          'Clear the canvas',
          'Disable touch'
        ],
        correctIndex: 1,
        explanation: 'Returning false skips repainting, saving GPU execution cycles.'
      },
      {
        id: 'q8-2-4',
        question: 'Which callback in GestureDetector tracks continuous drag movements across the screen?',
        options: ['onPanUpdate', 'onTap', 'onPress', 'onHover'],
        correctIndex: 0,
        explanation: 'onPanUpdate delivers continuous drag delta offsets suitable for drawing and dragging.'
      },
      {
        id: 'q8-2-5',
        question: 'Which Paint property creates rounded caps on line endings?',
        options: ['strokeCap: StrokeCap.round', 'lineEnd: round', 'borderRound: true', 'roundCap()'],
        correctIndex: 0,
        explanation: 'StrokeCap.round produces semi-circular rounded ends on stroked paths.'
      }
    ]
  },
  {
    id: 'm8-l3',
    moduleId: 'module-8',
    title: 'Hardware & Media: Camera, Image Picker, Video Player, Maps & Location',
    description: 'Integrate real device capabilities! Capture photos with image_picker, display maps with google_maps_flutter, stream GPS coordinates with geolocator, and play media.',
    order: 3,
    durationMinutes: 16,
    difficulty: 'Intermediate',
    prerequisites: ['Module 7 Lesson 3: Android Manifest & Permissions'],
    lastVerified: 'November 2026',
    goal: 'Select or capture student profile photos using image_picker, query GPS coordinates with geolocator, and configure native Android Google Maps API keys.',
    simpleExplanation: `Enterprise apps often interact with hardware: taking photos for student IDs, recording video submissions, or pinning exam test centers on a map.

### 1. \`image_picker\` (Photos from Camera or Gallery)
The official package to pick photos:
\`\`\`dart
final ImagePicker picker = ImagePicker();
// Pick from Gallery:
final XFile? photo = await picker.pickImage(source: ImageSource.gallery);
// Or capture fresh photo from Camera:
final XFile? cameraPhoto = await picker.pickImage(source: ImageSource.camera);

if (photo != null) {
  File imageFile = File(photo.path);
  // Display with Image.file(imageFile)
}
\`\`\`

### 2. \`geolocator\` (GPS Location)
Queries current latitude and longitude:
\`\`\`dart
Position pos = await Geolocator.getCurrentPosition(
  desiredAccuracy: LocationAccuracy.high,
);
print('Lat: \${pos.latitude}, Lng: \${pos.longitude}');
\`\`\`

### 3. \`google_maps_flutter\`
Displays interactive Google Maps directly in your Flutter widget tree. Requires adding your Google Maps API key to \`AndroidManifest.xml\`.`,
    analogy: `Think of plugins like hardware dongles for your laptop:
Instead of rewriting low-level device firmware yourself, you plug in a clean USB dongle (\`image_picker\` or \`geolocator\`) that translates camera sensors and GPS satellites into simple Dart objects!`,
    codeSnippet: `import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class StudentPhotoPicker extends StatefulWidget {
  const StudentPhotoPicker({super.key});

  @override
  State<StudentPhotoPicker> createState() => _StudentPhotoPickerState();
}

class _StudentPhotoPickerState extends State<StudentPhotoPicker> {
  File? _imageFile;
  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage(ImageSource source) async {
    final XFile? picked = await _picker.pickImage(
      source: source,
      maxWidth: 800,
      imageQuality: 85,
    );

    if (picked != null) {
      setState(() {
        _imageFile = File(picked.path);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Avatar preview
        CircleAvatar(
          radius: 50,
          backgroundColor: Colors.blue.shade100,
          backgroundImage: _imageFile != null ? FileImage(_imageFile!) : null,
          child: _imageFile == null
              ? const Icon(Icons.person, size: 50, color: Colors.blue)
              : null,
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            OutlinedButton.icon(
              onPressed: () => _pickImage(ImageSource.camera),
              icon: const Icon(Icons.camera_alt),
              label: const Text('Camera'),
            ),
            const SizedBox(width: 12),
            OutlinedButton.icon(
              onPressed: () => _pickImage(ImageSource.gallery),
              icon: const Icon(Icons.photo_library),
              label: const Text('Gallery'),
            ),
          ],
        ),
      ],
    );
  }
}`,
    dartPadCode: `// Hardware integration checklist mental model:
void main() {
  print('1. Add plugin to pubspec.yaml (e.g. image_picker)');
  print('2. Add Android permissions to AndroidManifest.xml (CAMERA / STORAGE)');
  print('3. Request runtime permissions via permission_handler if needed');
  print('4. Call Dart API: picker.pickImage(source: ImageSource.camera)');
  print('5. Display result via Image.file(File(xfile.path))');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Install image_picker',
        description: 'Run flutter pub add image_picker in terminal.'
      },
      {
        step: 2,
        title: 'Configure image constraints',
        description: 'Always specify maxWidth and imageQuality to prevent loading 100MB camera images into RAM.'
      },
      {
        step: 3,
        title: 'Convert XFile to File',
        description: 'XFile is a cross-platform handle; use File(xfile.path) and FileImage on mobile.'
      },
      {
        step: 4,
        title: 'Geolocator permissions',
        description: 'Always check Geolocator.checkPermission() and requestPermission() before requesting coordinates.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Picking high-res 48MP raw photos into memory without downscaling.',
        fix: 'Pass maxWidth: 1024, maxHeight: 1024, imageQuality: 80 to pickImage().',
        why: 'Uncompressed multi-megapixel images cause sudden Out-Of-Memory (OOM) crashes on budget Android devices.'
      },
      {
        mistake: 'Forgetting to handle null when user cancels camera or gallery picker.',
        fix: 'if (picked != null) { ... }',
        why: 'If the user presses the back button without snapping a photo, pickImage returns null.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which official Flutter package is used to capture photos from the device camera or pick from the photo gallery?" — Answer: image_picker.',
      'Exam Alert: "Why is it important to set imageQuality and maxWidth when picking photos?" — Answer: To reduce memory usage, prevent Out-Of-Memory (OOM) crashes, and optimize network upload speeds.'
    ],
    practiceTask: {
      task: 'Write a function that opens the gallery to pick an image and prints the file path if selected, or "No image selected" if cancelled.',
      hint: 'final xfile = await ImagePicker().pickImage(source: ImageSource.gallery);',
      solution: `Future<void> choosePhoto() async {
  final picker = ImagePicker();
  final XFile? image = await picker.pickImage(source: ImageSource.gallery);
  if (image != null) {
    print('Selected image path: \${image.path}');
  } else {
    print('No image selected.');
  }
}`
    },
    quiz: [
      {
        id: 'q8-3-1',
        question: 'Which source parameter is passed to ImagePicker().pickImage() to capture a fresh photo from the hardware camera?',
        options: ['ImageSource.camera', 'ImageSource.gallery', 'ImageSource.device', 'ImageSource.live'],
        correctIndex: 0,
        explanation: 'ImageSource.camera triggers the native device camera capture application.'
      },
      {
        id: 'q8-3-2',
        question: 'What return type does pickImage() return?',
        options: ['Future<XFile?>', 'Image', 'String', 'Bitmap'],
        correctIndex: 0,
        explanation: 'pickImage returns a Future resolving to an XFile or null if the user cancelled.'
      },
      {
        id: 'q8-3-3',
        question: 'Which package is standard for accessing GPS device coordinates in Flutter?',
        options: ['geolocator', 'gps_finder', 'maps_coords', 'location_service'],
        correctIndex: 0,
        explanation: 'geolocator provides location services and geofencing capabilities.'
      },
      {
        id: 'q8-3-4',
        question: 'Where must Google Maps API keys be registered for an Android Flutter application?',
        options: [
          'Inside AndroidManifest.xml under <meta-data android:name="com.google.android.geo.API_KEY" />',
          'In index.html only',
          'In pubspec.yaml',
          'Inside README.md'
        ],
        correctIndex: 0,
        explanation: 'The Google Play Services Maps SDK reads the API key from AndroidManifest.xml meta-data.'
      },
      {
        id: 'q8-3-5',
        question: 'What is the danger of loading uncompressed mobile camera photos directly into memory?',
        options: [
          'It can cause Out-Of-Memory (OOM) app crashes due to high RAM consumption',
          'It makes the screen flicker green',
          'It deletes other photos',
          'Dart rejects files larger than 1MB'
        ],
        correctIndex: 0,
        explanation: 'High resolution images take up dozens of megabytes in uncompressed RGBA byte arrays.'
      }
    ]
  },
  {
    id: 'm8-l4',
    moduleId: 'module-8',
    title: 'Localization (i18n), Accessibility, Custom Fonts & App Flavors',
    description: 'Prepare your app for the global stage! Add multi-language support with ARB files (flutter_localizations), configure custom fonts in pubspec.yaml, ensure WCAG accessibility, and set up dev/prod app flavors.',
    order: 4,
    durationMinutes: 14,
    difficulty: 'Intermediate',
    prerequisites: ['Module 8 Lessons 1-3'],
    lastVerified: 'November 2026',
    goal: 'Translate an app into multiple languages with ARB files, configure local fonts in pubspec.yaml, use Semantics for screen readers, and understand build flavors.',
    simpleExplanation: `To make your app accessible to millions of global users:

### 1. Internationalization (\`i18n\`) with ARB Files
Instead of hardcoding strings like \`Text('Student Details')\`, declare translations in **Application Resource Bundle (\`.arb\`)** files:
- \`app_en.arb\`: \`"studentDetails": "Student Details", "grade": "Grade: {grade}"\`
- \`app_es.arb\`: \`"studentDetails": "Detalles del Estudiante", "grade": "Calificación: {grade}"\`
- \`app_hi.arb\`: \`"studentDetails": "छात्र विवरण", "grade": "ग्रेड: {grade}"\`
Usage: \`Text(AppLocalizations.of(context)!.studentDetails);\`

### 2. Custom Fonts
Declare fonts in \`pubspec.yaml\`:
\`\`\`yaml
flutter:
  fonts:
    - family: JetBrainsMono
      fonts:
        - asset: assets/fonts/JetBrainsMono-Regular.ttf
        - asset: assets/fonts/JetBrainsMono-Bold.ttf
          weight: 700
\`\`\`

### 3. Accessibility (\`Semantics\`)
Flutter supports TalkBack (Android) and VoiceOver (iOS) out of the box. Use the \`Semantics\` widget to provide custom audio descriptions for visual icons or charts:
\`\`\`dart
Semantics(
  label: 'Student scored Grade A+ with 95 marks out of 100',
  child: CustomPaint(...),
)
\`\`\`

### 4. App Flavors (Dev vs Staging vs Prod)
Allows having multiple variants of the app on the same phone (e.g. \`com.example.app.dev\` with a test database and \`com.example.app\` for real production).`,
    analogy: `Think of a world-class international airport:
- **Localization (i18n):** Flight destination signs that dynamically switch between English, Spanish, and Hindi.
- **Accessibility:** Tactile yellow floor tiles and voice announcements for visually impaired travelers.
- **Flavors:** The simulation flight simulator where rookie pilots train (Dev) vs the real Boeing 787 carrying passengers across the ocean (Production)!`,
    codeSnippet: `import 'package:flutter/material.dart';

// Demonstrating Semantics for Accessibility
class AccessibleStudentScore extends StatelessWidget {
  final String studentName;
  final String grade;
  final double marks;

  const AccessibleStudentScore({
    super.key,
    required this.studentName,
    required this.grade,
    required this.marks,
  });

  @override
  Widget build(BuildContext context) {
    // Semantics announces full descriptive text to TalkBack screen readers!
    return Semantics(
      label: 'Student \$studentName scored \$marks marks, receiving grade \$grade.',
      container: true,
      child: Card(
        child: ListTile(
          leading: ExcludeSemantics(
            // Exclude decorative icon from redundant screen reader announcement
            child: CircleAvatar(child: Text(grade)),
          ),
          title: Text(studentName),
          subtitle: Text('Score: \$marks / 100 • Grade \$grade'),
        ),
      ),
    );
  }
}`,
    dartPadCode: `// Sample ARB translation structure:
void main() {
  Map<String, Map<String, String>> translations = {
    "en": {"title": "Student Details", "submit": "Submit"},
    "es": {"title": "Detalles del Estudiante", "submit": "Entregar"},
    "hi": {"title": "छात्र विवरण", "submit": "जमा करें"}
  };

  print('English: \${translations["en"]!["title"]}');
  print('Spanish: \${translations["es"]!["title"]}');
  print('Hindi: \${translations["hi"]!["title"]}');
}`,
    dartPadType: 'dart',
    walkthroughSteps: [
      {
        step: 1,
        title: 'Enable generate: true in pubspec.yaml',
        description: 'Enables Flutter\'s built-in code generator for ARB localization files.'
      },
      {
        step: 2,
        title: 'Add supportedLocales to MaterialApp',
        description: 'Provide AppLocalizations.supportedLocales and localizationsDelegates.'
      },
      {
        step: 3,
        title: 'Use Semantics and ExcludeSemantics',
        description: 'Annotate visual elements for screen readers and exclude purely decorative shapes.'
      },
      {
        step: 4,
        title: 'Configure build flavors',
        description: 'Use productFlavors in android/app/build.gradle to build dev and prod variants.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Hardcoding English strings everywhere in the UI without an i18n setup.',
        fix: 'Use AppLocalizations.of(context)!.stringKey.',
        why: 'Refactoring 50 screens later to add multilingual support takes weeks of painful search-and-replace.'
      },
      {
        mistake: 'Forgetting to specify font assets in pubspec.yaml before using fontFamily.',
        fix: 'Declare fonts under flutter: fonts: in pubspec.yaml.',
        why: 'Flutter falls back to default system fonts if custom font assets are not registered.'
      }
    ],
    examAlerts: [
      'Exam Alert: "Which widget is used to provide screen reader accessibility information (for TalkBack/VoiceOver) in Flutter?" — Answer: The Semantics widget.',
      'Exam Alert: "What file format is standard for Flutter application localization translations?" — Answer: ARB (Application Resource Bundle) JSON files (.arb).'
    ],
    practiceTask: {
      task: 'Wrap an IconButton with an unlabelled icon of a star in a Semantics widget with label "Add to Favorites".',
      hint: 'Semantics(label: "Add to Favorites", button: true, child: IconButton(...))',
      solution: `Semantics(
  label: 'Add to Favorites',
  button: true,
  child: IconButton(
    icon: const Icon(Icons.star_border),
    onPressed: () {},
  ),
)`
    },
    quiz: [
      {
        id: 'q8-4-1',
        question: 'Which file format does Flutter officially use for localization translation dictionaries?',
        options: ['.arb (Application Resource Bundle)', '.po', '.strings', '.xml'],
        correctIndex: 0,
        explanation: 'Flutter uses .arb files, which are JSON-based and support plurals and placeholders.'
      },
      {
        id: 'q8-4-2',
        question: 'Which widget is used to supply auditory descriptions for screen readers (Android TalkBack)?',
        options: ['Semantics', 'AudioLabel', 'ReaderHelper', 'VoiceText'],
        correctIndex: 0,
        explanation: 'Semantics annotates the widget tree with accessibility descriptions.'
      },
      {
        id: 'q8-4-3',
        question: 'What is the purpose of "App Flavors" in Flutter/Android development?',
        options: [
          'Changing the color scheme at runtime',
          'Creating distinct build variants (e.g. dev, staging, prod) with separate bundle IDs and backend environments',
          'Testing phone speakers',
          'Compressing images'
        ],
        correctIndex: 1,
        explanation: 'Flavors enable multiple independent build configurations of the same app.'
      },
      {
        id: 'q8-4-4',
        question: 'Which widget hides purely decorative UI elements from being announced by screen readers?',
        options: ['ExcludeSemantics', 'HideWidget', 'IgnoreVoice', 'SilentBox'],
        correctIndex: 0,
        explanation: 'ExcludeSemantics prevents redundant or decorative widgets from cluttering screen readers.'
      },
      {
        id: 'q8-4-5',
        question: 'In which configuration file are custom local font TTF/OTF files declared in a Flutter project?',
        options: ['pubspec.yaml', 'AndroidManifest.xml', 'fonts.xml', 'build.gradle'],
        correctIndex: 0,
        explanation: 'Custom font families and asset paths are declared under the flutter: -> fonts: section in pubspec.yaml.'
      }
    ]
  }
];

