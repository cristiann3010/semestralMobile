const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',  // Substitua pelo seu usuário MySQL
    password: 'sua_senha',  // Substitua pela sua senha MySQL
    database: 'sistema_agendamento'
};

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    
    if (rows.length === 0) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
        return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.json({ id: usuario.id, nome: usuario.nome, tipo: usuario.tipo });
});

// Rota para listar serviços
app.get('/servicos', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query('SELECT * FROM servicos');
    res.json(rows);
});

// Rota para criar agendamento
app.post('/agendamentos', async (req, res) => {
    const { cliente_id, servico_id, funcionario_id, data_hora } = req.body;
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.query(
        'INSERT INTO agendamentos (cliente_id, servico_id, funcionario_id, data_hora) VALUES (?, ?, ?, ?)',
        [cliente_id, servico_id, funcionario_id, data_hora]
    );
    res.json({ id: result.insertId });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});

// Rota raiz (para teste)
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema de Agendamento está funcionando!' });
});