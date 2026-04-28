'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';
import { toast } from 'sonner';

export function LessonHeader({ lessonSlug, prev, next }: { lessonSlug: string; prev?: string; next?: string }) {
  const complete = useProgressStore((s) => s.completeLesson);
  return <div className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-500">Trilhas &gt; Redes ISP do Zero ao Backbone &gt; Módulo: BGP em ISP</p><h1 className="mt-2 text-2xl font-bold">Aula 4 — eBGP, iBGP e políticas</h1><p className="text-slate-600">Entenda como o BGP funciona na prática em provedores de internet.</p><div className="mt-4 flex gap-2">{prev ? <Link href={`/trilha/bgp-em-isp/aulas/${prev}`}><Button className="bg-slate-700">Aula anterior</Button></Link> : null}<Button onClick={() => { complete(lessonSlug); toast.success('Aula marcada como concluída'); }}>Marcar como concluída</Button>{next ? <Link href={`/trilha/bgp-em-isp/aulas/${next}`}><Button>Próxima aula</Button></Link> : null}</div></div>;
}
