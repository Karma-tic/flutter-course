export interface ExamProjectSection {
  title: string;
  flutterCode: string;
  kotlinCode: string;
  xmlCode: string;
  lineByLineExplanation: { lineRef: string; flutterExplanation: string; androidExplanation: string }[];
  gradeTableRules: { range: string; grade: string; remarks: string }[];
}

export const studentDetailsExamProject: ExamProjectSection = {
  title: 'Student Details & Grade Calculation App (Master Exam Project)',
  gradeTableRules: [
    { range: '90.0 to 100.0', grade: 'A+', remarks: 'Outstanding Distinction' },
    { range: '80.0 to 89.9', grade: 'A', remarks: 'Excellent' },
    { range: '70.0 to 79.9', grade: 'B', remarks: 'Very Good' },
    { range: '60.0 to 69.9', grade: 'C', remarks: 'Good' },
    { range: '50.0 to 59.9', grade: 'D', remarks: 'Satisfactory Pass' },
    { range: 'Below 50.0', grade: 'F', remarks: 'Failed (Must Reappear)' },
  ],
  flutterCode: `import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: StudentExamApp()));

class StudentExamApp extends StatefulWidget {
  const StudentExamApp({super.key});

  @override
  State<StudentExamApp> createState() => _StudentExamAppState();
}

class _StudentExamAppState extends State<StudentExamApp> {
  // 1. Form key for validation
  final _formKey = GlobalKey<FormState>();

  // 2. Controllers (Android EditText equivalent)
  final _nameController = TextEditingController();
  final _rollController = TextEditingController();
  final _marksController = TextEditingController();

  // 3. Dropdown items (Android Spinner equivalent)
  final List<String> _courses = [
    'Flutter Mobile App Development',
    'Native Android (Kotlin)',
    'Cloud Computing & DevOps',
    'Data Science & AI',
  ];

  String? _selectedCourse;
  String? _resultDisplay;
  bool _isSubmitted = false;

  @override
  void dispose() {
    _nameController.dispose();
    _rollController.dispose();
    _marksController.dispose();
    super.dispose();
  }

  // 4. Grade Calculation Logic
  String _calculateGrade(double marks) {
    if (marks >= 90.0) return 'A+';
    if (marks >= 80.0) return 'A';
    if (marks >= 70.0) return 'B';
    if (marks >= 60.0) return 'C';
    if (marks >= 50.0) return 'D';
    return 'F';
  }

  void _submitForm() {
    // Validate all fields
    if (_formKey.currentState!.validate()) {
      final name = _nameController.text.trim();
      final roll = _rollController.text.trim();
      final marks = double.parse(_marksController.text.trim());
      final course = _selectedCourse!;
      final grade = _calculateGrade(marks);

      setState(() {
        _isSubmitted = true;
        _resultDisplay = """
Student Name: \$name
Roll Number: \$roll
Selected Course: \$course
Marks Scored: \$marks / 100.0
Calculated Grade: \$grade
Status: \${marks >= 50 ? 'PASSED ✅' : 'FAILED ❌'}
""";
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Details Submitted! Grade: \$grade'),
          backgroundColor: marks >= 50 ? Colors.green.shade700 : Colors.red.shade700,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Details & Grade Portal'),
        backgroundColor: Colors.blue.shade800,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Name Field (EditText)
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Student Name *',
                  hintText: 'Enter student name',
                  prefixIcon: Icon(Icons.person),
                  border: OutlineInputBorder(),
                ),
                validator: (val) =>
                    (val == null || val.trim().isEmpty) ? 'Please enter student name' : null,
              ),
              const SizedBox(height: 16),

              // Roll Number Field (EditText)
              TextFormField(
                controller: _rollController,
                decoration: const InputDecoration(
                  labelText: 'Roll Number *',
                  hintText: 'e.g. 101 or CS-2026',
                  prefixIcon: Icon(Icons.badge),
                  border: OutlineInputBorder(),
                ),
                validator: (val) =>
                    (val == null || val.trim().isEmpty) ? 'Please enter roll number' : null,
              ),
              const SizedBox(height: 16),

              // Course Dropdown (Spinner)
              DropdownButtonFormField<String>(
                value: _selectedCourse,
                decoration: const InputDecoration(
                  labelText: 'Select Course *',
                  prefixIcon: Icon(Icons.school),
                  border: OutlineInputBorder(),
                ),
                hint: const Text('Choose course...'),
                items: _courses.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (val) => setState(() => _selectedCourse = val),
                validator: (val) =>
                    (val == null || val.isEmpty) ? 'Please select a course' : null,
              ),
              const SizedBox(height: 16),

              // Marks Field (EditText with range 0-100)
              TextFormField(
                controller: _marksController,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                decoration: const InputDecoration(
                  labelText: 'Marks (0 - 100) *',
                  hintText: 'Enter marks',
                  prefixIcon: Icon(Icons.score),
                  border: OutlineInputBorder(),
                ),
                validator: (val) {
                  if (val == null || val.trim().isEmpty) return 'Please enter marks';
                  final m = double.tryParse(val.trim());
                  if (m == null) return 'Marks must be a valid number';
                  if (m < 0.0 || m > 100.0) return 'Marks must be between 0 and 100';
                  return null;
                },
              ),
              const SizedBox(height: 20),

              // Submit Button
              ElevatedButton.icon(
                onPressed: _submitForm,
                icon: const Icon(Icons.send),
                label: const Text('Submit Details', style: TextStyle(fontSize: 16)),
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size.fromHeight(50),
                  backgroundColor: Colors.blue.shade800,
                  foregroundColor: Colors.white,
                ),
              ),

              const SizedBox(height: 24),

              // Result Display (TextView Equivalent)
              if (_isSubmitted && _resultDisplay != null) ...[
                const Text('Submitted Student Details (TextView Display):',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 8),
                Card(
                  color: Colors.blue.shade50,
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      _resultDisplay!,
                      style: const TextStyle(fontSize: 15, height: 1.6, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}`,
  kotlinCode: `package com.example.studentcourseapp

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Initialize Views by ID
        val etName = findViewById<EditText>(R.id.etStudentName)
        val etRoll = findViewById<EditText>(R.id.etRollNumber)
        val etMarks = findViewById<EditText>(R.id.etMarks)
        val spinnerCourse = findViewById<Spinner>(R.id.spinnerCourse)
        val btnSubmit = findViewById<Button>(R.id.btnSubmit)
        val tvResult = findViewById<TextView>(R.id.tvResult)

        // 2. Populate Spinner using ArrayAdapter
        val courses = arrayOf(
            "Flutter Mobile App Development",
            "Native Android (Kotlin)",
            "Cloud Computing & DevOps",
            "Data Science & AI"
        )
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, courses)
        spinnerCourse.adapter = adapter

        // 3. Set Submit Button Click Listener
        btnSubmit.setOnClickListener {
            val name = etName.text.toString().trim()
            val roll = etRoll.text.toString().trim()
            val marksStr = etMarks.text.toString().trim()
            val selectedCourse = spinnerCourse.selectedItem.toString()

            // 4. Validate That No Field is Empty (EXAM REQUIREMENT)
            if (name.isEmpty()) {
                etName.error = "Student name cannot be empty"
                etName.requestFocus()
                return@setOnClickListener
            }
            if (roll.isEmpty()) {
                etRoll.error = "Roll number cannot be empty"
                etRoll.requestFocus()
                return@setOnClickListener
            }
            if (marksStr.isEmpty()) {
                etMarks.error = "Marks cannot be empty"
                etMarks.requestFocus()
                return@setOnClickListener
            }

            // 5. Validate Marks Range (0 - 100)
            val marks = marksStr.toDoubleOrNull()
            if (marks == null || marks < 0.0 || marks > 100.0) {
                etMarks.error = "Marks must be between 0 and 100"
                etMarks.requestFocus()
                return@setOnClickListener
            }

            // 6. Calculate Grade
            val grade = when {
                marks >= 90.0 -> "A+"
                marks >= 80.0 -> "A"
                marks >= 70.0 -> "B"
                marks >= 60.0 -> "C"
                marks >= 50.0 -> "D"
                else -> "F"
            }

            val status = if (marks >= 50.0) "PASSED ✅" else "FAILED ❌"

            // 7. Display All Details in TextView
            val resultSummary = """
                === Student Details ===
                Name: $name
                Roll Number: $roll
                Course: $selectedCourse
                Marks: $marks / 100.0
                Grade: $grade
                Status: $status
            """.trimIndent()

            tvResult.text = resultSummary
            Toast.makeText(this, "Submitted! Grade: $grade", Toast.LENGTH_SHORT).show()
        }
    }
}`,
  xmlCode: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <!-- Title -->
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Student Registration &amp; Grade Portal"
            android:textSize="20sp"
            android:textStyle="bold"
            android:textColor="#02569B"
            android:layout_marginBottom="16dp" />

        <!-- Student Name (EditText) -->
        <EditText
            android:id="@+id/etStudentName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Student Full Name"
            android:inputType="textPersonName"
            android:layout_marginBottom="12dp" />

        <!-- Roll Number (EditText) -->
        <EditText
            android:id="@+id/etRollNumber"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Roll Number (e.g. 101)"
            android:inputType="text"
            android:layout_marginBottom="12dp" />

        <!-- Course Label & Spinner (Dropdown) -->
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Select Course:"
            android:textStyle="bold"
            android:layout_marginBottom="4dp" />

        <Spinner
            android:id="@+id/spinnerCourse"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="12dp" />

        <!-- Marks (EditText) -->
        <EditText
            android:id="@+id/etMarks"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Marks Scored (0 - 100)"
            android:inputType="numberDecimal"
            android:layout_marginBottom="16dp" />

        <!-- Submit Button -->
        <Button
            android:id="@+id/btnSubmit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Submit Details"
            android:backgroundTint="#02569B"
            android:textColor="#FFFFFF" />

        <!-- Output Result TextView -->
        <TextView
            android:id="@+id/tvResult"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:textSize="16sp"
            android:lineSpacingExtra="4dp"
            android:textStyle="bold"
            android:textColor="#1E293B" />

    </LinearLayout>
</ScrollView>`,
  lineByLineExplanation: [
    {
      lineRef: 'Inputs (Name, Roll, Marks)',
      flutterExplanation: 'TextFormField bound to TextEditingController. Configured with InputDecoration and validator callback.',
      androidExplanation: 'EditText in XML with android:id="@+id/et...". Found in Kotlin via findViewById<EditText>(R.id.et...). Text read via et.text.toString().trim().',
    },
    {
      lineRef: 'Course Selection (Dropdown)',
      flutterExplanation: 'DropdownButtonFormField<String> taking DropdownMenuItem list, managing selected state in _selectedCourse.',
      androidExplanation: 'Spinner in XML. Populated using ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, coursesArray). Selected item read via spinner.selectedItem.toString().',
    },
    {
      lineRef: 'Empty Field Validations',
      flutterExplanation: '_formKey.currentState!.validate() triggers validator: (val) => val.isEmpty ? "Error" : null on all fields.',
      androidExplanation: 'if (name.isEmpty()) { etName.error = "Error"; etName.requestFocus(); return; }',
    },
    {
      lineRef: 'Marks Range Validation (0-100)',
      flutterExplanation: 'double.tryParse(val) safely parses; if (m < 0 || m > 100) returns error string.',
      androidExplanation: 'val marks = marksStr.toDoubleOrNull(); if (marks == null || marks < 0 || marks > 100) sets etMarks.error.',
    },
    {
      lineRef: 'Result Display',
      flutterExplanation: 'Declaratively renders a Card containing Text widgets when _isSubmitted is true.',
      androidExplanation: 'tvResult.text = resultSummary sets the string directly onto the TextView in Kotlin.',
    },
  ],
};

