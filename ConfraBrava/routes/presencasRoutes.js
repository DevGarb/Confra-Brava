const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const presencasFilePath = path.join(__dirname, 'data', 'presencas.json');

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

// Rota para obter todas as presenças
router.get('/', (req, res) => {
  const presencas = readPresencas(); // Agora, sempre lê o arquivo JSON
  res.json(presencas);  // Retorna os dados mais atualizados
});

// Rota para adicionar uma nova presença
router.post('/', (req, res) => {
  const presencas = readPresencas(); // Lê o arquivo JSON
  const newPresence = req.body;
  newPresence.id = presencas.length + 1;
  presencas.push(newPresence);
  savePresencas(presencas);  // Salva os dados atualizados no arquivo
  res.status(201).json(newPresence);  // Retorna o objeto criado
});

// Rota para editar a presença de um usuário
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPresence = req.body;
  const presencas = readPresencas(); // Lê o arquivo JSON

  let presence = presencas.find(p => p.id === id);
  if (presence) {
    presence.attendance = updatedPresence.attendance;
    presence.name = updatedPresence.name || presence.name;  // Atualiza o nome, se passado
    savePresencas(presencas);  // Salva os dados atualizados no arquivo
    res.json(presence);
  } else {
    res.status(404).send('Presence not found');
  }
});

// Rota para deletar a presença de um usuário
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let presencas = readPresencas(); // Lê o arquivo JSON
  presencas = presencas.filter(p => p.id !== id);
  savePresencas(presencas);  // Salva os dados atualizados no arquivo
  res.status(204).send();
});

module.exports = router;
