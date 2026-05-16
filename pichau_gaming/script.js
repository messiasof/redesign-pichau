/**
 * PICHAU GAMING - JAVASCRIPT
 */

// ========== INICIALIZAÇÃO ========== //
document.addEventListener('DOMContentLoaded', function() {
    if (window.PichauContentRenderer && typeof window.PichauContentRenderer.applyGaming === 'function') {
        window.PichauContentRenderer.applyGaming();
    }

    initNavigation();
    initScrollEffects();
    initAOS();
    initProductInteractions();
    initBackToTop();
    initLazyLoading();
});

// ========== NAVEGAÇÃO ========== //
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de scroll na navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adiciona classe scrolled quando rolar para baixo
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Toggle menu mobile
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animação do hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fecha menu ao clicar em link (melhora UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Highlight do link ativo baseado na seção visível
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

// ========== EFEITOS DE SCROLL ========== //
function initScrollEffects() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ANIMAÇÃO AOS (ANIMATE ON SCROLL) ========== //
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com atributo data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// ========== INTERAÇÕES COM PRODUTOS ========== //
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    
    // Efeito hover nos cards de produto
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Adicionar ao carrinho com feedback visual
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animação de sucesso
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
            this.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            
            // Cria efeito de partículas
            createParticleEffect(this);
            
            // Volta ao estado original após 2 segundos
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
            
            // Simula atualização do carrinho (em produção, conectaria com backend)
            showCartNotification();
        });
    });
    
    // Visualização rápida dos produtos
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showQuickViewModal(this);
        });
    });
}

// ========== NOTIFICAÇÃO DO CARRINHO ========== //
function showCartNotification() {
    // Verifica se já existe notificação
    let notification = document.querySelector('.cart-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Produto adicionado ao carrinho!</span>
        `;
        
        // Estilos inline para a notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
            color: '#0a0a0a',
            padding: '16px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: '10000',
            boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
    }
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animação de saída
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========== EFEITO DE PARTÍCULAS ========== //
// Micro-interação que aumenta satisfação do usuário
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-effect';
        
        Object.assign(particle.style, {
            position: 'fixed',
            left: rect.left + rect.width / 2 + 'px',
            top: rect.top + rect.height / 2 + 'px',
            width: '8px',
            height: '8px',
            background: 'var(--primary-orange)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '10000'
        });
        
        document.body.appendChild(particle);
        
        // Animação da partícula
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let opacity = 1;
        let posX = 0;
        let posY = 0;
        
        const animate = () => {
            posX += vx * 0.016;
            posY += vy * 0.016;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// ========== MODAL DE VISUALIZAÇÃO RÁPIDA ========== //
// Reduz fricção na decisão de compra
function showQuickViewModal(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    const productPrice = productCard.querySelector('.price-current').textContent;
    
    // Cria modal se não existir
    let modal = document.querySelector('.quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="" alt="">
                    </div>
                    <div class="modal-info">
                        <h3 class="modal-title"></h3>
                        <div class="modal-price"></div>
                        <p class="modal-description">
                            Produto de alta qualidade com garantia estendida e suporte completo.
                            Especificações técnicas detalhadas disponíveis na página do produto.
                        </p>
                        <div class="modal-actions">
                            <button class="btn btn-primary modal-add-cart">
                                <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                            </button>
                            <button class="btn btn-secondary modal-view-details">
                                Ver Detalhes Completos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos do modal
        const style = document.createElement('style');
        style.textContent = `
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
            }
            
            .quick-view-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: relative;
                background: var(--dark-secondary);
                border-radius: 20px;
                max-width: 900px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid rgba(255, 103, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s;
            }
            
            .quick-view-modal.active .modal-content {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(255, 103, 0, 0.2);
                border: 1px solid var(--primary-orange);
                border-radius: 50%;
                color: var(--text-light);
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s;
                z-index: 10;
            }
            
            .modal-close:hover {
                background: var(--primary-orange);
                transform: rotate(90deg);
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                padding: 40px;
            }
            
            .modal-image img {
                width: 100%;
                border-radius: 12px;
            }
            
            .modal-title {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 20px;
            }
            
            .modal-price {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--primary-orange);
                margin-bottom: 20px;
            }
            
            .modal-description {
                color: var(--text-gray);
                line-height: 1.8;
                margin-bottom: 30px;
            }
            
            .modal-actions {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    gap: 20px;
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Event listeners do modal
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.querySelector('.modal-add-cart').addEventListener('click', () => {
            showCartNotification();
            modal.classList.remove('active');
        });
        
        modal.querySelector('.modal-view-details').addEventListener('click', () => {
            // Em produção, redirecionaria para página do produto
            alert('Redirecionando para página do produto...');
        });
    }
    
    // Atualiza conteúdo do modal
    modal.querySelector('.modal-image img').src = productImage;
    modal.querySelector('.modal-title').textContent = productName;
    modal.querySelector('.modal-price').textContent = productPrice;
    
    // Mostra modal
    modal.classList.add('active');
}

// ========== BOTÃO VOLTAR AO TOPO ========== //
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== LAZY LOADING DE IMAGENS ========== //
// Otimização de performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== CONTADOR DE URGÊNCIA ========== //
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

// ========== TRACKING DE EVENTOS (Analytics) ========== //
// Em produção, integraria com Google Analytics ou similar
function trackEvent(category, action, label) {
    console.log('Event Tracked:', { category, action, label });
    
    // Exemplo de integração com Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// ========== PERSONALIZAÇÃO BASEADA NO USUÁRIO ========== //
function saveUserPreferences() {
    const preferences = {
        viewedProducts: [],
        favoriteCategories: [],
        lastVisit: new Date().toISOString()
    };
    
    localStorage.setItem('pichau_gaming_prefs', JSON.stringify(preferences));
}

// ========== OTIMIZAÇÃO DE PERFORMANCE ========== //
// Debounce para eventos frequentes
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

// Throttle para scroll events
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

// ========== PRELOAD DE CONTEÚDO CRÍTICO ========== //
// Melhora percepção de velocidade
window.addEventListener('load', () => {
    // Precarrega imagens importantes
    const criticalImages = [
        // URLs de imagens críticas
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
