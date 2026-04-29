'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';

export function LabCompleteButton({ labSlug }: { labSlug: string }) {
  const completeLab = useProgressStore((s)=>s.completeLab);
  const startLab = useProgressStore((s)=>s.startLab);
  return <Button onClick={()=>{startLab(labSlug); completeLab(labSlug); toast.success('Lab marcado como concluído.');}}>Marcar lab como concluído</Button>;
}
