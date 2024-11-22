const fs = require('fs');
const path = require('path');

// Usando o diretório do próprio projeto para persistência
const presencasFilePath = path.join(__dirname, 'data', 'presencas.json');  // Altere para um caminho dentro do projeto

// Função para ler os dados do arquivo presencas.json
function readPresencas() {
  try {
    const data = fs.readFileSync(presencasFilePath, 'utf8');
    return JSON.parse(data);  // Converte o JSON em um objeto JavaScript
  } catch (error) {
    return [];  // Se o arquivo não existir ou houver erro, retorna um array vazio
  }
}

// Função para salvar os dados no arquivo presencas.json
function savePresencas(presencas) {
  fs.writeFileSync(presencasFilePath, JSON.stringify(presencas, null, 2));  // Salva no formato JSON com 2 espaços de indentação
}

module.exports = (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    // Acessando os dados do corpo da requisição
    const { name, attendance } = req.body;

    // Lendo os dados atuais de presenças
    const presencas = readPresencas();

    // Adicionando a nova presença
    const newPresence = {
      id: presencas.length + 1,  // Incrementa o ID de forma simples
      name,
      attendance,
    };

    // Adicionando a nova presença ao array
    presencas.push(newPresence);

    // Salvando os dados atualizados no arquivo
    savePresencas(presencas);

    // Retornando a resposta
    return res.status(201).json(newPresence);  // Retorna o objeto criado
  } else if (method === 'GET') {
    // Lógica para retornar dados
    const presencas = readPresencas();
    return res.status(200).json({ presencas });
  }

  // Retorno para métodos não permitidos
  return res.status(405).json({ message: 'Método não permitido' });
};
