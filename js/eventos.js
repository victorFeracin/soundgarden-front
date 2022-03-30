
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

var divAtual = document.getElementById("lista-eventos");

const cancelaModal = document.querySelector('#cancelaModal')
const btnClose = document.querySelector('#close')
const modalContainer = document.querySelector('#modal_container')
const botaoReserva = document.querySelector('#concluirReserva')
const inputNome = document.querySelector('#nomeCompleto')
const inputEmail = document.querySelector('#email')
const inputTickets = document.querySelector('#ticket')

const form = document.querySelector('#reservas');


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
        newDate = `${item.scheduled[8]}${item.scheduled[9]}/${item.scheduled[5]}${item.scheduled[6]}/${item.scheduled[0]}${item.scheduled[1]}${item.scheduled[2]}${item.scheduled[3]} `  
        divAtual.innerHTML += `<article class="evento card p-5 m-3"><h2>${item.name} - ${newDate}</h2>
        <h4>${item.attractions}</h4>
        <p>${item.description}</p>
        <button class="btn btn-primary" value=${item._id}>reservar ingresso</button>
        </article>`

    })
  
    const botao = document.querySelectorAll('button')
    console.log(botao);
    
    for(let i=0; i < botao.length; i++) {
      botao[i].addEventListener('click', ()=> {
          modalContainer.style.display = 'flex'
          modalContainer.style.justifyContent = 'center'
          modalContainer.style.alignItems = 'center'
          botaoReserva.value = botao[i].value
      })
      }

      botaoReserva.onclick = async (evento) => {
        evento.preventDefault()

        if(inputTickets.value <= 0) {
            alert(`Você deve selecionar pelo menos um ticket.`);
        } else if(inputTickets.value > 10) {
            alert(`Você só pode escolher no máximo 10 tickets por reserva.`);
        } else {
            try {
                const respostaBotao = await fetch(`${BASE_URL}/bookings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        owner_name: inputNome.value,
                        owner_email: inputEmail.value,
                        number_tickets: Number(inputTickets.value),
                        event_id: botaoReserva.value
                    })
    
                })
    
                const respostaFormatada = await respostaBotao.json();
                console.log(respostaFormatada);
                if(respostaFormatada.name == 'Validation Error' || respostaFormatada.message == 'Validation Failed') {
                    alert(`ERRO. Verifique os dados inseridos e tente novamente.`);
                } else {
                    alert('Reserva realizada com sucesso!');
                }
            } catch(err) {
                console.log(`ERRO: ${err}`);
                alert(`ERRO. Verifique os dados inseridos e tente novamente.`);
            }
        }    
    }
    btnClose.addEventListener('click', ()=> {
        modalContainer.style.display = 'none'
    })
    cancelaModal.addEventListener('click', ()=> {
        modalContainer.style.display = 'none'
    })
  }

  