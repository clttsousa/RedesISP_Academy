import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function NextLessonCard({ moduleSlug, nextLessonSlug }: { moduleSlug: string; nextLessonSlug?: string }) {
  if (!nextLessonSlug) {
    return (
      <Card variant="summary">
        <h4 className="text-lg font-semibold">Próxima aula</h4>
        <p className="text-sm">Você chegou ao fim deste módulo.</p>
      </Card>
    );
  }

  return (
    <Card variant="action">
      <h4 className="text-lg font-semibold">Próxima aula</h4>
      <p className="text-sm">Continue para a sequência da trilha.</p>
      <Link href={`/trilha/${moduleSlug}/aulas/${nextLessonSlug}`}>
        <Button className="mt-3">Ir para próxima aula</Button>
      </Link>
    </Card>
  );
}
