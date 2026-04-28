'use client';

import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { BookOpen, Box, FlaskConical, Search, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { modules } from '@/data/modules';
import { lessons } from '@/data/lessons';
import { glossary } from '@/data/glossary';
import { labs } from '@/data/labs';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

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
        <Dialog.Overlay className="fixed inset-0 bg-[#020617]/55 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed left-1/2 top-20 w-[94vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <Dialog.Title className="sr-only">Busca rápida</Dialog.Title>
          <Dialog.Description className="sr-only">Busca por módulos, aulas, glossário e laboratórios.</Dialog.Description>
          <Command label="Busca rápida" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-item]]:rounded-lg [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:text-slate-700 [&_[cmdk-item][data-selected='true']]:bg-lightBlue [&_[cmdk-item][data-selected='true']]:text-navy [&_[cmdk-item][data-selected='true']]:ring-1 [&_[cmdk-item][data-selected='true']]:ring-primaryBlue/35">
            <div className="border-b border-appBorder p-3">
              <div className="flex items-center gap-2 rounded-xl border border-appBorder bg-slate-50 px-3 py-2">
                <Search size={16} className="text-slate-500" />
                <Command.Input placeholder="Buscar módulo, aula, termo, comando ou lab..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
                <span className="text-xs text-slate-400">Ctrl + K</span>
              </div>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-3">
              <Command.Empty>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center"
                >
                  <Sparkles size={18} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">Nada encontrado</p>
                  <p className="text-xs text-slate-500">Tente outro termo ou navegue pelos grupos abaixo.</p>
                </motion.div>
              </Command.Empty>

              <Command.Group heading="Módulos">
                {modules.map((moduleItem) => (
                  <Command.Item key={moduleItem.id} value={moduleItem.title} onSelect={() => navigateTo(`/trilha/${moduleItem.slug}`)}>
                    <BookOpen size={14} className="mr-2 text-slate-500" />
                    {moduleItem.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <div className="my-2 border-t border-slate-100" />

              <Command.Group heading="Aulas">
                {lessons.map((lesson) => (
                  <Command.Item
                    key={lesson.id}
                    value={lesson.title}
                    onSelect={() => {
                      const moduleItem = modules.find((m) => m.id === lesson.moduleId);
                      if (!moduleItem) {
                        navigateTo('/trilha');
                        return;
                      }
                      navigateTo(`/trilha/${moduleItem.slug}/aulas/${lesson.slug}`);
                    }}
                  >
                    <BookOpen size={14} className="mr-2 text-slate-500" />
                    {lesson.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <div className="my-2 border-t border-slate-100" />

              <Command.Group heading="Glossário">
                {glossary.map((item) => (
                  <Command.Item key={item.term} value={item.term} onSelect={() => navigateTo('/glossario')}>
                    <Box size={14} className="mr-2 text-slate-500" />
                    {item.term}
                  </Command.Item>
                ))}
              </Command.Group>

              <div className="my-2 border-t border-slate-100" />

              <Command.Group heading="Labs">
                {labs.map((lab) => (
                  <Command.Item key={lab.id} value={lab.title} onSelect={() => navigateTo(`/labs/${lab.slug}`)}>
                    <FlaskConical size={14} className="mr-2 text-slate-500" />
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
