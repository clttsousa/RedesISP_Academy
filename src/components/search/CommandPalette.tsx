'use client';

import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { modules } from '@/data/modules';
import { lessons } from '@/data/lessons';
import { glossary } from '@/data/glossary';
import { labs } from '@/data/labs';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  useHotkeys('ctrl+k', (e) => { e.preventDefault(); setOpen((v) => !v); });
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-16 w-[90vw] max-w-xl -translate-x-1/2 rounded bg-white p-2">
          <Command label="Busca rápida">
            <Command.Input placeholder="Buscar módulo, aula, termo, comando ou lab..." className="w-full border p-2" />
            <Command.List>
              <Command.Empty>Nada encontrado.</Command.Empty>
              <Command.Group heading="Módulos">{modules.map((m) => <Command.Item key={m.id}>{m.title}</Command.Item>)}</Command.Group>
              <Command.Group heading="Aulas">{lessons.map((l) => <Command.Item key={l.id}>{l.title}</Command.Item>)}</Command.Group>
              <Command.Group heading="Glossário">{glossary.map((g) => <Command.Item key={g.term}>{g.term}</Command.Item>)}</Command.Group>
              <Command.Group heading="Labs">{labs.map((l) => <Command.Item key={l.id}>{l.title}</Command.Item>)}</Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
