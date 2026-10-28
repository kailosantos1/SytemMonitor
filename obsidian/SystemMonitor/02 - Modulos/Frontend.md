# Frontend estático

## Páginas

- [`frontend/index.html`](../../../frontend/index.html): dashboard, busca por nome/IP, botão de inclusão e saída.
- [`frontend/adicionar.html`](../../../frontend/adicionar.html): formulário de ativo, endereço IP, porta e seleção opcional de host.
- [`frontend/login.html`](../../../frontend/login.html): formulário de login.
- [`frontend/cadastro.html`](../../../frontend/cadastro.html): cadastro de usuário.
- As páginas carregam [`frontend/style.css`](../../../frontend/style.css) e, com exceção de estilos que não são aplicáveis, [`frontend/script.js`](../../../frontend/script.js). SweetAlert2 é carregado via CDN nas páginas que exibem diálogos.

## Comportamento de `script.js`

[`frontend/script.js`](../../../frontend/script.js) contém a lógica compartilhada:

- `renderizar()` busca a lista da API, separa hosts (`paiId === null`) de VMs, cria cards e marca hosts com VMs offline. O dashboard repete a consulta a cada 30 segundos.
- O filtro procura texto no nome e IP exibidos nos cards.
- `abrirModalVms()` mostra VMs associadas ao host; `verHistorico()` busca logs para o nome selecionado.
- `carregarHostsNoSelect()` popula as opções de host no formulário de inclusão.
- `salvarNoJava()`, `editarServidor()` e `remover()` realizam operações REST de cadastro, edição e exclusão.
- `realizarCadastro()` e `realizarLogin()` usam os endpoints de usuários. O email fica em `localStorage` como `usuarioLogado`; `sair()` remove esse valor.
- `dispararNotificacao()` usa a API de notificações do navegador para alertar sobre hosts offline, com deduplicação temporária em memória. A solicitação de permissão é feita pelo próprio script.

O dashboard e o backend concordam na URL-base local `http://localhost:8080`. Para outra instalação, URL e CORS precisam ser verificados/ajustados; não há variável de ambiente ou configuração por ambiente no frontend observado.

## Estilos e recursos externos

[`frontend/style.css`](../../../frontend/style.css) define variáveis de cor, cards online/offline, alerta de VM, animação, carregamento, formulários e telas de acesso. Não foi identificada regra `@media` no arquivo, portanto a afirmação de responsividade no README não é confirmada por breakpoints CSS no arquivo atual.

As páginas carregam SweetAlert2 em `cdn.jsdelivr.net`; notificações usam um ícone externo Flaticon. Dependem de navegador compatível e, para esses recursos, conectividade com os domínios externos.

Relacionados: [[03 - Fluxos/Cadastro de ativo|cadastro de ativo]], [[03 - Fluxos/Cadastro e login|cadastro e login]], [[05 - Interfaces e Integracoes/Integracoes externas|integrações externas]].

Voltar para [[02 - Modulos/Indice|índice de módulos]].
