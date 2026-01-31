// PICHAU STORE - JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initWishlist();
    initCountdown();
    initSearch();
});

// Carrinho de compras
function initCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    let cart = [];

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;

            cart.push({ name: productName, price: productPrice });
            cartCount.textContent = cart.length;

            // Feedback visual
            this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
            this.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar';
                this.style.background = '';
            }, 2000);

            showNotification('Produto adicionado ao carrinho!');
        });
    });
}

// Lista de desejos
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    let wishlist = [];

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;

            if (this.querySelector('i').classList.contains('far')) {
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
                this.style.color = '#ff6700';
                wishlist.push(productName);
                showNotification('Adicionado aos favoritos!');
            } else {
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
                this.style.color = '';
                wishlist = wishlist.filter(item => item !== productName);
                showNotification('Removido dos favoritos!');
            }
        });
    });
}

// Contador regressivo
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (distance < 0) {
            countdownEl.textContent = 'Oferta encerrada';
            clearInterval(countdownInterval);
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Busca de produtos
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Buscando por:', query);
            showNotification(`Buscando por "${query}"...`);
        }
    }
}

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        fontWeight: '600',
        zIndex: '10000',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
