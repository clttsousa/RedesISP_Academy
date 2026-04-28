import { modules } from '@/data/modules';
import { quizzes } from '@/data/quizzes';

export type Simulado = {
  id: string;
  slug: string;
  moduleSlug: string;
  moduleTitle: string;
  level: string;
  questionCount: number;
  estimatedMinutes: number;
  questions: typeof quizzes;
};

export const simulados: Simulado[] = modules.map((module) => {
  const moduleQuestions = quizzes.filter((quiz) => quiz.moduleSlug === module.slug);

  return {
    id: `simulado-${module.slug}`,
    slug: module.slug,
    moduleSlug: module.slug,
    moduleTitle: module.title,
    level: module.level,
    questionCount: moduleQuestions.length,
    estimatedMinutes: Math.max(10, moduleQuestions.length * 6),
    questions: moduleQuestions,
  };
});

export const findSimulado = (slug: string) => simulados.find((simulado) => simulado.slug === slug);
