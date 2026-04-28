import { Card } from '@/components/ui/card';

export function PocketSummary({ items }: { items: string[] }) {
  return <Card><h3 className="mb-2 font-semibold">Resumo de bolso</h3><ul className="list-disc space-y-1 pl-4 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul></Card>;
}
