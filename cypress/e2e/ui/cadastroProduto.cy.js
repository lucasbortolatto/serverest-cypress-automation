import { gerarProduto } from '../../support/factories/produtoFactory';
import { gerarUsuario } from '../../support/factories/usuarioFactory';
import { cadastroProdutoPage } from '../../support/pages/cadastroProdutoPage';
import { listaProdutosPage } from '../../support/pages/listaProdutosPage';
import { loginService } from '../../support/services/loginService';
import { produtosService } from '../../support/services/produtosService';
import { usuariosService } from '../../support/services/usuariosService';

describe('UI - Cadastro de produto', () => {
  let admin;
  let produto;

  beforeEach(() => {
    admin = gerarUsuario({ administrador: 'true' });
    produto = gerarProduto();

    usuariosService.cadastrar(admin).then((resposta) => {
      expect(resposta.status).to.eq(201);
      admin._id = resposta.body._id;
    });
    cy.loginViaApi(admin.email, admin.password);
  });

  it('admin cadastra produto e ele aparece na lista de produtos', () => {
    cadastroProdutoPage.visitar();
    cadastroProdutoPage.cadastrar(produto);

    cy.location('pathname').should('eq', '/admin/listarprodutos');
    // Uma assertiva por coluna: se falhar, a mensagem diz qual valor veio errado
    listaProdutosPage
      .colunasDoProduto(produto.nome)
      .then(([nome, preco, descricao, quantidade]) => {
        expect(nome, 'nome').to.eq(produto.nome);
        expect(preco, 'preço').to.eq(String(produto.preco));
        expect(descricao, 'descrição').to.eq(produto.descricao);
        expect(quantidade, 'quantidade').to.eq(String(produto.quantidade));
      });
  });

  // O produto nasce pela tela, então o id vem da busca por nome
  afterEach(() => {
    loginService.autenticar(admin.email, admin.password).then(({ body: { authorization } }) => {
      produtosService.buscarPorNome(produto.nome).then((resposta) => {
        resposta.body.produtos.forEach(({ _id }) => produtosService.excluir(_id, authorization));
      });
    });
    cy.then(() => usuariosService.excluir(admin._id));
  });
});
