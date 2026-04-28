# Instruções para o Codex - Redes ISP Academy

Use o arquivo `content/apostila-redes-isp.md` como fonte principal de conteúdo.

## Objetivo
Criar uma aplicação web completa chamada **Redes ISP Academy**, baseada na apostila **Redes ISP do Zero ao Backbone** e nas imagens em `references/`.

## Como usar este pacote
- `content/apostila-redes-isp.md`: conteúdo completo extraído da apostila em Markdown.
- `content/apostila-redes-isp.txt`: versão texto limpa, alternativa para parsing.
- `references/tela-trilha-modulo.png`: referência visual da página de trilha/módulo.
- `references/tela-continuar-aula.png`: referência visual da página de aula focada.

## Tarefa principal
1. Ler `content/apostila-redes-isp.md`.
2. Identificar os módulos, seções, comandos, glossários, checklists, missões práticas, perguntas rápidas, resumos de bolso e fontes.
3. Transformar o conteúdo em dados estruturados em `src/data/`.
4. Implementar a aplicação web com Next.js, TypeScript, Tailwind, shadcn/ui e as bibliotecas definidas no prompt principal.
5. Usar as imagens em `references/` como referência visual obrigatória.
6. Rodar lint, typecheck, build e testes antes de finalizar.

## Regra de qualidade
Não use lorem ipsum. Não remova profundidade técnica. Não entregue com erro de build, TypeScript, lint ou testes quebrados.
