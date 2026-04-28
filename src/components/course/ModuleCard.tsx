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
    <Card variant="action" clickable>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Módulo atual</h3>
      <p className="mt-1 text-xl font-semibold text-textPrimary">{module.title}</p>
      <p className="text-sm leading-6 text-textSecondary">{module.description}</p>
      <Link href={continueHref} className="mt-4 inline-block">
        <Button>Continuar aula</Button>
      </Link>
    </Card>
  );
}
