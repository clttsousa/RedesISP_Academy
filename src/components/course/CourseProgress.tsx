import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function CourseProgress({ value }: { value: number }) {
  return <Card><h3 className="mb-3 font-semibold">Progresso da trilha</h3><Progress value={value} /><p className="mt-2 text-sm text-slate-600">{value}% concluído</p></Card>;
}
