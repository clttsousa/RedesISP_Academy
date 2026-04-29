import React from 'react';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonTabs } from '@/components/lesson/LessonTabs';
import { GlossaryPanel } from '@/components/lesson/GlossaryPanel';
import { NextLessonCard } from '@/components/lesson/NextLessonCard';
import { Card } from '@/components/ui/card';
import { getLessonNavigation, getLessonsByModuleSlug, getModuleBySlug } from '@/lib/course-navigation';

export default async function LessonPage({ params }: { params: Promise<{ moduleSlug: string; lessonSlug: string }> }) {
  const { moduleSlug, lessonSlug } = await params;

  const moduleItem = getModuleBySlug(moduleSlug);
  if (!moduleItem) return notFound();

  const moduleLessons = getLessonsByModuleSlug(moduleSlug);
  const lesson = moduleLessons.find((lessonItem) => lessonItem.slug === lessonSlug);

  if (!lesson || lesson.moduleId !== moduleItem.id) return notFound();

  const { previousLessonSlug, nextLessonSlug } = getLessonNavigation(moduleSlug, lesson.slug);

  return (
    <AppShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5">
          <LessonHeader moduleSlug={moduleSlug} lesson={lesson} module={moduleItem} prev={previousLessonSlug} next={nextLessonSlug} />
          <LessonTabs lesson={lesson} moduleSlug={moduleSlug} />
        </section>
        <aside className="space-y-4">
          <Card variant="summary">
            <h4 className="text-base font-semibold">Resumo da aula</h4>
            <p className="text-sm">Tempo estimado: {lesson.estimatedMinutes} min</p>
          </Card>
          <GlossaryPanel terms={lesson.glossaryTerms} />
          <NextLessonCard moduleSlug={moduleSlug} nextLessonSlug={nextLessonSlug} />
        </aside>
      </div>
    </AppShell>
  );
}
