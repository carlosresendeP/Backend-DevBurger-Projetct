# 🛠️ Backend API - Ecommerce DevBurger

Este é o backend de uma aplicação construída com **Node.js** e **Express**, estruturado de forma modular para facilitar a manutenção e escalabilidade. 
A API inclui autenticação, gerenciamento de produtos ( criar, deletar, atualizar), categorias, usuários(Login e Cadastro) e integração com Stripe para pagamentos.

---

## 📁 Estrutura do Projeto


---

## 🚀 Funcionalidades

- Autenticação com JWT
- CRUD de usuários, produtos e categorias
- Validação de dados (schemas)
- Upload de arquivos
- Integração com Stripe (pagamentos)
- Separação clara entre rotas, lógica de negócio e modelos

---

## 🧪 Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (dependendo do seu ORM/ODM)
- Docker
- Postgres (banco de dados)
- MongoDb (banco para os pedidos)
- JWT (Json Web Token)
- Bcrypt
- Multer (upload de arquivos)
- Stripe API
- Yup ou Joi (validação)

---

## ⚙️ Como Rodar o Projeto

1. **Clone o repositório**


---

## Instale as dependências

npm install


## env

PORT=3333
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta


npm run dev
# ou
yarn dev





