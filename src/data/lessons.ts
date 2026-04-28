import { Lesson } from '@/lib/types';

export const lessons: Lesson[] = [
  {
    id: 'ebgp-ibgp-politicas',
    moduleId: 'm7',
    title: 'Aula 4 — eBGP, iBGP e políticas',
    slug: 'ebgp-ibgp-politicas',
    order: 4,
    estimatedMinutes: 25,
    progress: 35,
    sections: [
      { title: 'Por que isso importa?', type: 'paragraph', content: 'O BGP é o protocolo que conecta sua rede ao mundo. Ele define rotas, política de tráfego e resiliência para garantir conectividade global, performance e controle de custos de trânsito.' },
      { title: 'Box informativo', type: 'info', variant: 'info', content: 'Em um ISP, uma política bem definida no BGP evita vazamento de rotas, otimiza caminhos e reduz o impacto de falhas.' },
      { title: 'Explicação simples', type: 'paragraph', content: 'Existem dois tipos principais de sessões BGP: eBGP, usado entre AS diferentes, e iBGP, usado dentro do mesmo AS. Políticas determinam o que entra e o que sai da sua rede.' },
      { title: 'Explicação técnica', type: 'paragraph', content: 'O eBGP é utilizado entre sistemas autônomos diferentes e o iBGP dentro do mesmo sistema autônomo. Boas práticas incluem next-hop-self, route reflectors, communities BGP e filtros de prefixo.' },
      { title: 'Alerta operacional', type: 'alert', variant: 'alert', content: 'Atenção: evite iBGP full-mesh em grandes redes. Utilize Route Reflectors ou Confederações.' },
      { title: 'Exemplo real de ISP', type: 'paragraph', content: 'Um ISP anuncia seus prefixos para múltiplos peers em IXs e recebe rotas de trânsito. Políticas definem preferências de entrada e saída para otimizar performance e custo.' }
    ],
    diagram: 'Cliente → ONU → OLT → BNG → Core → Borda → Trânsito / IX.br / Peering',
    commands: ['show ip bgp summary', 'show ip bgp neighbors', 'show ip bgp ipv4 unicast summary', 'show ip bgp ipv4 unicast 200.200.200.1 advertised-routes'],
    checklist: ['Sessões BGP ativas e estáveis', 'Prefixos anunciados e filtrados corretamente', 'Políticas de entrada e saída aplicadas', 'Comunidades documentadas e utilizadas', 'Monitoramento e alertas configurados'],
    mission: 'Configure uma sessão eBGP com seu provedor de trânsito e anuncie sua rede via prefix-list. Aplique filtro para aceitar apenas o necessário.',
    quickQuestion: 'Qual a principal diferença entre eBGP e iBGP?',
    glossaryTerms: ['AS', 'eBGP', 'iBGP', 'Prefix-list'],
    sources: ['RFC 4271', 'MANRS'],
    previousLessonSlug: 'bgp-filtros',
    nextLessonSlug: 'bgp-comunidades'
  }
];
