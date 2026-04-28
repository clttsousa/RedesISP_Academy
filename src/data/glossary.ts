export const glossary = [
  { term: 'AS', definition: 'Sistema Autônomo com política de roteamento própria.', moduleSlug: 'bgp-em-isp', relatedTerms: ['eBGP', 'iBGP'] },
  { term: 'eBGP', definition: 'Sessão BGP entre AS diferentes.', moduleSlug: 'bgp-em-isp', relatedTerms: ['AS', 'iBGP'] },
  { term: 'iBGP', definition: 'Sessão BGP dentro do mesmo AS.', moduleSlug: 'bgp-em-isp', relatedTerms: ['AS', 'Route Reflector'] },
  { term: 'Prefix-list', definition: 'Filtro de prefixos anunciado/aceito em políticas BGP.', moduleSlug: 'bgp-em-isp', relatedTerms: ['Route-map'] }
];
