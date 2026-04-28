import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('inline-flex items-center rounded-md bg-primaryBlue px-4 py-2 text-sm font-medium text-white hover:opacity-90', className)} {...props} />;
}
