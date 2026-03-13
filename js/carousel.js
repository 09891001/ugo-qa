// ================================
// Carousel acessível
// Ugo Ventura
// ================================

document.addEventListener("DOMContentLoaded", function () {

const slidesContainer = document.getElementById("carousel-slides")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const status = document.getElementById("carousel-status")

// Proteção contra erro caso a página não tenha carousel
if(!slidesContainer || !prevBtn || !nextBtn){
return
}

const slides = slidesContainer.querySelectorAll(".slide")
const totalSlides = slides.length

let index = 0

function atualizarCarousel(){

slidesContainer.style.transform = `translateX(-${index * 100}%)`

if(status){

const descricao = slides[index].querySelector("img")?.alt || ""

status.innerText =
`Foto ${index + 1} de ${totalSlides}. ${descricao}`

}

}

// botão próximo

nextBtn.addEventListener("click", function(){

index++

if(index >= totalSlides){
index = 0
}

atualizarCarousel()

})

// botão anterior

prevBtn.addEventListener("click", function(){

index--

if(index < 0){
index = totalSlides - 1
}

atualizarCarousel()

})

// suporte a teclado

document.addEventListener("keydown", function(e){

if(e.key === "ArrowRight"){

index++

if(index >= totalSlides){
index = 0
}

atualizarCarousel()

}

if(e.key === "ArrowLeft"){

index--

if(index < 0){
index = totalSlides - 1
}

atualizarCarousel()

}

})

})