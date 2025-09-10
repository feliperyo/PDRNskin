// Carrinho de compras
let cart = [];

// Configurações do produto
const PRODUCT_CONFIG = {
    name: 'PDRNskin Premium',
    basePrice: 249.00,
    originalPrice: 299.90,
    maxQuantity: 6,
    image: 'assets/mockup-atual-2.webp',
    description: 'Frasco - Tratamento para 30 dias'
};

// Configuração de Pacotes com preços corretos
const PACKAGE_CONFIG = {
    1: {
        name: 'Experimente',
        price: 249.00,
        originalPrice: 299.90,
        discount: 17,
        savings: 50.90,
        installments: 20.75,
        freeShipping: false,
        image: 'assets/mockup-atual-2.webp',
        description: '1 Frasco (30 dias de tratamento)',
        benefits: [
            '1 Frasco (30 dias de tratamento)',
            'Ideal para testar'
        ]
    },
    2: {
        name: 'Kit 2 Meses',
        price: 479.00,
        originalPrice: 599.80,
        discount: 20,
        savings: 120.80,
        installments: 39.92,
        freeShipping: true,
        image: 'assets/mockup-2-frascos.webp',
        description: '2 Frascos (60 dias de tratamento)',
        benefits: [
            '2 Frascos (60 dias de tratamento)',
            'Frete GRÁTIS',
            'Primeiros resultados visíveis'
        ]
    },
    3: {
        name: 'Kit 3 Meses',
        price: 599.00,
        originalPrice: 899.70,
        discount: 33,
        savings: 300.70,
        installments: 49.92,
        freeShipping: true,
        popular: true,
        image: 'assets/mockup-3-frascos.webp',
        description: '3 Frascos (90 dias de tratamento)',
        benefits: [
            '3 Frascos (90 dias de tratamento)',
            'Frete GRÁTIS',
            'Resultados visíveis garantidos'
        ]
    },
    4: {
        name: 'Kit 4 Meses',
        price: 699.00,
        originalPrice: 1199.60,
        discount: 42,
        savings: 500.60,
        installments: 58.25,
        freeShipping: true,
        image: 'assets/mockup-4-frascos.webp',
        description: '4 Frascos (120 dias de tratamento)',
        benefits: [
            '4 Frascos (120 dias de tratamento)',
            'Frete GRÁTIS',
            'Resultados duradouros'
        ]
    },
    5: {
        name: 'Kit 5 Meses',
        price: 799.00,
        originalPrice: 1499.50,
        discount: 47,
        savings: 700.50,
        installments: 66.58,
        freeShipping: true,
        image: 'assets/mockup-5-frascos.webp',
        description: '5 Frascos (150 dias de tratamento)',
        benefits: [
            '5 Frascos (150 dias de tratamento)',
            'Frete GRÁTIS',
            'Máxima economia'
        ]
    },
    6: {
        name: 'Kit 6 Meses',
        price: 899.99,
        originalPrice: 1799.40,
        discount: 50,
        savings: 899.41,
        installments: 75.00,
        freeShipping: true,
        image: 'assets/mockup-6-frascos.webp',
        description: '6 Frascos (180 dias de tratamento)',
        benefits: [
            '6 Frascos (180 dias de tratamento)',
            'Frete GRÁTIS',
            'Melhor custo-benefício'
        ]
    }
};

// Sistema de preços por quantidade
const QUANTITY_PRICING = {
    1: { price: 249.00, total: 249.00, discount: 0, discountLabel: 'Preço normal' },
    2: { price: 239.50, total: 479.00, discount: 4, discountLabel: '4% OFF + Frete Grátis' },
    3: { price: 199.67, total: 599.00, discount: 20, discountLabel: '20% OFF + Frete Grátis' },
    4: { price: 174.75, total: 699.00, discount: 30, discountLabel: '30% OFF + Frete Grátis' },
    5: { price: 159.80, total: 799.00, discount: 36, discountLabel: '36% OFF + Frete Grátis' },
    6: { price: 149.98, total: 899.99, discount: 40, discountLabel: '40% OFF + Frete Grátis' }
};

// Configuração do Checkout Yampi
const YAMPI_CONFIG = {
    checkoutUrl: 'https://pdrnskin.pay.yampi.com.br/r/PUZYMA5H4Y',
    productId: 'pdrnskin-premium'
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
    initializeIngredients();
    initializeCustomerPhotos();
});

// Contador Regressivo Melhorado
function initializeCountdown() {
    // Definir um tempo fixo para demonstração (pode ser alterado para dinâmico)
    const countdownDate = new Date().getTime() + (14 * 60 * 1000) + (39 * 1000); // 14:39

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            // Quando o tempo acabar, reiniciar o contador
            setTimeout(() => {
                initializeCountdown();
            }, 1000);
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.innerHTML = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerHTML = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerHTML = String(seconds).padStart(2, '0');
    }, 1000);
}

// Inicializar fotos de clientes (placeholder)
function initializeCustomerPhotos() {
    // Fotos genéricas para avaliações
    const customerPhotos = document.querySelectorAll('.customer-photo');
    const placeholderImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face&auto=format&q=80',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face&auto=format&q=80',
        'https://images.unsplash.com/photo-1534308143481-c55c15c4f8cc?w=120&h=120&fit=crop&crop=face&auto=format&q=80'
    ];

    customerPhotos.forEach((photo, index) => {
        if (placeholderImages[index]) {
            photo.src = placeholderImages[index];
            photo.alt = `Cliente ${index + 1}`;
        }
    });
}

// Inicializar ingredientes expandíveis
function initializeIngredients() {
    // A função toggleIngredient será chamada pelo onclick no HTML
    window.toggleIngredient = function (element) {
        const item = element.closest('.ingredient-expandable-item');
        const isActive = item.classList.contains('active');

        // Fechar todos os outros ingredientes
        document.querySelectorAll('.ingredient-expandable-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle o clicado
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');

            // Scroll suave para o item aberto
            setTimeout(() => {
                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        }
    };
}

// Adicionar pacote ao carrinho
function addPackageToCart(packageQuantity) {
    const packageInfo = PACKAGE_CONFIG[packageQuantity];

    if (!packageInfo) {
        showCartNotification('Pacote não encontrado!', 'error');
        return;
    }

    // Limpar carrinho existente para evitar conflitos
    cart = [];

    // Adicionar o pacote
    const product = {
        id: YAMPI_CONFIG.productId,
        name: PRODUCT_CONFIG.name,
        packageName: packageInfo.name,
        quantity: packageQuantity,
        price: packageInfo.price / packageQuantity, // preço unitário
        originalPrice: PRODUCT_CONFIG.originalPrice,
        total: packageInfo.price,
        originalTotal: packageInfo.originalPrice,
        discount: packageInfo.discount,
        savings: packageInfo.savings,
        installments: packageInfo.installments,
        freeShipping: packageInfo.freeShipping,
        image: packageInfo.image || PRODUCT_CONFIG.image,
        description: packageInfo.description,
        discountLabel: `${packageInfo.discount}% OFF` + (packageInfo.freeShipping ? ' + Frete Grátis' : '')
    };

    cart.push(product);

    updateCartDisplay();
    showCartNotification(`${packageInfo.name} adicionado ao carrinho!`, 'success');
    animateAddToCart();

    // Track evento
    trackEvent('add_to_cart', {
        item_id: YAMPI_CONFIG.productId,
        package_name: packageInfo.name,
        quantity: packageQuantity,
        value: packageInfo.price
    });
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

    // Efeito de hover nos pacotes
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('popular-package')) {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('popular-package')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Efeitos avançados
function initializeAdvancedEffects() {
    // Efeito de brilho nos botões de pacote
    const packageBtns = document.querySelectorAll('.package-btn');
    packageBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de pulsação nos elementos de destaque
    const highlightElements = document.querySelectorAll('.package-badge, .discount-badge, .coupon-badge');
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

// Adicionar produto ao carrinho (método original mantido para compatibilidade)
function addToCart() {
    // Usar o pacote de 1 unidade como padrão
    addPackageToCart(1);
}

// Animação do botão ao adicionar
function animateAddToCart() {
    const buttons = document.querySelectorAll('.btn-add-cart, .package-btn');
    buttons.forEach(button => {
        const originalText = button.innerHTML;

        button.style.transform = 'scale(0.95)';
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
        button.style.background = 'var(--success-color)';

        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.innerHTML = originalText;
            button.style.background = '';
        }, 1500);
    });
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showCartNotification('Produto removido do carrinho', 'info');

    // Track evento
    trackEvent('remove_from_cart', {
        item_id: productId
    });
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

    if (newQuantity > 6) {
        showCartNotification('Máximo de 6 unidades por pedido', 'warning');
        return;
    }

    // Verificar se existe configuração de pacote para a nova quantidade
    const newPackageConfig = PACKAGE_CONFIG[newQuantity];

    if (newPackageConfig) {
        // Usar configuração de pacote
        item.quantity = newQuantity;
        item.packageName = newPackageConfig.name;
        item.price = newPackageConfig.price / newQuantity;
        item.total = newPackageConfig.price;
        item.originalTotal = newPackageConfig.originalPrice;
        item.discount = newPackageConfig.discount;
        item.savings = newPackageConfig.savings;
        item.installments = newPackageConfig.installments;
        item.freeShipping = newPackageConfig.freeShipping;
        item.description = newPackageConfig.description;
        item.discountLabel = `${newPackageConfig.discount}% OFF` + (newPackageConfig.freeShipping ? ' + Frete Grátis' : '');
        item.image = newPackageConfig.image;
    } else {
        // Usar sistema de preços padrão
        const newPricing = QUANTITY_PRICING[newQuantity];
        if (newPricing) {
            item.quantity = newQuantity;
            item.price = newPricing.price;
            item.total = newPricing.total;
            item.discount = newPricing.discount;
            item.discountLabel = newPricing.discountLabel;
            item.freeShipping = newQuantity >= 2;
        }
    }

    updateCartDisplay();

    // Track evento
    trackEvent('update_cart_quantity', {
        item_id: productId,
        new_quantity: newQuantity,
        new_value: item.total
    });
}

// Atualizar display do carrinho
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Atualizar contador do carrinho flutuante
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Atualizar itens do carrinho
    updateCartItems();

    // Atualizar desconto progressivo
    updateDiscountSection();

    // Atualizar resumo sem frete (será calculado no checkout)
    updateCartSummary();
}

// Atualizar itens do carrinho
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h4>Seu carrinho está vazio</h4>
                <p>Escolha um dos nossos pacotes para começar sua transformação</p>
                <button class="btn-start-shopping" onclick="closeCart()">
                    Ver Pacotes
                </button>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const savings = item.savings ? `<div class="item-savings">Você economiza: R$ ${item.savings.toFixed(2).replace('.', ',')}</div>` : '';
        const installments = item.installments ? `<div class="item-installments">ou 12x R$ ${item.installments.toFixed(2).replace('.', ',')}</div>` : '';

        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.packageName || item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-price">R$ ${item.total.toFixed(2).replace('.', ',')}</div>
                ${installments}
                ${savings}
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

// Atualizar seção de desconto progressivo
function updateDiscountSection() {
    const discountSection = document.getElementById('discountSection');

    if (!discountSection || cart.length === 0) {
        if (discountSection) discountSection.style.display = 'none';
        return;
    }

    const currentQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Mostrar progresso para próximo pacote com mais economia
    if (currentQuantity < 3) {
        const nextQuantity = currentQuantity === 1 ? 2 : 3;
        const nextPackage = PACKAGE_CONFIG[nextQuantity];
        const currentItem = cart[0];

        if (nextPackage) {
            const additionalSavings = nextPackage.savings - (currentItem.savings || 0);
            const progress = (currentQuantity / 3) * 100;

            const discountProgress = document.getElementById('discountProgress');
            const discountText = document.getElementById('discountText');

            if (discountProgress) discountProgress.style.width = `${progress}%`;

            if (discountText) {
                discountText.innerHTML = `
                    Mude para o <strong>${nextPackage.name}</strong> e economize mais 
                    <span style="color: var(--success-color)">R$ ${additionalSavings.toFixed(2).replace('.', ',')}</span>!
                `;
            }

            discountSection.style.display = 'block';
        } else {
            discountSection.style.display = 'none';
        }
    } else {
        discountSection.innerHTML = `
            <div class="discount-achieved">
                <i class="fas fa-trophy"></i>
                Parabéns! Você escolheu nosso pacote mais vantajoso!
            </div>
        `;
    }
}

// Atualizar resumo do carrinho (sem frete)
function updateCartSummary() {
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const savingsHighlight = document.getElementById('savingsHighlight');
    const totalSavings = document.getElementById('totalSavings');

    if (!cartSubtotal) return;

    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.originalTotal || (item.quantity * item.originalPrice)), 0);
    const productSavings = originalTotal - subtotal;

    // Atualizar elementos
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    cartTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    if (productSavings > 0) {
        savingsHighlight.style.display = 'block';
        totalSavings.textContent = `R$ ${productSavings.toFixed(2).replace('.', ',')}`;
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

// Finalizar compra - Integração com Yampi
function checkout() {
    if (cart.length === 0) {
        showCartNotification('Adicione produtos ao carrinho primeiro!', 'warning');
        return;
    }

    const currentItem = cart[0];
    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Dados do pedido para tracking
    const orderData = {
        items: cart.map(item => ({
            id: item.id,
            name: item.packageName || item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.total,
            package: item.packageName
        })),
        subtotal: subtotal,
        total: subtotal,
        timestamp: new Date().toISOString()
    };

    // Simular processo de checkout
    const checkoutBtn = document.querySelector('.btn-checkout');
    const originalText = checkoutBtn.innerHTML;

    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';

    // Track evento
    trackEvent('checkout_initiated', {
        value: subtotal,
        items: cart.length,
        quantity: totalItems,
        package_name: currentItem.packageName
    });

    // Construir URL com parâmetros para Yampi
    const yampiUrl = new URL(YAMPI_CONFIG.checkoutUrl);

    // Adicionar parâmetros importantes para o Yampi
    yampiUrl.searchParams.append('quantity', totalItems);
    yampiUrl.searchParams.append('package', currentItem.packageName);
    yampiUrl.searchParams.append('value', subtotal);
    yampiUrl.searchParams.append('utm_source', 'landingpage');
    yampiUrl.searchParams.append('utm_campaign', 'pdrnskin');

    setTimeout(() => {
        try {
            // Redirecionar para o checkout da Yampi
            window.location.href = yampiUrl.toString();
        } catch (error) {
            console.error('Erro ao redirecionar:', error);
            showCartNotification('Erro ao redirecionar. Tente novamente.', 'error');

            checkoutBtn.disabled = false;
            checkoutBtn.innerHTML = originalText;
        }
    }, 1500);

    showCartNotification('Redirecionando para pagamento...', 'info');
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
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#667eea'
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

    // Adicionar efeito visual nos pacotes
    setTimeout(() => {
        const packageCards = document.querySelectorAll('.package-card');
        packageCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'pulse 1s ease-in-out';
                card.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.4)';

                setTimeout(() => {
                    card.style.boxShadow = '';
                    card.style.animation = '';
                }, 1000);
            }, index * 200);
        });
    }, 1000);

    // Track evento
    trackEvent('scroll_to_plans');
}

function scrollToBenefits() {
    scrollToSection('benefits');
    trackEvent('scroll_to_benefits');
}

// Analytics e tracking
function trackEvent(eventName, properties = {}) {
    // Log para debug
    console.log('Track Event:', eventName, properties);

    // Para integração com GTM/GA4:
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }

    // Para Facebook Pixel:
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }

    // Para outras plataformas de analytics
    if (typeof analytics !== 'undefined') {
        analytics.track(eventName, properties);
    }
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
    },

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
};

// Performance e otimizações
function optimizePerformance() {
    // Reduzir animações em dispositivos de baixa performance
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-animations');

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
    if (Utils.isMobile()) {
        document.body.classList.add('mobile-device');

        // Ajustar comportamentos para mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundAttachment = 'scroll';
        }

        // Melhorar toque em dispositivos móveis
        const touchElements = document.querySelectorAll('.package-card, .benefit-card, .testimonial-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });

            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
    }

    // Detectar conexão lenta
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');

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

// Lazy loading de imagens
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar recursos extras
document.addEventListener('DOMContentLoaded', () => {
    initializeExtraFeatures();
    optimizePerformance();
    initializeLazyLoading();

    // Track página carregada
    trackEvent('page_view', {
        page_title: 'PDRNskin Landing Page',
        page_location: window.location.href,
        user_agent: navigator.userAgent,
        is_mobile: Utils.isMobile()
    });

    // Preload de imagens importantes
    const criticalImages = [
        'assets/mockup-atual.webp',
        'assets/mockup-atual-2.webp',
        'assets/mockup-2-frascos.webp',
        'assets/mockup-3-frascos.webp'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Inicializar tooltips nos pacotes populares
    const popularPackage = document.querySelector('.popular-package');
    if (popularPackage) {
        popularPackage.title = 'Pacote mais escolhido pelos nossos clientes!';
    }
});

// Exportar funções globais necessárias
window.scrollToPlans = scrollToPlans;
window.scrollToBenefits = scrollToBenefits;
window.addToCart = addToCart;
window.addPackageToCart = addPackageToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.closeCart = closeCart;
window.checkout = checkout;
window.toggleFAQ = toggleFAQ;
window.toggleIngredient = toggleIngredient;