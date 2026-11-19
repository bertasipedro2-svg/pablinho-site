# Pablinho Espetinhos — catálogo independente

O catálogo V12 lê `catalogo-dados.json`. O editor em `/admin/` abre os dados publicados, permite recuperar um rascunho deste navegador e exporta o JSON para revisão. Depois de baixar o arquivo, compare com o catálogo vigente em uma branch. A atualização dos clientes só acontece após a publicação do JSON por quem mantém o site.

O painel Pablinho Brasa gerencia operações e estoque no banco. Este editor estático trabalha apenas com o arquivo do GitHub Pages. Pedidos deste site seguem pelo WhatsApp.

## Verificação local

Sirva a raiz com `python -m http.server 8000` e abra `/admin/` ou `/v12/`. Para executar a regressão, use Node.js 24 com jsdom 20 disponível e rode `node tests/catalogo-estatico.cjs` na raiz. O teste cobre a queda e a recuperação da consulta, o carrinho e a exportação.
