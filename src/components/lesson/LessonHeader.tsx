'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';
import { toast } from 'sonner';
import type { Lesson } from '@/lib/types';

type LessonHeaderProps = {
  moduleSlug: string;
  lesson: Lesson;
  prev?: string;
  next?: string;
};

export function LessonHeader({ moduleSlug, lesson, prev, next }: LessonHeaderProps) {
  const complete = useProgressStore((s) => s.completeLesson);

  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">Trilhas &gt; Redes ISP do Zero ao Backbone &gt; Módulo</p>
      <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
      <p className="text-slate-600">Entenda como o BGP funciona na prática em provedores de internet.</p>
      <div className="mt-4 flex gap-2">
        {prev ? (
          <Link href={`/trilha/${moduleSlug}/aulas/${prev}`}>
            <Button className="bg-slate-700">Aula anterior</Button>
          </Link>
        ) : null}
        <Button
          onClick={() => {
            complete(lesson.slug);
            toast.success('Aula marcada como concluída');
          }}
        >
          Marcar como concluída
        </Button>
        {next ? (
          <Link href={`/trilha/${moduleSlug}/aulas/${next}`}>
            <Button>Próxima aula</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
