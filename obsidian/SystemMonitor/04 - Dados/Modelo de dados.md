# Modelo de dados

As entidades JPA observadas declaram as tabelas `servidores`, `usuarios` e `logs`. O driver MySQL e configurações de datasource/JPA constam em [`pom.xml`](../../../pom.xml) e [`application.properties`](../../../src/main/resources/application.properties); detalhes de conexão não são reproduzidos.

```mermaid
erDiagram
    SERVIDOR {
        Long id PK
        String nome
        String ip
        int porta
        String status
        Long pai_id
    }
    USUARIO {
        Long id PK
        String email UK
        String senha
        String nome
    }
    LOG {
        Long id PK
        String servidorNome
        String status
        LocalDateTime dataHora
    }
    SERVIDOR ||--o{ SERVIDOR : "paiId lógico"
    SERVIDOR ..o{ LOG : "servidorNome textual, não FK"
```

## `Servidor`

[`Servidor.java`](../../../src/main/java/com/systemup/monitor/Servidor.java) usa `@Entity`/`@Table(name = "servidores")`. O identificador é gerado pelo banco. Os campos são `nome`, `ip`, `porta`, `status` e `paiId`, mapeado para `pai_id`. `paiId` representa a hierarquia de hosts/VMs como um `Long`; não há associação JPA nem garantia de chave estrangeira declarada.

## `Usuario`

[`Usuario.java`](../../../src/main/java/com/systemup/monitor/Usuario.java) mapeia `usuarios`, com ID gerado, `email` único, `senha` e `nome`. A senha é transformada pelo controlador de cadastro antes da persistência; ver [[03 - Fluxos/Cadastro e login|fluxo de acesso]].

## `Log`

[`Log.java`](../../../src/main/java/com/systemup/monitor/Log.java) mapeia `logs`, com `id`, `servidorNome`, `status` e `dataHora` (`LocalDateTime`). O construtor usado para transição define o horário local atual. O identificador do ativo é guardado pelo nome, não por uma relação JPA; mudanças de nome não reescrevem automaticamente históricos.

## Repositórios

- [`ServidorRepository.java`](../../../src/main/java/com/systemup/monitor/ServidorRepository.java): CRUD JPA padrão.
- [`UsuarioRepository.java`](../../../src/main/java/com/systemup/monitor/UsuarioRepository.java): CRUD e `findByEmail`.
- [`LogRepository.java`](../../../src/main/java/com/systemup/monitor/LogRepository.java): últimos dez logs, histórico por nome e exclusão anterior a uma data.

Voltar para [[04 - Dados/Indice|índice de dados]].
