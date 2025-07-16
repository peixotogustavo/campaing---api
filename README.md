# 📊 Campanha Manager

Sistema completo de gestão de campanhas com autenticação e controle de permissões.

## 🚀 Descrição

Este projeto é uma aplicação web para gerenciamento de campanhas de marketing com funcionalidades de:

- Autenticação com JWT
- Controle de acesso baseado em papéis (admin/editor)
- Cadastro de campanhas e influenciadores
- Relacionamento entre campanhas e influenciadores

### 🛠️ Tecnologias utilizadas

- **Backend:** NestJS + MongoDB
- **Frontend:** React + Vite

## 📁 Estrutura do projeto

```
campaing-api/
├── backend/       -> API NestJS
├── frontend/      -> Interface React
└── README.md
```

## 🔐 Funcionalidades

- Login com token JWT
- Proteção de rotas e endpoints por nível de permissão
- CRUD de campanhas:
  - `admin`: total (incluindo DELETE)
  - `editor`: criar, editar e visualizar
- CRUD de influenciadores
- Associação de influenciadores às campanhas

## 🧑‍💻 Como rodar localmente

### Pré-requisitos

- Node.js
- MongoDB
- npm ou yarn

### 1. Clonar o repositório

```bash
git clone https://github.com/peixotogustavo/campaing-api.git
cd campaing-api
```

### 2. Iniciar o backend

```bash

npm install
npm run start:dev
```

> O MongoDB deve estar rodando na porta padrão 27017.

### 3. Iniciar o frontend

```bash
cd ../frontend
npm install
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 🔑 Logins de exemplo

| Usuário | Senha     | Papel   |
|--------|-----------|---------|
| admin  | 123  | admin   |
| editor | 456  | editor  |

## 📬 Principais endpoints da API

- **POST** `/auth/login`
- **GET** `/campaings`
- **POST** `/campaings`
- **PUT** `/campaings/:id`
- **DELETE** `/campaings/:id`
- **GET** `/influencers`

## 📄 Licença

Projeto demonstrativo para fins de estudo.
