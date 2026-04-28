'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { sources } from '@/data/sources';
import { modules } from '@/data/modules';

const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));

export default function FontesPage() {
  const [search, setSearch] = useState('');
  const [sourceType, setSourceType] = useState('todos');
  const [moduleSlug, setModuleSlug] = useState('todos');

  const typeOptions = useMemo(() => Array.from(new Set(sources.map((source) => source.type))), []);
  const moduleOptions = useMemo(() => Array.from(new Set(sources.map((source) => source.moduleSlug))), []);

  const filteredSources = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sources.filter((source) => {
      const matchesSearch = !query || `${source.title} ${source.organization} ${source.url}`.toLowerCase().includes(query);
      const matchesType = sourceType === 'todos' || source.type === sourceType;
      const matchesModule = moduleSlug === 'todos' || source.moduleSlug === moduleSlug;
      return matchesSearch && matchesType && matchesModule;
    });
  }, [moduleSlug, search, sourceType]);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Base oficial</p>
          <h1 className="mt-2 text-3xl font-bold">Fontes</h1>
          <p className="mt-2 text-sm text-slate-600">RFCs, boas práticas e apostila usados na construção da trilha.</p>
        </header>

        <Card className="grid gap-3 lg:grid-cols-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar título ou organização"
              className="w-full rounded-lg border px-9 py-2 text-sm"
            />
          </label>

          <select value={sourceType} onChange={(event) => setSourceType(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todos os tipos</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select value={moduleSlug} onChange={(event) => setModuleSlug(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todos módulos</option>
            {moduleOptions.map((slug) => (
              <option key={slug} value={slug}>
                {slug === 'all' ? 'Toda a trilha' : (moduleTitleBySlug.get(slug) ?? slug)}
              </option>
            ))}
          </select>
        </Card>

        <div className="grid gap-4">
          {filteredSources.map((source) => (
            <Card key={source.url} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{source.title}</h2>
                <p className="text-sm text-slate-500">{source.organization}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {source.type} · {source.moduleSlug === 'all' ? 'Toda a trilha' : (moduleTitleBySlug.get(source.moduleSlug) ?? source.moduleSlug)}
                </p>
              </div>
              <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primaryBlue hover:underline">
                Acessar fonte <ExternalLink size={16} />
              </a>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
