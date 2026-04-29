'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ClipboardCheck } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { simulados } from '@/lib/simulados';
import { useProgressStore } from '@/store/progress-store';
export default function SimuladosPage() {
  const [search, setSearch] = useState(''); const [level, setLevel] = useState('todos');
  const completed = useProgressStore((s)=>s.completedSimulados);
  const levels = useMemo(() => Array.from(new Set(simulados.map((s) => s.level))), []);
  const filtered = useMemo(()=>simulados.filter((s)=>{const q=search.trim().toLowerCase(); return (!q || `${s.moduleTitle} ${s.moduleSlug}`.toLowerCase().includes(q))&&(level==='todos'||s.level===level);}),[level,search]);
  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-gradient-to-r from-indigo-50 via-white to-blue-50 p-6"><h1 className="text-3xl font-bold">Simulados</h1></header>
  <Card className="grid gap-3 md:grid-cols-2"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={16}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar por módulo" className="w-full rounded-lg border px-9 py-2 text-sm"/></label><select value={level} onChange={(e)=>setLevel(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="todos">Todos os níveis</option>{levels.map((v)=><option key={v}>{v}</option>)}</select></Card>
  <div className="grid gap-4 lg:grid-cols-2">{filtered.map((s)=><Card key={s.id} className="space-y-3" clickable><h2 className="text-lg font-semibold">Incidente: {s.moduleTitle}</h2><p className="text-sm">Módulo: {s.moduleTitle} · Dificuldade: {s.level}</p><p className="text-sm text-slate-600">⏱ {s.estimatedMinutes} min · Pontuação máxima: {s.questionCount*10} · Status: <strong>{completed.includes(s.slug)?'Concluído':'Não iniciado'}</strong></p><Link href={`/simulados/${s.slug}`} className="inline-flex items-center gap-2 font-medium text-primaryBlue hover:underline"><ClipboardCheck size={16}/> Iniciar simulado</Link></Card>)}</div>
  </section></AppShell>;
}
