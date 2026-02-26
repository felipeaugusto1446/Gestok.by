# Gestok.by --- API de Controle de Estoque

API REST em **Node.js + TypeScript + Express** para controle de estoque
do sistema **Gestok.by** (cadastro de usuários, categorias, produtos e
lotes, com autenticação JWT e documentação Swagger).

> Documentação (Swagger UI): `http://localhost:3333/api-docs`

------------------------------------------------------------------------

## ✅ Funcionalidades

-   Autenticação via **JWT**
-   CRUD de:
    -   Usuários
    -   Categorias
    -   Produtos (com upload de imagem)
    -   Lotes (batch) com:
        -   validade
        -   quantidade
        -   parâmetros para notificação (quantidade/expiração)
-   Endpoint de **notificações** (ex.: lotes próximos da validade /
    baixa quantidade)

------------------------------------------------------------------------

## 🧰 Tecnologias

-   Node.js
-   TypeScript
-   Express
-   Prisma ORM
-   SQLite (via Prisma)
-   Multer (upload)
-   JWT (jsonwebtoken)
-   Swagger (swagger-ui-express + swagger-jsdoc)

------------------------------------------------------------------------

## 📦 Pré-requisitos

-   Node.js (recomendado: 16+)
-   npm

------------------------------------------------------------------------

## 🚀 Como rodar o projeto

### 1) Clone o repositório

``` bash
git clone https://github.com/felipeaugusto1446/Gestok.by.git
cd Gestok.by
```

### 2) Instale as dependências

``` bash
npm install
```

### 3) Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

``` env
DATABASE_URL="file:./dev.db"
JWT_SECRET="uma_senha_forte_aqui"
```

------------------------------------------------------------------------

## 🗄️ Banco de Dados (Prisma)

Gere o client do Prisma:

``` bash
npx prisma generate
```

Crie/aplique as migrations:

``` bash
npx prisma migrate dev --name init
```

------------------------------------------------------------------------

## ▶️ Rodar a API

``` bash
npm run dev
```

Servidor disponível em: - API: `http://localhost:3333` - Swagger:
`http://localhost:3333/api-docs`

------------------------------------------------------------------------

## 🔐 Autenticação

A maioria das rotas exige header:

    Authorization: Bearer SEU_TOKEN

Token obtido em: - `POST /v1/session`

------------------------------------------------------------------------

## 🧭 Rotas (resumo)

Base prefix: `/v1`

### Health/Test

-   `GET /v1/test`

### Usuário

-   `POST /v1/user`
-   `POST /v1/session`
-   `GET /v1/me`
-   `PUT /v1/user/edit`
-   `DELETE /v1/user/remove`

### Categoria

-   `POST /v1/category`
-   `GET /v1/category/all`
-   `PUT /v1/category/edit`
-   `DELETE /v1/category/remove`

### Produto

-   `POST /v1/product` (multipart/form-data, campo: file)
-   `GET /v1/product/all`
-   `PUT /v1/product/edit`
-   `DELETE /v1/product/remove`

### Lotes (Batch)

-   `POST /v1/batch`
-   `PUT /v1/batch/edit`
-   `DELETE /v1/batch/remove`

### Notificações

-   `GET /v1/notifications`

------------------------------------------------------------------------

## 🖼️ Upload de imagens

Uploads são salvos em `./tmp` e o nome do arquivo é randomizado.

------------------------------------------------------------------------

## 📄 Licença

Projeto para fins de estudo/capacitação.
