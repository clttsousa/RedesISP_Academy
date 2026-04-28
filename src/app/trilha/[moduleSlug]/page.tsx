import { notFound } from 'next/navigation';
import { modules } from '@/data/modules';
import { AppShell } from '@/components/layout/AppShell';
import Link from 'next/link';
import { getModuleContinueLessonHref } from '@/lib/course-navigation';

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const module = modules.find((m) => m.slug === moduleSlug);
  if (!module) return notFound();

  const continueHref = getModuleContinueLessonHref(module.slug);

  return <AppShell><h1 className="text-2xl font-bold">{module.title}</h1><p>{module.description}</p><Link href={continueHref} className="text-primaryBlue underline">Continuar aula</Link></AppShell>;
}
