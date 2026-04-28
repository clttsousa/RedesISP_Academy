export function ContentSection({ title, content }: { title: string; content: string }) {
  return <section className="space-y-2"><h3 className="text-lg font-semibold">{title}</h3><p className="text-slate-700">{content}</p></section>;
}
