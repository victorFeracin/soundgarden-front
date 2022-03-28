const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('id')
const inputNome = document.querySelector('#nome')
const inputBanner = document.querySelector('#banner')
const inputAtracoes = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')
const botaoDelete = document.querySelector('#botaoDelete')


const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

window.onload = async () => {
   const resposta = await fetch(`${BASE_URL}/events/${myParam}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const respostaFormatada = await resposta.json()

    console.log(respostaFormatada);

    inputNome.value = respostaFormatada.name
    inputBanner.value = respostaFormatada.poster
    inputAtracoes.value = respostaFormatada.attractions
    inputDescricao.value = respostaFormatada.description
    inputLotacao.value = respostaFormatada.number_tickets

    newDate = `${respostaFormatada.scheduled[8]}${respostaFormatada.scheduled[9]}/${respostaFormatada.scheduled[5]}${respostaFormatada.scheduled[6]}/${respostaFormatada.scheduled[0]}${respostaFormatada.scheduled[1]}${respostaFormatada.scheduled[2]}${respostaFormatada.scheduled[3]} ${respostaFormatada.scheduled[11]}${respostaFormatada.scheduled[12]}:${respostaFormatada.scheduled[14]}${respostaFormatada.scheduled[15]} `

    inputData.value = newDate

    
}



botaoDelete.onclick = async evento => {
    evento.preventDefault()
    const respostaDelete = await fetch(`${BASE_URL}/events/${myParam}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    alert('Evento excluído com sucesso')

    setTimeout(()=> {
        window.location.href = 'admin.html'
    }, 2000)
}