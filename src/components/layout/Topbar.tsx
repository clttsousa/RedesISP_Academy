'use client';

import { useState } from 'react';
import { Bell, Search } from 'lucide-react';

const notifications = [
  'Nova missão prática disponível no módulo de BGP.',
  'Simulado de DNS pronto para revisão.',
  'Você concluiu 3 aulas esta semana. Continue assim!',
];

export function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationCount = notifications.length;

  return (
    <header className="relative flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-6">
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

      <div className="relative hidden md:block">
        <button
          className="relative rounded-lg border border-slate-200 p-2 text-slate-500"
          aria-label="Notificações"
          title="Notificações"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Bell size={16} />
          {notificationCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          ) : null}
        </button>

        {isOpen ? (
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border bg-white p-3 shadow-lg">
            <p className="text-sm font-semibold text-slate-900">Notificações</p>
            <div className="mt-2 space-y-2">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 p-2 text-sm text-slate-600">
                    {item}
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed p-3 text-sm text-slate-500">Sem notificações no momento.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="hidden text-sm text-slate-500 md:block">Aluno ISP • Nível avançado</div>
    </header>
  );
}
