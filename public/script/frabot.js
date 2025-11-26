const chatDiv = document.getElementById("chat");
const userInput = document.getElementById("userMessage");
const sendBtn = document.getElementById("sendMessage");

let historico = [];

// Pega a inicial do usuário do sessionStorage (igual à sidebar)
function getUserInitial() {
    const nomeUsuario = sessionStorage.getItem('NOME_USUARIO') || 'V';
    return nomeUsuario.charAt(0).toUpperCase();
}

// Adiciona mensagem do usuário
function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    
    if (sender === "user") {
        div.setAttribute("data-user-initial", getUserInitial());
    }
    
    div.innerHTML = text;
    chatDiv.appendChild(div);
    
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Cria animação de "pensando"
function showThinking() {
    const div = document.createElement("div");
    div.classList.add("message", "bot", "thinking");
    div.id = "thinking-indicator";
    
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("thinking-dots");
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span");
        dotsContainer.appendChild(dot);
    }
    
    div.appendChild(dotsContainer);
    chatDiv.appendChild(div);
    chatDiv.scrollTop = chatDiv.scrollHeight;
    
    return div;
}

// Remove animação de "pensando"
function removeThinking() {
    const thinking = document.getElementById("thinking-indicator");
    if (thinking) {
        thinking.remove();
    }
}

// Efeito de digitação para a resposta do bot
function typeMessage(text, element) {
    return new Promise((resolve) => {
        let index = 0;
        const speed = 10; // velocidade da digitação (ms por caractere)
        
        element.innerHTML = '';
        
        const cursor = document.createElement("span");
        cursor.classList.add("typing-cursor");
        element.appendChild(cursor);
        
        function type() {
            if (index < text.length) {
                const char = text.charAt(index);
                const textNode = document.createTextNode(char);
                element.insertBefore(textNode, cursor);
                index++;
                chatDiv.scrollTop = chatDiv.scrollHeight;
                setTimeout(type, speed);
            } else {
                cursor.remove();
                resolve();
            }
        }
        
        type();
    });
}

// Adiciona resposta do bot com efeito de digitação
async function addBotMessageWithTyping(text) {
    const div = document.createElement("div");
    div.classList.add("message", "bot");
    chatDiv.appendChild(div);
    
    await typeMessage(text, div);
    
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function enviarMensagem() {
    const msg = userInput.value.trim();
    if (msg === "") return;

    addMessage(msg, "user");

    historico.push({
        role: "user",
        content: msg
    });

    userInput.value = "";

    // Mostra animação de "pensando"
    const thinkingDiv = showThinking();

    try {
        const res = await fetch("/rag/consultar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pergunta: msg,
                historico
            })
        });

        const data = await res.json();

        // Aguarda um pouco para dar sensação de "processamento"
        await new Promise(resolve => setTimeout(resolve, 800));

        // Remove "pensando"
        removeThinking();

        // Adiciona resposta com efeito de digitação
        await addBotMessageWithTyping(data.resposta);

        historico.push({
            role: "assistant",
            content: data.resposta
        });

    } catch (err) {
        removeThinking();
        addMessage("⚠️ Erro ao consultar o Frabot. Por favor, tente novamente.", "bot");
        console.error(err);
    }
}

sendBtn.addEventListener("click", enviarMensagem);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});

// Foco automático no input quando a página carregar
window.addEventListener("load", () => {
    userInput.focus();
});