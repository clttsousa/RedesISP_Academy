'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress-store';

type SimuladoQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  level: string;
};

export function SimuladoRunner({ questions, simuladoSlug }: { questions: SimuladoQuestion[]; simuladoSlug: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const completeSimulado = useProgressStore((state) => state.completeSimulado);

  const result = useMemo(() => {
    const graded = questions.map((question) => {
      const userAnswer = answers[question.id];
      const selectedOption = typeof userAnswer === 'number' ? question.options[userAnswer] : '';
      const correct = selectedOption === question.correctAnswer;
      return { ...question, userAnswer, selectedOption, correct };
    });

    const correctCount = graded.filter((item) => item.correct).length;
    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    return {
      graded,
      correctCount,
      score,
      maxScore: questions.length * 10,
      reviewPoints: graded.filter((item) => !item.correct).map((item) => `Revisar: "${item.question}" (resposta esperada: ${item.correctAnswer}).`),
    };
  }, [answers, questions]);

  const finishExam = () => {
    const unanswered = questions.filter((question) => typeof answers[question.id] !== 'number');
    if (unanswered.length > 0) {
      toast.warning(`Você ainda tem ${unanswered.length} pergunta(s) sem resposta.`);
      return;
    }

    setIsFinished(true);
    completeSimulado(simuladoSlug);
    toast.success('Simulado finalizado. Resultado liberado com gabarito e explicações.');
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Perguntas</h2>
        <ol className="space-y-3">
          {questions.map((question, index) => (
            <li key={question.id} className="rounded-xl border bg-slate-50 p-4">
              <p className="font-medium text-slate-900">{index + 1}. {question.question}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Nível: {question.level}</p>
              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => {
                  const checked = answers[question.id] === optionIndex;
                  return (
                    <label key={option} className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm ${checked ? 'border-primaryBlue bg-blue-50' : 'border-slate-200 bg-white'}`}>
                      <input type="radio" name={question.id} checked={checked} onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }))} disabled={isFinished} className="mt-0.5" />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
        {!isFinished ? <Button onClick={finishExam}>Finalizar simulado</Button> : null}
      </Card>

      {isFinished ? (
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold">Resultado</h3>
          <p className="text-sm text-slate-700">Pontuação: <strong>{result.score}%</strong> ({result.correctCount} de {questions.length} corretas) · Máximo: <strong>{result.maxScore}</strong> pontos</p>
          <div className="space-y-3"><h4 className="font-semibold">Gabarito e explicações</h4>{result.graded.map((item) => <div key={item.id} className={`rounded-lg border p-3 text-sm ${item.correct ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}><p className="font-medium">{item.question}</p><p className="mt-1"><strong>Sua resposta:</strong> {item.selectedOption || '—'}</p><p><strong>Gabarito:</strong> {item.correctAnswer}</p><p className="text-slate-700"><strong>Explicação:</strong> {item.explanation}</p></div>)}</div>
          <div className="space-y-2"><h4 className="font-semibold">Pontos para revisar</h4>{result.reviewPoints.length > 0 ? <ul className="ml-5 list-disc text-sm text-slate-700">{result.reviewPoints.map((point) => <li key={point}>{point}</li>)}</ul> : <p className="text-sm text-emerald-700">Excelente, você não tem pendências neste simulado.</p>}</div>
        </Card>
      ) : null}
    </div>
  );
}
