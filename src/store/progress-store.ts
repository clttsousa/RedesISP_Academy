'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ProgressState = {
  completedLessons: string[];
  hasHydrated: boolean;
  completeLesson: (lessonSlug: string) => void;
  setHydrated: (value: boolean) => void;
};

const KEY = 'redes-isp-progress';

const safeLocalStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // noop
    }
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      // noop
    }
  },
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      hasHydrated: false,
      completeLesson: (lessonSlug) =>
        set((state) => ({
          completedLessons: Array.from(new Set([...state.completedLessons, lessonSlug])),
        })),
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: KEY,
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({ completedLessons: state.completedLessons }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<ProgressState> | undefined;
        return {
          ...currentState,
          completedLessons: Array.isArray(persisted?.completedLessons)
            ? persisted!.completedLessons.filter((item): item is string => typeof item === 'string')
            : currentState.completedLessons,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
