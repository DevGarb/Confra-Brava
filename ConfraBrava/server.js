const express = require('express');
const cors = require('cors');  // Importando o pacote CORS
const app = express();
const port = 5000;

// Permitir CORS para todas as origens (ou você pode especificar origens específicas)
app.use(cors());  // Isso permitirá que qualquer domínio acesse o seu backend


// Outras configurações de middleware
app.use(express.json()); // Para fazer o parsing de JSON no corpo da requisição

// Suas rotas e configurações da API
const presencasRoutes = require('./routes/presencasRoutes');
app.use('/api/presencas', presencasRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
