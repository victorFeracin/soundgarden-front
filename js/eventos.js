
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

var divAtual = document.getElementById("lista-eventos");
  


  // adiciona o novo elemento criado e seu conteúdo ao DOM
  
  

  window.onload = async() => {
    const resposta = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await resposta.json()
    console.log(response);

    response.forEach(item => {
        newDate = new Date(item.scheduled)
        divAtual.innerHTML += `<article class="evento card p-5 m-3"><h2>${item.name} - ${newDate}</h2>
        <h4>${item.attractions}</h4>
        <p>${item.description}</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>`
    })

  }

