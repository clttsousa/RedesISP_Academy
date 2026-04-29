import { CommandItem, CommandVendor, Lesson } from '@/lib/types';
import { quizzes } from './quizzes';

type QuestionDifficulty = 'facil' | 'medio' | 'dificil';

type Seed = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  order: number;
  minutes: number;
  diagram: string;
  quickQuestion: string;
  mission: string;
  commands: string[];
  checklist: string[];
  glossaryTerms: string[];
  sources: string[];
  objective?: string;
  prerequisites?: string[];
  openingScenario?: string;
  why: string;
  simple: string;
  technical: string;
  technicalTerms?: string[];
  example: string;
  commonMistakes?: string[];
  operationalChecklist?: string[];
  troubleshootingSteps?: string[];
  bestPractices?: string[];
  practicalMission?: string;
  pocketSummary?: string;
  alert?: string;
};



const moduleSlugById: Record<string, string> = { m1: 'redes-de-computadores', m2: 'fundamentos-rede-isp', m3: 'dns', m4: 'nat', m5: 'cgnat', m6: 'ospf', m7: 'bgp', m8: 'mpls', m9: 'monitoramento-isp' };
const defaultPrereqs = ['Noções básicas de terminal', 'Acesso a equipamento de borda/lab', 'Conhecimento de endereçamento IP'];

const buildDeepSections = (seed: Seed) => {
  const prerequisites = (seed.prerequisites ?? defaultPrereqs).join('\n- ');
  const technicalTerms = (seed.technicalTerms ?? seed.glossaryTerms).join(', ');
  const commonMistakes = (seed.commonMistakes ?? [
    'Pular validação de camada física antes de alterar configuração lógica.',
    'Executar mudanças sem registrar horário, impacto e evidências.',
  ]).join('\n- ');
  const operationalChecklist = (seed.operationalChecklist ?? seed.checklist).join('\n- ');
  const troubleshootingSteps = (seed.troubleshootingSteps ?? [
    'Isolar sintoma (cliente único, CTO, POP ou rede inteira).',
    'Coletar comando de estado e comando de teste ativo.',
    'Comparar baseline do NOC e abrir escalonamento com evidências.',
  ]).join('\n- ');
  const bestPractices = (seed.bestPractices ?? [
    'Padronizar nomenclatura e versionamento de mudanças.',
    'Usar NTP/UTC e manter trilha de auditoria.',
    'Executar validação pós-mudança com rollback documentado.',
  ]).join('\n- ');

  return [
    { title: 'Objetivo da aula', type: 'paragraph', content: seed.objective ?? seed.mission },
    { title: 'Pré-requisitos', type: 'paragraph', content: `- ${prerequisites}` },
    { title: 'Cenário de abertura', type: 'paragraph', content: seed.openingScenario ?? `Durante um plantão de NOC, o cenário desta aula aparece em incidentes reais de ISP brasileiro.` },
    { title: 'Por que isso importa?', type: 'paragraph', content: seed.why },
    { title: 'Explicação simples', type: 'paragraph', content: seed.simple },
    { title: 'Explicação técnica', type: 'paragraph', content: seed.technical },
    { title: 'Termos técnicos da aula', type: 'paragraph', content: technicalTerms },
    { title: 'Exemplo real de ISP', type: 'paragraph', content: seed.example },
    { title: 'Erros comuns', type: 'paragraph', content: `- ${commonMistakes}` },
    { title: 'Checklist operacional', type: 'paragraph', content: `- ${operationalChecklist}` },
    { title: 'Passo a passo de troubleshooting', type: 'paragraph', content: `1) ${troubleshootingSteps.replace('\n- ', '\n2) ')}` },
    { title: 'Boas práticas', type: 'paragraph', content: `- ${bestPractices}` },
    { title: 'Missão prática', type: 'paragraph', content: seed.practicalMission ?? seed.mission },
    { title: 'Resumo de bolso', type: 'paragraph', content: seed.pocketSummary ?? `Resumo rápido: ${seed.simple} Na operação: ${seed.technical}` },
  ];
};

const moduleDeepening: Record<string, string> = {
  m1: 'Aprofunde OSI/TCP-IP, IPv4/IPv6, gateway, máscara, ARP, DHCP, TCP/UDP/ICMP, MTU, MSS, latência, perda, jitter, ping, traceroute e MTR com evidências por camada.',
  m2: 'Cubra ONU, OLT, CTO, PON, VLAN, QinQ, BNG/BRAS, PPPoE, IPoE, RADIUS/AAA, core, borda, trânsito, IX.br e CDN/cache em contexto de POP brasileiro.',
  m3: 'Diferencie DNS recursivo e autoritativo, cache/TTL, A/AAAA/CNAME/MX/NS/TXT/PTR, reverso, DNSSEC, open resolver e testes dig/nslookup (53 TCP/UDP).',
  m4: 'Detalhe srcnat, dstnat, masquerade, netmap, conntrack, hairpin NAT, port forwarding, NAT x firewall e testes externos vs internos com MikroTik.',
  m5: 'Inclua NAT444, 100.64.0.0/10, BPA, CGN determinístico, logs com NTP/timezone e correlação IP+porta+horário, além de impactos em jogos/câmeras e IPv6.',
  m6: 'Aprofunde LSDB, LSA, SPF, timers hello/dead, estados de vizinhança, área 0, ABR, DR/BDR, stub/NSSA, router-id/loopback e custo para underlay de BGP/MPLS.',
  m7: 'Inclua AS/ASN, NLRI, eBGP/iBGP, next-hop, local-pref, AS_PATH, MED, communities, RR, prefix-list, max-prefix, RPKI/ROA/ROV, IRR, IX.br e TCP 179.',
  m8: 'Expandir label switching, LER/LSR, PE/P/CE, LSP, LDP, PHP, MPLS MTU, VRF/RD/RT, MP-BGP, L2VPN/L3VPN e pseudowire com cenário matriz-filial.',
  m9: 'Detalhar SNMP/OIDs, Zabbix, Grafana, LibreNMS, SmokePing, NetFlow/IPFIX, Syslog e monitoração de BGP/OSPF/OLT/ONU/PON com pós-incidente.',
};


const pseudoCommands = new Set([
  'show dashboard slis',
  'run incident-drill P1',
  'show oncall schedule',
  'ping mpls size-test df-bit',
  'traceroute mpls-aware',
]);

const detectVendor = (command: string): CommandVendor => {
  if (pseudoCommands.has(command)) return 'conceitual';
  if (command.startsWith('/')) return 'MikroTik';
  if (command.startsWith('show ')) return 'Cisco-like';
  if (command.includes('vtysh') || command.startsWith('dig') || command.startsWith('nslookup') || command.startsWith('ping ') || command.startsWith('mtr ') || command.startsWith('ip ') || command.startsWith('tracepath') || command.startsWith('traceroute') || command.startsWith('tcpdump') || command.startsWith('snmpwalk') || command.startsWith('journalctl') || command.startsWith('nfdump') || command.startsWith('named-checkzone') || command.startsWith('rndc') || command.startsWith('conntrack') || command.startsWith('nft ') || command.startsWith('zgrep') || command.startsWith('nmap')) return 'Linux';
  if (command.startsWith('delv') || command.startsWith('show route') || command.startsWith('show bgp') || command.startsWith('show rpki') || command.startsWith('show ldp')) return 'Juniper-like';
  return 'Linux';
};

const toCommandItem = (command: string, moduleSlug: string, lessonSlug: string): CommandItem => ({
  title: `Comando: ${command.split(' ')[0]}`,
  command,
  vendor: detectVendor(command),
  moduleSlug,
  lessonSlug,
  type: pseudoCommands.has(command) ? 'pseudo' : 'real',
  explanation: pseudoCommands.has(command)
    ? 'Pseudocomando didático para ilustrar um procedimento operacional; adapte para a ferramenta real do seu ambiente.'
    : 'Comando operacional para validação e troubleshooting no contexto da aula.',
  isPseudoCommand: pseudoCommands.has(command),
});
const levelToDifficulty: Record<string, QuestionDifficulty> = {
  fácil: 'facil',
  intermediário: 'medio',
  avançado: 'dificil',
};

const quickQuestionBank: Record<string, { options: string[]; correctAnswer: string; explanation: string; difficulty: QuestionDifficulty }> = Object.fromEntries(
  quizzes
    .map((quiz) => {
      const [, moduleKey, order] = quiz.id.split('-');
      const lessonModule: Record<string, string> = {
        redes: 'm1',
        isp: 'm2',
        dns: 'm3',
        nat: 'm4',
        cgnat: 'm5',
        ospf: 'm6',
        bgp: 'm7',
        mpls: 'm8',
        moni: 'm9',
      };
      const moduleId = lessonModule[moduleKey];
      if (!moduleId) return null;
      const lessonId = `l${moduleId.slice(1)}-${order}`;
      return [
        lessonId,
        {
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
          explanation: quiz.explanation,
          difficulty: levelToDifficulty[quiz.level] ?? 'medio',
        },
      ] as const;
    })
    .filter((entry): entry is readonly [string, { options: string[]; correctAnswer: string; explanation: string; difficulty: QuestionDifficulty }] => entry !== null),
);

const buildMission = (seed: Seed) => ({
  title: `Missão prática — ${seed.title}`,
  objective: seed.mission,
  steps: [
    'Mapear o cenário atual e identificar pré-requisitos.',
    'Executar os testes sugeridos em sequência lógica.',
    'Registrar evidências objetivas (saída, horário e impacto).',
    'Consolidar conclusão e próximos passos operacionais.',
  ],
  suggestedCommands: seed.commands.map((command) => toCommandItem(command, moduleSlugById[seed.moduleId] ?? seed.moduleId, seed.slug)),
  checklist: seed.checklist,
  expectedResult: 'Checklist validado, evidências registradas e conclusão pronta para handoff técnico.',
});

const makeLesson = (seed: Seed): Lesson => ({
  id: seed.id,
  moduleId: seed.moduleId,
  title: seed.title,
  slug: seed.slug,
  order: seed.order,
  estimatedMinutes: seed.minutes,
  progress: 0,
  sections: [
    ...buildDeepSections(seed),
    { title: 'Aprofundamento do módulo', type: 'info', variant: 'info', content: moduleDeepening[seed.moduleId] },
    ...(seed.alert ? [{ title: 'Alerta operacional', type: 'alert', variant: 'alert' as const, content: seed.alert }] : []),
  ],
  diagram: seed.diagram,
  commands: seed.commands.map((command) => toCommandItem(command, moduleSlugById[seed.moduleId] ?? seed.moduleId, seed.slug)),
  checklist: seed.checklist,
  mission: buildMission(seed),
  quickQuestion: {
    question: seed.quickQuestion,
    options: quickQuestionBank[seed.id]?.options ?? ['N/A'],
    correctAnswer: quickQuestionBank[seed.id]?.correctAnswer ?? 'N/A',
    explanation: quickQuestionBank[seed.id]?.explanation ?? 'N/A',
    difficulty: quickQuestionBank[seed.id]?.difficulty ?? 'medio',
  },
  glossaryTerms: seed.glossaryTerms,
  sources: seed.sources,
});

const seeds: Seed[] = [
  { id: 'l1-1', moduleId: 'm1', title: 'Aula 1 — Camadas e fluxo de pacotes', slug: 'redes-camadas-e-pacotes', order: 1, minutes: 18, diagram: 'Host → CPE → OLT → BNG → Core → Internet', quickQuestion: 'Em qual camada o IP opera?', mission: 'Desenhe o caminho completo de um pacote de um cliente FTTH até um servidor público.', commands: ['ping 8.8.8.8', 'traceroute 8.8.8.8'], checklist: ['Mapeou origem e destino', 'Identificou equipamentos no caminho', 'Separou acesso e backbone'], glossaryTerms: ['ip', 'gateway'], sources: ['RFC 791'], why: 'Sem visão de fluxo, o diagnóstico vira tentativa e erro.', simple: 'Pacotes saem do cliente e atravessam várias camadas e equipamentos.', technical: 'Encapsulamento em camadas permite comutação local e roteamento IP fim a fim.', example: 'No NOC, separar falha de acesso da falha de upstream acelera escalonamento.' },
  { id: 'l1-2', moduleId: 'm1', title: 'Aula 2 — IPv4, máscara e gateway', slug: 'redes-ip-mascara-gateway', order: 2, minutes: 20, diagram: 'Host (IP/Máscara) → Gateway default → Próximo salto', quickQuestion: 'O que acontece se o gateway estiver errado?', mission: 'Valide IP, máscara e gateway em dois hosts e teste alcance local/remoto.', commands: ['ipconfig /all', 'ip a', 'ip route'], checklist: ['IP válido', 'Máscara coerente', 'Gateway alcançável'], glossaryTerms: ['ip', 'gateway'], sources: ['RFC 791'], why: 'Muitos chamados começam com erro de endereçamento básico.', simple: 'Máscara define rede local e gateway leva para fora dela.', technical: 'Rota default é usada quando o destino não está em rede conectada.', example: 'Cliente com gateway incorreto navega intermitente após troca de CPE.' },
  { id: 'l1-3', moduleId: 'm1', title: 'Aula 3 — DNS x conectividade IP', slug: 'redes-dns-e-conectividade', order: 3, minutes: 18, diagram: 'Cliente → Resolver DNS → Resposta A/AAAA → Conexão ao destino', quickQuestion: 'Se ping por IP funciona e por nome falha, qual camada investigar?', mission: 'Compare testes para IP e FQDN e registre diferença de resultado.', commands: ['nslookup google.com', 'dig google.com +short'], checklist: ['Testou IP direto', 'Testou por nome', 'Validou servidor DNS entregue'], glossaryTerms: ['dns'], sources: ['RFC 1034', 'RFC 1035'], why: 'Falha de DNS costuma parecer “internet caiu”.', simple: 'DNS traduz nomes em endereços IP.', technical: 'Resolvers usam cache e recursão para resolver zonas externas.', example: 'Assinante com DNS incorreto no DHCP perde navegação por nome.' },
  { id: 'l1-4', moduleId: 'm1', title: 'Aula 4 — MTU e fragmentação', slug: 'redes-mtu-e-fragmentacao', order: 4, minutes: 22, diagram: 'Pacote > MTU → fragmenta ou descarta (DF) → perda parcial', quickQuestion: 'Por que alguns sites abrem e outros não com MTU quebrada?', mission: 'Executar ping com tamanho crescente e identificar limite sem fragmentação.', commands: ['ping -M do -s 1472 8.8.8.8', 'tracepath 8.8.8.8'], checklist: ['Testou PMTUD', 'Anotou MTU efetiva', 'Correlacionou com aplicação'], glossaryTerms: ['mtu', 'icmp'], sources: ['RFC 1191', 'RFC 792'], why: 'MTU errada gera falhas difíceis de reproduzir.', simple: 'Pacotes grandes demais podem ser descartados.', technical: 'Path MTU Discovery depende de ICMP para ajustar tamanho de segmento.', example: 'VPN do cliente falha por bloqueio de ICMP Fragmentation Needed.', alert: 'Bloquear ICMP indiscriminadamente prejudica PMTUD.' },
  { id: 'l1-5', moduleId: 'm1', title: 'Aula 5 — Troubleshooting base por camadas', slug: 'redes-troubleshooting-base', order: 5, minutes: 25, diagram: 'Checklist: L1/L2 → IP → DNS → Rota → Aplicação', quickQuestion: 'Qual ordem evita retrabalho no atendimento?', mission: 'Monte um playbook de triagem para suporte com 10 passos objetivos.', commands: ['ping gateway', 'traceroute destino', 'mtr -rw destino'], checklist: ['Separou camada física/lógica', 'Incluiu testes DNS/IP', 'Definiu critério de escalonamento'], glossaryTerms: ['latencia', 'perda'], sources: ['Apostila Redes ISP'], why: 'Processo padronizado reduz MTTR e escalonamento desnecessário.', simple: 'Siga a mesma ordem em todo chamado.', technical: 'Correlação de perda, latência e rota evita falso positivo em aplicação.', example: 'NOC identifica perda no enlace de agregação antes de trocar CPE.' },

  { id: 'l2-1', moduleId: 'm2', title: 'Aula 1 — Topologia de POP e backbone', slug: 'isp-topologia-pop', order: 1, minutes: 20, diagram: 'Acesso → Agregação → Core → Borda', quickQuestion: 'Qual bloco conecta o assinante ao core no dia a dia?', mission: 'Desenhe a topologia real do seu POP com nomes de equipamentos.', commands: ['show interface status', 'show lldp neighbors'], checklist: ['Separou função de cada bloco', 'Identificou redundância', 'Documentou links críticos'], glossaryTerms: ['pop'], sources: ['Apostila Redes ISP'], why: 'Entender papel de cada nó evita mudanças arriscadas.', simple: 'POP organiza acesso e entrega para o core.', technical: 'Arquitetura hierárquica melhora escalabilidade operacional.', example: 'Falha de uplink em agregação afeta múltiplas OLTs simultaneamente.' },
  { id: 'l2-2', moduleId: 'm2', title: 'Aula 2 — BNG e PPPoE na operação ISP', slug: 'isp-bng-e-pppoe', order: 2, minutes: 24, diagram: 'CPE PPPoE → BNG → AAA/RADIUS → Internet', quickQuestion: 'Quem autentica sessão PPPoE no provedor?', mission: 'Liste parâmetros mínimos de sessão PPPoE para abertura de chamado.', commands: ['show pppoe session', 'show radius statistics'], checklist: ['Sessão autenticada', 'Perfil correto aplicado', 'IP entregue ao assinante'], glossaryTerms: ['bng', 'pppoe'], sources: ['RFC 2516'], why: 'Muitos incidentes de acesso passam por PPPoE/AAA.', simple: 'BNG concentra sessões dos clientes.', technical: 'PPPoE combina descoberta, sessão e autenticação com políticas por assinante.', example: 'Erro de perfil no RADIUS limita banda contratada.' },
  { id: 'l2-3', moduleId: 'm2', title: 'Aula 3 — Trânsito, peering e IX', slug: 'isp-transito-peering-ix', order: 3, minutes: 22, diagram: 'AS ISP ↔ Trânsito | IX Route Server | Peer privado', quickQuestion: 'Quando peering costuma reduzir latência?', mission: 'Classifique 10 destinos entre trânsito, IX e peering privado.', commands: ['show bgp summary', 'show bgp neighbors'], checklist: ['Mapeou saídas de tráfego', 'Entendeu custo x desempenho', 'Documentou políticas básicas'], glossaryTerms: ['peering', 'asn'], sources: ['IX.br'], why: 'Interconexão define qualidade e custo da internet do ISP.', simple: 'Trânsito compra alcance; peering troca tráfego direto.', technical: 'Política de borda controla preferências entre upstream e peers.', example: 'Conteúdo local melhora RTT quando sai via IX.' },
  { id: 'l2-4', moduleId: 'm2', title: 'Aula 4 — ASN e política de roteamento', slug: 'isp-asn-e-politica', order: 4, minutes: 20, diagram: 'AS próprio → anúncios controlados → internet global', quickQuestion: 'Por que um AS precisa de política explícita?', mission: 'Escreva uma política resumida de import/export para dois upstreams.', commands: ['show ip bgp regexp', 'show route policy'], checklist: ['Definiu o que anunciar', 'Definiu o que aceitar', 'Incluiu proteção de prefixo'], glossaryTerms: ['asn'], sources: ['RFC 4271'], why: 'Sem política, o AS pode anunciar ou aceitar rotas indevidas.', simple: 'AS é sua identidade de roteamento na internet.', technical: 'Filtros e atributos BGP sustentam engenharia de tráfego segura.', example: 'Vazamento de rota por cliente sem filtro impacta terceiros.', alert: 'Nunca deixe sessão de borda “permit any” em produção.' },
  { id: 'l2-5', moduleId: 'm2', title: 'Aula 5 — Operação, NOC e escalonamento', slug: 'isp-operacao-e-escalonamento', order: 5, minutes: 18, diagram: 'Suporte → NOC → Engenharia (com evidências)', quickQuestion: 'Qual evidência mínima deve subir para o NOC?', mission: 'Crie um template de handoff com testes e horários.', commands: ['show alarms', 'show interface counters errors'], checklist: ['Incluiu horário UTC', 'Anexou testes de conectividade', 'Registrou impacto por região'], glossaryTerms: ['pop', 'latencia'], sources: ['Apostila Redes ISP'], why: 'Escalonamento sem dados aumenta tempo de resolução.', simple: 'Cada nível precisa receber informação útil e objetiva.', technical: 'Runbooks com critérios de severidade reduzem ruído operacional.', example: 'Chamado regional só foi tratado após correlação por OLT/POP.' },

  { id: 'l3-1', moduleId: 'm3', title: 'Aula 1 — Fluxo de resolução DNS', slug: 'dns-fluxo-resolucao', order: 1, minutes: 20, diagram: 'Stub resolver → Recursivo → Raiz/TLD/Autoritativo', quickQuestion: 'Quem consulta raiz e TLD: cliente ou recursivo?', mission: 'Desenhe passo a passo da resolução de um FQDN externo.', commands: ['dig +trace exemplo.com'], checklist: ['Entendeu papel de cada servidor', 'Identificou cache no caminho', 'Validou resposta final'], glossaryTerms: ['resolver', 'zona'], sources: ['RFC 1034', 'RFC 1035'], why: 'Falha em qualquer etapa afeta milhares de assinantes.', simple: 'O recursivo faz o trabalho pesado de consulta.', technical: 'Fluxo hierárquico segue delegações NS e registros autoritativos.', example: 'Timeout no recursivo local derruba resolução geral do POP.' },
  { id: 'l3-2', moduleId: 'm3', title: 'Aula 2 — Cache, TTL e comportamento do cliente', slug: 'dns-cache-e-ttl', order: 2, minutes: 18, diagram: 'Resposta DNS + TTL → cache local/recursivo', quickQuestion: 'TTL alto ajuda ou atrapalha mudanças rápidas?', mission: 'Compare resolução antes/depois de expirar TTL em cache.', commands: ['dig registro A +ttlunits', 'rndc flushname exemplo.com'], checklist: ['Mediu TTL real', 'Entendeu efeito no cache', 'Planejou janela de mudança'], glossaryTerms: ['ttl', 'dns'], sources: ['RFC 1035'], why: 'TTL impacta propagação e troubleshooting.', simple: 'TTL define por quanto tempo a resposta pode ficar em cache.', technical: 'Caches múltiplos alteram tempo percebido de atualização.', example: 'Migração de serviço atrasou por TTL elevado no dia do corte.' },
  { id: 'l3-3', moduleId: 'm3', title: 'Aula 3 — DNS autoritativo e zonas', slug: 'dns-autoritativo-zona', order: 3, minutes: 22, diagram: 'Zona SOA/NS → registros A, AAAA, MX, TXT', quickQuestion: 'Qual registro indica servidor de e-mail?', mission: 'Monte uma zona mínima com SOA, NS, A e MX.', commands: ['named-checkzone dominio zona.db', 'dig @ns1.dominio A www.dominio'], checklist: ['SOA coerente', 'NS válidos', 'Registros essenciais criados'], glossaryTerms: ['zona'], sources: ['RFC 1034'], why: 'Erro em zona autoritativa quebra serviços públicos.', simple: 'Autoritativo responde com dado oficial do domínio.', technical: 'SOA serial e delegações corretas garantem consistência de publicação.', example: 'Serial não incrementado impede propagação para secundário.' },
  { id: 'l3-4', moduleId: 'm3', title: 'Aula 4 — DNSSEC na prática', slug: 'dns-dnssec-fundamentos', order: 4, minutes: 24, diagram: 'Assinatura DNSKEY/RRSIG → cadeia de confiança', quickQuestion: 'DNSSEC cifra tráfego DNS?', mission: 'Validar um domínio com DNSSEC usando ferramenta de consulta.', commands: ['dig +dnssec nic.br', 'delv nic.br'], checklist: ['Entendeu KSK/ZSK', 'Validou AD bit', 'Conheceu limites operacionais'], glossaryTerms: ['dnssec'], sources: ['RFC 4033'], why: 'DNSSEC protege integridade e autenticidade da resposta.', simple: 'Ele confirma que a resposta não foi adulterada.', technical: 'Validação usa cadeia criptográfica desde a âncora de confiança.', example: 'Resolver sem validação aceita resposta falsa em ataque de spoofing.' },
  { id: 'l3-5', moduleId: 'm3', title: 'Aula 5 — Troubleshooting DNS operacional', slug: 'dns-troubleshooting-operacional', order: 5, minutes: 25, diagram: 'Sintoma → consulta direta → recursivo → autoritativo', quickQuestion: 'Primeiro teste em incidente DNS: por IP ou por nome?', mission: 'Criar checklist de resposta para “site não abre por nome”.', commands: ['dig dominio @resolver', 'dig dominio @autoritativo'], checklist: ['Isolou camada DNS', 'Comparou respostas', 'Registrou tempos de consulta'], glossaryTerms: ['resolver', 'ttl'], sources: ['Apostila Redes ISP'], why: 'Resposta rápida depende de diagnóstico objetivo.', simple: 'Compare onde a resposta muda para achar a causa.', technical: 'Análise por servidor identifica cache poluído, timeout ou delegação errada.', example: 'Recursivo aberto sofreu abuso e ficou lento para assinantes.', alert: 'Não mantenha recursivo aberto para a internet.' },

  { id: 'l4-1', moduleId: 'm4', title: 'Aula 1 — Conceitos e tipos de NAT', slug: 'nat-conceitos-e-tipos', order: 1, minutes: 18, diagram: 'Privado → tradução → Público', quickQuestion: 'NAT substitui firewall?', mission: 'Mapear onde o NAT acontece hoje na sua rede (CPE, borda, ambos).', commands: ['show nat statistics'], checklist: ['Identificou tipo de NAT', 'Entendeu escopo da tradução', 'Separou NAT de filtragem'], glossaryTerms: ['nat', 'srcnat'], sources: ['RFC 3022'], why: 'NAT mal compreendido gera falhas e brechas.', simple: 'NAT troca endereços entre redes privada e pública.', technical: 'Implementações podem fazer SNAT, DNAT e PAT conforme política.', example: 'Cliente com câmera externa depende de DNAT correto.' },
  { id: 'l4-2', moduleId: 'm4', title: 'Aula 2 — srcnat e masquerade', slug: 'nat-srcnat-masquerade', order: 2, minutes: 20, diagram: 'LAN privada → srcnat/masquerade → WAN pública', quickQuestion: 'Quando usar masquerade em vez de srcnat fixo?', mission: 'Configurar regra srcnat e validar saída para internet.', commands: ['iptables -t nat -S', '/ip firewall nat print'], checklist: ['Regra posicionada corretamente', 'Hit count subindo', 'Sem tradução duplicada'], glossaryTerms: ['srcnat'], sources: ['RFC 3022'], why: 'Sem srcnat correto, cliente não acessa internet.', simple: 'Masquerade usa IP da interface de saída.', technical: 'Ordem de regra e estado da conexão alteram comportamento final.', example: 'Mudança de ordem de NAT quebrou navegação de um segmento.' },
  { id: 'l4-3', moduleId: 'm4', title: 'Aula 3 — dstnat e port forwarding', slug: 'nat-dstnat-port-forward', order: 3, minutes: 22, diagram: 'Internet → IP público:porta → servidor interno', quickQuestion: 'Que risco existe ao abrir portas sem filtro?', mission: 'Publicar serviço de teste via dstnat com ACL de origem.', commands: ['/ip firewall nat add chain=dstnat ...', 'nmap IP_PUBLICO'], checklist: ['Porta publicada apenas quando necessário', 'Filtro por origem aplicado', 'Teste externo realizado'], glossaryTerms: ['dstnat'], sources: ['RFC 4787'], why: 'Exposição indevida aumenta superfície de ataque.', simple: 'DNAT leva tráfego de fora para host interno.', technical: 'Forwarding exige rota de retorno, NAT stateful e controle de acesso.', example: 'Servidor RDP exposto sem ACL sofreu força bruta.', alert: 'Publicação de porta sem ACL é risco crítico.' },
  { id: 'l4-4', moduleId: 'm4', title: 'Aula 4 — Conntrack e hairpin NAT', slug: 'nat-conntrack-hairpin', order: 4, minutes: 24, diagram: 'Conexão nova → tabela de estado → retorno permitido', quickQuestion: 'Por que hairpin é necessário em alguns cenários locais?', mission: 'Reproduzir acesso interno ao IP público de serviço local.', commands: ['conntrack -L', '/ip firewall connection print'], checklist: ['Tabela de estado saudável', 'Timeouts adequados', 'Hairpin testado'], glossaryTerms: ['conntrack', 'hairpin-nat'], sources: ['RFC 4787'], why: 'Sem estado, retorno de sessão falha ou abre tráfego indevido.', simple: 'Conntrack acompanha cada fluxo ativo.', technical: 'Hairpin permite cliente interno chegar ao serviço via endereço público.', example: 'Sistema interno só funcionou após hairpin na borda.' },
  { id: 'l4-5', moduleId: 'm4', title: 'Aula 5 — Troubleshooting e segurança NAT', slug: 'nat-troubleshooting-e-riscos', order: 5, minutes: 23, diagram: 'Sintoma → regra NAT → estado → rota retorno', quickQuestion: 'Qual validação vem antes de alterar regra em produção?', mission: 'Criar runbook para incidente “sem navegação após mudança NAT”.', commands: ['show nat translations verbose', 'tcpdump -ni any host X'], checklist: ['Backup da configuração', 'Comparação antes/depois', 'Plano de rollback'], glossaryTerms: ['nat', 'conntrack'], sources: ['Apostila Redes ISP'], why: 'Mudança sem validação pode derrubar centenas de clientes.', simple: 'Teste primeiro, mude depois, valide sempre.', technical: 'Captura de pacotes confirma se tradução e retorno estão consistentes.', example: 'Regra shadow bloqueou tradução de pool inteiro.' },

  { id: 'l5-1', moduleId: 'm5', title: 'Aula 1 — NAT444 e fundamentos de CGNAT', slug: 'cgnat-nat444-fundamentos', order: 1, minutes: 22, diagram: 'CPE NAT + CGNAT + internet pública', quickQuestion: 'Por que CGNAT surgiu nos ISPs?', mission: 'Mapear pontos de NAT no caminho de um assinante.', commands: ['show cgn subscribers', 'show cgn translations'], checklist: ['Entendeu múltiplas camadas NAT', 'Identificou impacto em aplicações', 'Documentou caminho'], glossaryTerms: ['cgnat', 'nat444'], sources: ['RFC 6888'], why: 'Escassez IPv4 força operação compartilhada de endereços.', simple: 'Vários clientes dividem poucos IPs públicos.', technical: 'NAT444 adiciona camada de tradução no núcleo do provedor.', example: 'Jogo online com NAT restrito sofre sem ajuste de portas.' },
  { id: 'l5-2', moduleId: 'm5', title: 'Aula 2 — RFC 6598 e planejamento', slug: 'cgnat-rfc6598-planejamento', order: 2, minutes: 20, diagram: 'Assinante (RFC1918) → CGNAT (100.64/10) → público', quickQuestion: 'Qual bloco é reservado para espaço compartilhado CGN?', mission: 'Planejar alocação de 100.64.0.0/10 por POP e capacidade.', commands: ['show ip pool usage', 'show route 100.64.0.0/10'], checklist: ['Bloco reservado corretamente', 'Sem conflito com LAN cliente', 'Capacidade por POP calculada'], glossaryTerms: ['rfc6598'], sources: ['RFC 6598'], why: 'Planejamento ruim de endereços causa sobreposição e incidentes.', simple: 'RFC 6598 define faixa própria para CGN.', technical: 'Endereço compartilhado deve permanecer interno ao provedor.', example: 'Uso indevido dessa faixa no cliente causou roteamento ambíguo.' },
  { id: 'l5-3', moduleId: 'm5', title: 'Aula 3 — Portas, pooling e escala', slug: 'cgnat-portas-e-escalabilidade', order: 3, minutes: 24, diagram: 'IP público + bloco de portas por assinante', quickQuestion: 'Qual recurso costuma saturar primeiro no CGNAT?', mission: 'Definir política de portas mínimas por assinante e monitorar consumo.', commands: ['show cgn port-allocation', 'show cgn resource-usage'], checklist: ['Portas por usuário definidas', 'Threshold de alerta configurado', 'Plano de expansão documentado'], glossaryTerms: ['porta-origem', 'cgnat'], sources: ['RFC 6888'], why: 'Esgotamento de portas derruba sessões mesmo com IP disponível.', simple: 'Cada conexão usa uma porta de origem.', technical: 'Pool management precisa equilibrar eficiência e qualidade de experiência.', example: 'Streaming em massa elevou consumo de portas no horário nobre.' },
  { id: 'l5-4', moduleId: 'm5', title: 'Aula 4 — Logs e correlação para compliance', slug: 'cgnat-logs-e-correlacao', order: 4, minutes: 26, diagram: 'Requisição jurídica → busca IP:porta:tempo → assinante', quickQuestion: 'Por que horário precisa de precisão em milissegundos em alguns casos?', mission: 'Executar exercício de correlação com registros de 5-tupla.', commands: ['search-log-5tupla 187.1.1.1 52344 2026-04-28T10:31:00Z', 'show ntp status'], checklist: ['NTP sincronizado', 'Campos de log completos', 'Consulta auditável'], glossaryTerms: ['bpa', 'porta-origem'], sources: ['RFC 6888'], why: 'Sem log confiável, ISP não atende demanda legal e operacional.', simple: 'É preciso ligar conexão pública ao assinante correto.', technical: 'Correlação exige timestamp preciso, IP público, porta e protocolo.', example: 'Dois clientes no mesmo IP público foram separados pela porta de origem.', alert: 'Relógio sem NTP invalida correlação de CGNAT.' },
  { id: 'l5-5', moduleId: 'm5', title: 'Aula 5 — Impactos em aplicações e mitigação', slug: 'cgnat-impactos-e-boas-praticas', order: 5, minutes: 22, diagram: 'Aplicação sensível ↔ NAT compartilhado ↔ mitigação', quickQuestion: 'Qual alternativa reduz dependência de CGNAT no médio prazo?', mission: 'Definir checklist de atendimento para aplicações afetadas por CGNAT.', commands: ['show cgn subscriber detail', 'test p2p connectivity'], checklist: ['Classificou tipo de aplicação', 'Validou limitação de NAT', 'Ofereceu mitigação documentada'], glossaryTerms: ['cgnat'], sources: ['Apostila Redes ISP'], why: 'Jogos, P2P e acesso remoto sofrem com NAT compartilhado.', simple: 'Algumas aplicações precisam de conexões de entrada.', technical: 'Estratégia combinada inclui portas dedicadas, exceções e adoção IPv6.', example: 'Cliente corporativo migrou para plano com IP dedicado para VPN.' },

  { id: 'l6-1', moduleId: 'm6', title: 'Aula 1 — Conceitos OSPF e LSAs', slug: 'ospf-conceitos-e-lsas', order: 1, minutes: 22, diagram: 'Roteadores OSPF trocam LSAs e formam LSDB', quickQuestion: 'Qual base de dados o OSPF mantém para calcular rotas?', mission: 'Identificar tipos de LSA presentes em um domínio simples.', commands: ['show ospf database', 'show ospf route'], checklist: ['LSDB consistente', 'LSAs esperados por área', 'SPF executando sem excesso'], glossaryTerms: ['ospf', 'lsa', 'lsdb'], sources: ['RFC 2328'], why: 'OSPF é base do underlay interno do provedor.', simple: 'Roteadores compartilham visão da topologia.', technical: 'SPF calcula menor custo com base na LSDB sincronizada.', example: 'LSDB divergente causou rota assimétrica entre POPs.' },
  { id: 'l6-2', moduleId: 'm6', title: 'Aula 2 — Áreas, ABR e desenho de domínio', slug: 'ospf-areas-e-design', order: 2, minutes: 24, diagram: 'Área 0 backbone ↔ áreas de borda via ABR', quickQuestion: 'Toda área precisa conectar na área 0?', mission: 'Propor desenho de áreas para 3 POPs e 1 core central.', commands: ['show ospf border-routers', 'show ip ospf interface'], checklist: ['Área 0 íntegra', 'ABRs definidos', 'Summarização planejada'], glossaryTerms: ['abr', 'ospf'], sources: ['RFC 2328'], why: 'Design ruim de áreas aumenta convergência e complexidade.', simple: 'Área 0 é o tronco do OSPF.', technical: 'ABRs propagam LSAs entre áreas e suportam sumarização.', example: 'Filial isolada fora da área 0 ficou sem rotas interáreas.' },
  { id: 'l6-3', moduleId: 'm6', title: 'Aula 3 — Vizinhança e estados de adjacência', slug: 'ospf-vizinhos-e-estados', order: 3, minutes: 21, diagram: 'Down → Init → 2-Way → ExStart → Full', quickQuestion: 'Em qual estado a adjacência está funcional para troca completa?', mission: 'Validar estado de vizinhos após alteração de autenticação.', commands: ['show ospf neighbor detail', 'debug ospf adj'], checklist: ['Hello/Dead coerentes', 'MTU compatível', 'Autenticação alinhada'], glossaryTerms: ['ospf', 'lsdb'], sources: ['RFC 2328'], why: 'Adjacência quebrada interrompe anúncio interno.', simple: 'Sem vizinho Full não há troca completa de rotas.', technical: 'Mismatch de parâmetros impede avanço de estado.', example: 'Mudança de MTU manteve vizinho preso em ExStart.', alert: 'Ajuste de OSPF em horário crítico sem janela pode causar flap em massa.' },
  { id: 'l6-4', moduleId: 'm6', title: 'Aula 4 — Custo e melhor caminho', slug: 'ospf-custo-e-melhor-caminho', order: 4, minutes: 20, diagram: 'Múltiplos links → menor custo SPF', quickQuestion: 'Como influenciar preferência por link primário no OSPF?', mission: 'Alterar custo em lab e observar mudança de rota.', commands: ['show ip route ospf', 'show ospf interface cost'], checklist: ['Custo ajustado com critério', 'Rota convergiu como esperado', 'Sem impacto colateral'], glossaryTerms: ['spf', 'ospf'], sources: ['RFC 2328'], why: 'Controle de custo evita uso incorreto de links backup.', simple: 'Menor custo vira caminho preferido.', technical: 'Métrica por interface afeta cálculo SPF em todo domínio.', example: 'Link rádio virou primário por custo padrão mal configurado.' },
  { id: 'l6-5', moduleId: 'm6', title: 'Aula 5 — Troubleshooting do underlay', slug: 'ospf-troubleshooting-underlay', order: 5, minutes: 25, diagram: 'Sintoma BGP/MPLS → validar OSPF primeiro', quickQuestion: 'Por que BGP pode cair mesmo “sem mexer no BGP”?', mission: 'Criar checklist de triagem de underlay para incidentes de backbone.', commands: ['show ospf events', 'show interface errors', 'ping loopback peer'], checklist: ['Loopbacks alcançáveis', 'Adjacências estáveis', 'Sem perda em links críticos'], glossaryTerms: ['ospf', 'abr'], sources: ['Apostila Redes ISP'], why: 'Underlay instável afeta todas as camadas superiores.', simple: 'Primeiro estabilize OSPF, depois investigue BGP/MPLS.', technical: 'Sessões dependem de reachability e latência adequadas no IGP.', example: 'Flap em enlace óptico derrubou LDP e iBGP em sequência.' },

  { id: 'l7-1', moduleId: 'm7', title: 'Aula 1 — Fundamentos BGP e sessão', slug: 'bgp-fundamentos-e-sessao', order: 1, minutes: 22, diagram: 'AS ISP ↔ AS trânsito/peer', quickQuestion: 'Qual porta TCP o BGP utiliza?', mission: 'Subir sessão de laboratório com autenticação e timers padrão.', commands: ['show ip bgp summary', 'show ip bgp neighbors'], checklist: ['Sessão Established', 'AS remoto correto', 'Keepalive recebendo'], glossaryTerms: ['as', 'ebgp'], sources: ['RFC 4271'], why: 'BGP é a base da interconexão externa do ISP.', simple: 'Sessão BGP troca rotas entre sistemas autônomos.', technical: 'Troca incremental de NLRI via TCP com política por vizinho.', example: 'Sessão não sobe por remote-as incorreto na borda.' },
  { id: 'l7-2', moduleId: 'm7', title: 'Aula 2 — eBGP, iBGP e política', slug: 'bgp-ebgp-ibgp-politica', order: 2, minutes: 24, diagram: 'Borda eBGP + core iBGP com RR', quickQuestion: 'Quando usar route reflector no iBGP?', mission: 'Descrever política mínima de entrada/saída para eBGP e iBGP.', commands: ['show bgp ipv4 unicast summary', 'show bgp ipv4 unicast neighbors X advertised-routes'], checklist: ['Função de cada sessão definida', 'Política de import/export aplicada', 'Next-hop coerente'], glossaryTerms: ['ebgp', 'ibgp'], sources: ['RFC 4271', 'RFC 4456'], why: 'Misturar papéis de sessões gera comportamento inesperado.', simple: 'eBGP é externo; iBGP distribui internamente.', technical: 'RR reduz full-mesh e preserva escalabilidade operacional.', example: 'Core sem RR escalou mal após crescimento do AS.' },
  { id: 'l7-3', moduleId: 'm7', title: 'Aula 3 — Filtros, bogons e max-prefix', slug: 'bgp-filtros-e-maxprefix', order: 3, minutes: 25, diagram: 'Entrada BGP → filtros → tabela local', quickQuestion: 'Por que max-prefix protege a borda?', mission: 'Aplicar prefix-list e limite de prefixos em um peer de teste.', commands: ['show route-policy', 'show bgp neighbor received-routes'], checklist: ['Bogons bloqueados', 'Somente prefixos autorizados', 'Max-prefix configurado'], glossaryTerms: ['community', 'as'], sources: ['RFC 7454', 'MANRS'], why: 'Filtro é o principal controle contra vazamento e incidente global.', simple: 'Aceite só o que precisa e anuncie só o que é seu.', technical: 'Higiene inclui prefix filtering, anti-spoofing e limites operacionais.', example: 'Peer enviou tabela completa por erro e max-prefix evitou colapso.' },
  { id: 'l7-4', moduleId: 'm7', title: 'Aula 4 — Communities e engenharia de tráfego', slug: 'bgp-communities-e-engenharia', order: 4, minutes: 23, diagram: 'Rota + community → ação por política', quickQuestion: 'Community altera rota sozinha ou depende de política?', mission: 'Criar duas communities para preferir saída por upstream A e backup em B.', commands: ['show bgp community', 'show bgp route X detail'], checklist: ['Communities padronizadas', 'Documentação disponível', 'Resultado validado por rota'], glossaryTerms: ['community', 'local-pref'], sources: ['RFC 1997'], why: 'Communities simplificam operação em ambiente com muitos peers.', simple: 'Elas marcam rotas para tratamento automático.', technical: 'Policy engine interpreta communities para setar local-pref, prepend e export.', example: 'Equipe NOC mudou preferência sem editar dezenas de regras.', alert: 'Community sem documentação gera comportamento opaco.' },
  { id: 'l7-5', moduleId: 'm7', title: 'Aula 5 — RPKI e operação segura', slug: 'bgp-rpki-e-operacao-segura', order: 5, minutes: 24, diagram: 'Rota recebida → validação ROV → valid/invalid/not-found', quickQuestion: 'RPKI valida origem ou caminho completo?', mission: 'Ativar validação RPKI em laboratório e medir rotas inválidas.', commands: ['show rpki cache-server', 'show bgp rpki validation'], checklist: ['Cache RPKI ativo', 'Política para invalid definida', 'Monitoramento de impacto'], glossaryTerms: ['rpki', 'roa'], sources: ['RFC 6811', 'MANRS'], why: 'Validação de origem reduz risco de sequestro de prefixos.', simple: 'RPKI ajuda a confiar em quem anuncia um prefixo.', technical: 'ROV usa ROAs assinadas para classificar anúncios BGP.', example: 'Prefixo inválido foi rejeitado antes de afetar clientes.' },

  { id: 'l8-1', moduleId: 'm8', title: 'Aula 1 — Arquitetura MPLS e labels', slug: 'mpls-arquitetura-e-labels', order: 1, minutes: 22, diagram: 'Ingress PE → P routers → Egress PE (labels)', quickQuestion: 'Qual elemento define caminho no MPLS: IP ou label?', mission: 'Explicar diferença entre encaminhamento IP e comutação por rótulos.', commands: ['show mpls forwarding-table'], checklist: ['Entendeu função de LSR/LSP', 'Mapeou ingress/egress', 'Relacionou com serviço'], glossaryTerms: ['mpls', 'lsp'], sources: ['RFC 3031'], why: 'MPLS é base de serviços corporativos em backbone.', simple: 'Pacotes ganham rótulos para atravessar o core.', technical: 'Forwarding no core usa label lookup, não tabela IP completa.', example: 'Core manteve desempenho estável com grande volume de VPNs.' },
  { id: 'l8-2', moduleId: 'm8', title: 'Aula 2 — LDP, loopbacks e underlay', slug: 'mpls-ldp-e-loopbacks', order: 2, minutes: 23, diagram: 'IGP alcança loopbacks ↔ LDP distribui labels', quickQuestion: 'Se loopback não é alcançável, o LDP fecha?', mission: 'Validar reachability de loopbacks antes de ativar LDP.', commands: ['show ldp neighbor', 'show mpls ldp bindings'], checklist: ['Loopbacks roteáveis', 'Vizinhos LDP estáveis', 'Sem flap recorrente'], glossaryTerms: ['ldp', 'mpls'], sources: ['RFC 5036'], why: 'LDP depende de underlay íntegro para distribuir labels.', simple: 'Sem caminho IP entre loopbacks, não há plano MPLS estável.', technical: 'Sessões LDP seguem transporte IP anunciado no IGP.', example: 'Queda de OSPF derrubou LDP e L3VPN simultaneamente.' },
  { id: 'l8-3', moduleId: 'm8', title: 'Aula 3 — VRF, RD e RT', slug: 'mpls-vrf-rd-rt', order: 3, minutes: 24, diagram: 'Cliente A VRF-A | Cliente B VRF-B (mesmo prefixo)', quickQuestion: 'RD e RT têm a mesma função?', mission: 'Criar duas VRFs com prefixos sobrepostos em ambiente de teste.', commands: ['show vrf', 'show bgp vpnv4 all'], checklist: ['VRFs separadas', 'RD/RT documentados', 'Sem vazamento entre clientes'], glossaryTerms: ['vrf', 'rd-rt'], sources: ['RFC 4364'], why: 'Isolamento de clientes é requisito central de serviços MPLS.', simple: 'VRF separa tabelas de rota por cliente.', technical: 'RD torna rota única; RT controla import/export entre VRFs.', example: 'Dois clientes usando 10.0.0.0/24 coexistem sem conflito.' },
  { id: 'l8-4', moduleId: 'm8', title: 'Aula 4 — MP-BGP e L3VPN', slug: 'mpls-mpbgp-l3vpn', order: 4, minutes: 24, diagram: 'PE1 MP-BGP VPNv4 ↔ PE2 + labels de transporte', quickQuestion: 'Quem distribui rotas VPN entre PEs?', mission: 'Subir uma VPNv4 simples e validar rota entre filiais.', commands: ['show bgp vpnv4 neighbors', 'show route vrf CLIENTE-A'], checklist: ['Sessão MP-BGP ativa', 'RTs corretos', 'Ping entre sites funcionando'], glossaryTerms: ['mpls', 'vrf'], sources: ['RFC 4364'], why: 'Serviço L3VPN depende da combinação de MPLS e BGP.', simple: 'MP-BGP leva rotas de cliente entre bordas PE.', technical: 'Label de VPN + label de transporte compõem forwarding fim a fim.', example: 'Filiais remotas passaram a usar backbone do ISP com isolamento lógico.' },
  { id: 'l8-5', moduleId: 'm8', title: 'Aula 5 — Troubleshooting MPLS: MTU e TTL', slug: 'mpls-troubleshooting-mtu-ttl', order: 5, minutes: 25, diagram: 'Falha app ↔ validar MPLS MTU, TTL e label path', quickQuestion: 'Por que traceroute pode “sumir” no core MPLS?', mission: 'Executar testes de MTU e traceroute com e sem propagação de TTL.', commands: ['ping mpls size-test df-bit', 'traceroute mpls-aware', 'show mpls mtu'], checklist: ['MPLS MTU adequada', 'TTL policy conhecida', 'LSP íntegro ponta a ponta'], glossaryTerms: ['mpls', 'ldp'], sources: ['RFC 3031', 'RFC 5036'], why: 'Problemas de MTU e visibilidade geram incidentes intermitentes.', simple: 'O core pode esconder hops dependendo da política de TTL.', technical: 'Encapsulamento por label aumenta overhead e exige MTU planejada.', example: 'Aplicação corporativa falhava por MTU insuficiente no enlace intermediário.' },

  { id: 'l9-1', moduleId: 'm9', title: 'Aula 1 — Sinais, SLI e priorização', slug: 'moni-sinais-e-sli', order: 1, minutes: 18, diagram: 'Métrica → SLI → alerta → ação', quickQuestion: 'Qual diferença entre métrica bruta e SLI?', mission: 'Definir 5 SLIs para acesso, core e borda.', commands: ['show dashboard slis'], checklist: ['SLIs ligados ao negócio', 'Limites de alerta definidos', 'Responsável por cada SLI'], glossaryTerms: ['sli', 'slo'], sources: ['Apostila Redes ISP'], why: 'Sem sinal certo, o NOC reage tarde ou no alvo errado.', simple: 'SLI é um indicador que reflete experiência real do serviço.', technical: 'Boas SLIs combinam disponibilidade, latência, perda e erro.', example: 'Equipe trocou alerta por CPU por alerta de perda em interface crítica.' },
  { id: 'l9-2', moduleId: 'm9', title: 'Aula 2 — SNMP e telemetria básica', slug: 'moni-snmp-e-telemetria', order: 2, minutes: 20, diagram: 'Dispositivo → SNMP poller → banco temporal', quickQuestion: 'Por que usar SNMPv3 em vez de v2c quando possível?', mission: 'Coletar tráfego e erro de interfaces críticas por 24h.', commands: ['snmpwalk -v3 ...', 'show snmp status'], checklist: ['Credenciais seguras', 'OIDs essenciais coletadas', 'Intervalo de coleta adequado'], glossaryTerms: ['snmp'], sources: ['RFC 3411'], why: 'SNMP ainda é base de visibilidade em redes ISP.', simple: 'Coletor consulta contadores dos equipamentos.', technical: 'Versão v3 adiciona autenticação e privacidade ao protocolo.', example: 'Pico de erro CRC foi detectado por série histórica SNMP.' },
  { id: 'l9-3', moduleId: 'm9', title: 'Aula 3 — Flow e capacidade', slug: 'moni-flow-e-capacidade', order: 3, minutes: 21, diagram: 'Exportador flow → coletor → top talkers/aplicações', quickQuestion: 'Flow substitui captura de pacote?', mission: 'Identificar top 10 conversas em enlace saturado no horário nobre.', commands: ['show flow exporter', 'show flow top-talkers'], checklist: ['Exportação ativa', 'Amostragem conhecida', 'Relatório de capacidade gerado'], glossaryTerms: ['netflow'], sources: ['RFC 7011'], why: 'Flow mostra quem consome banda e para onde.', simple: 'Você enxerga padrões sem capturar payload completo.', technical: 'IPFIX/NetFlow exporta metadados de fluxo para análise de tendência.', example: 'Backbone saturado por CDN específico foi confirmado via flow.' },
  { id: 'l9-4', moduleId: 'm9', title: 'Aula 4 — Logs e correlação de eventos', slug: 'moni-logs-e-correlacao', order: 4, minutes: 23, diagram: 'Syslog + eventos de rede + ticket = causa raiz', quickQuestion: 'Por que normalizar timezone dos logs?', mission: 'Montar consulta que correlaciona flap de interface e queda de sessão BGP.', commands: ['journalctl -u rsyslog', 'show logging last 100'], checklist: ['Timezone padronizado', 'Retenção definida', 'Campos pesquisáveis'], glossaryTerms: ['syslog'], sources: ['RFC 5424'], why: 'Sem logs íntegros, a investigação fica baseada em memória.', simple: 'Log conta a história do incidente no tempo.', technical: 'Correlação exige sincronismo de relógio e taxonomia de eventos.', example: 'Reset elétrico em POP foi confirmado por sequência de logs de múltiplos nós.' },
  { id: 'l9-5', moduleId: 'm9', title: 'Aula 5 — Alertas, resposta e pós-incidente', slug: 'moni-alerta-incidente-posmortem', order: 5, minutes: 24, diagram: 'Detecção → contenção → comunicação → pós-mortem', quickQuestion: 'Quando um alerta deve virar incidente P1?', mission: 'Escrever playbook curto com critérios de severidade e comunicação.', commands: ['run incident-drill P1', 'show oncall schedule'], checklist: ['Critérios P1/P2 claros', 'Comunicação externa prevista', 'Ações preventivas registradas'], glossaryTerms: ['slo', 'latencia'], sources: ['Apostila Redes ISP'], why: 'Operação madura aprende com falha e evita repetição.', simple: 'Resposta rápida depende de papéis claros.', technical: 'Pós-mortem sem culpabilização identifica causa sistêmica e ações permanentes.', example: 'Após incidente de borda, ISP criou alerta proativo de perda por região.' },
];

export const lessons: Lesson[] = seeds.map(makeLesson).map((lesson, index, arr) => {
  const prev = arr[index - 1];
  const next = arr[index + 1];
  return {
    ...lesson,
    previousLessonSlug: prev?.moduleId === lesson.moduleId ? prev.slug : undefined,
    nextLessonSlug: next?.moduleId === lesson.moduleId ? next.slug : undefined,
  };
});
