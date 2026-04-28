'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function InteractiveChecklist({ items }: { items: string[] }) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const progress = useMemo(() => {
    const total = items.length;
    const completed = checkedItems.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [checkedItems.length, items.length]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => (prev.includes(item) ? prev.filter((current) => current !== item) : [...prev, item]));
  };

  return (
    <Card className="space-y-3">
      <h3 className="text-lg font-semibold">Checklist operacional</h3>
      <p className="text-sm text-slate-600">
        {progress.completed} de {progress.total} itens concluídos
      </p>
      <Progress value={progress.percentage} />

      <ul className="space-y-2">
        {items.map((item) => {
          const checked = checkedItems.includes(item);
          return (
            <li key={item} className={`rounded-lg border p-2 text-sm ${checked ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200'}`}>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={checked} onChange={() => toggleItem(item)} />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
