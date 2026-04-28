'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FlaskConical, Search } from 'lucide-react';
import { labs } from '@/data/labs';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';

const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));

export default function LabsPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('todos');
  const [moduleSlug, setModuleSlug] = useState('todos');

  const moduleOptions = useMemo(
    () => Array.from(new Set(labs.map((lab) => lab.moduleSlug))).map((slug) => ({ slug, title: moduleTitleBySlug.get(slug) ?? slug })),
    [],
  );

  const difficulties = useMemo(() => Array.from(new Set(labs.map((lab) => lab.difficulty))), []);

  const filteredLabs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return labs.filter((lab) => {
      const matchesSearch = !query || [lab.title, lab.objective, ...lab.steps].join(' ').toLowerCase().includes(query);
      const matchesDifficulty = difficulty === 'todos' || lab.difficulty === difficulty;
      const matchesModule = moduleSlug === 'todos' || lab.moduleSlug === moduleSlug;

      return matchesSearch && matchesDifficulty && matchesModule;
    });
  }, [difficulty, moduleSlug, search]);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Prática guiada</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Laboratórios</h1>
          <p className="mt-2 text-sm text-slate-600">Treinos práticos com dados da trilha oficial para simular rotinas de NOC e operação ISP.</p>
        </header>

        <Card className="grid gap-3 md:grid-cols-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, objetivo ou etapa"
              className="w-full rounded-lg border px-9 py-2 text-sm"
            />
          </label>

          <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todas dificuldades</option>
            {difficulties.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select value={moduleSlug} onChange={(event) => setModuleSlug(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todos módulos</option>
            {moduleOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </Card>

        <p className="text-sm text-slate-500">{filteredLabs.length} laboratório(s) encontrado(s).</p>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredLabs.map((lab) => (
            <Card key={lab.id} className="space-y-3" clickable>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{lab.title}</h2>
                  <p className="text-sm text-slate-500">{moduleTitleBySlug.get(lab.moduleSlug) ?? lab.moduleSlug}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{lab.difficulty}</span>
              </div>
              <p className="text-sm text-slate-600">{lab.objective}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">⏱ {lab.estimatedMinutes} min</span>
                <Link href={`/labs/${lab.slug}`} className="inline-flex items-center gap-2 font-medium text-primaryBlue hover:underline">
                  <FlaskConical size={16} /> Abrir laboratório
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
