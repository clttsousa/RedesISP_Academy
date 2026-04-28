import { modules } from '@/data/modules';
import { Card } from '@/components/ui/card';

export function ModuleList() {
  return <Card><h3 className="mb-3 font-semibold">Lista de módulos</h3><ul className="space-y-2 text-sm">{modules.map((m) => <li key={m.id}>{m.title}</li>)}</ul></Card>;
}
