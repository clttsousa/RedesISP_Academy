import { Info } from 'lucide-react';

export function InfoBox({ title = 'Informação importante', content }: { title?: string; content: string }) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-lightBlue px-4 py-3.5 shadow-sm">
      <div className="mb-1.5 flex items-center gap-2 text-primaryBlue">
        <Info size={16} />
        <p className="text-sm font-semibold text-blue-900">{title}</p>
      </div>
      <p className="text-sm text-blue-900/90">{content}</p>
    </div>
  );
}
