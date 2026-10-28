# API REST

Os endpoints abaixo são confirmados pelos mapeamentos em [`ServidorController.java`](../../../src/main/java/com/systemup/monitor/ServidorController.java) e [`UsuarioController.java`](../../../src/main/java/com/systemup/monitor/UsuarioController.java). O frontend usa `http://localhost:8080` como origem fixa.

## Ativos e logs — `/api/servidores`

| Método | Caminho | Comportamento observado |
|---|---|---|
| `GET` | `/api/servidores` | Lista ativos; testa TCP e atualiza status/logs como efeito colateral. |
| `GET` | `/api/servidores/{id}` | Busca um ativo; responde 404 quando ausente. |
| `POST` | `/api/servidores` | Persiste o objeto enviado como JSON. |
| `PUT` | `/api/servidores/{id}` | Atualiza nome, IP, porta e `paiId`; responde 404 quando ausente. |
| `DELETE` | `/api/servidores/{id}` | Exclui pelo ID. |
| `GET` | `/api/servidores/logs` | Devolve até dez logs globais recentes. |
| `GET` | `/api/servidores/logs/{nome}` | Lista histórico por nome, em ordem decrescente de data/hora. |

O JSON de `Servidor` expõe propriedades Java como `id`, `nome`, `ip`, `porta`, `status` e `paiId`. O cadastro do frontend envia nome, IP, porta e pai opcional.

## Usuários — `/api/usuarios`

| Método | Caminho | Comportamento observado |
|---|---|---|
| `POST` | `/api/usuarios/cadastro` | Recebe `nome`, `email`, `senha`; rejeita email fora do sufixo aceito com 400, codifica a senha e salva. |
| `POST` | `/api/usuarios/login` | Recebe email e senha; devolve 200 para correspondência e 401 para credenciais inválidas. |

As respostas de sucesso/erro são textos simples nos métodos de usuário; não há contrato OpenAPI ou DTOs explícitos no repositório.

## CORS e proteção

Ambos controladores declaram `@CrossOrigin("*")`; `SecurityConfig` autoriza todas as requisições. Consulte [[02 - Modulos/Seguranca|segurança e autenticação]] para as consequências.

Voltar para [[05 - Interfaces e Integracoes/Indice|índice de interfaces e integrações]].
