'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';
import { toast } from 'sonner';
import type { LessonMission } from '@/lib/types';

type MissionCardProps = {
  lessonSlug: string;
  mission: LessonMission;
};

export function MissionCard({ lessonSlug, mission }: MissionCardProps) {
  const [open, setOpen] = useState(false);
  const completeMission = useProgressStore((state) => state.completeMission);
  const completedMissions = useProgressStore((state) => state.completedMissions);
  const isMissionCompleted = completedMissions.includes(lessonSlug);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && open && !isMissionCompleted) {
      const confirmClose = window.confirm('Missão em andamento. Deseja realmente fechar?');
      if (!confirmClose) return;
    }
    setOpen(nextOpen);
  };

  const concludeMission = () => {
    completeMission(lessonSlug);
    toast.success('Missão concluída com sucesso.');
    setOpen(false);
  };

  return (
    <motion.div
      animate={isMissionCompleted && !shouldReduceMotion ? { boxShadow: ['0 0 0 rgba(16,185,129,0)', '0 0 0 8px rgba(16,185,129,0.08)', '0 0 0 rgba(16,185,129,0)'] } : undefined}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl border p-5 shadow-sm ${isMissionCompleted ? 'border-emerald-300 bg-emerald-50/80' : 'border-appBorder bg-white'}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-lg font-semibold">{mission.title}</h4>
          <p className={`text-sm ${isMissionCompleted ? 'text-emerald-700' : 'text-slate-600'}`}>
            {isMissionCompleted ? 'Missão concluída' : 'Missão pendente'}
          </p>
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
            <Button>{isMissionCompleted ? 'Revisar missão' : 'Iniciar missão'}</Button>
          </motion.div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-appBorder bg-white p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out">
            <div className="flex items-start justify-between gap-3">
              <Dialog.Title className="text-lg font-semibold">{mission.title}</Dialog.Title>
              <Dialog.Close asChild>
                <motion.button whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }} aria-label="Fechar missão" className="rounded-md border p-1 text-slate-500 hover:bg-slate-50">
                  <X size={16} />
                </motion.button>
              </Dialog.Close>
            </div>

            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Objetivo</p>
                <p>{mission.objective}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Passos</p>
                <ol className="ml-5 list-decimal space-y-1">
                  {mission.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Comandos sugeridos</p>
                <ul className="ml-5 list-disc space-y-1">
                  {mission.suggestedCommands.map((command) => (
                    <li key={command}>
                      <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{command}</code>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Checklist</p>
                <ul className="ml-5 list-disc space-y-1">
                  {mission.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Resultado esperado</p>
                <p>{mission.expectedResult}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close asChild>
                <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  <Button className="bg-slate-600 hover:bg-slate-700">Cancelar</Button>
                </motion.div>
              </Dialog.Close>
              {!isMissionCompleted ? (
                <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}>
                  <Button onClick={concludeMission}>Concluir missão</Button>
                </motion.div>
              ) : null}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
}
