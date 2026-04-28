import Link from 'next/link';
export function GlossaryPanel({ terms }: { terms: string[] }) { return <div className="rounded-xl border bg-white p-4"><h4 className="font-semibold">Glossário rápido</h4><ul className="mt-2 space-y-1 text-sm">{terms.map((t) => <li key={t}><Link href="/glossario" className="text-primaryBlue underline">{t}</Link></li>)}</ul></div>; }
