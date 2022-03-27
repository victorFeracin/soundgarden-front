const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

const trAtual = document.getElementById("tabela-eventos");

window.onload = async () => {
    const resposta = await fetch(`${BASE_URL}/events`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await resposta.json()
    console.log(response);


    response.forEach(item => {
        newDate = `${item.scheduled[8]}${item.scheduled[9]}/${item.scheduled[5]}${item.scheduled[6]}/${item.scheduled[0]}${item.scheduled[1]}${item.scheduled[2]}${item.scheduled[3]}  ${item.scheduled[11]}${item.scheduled[12]}:${item.scheduled[14]}${item.scheduled[15]}`
        trAtual.innerHTML += `<tr>
        <th scope="row">${th.[index++]}</th>
        <td>${newDate}</td>
        <td>${item.name}</td>
        <td>${item.attractions}</td>
        <td>
            <a href="reservas.html" class="btn btn-dark">ver reservas</a>
            <a href="editar.html" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html" class="btn btn-danger">excluir</a>
        </td>
    </tr>`
    })

}