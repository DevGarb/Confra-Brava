document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();  // Previne o comportamento padrão de envio do formulário

  // Obtendo os valores dos campos do formulário
  const name = document.getElementById('name').value;
  const attendance = document.getElementById('attendance').checked;

  // Enviando os dados para a API via POST
  fetch('http://localhost:5000/api/presencas', {
    method: 'POST',  // Definindo o método como POST
    headers: {
      'Content-Type': 'application/json'  // Informando que o conteúdo é JSON
    },
    body: JSON.stringify({ name, attendance })  // Convertendo os dados para JSON
  })
  .then(response => {
    // Verificando se a resposta é válida (status 200-299)
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor: ' + response.status);
    }
    return response.json();  // Se a resposta for válida, converte para JSON
  })
  .then(data => {
    console.log('Presença registrada:', data);  // Exibe a resposta do servidor
    alert(data.name + ' Presença Confirmada!');  // Exibe a mensagem retornada pelo servidor (presença confirmada)
  })
  .catch(error => {
    console.error('Erro:', error);  // Exibe qualquer erro que ocorrer durante o processo
    alert('Ocorreu um erro. Tente novamente.');
  });
});
