const express = require('express');
const userRoutes = require('./routes/user.routes');

//carrrega o banco e cria pool de conexões e tabela "usuarios" se não existir
require('./database/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});