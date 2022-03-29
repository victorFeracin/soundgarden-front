const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector('#nome')
const inputEmail = document.querySelector('#email')
const inputEventos = document.querySelector('#evento')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const divForms = document.querySelector('#lista-reservas')


const urlParam = new URLSearchParams(window.location.search)
const myParam = urlParam.get('id')

window.onload = async () => {
    const resposta = await fetch(`${BASE_URL}/bookings/event/${myParam}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const respostaFormatada = await resposta.json()

    console.log(respostaFormatada);

    const reservasFiltradas = respostaFormatada.filter( item => item.event !== null)

    console.log(reservasFiltradas);

    reservasFiltradas.forEach(item => {
        divForms.innerHTML += `<form class="col-6 form-reservas">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control name" id="nome" aria-describedby="nome" value=${item.owner_name} disabled>
        </div>
        <div class="mb-3">
            <label for="atracoes" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" aria-describedby="email" value=${item.owner_email} disabled>
        </div>
        <div class="mb-3">
            <label for="evento" class="form-label">Evento</label>
            <input type="text" class="form-control evento" id="evento" aria-describedby="evento" value=${item.event.description} disabled>
        </div>
        <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="datetime" name="data" id="data" class="form-control"
                placeholder="00/00/00 00:00" value=${item.event.scheduled} disabled>
        </div>
        <div class="mb-3">
            <label for="lotacao" class="form-label">Quantidade de ingressos</label>
            <input type="number" class="form-control" id="lotacao" aria-describedby="lotacao" value=${item.number_tickets} disabled>
        </div>
    </form>`

    })

    

}