import { Lesson, Module } from '../../types';
import { modulesData } from './modules';
import { module0Lessons } from './module0';
import { module1Lessons } from './module1';
import { module2Lessons } from './module2';
import { module3Lessons } from './module3';
import { module4Lessons } from './module4';
import { module5Lessons } from './module5';
import { module6Lessons } from './module6';
import { module7Lessons } from './module7';
import { module8Lessons } from './module8';
import { module9Lessons } from './module9';
import { module10Lessons } from './module10';

export const allModules: Module[] = modulesData;

export const allLessons: Lesson[] = [
  ...module0Lessons,
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
  ...module7Lessons,
  ...module8Lessons,
  ...module9Lessons,
  ...module10Lessons,
];

export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find((l) => l.id === id);
};

export const getModuleById = (moduleId: string): Module | undefined => {
  return allModules.find((m) => m.id === moduleId);
};

export const getLessonsForModule = (moduleId: string): Lesson[] => {
  return allLessons.filter((l) => l.moduleId === moduleId);
};

export const getNextAndPrevLesson = (currentLessonId: string) => {
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prev, next };
};

export const searchLessons = (query: string): Lesson[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  return allLessons.filter((lesson) => {
    return (
      lesson.title.toLowerCase().includes(q) ||
      lesson.description.toLowerCase().includes(q) ||
      lesson.goal.toLowerCase().includes(q) ||
      lesson.simpleExplanation.toLowerCase().includes(q) ||
      lesson.examAlerts.some((a) => a.toLowerCase().includes(q))
    );
  });
};
