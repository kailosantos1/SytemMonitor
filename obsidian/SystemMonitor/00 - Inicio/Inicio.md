# SystemUp Monitor — documentação

Este vault descreve o projeto SystemUp Monitor com base nos arquivos versionados de código, configuração e documentação. Ele cobre o frontend HTML/CSS/JavaScript, a API Spring Boot, a persistência JPA/MySQL e os fluxos efetivamente implementados.

## Mapa do vault

- [[01 - Arquitetura/Indice|Arquitetura]]
- [[02 - Modulos/Indice|Módulos e componentes]]
- [[03 - Fluxos/Indice|Fluxos de execução]]
- [[04 - Dados/Indice|Modelo de dados]]
- [[05 - Interfaces e Integracoes/Indice|API e integrações]]
- [[06 - Desenvolvimento/Indice|Desenvolvimento, configuração e testes]]
- [[07 - Operacao/Indice|Operação e limitações de execução]]
- [[08 - Pendencias/Indice|Dúvidas e pontos de atenção]]

## Visão rápida

O backend Java/Spring expõe endpoints REST para servidores, logs e usuários. O frontend estático consome a API em `http://localhost:8080`; ao consultar a lista de servidores, o backend testa a conexão TCP de cada ativo, atualiza o status persistido e registra mudanças de estado. Hosts e VMs são representados pela mesma entidade, com uma referência `paiId`.

O cadastro e o login também têm endpoints próprios. O código atual usa BCrypt para armazenar senhas, mas permite todas as requisições HTTP; a identificação salva no navegador não equivale a uma sessão autenticada no backend. Veja [[02 - Modulos/Seguranca|Segurança e autenticação]] e [[08 - Pendencias/Pontos a confirmar|pontos a confirmar]] antes de interpretar isso como controle de acesso.

## Como ler as afirmações

- **Confirmado no código**: comportamento observado nos arquivos-fonte versionados.
- **Identificado na configuração/documentação**: declarado por um manifesto ou README, mas não necessariamente executado neste ambiente.
- **Pendente de confirmação**: depende de configuração local, operação externa ou decisão que não está registrada.

Referências à aplicação usam caminhos relativos ao repositório, por exemplo [`ServidorController.java`](../../../src/main/java/com/systemup/monitor/ServidorController.java). O conteúdo de propriedades de conexão e demais valores potencialmente sensíveis não é reproduzido.

## Referências legadas

- [`README.md`](../../../README.md) descreve a intenção do produto e instruções de uso; algumas declarações precisam ser comparadas com o código atual, como detalhado em [[08 - Pendencias/Pontos a confirmar|pontos a confirmar]].
- [`HELP.md`](../../../HELP.md) contém referências genéricas do Spring Boot/Maven, não um guia operacional específico do projeto.
