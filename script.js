// Função para iniciar o timer
function startTimer(endTime) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        // Se o tempo acabar, pare o timer
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "🎉 O sorteio começou!";
            localStorage.removeItem("endTime"); // Remove o tempo salvo
            return;
        }

        // Calcula dias, horas, minutos e segundos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Atualiza o timer na tela
        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

        // Salva o tempo restante no localStorage
        localStorage.setItem("endTime", endTime);
    }, 1000);
}

// Notificações
function simulateNewMember() {
    const notification = document.getElementById("notification");
    const notificationSound = document.getElementById("notificationSound");

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "scale(1)";
        notificationSound.play();
    }, 5000);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "scale(0.8)";
    }, 10000);
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
function initialize() {
    // Timer
    let endTime = localStorage.getItem("endTime");

    if (endTime) {
        // Se houver, usa o tempo salvo
        endTime = parseInt(endTime);
    } else {
        // Se não houver, define um novo tempo (6 dias, 4 horas e 20 minutos)
        const dias = 6;
        const horas = 4;
        const minutos = 20;

        const tempoTotal = (dias * 86400000) + (horas * 3600000) + (minutos * 60000);
        endTime = new Date().getTime() + tempoTotal;
    }

    startTimer(endTime);

    // Notificações
    simulateNewMember();

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

// Lista de nomes fictícios para simulação
const names = [
    "João Silva", "Maria Souza", "Carlos Oliveira", "Ana Costa", "Pedro Santos",
    "Lucas Pereira", "Fernanda Lima", "Rafael Almeida", "Juliana Ribeiro", "Gabriel Martins"
];

// Função para simular a entrada de novos membros
function simulateNewMember() {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");
    const notificationSound = document.getElementById("notificationSound");

    // Escolhe um nome aleatório da lista
    const randomName = names[Math.floor(Math.random() * names.length)];

    // Atualiza o texto do popup
    notificationText.textContent = ` ${randomName} acabou de entrar no grupo!`;

    // Mostra o popup
    notification.style.opacity = "1";
    notification.style.transform = "scale(1)";
    notificationSound.play();

    // Esconde o popup após alguns segundos
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "scale(0.8)";
    }, 10000); // 10 segundos
}

// Simula a entrada de novos membros a cada 5 segundos (para teste)
setInterval(simulateNewMember, 5000);

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