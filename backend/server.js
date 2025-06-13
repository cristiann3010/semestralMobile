// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'semestral',
  charset: 'utf8mb4'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

// Rota de cadastro sem o campo telefone
app.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Verifica se o e-mail já está cadastrado
  connection.query(
    'SELECT id FROM usuarios WHERE email = ?',
    [email],
    (selectErr, selectResults) => {
      if (selectErr) {
        console.error(selectErr);
        return res.status(500).json({ error: 'Erro ao verificar e-mail' });
      }

      if (selectResults.length > 0) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }

      // Insere novo usuário
      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      connection.query(query, [nome, email, senha], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao salvar no banco' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
      });
    }
  );
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});