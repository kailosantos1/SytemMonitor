# Configuração e execução

## Tecnologias declaradas

[`pom.xml`](../../../pom.xml) declara Java 25 e Spring Boot 4.0.3. As dependências incluem Spring MVC, Spring Data JPA, MySQL Connector/J (runtime), Lombok (opcional), Spring Security e starters de teste para JPA e MVC.

O repositório contém `mvnw` e `mvnw.cmd`; `.mvn/wrapper/maven-wrapper.properties` fixa Maven 3.9.16. O script `mvnw` não tem permissão de execução neste checkout, então use `bash mvnw ...` no Linux. Não é necessário instalar Maven manualmente: o wrapper baixa a distribuição configurada.

## Configuração da aplicação

[`application.properties`](../../../src/main/resources/application.properties) contém propriedades ativas de conexão datasource e configuração JPA/Hibernate. Os valores podem conter credenciais e não são exibidos nesta documentação. Antes de iniciar:

1. Configure uma instância de banco compatível com o driver declarado e confirme banco, usuário, senha e política de criação/atualização de esquema.
2. Forneça a configuração sensível por mecanismo apropriado ao ambiente; não publique credenciais no vault.
3. Confirme a porta/URL do backend e alinhe a origem codificada em `frontend/script.js`.
4. Verifique a origem do frontend e as regras CORS ao executá-lo em host diferente.

O README sugere Live Server para servir os arquivos estáticos, mas essa orientação não foi testada. Não há instrução de deploy versionada.

## Comandos Maven

Com o wrapper e uma configuração de datasource pronta, os alvos padrão são:

```bash
bash mvnw spring-boot:run
bash mvnw test
bash mvnw clean package
```

Configure o banco antes de executar a aplicação ou os testes de contexto. O wrapper baixa a versão Maven definida no arquivo de propriedades.

Voltar para [[06 - Desenvolvimento/Indice|índice de desenvolvimento]].
