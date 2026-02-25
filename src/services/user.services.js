const db = require('../database/db');

const createUser = (nome, email) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.run(sql, [nome, email], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return reject({ status: 409, message: 'Email já cadastrado' });
        }
        return reject({ status: 500, message: 'Erro ao criar usuário' });
      }
      resolve({ 
        id: this.lastID, 
        nome, 
        email, 
        status: 'ativo', 
        statusCode: 201 
      });
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
      if (err) return reject({ status: 500, message: 'Erro ao listar usuários' });
      resolve({ users: rows, statusCode: rows.length ? 200 : 404 });
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, row) => {
      if (err) return reject({ status: 500, message: 'Erro ao buscar usuário' });
      if (!row) return reject({ status: 404, message: 'Usuário não encontrado' });
      resolve({ user: row, statusCode: 200 });
    });
  });
};

const updateUser = (id, nome, status) => {
  return new Promise((resolve, reject) => {
    if (!['ativo', 'inativo'].includes(status)) {
      return reject({ status: 400, message: 'Status deve ser "ativo" ou "inativo"' });
    }

    const sql = 'UPDATE usuarios SET nome = ?, status = ? WHERE id = ?';
    db.run(sql, [nome, status, id], function (err) {
      if (err) return reject({ status: 500, message: 'Erro ao atualizar' });
      if (this.changes === 0) {
        return reject({ status: 404, message: 'Usuário não encontrado' });
      }
      resolve({ message: 'Usuário atualizado', statusCode: 200 });
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE usuarios SET status = 'inativo' WHERE id = ?";
    db.run(sql, [id], function (err) {
      if (err) return reject({ status: 500, message: 'Erro ao desativar' });
      if (this.changes === 0) {
        return reject({ status: 404, message: 'Usuário não encontrado' });
      }
      resolve({ message: 'Usuário desativado com sucesso', statusCode: 200 });
    });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};