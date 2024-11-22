let presencas = require('../data/presencas.json');

// Função para confirmar presença
exports.confirmarPresenca = (req, res) => {
  const { name, attendance } = req.body;
  const id = Date.now();  // Usando timestamp como ID
  const newPresenca = { id, name, attendance };
  presencas.push(newPresenca);
  
  // Salvar os dados no arquivo JSON
  require('fs').writeFileSync('./data/presencas.json', JSON.stringify(presencas, null, 2));
  
  res.status(200).json({ message: 'Presença confirmada!', data: newPresenca });
};

// Função para obter todas as presenças
exports.getPresencas = (req, res) => {
  res.status(200).json(presencas);
};

// Função para editar presença
exports.editarPresenca = (req, res) => {
  const { id, name, attendance } = req.body;
  const index = presencas.findIndex(p => p.id === id);
  
  if (index !== -1) {
    presencas[index] = { id, name, attendance };
    require('fs').writeFileSync('./data/presencas.json', JSON.stringify(presencas, null, 2));
    res.status(200).json({ message: 'Presença atualizada!', data: presencas[index] });
  } else {
    res.status(404).json({ message: 'Presença não encontrada!' });
  }
};

// Função para deletar presença
exports.deletarPresenca = (req, res) => {
  const { id } = req.query;
  const index = presencas.findIndex(p => p.id === parseInt(id));
  
  if (index !== -1) {
    presencas.splice(index, 1);
    require('fs').writeFileSync('./data/presencas.json', JSON.stringify(presencas, null, 2));
    res.status(200).json({ message: 'Presença excluída com sucesso' });
  } else {
    res.status(404).json({ message: 'Presença não encontrada!' });
  }
};
