import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export function NextLessonCard() { return <Card><h4 className="font-semibold">Próxima aula</h4><p className="text-sm">Aula 5 — Comunidades BGP</p><Link href="/trilha/bgp-em-isp/aulas/bgp-comunidades"><Button className="mt-3">Ir para próxima aula</Button></Link></Card>; }
