'use client';

import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { useProgressStore } from '@/store/progress-store';
import { getOverallProgress } from '@/lib/progress';

export function CourseProgress({ value }: { value?: number }) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const hasHydrated = useProgressStore((state) => state.hasHydrated);

  const calculatedValue = value ?? (hasHydrated ? getOverallProgress(completedLessons) : 0);

  return (
    <Card>
      <h3 className="mb-3 font-semibold">Progresso da trilha</h3>
      <Progress value={calculatedValue} />
      <p className="mt-2 text-sm text-slate-600">{calculatedValue}% concluído</p>
    </Card>
  );
}
