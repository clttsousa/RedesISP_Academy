'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { modules } from '@/data/modules';
import { labs } from '@/data/labs';
import { simulados } from '@/lib/simulados';

export default function ConfigPage() {
  const [favoriteLevel, setFavoriteLevel] = useState('Fundamentos');
  const [showOnlyHandsOn, setShowOnlyHandsOn] = useState(false);

  const recommendedModules = useMemo(
    () => modules.filter((module) => module.level === favoriteLevel).slice(0, 4),
    [favoriteLevel],
  );

  const practicalCount = useMemo(() => {
    if (!showOnlyHandsOn) return modules.length;
    const modulesWithLabs = new Set(labs.map((lab) => lab.moduleSlug));
    return modules.filter((module) => modulesWithLabs.has(module.slug)).length;
  }, [showOnlyHandsOn]);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-gradient-to-r from-slate-100 via-white to-slate-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Área pessoal</p>
          <h1 className="mt-2 text-3xl font-bold">Configurações</h1>
          <p className="mt-2 text-sm text-slate-600">Ajuste preferências de estudo com base no conteúdo existente da trilha.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Preferências de aprendizagem</h2>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-600">Nível prioritário</span>
              <select value={favoriteLevel} onChange={(event) => setFavoriteLevel(event.target.value)} className="w-full rounded-lg border px-3 py-2">
                <option value="Fundamentos">Fundamentos</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </label>

            <label className="flex items-center gap-3 rounded-lg border p-3 text-sm">
              <input type="checkbox" checked={showOnlyHandsOn} onChange={(event) => setShowOnlyHandsOn(event.target.checked)} />
              Destacar apenas módulos com laboratórios práticos
            </label>

            <p className="text-sm text-slate-600">Módulos exibidos no seu foco atual: <strong>{practicalCount}</strong>.</p>
          </Card>

          <Card className="space-y-3">
            <h2 className="text-lg font-semibold">Atalhos úteis</h2>
            <Link href="/labs" className="block rounded-lg border p-3 text-sm hover:bg-slate-50">Ir para laboratórios ({labs.length})</Link>
            <Link href="/simulados" className="block rounded-lg border p-3 text-sm hover:bg-slate-50">Ir para simulados ({simulados.length})</Link>
            <Link href="/fontes" className="block rounded-lg border p-3 text-sm hover:bg-slate-50">Revisar fontes oficiais</Link>
            <Link href="/glossario" className="block rounded-lg border p-3 text-sm hover:bg-slate-50">Abrir glossário técnico</Link>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold">Módulos recomendados para você</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {recommendedModules.map((module) => (
              <Link key={module.id} href={`/trilha/${module.slug}`} className="rounded-lg border bg-slate-50 p-3 hover:bg-slate-100">
                <p className="font-medium text-slate-900">{module.title}</p>
                <p className="text-sm text-slate-600">{module.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
