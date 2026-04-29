import {
  Activity,
  ArrowRight,
  Database,
  Globe,
  Monitor,
  Network,
  Router,
  Server,
  Shield,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';
import { getDiagramById, getDiagramByModuleSlug } from '@/data/diagrams';
import { DiagramLayer, NetworkDiagramDefinition } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  moduleSlug: string;
  diagramId?: string;
  className?: string;
};

const layerStyles: Record<DiagramLayer, string> = {
  acesso: 'border-sky-200 bg-sky-50 text-sky-800',
  core: 'border-indigo-200 bg-indigo-50 text-indigo-800',
  borda: 'border-violet-200 bg-violet-50 text-violet-800',
  internet: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  servicos: 'border-amber-200 bg-amber-50 text-amber-800',
};

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  router: Router,
  server: Server,
  network: Network,
  shield: Shield,
  globe: Globe,
  database: Database,
  activity: Activity,
  waypoints: Waypoints,
};

function resolveDiagram(moduleSlug: string, diagramId?: string): NetworkDiagramDefinition | undefined {
  return getDiagramById(diagramId) ?? getDiagramByModuleSlug(moduleSlug);
}

export function NetworkDiagram({ moduleSlug, diagramId, className }: Props) {
  const diagram = resolveDiagram(moduleSlug, diagramId);
  const nodeLabelById = new Map(diagram?.nodes.map((node) => [node.id, node.label]) ?? []);

  if (!diagram) {
    return (
      <div className={cn('rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600', className)}>
        <p className="font-semibold text-slate-800">Diagrama em preparação</p>
        <p className="mt-1">Este módulo ainda não possui um diagrama visual dedicado. Continue com o conteúdo da aula normalmente.</p>
      </div>
    );
  }

  return (
    <section className={cn('space-y-4 rounded-2xl border bg-white p-4 sm:p-5', className)}>
      <header>
        <h3 className="text-lg font-semibold text-slate-900">{diagram.title}</h3>
        <p className="text-sm text-slate-600">{diagram.description}</p>
      </header>

      <div className="overflow-x-auto pb-1">
        <div className="grid min-w-[620px] gap-3" style={{ gridTemplateColumns: 'repeat(7, minmax(90px, 1fr))' }}>
          {diagram.nodes.map((node) => {
            const Icon = iconMap[node.icon ?? 'network'] ?? Network;
            return (
              <div
                key={node.id}
                className={cn('rounded-xl border p-3 shadow-sm transition hover:shadow-md', layerStyles[node.layer])}
                style={{ gridColumn: node.col ?? 'auto', gridRow: node.row ?? 'auto' }}
                title={node.hint ?? node.label}
              >
                <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-80">
                  <Icon size={14} />
                  {node.layer}
                </div>
                <p className="text-sm font-semibold">{node.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-slate-800">Fluxos</h4>
        <div className="flex flex-wrap gap-2">
          {diagram.edges.map((edge, index) => (
            <span key={`${edge.from}-${edge.to}-${index}`} className="inline-flex items-center gap-1 rounded-lg border bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
              <span>{nodeLabelById.get(edge.from) ?? edge.from}</span>
              <ArrowRight size={12} className={edge.kind === 'dashed' ? 'opacity-50' : ''} />
              <span>{nodeLabelById.get(edge.to) ?? edge.to}</span>
              {edge.label ? <span className="text-slate-500">({edge.label})</span> : null}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {diagram.legend.map((item) => (
          <span key={`${item.layer}-${item.label}`} className={cn('rounded-full border px-2.5 py-1 text-xs font-medium', layerStyles[item.layer])}>
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
