import React, { useState } from 'react';
import { Bug, CheckCircle2, AlertTriangle, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CodeBlock } from './CodeBlock';

interface BugPuzzle {
  id: string;
  title: string;
  errorName: string;
  badge: string;
  scenario: string;
  brokenCode: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  fixCode: string;
  whyExplanation: string;
}

const BUG_PUZZLES: BugPuzzle[] = [
  {
    id: 'bug-1',
    title: 'The Infamous "Yellow & Black Stripes" Crash',
    errorName: 'A RenderFlex overflowed by 48 pixels',
    badge: 'Beginner Trap #1',
    scenario: 'Your test device screen turns into yellow-and-black caution tape when keyboard opens or long text renders inside a Row/Column.',
    brokenCode: `Row(
  children: [
    Icon(Icons.person),
    // Crash occurs right here on smaller screens:
    Text('This is a very long customer bio that will exceed the available screen width!'),
  ],
)`,
    options: [
      {
        text: 'Wrap the Text widget in an Expanded or Flexible widget',
        isCorrect: true,
        feedback: 'Spot on! An Expanded widget constrains the Text to only take available remaining horizontal space and wrap into multiple lines.',
      },
      {
        text: 'Change the Row to a Column',
        isCorrect: false,
        feedback: 'Changing to Column changes the entire layout orientation, not the row overflow!',
      },
      {
        text: 'Decrease font size to 6px',
        isCorrect: false,
        feedback: 'Shrinking font size is a hack that breaks accessibility and still overflows on smaller devices.',
      },
    ],
    fixCode: `Row(
  children: [
    Icon(Icons.person),
    Expanded( // <-- Constrains text to remaining row width
      child: Text('This is a very long customer bio that wraps cleanly!'),
    ),
  ],
)`,
    whyExplanation: 'Rows and Columns provide infinite unconstrained width/height to children by default. Wrapping unbounded widgets in Expanded tells the layout engine: "Take whatever space is left and don\'t push past the screen boundary."',
  },
  {
    id: 'bug-2',
    title: 'The Vertical Viewport Unbounded Height Crash',
    errorName: 'Vertical viewport was given unbounded height',
    badge: 'Exam Critical',
    scenario: 'You put a ListView.builder inside a Column and your app crashes with a solid red screen of death on startup.',
    brokenCode: `Column(
  children: [
    Text('My Task List'),
    // Red screen layout crash occurs here:
    ListView.builder(
      itemCount: tasks.length,
      itemBuilder: (context, i) => ListTile(title: Text(tasks[i])),
    ),
  ],
)`,
    options: [
      {
        text: 'Wrap the ListView.builder with Expanded or set shrinkWrap: true',
        isCorrect: true,
        feedback: 'Correct! Column has infinite height, and ListView also wants infinite height. Expanded gives the ListView a bounded viewport size.',
      },
      {
        text: 'Replace ListView.builder with SingleChildScrollView',
        isCorrect: false,
        feedback: 'SingleChildScrollView alone inside Column still produces unbounded vertical constraints for dynamic builders.',
      },
      {
        text: 'Change the ListView physics to BouncingScrollPhysics',
        isCorrect: false,
        feedback: 'Physics only controls how scrolling feels after boundaries are established, not layout constraints.',
      },
    ],
    fixCode: `Column(
  children: [
    Text('My Task List'),
    Expanded( // <-- Gives ListView bounded available vertical space
      child: ListView.builder(
        itemCount: tasks.length,
        itemBuilder: (context, i) => ListTile(title: Text(tasks[i])),
      ),
    ),
  ],
)`,
    whyExplanation: 'A Column has infinite height. A ListView wants infinite height. Two infinite heights colliding causes a layout crash. Expanded assigns a fixed boundary, allowing ListView to recycle off-screen items smoothly.',
  },
  {
    id: 'bug-3',
    title: 'The Infinite Rebuild Loop Trap',
    errorName: 'setState() or markNeedsBuild() called during build',
    badge: 'State Trap',
    scenario: 'You want to fetch data when the screen loads, but your app throws an exception complaining build() is already running.',
    brokenCode: `@override
Widget build(BuildContext context) {
  // CRASH: Calling state modification inside build!
  if (items.isEmpty) {
    setState(() {
      items = ['Item 1', 'Item 2'];
    });
  }
  return Text('Items: \${items.length}');
}`,
    options: [
      {
        text: 'Move the state initialization into initState() or an event handler',
        isCorrect: true,
        feedback: 'Boom! initState() runs once before the first build frame paints, making it the proper place for initial data loading.',
      },
      {
        text: 'Call notifyListeners() instead of setState()',
        isCorrect: false,
        feedback: 'Calling notifyListeners during build creates the exact same rebuild loop error.',
      },
      {
        text: 'Remove the if condition',
        isCorrect: false,
        feedback: 'Removing the if condition causes setState to fire continuously 60 times a second!',
      },
    ],
    fixCode: `@override
void initState() {
  super.initState();
  // Safe initialization before the first frame renders
  items = ['Item 1', 'Item 2'];
}

@override
Widget build(BuildContext context) {
  return Text('Items: \${items.length}');
}`,
    whyExplanation: 'Flutter paints pixels in passes. If you mutate state inside build(), it tells Flutter "repaint right now", which triggers build() again, creating an infinite loop.',
  },
];

export const BugHunterWidget: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const puzzle = BUG_PUZZLES[currentIdx];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    if (puzzle.options[idx].isCorrect) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowSolution(false);
    setCurrentIdx((prev) => (prev + 1) % BUG_PUZZLES.length);
  };

  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && puzzle.options[selectedOption].isCorrect;

  return (
    <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#180a0a] via-[#1a0f12] to-[#0f172a] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30">
            <Bug className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono">
                Interactive Bug Hunter Mini-Lab
              </span>
              <span className="rounded-full bg-red-950 px-2 py-0.5 text-[9px] font-bold text-red-300 border border-red-800">
                Puzzle {currentIdx + 1} of {BUG_PUZZLES.length}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              {puzzle.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
          >
            <span>Next Bug</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Broken Code Scenario */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-red-900/50 bg-red-950/40 p-4 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-red-400 font-mono font-bold">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>Crash: {puzzle.errorName}</span>
            </div>
            <p className="text-neutral-300 leading-relaxed pt-1">
              {puzzle.scenario}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Broken Snippet</span>
              <span className="text-red-400">Causes Red Screen</span>
            </div>
            <CodeBlock
              code={puzzle.brokenCode}
              language="dart"
              title="broken_widget.dart"
            />
          </div>
        </div>

        {/* Right: Interactive Fix Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
              How would you fix this in production?
            </h4>

            <div className="space-y-2.5">
              {puzzle.options.map((opt, oIdx) => {
                const isThisSelected = selectedOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${
                      isThisSelected
                        ? opt.isCorrect
                          ? 'border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500'
                          : 'border-red-500 bg-red-950/60 text-white ring-1 ring-red-500'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60'
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300 font-mono mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Solution Toggle */}
          {isAnswered && (
            <div
              className={`rounded-2xl p-4 text-xs space-y-2 border ${
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200'
                  : 'border-red-500/40 bg-red-950/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                )}
                <span>{isCorrect ? 'Correct Fix Identified! 🎉' : 'Not quite right — Try again!'}</span>
              </div>
              <p className="leading-relaxed opacity-90">
                {puzzle.options[selectedOption].feedback}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="font-bold underline text-xs hover:opacity-80"
                >
                  {showSolution ? 'Hide Working Solution' : 'View Verified Solution Code & Why It Works →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Solution Code */}
      {showSolution && (
        <div className="mt-6 pt-6 border-t border-neutral-800 space-y-4 animate-in fade-in">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Verified Solution Code
            </h5>
            <CodeBlock code={puzzle.fixCode} language="dart" title="clean_solution.dart" />
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4 text-xs text-sky-200 leading-relaxed">
            <span className="font-bold text-white">Why This Fix Works: </span>
            {puzzle.whyExplanation}
          </div>
        </div>
      )}
    </div>
  );
};
