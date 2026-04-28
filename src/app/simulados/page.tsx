import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
export default function SimuladosPage() { return <AppShell><h1 className="text-2xl font-bold">Simulados</h1><Link href="/simulados/incidente-bgp" className="text-primaryBlue underline">Incidente de vazamento BGP</Link></AppShell>; }
