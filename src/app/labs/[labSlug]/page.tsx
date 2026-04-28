import Link from 'next/link';
import { notFound } from 'next/navigation';
import { labs } from '@/data/labs';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';

const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));

export default async function LabPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const { labSlug } = await params;
  const lab = labs.find((item) => item.slug === labSlug);

  if (!lab) return notFound();

  const relatedLabs = labs.filter((item) => item.moduleSlug === lab.moduleSlug && item.slug !== lab.slug);

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Laboratório prático</p>
          <h1 className="mt-2 text-3xl font-bold">{lab.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{moduleTitleBySlug.get(lab.moduleSlug) ?? lab.moduleSlug}</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <p className="text-xs uppercase text-slate-500">Dificuldade</p>
            <p className="mt-1 text-lg font-semibold">{lab.difficulty}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-slate-500">Tempo estimado</p>
            <p className="mt-1 text-lg font-semibold">{lab.estimatedMinutes} min</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-slate-500">Objetivo</p>
            <p className="mt-1 text-sm text-slate-700">{lab.objective}</p>
          </Card>
        </div>

        <Card className="space-y-3">
          <h2 className="text-xl font-semibold">Cenário</h2>
          <p className="text-sm text-slate-700">{lab.scenario}</p>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-xl font-semibold">Passo a passo</h2>
          <ol className="space-y-2">
            {lab.steps.map((step, index) => (
              <li key={step} className="rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-800">
                <span className="font-semibold text-primaryBlue">Etapa {index + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Comandos sugeridos</h3>
          <ul className="mt-2 space-y-1 font-mono text-xs text-slate-700">
            {lab.suggestedCommands.map((command) => (
              <li key={command} className="rounded bg-slate-50 px-2 py-1">
                {command}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Checklist de validação</h3>
          <ul className="mt-2 ml-5 list-disc text-sm text-slate-700">
            {lab.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Resultado esperado</h3>
          <p className="mt-2 text-sm text-slate-700">{lab.expectedResult}</p>
        </Card>

        {relatedLabs.length > 0 && (
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Labs relacionados</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedLabs.map((item) => (
                <Link key={item.id} href={`/labs/${item.slug}`} className="rounded-full border px-3 py-1 text-sm text-slate-700 hover:bg-slate-50">
                  {item.title}
                </Link>
              ))}
            </div>
          </Card>
        )}
      </section>
    </AppShell>
  );
}
