import { AppShell } from '@/components/layout/AppShell';
export default async function SimuladoPage({ params }: { params: Promise<{ simuladoSlug: string }> }) { const { simuladoSlug } = await params; return <AppShell><h1 className="text-2xl font-bold">Simulado: {simuladoSlug}</h1></AppShell>; }
