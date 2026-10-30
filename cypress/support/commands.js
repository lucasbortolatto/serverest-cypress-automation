import { loginService } from './services/loginService';
import { usuariosService } from './services/usuariosService';

Cypress.Commands.add('cadastrarUsuarioViaApi', (usuario) => {
  usuariosService.cadastrar(usuario).then((resposta) => {
    expect(resposta.status).to.eq(201);
    usuario._id = resposta.body._id;
  });
});

// O front só precisa do token no localStorage para considerar o usuário logado
Cypress.Commands.add('loginViaApi', (email, password) => {
  loginService.autenticar(email, password).then((resposta) => {
    expect(resposta.status).to.eq(200);
    window.localStorage.setItem('serverest/userToken', resposta.body.authorization);
  });
});
