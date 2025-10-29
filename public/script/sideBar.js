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
        document.body.style.marginLeft = sidebar.classList.contains('collapsed') ? '250px' : '80px';
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
                    width: 250px;
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        <span>Central de Análise de Fraude</span>
                    </div>

                    <div class="menu-item" data-page="painelPerformanceRisco">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                        </svg>
                        <span>Performance de Risco</span>
                    </div>

                    <div class="menu-item" data-page="alertasPersonalizados">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                        </svg>
                        <span>Alertas Personalizados</span>
                    </div>

                    <div class="menu-item" data-page="editarPerfil">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span>Editar Perfil</span>
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