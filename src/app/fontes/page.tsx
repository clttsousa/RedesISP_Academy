'use client';
import { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { sources } from '@/data/sources';
import { modules } from '@/data/modules';
const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));
export default function FontesPage() {
  const [search, setSearch] = useState(''); const [moduleSlug, setModuleSlug] = useState('todos');
  const moduleOptions = useMemo(() => Array.from(new Set(sources.map((source) => source.moduleSlug))), []);
  const filtered = useMemo(()=>sources.filter((s)=>{const q=search.trim().toLowerCase(); return (!q||`${s.title} ${s.organization} ${s.type}`.toLowerCase().includes(q))&&(moduleSlug==='todos'||s.moduleSlug===moduleSlug);}),[moduleSlug,search]);
  const grouped = useMemo(()=>filtered.reduce<Record<string, typeof sources>>((acc, item)=>{acc[item.moduleSlug]=[...(acc[item.moduleSlug]??[]),item]; return acc;},{}),[filtered]);
  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6"><h1 className="text-3xl font-bold">Fontes</h1></header>
  <Card className="grid gap-3 lg:grid-cols-2"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar título, organização ou tipo" className="w-full rounded-lg border px-9 py-2 text-sm"/></label><select value={moduleSlug} onChange={(e)=>setModuleSlug(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="todos">Todos módulos</option>{moduleOptions.map((slug)=><option key={slug} value={slug}>{slug==='all'?'Toda a trilha':(moduleTitleBySlug.get(slug)??slug)}</option>)}</select></Card>
  {filtered.length===0?<Card><p className="text-sm text-slate-600">Nenhuma fonte encontrada para os filtros aplicados.</p></Card>:Object.entries(grouped).map(([slug,list])=><Card key={slug}><h2 className="text-lg font-semibold mb-3">{slug==='all'?'Toda a trilha':(moduleTitleBySlug.get(slug)??slug)}</h2><div className="space-y-3">{list.map((s)=><div key={s.url} className="flex flex-col gap-2 sm:flex-row sm:justify-between"><div><p className="font-medium">{s.title}</p><p className="text-xs text-slate-600">{s.organization} · {s.type}</p></div><a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primaryBlue">Link externo <ExternalLink size={15}/></a></div>)}</div></Card>)}
  </section></AppShell>;
}
