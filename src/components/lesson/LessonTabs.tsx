'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'motion/react';
import { BookOpenText, Code2, Network, FlaskConical, GraduationCap } from 'lucide-react';
import { ContentSection } from './ContentSection';
import { InfoBox } from './InfoBox';
import { AlertBox } from './AlertBox';
import { NetworkDiagram } from './NetworkDiagram';
import { CommandBlock } from './CommandBlock';
import { MissionCard } from './MissionCard';
import { QuickQuestionCard } from './QuickQuestionCard';
import { InteractiveChecklist } from './InteractiveChecklist';
import { Lesson } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const tabItems = [
  { value: 'conteudo', label: 'Conteúdo', icon: BookOpenText },
  { value: 'diagrama', label: 'Diagrama', icon: Network },
  { value: 'exemplo', label: 'Exemplo real', icon: FlaskConical },
  { value: 'comandos', label: 'Comandos', icon: Code2 },
  { value: 'quiz', label: 'Quiz', icon: GraduationCap },
] as const;

export function LessonTabs({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState<(typeof tabItems)[number]['value']>('conteudo');

  return (
    <Tabs.Root defaultValue="conteudo" value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="mt-6">
      <Tabs.List className="mb-6 flex gap-1.5 overflow-x-auto rounded-2xl border border-appBorder bg-white p-1.5">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          return (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className={cn(
                'relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-textSecondary outline-none transition',
                'hover:bg-slate-100 hover:text-textPrimary focus-visible:ring-2 focus-visible:ring-primaryBlue/50',
                isActive && 'bg-lightBlue text-navy',
              )}
            >
              <Icon size={15} />
              {tab.label}
              {isActive ? <motion.span layoutId="lesson-tab-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primaryBlue" /> : null}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <Tabs.Content value="conteudo">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {lesson.sections.map((s) =>
            s.variant === 'info' ? (
              <InfoBox key={s.title} title={s.title} content={s.content} />
            ) : s.variant === 'alert' ? (
              <AlertBox key={s.title} title={s.title} content={s.content} />
            ) : (
              <ContentSection key={s.title} title={s.title} content={s.content} />
            ),
          )}
          <InteractiveChecklist items={lesson.checklist} />
          <h3 className="text-xl font-semibold">Diagrama</h3>
          <NetworkDiagram />
          <h3 className="text-xl font-semibold">Comandos úteis</h3>
          <CommandBlock commands={lesson.commands} />
          <MissionCard lessonSlug={lesson.slug} mission={lesson.mission} />
          <QuickQuestionCard
            question={lesson.quickQuestion.question}
            options={lesson.quickQuestion.options}
            correctAnswer={lesson.quickQuestion.correctAnswer}
            explanation={lesson.quickQuestion.explanation}
          />
        </motion.div>
      </Tabs.Content>
      <Tabs.Content value="diagrama">
        <NetworkDiagram />
      </Tabs.Content>
      <Tabs.Content value="exemplo">
        <ContentSection title="Exemplo real" content={lesson.sections.find((s) => s.title.includes('Exemplo'))?.content ?? 'Sem exemplo disponível.'} />
      </Tabs.Content>
      <Tabs.Content value="comandos">
        <CommandBlock commands={lesson.commands} />
      </Tabs.Content>
      <Tabs.Content value="quiz">
        <QuickQuestionCard
          question={lesson.quickQuestion.question}
          options={lesson.quickQuestion.options}
          correctAnswer={lesson.quickQuestion.correctAnswer}
          explanation={lesson.quickQuestion.explanation}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}
