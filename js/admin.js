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

    let sequencia = 1

    

    response.forEach(item => {
        const brData = new Date(item.scheduled);
        const zeroEsquerdaDate = ()=>{
            if(brData.getDate() <= 9){
                const zero = Number (brData.getDate())
            return '0' + zero
            }else{
                return brData.getDate()
            }
        }
        const zeroEsquerdaMonth = ()=>{
            if(brData.getMonth() <= 9){
                const zero = Number (brData.getMonth() + 1)
            return '0' + zero
            }else{
                return brData.getMonth()
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
       
        trAtual.innerHTML += `<tr>
        <th scope="row">${sequencia++}</th>
        <td> ${zeroEsquerdaDate()}/${zeroEsquerdaMonth()}/${brData.getFullYear()} ${zeroEsquerdaHours()}:${zeroEsquerdaMinutes()} </td>
        <td>${item.name}</td>
        <td>${item.attractions}</td>
        <td class="containerBtnAdmin">
            <a href="reservas.html?id=${item._id}" class="btn btn-dark btnAdmin">ver reservas</a>
            <a href="editar-evento.html?id=${item._id}" class="btn btn-secondary btnAdmin">editar</a>
            <a href="excluir-evento.html?id=${item._id}" class="btn btn-danger btnAdmin" btnAdmin>excluir</a>
        </td>
    </tr>`
    })
}