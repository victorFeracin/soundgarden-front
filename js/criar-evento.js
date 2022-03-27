const getNome = document.querySelector('#nome');
const getPoster = document.querySelector('#poster');
const getAtracoes = document.querySelector('#atracoes');
const getDescricao = document.querySelector('#descricao');
const getData = document.querySelector('#data');
const getLotacao = document.querySelector('#lotacao');

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const sendBttn = document.querySelector('.btn-primary');

sendBttn.onclick = async (event) => {
  event.preventDefault();
  try {
    const resposta = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({
        name: getNome.value,
        poster: getPoster.value,
        attractions: getAtracoes.value.split(','),
        description: getDescricao.value,
        scheduled: new Date(getData.value).toISOString(),
        number_tickets: parseInt(getLotacao.value)
      })
    });
  
    console.log(getNome.value);
    console.log(getPoster.value);
    console.log(getAtracoes.value);
    console.log(getDescricao.value);
    console.log(getData.value);
    console.log(getLotacao.value);
    console.log(typeof(getLotacao));

  
  
    console.log(resposta);
  }catch(err) {
    alert(err);
  }
  
}

