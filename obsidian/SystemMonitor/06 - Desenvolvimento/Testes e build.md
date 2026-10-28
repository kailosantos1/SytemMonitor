# Testes e build

## Cobertura versionada

O único teste de aplicação identificado é [`MonitorApplicationTests.java`](../../../src/test/java/com/systemup/monitor/MonitorApplicationTests.java), que contém `contextLoads()` sob `@SpringBootTest`. Não foram encontrados testes versionados de endpoints, lógica TCP, transições de status, persistência, autenticação ou frontend.

O `pom.xml` configura o plugin do Spring Boot e inclui starters de teste para MVC e JPA. O build é Maven.

## Validação executada com Java 25

| Comando | Resultado observado |
|---|---|
| `JAVA_HOME=<JDK 25> bash mvnw clean test-compile -q` | Sucesso: código principal e testes compilados. |
| `JAVA_HOME=<JDK 25> bash mvnw clean test -q` | Falha: 1 teste, 0 falhas de asserção, 1 erro ao conectar em `localhost:3306` durante a inicialização do contexto Spring. |

O teste `contextLoads()` requer a conexão MySQL configurada em `application.properties`. Para validar a suíte, disponibilize o banco e suas credenciais no ambiente e rode `bash mvnw clean test`. O teste não atestou integração de persistência porque a conexão não estava disponível.

Voltar para [[06 - Desenvolvimento/Indice|índice de desenvolvimento]].
