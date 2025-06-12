const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do banco MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root', // ou seu usuário MySQL
  password: '', // sua senha do MySQL (deixe vazio se não tiver)
  database: 'sistema_agendamento'
};

// Criar conexão com o banco
let db;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado ao MySQL!');
    
    // Criar usuários de exemplo com senhas reais
    await createExampleUsers();
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:', error);
    process.exit(1);
  }
}

// Função para criar usuários de exemplo (versão segura)
async function createExampleUsers() {
  try {
    // Verificar se os usuários já existem
    const [existingUsers] = await db.execute('SELECT COUNT(*) as count FROM usuarios');
    
    if (existingUsers[0].count > 0) {
      console.log('ℹ️ Usuários já existem no banco');
      
      // Verificar se temos os usuários de teste
      const [testUsers] = await db.execute(`
        SELECT email FROM usuarios 
        WHERE email IN ('admin@email.com', 'func1@email.com', 'cliente1@email.com')
      `);
      
      if (testUsers.length === 3) {
        console.log('✅ Usuários de teste já configurados!');
        console.log('📋 Credenciais de teste:');
        console.log('   Admin: admin@email.com / 123456');
        console.log('   Funcionário: func1@email.com / func123');
        console.log('   Cliente: cliente1@email.com / cliente123');
        return;
      }
    }

    // Senhas que vamos usar
    const senhaAdmin = await bcrypt.hash('123456', 10);
    const senhaFunc = await bcrypt.hash('func123', 10);
    const senhaCliente = await bcrypt.hash('cliente123', 10);

    // Inserir usuários apenas se não existirem
    const usuarios = [
      { nome: 'Admin', email: 'admin@email.com', senha_hash: senhaAdmin, tipo: 'admin' },
      { nome: 'Funcionário 1', email: 'func1@email.com', senha_hash: senhaFunc, tipo: 'funcionario' },
      { nome: 'Cliente 1', email: 'cliente1@email.com', senha_hash: senhaCliente, tipo: 'cliente' }
    ];

    for (const usuario of usuarios) {
      try {
        await db.execute(`
          INSERT INTO usuarios (nome, email, senha_hash, tipo) 
          VALUES (?, ?, ?, ?)
        `, [usuario.nome, usuario.email, usuario.senha_hash, usuario.tipo]);
        console.log(`✅ Usuário criado: ${usuario.email}`);
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`ℹ️ Usuário já existe: ${usuario.email}`);
        } else {
          console.error(`❌ Erro ao criar usuário ${usuario.email}:`, error.message);
        }
      }
    }

    console.log('✅ Processo de criação de usuários concluído!');
    console.log('📋 Credenciais de teste:');
    console.log('   Admin: admin@email.com / 123456');
    console.log('   Funcionário: func1@email.com / func123');
    console.log('   Cliente: cliente1@email.com / cliente123');

  } catch (error) {
    console.error('❌ Erro ao verificar/criar usuários:', error.message);
  }
}

// ========== ROTAS ==========

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Augebit funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota de LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Tentativa de login:', { email, password: '***' });

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar usuário no banco
    const [users] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?', 
      [email]
    );

    if (users.length === 0) {
      console.log('❌ Usuário não encontrado:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    }

    const user = users[0];
    console.log('👤 Usuário encontrado:', user.nome);

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, user.senha_hash);
    
    if (!senhaValida) {
      console.log('❌ Senha incorreta para:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        tipo: user.tipo 
      },
      'sua_chave_secreta_aqui', // Mude isso em produção
      { expiresIn: '24h' }
    );

    console.log('✅ Login realizado com sucesso:', user.nome);

    // Retornar sucesso
    res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      },
      token
    });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota de CADASTRO
app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, tipo = 'cliente' } = req.body;

    console.log('📝 Tentativa de cadastro:', { nome, email, tipo });

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Verificar se email já existe
    const [existingUsers] = await db.execute(
      'SELECT id FROM usuarios WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email já está em uso' 
      });
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Inserir usuário
    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, tipo]
    );

    console.log('✅ Usuário cadastrado com sucesso:', nome);

    res.json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      user: {
        id: result.insertId,
        nome,
        email,
        tipo
      }
    });

  } catch (error) {
    console.error('❌ Erro no cadastro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota para listar usuários (apenas para admin)
app.get('/api/usuarios', async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, nome, email, tipo, data_criacao FROM usuarios ORDER BY data_criacao DESC'
    );

    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Middleware para verificar token (exemplo)
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'sua_chave_secreta_aqui');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
}

// Rota protegida (exemplo)
app.get('/api/perfil', verifyToken, async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, nome, email, tipo, data_criacao FROM usuarios WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    res.json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    console.error('❌ Erro ao buscar perfil:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log('📋 Rotas disponíveis:');
  console.log('   GET  / - Teste da API');
  console.log('   POST /api/login - Login');
  console.log('   POST /api/cadastro - Cadastro');
  console.log('   GET  /api/usuarios - Listar usuários');
  console.log('   GET  /api/perfil - Perfil do usuário');
});

// Tratamento de erros
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Promise rejeitada:', error);
});