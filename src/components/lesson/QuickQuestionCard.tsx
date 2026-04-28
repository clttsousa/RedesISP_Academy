'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type QuickQuestionCardProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export function QuickQuestionCard({ question, options, correctAnswer, explanation }: QuickQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isCorrect = selectedOption === correctAnswer;
  const safeOptions = useMemo(() => Array.from(new Set(options)).filter(Boolean), [options]);

  const handleSubmit = () => {
    if (!selectedOption) {
      toast.warning('Selecione uma alternativa antes de responder.');
      return;
    }

    setHasAnswered(true);
    toast[isCorrect ? 'success' : 'error'](isCorrect ? 'Resposta correta!' : 'Resposta incorreta.');
  };

  return (
    <Card variant="summary" className="space-y-3">
      <h4 className="text-lg font-semibold text-textPrimary">Pergunta rápida</h4>
      <p className="text-sm leading-6 text-textSecondary">{question}</p>

      <div className="space-y-2">
        {safeOptions.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === correctAnswer;

          return (
            <motion.label
              key={option}
              whileTap={hasAnswered || shouldReduceMotion ? undefined : { scale: 0.99 }}
              animate={isSelected && !shouldReduceMotion ? { scale: [1, 1.01, 1] } : undefined}
              transition={{ duration: 0.2 }}
              className={[
                'flex cursor-pointer items-start gap-2 rounded-lg border p-2 text-sm transition',
                isSelected ? 'border-primaryBlue bg-blue-50' : 'border-slate-200 bg-white',
                hasAnswered && isCorrectOption ? 'border-emerald-400 bg-emerald-50' : '',
                hasAnswered && isSelected && !isCorrectOption ? 'border-rose-400 bg-rose-50' : '',
                hasAnswered ? 'cursor-not-allowed opacity-90' : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name={`quick-question-${question}`}
                checked={isSelected}
                onChange={() => setSelectedOption(option)}
                disabled={hasAnswered}
                className="mt-0.5"
              />
              <span>{option}</span>
            </motion.label>
          );
        })}
      </div>

      {!hasAnswered ? (
        <Button onClick={handleSubmit}>Responder</Button>
      ) : (
        <div className="space-y-3">
          <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>{isCorrect ? '✅ Você acertou.' : '❌ Você errou.'}</p>
          <AnimatePresence initial={false}>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="text-sm text-slate-700"
            >
              <strong>Explicação:</strong> {explanation}
            </motion.p>
          </AnimatePresence>
          <Button className="bg-slate-700" disabled>
            Respondido
          </Button>
        </div>
      )}
    </Card>
  );
}
