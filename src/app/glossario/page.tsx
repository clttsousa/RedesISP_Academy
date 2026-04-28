'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { glossary } from '@/data/glossary';
import { modules } from '@/data/modules';

const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));

export default function GlossarioPage() {
  const [search, setSearch] = useState('');
  const [moduleSlug, setModuleSlug] = useState('todos');

  const moduleOptions = useMemo(
    () => Array.from(new Set(glossary.map((item) => item.moduleSlug))).map((slug) => ({ slug, title: moduleTitleBySlug.get(slug) ?? slug })),
    [],
  );

  const filteredGlossary = useMemo(() => {
    const query = search.trim().toLowerCase();

    return glossary
      .filter((item) => {
        const matchesSearch = !query || [item.term, item.definition, item.relatedTerms.join(' ')].join(' ').toLowerCase().includes(query);
        const matchesModule = moduleSlug === 'todos' || item.moduleSlug === moduleSlug;
        return matchesSearch && matchesModule;
      })
      .sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
  }, [moduleSlug, search]);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-gradient-to-r from-emerald-50 via-white to-cyan-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Referência rápida</p>
          <h1 className="mt-2 text-3xl font-bold">Glossário</h1>
          <p className="mt-2 text-sm text-slate-600">Definições técnicas conectadas aos módulos oficiais da trilha.</p>
        </header>

        <Card className="grid gap-3 md:grid-cols-2">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar termo, definição ou termo relacionado"
              className="w-full rounded-lg border px-9 py-2 text-sm"
            />
          </label>

          <select value={moduleSlug} onChange={(event) => setModuleSlug(event.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option value="todos">Todos módulos</option>
            {moduleOptions.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.title}
              </option>
            ))}
          </select>
        </Card>

        <p className="text-sm text-slate-500">{filteredGlossary.length} termo(s) encontrado(s).</p>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredGlossary.map((item) => (
            <Card key={item.term} className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">{item.term}</h2>
              <p className="text-sm text-slate-500">{moduleTitleBySlug.get(item.moduleSlug) ?? item.moduleSlug}</p>
              <p className="text-sm text-slate-700">{item.definition}</p>
              <div className="flex flex-wrap gap-2">
                {item.relatedTerms.map((term) => (
                  <span key={term} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {term}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
