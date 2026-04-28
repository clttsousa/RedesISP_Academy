export const commands = [
  { title: 'Teste de alcance IP', command: 'ping 8.8.8.8 -c 5', vendor: 'Linux', explanation: 'Valida conectividade IP básica e perda.', moduleSlug: 'redes-de-computadores', lessonSlug: 'redes-camadas-e-pacotes' },
  { title: 'Rota por saltos', command: 'traceroute 1.1.1.1', vendor: 'Linux', explanation: 'Mostra onde a rota degrada ou interrompe.', moduleSlug: 'redes-de-computadores', lessonSlug: 'redes-troubleshooting-base' },
  { title: 'Teste PMTUD', command: 'ping -M do -s 1472 8.8.8.8', vendor: 'Linux', explanation: 'Identifica MTU máxima sem fragmentação.', moduleSlug: 'redes-de-computadores', lessonSlug: 'redes-mtu-e-fragmentacao' },
  { title: 'Diagnóstico interface CPE', command: '/interface/ethernet/print detail', vendor: 'MikroTik', explanation: 'Confirma estado, speed/duplex e erros.', moduleSlug: 'redes-de-computadores' },

  { title: 'Sessões PPPoE ativas', command: '/ppp active print detail', vendor: 'MikroTik', explanation: 'Lista assinantes autenticados e perfil aplicado.', moduleSlug: 'fundamentos-rede-isp', lessonSlug: 'isp-bng-e-pppoe' },
  { title: 'Resumo sessões PPPoE', command: 'show pppoe session', vendor: 'Cisco-like', explanation: 'Valida quantidade e estado das sessões no BNG.', moduleSlug: 'fundamentos-rede-isp', lessonSlug: 'isp-bng-e-pppoe' },
  { title: 'Vizinhos LLDP', command: 'show lldp neighbors detail', vendor: 'Cisco-like', explanation: 'Ajuda mapear topologia de POP e agregação.', moduleSlug: 'fundamentos-rede-isp', lessonSlug: 'isp-topologia-pop' },
  { title: 'Resumo de BGP na borda', command: 'show bgp summary', vendor: 'Juniper-like', explanation: 'Correlaciona upstream/peering e estado operacional.', moduleSlug: 'fundamentos-rede-isp', lessonSlug: 'isp-transito-peering-ix' },

  { title: 'Trace de resolução', command: 'dig +trace exemplo.com', vendor: 'Linux', explanation: 'Exibe cadeia recursiva até autoritativo.', moduleSlug: 'dns', lessonSlug: 'dns-fluxo-resolucao' },
  { title: 'Limpar cache específico', command: 'rndc flushname exemplo.com', vendor: 'Linux', explanation: 'Força nova consulta após alterações de zona.', moduleSlug: 'dns', lessonSlug: 'dns-cache-e-ttl' },
  { title: 'Validar arquivo de zona', command: 'named-checkzone dominio.com zona.db', vendor: 'Linux', explanation: 'Verifica sintaxe e consistência da zona autoritativa.', moduleSlug: 'dns', lessonSlug: 'dns-autoritativo-zona' },
  { title: 'Consulta DNS no RouterOS', command: '/tool dns-update name=teste.exemplo.com address=198.51.100.10', vendor: 'MikroTik', explanation: 'Útil para validar comportamento de atualização/consulta em laboratório.', moduleSlug: 'dns' },

  { title: 'Tabela de traduções NAT', command: 'show ip nat translations', vendor: 'Cisco-like', explanation: 'Inspeciona traduções ativas e uso de portas.', moduleSlug: 'nat', lessonSlug: 'nat-srcnat-masquerade' },
  { title: 'Regras NAT RouterOS', command: '/ip firewall nat print detail', vendor: 'MikroTik', explanation: 'Confirma ordem de srcnat/dstnat e counters.', moduleSlug: 'nat' },
  { title: 'Estado conntrack', command: 'conntrack -L | head -40', vendor: 'Linux', explanation: 'Valida sessão stateful no gateway Linux.', moduleSlug: 'nat', lessonSlug: 'nat-conntrack-hairpin' },
  { title: 'NAT com nftables', command: 'nft list ruleset | sed -n "/table ip nat/,/}/p"', vendor: 'Linux', explanation: 'Audita regras NAT em ambientes modernos Linux.', moduleSlug: 'nat' },

  { title: 'Sessões CGN', command: 'show cgn sessions subscriber-id 12345', vendor: 'Cisco-like', explanation: 'Consulta traduções associadas ao assinante.', moduleSlug: 'cgnat', lessonSlug: 'cgnat-logs-e-correlacao' },
  { title: 'Uso de portas por pool', command: 'show cgn nat44 statistics', vendor: 'Cisco-like', explanation: 'Identifica risco de exaustão de portas.', moduleSlug: 'cgnat', lessonSlug: 'cgnat-portas-e-escalabilidade' },
  { title: 'Busca de log por 5-tupla', command: 'zgrep "203.0.113.50:45012" /var/log/cgnat/*.gz | tail -20', vendor: 'Linux', explanation: 'Correlaciona sessão pública ao assinante com timestamp.', moduleSlug: 'cgnat', lessonSlug: 'cgnat-logs-e-correlacao' },
  { title: 'Pools NAT RouterOS', command: '/ip firewall nat print stats where chain=srcnat', vendor: 'MikroTik', explanation: 'Acompanha volume traduzido em ambientes de borda menores.', moduleSlug: 'cgnat' },

  { title: 'Vizinhos OSPF', command: 'show ip ospf neighbor', vendor: 'Cisco-like', explanation: 'Confirma estado Full e estabilidade de adjacências.', moduleSlug: 'ospf', lessonSlug: 'ospf-vizinhos-e-estados' },
  { title: 'Banco LSDB', command: 'show ospf database', vendor: 'Juniper-like', explanation: 'Analisa consistência de LSAs e topologia.', moduleSlug: 'ospf', lessonSlug: 'ospf-conceitos-e-lsas' },
  { title: 'Interfaces OSPF RouterOS', command: '/routing ospf interface print detail', vendor: 'MikroTik', explanation: 'Verifica área, custo e timers por interface.', moduleSlug: 'ospf' },
  { title: 'Rota OSPF no Linux FRR', command: 'vtysh -c "show ip route ospf"', vendor: 'Linux', explanation: 'Valida instalação de rotas OSPF no RIB.', moduleSlug: 'ospf' },

  { title: 'Resumo de sessões BGP', command: 'show ip bgp summary', vendor: 'Cisco-like', explanation: 'Mostra estado, uptime e quantidade de prefixos.', moduleSlug: 'bgp', lessonSlug: 'bgp-fundamentos-e-sessao' },
  { title: 'Validação RPKI', command: 'show bgp rpki server', vendor: 'Juniper-like', explanation: 'Confere conectividade e estado do validador RPKI.', moduleSlug: 'bgp', lessonSlug: 'bgp-rpki-e-operacao-segura' },
  { title: 'Filtros BGP RouterOS', command: '/routing/filter/rule/print detail', vendor: 'MikroTik', explanation: 'Audita política de import/export e proteção.', moduleSlug: 'bgp' },
  { title: 'Sessões BGP FRR', command: 'vtysh -c "show bgp ipv4 unicast summary"', vendor: 'Linux', explanation: 'Verifica peers e convergência no laboratório Linux.', moduleSlug: 'bgp' },

  { title: 'Tabela de labels', command: 'show mpls forwarding-table', vendor: 'Cisco-like', explanation: 'Valida swap/pop e próximo salto por label.', moduleSlug: 'mpls', lessonSlug: 'mpls-arquitetura-e-labels' },
  { title: 'Vizinhos LDP', command: 'show ldp neighbor', vendor: 'Juniper-like', explanation: 'Confirma sessão LDP e distribuição de labels.', moduleSlug: 'mpls', lessonSlug: 'mpls-ldp-e-loopbacks' },
  { title: 'Rotas VRF', command: 'show route table CUST-A.inet.0', vendor: 'Juniper-like', explanation: 'Inspeciona isolamento e importação RT por cliente.', moduleSlug: 'mpls', lessonSlug: 'mpls-vrf-rd-rt' },
  { title: 'MPLS no MikroTik', command: '/mpls ldp neighbor print detail', vendor: 'MikroTik', explanation: 'Checa adjacência LDP em RouterOS no core de lab.', moduleSlug: 'mpls' },

  { title: 'Leitura SNMP IF-MIB', command: 'snmpwalk -v2c -c public 10.0.0.1 IF-MIB::ifHCInOctets', vendor: 'Linux', explanation: 'Coleta tráfego de interface para tendência.', moduleSlug: 'monitoramento-isp', lessonSlug: 'moni-snmp-e-telemetria' },
  { title: 'Top talkers IPFIX', command: 'nfdump -R /var/cache/nfdump -s srcip/bytes -n 20', vendor: 'Linux', explanation: 'Identifica maiores consumidores por origem.', moduleSlug: 'monitoramento-isp', lessonSlug: 'moni-flow-e-capacidade' },
  { title: 'Log buffer de roteador', command: 'show logging | last 100', vendor: 'Cisco-like', explanation: 'Correlaciona eventos de flap e queda de sessão.', moduleSlug: 'monitoramento-isp', lessonSlug: 'moni-logs-e-correlacao' },
  { title: 'Latência contínua por destino', command: 'smokeping --check', vendor: 'Linux', explanation: 'Verifica health de medições ativas de RTT/perda.', moduleSlug: 'monitoramento-isp' },
];
