'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock3 } from 'lucide-react';
import { useProgressStore } from '@/store/progress-store';
import { getModuleProgress, getModuleStatus, getOverallProgress } from '@/lib/progress';
import { getLessonsByModuleSlug } from '@/lib/course-navigation';

export function AppSidebar() {
  const pathname = usePathname();
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const hasHydrated = useProgressStore((state) => state.hasHydrated);

  const overallProgress = hasHydrated ? getOverallProgress(completedLessons) : 0;

  return (
    <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-gradient-to-b from-navy via-[#092748] to-[#020d1d] px-4 py-6 text-slate-100 lg:block">
      <div className="mb-8">
        <h2 className="text-3xl font-bold leading-tight text-white">
          Redes ISP
          <span className="block text-primaryBlue">Academy</span>
        </h2>
      </div>

      <div className="mb-8 space-y-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">Progresso geral</span>
          <span className="font-semibold text-white">{overallProgress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/20">
          <div className="h-2 rounded-full bg-primaryBlue" style={{ width: `${overallProgress}%` }} />
        </div>
      </div>

      <p className="mb-3 text-xs uppercase tracking-[0.14em] text-slate-300">Módulos da trilha</p>
      <nav className="max-h-[calc(100vh-260px)] space-y-1.5 overflow-y-auto pr-1">
        {modules.map((moduleItem, index) => {
          const href = `/trilha/${moduleItem.slug}`;
          const isActiveModule = pathname === href || pathname.startsWith(`${href}/`);
          const status = hasHydrated ? getModuleStatus(moduleItem.slug, completedLessons) : 'nao-iniciado';
          const moduleProgress = hasHydrated ? getModuleProgress(moduleItem.slug, completedLessons).percentage : 0;

          return (
            <div key={moduleItem.id} className="rounded-xl">
              <Link
                href={href}
                className={cn(
                  'group flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-all',
                  isActiveModule
                    ? 'border-primaryBlue/60 bg-gradient-to-r from-primaryBlue/30 to-primaryBlue/10 text-white shadow-lg shadow-blue-950/20'
                    : 'border-transparent text-slate-200 hover:border-white/15 hover:bg-white/10',
                )}
              >
                <span className="line-clamp-1">{`${index + 1}. ${moduleItem.title}`}</span>
                <span className="shrink-0">
                  {status === 'concluido' ? (
                    <CheckCircle2 size={16} className="text-emerald-300" />
                  ) : status === 'em-andamento' ? (
                    <Clock3 size={16} className="text-blue-200" />
                  ) : (
                    <Circle size={16} className="text-slate-400" />
                  )}
                </span>
              </Link>

              {isActiveModule ? (
                <div className="mt-1 rounded-xl border border-white/10 bg-white/5 p-2 text-xs text-slate-200">
                  <p className="mb-2 px-2 text-slate-300">{moduleProgress}% concluído</p>
                  <div className="space-y-1">
                    {getLessonsByModuleSlug(moduleItem.slug).map((lesson, lessonIndex) => {
                      const lessonHref = `/trilha/${moduleItem.slug}/aulas/${lesson.slug}`;
                      const isCompleted = completedLessons.includes(lesson.slug);
                      const isActiveLesson = pathname === lessonHref;

                      return (
                        <Link
                          key={lesson.slug}
                          href={lessonHref}
                          className={cn(
                            'ml-3 flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 text-[12px] transition',
                            isActiveLesson
                              ? 'border-white/20 bg-white/20 text-white'
                              : 'text-slate-300 hover:border-white/10 hover:bg-white/10',
                          )}
                        >
                          <span className="line-clamp-1 pr-2">{`${lessonIndex + 1}. ${lesson.title}`}</span>
                          {isCompleted ? <CheckCircle2 size={14} className="text-emerald-300" /> : <Circle size={14} className="text-slate-500" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Central de Ajuda</div>
    </aside>
  );
}
