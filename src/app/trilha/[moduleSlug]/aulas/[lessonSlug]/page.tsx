import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { lessons } from '@/data/lessons';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonTabs } from '@/components/lesson/LessonTabs';
import { GlossaryPanel } from '@/components/lesson/GlossaryPanel';
import { NextLessonCard } from '@/components/lesson/NextLessonCard';

export default async function LessonPage({ params }: { params: Promise<{ moduleSlug: string; lessonSlug: string }> }) {
  const { lessonSlug } = await params;
  const lesson = lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return notFound();
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section>
          <LessonHeader lessonSlug={lesson.slug} prev={lesson.previousLessonSlug} next={lesson.nextLessonSlug} />
          <LessonTabs lesson={lesson} />
        </section>
        <aside className="space-y-4"><div className="rounded-xl border bg-white p-4"><h4 className="font-semibold">Resumo da aula</h4><p className="text-sm">Tempo estimado: {lesson.estimatedMinutes} min</p></div><GlossaryPanel terms={lesson.glossaryTerms} /><NextLessonCard /></aside>
      </div>
    </AppShell>
  );
}
