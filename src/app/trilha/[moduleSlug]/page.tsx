import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';
import { BookOpen, CheckSquare, FlaskConical, GraduationCap, PlayCircle } from 'lucide-react';
import { modules } from '@/data/modules';
import { getModuleContinueLessonHref } from '@/lib/course-navigation';
import { ReactNode } from 'react';

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const module = modules.find((m) => m.slug === moduleSlug);
  if (!module) return notFound();

  const continueHref = getModuleContinueLessonHref(module.slug);

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <header className="rounded-2xl border bg-white p-5 sm:p-6">
            <p className="text-xs uppercase tracking-wide text-primaryBlue">Módulo da trilha</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">{module.title}</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-lg">{module.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-lightBlue px-3 py-1 text-sm font-medium text-primaryBlue">Nível {module.level}</span>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{module.estimatedHours}h estimadas</span>
            </div>
          </header>

          <section className="rounded-2xl border bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">Continue de onde parou</h2>
              <Link href={continueHref} className="inline-flex items-center rounded-lg border border-primaryBlue px-4 py-2 text-sm font-semibold text-primaryBlue hover:bg-lightBlue">
                <PlayCircle size={16} className="mr-2" /> Continuar aula
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard icon={<BookOpen size={18} className="text-primaryBlue" />} title="Aulas" description={`${module.lessons.length} aulas focadas em aplicação prática.`} />
              <InfoCard icon={<CheckSquare size={18} className="text-emerald-600" />} title="Checklist" description="Checklist operacional para validar o aprendizado." />
              <InfoCard icon={<FlaskConical size={18} className="text-primaryBlue" />} title="Labs" description="Laboratórios orientados para cenários reais de ISP." />
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5">
            <h3 className="mb-3 text-xl font-semibold">Aulas do módulo</h3>
            <div className="space-y-2">
              {module.lessons.map((lesson, index) => (
                <div key={lesson} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-sm">
                  <span className="line-clamp-1 pr-2">{`${index + 1}. ${lesson.replaceAll('-', ' ')}`}</span>
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Aula</span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="flex items-center gap-2 text-xl font-semibold">
              <GraduationCap size={18} className="text-primaryBlue" /> Resumo rápido
            </h3>
            <p className="mt-3 text-sm text-slate-600">Pontos-chave para revisão antes de iniciar ou continuar as aulas deste módulo.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {module.pocketSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <h3 className="text-xl font-semibold">Glossário rápido</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {module.glossaryTerms.map((term) => (
                <li key={term} className="rounded-lg bg-slate-50 px-3 py-2 font-medium uppercase">
                  {term}
                </li>
              ))}
            </ul>
            <Link href="/glossario" className="mt-4 inline-flex text-sm font-semibold text-primaryBlue hover:underline">
              Ver glossário completo →
            </Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function InfoCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold">
        {icon} {title}
      </h4>
      <p className="text-sm text-slate-700">{description}</p>
    </div>
  );
}
