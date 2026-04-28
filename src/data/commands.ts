export const commands = [
  { title: 'Teste de conectividade IP', vendor: 'Linux/Windows', command: 'ping 8.8.8.8', explanation: 'Valida alcance IP até destino público.' },
  { title: 'Rota até destino', vendor: 'Linux/Windows', command: 'traceroute 8.8.8.8', explanation: 'Mostra saltos e possível ponto de degradação.' },
  { title: 'Diagnóstico DNS recursivo', vendor: 'BIND tools', command: 'dig +trace exemplo.com', explanation: 'Exibe cadeia de resolução completa.' },
  { title: 'Sessões PPPoE', vendor: 'Cisco-like/BNG', command: 'show pppoe session', explanation: 'Lista sessões de assinantes e estado.' },
  { title: 'Tabela NAT', vendor: 'Cisco-like/Linux', command: 'show nat translations', explanation: 'Mostra traduções ativas e portas.' },
  { title: 'Conexões rastreadas', vendor: 'Linux', command: 'conntrack -L', explanation: 'Inspeciona tabela de estado de conexões.' },
  { title: 'Resumo OSPF', vendor: 'Cisco-like', command: 'show ospf neighbor', explanation: 'Verifica adjacências e estabilidade.' },
  { title: 'Resumo BGP', vendor: 'Cisco-like', command: 'show ip bgp summary', explanation: 'Mostra status das sessões e prefixos.' },
  { title: 'Vizinhos LDP', vendor: 'Cisco-like/Junos-like', command: 'show ldp neighbor', explanation: 'Valida plano de labels MPLS.' },
  { title: 'Coleta SNMP', vendor: 'Net-SNMP', command: 'snmpwalk -v3 -l authPriv <host>', explanation: 'Consulta OIDs para monitoramento.' },
  { title: 'Top talkers por flow', vendor: 'Flow collector', command: 'show flow top-talkers', explanation: 'Identifica maiores consumidores de tráfego.' },
];
