'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'motion/react';
import { ContentSection } from './ContentSection';
import { InfoBox } from './InfoBox';
import { AlertBox } from './AlertBox';
import { NetworkDiagram } from './NetworkDiagram';
import { CommandBlock } from './CommandBlock';
import { MissionCard } from './MissionCard';
import { QuickQuestionCard } from './QuickQuestionCard';
import { InteractiveChecklist } from './InteractiveChecklist';
import { Lesson } from '@/lib/types';

export function LessonTabs({ lesson }: { lesson: Lesson }) {
  return (
    <Tabs.Root defaultValue="conteudo" className="mt-4">
      <Tabs.List className="mb-4 flex gap-2 overflow-auto">
        {['conteudo', 'diagrama', 'exemplo', 'comandos', 'quiz'].map((t) => (
          <Tabs.Trigger key={t} value={t} className="rounded border bg-white px-3 py-2 text-sm capitalize">
            {t}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="conteudo">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {lesson.sections.map((s) =>
            s.variant === 'info' ? (
              <InfoBox key={s.title} content={s.content} />
            ) : s.variant === 'alert' ? (
              <AlertBox key={s.title} content={s.content} />
            ) : (
              <ContentSection key={s.title} title={s.title} content={s.content} />
            ),
          )}
          <InteractiveChecklist items={lesson.checklist} />
          <h3 className="text-lg font-semibold">Diagrama</h3>
          <NetworkDiagram />
          <h3 className="text-lg font-semibold">Comandos úteis</h3>
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
        <p>{lesson.sections.find((s) => s.title.includes('Exemplo'))?.content}</p>
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
