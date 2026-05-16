// PICHAU STORE - JAVASCRIPT
const storeCart = [];

document.addEventListener('DOMContentLoaded', function() {
    if (window.PichauContentRenderer && typeof window.PichauContentRenderer.applyStore === 'function') {
        window.PichauContentRenderer.applyStore();
    }

    initCategoryDropdown();
    initHeaderMenus();
    initCart();
    initWishlist();
    initCountdown();
    initSearch();
});

// Menus do topo (Conta e Carrinho)
function initHeaderMenus() {
    const wrappers = Array.from(document.querySelectorAll('.nav-action-wrapper'));

    if (!wrappers.length) {
        return;
    }

    function closeAllMenus() {
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('open');
            const button = wrapper.querySelector('.nav-btn[aria-expanded]');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }

    wrappers.forEach(wrapper => {
        const button = wrapper.querySelector('.nav-btn[aria-expanded]');
        if (!button) {
            return;
        }

        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = wrapper.classList.contains('open');
            closeAllMenus();

            if (!isOpen) {
                wrapper.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', function(event) {
        const clickedInsideMenu = wrappers.some(wrapper => wrapper.contains(event.target));
        if (!clickedInsideMenu) {
            closeAllMenus();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllMenus();
        }
    });
}

// Dropdown de categorias
function initCategoryDropdown() {
    const categoriesContainer = document.querySelector('.nav-categories');
    const categoryMenuBtn = document.getElementById('categoryMenuBtn');
    const categoryDropdown = document.getElementById('categoryDropdown');

    if (!categoriesContainer || !categoryMenuBtn || !categoryDropdown) {
        return;
    }

    function closeMenu() {
        categoriesContainer.classList.remove('dropdown-open');
        categoryMenuBtn.setAttribute('aria-expanded', 'false');
    }

    categoryMenuBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = categoriesContainer.classList.toggle('dropdown-open');
        categoryMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function(event) {
        if (!categoriesContainer.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

// Carrinho de compras
function initCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');

    if (!cartCount || !cartItemsContainer || !cartTotal) {
        return;
    }

    function getTotalItems() {
        return storeCart.reduce((total, item) => total + item.quantity, 0);
    }

    function getTotalValue() {
        return storeCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function renderCart() {
        cartCount.textContent = String(getTotalItems());
        cartTotal.textContent = formatCurrencyBRL(getTotalValue());

        if (!storeCart.length) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
            return;
        }

        cartItemsContainer.innerHTML = storeCart.map((item, index) => {
            const safeName = escapeText(item.name);
            const safeImage = escapeText(item.image);
            const subtotal = item.price * item.quantity;

            return `
                <div class="cart-item">
                    <img class="cart-item-image" src="${safeImage}" alt="${safeName}">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${safeName}</p>
                        <p class="cart-item-price">${formatCurrencyBRL(item.price)} cada</p>
                        <div class="cart-item-actions">
                            <div class="qty-controls">
                                <button type="button" class="qty-btn" data-cart-action="decrease" data-index="${index}" aria-label="Diminuir quantidade">−</button>
                                <input type="number" class="qty-input" min="1" value="${item.quantity}" data-cart-action="set-quantity" data-index="${index}" aria-label="Quantidade de ${safeName}">
                                <button type="button" class="qty-btn" data-cart-action="increase" data-index="${index}" aria-label="Aumentar quantidade">+</button>
                            </div>
                            <button type="button" class="remove-item-btn" data-cart-action="remove" data-index="${index}">Remover</button>
                        </div>
                        <p class="cart-item-subtotal">Subtotal: ${formatCurrencyBRL(subtotal)}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img')?.src || '';

            const existingItem = storeCart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                storeCart.push({
                    name: productName,
                    price: parsePriceToNumber(productPrice),
                    image: productImage,
                    quantity: 1
                });
            }

            renderCart();

            // Feedback visual
            this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
            this.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar';
                this.style.background = '';
            }, 2000);

            showNotification('Produto adicionado ao carrinho!', 'success');
        });
    });

    cartItemsContainer.addEventListener('click', function(event) {
        const actionButton = event.target.closest('button[data-cart-action]');
        if (!actionButton) {
            return;
        }

        const index = Number(actionButton.dataset.index);
        const action = actionButton.dataset.cartAction;

        if (Number.isNaN(index) || !storeCart[index]) {
            return;
        }

        if (action === 'increase') {
            storeCart[index].quantity += 1;
        } else if (action === 'decrease') {
            storeCart[index].quantity -= 1;

            if (storeCart[index].quantity <= 0) {
                storeCart.splice(index, 1);
            }
        } else if (action === 'remove') {
            storeCart.splice(index, 1);
            showNotification('Produto removido do carrinho.', 'info');
        }

        renderCart();
    });

    cartItemsContainer.addEventListener('change', function(event) {
        const quantityInput = event.target.closest('input[data-cart-action="set-quantity"]');
        if (!quantityInput) {
            return;
        }

        const index = Number(quantityInput.dataset.index);
        const parsedQuantity = Number(quantityInput.value);

        if (Number.isNaN(index) || !storeCart[index]) {
            return;
        }

        const nextQuantity = Number.isFinite(parsedQuantity) ? Math.max(1, Math.floor(parsedQuantity)) : 1;
        storeCart[index].quantity = nextQuantity;
        renderCart();
    });

    renderCart();
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
                showNotification('Adicionado aos favoritos!', 'success');
            } else {
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
                this.style.color = '';
                wishlist = wishlist.filter(item => item !== productName);
                showNotification('Removido dos favoritos!', 'success');
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
            showNotification(`Buscando por "${query}"...`, 'info');
        }
    }
}

// Notificação
function getToastContainer() {
    let toastContainer = document.getElementById('toastContainer');

    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';

        Object.assign(toastContainer.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px',
            zIndex: '10000',
            pointerEvents: 'none',
            width: 'min(360px, calc(100vw - 32px))'
        });

        document.body.appendChild(toastContainer);
    }

    return toastContainer;
}

function parsePriceToNumber(priceText) {
    const normalized = String(priceText || '')
        .replace(/[^\d,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.');

    const parsedValue = Number(normalized);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatCurrencyBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(Number(value) || 0);
}

function escapeText(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showNotification(message, type = 'success') {
    const isSuccess = type === 'success';
    const iconClass = isSuccess ? 'fa-check-circle' : 'fa-info-circle';
    const accentColor = isSuccess ? '#10b981' : '#6b7280';
    const toastContainer = getToastContainer();

    const notification = document.createElement('div');
    const icon = document.createElement('i');
    icon.className = `fas ${iconClass}`;
    icon.setAttribute('aria-hidden', 'true');

    const text = document.createElement('span');
    text.textContent = message;

    notification.appendChild(icon);
    notification.appendChild(text);

    Object.assign(notification.style, {
        position: 'relative',
        width: '100%',
        background: '#1f1f1f',
        color: '#f3f4f6',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `4px solid ${accentColor}`,
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'auto',
        boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
        transform: 'translateX(115%)',
        opacity: '0',
        transition: 'transform 0.3s ease, opacity 0.3s ease'
    });

    icon.style.color = accentColor;
    icon.style.fontSize = '1rem';

    toastContainer.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        notification.style.transform = 'translateX(115%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            notification.remove();

            if (!toastContainer.children.length) {
                toastContainer.remove();
            }
        }, 300);
    }, 3000);
}
