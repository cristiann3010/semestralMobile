// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'semestral',
  charset: 'utf8mb4'
});

connection.connect();

app.post('/register', (req, res) => {
  const { nome, email, password, telefone } = req.body;
  if (!nome || !email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?, ?)';
  connection.query(query, [nome, email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao salvar no banco' });
    }
    res.json({ message: 'Usuário cadastrado com sucesso' });
  });
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});