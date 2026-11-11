import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProgressState, MockTestResult } from '../types';

const STORAGE_KEY = 'flutter_course_progress_v1';

const defaultState: ProgressState = {
  completedLessons: [],
  quizScores: {},
  lastVisitedLesson: null,
  lastVisitedLessonId: null,
  bookmarks: [],
  notes: {},
  customExamTopics: [],
  mockTestScores: {},
  studyPlanHoursPerDay: 2,
  studyPlanDailyHours: 2,
};

export interface ProgressContextType {
  state: ProgressState;
  progress: ProgressState;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleLessonComplete: (lessonId: string) => void;
  markLessonComplete: (lessonId: string) => void;
  unmarkLessonComplete: (lessonId: string) => void;
  recordQuizScore: (lessonId: string, percentage: number) => void;
  saveQuizScore: (lessonId: string, percentage: number) => void;
  setLastVisited: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
  saveNote: (lessonId: string, note: string) => void;
  getNote: (lessonId: string) => string;
  toggleExamChecklistTopic: (topicTitle: string) => void;
  recordMockTestScore: (result: MockTestResult) => void;
  saveMockTestScore: (testId: string, percentage: number) => void;
  setStudyPlanHours: (hours: number) => void;
  setDailyStudyHours: (hours: number) => void;
  resetProgress: () => void;
  exportProgressJSON: () => string;
  importProgressJSON: (jsonString: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          lastVisitedLessonId: parsed.lastVisitedLessonId || parsed.lastVisitedLesson || null,
          studyPlanDailyHours: parsed.studyPlanDailyHours || parsed.studyPlanHoursPerDay || 2,
          customExamTopics: Array.isArray(parsed.customExamTopics) ? parsed.customExamTopics : [],
          mockTestScores: typeof parsed.mockTestScores === 'object' && !Array.isArray(parsed.mockTestScores) ? parsed.mockTestScores : {},
        };
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [state]);

  const isLessonCompleted = (lessonId: string) => {
    return state.completedLessons.includes(lessonId);
  };

  const markLessonComplete = (lessonId: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const unmarkLessonComplete = (lessonId: string) => {
    setState((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
    }));
  };

  const toggleLessonComplete = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
      };
    });
  };

  const recordQuizScore = (lessonId: string, percentage: number) => {
    setState((prev) => {
      const updatedScores = {
        ...prev.quizScores,
        [lessonId]: Math.max(prev.quizScores[lessonId] || 0, percentage),
      };
      const shouldComplete = percentage >= 60 && !prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        quizScores: updatedScores,
        completedLessons: shouldComplete
          ? [...prev.completedLessons, lessonId]
          : prev.completedLessons,
      };
    });
  };

  const setLastVisited = (lessonId: string) => {
    setState((prev) => ({
      ...prev,
      lastVisitedLesson: lessonId,
      lastVisitedLessonId: lessonId,
    }));
  };

  const toggleBookmark = (lessonId: string): boolean => {
    let nowBookmarked = false;
    setState((prev) => {
      const exists = prev.bookmarks.includes(lessonId);
      nowBookmarked = !exists;
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((id) => id !== lessonId)
          : [...prev.bookmarks, lessonId],
      };
    });
    return nowBookmarked;
  };

  const isBookmarked = (lessonId: string) => {
    return state.bookmarks.includes(lessonId);
  };

  const saveNote = (lessonId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: note,
      },
    }));
  };

  const getNote = (lessonId: string): string => {
    return state.notes[lessonId] || '';
  };

  const toggleExamChecklistTopic = (topicTitle: string) => {
    setState((prev) => {
      const exists = prev.customExamTopics.includes(topicTitle);
      return {
        ...prev,
        customExamTopics: exists
          ? prev.customExamTopics.filter((t) => t !== topicTitle)
          : [...prev.customExamTopics, topicTitle],
      };
    });
  };

  const saveMockTestScore = (testId: string, percentage: number) => {
    setState((prev) => ({
      ...prev,
      mockTestScores: {
        ...prev.mockTestScores,
        [testId]: Math.max(prev.mockTestScores[testId] || 0, percentage),
      },
    }));
  };

  const recordMockTestScore = (result: MockTestResult) => {
    saveMockTestScore(result.testId, result.percentage);
  };

  const setStudyPlanHours = (hours: number) => {
    setState((prev) => ({
      ...prev,
      studyPlanHoursPerDay: Math.max(1, Math.min(12, hours)),
      studyPlanDailyHours: Math.max(1, Math.min(12, hours)),
    }));
  };

  const resetProgress = () => {
    setState({ ...defaultState });
  };

  const exportProgressJSON = (): string => {
    return JSON.stringify(state, null, 2);
  };

  const importProgressJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        setState({
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          quizScores: typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
          lastVisitedLesson: parsed.lastVisitedLesson || parsed.lastVisitedLessonId || null,
          lastVisitedLessonId: parsed.lastVisitedLessonId || parsed.lastVisitedLesson || null,
          bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
          notes: typeof parsed.notes === 'object' ? parsed.notes : {},
          customExamTopics: Array.isArray(parsed.customExamTopics) ? parsed.customExamTopics : [],
          mockTestScores: typeof parsed.mockTestScores === 'object' ? parsed.mockTestScores : {},
          studyPlanHoursPerDay: typeof parsed.studyPlanHoursPerDay === 'number' ? parsed.studyPlanHoursPerDay : 2,
          studyPlanDailyHours: typeof parsed.studyPlanDailyHours === 'number' ? parsed.studyPlanDailyHours : (parsed.studyPlanHoursPerDay || 2),
        });
        return true;
      }
    } catch (e) {
      console.error('Failed to parse imported JSON', e);
    }
    return false;
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        progress: state,
        isLessonCompleted,
        toggleLessonComplete,
        markLessonComplete,
        unmarkLessonComplete,
        recordQuizScore,
        saveQuizScore: recordQuizScore,
        setLastVisited,
        toggleBookmark,
        isBookmarked,
        saveNote,
        getNote,
        toggleExamChecklistTopic,
        recordMockTestScore,
        saveMockTestScore,
        setStudyPlanHours,
        setDailyStudyHours: setStudyPlanHours,
        resetProgress,
        exportProgressJSON,
        importProgressJSON,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
