export const sources = [
  { title: 'Apostila Redes ISP do Zero ao Backbone', organization: 'Redes ISP Academy', url: 'codex_export/content/apostila-redes-isp.md', moduleSlug: 'all', type: 'apostila' },

  // Redes de computadores
  { title: 'Internet Protocol (RFC 791)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc791', moduleSlug: 'redes-de-computadores', type: 'rfc' },
  { title: 'ICMP (RFC 792)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc792', moduleSlug: 'redes-de-computadores', type: 'rfc' },
  { title: 'Path MTU Discovery (RFC 1191)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc1191', moduleSlug: 'redes-de-computadores', type: 'rfc' },
  { title: 'MikroTik RouterOS Documentation', organization: 'MikroTik', url: 'https://help.mikrotik.com/docs/', moduleSlug: 'redes-de-computadores', type: 'documentacao-vendor' },

  // Fundamentos ISP
  { title: 'PPP over Ethernet (RFC 2516)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc2516', moduleSlug: 'fundamentos-rede-isp', type: 'rfc' },
  { title: 'IX.br', organization: 'NIC.br', url: 'https://ix.br/', moduleSlug: 'fundamentos-rede-isp', type: 'boas-praticas' },
  { title: 'Registro.br', organization: 'NIC.br', url: 'https://registro.br/', moduleSlug: 'fundamentos-rede-isp', type: 'boas-praticas' },
  { title: 'PeeringDB Documentation', organization: 'PeeringDB', url: 'https://docs.peeringdb.com/', moduleSlug: 'fundamentos-rede-isp', type: 'boas-praticas' },

  // DNS
  { title: 'Domain Names - Concepts and Facilities (RFC 1034)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc1034', moduleSlug: 'dns', type: 'rfc' },
  { title: 'Domain Names - Implementation and Specification (RFC 1035)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc1035', moduleSlug: 'dns', type: 'rfc' },
  { title: 'DNSSEC Introduction (RFC 4033)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc4033', moduleSlug: 'dns', type: 'rfc' },
  { title: 'DNSSEC Operational Practices (NIC.br)', organization: 'NIC.br', url: 'https://nic.br/tecnologia/seguranca/dnssec/', moduleSlug: 'dns', type: 'boas-praticas' },

  // NAT
  { title: 'Traditional NAT (RFC 3022)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc3022', moduleSlug: 'nat', type: 'rfc' },
  { title: 'NAT UDP Behavioral Requirements (RFC 4787)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc4787', moduleSlug: 'nat', type: 'rfc' },
  { title: 'Cisco IOS XE NAT Configuration Guide', organization: 'Cisco', url: 'https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_nat/configuration/xe-17/nat-xe-17-book.html', moduleSlug: 'nat', type: 'documentacao-vendor' },
  { title: 'Juniper NAT Overview', organization: 'Juniper', url: 'https://www.juniper.net/documentation/us/en/software/junos/nat/', moduleSlug: 'nat', type: 'documentacao-vendor' },

  // CGNAT
  { title: 'Shared Address Space (RFC 6598)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc6598', moduleSlug: 'cgnat', type: 'rfc' },
  { title: 'CGN Requirements (RFC 6888)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc6888', moduleSlug: 'cgnat', type: 'rfc' },
  { title: 'Address Sharing Methods (RFC 7422)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc7422', moduleSlug: 'cgnat', type: 'rfc' },
  { title: 'RIPE NCC Best Current Operational Practices', organization: 'RIPE NCC', url: 'https://www.ripe.net/publications/docs/ripe-554/', moduleSlug: 'cgnat', type: 'boas-praticas' },

  // OSPF
  { title: 'OSPFv2 (RFC 2328)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc2328', moduleSlug: 'ospf', type: 'rfc' },
  { title: 'OSPFv3 (RFC 5340)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc5340', moduleSlug: 'ospf', type: 'rfc' },
  { title: 'MikroTik OSPF Documentation', organization: 'MikroTik', url: 'https://help.mikrotik.com/docs/display/ROS/OSPF', moduleSlug: 'ospf', type: 'documentacao-vendor' },
  { title: 'Cisco OSPF Configuration Guide', organization: 'Cisco', url: 'https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html', moduleSlug: 'ospf', type: 'documentacao-vendor' },

  // BGP
  { title: 'BGP-4 (RFC 4271)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc4271', moduleSlug: 'bgp', type: 'rfc' },
  { title: 'BGP Operations and Security (RFC 7454)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc7454', moduleSlug: 'bgp', type: 'rfc' },
  { title: 'BGP Prefix Origin Validation (RFC 6811)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc6811', moduleSlug: 'bgp', type: 'rfc' },
  { title: 'MANRS Network Operator Actions', organization: 'MANRS', url: 'https://www.manrs.org/isps/guide/', moduleSlug: 'bgp', type: 'boas-praticas' },
  { title: 'RPKI Validator Documentation', organization: 'RIPE NCC', url: 'https://routinator.docs.nlnetlabs.nl/en/stable/', moduleSlug: 'bgp', type: 'boas-praticas' },

  // MPLS
  { title: 'MPLS Architecture (RFC 3031)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc3031', moduleSlug: 'mpls', type: 'rfc' },
  { title: 'LDP Specification (RFC 5036)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc5036', moduleSlug: 'mpls', type: 'rfc' },
  { title: 'BGP/MPLS IP VPNs (RFC 4364)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc4364', moduleSlug: 'mpls', type: 'rfc' },
  { title: 'Juniper MPLS Documentation', organization: 'Juniper', url: 'https://www.juniper.net/documentation/us/en/software/junos/mpls/', moduleSlug: 'mpls', type: 'documentacao-vendor' },

  // Monitoramento ISP
  { title: 'SNMP Architecture (RFC 3411)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc3411', moduleSlug: 'monitoramento-isp', type: 'rfc' },
  { title: 'Syslog Protocol (RFC 5424)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc5424', moduleSlug: 'monitoramento-isp', type: 'rfc' },
  { title: 'IPFIX Protocol (RFC 7011)', organization: 'IETF', url: 'https://datatracker.ietf.org/doc/html/rfc7011', moduleSlug: 'monitoramento-isp', type: 'rfc' },
  { title: 'Zabbix Documentation', organization: 'Zabbix', url: 'https://www.zabbix.com/documentation/current/en/manual', moduleSlug: 'monitoramento-isp', type: 'ferramenta' },
  { title: 'Grafana Documentation', organization: 'Grafana Labs', url: 'https://grafana.com/docs/', moduleSlug: 'monitoramento-isp', type: 'ferramenta' },
  { title: 'LibreNMS Docs', organization: 'LibreNMS', url: 'https://docs.librenms.org/', moduleSlug: 'monitoramento-isp', type: 'ferramenta' },
  { title: 'SmokePing Documentation', organization: 'SmokePing', url: 'https://oss.oetiker.ch/smokeping/doc/smokeping_master.en.html', moduleSlug: 'monitoramento-isp', type: 'ferramenta' },
];
