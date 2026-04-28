import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '@/components/search/CommandPalette';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-appBg lg:flex">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
