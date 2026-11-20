# API de Gerenciamento de Usuários e Produtos

Backend desenvolvido com **Node.js** e **Express.js**, com persistência de dados em **MySQL** por meio do **Sequelize**. O projeto organiza as responsabilidades em camadas e disponibiliza operações CRUD para usuários, produtos e categorias, além de autenticação com JWT.

A API também conta com documentação interativa utilizando **Swagger (OpenAPI)** e testes automatizados com **Jest**, facilitando a consulta dos endpoints e a validação das funcionalidades implementadas.

**Objetivo:** oferecer uma API REST para gerenciar usuários, produtos e categorias, mantendo o código organizado, seguro e preparado para testes.

## Tecnologias e bibliotecas

| Tecnologia | Utilização |
| --- | --- |
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript no servidor. |
| [Express.js](https://expressjs.com/) | Criação do servidor HTTP e gerenciamento das rotas da API. |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Carregamento das configurações e variáveis de ambiente. |
| [Nodemon](https://www.npmjs.com/package/nodemon) | Reinicialização automática do servidor durante o desenvolvimento. |
| [MySQL](https://www.mysql.com/) | Banco de dados relacional utilizado para persistência das informações. |
| [Sequelize](https://sequelize.org/) | ORM para modelagem, consultas e relacionamentos entre tabelas. |
| [JSON Web Token (JWT)](https://jwt.io/) | Autenticação e proteção de rotas privadas. |
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | Criptografia das senhas dos usuários. |
| [Jest](https://jestjs.io/) | Execução de testes automatizados. |
| [Swagger JSDoc](https://www.npmjs.com/package/swagger-jsdoc) | Geração da documentação OpenAPI a partir de comentários no código. |
| [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) | Disponibilização da documentação interativa da API. |

## Funcionalidades

- CRUD de usuários: criação, consulta, atualização e exclusão.
- CRUD de produtos: criação, consulta, atualização e exclusão.
- CRUD de categorias: criação, consulta, atualização e exclusão.
- Autenticação baseada em JWT.
- Middleware para validação do token e proteção das rotas privadas.
- Criptografia de senhas utilizando Bcrypt.
- Persistência de dados em MySQL com Sequelize.
- Relacionamento entre produtos, categorias, imagens e opções.
- Documentação interativa dos endpoints utilizando Swagger.
- Testes automatizados de autenticação e operações CRUD utilizando Jest.

## Documentação da API — Swagger

O projeto utiliza Swagger para documentar os endpoints da API seguindo o padrão OpenAPI.

Com o servidor em execução, acesse:

**http://localhost:3000/api-docs**

A interface permite visualizar os endpoints, consultar parâmetros, verificar os formatos das requisições e respostas e realizar chamadas diretamente pelo navegador.

### Autenticação no Swagger

As rotas privadas utilizam autenticação JWT.

Para testar essas operações:

1. Acesse a documentação Swagger.
2. Localize a rota de autenticação `POST /v1/user/token`.
3. Informe as credenciais de um usuário cadastrado.
4. Copie o token retornado pela API.
5. Clique em **Authorize** na interface do Swagger.
6. Informe o token no campo de autenticação, conforme o formato solicitado pela interface.
7. Execute as operações privadas.

O esquema de segurança utiliza autenticação do tipo **Bearer Token**.

### Endpoints disponíveis

| Método | Endpoint | Descrição | Acesso |
| --- | --- | --- | --- |
| POST | `/v1/user/token` | Autenticação e geração do token JWT. | Público |
| GET | `/v1/user/` | Consulta todos os usuários. | Público |
| GET | `/v1/user/{id}` | Consulta usuário por ID. | Público |
| POST | `/v1/users` | Cadastra um usuário. | Privado |
| PUT | `/v1/users/{id}` | Atualiza um usuário. | Privado |
| DELETE | `/v1/users/{id}` | Exclui um usuário. | Privado |
| GET | `/v1/category/search` | Consulta categorias. | Público |
| GET | `/v1/category/{id}` | Consulta categoria por ID. | Público |
| POST | `/v1/category` | Cadastra uma categoria. | Privado |
| PUT | `/v1/category/{id}` | Atualiza uma categoria. | Privado |
| DELETE | `/v1/category/{id}` | Exclui uma categoria. | Privado |
| GET | `/v1/product/search` | Consulta produtos. | Público |
| GET | `/v1/product/{id}` | Consulta produto por ID. | Público |
| POST | `/v1/product` | Cadastra um produto. | Privado |
| PUT | `/v1/product/{id}` | Atualiza um produto. | Privado |
| DELETE | `/v1/product/{id}` | Exclui um produto. | Privado |

## Estrutura do projeto

```text
project-root/
├── src/
│   ├── config/
│   │   ├── database.js       # Configuração da conexão com MySQL
│   │   └── swagger.js        # Configuração da documentação Swagger
│   ├── controllers/          # Tratamento das requisições e respostas
│   ├── middleware/           # Middlewares de autenticação e validação
│   ├── models/               # Modelos Sequelize e relacionamentos
│   ├── routes/               # Definição dos endpoints da API
│   ├── services/             # Regras de negócio da aplicação
│   ├── app.js                # Configuração da aplicação Express
│   └── server.js             # Inicialização do servidor
├── tests/
│   ├── helpers/
│   │   └── api.js            # Funções auxiliares para os testes
│   ├── auth.test.js          # Testes de autenticação
│   ├── user/
│   │   └── User.test.js      # Testes de usuários
│   ├── product/
│   │   └── Product.test.js   # Testes de produtos
│   └── category/
│       └── Category.test.js  # Testes de categorias
├── .env                      # Variáveis de ambiente (não versionar)
├── .gitignore
└── package.json
```

## Organização em camadas

- **Routes:** definem os endpoints e direcionam as requisições para os controllers.
- **Controllers:** recebem as requisições, acionam os serviços necessários e retornam as respostas HTTP.
- **Services:** concentram as regras de negócio e a lógica das operações.
- **Models:** representam as tabelas e os relacionamentos do banco de dados por meio do Sequelize.
- **Middleware:** executam validações intermediárias, como a verificação do JWT.
- **Config:** reúne as configurações necessárias para a aplicação, conexão com o banco e documentação Swagger.
- **Tests:** concentram os testes automatizados responsáveis por verificar o funcionamento das funcionalidades da API.

## Modelagem de dados

O banco de dados possui as seguintes entidades principais:

| Tabela | Finalidade |
| --- | --- |
| `Users` | Armazena os dados dos usuários do sistema. |
| `Products` | Armazena as informações dos produtos. |
| `Categories` | Armazena as categorias disponíveis. |
| `ProductImage` | Armazena imagens associadas aos produtos. |
| `ProductOption` | Armazena opções ou variações relacionadas aos produtos. |
| `ProductCategory` | Tabela de associação entre produtos e categorias. |

A tabela `ProductCategory` permite associar produtos a categorias. As demais associações e cardinalidades seguem os relacionamentos definidos nos models do projeto.

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- [Node.js](https://nodejs.org/) e npm.
- [MySQL](https://www.mysql.com/) em execução.
- Um cliente ou ferramenta de administração do MySQL, caso deseje gerenciar o banco visualmente.

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acesse a pasta do projeto

```bash
cd <PASTA_DO_PROJETO>
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Crie o banco de dados

Crie o banco de dados MySQL que será utilizado pela aplicação.

### 5. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:

```env
PORT=3000

BD_HOST=localhost
BD_PORT=3306
BD_NAME=nome_do_banco
BD_USER=seu_usuario
BD_PASSWORD=sua_senha

APP_KEY_TOKEN=sua_chave_secreta_forte
```

**Importante:** os nomes das variáveis devem corresponder aos utilizados nos arquivos de configuração da aplicação. Nunca compartilhe credenciais reais ou chaves secretas.

### 6. Inicie o servidor

```bash
npm start
```

O Nodemon iniciará a aplicação e reiniciará o servidor automaticamente durante o desenvolvimento.

Após a inicialização, a API estará disponível em:

```text
http://localhost:3000
```

A documentação Swagger estará disponível em:

```text
http://localhost:3000/api-docs
```

## Testes automatizados

O projeto utiliza **Jest** para executar testes automatizados e verificar o funcionamento das principais funcionalidades da API.

Os testes estão organizados por funcionalidade:

| Arquivo | Testes realizados |
| --- | --- |
| `auth.test.js` | Verifica a autenticação e o retorno do token JWT. |
| `User.test.js` | Verifica a listagem, cadastro, atualização e exclusão de usuários. |
| `Product.test.js` | Verifica a listagem, cadastro, atualização e exclusão de produtos. |
| `Category.test.js` | Verifica a listagem, cadastro, atualização e exclusão de categorias. |

### Executando os testes

Antes de executar os testes, certifique-se de que:

- O MySQL esteja em execução.
- O banco de dados esteja configurado.
- O servidor da API esteja iniciado.
- Exista um usuário válido para autenticação, conforme as credenciais configuradas no arquivo auxiliar `tests/helpers/api.js`.

Em um terminal, inicie o servidor:

```bash
npm start
```

Em outro terminal, execute:

```bash
npm test
```

Para executar os testes sequencialmente, evitando execuções paralelas:

```bash
npm test -- --runInBand
```

**Observação:** os testes de CRUD realizam operações reais no banco de dados, criando, atualizando e excluindo registros. Por isso, recomenda-se utilizar um banco de desenvolvimento ou teste, nunca o banco de produção.

## Segurança e boas práticas

- Mantenha o arquivo `.env` fora do controle de versão.
- Utilize uma chave JWT forte e mantenha-a em uma variável de ambiente.
- Armazene senhas utilizando hash com Bcrypt.
- Não exponha credenciais, tokens ou senhas em respostas ou logs.
- Proteja as rotas privadas com middleware de autenticação.
- Valide os dados recebidos pela API antes de persistir as informações.
- Utilize testes automatizados para verificar alterações e evitar regressões.

## Melhorias futuras

- Ampliação da cobertura de testes automatizados.
- Validação padronizada dos dados de entrada.
- Padronização do tratamento de erros e das respostas HTTP.
- Implementação de paginação e filtros nas consultas de produtos e categorias.
- Evolução da documentação Swagger com exemplos detalhados de requisições e respostas.
- Implementação de testes isolados com banco de dados específico para testes.

---

Desenvolvido como projeto de estudo e prática de desenvolvimento backend com Node.js, Express.js, MySQL e Sequelize.