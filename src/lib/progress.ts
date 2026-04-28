import { lessons } from '@/data/lessons';
import { modules } from '@/data/modules';

export function getSafeCompletedLessons(completedLessons: string[] = []) {
  const validLessonSlugs = new Set(lessons.map((lesson) => lesson.slug));
  return Array.from(new Set(completedLessons.filter((slug) => validLessonSlugs.has(slug))));
}

export function getOverallProgress(completedLessons: string[] = []) {
  const completedCount = getSafeCompletedLessons(completedLessons).length;
  const totalLessons = lessons.length;

  if (totalLessons === 0) return 0;

  return Math.round((completedCount / totalLessons) * 100);
}

export function getModuleProgress(moduleSlug: string, completedLessons: string[] = []) {
  const moduleItem = modules.find((moduleData) => moduleData.slug === moduleSlug);
  if (!moduleItem || moduleItem.lessons.length === 0) {
    return { percentage: 0, completedCount: 0, totalCount: 0 };
  }

  const safeCompleted = new Set(getSafeCompletedLessons(completedLessons));
  const completedCount = moduleItem.lessons.filter((lessonSlug) => safeCompleted.has(lessonSlug)).length;
  const totalCount = moduleItem.lessons.length;

  return {
    percentage: Math.round((completedCount / totalCount) * 100),
    completedCount,
    totalCount,
  };
}

export function getModuleStatus(moduleSlug: string, completedLessons: string[] = []) {
  const { completedCount, totalCount } = getModuleProgress(moduleSlug, completedLessons);

  if (totalCount === 0 || completedCount === 0) return 'nao-iniciado' as const;
  if (completedCount === totalCount) return 'concluido' as const;
  return 'em-andamento' as const;
}

export function getFirstIncompleteModuleSlug(completedLessons: string[] = []) {
  const firstIncomplete = modules.find((moduleItem) => {
    const { completedCount, totalCount } = getModuleProgress(moduleItem.slug, completedLessons);
    return totalCount > 0 && completedCount < totalCount;
  });

  return firstIncomplete?.slug ?? modules[modules.length - 1]?.slug;
}
