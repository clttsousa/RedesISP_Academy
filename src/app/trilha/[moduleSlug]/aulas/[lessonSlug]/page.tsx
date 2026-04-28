import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonTabs } from '@/components/lesson/LessonTabs';
import { GlossaryPanel } from '@/components/lesson/GlossaryPanel';
import { NextLessonCard } from '@/components/lesson/NextLessonCard';
import { getLessonInModule, getLessonNavigation } from '@/lib/course-navigation';

export default async function LessonPage({ params }: { params: Promise<{ moduleSlug: string; lessonSlug: string }> }) {
  const { moduleSlug, lessonSlug } = await params;
  const lesson = getLessonInModule(moduleSlug, lessonSlug);

  if (!lesson) return notFound();

  const { previousLessonSlug, nextLessonSlug } = getLessonNavigation(moduleSlug, lesson.slug);

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section>
          <LessonHeader moduleSlug={moduleSlug} lesson={lesson} prev={previousLessonSlug} next={nextLessonSlug} />
          <LessonTabs lesson={lesson} />
        </section>
        <aside className="space-y-4"><div className="rounded-xl border bg-white p-4"><h4 className="font-semibold">Resumo da aula</h4><p className="text-sm">Tempo estimado: {lesson.estimatedMinutes} min</p></div><GlossaryPanel terms={lesson.glossaryTerms} /><NextLessonCard moduleSlug={moduleSlug} nextLessonSlug={nextLessonSlug} /></aside>
      </div>
    </AppShell>
  );
}
