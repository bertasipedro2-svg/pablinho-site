# Plano de publicação — Pablinho Futurista Premium V12

## Estrutura independente
- `/index.html`: V12 principal (usa `/v12/imperial-v12.css` e `/v12/imperial-v12.js`)
- `/v12/index.html`: versão V12 alternativa
- `/v10/index.html`: backup navegável da V10
- Arquivos `imperial-v4-2*` e `imperial-v4-3*`: recursos compartilhados
- `.github/workflows/pages.yml`: publicação gratuita pelo GitHub Pages

## Etapas concluídas
1. Preservar V10 em rota própria.
2. Promover V12 à página inicial.
3. Preservar dados de produtos, preços, carrinho e pedido via WhatsApp.

## Etapas para confirmar a publicação
1. No GitHub: Settings > Pages > Build and deployment > Source = GitHub Actions.
2. Em Actions > Publicar Pablinho Site, executar `Run workflow` na branch `main` se não houver execução automática.
3. Confirmar conclusão verde do job `deploy`.
4. Abrir https://bertasipedro2-svg.github.io/pablinho-site/ e testar imagens, categorias, busca, carrinho, entrega, retirada e WhatsApp.
5. Confirmar também https://bertasipedro2-svg.github.io/pablinho-site/v10/.

## Restrições
- Hospedagem GitHub Pages pública e gratuita, sem domínio pago.
- Não há backend próprio, pagamentos online nem sincronização de carrinho.
- O envio do pedido depende de WhatsApp e da confirmação do estabelecimento.
- A publicação e os testes em navegador real ainda precisam ser confirmados; arquivos presentes no GitHub não provam site no ar.
