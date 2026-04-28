'use client';

import Link from 'next/link';
import { PlayCircle, CheckCircle2, Clock3, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Module } from '@/lib/types';
import { getLessonsByModuleSlug, getModuleContinueLessonHref } from '@/lib/course-navigation';
import { useProgressStore } from '@/store/progress-store';
import { Progress } from '@/components/ui/progress';
import { getModuleProgress } from '@/lib/progress';

export function ModuleLessonsPanel({ module }: { module: Module }) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const continueHref = getModuleContinueLessonHref(module.slug, completedLessons);
  const lessons = getLessonsByModuleSlug(module.slug);
  const moduleProgress = getModuleProgress(module.slug, completedLessons);

  return (
    <>
      <section className="rounded-2xl border bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Continue de onde parou</h2>
          <Link href={continueHref} className="inline-flex items-center rounded-lg border border-primaryBlue px-4 py-2 text-sm font-semibold text-primaryBlue hover:bg-lightBlue">
            <PlayCircle size={16} className="mr-2" /> Continuar aula
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h3 className="mb-3 text-xl font-semibold">Aulas do módulo</h3>
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Progresso do módulo</span>
            <span>{moduleProgress.percentage}%</span>
          </div>
          <Progress value={moduleProgress.percentage} />
        </div>
        <div className="space-y-2">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.slug);
            const firstIncompleteSlug = lessons.find((item) => !completedLessons.includes(item.slug))?.slug;
            const status = isCompleted ? 'concluido' : firstIncompleteSlug === lesson.slug ? 'em-andamento' : 'nao-iniciado';
            const lessonHref = `/trilha/${module.slug}/aulas/${lesson.slug}`;

            return (
              <div key={lesson.slug} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm">
                <div className="min-w-0">
                  <p className="line-clamp-1 pr-2 font-medium">{`${index + 1}. ${lesson.title}`}</p>
                  <p className="text-xs text-slate-500">{lesson.estimatedMinutes} min</p>
                </div>
                <div className="flex items-center gap-2">
                  {status === 'concluido' ? (
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"><CheckCircle2 size={12} /> Concluída</span>
                  ) : status === 'em-andamento' ? (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700"><Clock3 size={12} /> Em andamento</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"><Circle size={12} /> Não iniciada</span>
                  )}
                  <Link href={lessonHref}>
                    <Button>Abrir</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
