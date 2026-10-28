# Integrações externas

## Banco de dados

O `pom.xml` declara MySQL Connector/J em escopo de runtime e o [`README.md`](../../../README.md) orienta o uso de MySQL. [`application.properties`](../../../src/main/resources/application.properties) contém propriedades ativas de datasource/JPA; seus valores foram deliberadamente omitidos. Confirme ambiente, disponibilidade, credenciais e esquema sem colocar segredos em documentação versionada.

## API local

O JavaScript define as bases da API como `http://localhost:8080/api/servidores` e `http://localhost:8080/api/usuarios`. Isso serve ao cenário local; não há configuração externa de endereço identificada no frontend.

## Recursos do navegador e CDN

- SweetAlert2 é carregado das páginas HTML por CDN do jsDelivr.
- Notificações de host offline usam a API Web Notifications do navegador e um ícone remoto Flaticon.
- A permissão de notificações depende do navegador e do contexto de origem. Esses recursos requerem conexão externa quando não estão em cache.

## Integração de monitoramento

O backend abre sockets TCP ao IP e porta dos registros durante `GET /api/servidores`. Não foi identificado cliente ICMP/ping, agente instalado nos ativos, webhook, fila, serviço externo de monitoramento ou integração com SNMP.

Voltar para [[05 - Interfaces e Integracoes/Indice|índice de interfaces e integrações]].
