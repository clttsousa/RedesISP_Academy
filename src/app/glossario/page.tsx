import { AppShell } from '@/components/layout/AppShell';
import { glossary } from '@/data/glossary';
export default function GlossarioPage() { return <AppShell><h1 className="text-2xl font-bold">Glossário</h1><ul>{glossary.map((g) => <li key={g.term}><strong>{g.term}:</strong> {g.definition}</li>)}</ul></AppShell>; }
