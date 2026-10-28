# Pontos a confirmar e limitações observadas

Esta nota registra lacunas encontradas na análise do repositório; não presume que alguma seja defeito conhecido nem escolhe uma solução.

## Confirmado no código

- **Autorização**: `SecurityConfig` permite todas as requisições, desativa CSRF e os controladores liberam CORS para `*`. O email no `localStorage` não protege a API. Confirmar se o escopo é apenas protótipo/local ou se é esperado controle de acesso real. Ver [[02 - Modulos/Seguranca|segurança]].
- **Sondagem acionada pela leitura**: a chamada GET à lista testa e salva os status; não existe verificação de disponibilidade em tarefa agendada. Confirmar se o ciclo dependente do navegador é intencional. Ver [[03 - Fluxos/Monitoramento|monitoramento]].
- **Persistência do histórico**: logs referenciam o servidor pelo nome, não por ID. Confirmar como tratar nomes duplicados ou alterados.
- **Relação host/VM**: `paiId` não é associação JPA explícita; não há validação observada de pai existente ou ciclos.
- **Validações de cadastro**: cadastro de usuário não verifica explicitamente senha ausente, email já cadastrado ou formato completo; a unicidade é declarada no campo JPA. Cadastro de ativos tampouco valida IP/porta/hierarquia no controlador.
- **Testes**: apenas `contextLoads()` está versionado; fluxos e regras de negócio não têm testes encontrados.
- **Recursos frontend**: URL da API é fixa para `localhost`; SweetAlert2 e ícone de notificação vêm de domínios externos.
- **CSS responsivo**: o README afirma responsividade; não foram encontrados media queries em `frontend/style.css`, então o suporte responsivo não foi comprovado.

## Divergências e fatos que precisam de confirmação

- O README instrui conexão MySQL e apresenta um exemplo de banco/usuário; os valores ativos de [`application.properties`](../../../src/main/resources/application.properties) não foram reproduzidos nem validados contra esse exemplo. Confirme a configuração no ambiente, mantendo segredos fora do vault.
- O README descreve o backend como responsável por pings; o código examinado faz teste de conexão TCP por socket em IP/porta quando a lista é consultada. Não foi encontrado ping ICMP.
- O README cita instalação/uso do Live Server e funcionamento na porta 8080, mas não foi possível iniciar aplicação ou frontend neste ambiente.
- A configuração padrão efetiva do Hibernate, banco/schema e estratégia segura de provisionamento não foi validada em execução.
- O wrapper Maven está incompleto no checkout analisado e Maven não está instalado no ambiente; veja [[06 - Desenvolvimento/Testes e build|validação de testes/build]].

## Fora do que foi possível confirmar

Não foram identificados pipeline CI, manifesto de deploy, infraestrutura como código, procedimento de backup/restore, métricas, logging centralizado, API formal (OpenAPI), requisitos de disponibilidade ou política de retenção além da limpeza de logs com mais de 24 horas. A ausência na lista de arquivos examinada não prova que esses itens não existam fora deste repositório.

Voltar para [[08 - Pendencias/Indice|índice de pendências]].
