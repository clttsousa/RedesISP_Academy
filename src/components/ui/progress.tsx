'use client';

import { motion, useReducedMotion } from 'motion/react';

export function Progress({ value }: { value: number }) {
  const shouldReduceMotion = useReducedMotion();
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="h-2 w-full overflow-hidden rounded bg-slate-100">
      <motion.div
        className="h-2 rounded bg-primaryBlue"
        initial={{ width: 0 }}
        animate={{ width: `${safeValue}%` }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
