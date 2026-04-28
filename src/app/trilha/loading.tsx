import { AppShell } from '@/components/layout/AppShell';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingTrilhaPage() {
  return (
    <AppShell>
      <section className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-80 w-full" />
      </section>
    </AppShell>
  );
}
