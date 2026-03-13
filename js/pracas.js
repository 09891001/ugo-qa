// ================================
// Projeto Praça Pet
// Motor de dados
// ================================

// LINK PUBLICADO DA PLANILHA
// substitua pelo seu quando publicar

const URL_PLANILHA =
"https://opensheet.elk.sh/1raQ49At3U05o1c5sGCpzH_M1kQYxZhxB7dGAOysIquA/Sheet1"
let dadosPracas = []

document.addEventListener("DOMContentLoaded", iniciarProjeto)

function iniciarProjeto(){

carregarPracas()

const campoBusca = document.getElementById("buscar")

if(campoBusca){

campoBusca.addEventListener("input", function(){

buscarPraca(this.value)

})

}

const form = document.getElementById("form-praca")

if(form){

form.addEventListener("submit", enviarFormulario)

}

}



// ================================
// CARREGAR PRAÇAS
// ================================

async function carregarPracas(){

const lista = document.getElementById("lista-resultados")

if(!lista) return

try{

const resposta = await fetch(URL_PLANILHA)

const dados = await resposta.json()

dadosPracas = dados

renderizarLista(dados)

}catch(erro){

lista.innerHTML = `
<p>
Não foi possível carregar as avaliações no momento.
</p>
`

}

}



// ================================
// RENDERIZAR LISTA
// ================================

function renderizarLista(lista){

const container = document.getElementById("lista-resultados")

if(!container) return

if(lista.length === 0){

container.innerHTML = "<p>Nenhuma avaliação encontrada.</p>"

return

}

container.innerHTML = lista.map(item => {

return `

<div class="card-praca">

<h3>${item.praca || ""}</h3>

<p><strong>Bairro:</strong> ${item.bairro || ""}</p>

<p><strong>Avaliação:</strong> ${item.avaliacao || ""}</p>

<p>${item.comentario || ""}</p>

</div>

`

}).join("")

}



// ================================
// BUSCA
// ================================

function buscarPraca(texto){

const termo = texto.toLowerCase()

const filtrado = dadosPracas.filter(p => {

return (p.praca || "").toLowerCase().includes(termo)

})

renderizarLista(filtrado)

}



// ================================
// ENVIAR FORMULÁRIO
// ================================

async function enviarFormulario(e){

e.preventDefault()

const form = e.target

const mensagem = document.getElementById("mensagem-envio")

const dados = new FormData(form)

try{

await fetch(form.action, {

method:"POST",

body:dados

})

form.reset()

if(mensagem){

mensagem.innerText = "Avaliação enviada com sucesso."

}

}catch(erro){

if(mensagem){

mensagem.innerText = "Erro ao enviar avaliação."

}

}

}