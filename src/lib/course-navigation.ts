import { lessons } from '@/data/lessons';
import { modules } from '@/data/modules';
import { getSafeCompletedLessons } from '@/lib/progress';

export function getModuleBySlug(moduleSlug: string) {
  return modules.find((moduleItem) => moduleItem.slug === moduleSlug);
}

function lessonBelongsToModule(moduleSlug: string, lessonSlug: string) {
  const moduleItem = getModuleBySlug(moduleSlug);
  if (!moduleItem) return false;

  return moduleItem.lessons.includes(lessonSlug);
}

export function getLessonsByModuleSlug(moduleSlug: string) {
  const moduleItem = getModuleBySlug(moduleSlug);
  if (!moduleItem) return [];

  const lessonBySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));

  return moduleItem.lessons
    .map((lessonSlug) => lessonBySlug.get(lessonSlug))
    .filter((lesson): lesson is (typeof lessons)[number] => Boolean(lesson));
}

export function getLessonInModule(moduleSlug: string, lessonSlug: string) {
  if (!lessonBelongsToModule(moduleSlug, lessonSlug)) return null;

  const lesson = lessons.find((lessonItem) => lessonItem.slug === lessonSlug);
  if (!lesson) return null;

  const moduleItem = getModuleBySlug(moduleSlug);
  if (!moduleItem) return null;

  return lesson.moduleId === moduleItem.id ? lesson : null;
}

export function getLessonNavigation(moduleSlug: string, lessonSlug: string) {
  const moduleLessons = getLessonsByModuleSlug(moduleSlug);
  const lessonIndex = moduleLessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (lessonIndex === -1) {
    return { previousLessonSlug: undefined, nextLessonSlug: undefined };
  }

  return {
    previousLessonSlug: moduleLessons[lessonIndex - 1]?.slug,
    nextLessonSlug: moduleLessons[lessonIndex + 1]?.slug,
  };
}

export function getModuleContinueLessonHref(moduleSlug: string, completedLessons: string[] = []) {
  const moduleLessons = getLessonsByModuleSlug(moduleSlug);

  if (moduleLessons.length === 0) {
    return `/trilha/${moduleSlug}`;
  }

  const completed = new Set(getSafeCompletedLessons(completedLessons));
  const firstIncompleteLesson = moduleLessons.find((lesson) => !completed.has(lesson.slug));

  if (firstIncompleteLesson) {
    return `/trilha/${moduleSlug}/aulas/${firstIncompleteLesson.slug}`;
  }

  const lastLesson = moduleLessons[moduleLessons.length - 1];
  return `/trilha/${moduleSlug}/aulas/${lastLesson.slug}`;
}
