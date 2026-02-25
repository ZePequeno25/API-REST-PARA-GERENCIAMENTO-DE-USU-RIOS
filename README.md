# PROJETO - API REST PARA GERENCIAMENTO DE USUÁRIOS

## Descrição

Desenvolver uma API REST monolítica para gerenciamento de usuários utilizando **Node.js**, **Express** e **SQLite**.

A aplicação deve rodar localmente e permitir operações completas de **CRUD**.

## Tecnologias Obrigatórias

- Node.js (versão LTS)
- Express
- SQLite3
- Thunder Client (para testes)

**Observação importante**:  
Não utilizar ORM ou qualquer framework de abstração de banco de dados. O acesso ao banco deve ser feito **diretamente** com o pacote `sqlite3`.

## O Que Deve Ser Construído

A API deve conter os seguintes endpoints:

| Método   | Endpoint          | Descrição                                      |
|----------|-------------------|------------------------------------------------|
| POST     | `/users`          | Cria um novo usuário                           |
| GET      | `/users`          | Lista todos os usuários                        |
| GET      | `/users/:id`      | Busca um usuário específico pelo ID            |
| PUT      | `/users/:id`      | Atualiza nome e status do usuário              |
| DELETE   | `/users/:id`      | **Soft delete**: altera status para "inativo" (não remove o registro fisicamente) |

## Modelagem do Banco de Dados

- Nome do banco: `database.sqlite` (arquivo local na raiz do projeto)
- Tabela: `usuarios`

| Campo       | Tipo      | Restrição                          |
|-------------|-----------|------------------------------------|
| id          | INTEGER   | PRIMARY KEY, AUTOINCREMENT         |
| nome        | TEXT      | NOT NULL                           |
| email       | TEXT      | NOT NULL, UNIQUE                   |
| status      | TEXT      | NOT NULL, DEFAULT 'ativo'          |
| created_at  | DATETIME  | DEFAULT CURRENT_TIMESTAMP          |

## Estrutura Obrigatória de Pastas