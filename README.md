# ServeRest - Automação com Cypress

Testes automatizados do [ServeRest](https://serverest.dev/): 3 cenários E2E no [front](https://front.serverest.dev/) e 3 cenários na API.

## Tecnologias

- [Cypress 16](https://www.cypress.io/) para os testes de UI e de API
- [Faker](https://fakerjs.dev/) para gerar massa de dados única a cada execução
- [ESLint](https://eslint.org/) com [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) e [Prettier](https://prettier.io/) para padronizar o código

## Pré-requisitos

- Node.js 22, 24 ou 26+, as versões suportadas pelo Cypress 16. O `.nvmrc` usa o 24.

Com o [nvm](https://github.com/nvm-sh/nvm), basta rodar `nvm use` na pasta do projeto.

## Instalação

```bash
npm ci
```

## Execução

| Comando                | O que faz                                        |
| ---------------------- | ------------------------------------------------ |
| `npm test`             | Roda todos os testes (API e UI) em modo headless |
| `npm run test:api`     | Roda só os testes de API                         |
| `npm run test:ui`      | Roda só os testes de UI                          |
| `npm run cy:open`      | Abre a interface do Cypress                      |
| `npm run lint`         | Verifica o código com o ESLint                   |
| `npm run format:check` | Verifica a formatação com o Prettier             |

Os testes rodam contra os ambientes públicos do ServeRest, então não é preciso subir nada localmente.

## Estrutura

```
cypress/
├── e2e/
│   ├── api/            # cenários de API
│   └── ui/             # cenários E2E
└── support/
    ├── commands.js     # custom commands (cadastro e login via API)
    ├── factories/      # geração de dados com Faker
    ├── pages/          # Page Objects
    └── services/       # chamadas à API, uma por recurso
```

## Cenários

Cenários escolhidos pelo risco: o que mais prejudicaria o negócio se quebrasse, sem repetir a mesma regra entre API e UI.

### API

| Cenário                                                              | Por que                                                                                                                     |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Não permite cadastrar usuário com e-mail já utilizado                | O e-mail é o identificador do login. Duplicado, dois usuários disputariam a mesma conta.                                    |
| Não permite que usuário comum cadastre produto                       | Regra de permissão. Além do `403`, o teste confere que o produto **não foi gravado**, que seria a falha mais grave.         |
| Reserva o estoque ao criar o carrinho e devolve ao cancelar a compra | Regra de negócio que envolve dois recursos (carrinho e produto). Um erro aqui faz vender o que não tem ou "perder" estoque. |

### UI

| Cenário                                                            | Por que                                                                                                   |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Novo usuário se cadastra, sai e entra novamente pela tela de login | Jornada de entrada na loja. É o único teste que passa pela tela de login; os outros fazem login pela API. |
| Adiciona um produto à lista de compras                             | Fluxo principal do cliente. Produto e login são preparados pela API para o teste focar só na lista.       |
| Admin cadastra produto e ele aparece na lista de produtos          | Fluxo principal do administrador. O produto é localizado na tabela pelo nome, e cada coluna é conferida.  |

## Decisões

- **Service Objects para a API**: cada recurso tem um arquivo em `services/` que só faz a requisição e devolve a resposta. As assertivas ficam no teste, e o `failOnStatusCode: false` permite verificar respostas de erro.
- **Page Objects para a UI**: os seletores de cada tela ficam em um só lugar. Se o front mudar um `data-testid`, só um arquivo muda.
- **Custom commands só para setup**: `cy.cadastrarUsuarioViaApi` e `cy.loginViaApi` preparam o cenário e já conferem que deu certo. A ação testada usa o service direto.
- **Login via API nos testes de UI**: o front considera o usuário logado com o token no `localStorage`. Isso evita repetir a tela de login, que já é testada no cenário de cadastro.
- **Dados únicos a cada teste**: o ambiente é público e compartilhado, então nenhum teste depende de dado pré-existente. Os dados criados são excluídos no `afterEach`, mas nenhum teste depende dessa limpeza.
- **Seletores `data-testid`**: a regra `require-data-selectors` do ESLint impede `cy.get` com classe ou tag. A tabela de produtos do admin não tem `data-testid`, então a linha é localizada pelo nome único do produto.

## Observações sobre a aplicação

Durante a exploração foram encontrados alguns pontos que não estão cobertos pelos testes, mas valem registro:

- **E-mail duplicado com letras maiúsculas é aceito**: `teste@email.com` e `TESTE@email.com` viram dois usuários diferentes. Provável bug, já que e-mail não diferencia maiúsculas.
- **Nome de produto também diferencia maiúsculas**: "Mouse" e "mouse" podem coexistir. Não está na documentação, então é mais uma lacuna de requisito.
- **Senha exposta**: `GET /usuarios/{id}` devolve a senha em texto puro, e o front guarda a senha no `localStorage` (`serverest/userPassword`).
- **Rotas sem autenticação**: nenhum `GET` exige token, e criar, editar e excluir usuário também não.
- **Campo de imagem**: tem asterisco de obrigatório no cadastro de produto, mas não é obrigatório.
- **Lista de compras**: só existe no navegador (`localStorage`), sem nenhuma chamada à API.
- **Lista de produtos do admin**: não tem paginação nem ordenação por data de cadastro.
- **`data-testid` inconsistentes**: `cadastarProdutos` (erro de digitação) e `adicionar carrinho` (com espaço).

## Próximos passos

Casos que eu automatizaria na sequência:

- E-mail com letras maiúsculas deveria retornar `400` (hoje passa, ver observações)
- Cadastro de produto sem token deve retornar `401`
- Login com senha inválida
- Campos obrigatórios no cadastro de usuário e de produto
- Edição e exclusão de produto pela tela do admin
- Concluir compra e conferir que o estoque não volta
- Validação de contrato com JSON Schema nas respostas da API
- Pipeline no GitHub Actions rodando lint e testes a cada push
