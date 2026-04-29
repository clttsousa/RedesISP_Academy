import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { findSimulado, simulados } from '@/lib/simulados';
import { SimuladoRunner } from '@/components/simulados/SimuladoRunner';

export default async function SimuladoPage({ params }: { params: Promise<{ simuladoSlug: string }> }) {
  const { simuladoSlug } = await params;
  const simulado = findSimulado(simuladoSlug);
  if (!simulado) return notFound();
  return (
    <AppShell>
      <section className="space-y-5">
        <header className="rounded-2xl border bg-white p-6"><h1 className="text-3xl font-bold">Simulado: {simulado.moduleTitle}</h1><p className="text-sm text-slate-600">Cenário, evidências e perguntas. O gabarito só aparece após finalizar.</p></header>
        <Card><h3 className="font-semibold">Cenário</h3><p className="text-sm">Você está no plantão do NOC e precisa analisar sintomas e responder rapidamente ao incidente.</p><h3 className="mt-3 font-semibold">Evidências</h3><ul className="ml-5 list-disc text-sm"><li>Alarmes e KPIs do módulo {simulado.moduleTitle}</li><li>Relatos de clientes e logs operacionais</li></ul></Card>
        <SimuladoRunner questions={simulado.questions} simuladoSlug={simulado.slug} />
        <Card><h3 className="text-sm font-semibold">Outros simulados</h3><div className="mt-3 flex flex-wrap gap-2">{simulados.filter((i)=>i.slug!==simulado.slug).slice(0,4).map((i)=><Link key={i.id} href={`/simulados/${i.slug}`} className="rounded-full border px-3 py-1 text-sm">{i.moduleTitle}</Link>)}</div></Card>
      </section>
    </AppShell>
  );
}
