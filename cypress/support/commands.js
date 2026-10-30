import { loginService } from './services/loginService';

// Monta a sessão sem passar pela tela de login: o front só precisa do token no localStorage.
// O login pela tela é testado uma vez, no cenário de cadastro de usuário.
Cypress.Commands.add('loginViaApi', (email, password) => {
  loginService.autenticar(email, password).then((resposta) => {
    expect(resposta.status).to.eq(200);
    window.localStorage.setItem('serverest/userToken', resposta.body.authorization);
  });
});
