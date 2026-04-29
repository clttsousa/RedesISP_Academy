'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type StudyMode = 'estudo' | 'noc';

type ProgressState = {
  completedLessons: string[];
  completedMissions: string[];
  completedLabs: string[];
  startedLabs: string[];
  completedSimulados: string[];
  hasHydrated: boolean;
  preferredTheme: 'system' | 'light' | 'dark';
  studyMode: StudyMode;
  completeLesson: (lessonSlug: string) => void;
  completeMission: (missionId: string) => void;
  startLab: (labSlug: string) => void;
  completeLab: (labSlug: string) => void;
  completeSimulado: (simuladoSlug: string) => void;
  setPreferredTheme: (theme: 'system' | 'light' | 'dark') => void;
  setStudyMode: (mode: StudyMode) => void;
  resetProgress: () => void;
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

const unique = (items: string[]) => Array.from(new Set(items));

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      completedMissions: [],
      completedLabs: [],
      startedLabs: [],
      completedSimulados: [],
      hasHydrated: false,
      preferredTheme: 'system',
      studyMode: 'estudo',
      completeLesson: (lessonSlug) => set((state) => ({ completedLessons: unique([...state.completedLessons, lessonSlug]) })),
      completeMission: (missionId) => set((state) => ({ completedMissions: unique([...state.completedMissions, missionId]) })),
      startLab: (labSlug) => set((state) => ({ startedLabs: unique([...state.startedLabs, labSlug]) })),
      completeLab: (labSlug) =>
        set((state) => ({ completedLabs: unique([...state.completedLabs, labSlug]), startedLabs: unique([...state.startedLabs, labSlug]) })),
      completeSimulado: (simuladoSlug) => set((state) => ({ completedSimulados: unique([...state.completedSimulados, simuladoSlug]) })),
      setPreferredTheme: (preferredTheme) => set({ preferredTheme }),
      setStudyMode: (studyMode) => set({ studyMode }),
      resetProgress: () =>
        set((state) => ({
          completedLessons: [],
          completedMissions: [],
          completedLabs: [],
          startedLabs: [],
          completedSimulados: [],
          preferredTheme: state.preferredTheme,
          studyMode: state.studyMode,
        })),
      setHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: KEY,
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        completedMissions: state.completedMissions,
        completedLabs: state.completedLabs,
        startedLabs: state.startedLabs,
        completedSimulados: state.completedSimulados,
        preferredTheme: state.preferredTheme,
        studyMode: state.studyMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
