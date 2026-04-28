import { labs } from '@/data/labs';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
export default async function LabPage({ params }: { params: Promise<{ labSlug: string }> }) { const { labSlug } = await params; const lab = labs.find((l) => l.slug === labSlug); if (!lab) return notFound(); return <AppShell><h1 className="text-2xl font-bold">{lab.title}</h1><p>{lab.objective}</p></AppShell>; }
