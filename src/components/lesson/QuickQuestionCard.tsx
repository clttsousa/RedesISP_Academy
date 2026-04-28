'use client';

import { useMemo, useState } from 'react';
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

  const handleReset = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <Card className="space-y-3">
      <h4 className="font-semibold">Pergunta rápida</h4>
      <p className="text-sm text-slate-700">{question}</p>

      <div className="space-y-2">
        {safeOptions.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === correctAnswer;

          return (
            <label
              key={option}
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
            </label>
          );
        })}
      </div>

      {!hasAnswered ? (
        <Button onClick={handleSubmit}>Responder</Button>
      ) : (
        <div className="space-y-3">
          <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>{isCorrect ? '✅ Você acertou.' : '❌ Você errou.'}</p>
          <p className="text-sm text-slate-700">
            <strong>Explicação:</strong> {explanation}
          </p>
          <Button className="bg-slate-700" onClick={handleReset}>
            Tentar novamente
          </Button>
        </div>
      )}
    </Card>
  );
}
