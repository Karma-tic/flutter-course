// What this site adds to each roadmap stage: practice tools and optional notes.
export type StageExtra = {
  practice: { to: string; title: string; text: string }[];
  notes: { to: string; title: string }[];
};

export const stageExtras: StageExtra[] = [
  {
    practice: [
      { to: '/practice', title: 'Practice lab', text: 'Dart puzzles and bug hunts that test what you just learned.' },
    ],
    notes: [
      { to: '/course/m0-l1', title: 'Start here: setup and first app' },
      { to: '/course/m1-l1', title: 'Dart fundamentals' },
    ],
  },
  {
    practice: [
      { to: '/cheat-sheets', title: 'Widget cheat sheets', text: 'Layout, widget and theming references to keep open while you build.' },
    ],
    notes: [{ to: '/course/m2-l1', title: 'Flutter UI basics' }],
  },
  {
    practice: [
      { to: '/crud-lab', title: 'CRUD lab', text: 'Build the student details app step by step in an in-browser phone simulator.' },
      { to: '/exam-prep', title: 'Validation recipes', text: 'Empty, email, phone and marks range checks that company exams ask for.' },
    ],
    notes: [
      { to: '/course/m3-l1', title: 'Inputs, forms and validation' },
      { to: '/course/m4-l1', title: 'Lists, grids and navigation' },
      { to: '/course/m5-l1', title: 'State management' },
    ],
  },
  {
    practice: [
      { to: '/practice', title: 'Practice lab projects', text: 'Weather, notes and storefront projects with specs to build against.' },
    ],
    notes: [{ to: '/course/m6-l1', title: 'Data and networking' }],
  },
  {
    practice: [
      { to: '/resources', title: 'Packages and tools', text: 'The packages and developer tools worth knowing, with when to use each.' },
    ],
    notes: [
      { to: '/course/m8-l1', title: 'Animations, media and polish' },
      { to: '/course/m9-l1', title: 'Testing, performance and release' },
    ],
  },
  {
    practice: [
      { to: '/exam-prep', title: 'Timed mock tests', text: 'Company-style mock exams, a question bank, interview Q&A and a revision plan.' },
      { to: '/glossary', title: 'Glossary', text: 'Every term you will hear in interviews, explained plainly.' },
    ],
    notes: [
      { to: '/course/m7-l1', title: 'Android core in Flutter' },
      { to: '/course/m10-l1', title: 'Guided real-world projects' },
    ],
  },
];
