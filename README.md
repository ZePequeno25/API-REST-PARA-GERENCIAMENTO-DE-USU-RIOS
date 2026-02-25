# PROJETO - API REST PARA GERENCIAMENTO DE USUÁRIOS

## Descrição

Desenvolver uma API REST monolítica para gerenciamento de usuários utilizando **Node.js**, **Express** e **SQLite**.

A aplicação deve rodar localmente e permitir operações completas de **CRUD**.

## Tecnologias Obrigatórias

- Node.js (versão LTS)
- Express
- SQLite3
- Thunder Client (para testes)

**Observação**:  
Não utilizar ORM ou qualquer framework/framework adicional de abstração. O acesso ao banco deve ser feito **diretamente** com o pacote `sqlite3`.

## O Que Deve Ser Construído

A API deve conter os seguintes endpoints:

| Método  | Endpoint         | Descrição                                      |
|---------|------------------|------------------------------------------------|
| POST    | `/users`         | Cria um novo usuário                           |
| GET     | `/users`         | Lista todos os usuários                        |
| GET     | `/users/:id`     | Busca um usuário específico pelo ID            |
| PUT     | `/users/:id`     | Atualiza nome e status do usuário              |
| DELETE  | `/users/:id`     | **Soft delete**: altera status para "inativo" (não remove o registro fisicamente) |

## Modelagem do Banco de Dados

- Nome do banco: `database.sqlite` (arquivo local na raiz do projeto)
- Tabela: `usuarios`

### Campos obrigatórios

| Campo       | Tipo      | Restrição                          |
|-------------|-----------|------------------------------------|
| id          | INTEGER   | PRIMARY KEY, AUTOINCREMENT         |
| nome        | TEXT      | NOT NULL                           |
| email       | TEXT      | NOT NULL, UNIQUE                   |
| status      | TEXT      | NOT NULL, DEFAULT 'ativo'          |
| created_at  | DATETIME  | DEFAULT CURRENT_TIMESTAMP          |

## Estrutura Obrigatória de Pastas
api-usuarios/

src/
    
    app.js
    
    routes/
        user.routes.js
    
    controllers/
        user.controller.js
    
    services/
        user.service.js
    
    database/
        db.js

## Responsabilidade de Cada Camada

- **routes**  
  Define apenas os endpoints e direciona para o controller.

- **controllers**  
  Recebe a requisição HTTP, valida dados básicos e retorna resposta HTTP.

- **services**  
  Contém a lógica de negócio e comunicação com o banco de dados.

- **database**  
  Responsável pela conexão com o banco e criação da tabela (se não existir).

## Passos para Execução

1. Criar pasta do projeto  
   mkdir api-usuarios
   cd api-usuarios

2. Inicializar o projeto
   npm init -y
   
4. Instalar dependências
   npm install express sqlite3
   
5. Criar estrutura de pastas
   mkdir -p src/{database,services,controllers,routes}
   
6. Implementar os arquivos:
src/database/db.js
src/services/user.service.js
src/controllers/user.controller.js
src/routes/user.routes.js
src/app.js

7. Executar a aplicação
   node src/app.js

## A API estará rodando em:
http://localhost:3000
Requisitos Técnicos

## Utilizar express.json() para tratamento de JSON no body.
Retornar códigos HTTP corretos:
201 → criação com sucesso
200 → sucesso (GET, PUT, DELETE)
404 → recurso não encontrado
400 → erro de validação
500 → erro interno do servidor

## Implementar tratamento básico de erros.
Manter separação clara entre as camadas.

## Resultado Esperado
Ao executar a aplicação e testar com Thunder Client, deve ser possível:

Criar usuários
Listar usuários
Buscar usuário por ID
Atualizar nome e status
Desativar usuário (soft delete → status = "inativo")
Consultar registros salvos no banco SQLite (abrir o arquivo database.sqlite com DB Browser for SQLite, extensão SQLite no VS Code ou comando sqlite3 database.sqlite "SELECT * FROM usuarios;")

O projeto deve estar funcional, organizado e seguindo exatamente a estrutura e regras definidas acima.


# Como usar o start do projeto e fazer as requisições
no cmd execute 
    
    node start.js

## Testando as requisições no Thunder Client

# Criar usuário (POST)
    Método: POST
    URL: http://localhost:3000/api/users
    Body (JSON):JSON{
      "nome": "Kain Silva",
      "email": "kain@teste.com"
    }
Esperado: 201 + objeto com id novo e status "ativo"

# Listar todos (GET)
    Método: GET
    URL: http://localhost:3000/api/users
Esperado: 200 + array com todos os usuários (ativos e inativos)

# Buscar um por ID (GET)
    Método: GET
    URL: http://localhost:3000/api/users/1 (troque 1 pelo ID real)
Esperado: 200 + dados do usuário ou 404 se não existir

# Atualizar nome e status (PUT)
    Método: PUT
    URL: http://localhost:3000/api/users/1
    Body (JSON):JSON{
      "nome": "Kain Atualizado",
      "status": "inativo"
    }
Esperado: 200 + usuário atualizado ou mensagem de sucesso

# Desativar usuário (DELETE – soft delete)
    Método: DELETE
    URL: http://localhost:3000/api/users/1
    Esperado: 200 + mensagem "desativado com sucesso"
Depois: GET /users/1 mostra o mesmo usuário, mas com "status": "inativo"

# Consultar o banco diretamente
Abra database.sqlite com:
Extensão SQLite no VS Code (clique direito → Open Database)
Ou DB Browser for SQLite (gratuito)
Ou no terminal:Bashsqlite3 database.sqlite "SELECT * FROM usuarios;"

Veja que o registro continua lá, só o status mudou.

