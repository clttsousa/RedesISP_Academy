'use client';

import { Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <button className="flex items-center gap-2 rounded border px-3 py-2 text-sm" aria-label="Abrir busca">
        <Search size={16} /> Buscar <span className="text-slate-400">Ctrl+K</span>
      </button>
      <div className="text-sm text-slate-500">Aluno ISP</div>
    </header>
  );
}
