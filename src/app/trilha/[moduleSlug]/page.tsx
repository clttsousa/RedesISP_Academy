import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';
import { BookOpen, CheckSquare, FlaskConical, GraduationCap } from 'lucide-react';
import { modules } from '@/data/modules';
import { ReactNode } from 'react';
import { ModuleLessonsPanel } from '@/components/course/ModuleLessonsPanel';
import { NetworkDiagram } from '@/components/lesson/NetworkDiagram';

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const moduleData = modules.find((m) => m.slug === moduleSlug);
  if (!moduleData) return notFound();

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <header className="rounded-2xl border bg-white p-5 sm:p-6">
            <p className="text-xs uppercase tracking-wide text-primaryBlue">Módulo da trilha</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-4xl">{moduleData.title}</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-lg">{moduleData.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-lightBlue px-3 py-1 text-sm font-medium text-primaryBlue">Nível {moduleData.level}</span>
              <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{moduleData.estimatedHours}h estimadas</span>
            </div>
          </header>

          <ModuleLessonsPanel module={moduleData} />



          <section className="rounded-2xl border bg-white p-5">
            <NetworkDiagram moduleSlug={moduleData.slug} className="border-0 p-0" />
          </section>

          <section className="rounded-2xl border bg-white p-5">
            <div className="mt-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard icon={<BookOpen size={18} className="text-primaryBlue" />} title="Aulas" description={`${moduleData.lessons.length} aulas focadas em aplicação prática.`} />
              <InfoCard icon={<CheckSquare size={18} className="text-emerald-600" />} title="Checklist" description="Checklist operacional para validar o aprendizado." />
              <InfoCard icon={<FlaskConical size={18} className="text-primaryBlue" />} title="Labs" description="Laboratórios orientados para cenários reais de ISP." />
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
              {moduleData.pocketSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <h3 className="text-xl font-semibold">Glossário rápido</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {moduleData.glossaryTerms.map((term) => (
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
