export type Module = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  estimatedHours: number;
  progress: number;
  status: 'nao-iniciado' | 'em-andamento' | 'concluido';
  lessons: string[];
  glossaryTerms: string[];
  commands: string[];
  checklist: string[];
  labs: string[];
  pocketSummary: string[];
  officialSources: string[];
};

export type LessonSection = { title: string; type: string; content: string; variant?: 'info' | 'alert' | 'default' };

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  order: number;
  estimatedMinutes: number;
  progress: number;
  sections: LessonSection[];
  diagram: string;
  commands: string[];
  checklist: string[];
  mission: string;
  quickQuestion: string;
  glossaryTerms: string[];
  sources: string[];
  previousLessonSlug?: string;
  nextLessonSlug?: string;
};
