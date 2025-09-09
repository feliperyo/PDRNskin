// Carrinho de compras
let cart = [];

// Configurações do produto
const PRODUCT_CONFIG = {
    name: 'PDRNskin Premium',
    price: 249.90,
    originalPrice: 299.90,
    maxQuantity: 1,
    image: 'assets/mockup3-sem-fundo.png'
};

// Configurações de desconto progressivo
const DISCOUNT_TIERS = [
    { minAmount: 0, discount: 0, label: 'Sem desconto' },
    { minAmount: 499.80, discount: 0.10, label: '10% de desconto' },
    { minAmount: 749.70, discount: 0.15, label: '15% de desconto' },
    { minAmount: 999.60, discount: 0.20, label: '20% de desconto' }
];

// Configurações de frete
const SHIPPING_CONFIG = {
    freeShippingMinQuantity: 2,
    standardShippingCost: 19.90
};

// Elementos DOM
const cartFloat = document.getElementById('cartFloat');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    initializeCountdown();
    initializeAnimations();
    initializeScrollEffects();
    initializeFAQ();
    initializeCartEvents();
    initializeAdvancedEffects();
    updateCartDisplay();
    startMovingEffects();
});

// Contador Regressivo
function initializeCountdown() {
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas a partir de agora

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');
    }, 1000);
}

// Animações de entrada
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Efeitos de movimento
function startMovingEffects() {
    // Efeito parallax no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroAnimation = document.querySelector('.hero-bg-animation');

        if (heroAnimation) {
            const parallax = scrolled * 0.5;
            heroAnimation.style.transform = `translateY(${parallax}px)`;
        }

        // Mostrar/esconder carrinho flutuante
        if (scrolled > 100) {
            cartFloat.style.opacity = '1';
            cartFloat.style.transform = 'scale(1)';
        } else {
            cartFloat.style.opacity = '0.8';
            cartFloat.style.transform = 'scale(0.9)';
        }
    });

    // Efeito de movimento do mouse no hero
    const hero = document.querySelector('.hero');
    const productShowcase = document.querySelector('.product-showcase');

    if (hero && productShowcase) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 30;
            const moveY = (y - 0.5) * 30;

            productShowcase.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            productShowcase.style.transform = 'translate(0, 0)';
        });
    }
}

// Efeitos de scroll
function initializeScrollEffects() {
    // Animação dos cards de benefícios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';

            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.animation = 'glow 1s ease-in-out';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';

            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.animation = 'pulse 2s infinite';
            }
        });
    });

    // Efeito de hover nos ingredientes
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    ingredientCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const circle = card.querySelector('.ingredient-circle');
            if (circle) {
                circle.style.transform = 'scale(1.15) rotate(360deg)';
                circle.style.transition = 'all 0.6s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const circle = card.querySelector('.ingredient-circle');
            if (circle) {
                circle.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Efeitos avançados
function initializeAdvancedEffects() {
    // Efeito de brilho no botão de compra
    const addCartBtn = document.querySelector('.btn-add-cart');
    if (addCartBtn) {
        addCartBtn.addEventListener('mouseenter', () => {
            addCartBtn.style.boxShadow = '0 15px 35px rgba(242, 140, 130, 0.4)';
            addCartBtn.style.transform = 'translateY(-3px) scale(1.02)';
        });

        addCartBtn.addEventListener('mouseleave', () => {
            addCartBtn.style.boxShadow = 'none';
            addCartBtn.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Efeito de pulsação nos elementos de destaque
    const highlightElements = document.querySelectorAll('.offer-badge, .discount-badge');
    highlightElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'pulse 0.8s ease-in-out';
            setTimeout(() => {
                element.style.animation = '';
            }, 800);
        }, 3000);
    });
}

// FAQ Funcionalidade
function initializeFAQ() {
    window.toggleFAQ = function (element) {
        const faqItem = element.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Fechar todas as FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Abrir a clicada se não estava ativa
        if (!isActive) {
            faqItem.classList.add('active');
        }

        // Animação suave
        setTimeout(() => {
            if (!isActive) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    };
}

// Eventos do carrinho
function initializeCartEvents() {
    // Click no carrinho flutuante
    cartFloat.addEventListener('click', () => {
        openCart();
    });

    // Click no overlay para fechar
    const cartOverlay = document.querySelector('.cart-overlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            closeCart();
        });
    }

    // Escapar para fechar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeCart();
        }
    });
}

// Adicionar produto ao carrinho
function addToCart() {
    const quantity = parseInt(document.getElementById('productQuantity').value);

    // Verificar se já existe produto no carrinho
    const existingItem = cart.find(item => item.id === 'pdrnskin-premium');

    if (existingItem) {
        // Atualizar quantidade (respeitando o máximo)
        const newQuantity = Math.min(existingItem.quantity + quantity, PRODUCT_CONFIG.maxQuantity);
        existingItem.quantity = newQuantity;
        existingItem.total = newQuantity * PRODUCT_CONFIG.price;
    } else {
        // Adicionar novo item
        const product = {
            id: 'pdrnskin-premium',
            name: PRODUCT_CONFIG.name,
            quantity: Math.min(quantity, PRODUCT_CONFIG.maxQuantity),
            price: PRODUCT_CONFIG.price,
            originalPrice: PRODUCT_CONFIG.originalPrice,
            image: PRODUCT_CONFIG.image,
            total: Math.min(quantity, PRODUCT_CONFIG.maxQuantity) * PRODUCT_CONFIG.price
        };

        cart.push(product);
    }

    updateCartDisplay();
    showCartNotification('Produto adicionado ao carrinho!', 'success');
    animateAddToCart();
}

// Animação do botão ao adicionar
function animateAddToCart() {
    const button = document.querySelector('.btn-add-cart');
    const originalText = button.innerHTML;

    button.style.transform = 'scale(0.95)';
    button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
    button.style.background = 'var(--highlight-green)';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.innerHTML = originalText;
        button.style.background = 'var(--cta-bg)';
    }, 1500);
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showCartNotification('Produto removido do carrinho', 'info');
}

// Atualizar quantidade no carrinho
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    if (newQuantity > PRODUCT_CONFIG.maxQuantity) {
        showCartNotification(`Máximo de ${PRODUCT_CONFIG.maxQuantity} unidade(s) por pedido`, 'warning');
        return;
    }

    item.quantity = newQuantity;
    item.total = newQuantity * item.price;

    updateCartDisplay();
}

// Calcular desconto atual
function calculateDiscount(subtotal) {
    let applicableDiscount = 0;
    let nextTier = null;

    for (let i = DISCOUNT_TIERS.length - 1; i >= 0; i--) {
        if (subtotal >= DISCOUNT_TIERS[i].minAmount) {
            applicableDiscount = DISCOUNT_TIERS[i].discount;
            break;
        }
        nextTier = DISCOUNT_TIERS[i];
    }

    return { discount: applicableDiscount, nextTier };
}

// Atualizar display do carrinho
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);

    // Atualizar contador do carrinho flutuante
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Atualizar itens do carrinho
    updateCartItems();

    // Atualizar desconto progressivo
    updateDiscountSection(subtotal);

    // Atualizar frete
    updateShippingInfo(totalItems);

    // Atualizar resumo
    updateCartSummary(subtotal, totalItems);
}

// Atualizar itens do carrinho
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h4>Seu carrinho está vazio</h4>
                <p>Adicione produtos para continuar sua compra</p>
                <button class="btn-start-shopping" onclick="closeCart()">
                    Começar a Comprar
                </button>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div class="item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remover item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Atualizar seção de desconto
function updateDiscountSection(subtotal) {
    const discountSection = document.getElementById('discountSection');
    const discountProgress = document.getElementById('discountProgress');
    const discountText = document.getElementById('discountText');
    const nextDiscountAmount = document.getElementById('nextDiscountAmount');

    if (!discountSection) return;

    const { discount, nextTier } = calculateDiscount(subtotal);

    if (discount > 0) {
        // Já tem desconto aplicado
        discountSection.innerHTML = `
            <div class="discount-achieved">
                <i class="fas fa-check-circle"></i>
                Parabéns! Você ganhou ${(discount * 100)}% de desconto!
            </div>
        `;
    } else if (nextTier) {
        // Mostra progresso para próximo desconto
        const remaining = nextTier.minAmount - subtotal;
        const progress = Math.min((subtotal / nextTier.minAmount) * 100, 100);

        discountProgress.style.width = `${progress}%`;
        nextDiscountAmount.textContent = remaining.toFixed(2).replace('.', ',');
        discountText.innerHTML = `
            Adicione mais R$ <span id="nextDiscountAmount">${remaining.toFixed(2).replace('.', ',')}</span> 
            para ganhar <strong>${nextTier.label}</strong>
        `;

        discountSection.style.display = 'block';
    } else {
        discountSection.style.display = 'none';
    }
}

// Atualizar informações de frete
function updateShippingInfo(totalItems) {
    const shippingInfo = document.getElementById('shippingInfo');
    const shippingText = document.getElementById('shippingText');

    if (!shippingInfo) return;

    if (totalItems >= SHIPPING_CONFIG.freeShippingMinQuantity) {
        shippingText.innerHTML = '<i class="fas fa-check"></i> Frete Grátis aplicado!';
        shippingInfo.style.background = 'rgba(72, 179, 71, 0.1)';
        shippingInfo.style.color = 'var(--highlight-green)';
    } else {
        const remaining = SHIPPING_CONFIG.freeShippingMinQuantity - totalItems;
        shippingText.innerHTML = `<i class="fas fa-truck"></i> Adicione mais ${remaining} unidade(s) para Frete Grátis`;
        shippingInfo.style.background = 'rgba(242, 140, 130, 0.1)';
        shippingInfo.style.color = 'var(--brand-primary)';
    }
}

// Atualizar resumo do carrinho
function updateCartSummary(subtotal, totalItems) {
    const cartSubtotal = document.getElementById('cartSubtotal');
    const discountLine = document.getElementById('discountLine');
    const discountAmount = document.getElementById('discountAmount');
    const shippingCost = document.getElementById('shippingCost');
    const cartTotal = document.getElementById('cartTotal');
    const savingsHighlight = document.getElementById('savingsHighlight');
    const totalSavings = document.getElementById('totalSavings');

    if (!cartSubtotal) return;

    // Calcular desconto
    const { discount } = calculateDiscount(subtotal);
    const discountValue = subtotal * discount;

    // Calcular frete
    const shipping = totalItems >= SHIPPING_CONFIG.freeShippingMinQuantity ? 0 : SHIPPING_CONFIG.standardShippingCost;

    // Total final
    const finalTotal = subtotal - discountValue + shipping;

    // Calcular economias totais
    const originalSubtotal = cart.reduce((sum, item) => sum + (item.quantity * item.originalPrice), 0);
    const totalSavingsValue = (originalSubtotal - subtotal) + discountValue +
        (totalItems >= SHIPPING_CONFIG.freeShippingMinQuantity ? SHIPPING_CONFIG.standardShippingCost : 0);

    // Atualizar elementos
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    if (discountValue > 0) {
        discountLine.style.display = 'flex';
        discountAmount.textContent = `-R$ ${discountValue.toFixed(2).replace('.', ',')}`;
    } else {
        discountLine.style.display = 'none';
    }

    shippingCost.textContent = shipping > 0 ? `R$ ${shipping.toFixed(2).replace('.', ',')}` : 'Grátis';
    shippingCost.style.color = shipping > 0 ? 'var(--brand-text)' : 'var(--highlight-green)';

    cartTotal.textContent = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;

    if (totalSavingsValue > 0) {
        savingsHighlight.style.display = 'block';
        totalSavings.textContent = `R$ ${totalSavingsValue.toFixed(2).replace('.', ',')}`;
    } else {
        savingsHighlight.style.display = 'none';
    }
}

// Abrir carrinho
function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animação de entrada
    const cartContent = document.querySelector('.cart-content');
    cartContent.style.transform = 'scale(0.8) translateY(50px)';
    cartContent.style.opacity = '0';

    setTimeout(() => {
        cartContent.style.transform = 'scale(1) translateY(0)';
        cartContent.style.opacity = '1';
        cartContent.style.transition = 'all 0.3s ease';
    }, 10);

    // Track evento
    trackEvent('cart_viewed', {
        items_count: cart.length,
        cart_value: cart.reduce((sum, item) => sum + item.total, 0)
    });
}

// Fechar carrinho
function closeCart() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.style.transform = 'scale(0.8) translateY(50px)';
    cartContent.style.opacity = '0';

    setTimeout(() => {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        showCartNotification('Adicione produtos ao carrinho primeiro!', 'warning');
        return;
    }

    // Calcular totais para checkout
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const { discount } = calculateDiscount(subtotal);
    const discountValue = subtotal * discount;
    const shipping = totalItems >= SHIPPING_CONFIG.freeShippingMinQuantity ? 0 : SHIPPING_CONFIG.standardShippingCost;
    const finalTotal = subtotal - discountValue + shipping;

    // Dados do pedido
    const orderData = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.total
        })),
        subtotal: subtotal,
        discount: discountValue,
        shipping: shipping,
        total: finalTotal,
        timestamp: new Date().toISOString(),
        discountPercentage: discount * 100
    };

    // Simular processo de checkout
    const checkoutBtn = document.querySelector('.btn-checkout');
    const originalText = checkoutBtn.innerHTML;

    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

    showCartNotification('Redirecionando para pagamento...', 'info');

    setTimeout(() => {
        // Simular sucesso
        console.log('Dados do pedido:', orderData);

        // Track evento
        trackEvent('checkout_initiated', {
            value: finalTotal,
            items: cart.length,
            discount_applied: discountValue > 0
        });

        // Em produção, redirecionar para gateway de pagamento
        alert(`Pedido processado com sucesso!\n\nResumo do Pedido:\nSubtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\nDesconto: R$ ${discountValue.toFixed(2).replace('.', ',')}\nFrete: ${shipping > 0 ? 'R$ ' + shipping.toFixed(2).replace('.', ',') : 'Grátis'}\nTotal: R$ ${finalTotal.toFixed(2).replace('.', ',')}\n\nEm breve você será redirecionado para o pagamento.`);

        // Limpar carrinho
        cart = [];
        updateCartDisplay();
        closeCart();

        // Restaurar botão
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = originalText;

        showCartNotification('Pedido finalizado com sucesso!', 'success');
    }, 2000);
}

// Notificação
function showCartNotification(message, type = 'success') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;

    const colors = {
        success: '#48B347',
        error: '#E63946',
        warning: '#D4AF37',
        info: '#F28C82'
    };

    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;

    notification.innerHTML = `
        <i class="fas fa-${icons[type]}"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Scroll suave para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funções específicas para botões
function scrollToPlans() {
    scrollToSection('plans');

    // Adicionar efeito visual
    setTimeout(() => {
        const offerCard = document.querySelector('.product-offer-card');
        if (offerCard) {
            offerCard.style.animation = 'pulse 1s ease-in-out 3';
            offerCard.style.boxShadow = '0 20px 60px rgba(242, 140, 130, 0.4)';

            setTimeout(() => {
                offerCard.style.boxShadow = '0 15px 50px var(--card-shadow)';
            }, 3000);
        }
    }, 1000);
}

function scrollToBenefits() {
    scrollToSection('benefits');
}

// Analytics e tracking
function trackEvent(eventName, properties = {}) {
    // Placeholder para integração com analytics
    console.log('Track Event:', eventName, properties);

    // Implementação real seria:
    // gtag('event', eventName, properties);
    // fbq('track', eventName, properties);
}

// Funções utilitárias
const Utils = {
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Performance e otimizações
function optimizePerformance() {
    // Reduzir animações em dispositivos de baixa performance
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-animations');

        // Reduzir frequência de atualizações
        const style = document.createElement('style');
        style.textContent = `
            .reduce-animations * {
                animation-duration: 0.5s !important;
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Otimizar scroll events
    const optimizedScroll = Utils.debounce(() => {
        // Lógica de scroll otimizada
    }, 16);

    window.addEventListener('scroll', optimizedScroll);
}

// Recursos extras para melhor UX
function initializeExtraFeatures() {
    // Detectar dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');

        // Ajustar comportamentos para mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            // Reduzir efeitos complexos no mobile
            hero.style.backgroundAttachment = 'scroll';
        }
    }

    // Detectar conexão lenta
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');

            // Reduzir animações e otimizar para conexão lenta
            const style = document.createElement('style');
            style.textContent = `
                .slow-connection * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Suporte a teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Inicializar recursos extras
document.addEventListener('DOMContentLoaded', () => {
    initializeExtraFeatures();
    optimizePerformance();

    // Track página carregada
    trackEvent('page_view', {
        page_title: 'PDRNskin Landing Page',
        page_location: window.location.href,
        user_agent: navigator.userAgent
    });

    // Preload de imagens importantes
    const criticalImages = [
        PRODUCT_CONFIG.image,
        'assets/mockup1-produto.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Exportar funções globais necessárias
window.scrollToPlans = scrollToPlans;
window.scrollToBenefits = scrollToBenefits;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.closeCart = closeCart;
window.checkout = checkout;
window.toggleFAQ = toggleFAQ;