import { AppShell } from '@/components/layout/AppShell';
import { CourseProgress } from '@/components/course/CourseProgress';
import { ModuleCard } from '@/components/course/ModuleCard';
import { PocketSummary } from '@/components/course/PocketSummary';
import { GlossaryPanel } from '@/components/lesson/GlossaryPanel';
import { NetworkDiagram } from '@/components/lesson/NetworkDiagram';
import { CommandBlock } from '@/components/lesson/CommandBlock';

export default function TrilhaPage() {
  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">Trilha: Redes ISP do Zero ao Backbone</h1>
          <p className="text-slate-600">Do suporte ao backbone, com foco em prática, clareza e aplicação real.</p>
          <CourseProgress value={35} />
          <ModuleCard />
          <div className="rounded-xl border bg-white p-5 space-y-4"><h3 className="text-lg font-semibold">Por que isso importa?</h3><p>Entender política de roteamento reduz incidentes e melhora custos de trânsito.</p><h3 className="text-lg font-semibold">Explicação didática</h3><p>eBGP conecta ASs e iBGP distribui rotas internamente.</p><h3 className="text-lg font-semibold">Cenário real de ISP</h3><p>Operação multi-homing com IX e trânsito.</p><h3 className="text-lg font-semibold">Diagrama de topologia</h3><NetworkDiagram /><h3 className="text-lg font-semibold">Comandos úteis</h3><CommandBlock commands={['show ip bgp summary']} /><h3 className="text-lg font-semibold">Missão prática</h3><p>Subir sessão eBGP e validar prefixos anunciados.</p></div>
        </section>
        <aside className="space-y-4">
          <PocketSummary items={['BGP define política de tráfego e resiliência.']} />
          <GlossaryPanel terms={['AS', 'eBGP', 'iBGP', 'Prefix-list']} />
        </aside>
      </div>
    </AppShell>
  );
}
