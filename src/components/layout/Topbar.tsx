'use client';

import { Bell, Search } from 'lucide-react';

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-6">
      <button
        className="flex w-full max-w-2xl items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500"
        aria-label="Abrir busca"
        onClick={() => window.dispatchEvent(new CustomEvent('command-palette:toggle'))}
      >
        <Search size={16} />
        <span className="hidden sm:inline">Buscar módulos, temas ou comandos...</span>
        <span className="sm:hidden">Buscar...</span>
        <span className="ml-auto hidden text-slate-400 md:inline">Ctrl+K</span>
      </button>

      <button className="hidden rounded-lg border border-slate-200 p-2 text-slate-500 md:block" aria-label="Notificações">
        <Bell size={16} />
      </button>
      <div className="hidden text-sm text-slate-500 md:block">Aluno ISP • Nível avançado</div>
    </header>
  );
}
