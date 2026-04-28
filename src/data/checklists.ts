export const checklists = [
  {
    id: 'chk-redes-base',
    title: 'Checklist de triagem de redes',
    items: [
      'Confirmar energia/sinal físico do acesso (ONU, porta, interface).',
      'Validar IP, máscara e gateway no cliente.',
      'Testar ping para gateway e para IP público.',
      'Comparar conectividade por IP x nome DNS.',
      'Executar teste de MTU/PMTUD e registrar limiar.',
      'Anotar latência, perda, horário UTC e destino testado.',
    ],
  },
  {
    id: 'chk-isp-fundamentos',
    title: 'Checklist de arquitetura ISP',
    items: [
      'Mapear blocos acesso/agregação/core/borda por POP.',
      'Identificar pontos únicos de falha de link e energia.',
      'Documentar BNG, AAA e perfis de autenticação.',
      'Classificar saídas de trânsito, peering e IX.',
      'Definir rota de escalonamento com evidências mínimas.',
    ],
  },
  {
    id: 'chk-dns-operacao',
    title: 'Checklist operacional DNS',
    items: [
      'Recursivo fechado para internet (sem open resolver).',
      'Latência, timeout e taxa de SERVFAIL monitorados.',
      'TTL alinhado à janela de mudança dos serviços críticos.',
      'Zona validada com serial/NS/SOA antes de publicar.',
      'Plano de failover para recursivo secundário testado.',
    ],
  },
  {
    id: 'chk-nat-operacao',
    title: 'Checklist operacional NAT',
    items: [
      'Ordem de regras srcnat/dstnat revisada e com comentários.',
      'Conntrack dentro da capacidade esperada.',
      'Port-forward protegido por ACL de origem.',
      'Hairpin testado quando acesso interno usa IP público.',
      'Rollback documentado e validado antes da mudança.',
    ],
  },
  {
    id: 'chk-cgnat-operacao',
    title: 'Checklist operacional CGNAT',
    items: [
      'NTP sincronizado em CGN, logger e SIEM.',
      'Logs com IP público, porta, protocolo e timestamp.',
      'Uso de portas por pool monitorado com alerta preventivo.',
      'Procedimento de correlação testado em simulado mensal.',
      'Canal comercial definido para IP público/IPv6 dedicado.',
    ],
  },
  {
    id: 'chk-ospf-backbone',
    title: 'Checklist de estabilidade OSPF',
    items: [
      'Adjacências críticas em estado Full.',
      'Timers e autenticação consistentes entre vizinhos.',
      'MTU alinhada para evitar EXSTART/EXCHANGE.',
      'Área 0 íntegra e ABRs sem flapping.',
      'Custos coerentes com capacidade e desenho de tráfego.',
    ],
  },
  {
    id: 'chk-bgp-operacao',
    title: 'Checklist operacional BGP',
    items: [
      'Sessões em Established com monitoramento de flap.',
      'Filtros de entrada/saída e max-prefix por peer.',
      'Validação RPKI/ROV ativa em borda.',
      'Communities e política de tráfego documentadas.',
      'Runbook para estado Idle/Active e leak de rotas.',
    ],
  },
  {
    id: 'chk-mpls-servicos',
    title: 'Checklist operacional MPLS',
    items: [
      'LDP estável em todos os enlaces do core.',
      'MPLS MTU validada em PE/P e túneis de transporte.',
      'VRFs sem vazamento de rotas entre clientes.',
      'RD/RT coerentes com desenho de serviço.',
      'Teste de aplicação fim a fim pós-mudança.',
    ],
  },
  {
    id: 'chk-monitoramento-isp',
    title: 'Checklist de monitoramento ISP',
    items: [
      'SLIs por serviço definidos (latência, perda, disponibilidade).',
      'Coleta SNMP, flow e syslog com retenção adequada.',
      'Alertas com severidade e dono operacional definidos.',
      'Dashboards por POP e borda com revisão semanal.',
      'Pós-incidente com ação preventiva e prazo de execução.',
    ],
  },
];
