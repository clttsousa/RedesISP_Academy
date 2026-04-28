import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { modules } from '@/data/modules';

export function ModuleCard() {
  const current = modules.find((m) => m.slug === 'bgp-em-isp')!;
  return (
    <Card>
      <h3 className="font-semibold">Módulo atual</h3>
      <p className="mt-1 text-lg">{current.title}</p>
      <p className="text-sm text-slate-600">{current.description}</p>
      <Link href="/trilha/bgp-em-isp/aulas/ebgp-ibgp-politicas" className="mt-4 inline-block"><Button>Continuar aula</Button></Link>
    </Card>
  );
}
