# Comportamento em execução e diagnóstico

## Ciclo do dashboard

No carregamento do dashboard, o frontend consulta `/api/servidores` e repete a chamada a cada 30 segundos. Como esse endpoint realiza sondagem TCP sequencial e grava status, aumento na quantidade de ativos offline pode alongar a resposta. O timeout de cada conexão é 1.500 ms.

O scheduler Spring executa a exclusão de logs antigos a cada 86.400.000 ms após a inicialização. O corte é calculado como o instante atual menos 24 horas. A tarefa emite uma mensagem de console após a exclusão.

## Diagnóstico baseado no código

- Dashboard mostra erro de conexão quando falha a chamada à API; confirme backend disponível em `localhost:8080` e datasource acessível.
- O dashboard só exibe hosts como cards; VMs aparecem no detalhe do host vinculado.
- Uma porta TCP sem serviço ou inacessível aparece `OFFLINE`, mesmo que o host responda a outros protocolos.
- Histórico é indexado por nome. Verifique nomes duplicados/alterados se os resultados parecerem ambíguos.
- A ausência de `paiId` representa host/raiz para a interface; o código não impõe integridade hierárquica no modelo.

Esses pontos descrevem o código, não uma infraestrutura de produção verificada. Não há configuração versionada de logging estruturado, métricas, health-check, alertas server-side, deployment ou backup.

Voltar para [[07 - Operacao/Indice|índice de operação]].
