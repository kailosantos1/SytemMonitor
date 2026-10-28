# Cadastro e manutenção de ativo

## Inclusão

1. A página [`frontend/adicionar.html`](../../../frontend/adicionar.html) chama `carregarHostsNoSelect()` e consulta `GET /api/servidores`.
2. A lista de hosts é formada pelos servidores com `paiId === null`. A opção vazia representa um ativo sem host pai.
3. O formulário chama `salvarNoJava()`, que envia `POST /api/servidores` com `nome`, `ip`, `porta` numérica e `paiId` numérico ou `null`.
4. `ServidorController.salvar()` delega o corpo JSON a `ServidorRepository.save()`.

## Edição e remoção

- Edição busca `GET /api/servidores/{id}`, apresenta campos em um diálogo e envia `PUT /api/servidores/{id}`. O backend atualiza nome, IP, porta e pai.
- Remoção pede confirmação e envia `DELETE /api/servidores/{id}`.
- O frontend atualiza o dashboard após essas operações.

O formulário e os controladores não apresentam validação de domínio completa para IP, porta, existência de `paiId` ou ciclos na hierarquia; não presumir essas garantias sem teste/validação adicional.

## Relação hierárquica

`paiId` vazio cria um host (ou ativo raiz); preenchido indica associação a um host. O modelo não define relacionamento JPA ou integridade referencial explícita. A interface de edição preserva o pai atual e não oferece troca de pai naquele diálogo.

Ver [[04 - Dados/Modelo de dados|modelo de dados]] e [[05 - Interfaces e Integracoes/API REST|API de ativos]].

Voltar para [[03 - Fluxos/Indice|índice de fluxos]].
