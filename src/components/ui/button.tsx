import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center rounded-lg bg-primaryBlue px-4 py-2 text-sm font-medium text-white transition',
        'hover:bg-[#0b5de3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlue/40 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
}
