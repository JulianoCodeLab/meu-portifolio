// Remove foco automático do botão tema ao carregar
window.addEventListener('DOMContentLoaded', () => {
  document.activeElement && document.activeElement.blur();
});

const emojis = ['🌟', '🚀', '💡', '📚', '🎯', '🧠']; // 6 pares
let board = [...emojis, ...emojis];
board.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const messageEl = document.getElementById('message');
const infoEl = document.getElementById('info');
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const statsModal = document.getElementById('stats-modal');
const statsAttempts = document.getElementById('stats-attempts');
const statsMatches = document.getElementById('stats-matches');
const statsAccuracy = document.getElementById('stats-accuracy');

let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
let attempts = 0;
let isDarkMode = false;

// Informações do portfólio para mostrar a cada ponto
const portfolioInfos = [
  "Eu possuo 3 anos de exp com desenvolvimento e analise de dados, onde trabalhei com Python, SQL, Java e PHP.",
  "Estou concluindo meu curso de Análise e Desenvolvimento de Sistemas, onde possuo alguns premios de destaques em projetos",
  "Atualmente sou Analista de sistemas Jr, onde trabalho com Python e SQL, aplicados a dados e desenvolvimento.",
  "No meu dia a dia, o uso de analitica em dados é constante, e por isso, tenho um bom conhecimento em Power BI.",
  "Além disto, conhecimento em alitica, o que facilita meu desenvolvimento profissional em dados e desenvolvimento .",
  "Nestes 3 anos de experiência desenvolvo minhas habilidades em ferramentas de modelagem e visualização de dados como o Power BI.",
  "Durante minha trajetória, venho combinando e desenvolvendo minha capacidade analitica e conhecimento em ferramentas as regras de negocio.",
];

// Cria as cartas no tabuleiro
board.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Carta de memória');
  card.innerHTML = "";
  gameBoard.appendChild(card);
});

// Delegação de eventos para as cartas
gameBoard.addEventListener('click', (e) => {
  if (e.target.classList.contains('card')) {
    flipCard(e.target);
  }
});

gameBoard.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) {
    e.preventDefault();
    flipCard(e.target);
  }
});

function flipCard(card) {
  if (lockBoard || card.classList.contains('flipped')) return;

  // Limpa info ao virar nova carta
  if (flippedCards.length === 0) {
    infoEl.style.opacity = 0;
    infoEl.style.pointerEvents = 'none';
    infoEl.textContent = "";
  }

  card.classList.add('flipped');
  card.innerHTML = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    attempts++;
    const [first, second] = flippedCards;

    if (first.dataset.emoji === second.dataset.emoji) {
      matchedPairs++;
      showInfo(getRandomInfo());
      flippedCards = [];
      lockBoard = false;

      if (matchedPairs === emojis.length) {
        showStats();
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.innerHTML = "";
        second.innerHTML = "";
        flippedCards = [];
        lockBoard = false;
        infoEl.style.opacity = 0;
        infoEl.style.pointerEvents = 'none';
        infoEl.textContent = "";
      }, 800);
    }
  }
}

let messageTimeout;
function showMessage(text) {
  clearTimeout(messageTimeout);
  messageEl.textContent = text;
  messageEl.style.opacity = '1';
  messageEl.style.pointerEvents = 'auto';
  messageEl.style.animation = 'popInOut 2.5s ease forwards';
  messageTimeout = setTimeout(() => {
    messageEl.style.opacity = '0';
    messageEl.style.pointerEvents = 'none';
  }, 2500);
}

function showInfo(text) {
  infoEl.textContent = text;
  infoEl.classList.add('show'); // Adiciona a classe que faz aparecer
  
  // Esconde após alguns segundos
  setTimeout(() => {
    infoEl.classList.remove('show');
  }, 4000); // 4 segundos
}

function getRandomInfo() {
  return portfolioInfos[Math.floor(Math.random() * portfolioInfos.length)];
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  body.classList.toggle('dark-mode', isDarkMode);
}

themeToggleBtn.addEventListener('click', toggleDarkMode);

function showStats() {
  const accuracy = ((matchedPairs / attempts) * 100).toFixed(1);
  statsAttempts.textContent = `Tentativas: ${attempts}`;
  statsMatches.textContent = `Acertos: ${matchedPairs}`;
  statsAccuracy.textContent = `Precisão: ${accuracy}%`;
  statsModal.classList.add('active');
  statsModal.focus();
}

// Fecha modal ao clicar fora do conteúdo
statsModal.addEventListener('click', (e) => {
  if (e.target === statsModal) {
    statsModal.classList.remove('active');
  }
});

// Remove qualquer foco automático ao carregar
// Já otimizado com 'DOMContentLoaded' no início

// Inicializa tema claro
body.classList.remove('dark-mode');


// Elementos da nova interface
const loader = document.getElementById('loader');
const welcomeScreen = document.getElementById('welcome-screen');
const playGameBtn = document.getElementById('play-game-btn');
const directPortfolioBtn = document.getElementById('direct-portfolio-btn');

// Fluxo de carregamento
window.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
  loader.classList.remove('active');
  setTimeout(() => {
    welcomeScreen.classList.add('active');
  }, 300);
}, 1500); // Tempo simulado de carregamento
});

// Opção: Jogar o Jogo
playGameBtn.addEventListener('click', () => {
welcomeScreen.classList.remove('active');
// O jogo já está pronto para ser jogado
});

// Opção: Acessar Portfólio Direto
directPortfolioBtn.addEventListener('click', () => {
window.location.href = "portfolio.html"; // Substitua pelo link real
});

//-------------------------------------

// Controle de Música Global
const globalMusicToggle = document.getElementById('global-music-toggle');
const backgroundMusic = document.getElementById('background-music');

// Controle de Tema Global
const globalThemeToggle = document.getElementById('global-theme-toggle');

// Sincroniza com os botões existentes (se houver)
document.addEventListener('DOMContentLoaded', () => {
// Música
globalMusicToggle?.addEventListener('click', () => {
  backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();
  globalMusicToggle.classList.toggle('music-off', !backgroundMusic.paused);
});

// Tema
globalThemeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Remove os botões antigos se existirem
const oldThemeBtn = document.getElementById('theme-toggle');
const oldMusicBtn = document.getElementById('music-toggle');
oldThemeBtn?.remove();
oldMusicBtn?.remove();
});

function redirecionarParaPortfolio() {
  window.location.href = "index.html";
}

document.getElementById("direct-portfolio-btn").addEventListener("click", redirecionarParaPortfolio);
