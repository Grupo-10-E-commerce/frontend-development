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
                    <div class="menu-item active" data-page="home">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        <span>Início</span>
                    </div>

                    <div class="menu-item" data-page="dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                        </svg>
                        <span>Dashboard</span>
                    </div>

                    <div class="menu-item" data-page="docs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        <span>Alertas Personalizados</span>
                    </div>

                    <div class="menu-item" data-page="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span>Editar Perfil</span>
                    </div>

                </nav>

                <div class="profile">
                    ${(sessionStorage.NAME_USER || 'L').charAt(0).toUpperCase()}
                </div>
            </div>

        `;

        this.applyRoleRules();
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