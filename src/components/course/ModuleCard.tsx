import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { modules } from '@/data/modules';
import { getModuleContinueLessonHref } from '@/lib/course-navigation';

export function ModuleCard() {
  const current = modules.find((m) => m.slug === 'bgp-em-isp')!;
  const continueHref = getModuleContinueLessonHref(current.slug);

  return (
    <Card>
      <h3 className="font-semibold">Módulo atual</h3>
      <p className="mt-1 text-lg">{current.title}</p>
      <p className="text-sm text-slate-600">{current.description}</p>
      <Link href={continueHref} className="mt-4 inline-block"><Button>Continuar aula</Button></Link>
    </Card>
  );
}
