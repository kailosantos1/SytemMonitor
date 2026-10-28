# Segurança e autenticação

## Comportamento confirmado

- [`SecurityConfig.java`](../../../src/main/java/com/systemup/monitor/SecurityConfig.java) define um `BCryptPasswordEncoder`.
- A mesma classe desativa CSRF e configura `.anyRequest().permitAll()`.
- [`UsuarioController.java`](../../../src/main/java/com/systemup/monitor/UsuarioController.java) restringe o sufixo de email no cadastro e guarda senha codificada com BCrypt. No login, compara a senha com o hash existente.
- [`Usuario.java`](../../../src/main/java/com/systemup/monitor/Usuario.java) marca email como único no modelo JPA.
- Os controladores declaram `@CrossOrigin("*")`.
- No navegador, o frontend guarda o email em `localStorage` e usa sua presença para decidir se redireciona o dashboard para o login.

## Consequência funcional

O valor em `localStorage` é apenas um controle de navegação no cliente. Não é uma credencial verificada pelo backend e não protege os endpoints: a configuração permite todas as requisições e o frontend pode ser contornado. A tela de login verifica credenciais, mas o código não cria uma sessão nem associa a autenticação subsequente à chamada REST.

Assim, não se deve interpretar a tela de login como uma fronteira de segurança para a API. A configuração observada também desativa proteção CSRF e admite origem cruzada ampla.

## Limite da documentação

Esta nota registra o estado do código para orientar avaliação e operação; não representa uma aprovação para implantação exposta à internet. Política de autenticação/autorização, origens permitidas, transporte seguro e proteção de dados em produção precisam de decisão e validação próprias.

Ver também [[08 - Pendencias/Pontos a confirmar|pontos de atenção]], [[03 - Fluxos/Cadastro e login|fluxo de acesso]] e [[02 - Modulos/Backend API|backend]].

Voltar para [[02 - Modulos/Indice|índice de módulos]].
