'use client';

import { useState } from 'react';
import { AlertTriangle, Check, Copy, TerminalSquare } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CommandItem } from '@/lib/types';

export function CommandBlock({ commands }: { commands: CommandItem[] }) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const copyToClipboard = async (content: string, key: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedCommand(key);
    toast.success('Comando copiado', { duration: 1400 });
    window.setTimeout(() => setCopiedCommand(null), 1800);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(commands.map((item) => item.command).join('\n'));
    setCopiedAll(true);
    toast.success('Comandos copiados', { duration: 1400 });
    window.setTimeout(() => setCopiedAll(false), 1800);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-[#060b16] p-3.5 shadow-card">
      <div className="flex items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} className="text-blue-300" />
          <span className="font-medium">Terminal • Comandos por vendor/contexto</span>
        </div>
        {commands.length > 1 ? (
          <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-200 transition hover:border-slate-500 hover:bg-slate-800" onClick={copyAll}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copiedAll ? 'done' : 'copy'} initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}>
                {copiedAll ? <Check size={13} /> : <Copy size={13} />}
              </motion.span>
            </AnimatePresence>
            {copiedAll ? 'Copiado' : 'Copiar todos'}
          </button>
        ) : null}
      </div>

      {commands.map((item) => {
        const isCopied = copiedCommand === item.command;
        return (
          <div key={`${item.lessonSlug ?? item.moduleSlug}-${item.command}`} className={cn('space-y-2 rounded-xl border px-3 py-2.5 text-sm', item.isPseudoCommand ? 'border-amber-700/70 bg-amber-950/20' : 'border-slate-800 bg-slate-950')}>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
              <span className="font-semibold">{item.vendor}</span>
              {item.isPseudoCommand ? <span className="inline-flex items-center gap-1 text-amber-300"><AlertTriangle size={12} /> Pseudocomando</span> : null}
            </div>
            <code className="text-technical block overflow-x-auto text-slate-100">{item.command}</code>
            <p className="text-xs text-slate-400">{item.explanation}</p>
            <button className={cn('shrink-0 rounded-md border px-2 py-1 text-[11px] transition', isCopied ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800')} onClick={() => void copyToClipboard(item.command, item.command)}>
              <span className="inline-flex items-center gap-1.5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={isCopied ? 'done' : 'copy'} initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}>
                    {isCopied ? <Check size={13} /> : <Copy size={13} />}
                  </motion.span>
                </AnimatePresence>
                {isCopied ? 'Copiado' : 'Copiar'}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
