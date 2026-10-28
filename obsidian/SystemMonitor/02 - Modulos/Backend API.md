# Backend REST e monitoramento

## Inicialização e dependências

`MonitorApplication.main` inicia o Spring Boot; `@EnableScheduling` ativa tarefas agendadas. O backend usa Spring MVC para endpoints e Spring Data JPA para persistência. As dependências e a versão Java declarada estão em [`pom.xml`](../../../pom.xml).

## `ServidorController`

[`ServidorController.java`](../../../src/main/java/com/systemup/monitor/ServidorController.java) é mapeado em `/api/servidores` e injeta `ServidorRepository` e `LogRepository`.

- `listarTodos()` busca todos os ativos. Para cada registro, chama `testarConexao(ip, porta)`, compara o resultado com o status anterior, grava log quando há transição de status já inicializado, atualiza o status e salva a entidade.
- `testarConexao()` tenta abrir um `Socket` TCP com timeout de 1.500 ms. A exceção resulta em `OFFLINE`; conexão bem-sucedida resulta em `ONLINE`. Isso confirma conectividade TCP na porta cadastrada, não valida o protocolo/saúde da aplicação remota.
- Os logs são consultados por nome ou em uma lista global limitada aos dez mais recentes.
- O método `limparLogsAntigos()` executa a cada 86.400.000 ms e remove registros anteriores a 24 horas do instante da execução.
- CRUD usa `ServidorRepository`, uma interface `JpaRepository<Servidor, Long>` em [`ServidorRepository.java`](../../../src/main/java/com/systemup/monitor/ServidorRepository.java).

O teste ocorre dentro da listagem REST, sequencialmente para cada ativo. Portanto, uma chamada pode demorar até aproximadamente 1,5 s por ativo sem resposta, além do tempo de persistência e da rede. O código não define um agendador separado para atualizar status sem uma chamada.

## `UsuarioController`

[`UsuarioController.java`](../../../src/main/java/com/systemup/monitor/UsuarioController.java) oferece cadastro e login:

- Cadastro rejeita endereço nulo ou fora do sufixo `@systemup.inf.br`, aplica `BCryptPasswordEncoder` e persiste pelo `UsuarioRepository`.
- Login busca por email e compara a senha submetida ao hash usando `encoder.matches`; resposta de credenciais inválidas é HTTP 401.
- `UsuarioRepository.findByEmail` retorna `Optional<Usuario>`.

Não há emissão de token, sessão de servidor ou integração do login com regras de autorização no código examinado. Detalhes e limites estão em [[02 - Modulos/Seguranca|segurança e autenticação]].

## Tarefa agendada

A limpeza periódica reside em `ServidorController` e depende da habilitação em `MonitorApplication`. Ela apaga logs com mais de 24 horas, mas não verifica disponibilidade dos ativos.

## Relacionamentos

`ServidorController` concentra CRUD, monitoramento e ciclo de vida de logs. O relacionamento entre host e VM é tratado como valor `paiId`, não como associação JPA. Ver [[04 - Dados/Modelo de dados|modelo de dados]], [[03 - Fluxos/Monitoramento|fluxo de monitoramento]] e [[05 - Interfaces e Integracoes/API REST|endpoints]].

Voltar para [[02 - Modulos/Indice|índice de módulos]].
