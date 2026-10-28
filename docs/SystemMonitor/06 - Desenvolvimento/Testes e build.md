# Testes e build

## Cobertura versionada

O único teste de aplicação identificado é [`MonitorApplicationTests.java`](../../../src/test/java/com/systemup/monitor/MonitorApplicationTests.java), que contém `contextLoads()` sob `@SpringBootTest`. Não foram encontrados testes versionados de endpoints, lógica TCP, transições de status, persistência, autenticação ou frontend.

O `pom.xml` configura o plugin do Spring Boot e inclui starters de teste para MVC e JPA. O build é Maven.

## Validação executada durante a documentação

Foi tentado executar a suíte de três formas:

| Comando | Resultado observado |
|---|---|
| `./mvnw test` | Não executou: arquivo `mvnw` sem permissão de execução. |
| `bash mvnw test` | Não executou: `.mvn/wrapper/maven-wrapper.properties` inexistente. |
| `mvn test` | Não executou: comando `mvn` não está instalado no ambiente. |

Assim, não há resultado de teste ou build aprovado a reportar. Para executar, instale/ disponibilize Maven ou complete a configuração do wrapper, forneça as configurações de banco requeridas e rode `mvn test`. Comandos identificados, ainda não validados: [[06 - Desenvolvimento/Configuracao e execucao|configuração e comandos]].

Voltar para [[06 - Desenvolvimento/Indice|índice de desenvolvimento]].
