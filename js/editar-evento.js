const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('id')
const nome = document.querySelector('#nome')
const banner = document.querySelector('#banner')
const atracoes = document.querySelector('#atracoes')
const descricao = document.querySelector('#descricao')
const data = document.querySelector('#data')
const lotacao = document.querySelector('#lotacao')
const botaoSubmit = document.querySelector('#botao-enviar')

const Base_Url = 'https://xp41-soundgarden-api.herokuapp.com'

window.onload = async () => {
    const request = await fetch(`${Base_Url}/events/${myParam}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await request.json()
    console.log(response);

    const formatNumber = (numero) => {
        if ( numero < 10 ) {
            return "0"+numero
        }
        return numero
    }

    
    const {name, poster, attractions, description, scheduled, number_tickets} = response

    newDate = `${scheduled[5]}${scheduled[6]}/${scheduled[8]}${scheduled[9]}/${scheduled[0]}${scheduled[1]}${scheduled[2]}${scheduled[3]} ${scheduled[11]}${scheduled[12]}:${scheduled[14]}${scheduled[15]} `

    nome.value = name
    banner.value = poster
    atracoes.value = [attractions],
    descricao.value = description,
    data.value = newDate,
    lotacao.value = number_tickets
}

botaoSubmit.onclick = async (evento) => {
    evento.preventDefault()
    const brData = swapData(data.value);
    const request = await fetch(`${Base_Url}/events/${myParam}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nome.value,
            poster: banner.value,
            attractions: atracoes.value.split(','),
            description: descricao.value,
            scheduled: brData.toISOString(),
            number_tickets: Number(lotacao.value)
        })
    })

    const response = await request.json()

    console.log(response);

}

function swapData(data) {
    const [dd, mm, aa] = data.split('/');
    const newData = new Date([mm, dd, aa]);
    console.log(newData);
    return newData;
  }

