import Link from 'next/link';
import { glossary } from '@/data/glossary';

export function GlossaryPanel({ terms }: { terms: string[] }) {
  const normalizedTerms = terms.map((term) => term.trim().toLowerCase()).filter(Boolean);
  const termEntries = glossary.filter((entry) => normalizedTerms.includes(entry.term.toLowerCase()));

  if (termEntries.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-4">
        <h4 className="font-semibold">Glossário rápido</h4>
        <p className="mt-2 text-sm text-slate-500">Sem termos relacionados para esta aula.</p>
        <Link href="/glossario" className="mt-3 inline-block text-sm font-medium text-primaryBlue underline">
          Ver todos os termos
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h4 className="font-semibold">Glossário rápido</h4>
      <ul className="mt-3 space-y-3">
        {termEntries.map((entry) => (
          <li key={entry.term} className="rounded-lg border border-slate-200 p-3">
            <p className="font-medium text-slate-900">{entry.term}</p>
            <p className="text-sm text-slate-600">{entry.definition}</p>
            {entry.relatedTerms.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {entry.relatedTerms.map((term) => (
                  <span key={`${entry.term}-${term}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                    {term}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <Link href="/glossario" className="mt-3 inline-block text-sm font-medium text-primaryBlue underline">
        Ver todos os termos
      </Link>
    </div>
  );
}
