'use client';

import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { modules } from '@/data/modules';
import { lessons } from '@/data/lessons';
import { glossary } from '@/data/glossary';
import { labs } from '@/data/labs';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useHotkeys('ctrl+k', (e) => {
    e.preventDefault();
    setOpen((v) => !v);
  });

  useEffect(() => {
    const handleToggle = () => setOpen((v) => !v);
    window.addEventListener('command-palette:toggle', handleToggle);
    return () => window.removeEventListener('command-palette:toggle', handleToggle);
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-16 w-[90vw] max-w-xl -translate-x-1/2 rounded bg-white p-2">
          <Command label="Busca rápida">
            <Command.Input placeholder="Buscar módulo, aula, termo, comando ou lab..." className="w-full border p-2" />
            <Command.List>
              <Command.Empty>Nada encontrado.</Command.Empty>
              <Command.Group heading="Módulos">
                {modules.map((moduleItem) => (
                  <Command.Item key={moduleItem.id} value={moduleItem.title} onSelect={() => navigateTo(`/trilha/${moduleItem.slug}`)}>
                    {moduleItem.title}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Aulas">
                {lessons.map((lesson) => (
                  <Command.Item
                    key={lesson.id}
                    value={lesson.title}
                    onSelect={() => { const moduleItem = modules.find((m) => m.id === lesson.moduleId); navigateTo(`/trilha/${moduleItem?.slug ?? 'bgp-em-isp'}/aulas/${lesson.slug}`); }}
                  >
                    {lesson.title}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Glossário">
                {glossary.map((item) => (
                  <Command.Item key={item.term} value={item.term} onSelect={() => navigateTo('/glossario')}>
                    {item.term}
                  </Command.Item>
                ))}
              </Command.Group>
              <Command.Group heading="Labs">
                {labs.map((lab) => (
                  <Command.Item key={lab.id} value={lab.title} onSelect={() => navigateTo(`/labs/${lab.slug}`)}>
                    {lab.title}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
