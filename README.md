🚀 SystemUp Monitor

  O SystemUp Monitor é uma solução leve e eficiente para monitoramento em tempo real de infraestrutura de TI, focada em Servidores Físicos (Hosts) e Máquinas Virtuais (VMs). Desenvolvido para facilitar o dia a dia de administradores de rede, o painel oferece uma visão clara do status de disponibilidade (UP/DOWN) de ativos críticos.

✨ Funcionalidades

  Monitoramento Hierárquico: Diferenciação visual entre Servidores Físicos e VMs vinculadas.
Alertas Visuais Inteligentes: * Cards com animação pulse para ativos offline.
Aviso de atenção (Yellow Alert) em Hosts que possuem VMs com falha.
Busca Dinâmica: Filtro em tempo real para localizar clientes ou servidores específicos rapidamente.
Gestão de Logs: Histórico individual de eventos por ativo para facilitar o troubleshooting.
Interface Responsiva: Painel administrativo moderno com suporte a temas de cores institucionais.
Segurança: Telas de Login e Cadastro integradas para controle de acesso.

🛠️ Tecnologias Utilizadas

  Frontend: HTML5, CSS3 (Custom Variables & Animations), JavaScript Moderno (ES6+).
Feedback Visual: SweetAlert2 para notificações e diálogos amigáveis.
Backend (Simulado/API): Estrutura preparada para consumo de APIs REST de monitoramento.

🚀 Como Executar

1. Configuração do Banco de Dados (MySQL)
  Para o monitoramento funcionar, o backend precisa de um banco de dados estruturado

2. Configuração de Conexão
  No seu código Java (ou arquivo application.properties), certifique-se de que os dados batem com o seu MySQL local:

URL: jdbc:mysql://localhost:3306/system_monitor
User: root
Pass: sua_senha_aqui

1. Clone o repositório
2. Prepare o Banco de Dados
3. Inicie o Backend (API):
Certifique-se de que a API Java/Spring está rodando na porta 8080.
O backend será o responsável por realizar os pings e atualizar o banco de dados.

4. Servidor Local Frontend (VS Code):

  Abra a pasta do projeto no VS Code.
Instale a extensão Live Server.
Clique em "Go Live" no canto inferior direito. Isso evita erros de CORS (bloqueio de segurança do navegador) ao tentar falar com a API.

5. Configuração de IP (Ajuste Final):

  Se o IP da sua API mudar, abra o arquivo script.js.
Use Ctrl + F e procure por http://localhost:8080.
Atualize para o novo endereço, se necessário.

