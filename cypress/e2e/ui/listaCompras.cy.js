import { gerarProduto } from '../../support/factories/produtoFactory';
import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { homePage } from '../../support/pages/homePage';
import { listaComprasPage } from '../../support/pages/listaComprasPage';
import { loginService } from '../../support/services/loginService';
import { produtosService } from '../../support/services/produtosService';
import { usuariosService } from '../../support/services/usuariosService';

describe('UI - Lista de compras', () => {
  let admin;
  let tokenAdmin;
  let produto;
  let cliente;

  beforeEach(() => {
    admin = gerarUsuario({ administrador: 'true' });
    produto = gerarProduto();
    cliente = gerarUsuario();

    cy.cadastrarUsuarioViaApi(admin);
    loginService.autenticar(admin.email, admin.password).then((resposta) => {
      expect(resposta.status).to.eq(200);
      tokenAdmin = resposta.body.authorization;
    });
    cy.then(() => produtosService.cadastrar(produto, tokenAdmin)).then((resposta) => {
      expect(resposta.status).to.eq(201);
      produto._id = resposta.body._id;
    });

    cy.cadastrarUsuarioViaApi(cliente);
    cy.loginViaApi(cliente.email, cliente.password);
  });

  it('adiciona um produto à lista de compras', () => {
    homePage.visitar();
    homePage.pesquisar(produto.nome);
    homePage.adicionarNaLista();

    cy.location('pathname').should('eq', '/minhaListaDeProdutos');
    listaComprasPage.nomeDoProduto().should('have.text', `Produto:${produto.nome}`);
    listaComprasPage.quantidadeDoProduto().should('have.text', 'Total: 1');
  });

  afterEach(() => {
    produtosService.excluir(produto._id, tokenAdmin);
    usuariosService.excluir(cliente._id);
    usuariosService.excluir(admin._id);
  });
});
