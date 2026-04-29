'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FlaskConical, Search } from 'lucide-react';
import { labs } from '@/data/labs';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { useProgressStore } from '@/store/progress-store';
const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));
export default function LabsPage() {
  const [search, setSearch] = useState(''); const [difficulty, setDifficulty] = useState('todos'); const [moduleSlug, setModuleSlug] = useState('todos');
  const completedLabs = useProgressStore((s) => s.completedLabs); const startedLabs = useProgressStore((s) => s.startedLabs);
  const moduleOptions = useMemo(() => Array.from(new Set(labs.map((lab) => lab.moduleSlug))).map((slug) => ({ slug, title: moduleTitleBySlug.get(slug) ?? slug })), []);
  const difficulties = useMemo(() => Array.from(new Set(labs.map((lab) => lab.difficulty))), []);
  const filteredLabs = useMemo(() => labs.filter((lab) => {
    const q = search.trim().toLowerCase();
    return (!q || [lab.title, lab.objective, ...lab.steps].join(' ').toLowerCase().includes(q)) && (difficulty === 'todos' || lab.difficulty === difficulty) && (moduleSlug === 'todos' || lab.moduleSlug === moduleSlug);
  }), [difficulty,moduleSlug,search]);
  const statusLabel=(slug:string)=>completedLabs.includes(slug)?'Concluído':startedLabs.includes(slug)?'Em andamento':'Não iniciado';
  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-gradient-to-r from-blue-50 via-white to-cyan-50 p-6"><h1 className="text-3xl font-bold">Laboratórios</h1></header>
  <Card className="grid gap-3 md:grid-cols-3"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar" className="w-full rounded-lg border px-9 py-2 text-sm"/></label><select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="todos">Todas dificuldades</option>{difficulties.map((v)=><option key={v}>{v}</option>)}</select><select value={moduleSlug} onChange={(e)=>setModuleSlug(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="todos">Todos módulos</option>{moduleOptions.map((o)=><option key={o.slug} value={o.slug}>{o.title}</option>)}</select></Card>
  {filteredLabs.length===0?<Card><p className="text-sm text-slate-600">Nenhum laboratório encontrado para os filtros atuais.</p></Card>:<div className="grid gap-4 lg:grid-cols-2">{filteredLabs.map((lab)=><Card key={lab.id} className="space-y-3" clickable><div className="flex justify-between"><div><h2 className="text-lg font-semibold">{lab.title}</h2><p className="text-sm text-slate-500">{moduleTitleBySlug.get(lab.moduleSlug)}</p></div><span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{lab.difficulty}</span></div><p className="text-sm">{lab.objective}</p><div className="flex items-center justify-between text-sm"><span>Status: <strong>{statusLabel(lab.slug)}</strong> · ⏱ {lab.estimatedMinutes} min</span><Link href={`/labs/${lab.slug}`} className="inline-flex items-center gap-2 font-medium text-primaryBlue hover:underline"><FlaskConical size={16}/> Abrir lab</Link></div></Card>)}</div>}</section></AppShell>;
}
