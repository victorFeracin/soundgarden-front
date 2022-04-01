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
   
    const {name, poster, attractions, description, scheduled, number_tickets} = response

    const brData = new Date(scheduled);
    const zeroEsquerdaDate = ()=>{
        if(brData.getDate() <= 9){
            const zero = Number (brData.getDate())
        return '0' + zero
        }else{
            return brData.getDate()
        }
    }
    const zeroEsquerdaMonth = ()=>{
        if(brData.getMonth() < 9){
            const zero = Number (brData.getMonth() + 1)
            return '0' + zero
        }else{
            return brData.getMonth() + 1
        }
    }
    const zeroEsquerdaHours = ()=>{
        if(brData.getHours() <= 9){
            const zero = Number (brData.getHours())
        return '0' + zero
        }else{
            return brData.getHours()
        }
    }
    const zeroEsquerdaMinutes = ()=>{
        if(brData.getMinutes() <= 9){
            const zero = Number (brData.getMinutes())
        return '0' + zero
        }else{
            return brData.getMinutes()
        }
    }

    console.log(brData);

    nome.value = name
    banner.value = poster
    atracoes.value = [attractions],
    descricao.value = description,
    data.value = `${zeroEsquerdaDate()}/${zeroEsquerdaMonth()}/${brData.getFullYear()} ${zeroEsquerdaHours()}:${zeroEsquerdaMinutes()}`
    lotacao.value = number_tickets
}

botaoSubmit.onclick = async (evento) => {
    evento.preventDefault()
    const brData = swapData(data.value);
    try {
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
        if(response.name == 'Validation Error' || response.message == 'Validation Failed' || response.attractions == '' || response.number_tickets <= 0) {
            alert(`ERRO. Verifique os dados inseridos e tente novamente.`);
        } else {
            alert('Evento atualizado com sucesso!');
        }
    } catch(err) {
        console.log(err);
        alert(`ERRO. Verifique os dados inseridos e tente novamente.`);
    }
    
}

function swapData(data) {
    const [dd, mm, aa] = data.split('/');
    const newData = new Date([mm, dd, aa]);
    console.log(newData);
    return newData;
  }

