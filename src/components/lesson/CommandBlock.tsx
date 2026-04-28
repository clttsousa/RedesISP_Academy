'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CommandBlock({ commands }: { commands: string[] }) {
  return <div className="space-y-2">{commands.map((c) => <div key={c} className="rounded border bg-slate-950 p-3 text-sm text-slate-100"><code>{c}</code><Button className="ml-3 bg-slate-700" onClick={() => { navigator.clipboard.writeText(c); toast.success('Comando copiado'); }}>Copiar</Button></div>)}</div>;
}
