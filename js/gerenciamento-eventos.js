const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

tabelaEventos = document.querySelector('#tabela-eventos')

window.onload = async () => {
    const resposta = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const respostaFormatada = await resposta.json()

    console.log(respostaFormatada);
    
    let numero = 3

    respostaFormatada.forEach(item => {
        numero++
        newDate = `${item.scheduled[8]}${item.scheduled[9]}/${item.scheduled[5]}${item.scheduled[6]}/${item.scheduled[0]}${item.scheduled[1]}${item.scheduled[2]}${item.scheduled[3]} ${item.scheduled[11]}${item.scheduled[12]}:${item.scheduled[14]}${item.scheduled[15]} `
        tabelaEventos.innerHTML += `<tr>
        <th scope="row">${numero}</th>
        <td>${newDate}</td>
        <td>${item.name}</td>
        <td>${item.attractions}</td>
        <td>
            <a href="reservas.html/?id=${item._id}" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html/?id=${item._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html/?id=${item._id}" class="btn btn-danger">excluir</a>
        </td>
    </tr>`
    })
}