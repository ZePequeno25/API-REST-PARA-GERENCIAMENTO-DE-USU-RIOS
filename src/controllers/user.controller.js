const userService = require('../services/user.services');

const createUser = async (req, res) => {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios' });
        }

        const user = await userService.createUser(nome, email);
        res.status(user.statusCode).json(user);

    } catch (err) {
       console.error('Erro ao criar usuário:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ message: 'Email já cadastrado' });
        }
        res.status(err.status || 500).json({ message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(users.statusCode).json(users.users);
    } catch (err) {
        console.error('Erro ao obter usuários:', err);
        res.status(err.status || 500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(user.statusCode).json(user.user);
    }catch (err) {
        console.error('Erro ao obter usuário:', err);
        res.status(err.status || 500).json({ message: err.message });
    }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, status } = req.body;

    // Validações básicas (obrigatório pelo PDF)
    if (!nome || !status) {
      return res.status(400).json({ erro: 'Nome e status são obrigatórios' });
    }

    // Checa existência antes (melhor experiência)
    const existing = await userService.getUserById(id);
    if (!existing) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const result = await userService.updateUser(id, nome, status);

    // Opcional: retorna o usuário atualizado completo
    const updatedUser = await userService.getUserById(id);
    res.status(200).json(updatedUser);  // ou só { mensagem: result.message }

  } catch (err) {
    console.error(err);
    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
      erro: err.message || 'Erro interno do servidor' 
    });
  }
};

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const existingUser = await userService.getUserById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        await userService.deleteUser(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(err.status || 500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    getAll,
    getById,
    update,
    deleteUser
};