'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';
import { toast } from 'sonner';
import type { Lesson, Module } from '@/lib/types';

type LessonHeaderProps = {
  moduleSlug: string;
  lesson: Lesson;
  module?: Module;
  prev?: string;
  next?: string;
};

export function LessonHeader({ moduleSlug, lesson, module, prev, next }: LessonHeaderProps) {
  const complete = useProgressStore((s) => s.completeLesson);
  const description = lesson.sections.find((section) => section.type === 'paragraph')?.content ?? module?.description ?? 'Continue com o conteúdo da aula.';

  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-slate-500">Trilhas &gt; Redes ISP do Zero ao Backbone &gt; {module?.title ?? 'Módulo'}</p>
      <h1 className="mt-2 text-2xl font-bold">{lesson.title}</h1>
      <p className="text-slate-600">{description}</p>
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
        ) : (
          <Link href={`/trilha/${moduleSlug}`}>
            <Button>Revisar módulo</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
