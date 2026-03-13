// ================================
// Motor de Interface - Ugo Ventura
// Menu acessível e responsivo
// ================================

function renderMenuERodape(){

const header = document.getElementById("main-header")
const footer = document.getElementById("main-footer")

// ================================
// HEADER
// ================================

if(header){

header.innerHTML = `

<nav class="menu-principal" aria-label="Menu principal">

<div class="menu-container">

<div class="logo">

<a href="index.html">
Ugo Ventura
</a>

</div>

<button
id="menu-toggle"
aria-expanded="false"
aria-controls="menu-list"
aria-label="Abrir menu de navegação">

<i class="fas fa-bars"></i>

</button>

<ul id="menu-list" class="menu-links">

<li>
<a href="index.html">Home</a>
</li>

<li>
<a href="projetos.html">Projeto Praça Pet</a>
</li>

<li>
<a href="conhecimentos.html">Conhecimentos</a>
</li>

<li>
<a href="loja.html">Loja</a>
</li>

</ul>

</div>

</nav>

`
}

// ================================
// FOOTER
// ================================

if(footer){

footer.innerHTML = `

<div class="footer-content">

<p>
© 2026 Ugo Ventura - QA de Acessibilidade
</p>

<div class="social-links">

<a
href="https://www.linkedin.com/in/ugo-rocha-ventura-97335a68/"
target="_blank"
aria-label="Abrir perfil do LinkedIn de Ugo Ventura">

<i class="fab fa-linkedin"></i>

</a>

<a
href="https://www.youtube.com/watch?v=UW9lQev63oY"
target="_blank"
aria-label="Abrir canal do YouTube">

<i class="fab fa-youtube"></i>

</a>

</div>

</div>

`
}

// ================================
// MENU MOBILE
// ================================

const toggleBtn = document.getElementById("menu-toggle")
const menuList = document.getElementById("menu-list")

if(!toggleBtn || !menuList){
return
}

toggleBtn.addEventListener("click", function(){

const expanded = toggleBtn.getAttribute("aria-expanded") === "true"

toggleBtn.setAttribute("aria-expanded", !expanded)

if(expanded){

menuList.style.display = "none"

toggleBtn.innerHTML = '<i class="fas fa-bars"></i>'

toggleBtn.setAttribute("aria-label","Abrir menu de navegação")

}else{

menuList.style.display = "block"

toggleBtn.innerHTML = '<i class="fas fa-times"></i>'

toggleBtn.setAttribute("aria-label","Fechar menu de navegação")

}

})

}

// ================================
// Inicialização segura
// ================================

document.addEventListener("DOMContentLoaded", renderMenuERodape)