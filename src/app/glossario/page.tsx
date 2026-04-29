'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { glossary } from '@/data/glossary';
import { modules } from '@/data/modules';
const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));
export default function GlossarioPage() {
  const params = useSearchParams(); const initialTerm = params.get('term') ?? '';
  const [search, setSearch] = useState(initialTerm); const [moduleSlug, setModuleSlug] = useState('todos');
  const moduleOptions = useMemo(() => Array.from(new Set(glossary.map((item) => item.moduleSlug))).map((slug) => ({ slug, title: moduleTitleBySlug.get(slug) ?? slug })), []);
  const filtered = useMemo(()=>glossary.filter((i)=>{const q=search.trim().toLowerCase();return (!q||[i.term,i.definition,i.relatedTerms.join(' ')].join(' ').toLowerCase().includes(q))&&(moduleSlug==='todos'||i.moduleSlug===moduleSlug);}).sort((a,b)=>a.term.localeCompare(b.term,'pt-BR')),[moduleSlug,search]);
  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-gradient-to-r from-emerald-50 via-white to-cyan-50 p-6"><h1 className="text-3xl font-bold">Glossário</h1></header>
  <Card className="grid gap-3 md:grid-cols-2"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar termo" className="w-full rounded-lg border px-9 py-2 text-sm"/></label><select value={moduleSlug} onChange={(e)=>setModuleSlug(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="todos">Todos módulos</option>{moduleOptions.map((o)=><option key={o.slug} value={o.slug}>{o.title}</option>)}</select></Card>
  {filtered.length===0?<Card><p className="text-sm text-slate-600">Nenhum termo encontrado para os filtros.</p></Card>:<div className="grid gap-4 lg:grid-cols-2">{filtered.map((item)=>{const highlight=initialTerm&&item.term.toLowerCase()===initialTerm.toLowerCase();return <Card key={item.term} className={`space-y-2 ${highlight?'ring-2 ring-primaryBlue':''}`}><h2 className="text-xl font-semibold">{item.term}</h2><p className="text-sm text-slate-500">{moduleTitleBySlug.get(item.moduleSlug)}</p><p className="text-sm">{item.definition}</p><div className="flex flex-wrap gap-2">{item.relatedTerms.map((term)=><button key={term} onClick={()=>setSearch(term)} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs">{term}</button>)}</div></Card>;})}</div>}</section></AppShell>;
}
