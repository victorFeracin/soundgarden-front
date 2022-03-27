let balls = document.querySelector('.balls')
let quant = document.querySelectorAll('.slides .images')
let atual = 0
let imagem = document.querySelector('#atual')
let next = document.querySelector('#avancar')
let voltar = document.querySelector('#voltar')
let continuar = true
const btnPrimary = document.querySelectorAll('button')
const btnClose = document.querySelector('#close')
const modalContainer = document.querySelector('#modal_container')


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


for(let i=0; i < btnPrimary.length; i++) {
btnPrimary[i].addEventListener('click', ()=> {
    modalContainer.style.display = 'flex'
    modalContainer.style.justifyContent = 'center'
    modalContainer.style.alignItems = 'center'
})
}

btnClose.addEventListener('click', ()=> {
    modalContainer.style.display = 'none'
})