import { Card } from '@/components/ui/card';

export function ContentSection({ title, content }: { title: string; content: string }) {
  return (
    <Card variant="content" className="space-y-2.5">
      <h3 className="text-xl font-semibold text-textPrimary">{title}</h3>
      <p className="text-[15px] leading-7 text-textSecondary">{content}</p>
    </Card>
  );
}
