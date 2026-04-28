import { AlertTriangle } from 'lucide-react';

export function AlertBox({ title = 'Atenção', content }: { title?: string; content: string }) {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3.5 shadow-sm">
      <div className="mb-1.5 flex items-center gap-2 text-amber-700">
        <AlertTriangle size={16} />
        <p className="text-sm font-semibold text-amber-900">{title}</p>
      </div>
      <p className="text-sm text-amber-900/90">{content}</p>
    </div>
  );
}
