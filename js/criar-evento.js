const getNome = document.querySelector('#nome');
const getPoster = document.querySelector('#poster');
const getAtracoes = document.querySelector('#atracoes');
const getDescricao = document.querySelector('#descricao');
const getData = document.querySelector('#data');
const getLotacao = document.querySelector('#lotacao');

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const form = document.querySelector('form');


form.onsubmit = async (event) => {
  event.preventDefault();
  try {

    const brData = swapData(getData.value);


    const resposta = await fetch(`${BASE_URL}/events`, {
      method: 'POST',

      body: JSON.stringify({
        name: getNome.value,
        poster: getPoster.value,
        attractions: getAtracoes.value.split(','),
        description: getDescricao.value,
        scheduled: brData.toISOString(),
        number_tickets: parseInt(getLotacao.value)
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const respostaConteudo = await resposta.json();
    console.log(respostaConteudo);
    if(respostaConteudo.name == 'Validation Error' || respostaConteudo.message == 'Validation Failed' || respostaConteudo.attractions == '' || respostaConteudo.number_tickets <= 0) {
      alert(`ERRO. Verifique os dados inseridos e tente novamente.`);
    } else {
      alert('Evento cadastrado com sucesso!');
      form.reset();
    }
  } catch(err) {
    console.log(`ERRO: ${err}`);
    alert(`Erro. Verifique os dados inseridos e tente novamente.`)
  }
  
}

function swapData(data) {
  const [dd, mm, aa] = data.split('/');
  const newData = new Date([mm, dd, aa]);
  return newData;
}