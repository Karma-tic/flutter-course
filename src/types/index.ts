export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type FreeStatus = 'Free' | 'Free to audit' | 'Freemium';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WalkthroughStep {
  step: number;
  title: string;
  description: string;
}

export interface CommonMistake {
  mistake: string;
  fix: string;
  why: string;
}

export interface PracticeTask {
  task: string;
  hint: string;
  solution: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  lastVerified: string;
  goal: string;
  simpleExplanation: string;
  analogy: string;
  codeSnippet: string;
  codeLanguage?: string;
  dartPadCode?: string;
  dartPadType?: 'dart' | 'flutter';
  walkthroughSteps: WalkthroughStep[];
  commonMistakes: CommonMistake[];
  examAlerts: string[];
  tips?: string[];
  warnings?: string[];
  practiceTask: PracticeTask;
  quiz?: QuizQuestion[];
  quizQuestions?: QuizQuestion[];
}

export interface LessonSummary {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  order: number;
  hasExamAlert?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  lessons: LessonSummary[];
  examFocus?: boolean;
}

export interface CustomExamTopic {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  addedAt: string;
}

export interface MockTestResult {
  testId: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, number>; // lessonId -> percentage
  lastVisitedLesson: string | null;
  lastVisitedLessonId?: string | null;
  bookmarks: string[];
  notes: Record<string, string>; // lessonId -> user note
  customExamTopics: string[]; // List of topic names or IDs
  mockTestScores: Record<string, number>; // testId -> percentage
  studyPlanHoursPerDay: number;
  studyPlanDailyHours?: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  category: string;
  level: DifficultyLevel | 'All Levels';
  freeStatus: FreeStatus;
  whyGood: string;
  lastVerified: string;
  tags: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  cost: string;
  isCertificateFree: boolean;
  timeEstimate: string;
  recognition: string;
  link: string;
  verdict: string;
}

export interface DartProblemItem {
  id: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  description: string;
  starterCode: string;
  solutionDart: string;
  solutionKotlin?: string;
  explanation: string;
}

export interface DiscountProblemItem {
  id: string;
  title: string;
  type: string;
  problemStatement: string;
  formula: string;
  dartCode: string;
  kotlinCode: string;
  sampleInputOutput: string;
}

export interface AndroidTheoryItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  examImportance: 'Critical' | 'High' | 'Medium';
}

export interface FlutterInterviewItem {
  id: string;
  level: DifficultyLevel;
  category: string;
  question: string;
  answer: string;
}

export interface MockTestItem {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface FlashcardItem {
  id: string;
  category: string;
  front: string;
  back: string;
  codeSnippet?: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Flutter' | 'Dart' | 'Android' | 'General';
  definition: string;
  analogyOrTip?: string;
}
