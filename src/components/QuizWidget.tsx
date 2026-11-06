import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { useProgress } from '../context/ProgressContext';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight } from 'lucide-react';

interface QuizWidgetProps {
  lessonId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export const QuizWidget: React.FC<QuizWidgetProps> = ({
  lessonId,
  questions,
  onComplete,
}) => {
  const { markLessonComplete, saveQuizScore, progress } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const prevScore = progress.quizScores[lessonId];

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setSubmitted(true);
    saveQuizScore(lessonId, score);
    if (score >= 70) {
      markLessonComplete(lessonId);
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
  };

  const currentQ = questions[currentIndex];
  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const currentScore = submitted ? calculateScore() : 0;
  const passed = currentScore >= 70;

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-flutter-500/10 text-flutter-600 dark:text-flutter-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Concept Check Quiz
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Test your understanding (Score 70%+ to auto-mark this lesson complete)
            </p>
          </div>
        </div>

        {prevScore !== undefined && !submitted && (
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            Previous Best: {prevScore}%
          </span>
        )}
      </div>

      {/* Quiz Body */}
      {!submitted ? (
        <div className="mt-5 space-y-6">
          {/* Progress Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-flutter-600 text-white shadow-xs'
                      : isAnswered
                      ? 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
                      : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800/60 dark:text-neutral-500'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Text */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-flutter-600 dark:text-flutter-400 mb-1">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentIndex, optIdx)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${
                    isSelected
                      ? 'border-flutter-600 bg-flutter-50/50 text-neutral-900 ring-2 ring-flutter-500/20 dark:border-flutter-500 dark:bg-flutter-950/30 dark:text-neutral-100'
                      : 'border-neutral-200 bg-neutral-50/40 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      isSelected
                        ? 'border-flutter-600 bg-flutter-600 text-white dark:border-flutter-500'
                        : 'border-neutral-300 text-neutral-500 dark:border-neutral-700'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-400"
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="flex items-center gap-1 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="rounded-lg bg-flutter-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-flutter-700 disabled:opacity-40"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="mt-5 space-y-6">
          <div
            className={`rounded-2xl p-5 text-center ${
              passed
                ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200'
                : 'bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-200'
            }`}
          >
            <div className="text-3xl font-extrabold">{currentScore}%</div>
            <div className="mt-1 text-sm font-semibold">
              {passed
                ? '🎉 Excellent work! Lesson auto-marked as complete.'
                : 'Keep going! Review the explanations below and try again to pass (70%).'}
            </div>
            <div className="mt-2 text-xs opacity-80">
              You answered{' '}
              {
                questions.filter(
                  (q, idx) => selectedAnswers[idx] === q.correctIndex
                ).length
              }{' '}
              of {questions.length} questions correctly.
            </div>
          </div>

          {/* Breakdown with explanations */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Detailed Question Review
            </h5>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 text-xs transition ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                      : 'border-red-200 bg-red-50/30 dark:border-red-900/40 dark:bg-red-950/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-1">
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {idx + 1}. {q.question}
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Your answer:{' '}
                        <span className={isCorrect ? 'font-medium text-emerald-700 dark:text-emerald-300' : 'font-medium text-red-700 dark:text-red-300'}>
                          {userAns !== undefined ? q.options[userAns] : 'None'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-800 dark:text-emerald-300 font-medium">
                          Correct answer: {q.options[q.correctIndex]}
                        </div>
                      )}
                      <div className="mt-2 rounded-lg bg-neutral-100/70 p-2.5 text-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300">
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                          Why:
                        </span>{' '}
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
