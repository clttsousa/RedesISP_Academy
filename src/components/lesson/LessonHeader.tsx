'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';
import { toast } from 'sonner';
import type { Lesson, Module } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { getLessonsByModuleSlug } from '@/lib/course-navigation';

type LessonHeaderProps = {
  moduleSlug: string;
  lesson: Lesson;
  module?: Module;
  prev?: string;
  next?: string;
};

export function LessonHeader({ moduleSlug, lesson, module, prev, next }: LessonHeaderProps) {
  const complete = useProgressStore((s) => s.completeLesson);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const description = lesson.sections.find((section) => section.type === 'paragraph')?.content ?? module?.description ?? 'Continue com o conteúdo da aula.';
  const isCompleted = completedLessons.includes(lesson.slug);
  const lessonProgress = useMemo(() => {
    const moduleLessons = getLessonsByModuleSlug(moduleSlug);
    const lessonIndex = moduleLessons.findIndex((item) => item.slug === lesson.slug);
    if (lessonIndex === -1 || moduleLessons.length === 0) return 0;
    return Math.round(((lessonIndex + 1) / moduleLessons.length) * 100);
  }, [lesson.slug, moduleSlug]);

  const handleCompleteLesson = async () => {
    if (isCompleted || isSubmitting) return;
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    complete(lesson.slug);
    setIsSubmitting(false);
    toast.success('Aula concluída e progresso atualizado.');
  };

  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">Trilhas &gt; Redes ISP do Zero ao Backbone &gt; {module?.title ?? 'Módulo'}</p>
      <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
      <p className="text-slate-600">{description}</p>
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progresso da aula no módulo</span>
          <span>{lessonProgress}%</span>
        </div>
        <Progress value={lessonProgress} />
      </div>
      <div className="mt-4 flex gap-2">
        {prev ? (
          <Link href={`/trilha/${moduleSlug}/aulas/${prev}`}>
            <Button className="bg-slate-700">Aula anterior</Button>
          </Link>
        ) : (
          <Button disabled className="bg-slate-300 text-slate-600 hover:bg-slate-300">
            Aula anterior
          </Button>
        )}
        <Button onClick={handleCompleteLesson} disabled={isSubmitting || isCompleted}>
          <span className="inline-flex items-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              {isCompleted ? (
                <motion.span
                  key="done"
                  initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
                >
                  <Check size={14} />
                </motion.span>
              ) : null}
            </AnimatePresence>
            {isSubmitting ? 'Marcar como concluída' : isCompleted ? 'Concluída' : 'Marcar como concluída'}
          </span>
        </Button>
        {next ? (
          <Link href={`/trilha/${moduleSlug}/aulas/${next}`}>
            <Button>Próxima aula</Button>
          </Link>
        ) : (
          <Link href={`/trilha/${moduleSlug}`}>
            <Button>Revisar módulo</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
