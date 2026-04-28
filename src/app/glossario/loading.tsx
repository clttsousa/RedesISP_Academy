import { AppShell } from '@/components/layout/AppShell';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingGlossarioPage() {
  return (
    <AppShell>
      <section className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-16 w-full" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </section>
    </AppShell>
  );
}
