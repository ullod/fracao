// Configurações globais
const CONFIG = {
    animationDelay: 300,
    scrollOffset: 100,
    autoScrollDuration: 800
};

// Gabaritos das questões
const GABARITOS = {
    1: 'B',  // Moedas do banco
    2: 'D',  // Divisão do prêmio
    3: 'D',  // Prestação com desconto
    4: 'C',  // Pesquisa sobre internet
    5: 'B',  // Viagem com combustível
    6: 'C',  // Exercícios de Matemática
    7: 'D',  // Ampolas de vacina
    8: 'E'   // Probabilidade de CDs (nova questão extra)
};

// Estado das questões
let questoesState = {};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função principal de inicialização
function initializeApp() {
    setupSmoothScrolling();
    setupQuestionInteractions();
    setupHeaderScroll();
    setupAnimationsOnScroll();
    initializeQuestionsState();
    setupAccessibility();
}

// Configurar scroll suave para links de navegação
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configurar interações das questões
function setupQuestionInteractions() {
    const questoes = document.querySelectorAll('.questao-card');
    
    questoes.forEach((questao, index) => {
        const questaoNum = index + 1;
        const alternativas = questao.querySelectorAll('input[type="radio"]');
        
        // Adicionar event listeners para as alternativas
        alternativas.forEach(alt => {
            alt.addEventListener('change', function() {
                handleAlternativeSelection(questaoNum, this);
            });
        });
    });
}

// Lidar com seleção de alternativas
function handleAlternativeSelection(questaoNum, selectedInput) {
    const questaoCard = selectedInput.closest('.questao-card');
    const alternativas = questaoCard.querySelectorAll('.alternativa');
    
    // Remover classes anteriores
    alternativas.forEach(alt => {
        alt.classList.remove('selected');
    });
    
    // Adicionar classe selected à alternativa escolhida
    const selectedAlternativa = selectedInput.closest('.alternativa');
    selectedAlternativa.classList.add('selected');
    
    // Salvar a resposta no estado
    questoesState[questaoNum] = {
        resposta: selectedInput.value,
        respondida: true
    };
    
    // Adicionar feedback visual suave
    selectedAlternativa.style.transform = 'scale(1.02)';
    setTimeout(() => {
        selectedAlternativa.style.transform = '';
    }, 200);
}

// Mostrar resposta comentada
function mostrarResposta(questaoNum) {
    const respostaDiv = document.getElementById(`resposta${questaoNum}`);
    const questaoCard = document.querySelector(`[data-questao="${questaoNum}"]`);
    const alternativas = questaoCard.querySelectorAll('.alternativa');
    const btnResposta = questaoCard.querySelector('.btn-resposta');
    
    if (!respostaDiv) return;
    
    // Verificar se a resposta já está visível
    if (respostaDiv.classList.contains('show')) {
        // Esconder resposta
        respostaDiv.classList.remove('show');
        btnResposta.textContent = 'Ver Resposta';
        btnResposta.style.background = 'var(--gradient-secondary)';
        
        // Remover feedback das alternativas
        alternativas.forEach(alt => {
            alt.classList.remove('correct', 'incorrect');
        });
        
        return;
    }
    
    // Mostrar resposta
    respostaDiv.classList.add('show');
    btnResposta.textContent = 'Ocultar Resposta';
    btnResposta.style.background = 'var(--gradient-primary)';
    
    // Aplicar feedback visual nas alternativas
    const gabarito = GABARITOS[questaoNum];
    alternativas.forEach(alt => {
        const input = alt.querySelector('input[type="radio"]');
        const valor = input.value;
        
        if (valor === gabarito) {
            alt.classList.add('correct');
        } else if (questoesState[questaoNum] && questoesState[questaoNum].resposta === valor) {
            alt.classList.add('incorrect');
        }
    });
    
    // Scroll suave até a resposta
    setTimeout(() => {
        const respostaPosition = respostaDiv.offsetTop - CONFIG.scrollOffset;
        window.scrollTo({
            top: respostaPosition,
            behavior: 'smooth'
        });
    }, CONFIG.animationDelay);
    
    // Atualizar estatísticas
    updateQuestionStats(questaoNum);
}

// Atualizar estatísticas da questão
function updateQuestionStats(questaoNum) {
    const userAnswer = questoesState[questaoNum]?.resposta;
    const correctAnswer = GABARITOS[questaoNum];
    
    if (userAnswer) {
        const isCorrect = userAnswer === correctAnswer;
        
        // Salvar estatística
        questoesState[questaoNum] = {
            ...questoesState[questaoNum],
            correct: isCorrect,
            viewed: true
        };
        
        // Mostrar feedback no console para debug
        console.log(`Questão ${questaoNum}: ${isCorrect ? 'Correta' : 'Incorreta'} (Resposta: ${userAnswer}, Gabarito: ${correctAnswer})`);
    }
}

// Configurar comportamento do header no scroll
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Configurar animações ao fazer scroll
function setupAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Adicionar delay para cards em sequência
                if (entry.target.classList.contains('resumo-card') || 
                    entry.target.classList.contains('questao-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.resumo-card, .questao-card, .contato-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Inicializar estado das questões
function initializeQuestionsState() {
    for (let i = 1; i <= 7; i++) {
        questoesState[i] = {
            resposta: null,
            respondida: false,
            correct: null,
            viewed: false
        };
    }
}

// Configurar acessibilidade
function setupAccessibility() {
    // Adicionar navegação por teclado para alternativas
    const alternativas = document.querySelectorAll('.alternativa');
    
    alternativas.forEach(alt => {
        alt.setAttribute('tabindex', '0');
        
        alt.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Adicionar ARIA labels
    const questoes = document.querySelectorAll('.questao-card');
    questoes.forEach((questao, index) => {
        questao.setAttribute('aria-label', `Questão ${index + 1}`);
    });
    
    // Melhorar acessibilidade dos botões de resposta
    const botoesResposta = document.querySelectorAll('.btn-resposta');
    botoesResposta.forEach((btn, index) => {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', `resposta${index + 1}`);
    });
}

// Função para obter estatísticas do usuário
function getQuestionStats() {
    const stats = {
        total: Object.keys(questoesState).length,
        respondidas: 0,
        corretas: 0,
        visualizadas: 0
    };
    
    Object.values(questoesState).forEach(q => {
        if (q.respondida) stats.respondidas++;
        if (q.correct === true) stats.corretas++;
        if (q.viewed) stats.visualizadas++;
    });
    
    stats.percentualAcerto = stats.respondidas > 0 ? (stats.corretas / stats.respondidas * 100).toFixed(1) : 0;
    
    return stats;
}

// Função para resetar todas as questões
function resetAllQuestions() {
    // Resetar estado
    initializeQuestionsState();
    
    // Resetar interface
    const questoes = document.querySelectorAll('.questao-card');
    questoes.forEach(questao => {
        // Desmarcar radios
        const radios = questao.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);
        
        // Remover classes visuais
        const alternativas = questao.querySelectorAll('.alternativa');
        alternativas.forEach(alt => {
            alt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Esconder respostas
        const resposta = questao.querySelector('.resposta-comentada');
        if (resposta) {
            resposta.classList.remove('show');
        }
        
        // Resetar botão
        const btn = questao.querySelector('.btn-resposta');
        if (btn) {
            btn.textContent = 'Ver Resposta';
            btn.style.background = 'var(--gradient-secondary)';
        }
    });
}

// Função para exportar estatísticas (útil para análise)
function exportStats() {
    const stats = getQuestionStats();
    const detailedStats = {
        ...stats,
        questoes: questoesState,
        timestamp: new Date().toISOString()
    };
    
    console.log('Estatísticas detalhadas:', detailedStats);
    return detailedStats;
}

// Função para mostrar/esconder todas as respostas
function toggleAllAnswers(show = null) {
    const questoes = document.querySelectorAll('.questao-card');
    
    questoes.forEach((questao, index) => {
        const questaoNum = index + 1;
        const resposta = questao.querySelector('.resposta-comentada');
        const isShowing = resposta && resposta.classList.contains('show');
        
        if (show === null) {
            // Toggle individual
            if (isShowing) {
                mostrarResposta(questaoNum);
            } else {
                mostrarResposta(questaoNum);
            }
        } else if (show && !isShowing) {
            // Mostrar todas
            mostrarResposta(questaoNum);
        } else if (!show && isShowing) {
            // Esconder todas
            mostrarResposta(questaoNum);
        }
    });
}

// Funções utilitárias para debugging
window.bancaExataDebug = {
    getStats: getQuestionStats,
    exportStats: exportStats,
    resetQuestions: resetAllQuestions,
    showAllAnswers: () => toggleAllAnswers(true),
    hideAllAnswers: () => toggleAllAnswers(false),
    getState: () => questoesState
};

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        
        // Easter egg ativado!
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Parabéns! Você encontrou o easter egg da Banca Exata! 🎉');
        }, 2000);
        
        konamiCode = [];
    }
});

// Adicionar animação rainbow para o easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Função para melhorar a performance em dispositivos móveis
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduzir animações em dispositivos móveis
        document.documentElement.style.setProperty('--transition-normal', '0.2s ease');
        document.documentElement.style.setProperty('--transition-slow', '0.3s ease');
        
        // Adicionar classe para otimizações mobile
        document.body.classList.add('mobile-optimized');
    }
}

// Executar otimizações mobile
optimizeForMobile();
window.addEventListener('resize', optimizeForMobile);

// Service Worker para cache (PWA básico)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Registrar service worker apenas em produção
        if (location.protocol === 'https:' || location.hostname === 'localhost') {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        }
    });
}

console.log('🎓 Banca Exata - Sistema carregado com sucesso!');
console.log('💡 Digite bancaExataDebug no console para ver funções de debug disponíveis.');
