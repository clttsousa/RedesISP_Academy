import { ArrowRight } from 'lucide-react';

const nodes = ['Cliente', 'ONU', 'OLT', 'BNG', 'Core', 'Borda', 'Trânsito/IX.br/Peering'];
export function NetworkDiagram() {
  return <div className="flex flex-wrap items-center gap-2">{nodes.map((n, i) => <div key={n} className="flex items-center gap-2"><div className="rounded border bg-white px-3 py-2 text-sm">{n}</div>{i < nodes.length - 1 && <ArrowRight size={14} className="text-slate-400" />}</div>)}</div>;
}
