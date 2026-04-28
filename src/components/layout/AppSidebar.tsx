'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';

export function AppSidebar() {
  return (
    <aside className="w-72 bg-navy p-4 text-slate-100">
      <h2 className="mb-6 text-lg font-semibold">Redes ISP Academy</h2>
      <p className="mb-2 text-xs text-slate-300">Módulos</p>
      <nav className="space-y-1">
        {modules.map((m) => (
          <Link key={m.id} href={`/trilha/${m.slug}`} className="block rounded px-2 py-2 text-sm hover:bg-slate-800">
            {m.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
