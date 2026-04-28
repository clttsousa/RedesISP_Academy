'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ClipboardCheck } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { simulados } from '@/lib/simulados';

export default function SimuladosPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('todos');

  const levels = useMemo(() => Array.from(new Set(simulados.map((simulado) => simulado.level))), []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return simulados.filter((simulado) => {
      const matchesSearch = !query || `${simulado.moduleTitle} ${simulado.moduleSlug}`.toLowerCase().includes(query);
      const matchesLevel = level === 'todos' || simulado.level === level;
      return matchesSearch && matchesLevel;
    });
  }, [level, search]);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Treino de diagnóstico</p>
          <h1 className="mt-2 text-3xl font-bold">Simulados</h1>
          <p className="mt-2 text-sm text-slate-600">Coleção de perguntas reais da trilha, agrupadas por módulo para revisão rápida.</p>
        </header>

        <Card className="grid gap-3 md:grid-cols-2">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por módulo"
              className="w-full rounded-lg border px-9 py-2 text-sm"
            />
          </label>
          <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todos os níveis</option>
            {levels.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((simulado) => (
            <Card key={simulado.id} className="space-y-3">
              <h2 className="text-lg font-semibold">{simulado.moduleTitle}</h2>
              <p className="text-sm text-slate-500">{simulado.level}</p>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{simulado.questionCount} perguntas</span>
                <span>⏱ {simulado.estimatedMinutes} min</span>
              </div>
              <Link href={`/simulados/${simulado.slug}`} className="inline-flex items-center gap-2 font-medium text-primaryBlue hover:underline">
                <ClipboardCheck size={16} /> Iniciar simulado
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
