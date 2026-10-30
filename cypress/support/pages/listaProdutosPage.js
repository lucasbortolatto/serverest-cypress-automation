export const listaProdutosPage = {
  // A tabela não tem data-testid: a linha é localizada pelo nome único, nunca pela posição.
  // Devolve o texto das colunas Nome, Preço, Descrição e Quantidade.
  colunasDoProduto(nome) {
    return cy
      .contains('tr', nome)
      .find('td')
      .then((celulas) => [...celulas].slice(0, 4).map((celula) => celula.innerText.trim()));
  },
};
