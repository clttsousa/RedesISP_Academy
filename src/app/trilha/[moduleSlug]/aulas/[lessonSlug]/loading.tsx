import { AppShell } from '@/components/layout/AppShell';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingLessonPage() {
  return (
    <AppShell>
      <section className="space-y-4">
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-96 w-full" />
      </section>
    </AppShell>
  );
}
