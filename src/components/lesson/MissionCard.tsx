'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

export function MissionCard({ mission }: { mission: string }) {
  return <Dialog.Root><Dialog.Trigger asChild><Button>Iniciar missão</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 bg-black/40" /><Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6"><Dialog.Title className="font-semibold">Missão prática</Dialog.Title><p className="mt-3 text-sm">{mission}</p></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
