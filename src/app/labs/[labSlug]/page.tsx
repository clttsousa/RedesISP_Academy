import Link from 'next/link';
import { notFound } from 'next/navigation';
import { labs } from '@/data/labs';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { LabCompleteButton } from '@/components/labs/LabCompleteButton';
const moduleTitleBySlug = new Map(modules.map((module) => [module.slug, module.title]));
export default async function LabPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const { labSlug } = await params;
  const lab = labs.find((item) => item.slug === labSlug); if (!lab) return notFound();
  const relatedLabs = labs.filter((item) => item.moduleSlug === lab.moduleSlug && item.slug !== lab.slug);
  return <AppShell><section className="space-y-5"><header className="rounded-2xl border bg-white p-6"><h1 className="text-3xl font-bold">{lab.title}</h1><p className="text-sm text-slate-600">{moduleTitleBySlug.get(lab.moduleSlug)}</p></header>
  <Card><p className="text-sm text-slate-700"><strong>Cenário:</strong> {lab.scenario}</p><p className="mt-2 text-sm"><strong>Objetivo:</strong> {lab.objective}</p></Card>
  <Card><h2 className="text-xl font-semibold">Passos</h2><ol className="space-y-2">{lab.steps.map((step,i)=><li key={step} className="rounded-lg border bg-slate-50 px-4 py-3 text-sm"><strong>Etapa {i+1}:</strong> {step}</li>)}</ol></Card>
  <Card><h3 className="font-semibold">Comandos úteis</h3><ul className="mt-2 space-y-1 font-mono text-xs">{lab.suggestedCommands.map((command)=><li key={command} className="rounded bg-slate-50 px-2 py-1">{command}</li>)}</ul></Card>
  <Card><h3 className="font-semibold">Checklist de conclusão</h3><ul className="ml-5 list-disc">{lab.checklist.map((item)=><li key={item}>{item}</li>)}</ul></Card>
  <Card><h3 className="font-semibold">Resultado esperado</h3><p>{lab.expectedResult}</p></Card>
  <div className="flex gap-3"><LabCompleteButton labSlug={lab.slug} /><Link href="/labs" className="text-sm text-primaryBlue">Voltar aos labs</Link></div>
  {relatedLabs.length>0&&<Card><h3 className="text-sm font-semibold">Labs relacionados</h3><div className="mt-3 flex flex-wrap gap-2">{relatedLabs.map((item)=><Link key={item.id} href={`/labs/${item.slug}`} className="rounded-full border px-3 py-1 text-sm">{item.title}</Link>)}</div></Card>}
  </section></AppShell>;
}
