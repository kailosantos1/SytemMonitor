# Configuração e execução

## Tecnologias declaradas

[`pom.xml`](../../../pom.xml) declara Java 21 e Spring Boot 4.0.3. As dependências incluem Spring MVC, Spring Data JPA, MySQL Connector/J (runtime), Lombok (opcional), Spring Security e starters de teste para JPA e MVC.

O repositório tem `mvnw` e `mvnw.cmd`, mas **não contém** `.mvn/wrapper/maven-wrapper.properties`; no ambiente desta análise, `mvnw` também não tinha permissão de execução. Maven não estava instalado. Portanto, os comandos Maven padrão abaixo são identificados pelo manifesto, não foram executados com sucesso neste checkout.

## Configuração da aplicação

[`application.properties`](../../../src/main/resources/application.properties) contém propriedades ativas de conexão datasource e configuração JPA/Hibernate. Os valores podem conter credenciais e não são exibidos nesta documentação. Antes de iniciar:

1. Configure uma instância de banco compatível com o driver declarado e confirme banco, usuário, senha e política de criação/atualização de esquema.
2. Forneça a configuração sensível por mecanismo apropriado ao ambiente; não publique credenciais no vault.
3. Confirme a porta/URL do backend e alinhe a origem codificada em `frontend/script.js`.
4. Verifique a origem do frontend e as regras CORS ao executá-lo em host diferente.

O README sugere Live Server para servir os arquivos estáticos, mas essa orientação não foi testada. Não há instrução de deploy versionada.

## Comandos identificados, não validados neste ambiente

Com Maven instalado e configuração de datasource pronta, o projeto Maven oferece os alvos padrão:

```bash
mvn spring-boot:run
mvn test
mvn clean package
```

Não executar sem primeiro configurar o banco. O comando de wrapper `./mvnw test` falhou por falta de permissão; `bash mvnw test` falhou por falta do arquivo de propriedades do wrapper; `mvn test` falhou porque Maven não estava instalado. Esses resultados não confirmam nem refutam a compilação/testes do código.

Voltar para [[06 - Desenvolvimento/Indice|índice de desenvolvimento]].
