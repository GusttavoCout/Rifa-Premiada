// Função para buscar o tempo final do sorteio da API
async function fetchEndTime() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GusttavoCout/Rifa-Premiada/refs/heads/main/sorteio.json?v=' + Date.now());
        const data = await response.json();
        return new Date(data.endTime).getTime(); // Converte para timestamp
    } catch (error) {
        console.error('Erro ao buscar o tempo final do sorteio:', error);
        return null;
    }
}

// Função para iniciar o timer
function startTimer(endTime) {
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            document.getElementById("timer").innerHTML = "🎉 O sorteio começou!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

        requestAnimationFrame(updateTimer);
    }

    updateTimer();
}

// Configuração do Instagram (função vazia, pois o botão foi removido)
function setupInstagramButton() {
    console.log("Botão do Instagram removido. Nada para configurar.");
}

// Segurança (bloqueio de botão direito, F12, etc.)
function setupSecurity() {
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "F12" || 
            (event.ctrlKey && event.shiftKey && event.key === "I") || 
            (event.ctrlKey && event.key === "U")
        ) {
            event.preventDefault();
        }
    });

    setInterval(() => {
        const before = new Date().getTime();
        debugger;
        const after = new Date().getTime();
        if (after - before > 100) {
            window.location.href = "about:blank";
        }
    }, 1000);
}

// Interação com o mouse (fazer os trevos desaparecerem ao passar o mouse)
function setupCloverInteraction() {
    const trevos = document.querySelectorAll(".clover");

    trevos.forEach((trevo) => {
        trevo.addEventListener("mouseenter", () => {
            trevo.style.opacity = "0"; // Faz o trevo desaparecer
            trevo.style.transition = "opacity 0.5s ease"; // Adiciona uma transição suave
        });

        trevo.addEventListener("mouseleave", () => {
            trevo.style.opacity = "0.7"; // Faz o trevo reaparecer
        });
    });
}

// Função para disparar confetes
function triggerConfetti() {
    console.log("Disparando confetes...");

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
    });

    // Verifique se o canvas foi criado
    const canvas = document.querySelector('canvas');
    if (canvas) {
        console.log("Canvas encontrado:", canvas);
    } else {
        console.error("Canvas não encontrado!");
    }
}

// Inicia os confetes automaticamente ao carregar a página
window.onload = triggerConfetti;

// Inicialização
async function initialize() {
    // Timer
    let endTime = await fetchEndTime(); // Busca o tempo final do sorteio online

    if (!endTime) {
        // Se não conseguir buscar o tempo final, define um tempo padrão (6 dias, 4 horas e 20 minutos)
        const dias = 6;
        const horas = 4;
        const minutos = 20;

        const tempoTotal = (dias * 86400000) + (horas * 3600000) + (minutos * 60000);
        endTime = new Date().getTime() + tempoTotal;
    }

    startTimer(endTime);

    // Instagram
    setupInstagramButton();

    // Segurança
    setupSecurity();

    // Interação com os trevos
    setupCloverInteraction();

    // Confetes e dinheiro caindo
    triggerConfetti();
}

// Lista de nomes populares brasileiros (alguns com sobrenome, outros sem)
const brazilianNames = [
    "João Silva", "Maria", "Carlos Oliveira", "Ana", "Pedro Santos",
    "Lucas", "Fernanda Lima", "Rafael", "Juliana Ribeiro", "Gabriel",
    "Mariana", "Rodrigo Gomes", "Patrícia", "Bruno Carvalho", "Camila",
    "Gustavo Henrique", "Isabela", "Thiago", "Amanda Costa", "Felipe",
    "Larissa", "Diego Almeida", "Vanessa", "Ricardo", "Beatriz",
    "Roberto", "Tatiane", "Leonardo", "Cristiane", "Marcos Fernandes",
    "Eduardo", "Carolina", "Vinícius", "Daniela", "André",
    "Tatiana", "Renato", "Priscila", "Fábio", "Simone",
    "Alexandre", "Márcia", "Paulo", "Cíntia", "Maurício",
    "Sandra", "Rogério", "Luciana", "Marcelo", "Elaine",
    "Adriana", "Bruno", "Carla", "Daniel", "Ester",
    "Rafaela", "José", "Cláudia", "Antônio", "Luiza",
    "Fábio", "Helena", "Ricardo", "Isabella", "Vitor"
];

// Função para selecionar um nome aleatório da lista
function getRandomBrazilianName() {
    const randomIndex = Math.floor(Math.random() * brazilianNames.length);
    return brazilianNames[randomIndex];
}

// Função para simular a entrada de novos membros
async function simulateNewMember() {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");
    const notificationSound = document.getElementById("notificationSound");
    const bellIcon = document.querySelector(".bell-icon");

    // Busca um nome aleatório da lista
    const randomName = getRandomBrazilianName();

    // Atualiza o texto da notificação
    notificationText.textContent = `${randomName} acabou de entrar no grupo!`;

    // Mostra a notificação
    notification.style.opacity = "1";
    notification.style.transform = "scale(1)";
    notificationSound.play();

    // Remove a classe de animação (se já estiver aplicada)
    bellIcon.classList.remove("ring");

    // Força um reflow no navegador (reinicia a animação)
    void bellIcon.offsetWidth;

    // Adiciona a classe de animação ao sininho
    bellIcon.classList.add("ring");

    // Remove a classe de animação após o término
    setTimeout(() => {
        bellIcon.classList.remove("ring");
    }, 500); // Tempo da animação (0.5s)

    // Esconde a notificação após 5 segundos
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "scale(0.8)";
    }, 5000);

    // Agenda a próxima notificação após 20 segundos
    setTimeout(simulateNewMember, 20000);
}

// Inicia a primeira notificação após 10 segundos
setTimeout(simulateNewMember, 10000);

// Inicia tudo quando a página carregar
window.onload = initialize;

// Configuração das partículas
particlesJS("particles-js", {
    particles: {
        number: {
            value: 30, // Quantidade de partículas
            density: {
                enable: true,
                value_area: 800, // Área de densidade das partículas
            },
        },
        color: {
            value: "#ffffff", // Cor das partículas (branco)
        },
        shape: {
            type: "circle", // Formato das partículas (círculo)
        },
        opacity: {
            value: 0.5, // Opacidade das partículas
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3, // Tamanho das partículas
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: false, // Desativa as linhas entre as partículas
        },
        move: {
            enable: true,
            speed: 1, // Velocidade de movimento das partículas
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out", // Comportamento ao sair do contêiner
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false, // Desativa interação ao passar o mouse
            },
            onclick: {
                enable: false, // Desativa interação ao clicar
            },
            resize: true,
        },
    },
    retina_detect: true,
});

// Garante que a página não role além do conteúdo
window.addEventListener('scroll', function () {
    if (window.scrollY < 0) {
        window.scrollTo(0, 0); // Impede rolagem para cima além do topo
    }
    if (window.scrollY + window.innerHeight > document.body.scrollHeight) {
        window.scrollTo(0, document.body.scrollHeight - window.innerHeight); // Impede rolagem para baixo além do final
    }
});