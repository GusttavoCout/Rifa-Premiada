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

// Configuração do Instagram
function setupInstagramButton() {
    const instagramButton = document.querySelector(".instagram");
    instagramButton.href = "https://www.instagram.com/tiorenatoaqui/";

    instagramButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(instagramButton.href, "_blank");
    });
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
    confetti({
        particleCount: 150, // Quantidade de partículas
        spread: 70, // Quão espalhado o efeito será
        origin: { y: 0.6 }, // Origem do efeito (parte inferior da tela)
    });
}

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
    triggerMoneyRain();
}

async function fetchRandomBrazilianName() {
    try {
        // Usamos o parâmetro "nat=br" para gerar apenas usuários brasileiros
        const response = await fetch('https://randomuser.me/api/?nat=br');
        const data = await response.json();
        const user = data.results[0];
        return `${user.name.first} ${user.name.last}`;
    } catch (error) {
        console.error('Erro ao buscar nome:', error);
        return "Novo Membro"; // Fallback caso a API falhe
    }
}

// Função para simular a entrada de novos membros
async function simulateNewMember() {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");
    const notificationSound = document.getElementById("notificationSound");

    // Busca um nome brasileiro aleatório da API
    const randomName = await fetchRandomBrazilianName();

    // Atualiza o texto da notificação
    notificationText.textContent = `${randomName} entrou no grupo!`;

    // Mostra a notificação
    notification.style.opacity = "1";
    notification.style.transform = "scale(1)";
    notificationSound.play();

    // Esconde a notificação após 5 segundos
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "scale(0.8)";
    }, 5000);

    // Agenda a próxima notificação após 15 segundos
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