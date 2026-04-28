'use client';

import { useState } from 'react';
import { Check, Copy, TerminalSquare } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function CommandBlock({ commands }: { commands: string[] }) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (content: string, key: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedCommand(key);
    toast.success('Comando copiado');
    window.setTimeout(() => setCopiedCommand(null), 1800);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(commands.join('\n'));
    setCopiedAll(true);
    toast.success('Comandos copiados');
    window.setTimeout(() => setCopiedAll(false), 1800);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-[#060b16] p-3.5 shadow-card">
      <div className="flex items-center justify-between rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <TerminalSquare size={14} className="text-blue-300" />
          <span className="font-medium">Terminal • RouterOS / Linux</span>
        </div>
        {commands.length > 1 ? (
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-600 px-2 py-1 text-[11px] text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            onClick={copyAll}
          >
            {copiedAll ? <Check size={13} /> : <Copy size={13} />}
            {copiedAll ? 'Copiado' : 'Copiar todos'}
          </button>
        ) : null}
      </div>

      {commands.map((command) => {
        const isCopied = copiedCommand === command;
        return (
          <div key={command} className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100">
            <code className="text-technical overflow-x-auto text-slate-100">{command}</code>
            <button
              className={cn(
                'shrink-0 rounded-md border px-2 py-1 text-[11px] transition',
                isCopied
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800',
              )}
              onClick={() => {
                void copyToClipboard(command, command);
              }}
            >
              <span className="inline-flex items-center gap-1.5">{isCopied ? <Check size={13} /> : <Copy size={13} />}{isCopied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
