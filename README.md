# 🍔 Backend API - Ecommerce DevBurger

Este é o backend de uma aplicação construída com **Node.js** e **Express**, estruturado de forma modular para facilitar a manutenção e escalabilidade.  
A API inclui autenticação, gerenciamento de produtos (criar, deletar, atualizar), categorias, usuários (Login e Cadastro) e integração com Stripe para pagamentos.

---

## 📁 Estrutura do Projeto

📂 src  
┣ 📂 config  
┣ 📂 controllers  
┣ 📂 middlewares  
┣ 📂 models  
┣ 📂 routes  
┣ 📂 services  
┣ 📂 database  
┣ 📄 server.js  
┣ 📄 app.js  
...

---

## 🚀 Funcionalidades

- Autenticação com JWT  
- CRUD de usuários, produtos e categorias  
- Validação de dados (schemas)  
- Upload de arquivos  
- Integração com Stripe (pagamentos)  
- Banco de dados PostgreSQL via Docker  
- Banco MongoDB para registro de pedidos  
- Separação clara entre rotas, lógica de negócio e modelos  

---

## 🧪 Tecnologias Utilizadas

- Node.js  
- Express  
- Sequelize (PostgreSQL)  
- Docker  
- PostgreSQL  
- MongoDB (usando MongoDB Compass para visualização)  
- JWT (Json Web Token)  
- Bcrypt  
- Multer (upload de arquivos)  
- Stripe API  
- Yup ou Joi (validação)

---

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-user/devburger.git
cd devburger
```

### 2️⃣ Instale as dependências

```bash
docker run --name devburger-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```
### 3️⃣ Configure o banco de dados PostgreSQL via Docker

📌 Esse comando cria e inicia um container com o nome devburger-postgres, senha mysecretpassword e porta 5432.
Para rodar o container PostgreSQL:
```bash
docker run --name devburger-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

Para iniciar o container caso ele esteja parado:
```bash
docker start devburger-postgres
```
ou

acesse o Docker desktop
e inicie

### 4️⃣ Configure o MongoDB Compass

- Baixe e instale o MongoDB Compass
- Abra o Compass e conecte na URL padrão:

```bash
mongodb://localhost:27017
```
- Crie um banco chamado devburger
- Dentro dele, crie a coleção pedidos

### 5️⃣ Configuração do Stripe

No arquivo .env:

```bash
STRIPE_SECRET_KEY=sua_chave_da_stripe
```


### 6️⃣ Configure o arquivo auth.js

No diretório src/config, crie o arquivo auth.js:

```bash
export default {
  secret: 'sua_chave_secreta_para_token',
  expiresIn: '5d',
};

```

### 7️⃣ Inicie o projeto
```bash
npm run dev
```
ou

```bash
yarn dev
```


#### 📌 Observações

- Certifique-se que o container do PostgreSQL esteja rodando antes de iniciar a API.

- Para visualização e manipulação dos pedidos, utilize o MongoDB Compass conectado no localhost:27017.

- Não esqueça de ajustar suas variáveis de ambiente no .env com as credenciais corretas.


### 📄 Licença
Projeto desenvolvido para fins de estudo.


