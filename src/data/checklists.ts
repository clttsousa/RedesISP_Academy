export const checklists = [
  { id: 'chk-redes-base', title: 'Checklist de triagem de redes', items: ['Validar IP/máscara/gateway', 'Testar gateway local', 'Testar IP público', 'Testar resolução DNS', 'Registrar latência e perda'] },
  { id: 'chk-isp-fundamentos', title: 'Checklist de arquitetura ISP', items: ['Mapear acesso/agregação/borda', 'Identificar pontos únicos de falha', 'Documentar autenticação PPPoE/AAA', 'Listar saídas de trânsito e peering'] },
  { id: 'chk-dns-operacao', title: 'Checklist operacional DNS', items: ['Recursivo não aberto para internet', 'Cache e TTL revisados', 'Zonas autoritativas validadas', 'Monitoramento de latência DNS'] },
  { id: 'chk-nat-operacao', title: 'Checklist operacional NAT', items: ['Regras NAT ordenadas', 'Conntrack saudável', 'Port-forward com ACL', 'Plano de rollback antes de mudança'] },
  { id: 'chk-cgnat-operacao', title: 'Checklist operacional CGNAT', items: ['NTP sincronizado', 'Logs com IP/porta/tempo/protocolo', 'Uso de portas monitorado', 'Procedimento de correlação auditável'] },
  { id: 'chk-ospf-backbone', title: 'Checklist de estabilidade OSPF', items: ['Adjacências Full', 'Área 0 íntegra', 'Loopbacks roteáveis', 'Custos alinhados ao desenho'] },
  { id: 'chk-bgp-operacao', title: 'Checklist operacional BGP', items: ['Filtros de entrada e saída', 'Max-prefix por peer', 'RPKI/ROV ativo', 'Communities documentadas'] },
  { id: 'chk-mpls-servicos', title: 'Checklist operacional MPLS', items: ['LDP estável', 'MPLS MTU validada', 'VRFs sem vazamento', 'MP-BGP VPNv4 saudável'] },
  { id: 'chk-monitoramento-isp', title: 'Checklist de monitoramento ISP', items: ['SLIs definidos por serviço', 'SNMP/flow/logs coletando', 'Alertas com severidade clara', 'Pós-incidente com ações preventivas'] },
];
