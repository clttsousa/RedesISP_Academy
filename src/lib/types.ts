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


export type DiagramLayer = 'acesso' | 'core' | 'borda' | 'internet' | 'servicos';

export type NetworkDiagramNode = {
  id: string;
  label: string;
  layer: DiagramLayer;
  icon?: 'monitor' | 'router' | 'server' | 'network' | 'shield' | 'globe' | 'database' | 'activity' | 'waypoints';
  col?: number;
  row?: number;
  hint?: string;
};

export type NetworkDiagramEdge = {
  from: string;
  to: string;
  label?: string;
  kind?: 'solid' | 'dashed';
};

export type NetworkDiagramLegendItem = {
  layer: DiagramLayer;
  label: string;
};

export type NetworkDiagramDefinition = {
  id: string;
  title: string;
  description: string;
  moduleSlug: string;
  nodes: NetworkDiagramNode[];
  edges: NetworkDiagramEdge[];
  legend: NetworkDiagramLegendItem[];
};

export type LessonSection = { title: string; type: string; content: string; variant?: 'info' | 'alert' | 'default' };

export type LessonQuickQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'facil' | 'medio' | 'dificil';
};

export type LessonMission = {
  title: string;
  objective: string;
  steps: string[];
  suggestedCommands: string[];
  checklist: string[];
  expectedResult: string;
};

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
  mission: LessonMission;
  quickQuestion: LessonQuickQuestion;
  glossaryTerms: string[];
  sources: string[];
  previousLessonSlug?: string;
  nextLessonSlug?: string;
};
