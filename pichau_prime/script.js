/**
 * PICHAU PRIME - JAVASCRIPT
 */

// ========== INICIALIZAÇÃO ========== //
document.addEventListener('DOMContentLoaded', function() {
    if (window.PichauContentRenderer && typeof window.PichauContentRenderer.applyPrime === 'function') {
        window.PichauContentRenderer.applyPrime();
    }

    initThemeToggle();
    initNavigation();
    initAnimations();
    initFAQ();
    initScrollEffects();
    trackUserBehavior();
});

// ========== DARK MODE TOGGLE ========== //
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Carrega preferência salva
    const savedTheme = localStorage.getItem('pichau-prime-theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Salva preferência
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('pichau-prime-theme', isDark ? 'dark' : 'light');
        
        // Adiciona micro-animação de feedback
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });
}

// ========== NAVEGAÇÃO ========== //
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animação do menu hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(12px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
    
    // Smooth scroll e fecha menu ao clicar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Fecha menu mobile
                    navMenu.classList.remove('active');
                    if (menuToggle) {
                        const spans = menuToggle.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.transform = 'none';
                            span.style.opacity = '1';
                        });
                    }
                    
                    // Scroll suave
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Destaque do link ativo baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========== ANIMAÇÕES ON SCROLL ========== //
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                
                // Não observa mais depois de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== FAQ ACCORDION ========== //
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todas as outras FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle da FAQ clicada
            faqItem.classList.toggle('active');
            
            // Track evento (analytics)
            if (!isActive) {
                trackEvent('FAQ', 'Open', question.querySelector('span').textContent);
            }
        });
    });
}

// ========== EFEITOS DE SCROLL ========== //
function initScrollEffects() {
    // Parallax suave no hero
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }, { passive: true });
    }
    
    // Efeito no header ao rolar
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// ========== TRACKING DE COMPORTAMENTO ========== //
function trackUserBehavior() {
    // Tempo na página
    let timeOnPage = 0;
    const trackingInterval = setInterval(() => {
        timeOnPage++;
        
        // A cada 30 segundos, salva progresso
        if (timeOnPage % 30 === 0) {
            trackEvent('Engagement', 'Time', `${timeOnPage}s`);
        }
    }, 1000);
    
    // Scroll depth (profundidade do scroll)
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > maxScroll) {
            maxScroll = Math.round(scrollPercentage);
            
            // Track marcos importantes
            if (maxScroll >= 25 && maxScroll < 30) {
                trackEvent('Scroll', 'Depth', '25%');
            } else if (maxScroll >= 50 && maxScroll < 55) {
                trackEvent('Scroll', 'Depth', '50%');
            } else if (maxScroll >= 75 && maxScroll < 80) {
                trackEvent('Scroll', 'Depth', '75%');
            } else if (maxScroll >= 90) {
                trackEvent('Scroll', 'Depth', '100%');
            }
        }
    }, 500), { passive: true });
    
    // Interações com CTAs
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            trackEvent('CTA', 'Click', `Button ${index + 1}`);
            
            // Efeito visual de feedback
            createClickEffect(btn);
        });
    });
    
    // Hover nos cards de pricing (intenção de compra)
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        let hoverTime = 0;
        let hoverInterval;
        
        card.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(() => {
                hoverTime++;
                
                // Se passar 3 segundos no hover, é um forte indicador de interesse
                if (hoverTime === 3) {
                    trackEvent('Pricing', 'Interest', `Plan ${index + 1}`);
                }
            }, 1000);
        });
        
        card.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            hoverTime = 0;
        });
    });
    
    // Exit intent (tentativa de sair da página)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            // Usuário está tentando sair
            trackEvent('Exit Intent', 'Detected', 'Mouse Leave');
            
            // Em produção, poderia mostrar modal de última chance
            // showExitIntentModal();
        }
    });
}

// ========== EFEITO DE CLIQUE ========== //
function createClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    Object.assign(ripple.style, {
        position: 'fixed',
        left: rect.left + rect.width / 2 + 'px',
        top: rect.top + rect.height / 2 + 'px',
        width: '0px',
        height: '0px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.6)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: '10000',
        transition: 'width 0.6s, height 0.6s, opacity 0.6s'
    });
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========== CONTADOR DE URGÊNCIA ========== //
function createUrgencyTimer(element, hours = 24) {
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.textContent = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
        
        if (distance < 0) {
            element.textContent = 'Oferta Encerrada';
            clearInterval(timerInterval);
        }
    }
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// ========== SIMULADOR DE ECONOMIA ========== //
function calculateSavings(purchases = 3, avgShipping = 30, avgDiscount = 50) {
    const primeMonthly = 19.90;
    const primeAnnual = 190.00;
    
    const monthlyShipping = purchases * avgShipping;
    const monthlyDiscounts = purchases * avgDiscount;
    const monthlySavings = monthlyShipping + monthlyDiscounts - primeMonthly;
    
    const annualShipping = purchases * 12 * avgShipping;
    const annualDiscounts = purchases * 12 * avgDiscount;
    const annualSavings = annualShipping + annualDiscounts - primeAnnual;
    
    return {
        monthly: monthlySavings,
        annual: annualSavings
    };
}

// ========== TRACKING DE EVENTOS ========== //
function trackEvent(category, action, label) {
    console.log('Event Tracked:', { category, action, label });
    
    // Em produção, integraria com Google Analytics ou similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// ========== UTILITÁRIOS ========== //
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== MODAL DE EXIT INTENT ========== //
function showExitIntentModal() {
    // Verifica se já mostrou modal
    if (sessionStorage.getItem('exit-modal-shown')) {
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'exit-modal';
    modal.innerHTML = `
        <div class="exit-modal-overlay"></div>
        <div class="exit-modal-content">
            <button class="exit-modal-close">&times;</button>
            <h2>Espere! Não Vá Ainda!</h2>
            <p>Teste o Pichau Prime <strong>GRÁTIS por 30 dias</strong> e veja quanto você economiza</p>
            <div class="exit-modal-offer">
                <span class="offer-badge">OFERTA EXCLUSIVA</span>
                <p class="offer-text">+ Cupom de R$ 50 no primeiro pedido</p>
            </div>
            <button class="btn btn-primary">Experimentar Grátis Agora</button>
            <p class="modal-note">Sem cartão de crédito. Cancele quando quiser.</p>
        </div>
    `;
    
    // Estilos do modal
    const style = document.createElement('style');
    style.textContent = `
        .exit-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .exit-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .exit-modal-content {
            position: relative;
            background: var(--bg-primary-dark);
            padding: 60px;
            border-radius: 24px;
            max-width: 600px;
            text-align: center;
            border: 2px solid var(--primary-gold);
            animation: slideUp 0.4s;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .exit-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            color: var(--text-primary-dark);
            font-size: 2rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .exit-modal-close:hover {
            opacity: 1;
        }
        
        .exit-modal-content h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .exit-modal-content > p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .exit-modal-offer {
            background: rgba(255, 215, 0, 0.1);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 30px;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        
        .offer-badge {
            display: inline-block;
            background: var(--gradient-primary);
            color: #fff;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .offer-text {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-gold);
        }
        
        .modal-note {
            margin-top: 20px;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.exit-modal-overlay').addEventListener('click', () => {
        modal.remove();
        sessionStorage.setItem('exit-modal-shown', 'true');
    });
    
    modal.querySelector('.exit-modal-close').addEventListener('click', () => {
        modal.remove();
        sessionStorage.setItem('exit-modal-shown', 'true');
    });
    
    modal.querySelector('.btn').addEventListener('click', () => {
        trackEvent('Exit Intent', 'Conversion', 'Modal CTA');
        window.location.href = '#pricing';
        modal.remove();
    });
    
    trackEvent('Exit Intent', 'Modal Shown', 'First Time');
    sessionStorage.setItem('exit-modal-shown', 'true');
}

// ========== CHAT/SUPORTE INTERATIVO ========== //
function initLiveChat() {
    // Em produção, integraria com sistema de chat real
    const chatButton = document.createElement('button');
    chatButton.className = 'chat-button';
    chatButton.innerHTML = '<i class="fas fa-comments"></i>';
    chatButton.title = 'Precisa de ajuda?';
    
    Object.assign(chatButton.style, {
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        border: 'none',
        borderRadius: '50%',
        color: '#fff',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 5px 20px rgba(16, 185, 129, 0.4)',
        zIndex: '1000',
        transition: 'transform 0.3s'
    });
    
    chatButton.addEventListener('click', () => {
        trackEvent('Support', 'Chat', 'Opened');
        alert('Chat em desenvolvimento...');
    });
    
    chatButton.addEventListener('mouseenter', () => {
        chatButton.style.transform = 'scale(1.1)';
    });
    
    chatButton.addEventListener('mouseleave', () => {
        chatButton.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(chatButton);
}

// Inicializa chat depois de 5 segundos
setTimeout(initLiveChat, 5000);
