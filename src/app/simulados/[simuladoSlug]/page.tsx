import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { findSimulado, simulados } from '@/lib/simulados';

export default async function SimuladoPage({ params }: { params: Promise<{ simuladoSlug: string }> }) {
  const { simuladoSlug } = await params;
  const simulado = findSimulado(simuladoSlug);

  if (!simulado) return notFound();

  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primaryBlue">Simulado por módulo</p>
          <h1 className="mt-2 text-3xl font-bold">{simulado.moduleTitle}</h1>
          <p className="mt-2 text-sm text-slate-600">{simulado.questionCount} perguntas curtas para reforçar operações e troubleshooting.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <p className="text-xs uppercase text-slate-500">Nível</p>
            <p className="mt-1 text-lg font-semibold">{simulado.level}</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-slate-500">Tempo sugerido</p>
            <p className="mt-1 text-lg font-semibold">{simulado.estimatedMinutes} minutos</p>
          </Card>
          <Card>
            <p className="text-xs uppercase text-slate-500">Cobertura</p>
            <p className="mt-1 text-lg font-semibold">Baseado em quizzes oficiais</p>
          </Card>
        </div>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Perguntas e gabarito</h2>
          <ol className="space-y-3">
            {simulado.questions.map((question, index) => (
              <li key={question.id} className="rounded-xl border bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{index + 1}. {question.question}</p>
                <p className="mt-2 text-sm text-slate-600"><strong>Resposta:</strong> {question.answer}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Outros simulados</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {simulados
              .filter((item) => item.slug !== simulado.slug)
              .slice(0, 4)
              .map((item) => (
                <Link key={item.id} href={`/simulados/${item.slug}`} className="rounded-full border px-3 py-1 text-sm text-slate-700 hover:bg-slate-50">
                  {item.moduleTitle}
                </Link>
              ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
