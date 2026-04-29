'use client';
import { useTheme } from 'next-themes';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';

export default function ConfigPage() {
  const { setTheme } = useTheme();
  const preferredTheme = useProgressStore((s) => s.preferredTheme);
  const studyMode = useProgressStore((s) => s.studyMode);
  const setPreferredTheme = useProgressStore((s) => s.setPreferredTheme);
  const setStudyMode = useProgressStore((s) => s.setStudyMode);
  const resetProgress = useProgressStore((s) => s.resetProgress);

  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-gradient-to-r from-slate-100 via-white to-slate-50 p-6"><h1 className="text-3xl font-bold">Configurações</h1></header>
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="space-y-4"><h2 className="text-lg font-semibold">Preferências visuais</h2><div className="flex gap-2"><Button className={preferredTheme==='light'?'':'bg-slate-200 text-slate-800 hover:bg-slate-300'} onClick={()=>{setTheme('light'); setPreferredTheme('light');}}>Tema claro</Button><Button className={preferredTheme==='dark'?'':'bg-slate-200 text-slate-800 hover:bg-slate-300'} onClick={()=>{setTheme('dark'); setPreferredTheme('dark');}}>Tema escuro</Button><Button className={preferredTheme==='system'?'':'bg-slate-200 text-slate-800 hover:bg-slate-300'} onClick={()=>{setTheme('system'); setPreferredTheme('system');}}>Sistema</Button></div></Card>
      <Card className="space-y-4"><h2 className="text-lg font-semibold">Modo operacional</h2><div className="flex gap-2"><Button className={studyMode==='estudo'?'':'bg-slate-200 text-slate-800 hover:bg-slate-300'} onClick={()=>setStudyMode('estudo')}>Modo estudo</Button><Button className={studyMode==='noc'?'':'bg-slate-200 text-slate-800 hover:bg-slate-300'} onClick={()=>setStudyMode('noc')}>Modo NOC</Button></div></Card>
    </div>
    <Card className="space-y-3"><h2 className="text-lg font-semibold">Progresso</h2><p className="text-sm text-slate-600">Isso remove progresso de aulas, labs e simulados.</p><Button className="bg-rose-600 hover:bg-rose-700" onClick={()=>{if(window.confirm('Tem certeza que deseja resetar seu progresso?')) resetProgress();}}>Resetar progresso</Button></Card>
  </section></AppShell>;
}
