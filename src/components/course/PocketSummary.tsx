import { Card } from '@/components/ui/card';

export function PocketSummary({ items }: { items: string[] }) {
  return (
    <Card variant="summary">
      <h3 className="mb-2 text-base font-semibold text-textPrimary">Resumo de bolso</h3>
      <ul className="list-disc space-y-1 pl-4 text-sm leading-6 text-textSecondary">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </Card>
  );
}
