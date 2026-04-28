import Link from 'next/link';
import { labs } from '@/data/labs';
import { AppShell } from '@/components/layout/AppShell';
export default function LabsPage() { return <AppShell><h1 className="text-2xl font-bold">Laboratórios</h1><ul>{labs.map((l) => <li key={l.id}><Link href={`/labs/${l.slug}`} className="text-primaryBlue underline">{l.title}</Link></li>)}</ul></AppShell>; }
