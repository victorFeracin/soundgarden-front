let balls = document.querySelector('.balls')
let quant = document.querySelectorAll('.slides .images')
let atual = 0
let imagem = document.querySelector('#atual')
let next = document.querySelector('#avancar')
let voltar = document.querySelector('#voltar')
let continuar = true

const botaoReserva = document.querySelector('#concluirReserva')
const btnClose = document.querySelector('#close')
const modalContainer = document.querySelector('#modal_container')
const cancelaModal = document.querySelector('#cancelaModal')
const divModal = document.querySelector('#divAtual')
const inputNome = document.querySelector('#nomeCompleto')
const inputEmail = document.querySelector('#email')
const inputTicket = document.querySelector('#ticket')


const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'


//início código banner rotativo
for(let i=0; i < quant.length; i++ ) {
    let div = document.createElement('div')
    div.id = i
    balls.appendChild(div)
}

document.getElementById('0').classList.add('imageAtual')

let pos = document.querySelectorAll('.balls div')

for(let i=0; i < pos.length; i++) {
    pos[i].addEventListener('click', () => {
        atual = pos[i].id
        continuar = false
        slide()
    })
}

voltar.addEventListener('click', () => {
    atual--
    continuar = false
    slide()
} )

next.addEventListener('click', ()=> {
    atual++
    continuar = false
    slide()
})

const slide = () => {
    if(atual >= quant.length) {
        atual = 0
    } else if (atual < 0) {
        atual = quant.length -1
    }
    document.querySelector('.imageAtual').classList.remove('imageAtual')
    imagem.style.marginLeft = -1024*atual + 'px'
    document.getElementById(atual).classList.add('imageAtual')
}
setInterval(()=> {
    if(continuar){
    atual++
    slide()
    } else {
        continuar = true
    }
}, 4000)
// final código banner rotativo

// Início código para recuperar eventos e reservar ingresso para um evento específico

window.onload = async () => {

    const request = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await request.json()

    console.log(response);
    console.log(response[1]);

    for(let i=0; i < 3; i++) {
        const newDate = `${response[i].scheduled[8]}${response[i].scheduled[9]}/${response[i].scheduled[5]}${response[i].scheduled[6]}/${response[i].scheduled[0]}${response[i].scheduled[1]}${response[i].scheduled[2]}${response[i].scheduled[3]} `
        divModal.innerHTML += `<article class="evento card p-5 m-3">
        <h2>${response[i].name} - ${newDate}</h2>
        <h4>${response[i].attractions}</h4>
        <p>${response[i].description}.</p>
        <button class="btn btn-primary" value=${response[i]._id}>reservar ingresso</button>
    </article>`
    }

    const btnPrimary = document.querySelectorAll('.btn-primary')
    
    for(let i=0; i < btnPrimary.length; i++) {
        btnPrimary[i].addEventListener('click', ()=> {
            modalContainer.style.display = 'flex'
            modalContainer.style.justifyContent = 'center'
            modalContainer.style.alignItems = 'center'
            botaoReserva.value = btnPrimary[i].value
    })
    }

    botaoReserva.onclick = async (evento) => {
        evento.preventDefault()
        if(inputTicket.value <= 0) {
            alert(`Você deve selecionar pelo menos um ticket.`);
        } else if(inputTicket.value > 10) {
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
                        number_tickets: Number(inputTicket.value),
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





