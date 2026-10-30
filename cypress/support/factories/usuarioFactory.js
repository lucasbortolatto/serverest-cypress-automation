import { faker } from '@faker-js/faker';

export function gerarUsuario(sobrescrever = {}) {
  return {
    nome: faker.person.fullName(),
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6)}@teste.com`.toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    administrador: 'false',
    ...sobrescrever,
  };
}
