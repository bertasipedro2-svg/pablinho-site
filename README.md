# Pablinho Espetinhos — catálogo independente

O catálogo V12 lê `catalogo-dados.json`. O editor em `/admin/` abre os dados publicados, permite recuperar um rascunho deste navegador e exporta o JSON para revisão. Depois de baixar o arquivo, compare com o catálogo vigente em uma branch. A atualização dos clientes só acontece após a publicação do JSON por quem mantém o site.

O painel Pablinho Brasa gerencia operações e estoque no banco. Este editor estático trabalha apenas com o arquivo do GitHub Pages. Pedidos deste site seguem pelo WhatsApp.

## Verificação local

Sirva a raiz com `python -m http.server 8000` e abra `/admin/` ou `/v12/`. Para executar a regressão, use Node.js 24 com jsdom 20 disponível e rode `node tests/catalogo-estatico.cjs` na raiz. O teste cobre a queda e a recuperação da consulta, o carrinho e a exportação.

## Integração V12 com o Brasa em homologação

Por padrão, a raiz e a rota `/v12/` continuam usando `catalogo-dados.json`. Para testar a integração, configure a meta `pablinho-brasa-origin` nas duas páginas com a origem do Brasa de homologação, sem caminho. Nesse servidor, configure `PABLINHO_V12_ORIGIN` com a origem exata que serve o V12 de teste e habilite o checkout conforme a documentação do Brasa.

No modo conectado, nomes, categorias, descrições, preços e disponibilidade vêm do banco. As fotos e ícones locais são vinculados pelo UUID em `brasa-vinculos.json` para quando não houver foto válida no Brasa. O V12 encaminha somente UUIDs e quantidades ao checkout. Os dados pessoais são preenchidos no Brasa. Os carrinhos locais e conectados usam chaves diferentes para preservar as seleções durante a homologação. Em falha da consulta, o modo conectado bloqueia novos pedidos.
