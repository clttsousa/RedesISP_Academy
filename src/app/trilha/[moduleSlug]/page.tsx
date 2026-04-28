import { notFound } from 'next/navigation';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const module = modules.find((m) => m.slug === moduleSlug);
  if (!module) return notFound();
  return <AppShell><h1 className="text-2xl font-bold">{module.title}</h1><p>{module.description}</p><Link href={`/trilha/${module.slug}/aulas/ebgp-ibgp-politicas`} className="text-primaryBlue underline">Continuar aula</Link></AppShell>;
}
