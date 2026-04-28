import { AppShell } from '@/components/layout/AppShell';
import { sources } from '@/data/sources';
export default function FontesPage() { return <AppShell><h1 className="text-2xl font-bold">Fontes oficiais</h1><ul>{sources.map((s) => <li key={s.url}><a href={s.url} className="text-primaryBlue underline">{s.title}</a></li>)}</ul></AppShell>; }
