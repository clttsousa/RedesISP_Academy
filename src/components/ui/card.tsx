import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const cardVariants = cva('rounded-2xl border p-5 transition-all duration-200', {
  variants: {
    variant: {
      content: 'border-appBorder bg-white shadow-card hover:-translate-y-0.5 hover:shadow-card-hover',
      alert: 'border-amber-200 bg-amber-50/90 shadow-sm',
      action: 'border-primaryBlue/30 bg-lightBlue/50 shadow-card hover:border-primaryBlue/60 hover:shadow-card-hover',
      status: 'border-emerald-200 bg-emerald-50/80 shadow-sm',
      summary: 'border-slate-200 bg-slate-50/80 shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'content',
  },
});

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />;
}
