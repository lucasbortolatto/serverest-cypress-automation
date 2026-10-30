export const listaProdutosPage = {
  // A tabela não tem data-testid, então a linha é achada pelo nome
  colunasDoProduto(nome) {
    return cy
      .contains('tr', nome)
      .find('td')
      .then((celulas) => [...celulas].slice(0, 4).map((celula) => celula.innerText.trim()));
  },
};
