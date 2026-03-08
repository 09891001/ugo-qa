/* Motor de Interface Ugo Ventura - QA de Acessibilidade */

const renderMenuERodape = () => {
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');

    // 1. Renderização do Cabeçalho com Menu Acessível
    if (header) {
        header.innerHTML = `
            <nav aria-label="Menu Principal" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; padding: 10px 5%;">
                <div class="logo">
                    <a href="index.html" style="color: blue; font-weight: bold; text-decoration: none; font-size: 1.5rem;">Ugo Ventura</a>
                </div>
                
                <button id="menu-toggle" 
                        aria-expanded="false" 
                        aria-controls="menu-list" 
                        aria-label="Abrir menu de navegação"
                        style="cursor: pointer; background: none; border: none; font-size: 1.5rem; color: var(--primaria); display: none;">
                    <i class="fas fa-bars" aria-hidden="true"></i>
                </button>

                <div id="menu-status" class="sr-only" aria-live="polite"></div>

                <ul id="menu-list" class="nav-links" style="list-style: none; padding: 0; margin: 0; display: flex; gap: 20px;">
                    <li><a href="index.html" style="text-decoration: none;"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="projetos.html" style="text-decoration: none;"><i class="fas fa-dog"></i> Meus Projetos</a></li>
                    <li><a href="loja.html" style="text-decoration: none;"><i class="fas fa-shopping-cart"></i> Loja</a></li>
                    <li><a href="conhecimentos.html" style="text-decoration: none;"><i class="fas fa-lightbulb"></i> Diversos</a></li>
                </ul>
            </nav>
        `;
    }

    // 2. Renderização do Rodapé
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content" style="text-align: center; padding: 20px;">
                <p>&copy; 2026 Ugo Ventura - Especialista em QA de Acessibilidade</p>
                <div class="social-links" style="margin-top: 15px; font-size: 1.5rem;">
                    <a href="https://www.linkedin.com/in/ugo-rocha-ventura-97335a68/" target="_blank" aria-label="Meu LinkedIn (abre em nova aba)" style="margin: 0 10px;">
                        <i class="fab fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.youtube.com/watch?v=UW9lQev63oY" target="_blank" aria-label="Meu Canal no YouTube (abre em nova aba)" style="margin: 0 10px;">
                        <i class="fab fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // 3. Lógica do Menu Hambúrguer e Responsividade (Prevenção de Erros)
    const toggleBtn = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');
    const menuStatus = document.getElementById('menu-status');

    if (toggleBtn && menuList) {
        const updateMenuDisplay = () => {
            if (window.innerWidth >= 768) {
                // Desktop
                menuList.style.display = 'flex';
                menuList.style.flexDirection = 'row';
                menuList.style.width = 'auto';
                toggleBtn.style.display = 'none';
            } else {
                // Mobile
                menuList.style.display = 'none';
                menuList.style.flexDirection = 'column';
                menuList.style.width = '100%';
                toggleBtn.style.display = 'block';
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
            }
        };

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            const novoEstado = !isExpanded;
            
            toggleBtn.setAttribute('aria-expanded', novoEstado);
            
            if (isExpanded) {
                menuList.style.display = 'none';
                toggleBtn.setAttribute('aria-label', 'Abrir menu de navegação');
                toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                if (menuStatus) menuStatus.innerText = "Menu fechado";
            } else {
                menuList.style.display = 'block';
                toggleBtn.setAttribute('aria-label', 'Fechar menu de navegação');
                toggleBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
                if (menuStatus) menuStatus.innerText = "Menu aberto";
            }
        });

        updateMenuDisplay();
        window.addEventListener('resize', updateMenuDisplay);
    }
};

document.addEventListener('DOMContentLoaded', renderMenuERodape);