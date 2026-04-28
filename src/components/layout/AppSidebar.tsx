'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-80 shrink-0 bg-gradient-to-b from-navy via-[#06264A] to-[#031126] px-4 py-6 text-slate-100 lg:block">
      <div className="mb-8">
        <h2 className="text-3xl font-bold leading-tight">
          Redes ISP
          <span className="block text-primaryBlue">Academy</span>
        </h2>
      </div>

      <div className="mb-8 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Progresso geral</span>
          <span className="font-semibold">68%</span>
        </div>
        <div className="h-2 rounded-full bg-white/20">
          <div className="h-2 w-[68%] rounded-full bg-primaryBlue" />
        </div>
      </div>

      <p className="mb-3 text-xs uppercase tracking-wide text-slate-300">Módulos da trilha</p>
      <nav className="space-y-1.5">
        {modules.slice(0, 8).map((m, index) => {
          const href = `/trilha/${m.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={m.id}
              href={href}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors',
                isActive ? 'bg-primaryBlue text-white' : 'text-slate-200 hover:bg-white/10',
              )}
            >
              <span className="line-clamp-1">{`${index + 1}. ${m.title}`}</span>
              {index < 2 ? <CheckCircle2 size={16} className="shrink-0" /> : <Circle size={16} className="shrink-0 text-slate-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        Central de Ajuda
      </div>
    </aside>
  );
}
