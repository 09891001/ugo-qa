// js/menu.js - Motor Central de Acessibilidade do Ugo Ventura

const renderMenuERodape = () => {
    // Busca os espaços reservados no HTML
    const header = document.getElementById('main-header');
    const footer = document.getElementById('main-footer');

    // 1. Renderização do Cabeçalho e Menu Hambúrguer
    if (header) {
        header.innerHTML = `
            <nav aria-label="Menu Principal">
                <div class="logo">
                    <a href="index.html" style="font-weight: bold; text-decoration: none; color: white;">Ugo Ventura</a>
                </div>
                
                <button id="menu-toggle" 
                        aria-expanded="false" 
                        aria-controls="menu-list" 
                        aria-label="Abrir menu de navegação">
                    <i class="fas fa-bars" aria-hidden="true"></i>
                </button>

                <ul id="menu-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="projetos.html">Meus Projetos</a></li>
                    <li><a href="loja.html">Loja (Ugo Vendas)</a></li>
                    <li><a href="conhecimentos.html">Diversos</a></li>
                </ul>
            </nav>
        `;
    }

    // 2. Renderização do Rodapé com ícones profissionais
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content" style="text-align: center; padding: 20px;">
                <p>&copy; 2026 Ugo Ventura - Especialista em QA de Acessibilidade</p>
                <div class="social-links" style="margin-top: 15px;">
                    <a href="https://www.linkedin.com/in/ugo-rocha-ventura-97335a68/" 
                       target="_blank" 
                       aria-label="Acessar meu perfil profissional no LinkedIn (abre em nova aba)" 
                       style="margin: 0 10px; font-size: 1.5rem; color: #003366;">
                        <i class="fab fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a href="https://youtu.be/_2zJOG-6kv0" 
                       target="_blank" 
                       aria-label="Acessar meu canal de vídeos no YouTube (abre em nova aba)" 
                       style="margin: 0 10px; font-size: 1.5rem; color: #cc0000;">
                        <i class="fab fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // 3. Lógica de Interação e Acessibilidade do Menu
    const toggleBtn = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');

    if (toggleBtn && menuList) {
        // Função para abrir/fechar
        const toggleMenu = () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            menuList.classList.toggle('active');
            
            // Muda o ícone visual de "hambúrguer" para "X" (fechar)
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
                toggleBtn.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
            }
        };

        toggleBtn.addEventListener('click', toggleMenu);

        // Acessibilidade: Fecha o menu ao pressionar a tecla ESC
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuList.classList.contains('active')) {
                toggleMenu();
                toggleBtn.focus(); // Devolve o foco para o botão para o usuário não se perder
            }
        });
    }
};

// Inicia a renderização assim que o documento estiver pronto
document.addEventListener('DOMContentLoaded', renderMenuERodape);