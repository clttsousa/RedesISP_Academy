'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type SimuladoQuestion = {
  id: string;
  question: string;
  answer: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

export function SimuladoRunner({ questions }: { questions: SimuladoQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const result = useMemo(() => {
    const graded = questions.map((question) => {
      const userAnswer = answers[question.id] ?? '';
      const correct = normalize(userAnswer) === normalize(question.answer);
      return { ...question, userAnswer, correct };
    });

    const correctCount = graded.filter((item) => item.correct).length;
    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    return {
      graded,
      correctCount,
      score,
      reviewPoints: graded
        .filter((item) => !item.correct)
        .map((item) => `Revisar: "${item.question}" (resposta esperada: ${item.answer}).`),
    };
  }, [answers, questions]);

  const finishExam = () => {
    const unanswered = questions.filter((question) => !answers[question.id]?.trim());
    if (unanswered.length > 0) {
      toast.warning(`Você ainda tem ${unanswered.length} pergunta(s) sem resposta.`);
      return;
    }

    setIsFinished(true);
    toast.success('Simulado finalizado. Confira seu resultado.');
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Perguntas</h2>
        <ol className="space-y-3">
          {questions.map((question, index) => (
            <li key={question.id} className="rounded-xl border bg-slate-50 p-4">
              <p className="font-medium text-slate-900">
                {index + 1}. {question.question}
              </p>
              <textarea
                value={answers[question.id] ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))}
                placeholder="Digite sua resposta"
                disabled={isFinished}
                className="mt-3 w-full rounded-lg border px-3 py-2 text-sm"
                rows={3}
              />
            </li>
          ))}
        </ol>

        {!isFinished ? <Button onClick={finishExam}>Finalizar simulado</Button> : null}
      </Card>

      {isFinished ? (
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold">Resultado</h3>
          <p className="text-sm text-slate-700">
            Pontuação: <strong>{result.score}%</strong> ({result.correctCount} de {questions.length} corretas)
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold">Gabarito e explicações</h4>
            {result.graded.map((item) => (
              <div key={item.id} className={`rounded-lg border p-3 text-sm ${item.correct ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
                <p className="font-medium">{item.question}</p>
                <p className="mt-1">
                  <strong>Sua resposta:</strong> {item.userAnswer || '—'}
                </p>
                <p>
                  <strong>Gabarito:</strong> {item.answer}
                </p>
                <p className="text-slate-700">
                  <strong>Explicação:</strong> A resposta correta resume o ponto-chave operacional que deve ser validado neste cenário.
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Pontos para revisar</h4>
            {result.reviewPoints.length > 0 ? (
              <ul className="ml-5 list-disc text-sm text-slate-700">
                {result.reviewPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-emerald-700">Excelente, você não tem pendências neste simulado.</p>
            )}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
