import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Module } from '@/lib/types';

type ModuleCardProps = {
  module: Module;
  continueHref: string;
};

export function ModuleCard({ module, continueHref }: ModuleCardProps) {
  return (
    <Card>
      <h3 className="font-semibold">Módulo atual</h3>
      <p className="mt-1 text-lg">{module.title}</p>
      <p className="text-sm text-slate-600">{module.description}</p>
      <Link href={continueHref} className="mt-4 inline-block">
        <Button>Continuar aula</Button>
      </Link>
    </Card>
  );
}
