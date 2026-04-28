'use client';

import { create } from 'zustand';

type ProgressState = {
  completedLessons: string[];
  completeLesson: (lessonSlug: string) => void;
};

const KEY = 'redes-isp-progress';

export const useProgressStore = create<ProgressState>((set) => ({
  completedLessons: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(KEY) || '[]') : [],
  completeLesson: (lessonSlug) =>
    set((state) => {
      const completedLessons = Array.from(new Set([...state.completedLessons, lessonSlug]));
      if (typeof window !== 'undefined') {
        localStorage.setItem(KEY, JSON.stringify(completedLessons));
      }
      return { completedLessons };
    }),
}));
