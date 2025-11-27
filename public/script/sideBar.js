const parentElement = document.currentScript.parentElement;
const page = document.currentScript.getAttribute("page");

class SideBarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelectorAll('.menu-item').forEach(el =>
            el.addEventListener('click', this.handleMenuClick.bind(this))
        );
        this.shadowRoot.querySelector('.toggleMenu').addEventListener('click', this.toggleMenu.bind(this));
        this.shadowRoot.querySelector('.profile').addEventListener('click', this.toggleOptions.bind(this));

        document.body.style.marginLeft = '80px';
        document.body.style.transition = 'margin-left 0.3s ease';
    }

    toggleMenu() {
        const sidebar = this.shadowRoot.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
        document.body.style.marginLeft = sidebar.classList.contains('collapsed') ? '280px' : '80px';
    }

    toggleOptions() {
        const opcoes = this.shadowRoot.querySelector(".moreOptions");
        opcoes.classList.toggle("open");
    }

    handleMenuClick(event) {
        this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        // Navegar para a página correspondente
        const page = event.currentTarget.getAttribute('data-page');
        if (page) {
            window.location.href = `${page}.html`;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 80px;
                    height: 100vh;
                    background: #332C66;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px 0;
                    transition: width 0.3s ease;
                    z-index: 1000;
                }

                .sidebar.collapsed {
                    width: 295px;
                }

                .toggleMenu {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    cursor: pointer;
                    margin-bottom: 30px;
                    transition: background 0.3s;
                }

                .toggleMenu:hover {
                    background: #9193DE;
                }

                .toggleMenu .line {
                    width: 24px;
                    height: 3px;
                    background: white;
                    border-radius: 2px;
                }

                .menu {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    flex: 1;
                }

                .menu-item {
                    width: 100%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 1);
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }

                .menu-item:hover {
                    background: #9193DE;
                    color: white;
                    border-radius: 15px;
                }

                .menu-item.active {
                    background: #9193DE;
                    color: white;
                    border-radius: 15px;
                }

                .menu-item.active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 40px;
                    background: white;
                    border-radius: 0 4px 4px 0;
                }

                .menu-item svg {
                    width: 28px;
                    height: 28px;
                    fill: currentColor;
                }

                .menu-item img {
                    width: 28px;
                    height: 28px;
                    object-fit: contain;
                    mix-blend-mode: screen; 
                }

                .menu-item span {
                    display: none;
                    margin-left: 15px;
                    font-size: 16px;
                    white-space: nowrap;
                }

                .sidebar.collapsed .menu-item {
                    justify-content: flex-start;
                    padding-left: 25px;
                }

                .sidebar.collapsed .menu-item span {
                    display: inline;
                }

                .profile {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 18px;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: all 0.3s;
                }

                .profile:hover {
                    background: #9193DE;
                }


                @media (max-width: 768px) {
                    .sidebar {
                        width: 60px;
                    }

                    .sidebar.collapsed {
                        width: 200px;
                    }
                }
            </style>

            <div class="sidebar">
                <div class="toggleMenu">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>

                <nav class="menu">

                    <div class="menu-item" data-page="centralAnaliseFraude">
                        <img src="img/centralicon.png" class="menu-icon">
                        <span>Central de Análise de Fraude</span>
                    </div>

                    <div class="menu-item" data-page="painelPerformanceRisco">
                        <img src="img/painelicon.png" class="menu-icon">
                        <span>Performance de Risco</span>
                    </div>

                    <div class="menu-item" data-page="alertasPersonalizados">
                        <img src="img/alertaIcon.png" class="menu-icon">
                        <span>Alertas Personalizados</span>
                    </div>

                    <div class="menu-item" data-page="editarPerfil">
                        <img src="img/editarIcon.png" class="menu-icon">
                        <span>Editar Perfil</span>
                    </div>

                    <div class="menu-item" data-page="avaliacao">
                        <img src="img/avaliacaoicon.png" class="menu-icon">
                        <span>Avaliação</span>
                    </div>

                    <div class="menu-item" data-page="frabot">
                        <img src="img/chaticon.png" class="menu-icon">
                    <span>Frabot</span>
                    </div>

                </nav>

                <div class="profile">
                    ${(sessionStorage.NOME_USUARIO || 'V').charAt(0).toUpperCase()}
                </div>
            </div>

        `;

        this.applyRoleRules();
        this.setActivePage();
    }

    setActivePage() {
        // Detectar a página atual e marcar como ativa
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            if (itemPage === currentPage) {
                item.classList.add('active');
            }
        });
    }

    applyRoleRules() {
        const role = sessionStorage.getItem('ROLE_USER');
        
        if (role === 'Analista de Dados') {
            const manageUsers = this.shadowRoot.querySelector('.manageUsers');
            const servers = this.shadowRoot.querySelector('.servers');
            if (manageUsers) manageUsers.style.display = 'none';
            if (servers) servers.style.display = 'none';
        }

        if (role === 'Gerente') {
            const manageUsers = this.shadowRoot.querySelector('.manageUsers');
            if (manageUsers) manageUsers.style.display = 'none';
        }
    }
}

customElements.define('side-bar', SideBarComponent);