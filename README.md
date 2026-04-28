# Redes ISP Academy

Plataforma de estudo técnico para trilha ISP (suporte → NOC → backbone), construída em Next.js App Router.

## Stack
- Next.js + TypeScript + Tailwind
- shadcn/ui base + Radix
- Zustand, Sonner, cmdk, motion
- react-hotkeys-hook, shiki (preparado), @xyflow/react (preparado), recharts (preparado)
- Vitest + Testing Library

## Instalação
```bash
npm install
```

## Rodar local
```bash
npm run dev
```

## Testes
```bash
npm run test
```

## Build
```bash
npm run lint
npm run typecheck
npm run build
```

## Como adicionar módulo novo
1. Adicione no `src/data/modules.ts`.
2. Adicione lições em `src/data/lessons.ts`.
3. Relacione glossário, comandos, checklist, labs e fontes.

## Como adicionar aula nova
1. Criar objeto em `src/data/lessons.ts` com `moduleId`, `slug` e navegação.
2. Validar rota `/trilha/[moduleSlug]/aulas/[lessonSlug]`.

## Editar glossário
- `src/data/glossary.ts`

## Editar comandos
- `src/data/commands.ts`

## Publicar na Vercel
1. Suba repositório no GitHub.
2. Importe na Vercel.
3. Configure variáveis se necessário.
4. Deploy automático por branch.

## Estrutura
- `src/app`: rotas
- `src/components`: layout, curso, aula, busca, ui
- `src/data`: conteúdo estruturado
- `src/store`: estado local/progresso

## Próximos passos
- Completar módulos 1-6 e 8-9 com extração integral da apostila.
- Evoluir `NetworkDiagram` para @xyflow/react.
- Adicionar autenticação e backend.

## Fonte de conteúdo
Conteúdo base extraído de `codex_export/content/apostila-redes-isp.md`, com módulo BGP detalhado e TODOs para completar os demais módulos.
