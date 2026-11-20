# API de Gerenciamento de Usuários e Produtos

Backend desenvolvido com **Node.js** e **Express.js**, com persistência de dados em **MySQL** por meio do **Sequelize**. O projeto organiza as responsabilidades em camadas e disponibiliza operações CRUD para usuários, produtos e categorias, além de utilizar autenticação com JWT.

> **Objetivo:** oferecer uma API REST para gerenciar usuários, produtos e categorias, mantendo o código organizado, seguro e preparado para testes.

## Tecnologias e bibliotecas

| Tecnologia | Utilização |
| --- | --- |
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript no servidor. |
| [Express.js](https://expressjs.com/) | Criação do servidor HTTP e das rotas da API. |
| [Dotenv](https://www.npmjs.com/package/dotenv) | Carregamento de configurações e variáveis de ambiente a partir do arquivo `.env`. |
| [Nodemon](https://www.npmjs.com/package/nodemon) | Reinicialização automática do servidor durante o desenvolvimento. |
| [MySQL](https://www.mysql.com/) | Banco de dados relacional utilizado para persistência das informações. |
| [Sequelize](https://sequelize.org/) | ORM para modelagem, consultas e relacionamento entre as tabelas. |
| [JSON Web Token (JWT)](https://jwt.io/) | Autenticação e proteção de rotas que exigem acesso autorizado. |
| [Jest](https://jestjs.io/) | Execução de testes automatizados. |

## Funcionalidades

- CRUD de usuários: criação, consulta, atualização e exclusão.
- CRUD de produtos: criação, consulta, atualização e exclusão.
- CRUD de categorias: criação, consulta, atualização e exclusão.
- Autenticação baseada em JWT.
- Middleware para validar o token e restringir o acesso às rotas protegidas.
- Persistência de dados em MySQL com Sequelize.
- Estrutura preparada para testes automatizados com Jest.

## Estrutura do projeto

```text
project-root/
├── src/
│   ├── config/        # Configurações da aplicação e conexão com o banco
│   ├── controllers/   # Tratamento das requisições e respostas
│   ├── middleware/   # Middlewares, incluindo validação de autenticação
│   ├── models/        # Modelos Sequelize e definição das entidades
│   ├── routes/        # Definição dos endpoints da API
│   ├── services/      # Regras de negócio e operações da aplicação
│   ├── app.js         # Configuração da aplicação Express
│   └── server.js      # Inicialização do servidor
├── tests/             # Testes automatizados
├── .env               # Variáveis de ambiente (não versionar)
├── .gitignore
└── package.json
```

### Organização em camadas

- **Routes:** definem os endpoints e direcionam as requisições para os controllers.
- **Controllers:** recebem as requisições, acionam os serviços necessários e retornam as respostas HTTP.
- **Services:** concentram as regras de negócio e a lógica das operações.
- **Models:** representam as tabelas e os relacionamentos do banco de dados por meio do Sequelize.
- **Middleware:** executam validações intermediárias, como a verificação do JWT.
- **Config:** reúne as configurações necessárias para a aplicação e para a conexão com o banco.

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

A tabela `ProductCategory` permite associar produtos a categorias. As demais associações e cardinalidades devem seguir os relacionamentos definidos nos models do projeto.

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- [Node.js](https://nodejs.org/) e npm.
- [MySQL](https://www.mysql.com/) em execução.
- Um cliente ou ferramenta de administração do MySQL, se desejar gerenciar o banco visualmente.

## Como executar o projeto

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Acesse a pasta do projeto:**

   ```bash
   cd <PASTA_DO_PROJETO>
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   ```

4. **Crie o banco de dados MySQL** que será utilizado pela aplicação.

5. **Configure as variáveis de ambiente.** Crie um arquivo `.env` na raiz do projeto. Exemplo de referência:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=nome_do_banco
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET= substitua_por_uma_chave_secreta_forte
   ```

   Os nomes das variáveis devem corresponder aos utilizados nos arquivos de configuração da aplicação. Não compartilhe valores reais de credenciais ou segredos.

6. **Inicie a aplicação** utilizando o script correspondente definido no `package.json`. Em projetos configurados com Nodemon e Node.js, os comandos mais comuns são:

   ```bash
   npm run dev
   ```

   Para iniciar em modo de execução normal, o script costuma ser:

   ```bash
   npm start
   ```

   > Os comandos `dev` e `start` dependem dos scripts cadastrados no `package.json`.

## Testes

Os testes automatizados podem ser executados com Jest. Caso o script `test` esteja configurado no `package.json`, execute:

```bash
npm test
```

A existência e a quantidade de testes dependem dos arquivos implementados na pasta `tests/`.

## Segurança e boas práticas

- Mantenha o arquivo `.env` fora do controle de versão.
- Utilize uma chave JWT forte e mantenha-a em uma variável de ambiente.
- Não envie credenciais, tokens ou senhas em respostas ou logs.
- Proteja as rotas privadas com o middleware de autenticação.
- Valide os dados recebidos pela API antes de persistir as informações.

## Melhorias futuras

- Documentação dos endpoints com Swagger/OpenAPI.
- Validação padronizada dos dados de entrada.
- Padronização do tratamento de erros e das respostas HTTP.
- Ampliação da cobertura de testes automatizados.
- Implementação de paginação e filtros nas consultas de produtos e categorias.

---

Desenvolvido como projeto de estudo e prática de desenvolvimento backend com Node.js, Express.js, MySQL e Sequelize.
