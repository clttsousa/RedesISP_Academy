import { Card } from '@/components/ui/card';
export function QuickQuestionCard({ question }: { question: string }) { return <Card><h4 className="font-semibold">Pergunta rápida</h4><p className="text-sm text-slate-700">{question}</p></Card>; }
