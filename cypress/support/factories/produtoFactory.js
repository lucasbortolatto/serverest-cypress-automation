import { faker } from '@faker-js/faker';

export function gerarProduto(sobrescrever = {}) {
  return {
    nome: `${faker.commerce.productName()} ${Date.now()}`,
    preco: faker.number.int({ min: 1, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 10, max: 100 }),
    ...sobrescrever,
  };
}
