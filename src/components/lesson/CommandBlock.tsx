'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    <div className="space-y-2">
      {commands.length > 1 ? (
        <Button className="bg-slate-700" onClick={copyAll}>
          {copiedAll ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
          Copiar todos
        </Button>
      ) : null}

      {commands.map((command) => {
        const isCopied = copiedCommand === command;
        return (
          <div key={command} className="flex items-center justify-between gap-3 rounded border bg-slate-950 p-3 text-sm text-slate-100">
            <code className="overflow-x-auto">{command}</code>
            <Button
              className="shrink-0 bg-slate-700"
              onClick={() => {
                void copyToClipboard(command, command);
              }}
            >
              {isCopied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
              {isCopied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
