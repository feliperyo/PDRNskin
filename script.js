// Carrinho de compras
let cart = [];

// Elementos DOM
const cartFloat = document.getElementById('cartFloat');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeScrollEffects();
    initializeFAQ();
    initializeCartEvents();
    updateCartDisplay();
});

// Animações de entrada
function initializeAnimations() {
    // Observador de intersecção para animações
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

    // Observar elementos animáveis
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Efeitos de scroll
function initializeScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Efeito parallax no hero
        const heroSection = document.querySelector('.hero');
        const heroAnimation = document.querySelector('.hero-bg-animation');

        if (heroSection && heroAnimation) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroAnimation.style.transform = `translateY(${parallax}px)`;
        }

        // Mostrar/esconder carrinho flutuante baseado no scroll
        if (scrollTop > 100) {
            cartFloat.style.opacity = '1';
            cartFloat.style.pointerEvents = 'auto';
        } else {
            cartFloat.style.opacity = '0.7';
        }

        lastScrollTop = scrollTop;
    });
}

// FAQ Funcionalidade
function initializeFAQ() {
    // FAQ já tem onclick no HTML, mas vamos garantir que funcione
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

    // Click fora do modal para fechar
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    // Escapar para fechar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeCart();
        }
    });
}

// Adicionar produto ao carrinho
function addToCart(planType, quantity, price) {
    const product = {
        id: Date.now(),
        name: `PDRNskin - ${planType.charAt(0).toUpperCase() + planType.slice(1)}`,
        quantity: quantity,
        price: price,
        total: price * quantity
    };

    cart.push(product);
    updateCartDisplay();
    showCartNotification();

    // Animação do botão
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    button.innerHTML = '<i class="fas fa-check"></i> Adicionado!';

    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
    }, 1500);
}

// Atualizar display do carrinho
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Atualizar itens do carrinho
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Adicione produtos para continuar</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <div class="item-price">R$ ${item.total.toFixed(2).replace('.', ',')}</div>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #e74c3c; cursor: pointer; margin-left: 10px; font-size: 1.2rem;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    cartTotal.textContent = totalPrice.toFixed(2).replace('.', ',');
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showCartNotification('Produto removido do carrinho', 'error');
}

// Abrir carrinho
function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animação de entrada
    const cartContent = document.querySelector('.cart-content');
    cartContent.style.transform = 'scale(0.8)';
    cartContent.style.opacity = '0';

    setTimeout(() => {
        cartContent.style.transform = 'scale(1)';
        cartContent.style.opacity = '1';
        cartContent.style.transition = 'all 0.3s ease';
    }, 10);
}

// Fechar carrinho
function closeCart() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.style.transform = 'scale(0.8)';
    cartContent.style.opacity = '0';

    setTimeout(() => {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Finalizar compra
function checkout() {
    if (cart.length === 0) {
        showCartNotification('Adicione produtos ao carrinho primeiro!', 'error');
        return;
    }

    // Simular processo de checkout
    showCartNotification('Redirecionando para pagamento...', 'success');

    // Aqui você integraria com seu gateway de pagamento
    setTimeout(() => {
        // Por enquanto, vamos simular um sucesso
        const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
        const orderData = {
            items: cart,
            total: totalAmount,
            timestamp: new Date().toISOString()
        };

        console.log('Dados do pedido:', orderData);

        // Em uma implementação real, você enviaria esses dados para seu backend
        // window.location.href = `/checkout?data=${encodeURIComponent(JSON.stringify(orderData))}`;

        alert(`Pedido processado com sucesso!\nTotal: R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\nEm breve você será redirecionado para o pagamento.`);

        // Limpar carrinho após "compra"
        cart = [];
        updateCartDisplay();
        closeCart();
    }, 2000);
}

// Notificação do carrinho
function showCartNotification(message, type = 'success') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;

    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation-triangle'}"></i>
        ${message}
    `;

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
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

    // Adicionar efeito visual ao botão de plano
    setTimeout(() => {
        const planCard = document.querySelector('.plan-card');
        if (planCard) {
            planCard.style.animation = 'pulse 1s ease-in-out 3';
        }
    }, 1000);
}

function scrollToBenefits() {
    scrollToSection('benefits');
}

// Efeitos visuais avançados
function initializeAdvancedEffects() {
    // Efeito de movimento do mouse no hero
    const hero = document.querySelector('.hero');
    const productShowcase = document.querySelector('.product-showcase');

    if (hero && productShowcase) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;

            productShowcase.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            productShowcase.style.transform = 'translate(0, 0)';
        });
    }

    // Efeito de hover nos cards de benefícios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';

            // Efeito de brilho
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
                circle.style.transform = 'scale(1.1) rotate(360deg)';
                circle.style.transition = 'all 0.5s ease';
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

// Contador animado para preços
function animatePrice(element, finalValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();

    function updatePrice(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = startValue + (finalValue - startValue) * easeOutCubic(progress);
        element.textContent = `R$ ${currentValue.toFixed(2).replace('.', ',')}`;

        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        }
    }

    requestAnimationFrame(updatePrice);
}

// Função de easing
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Validação de formulários (se houver)
function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }

    if (!formData.phone || formData.phone.length < 10) {
        errors.push('Telefone inválido');
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Lazy loading de imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance e otimizações
function optimizePerformance() {
    // Preload de recursos críticos
    const preloadResources = [
        'style.css',
        // Adicionar outras resources importantes
    ];

    preloadResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });

    // Otimizar animações para dispositivos de baixa performance
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-animations');
    }
}

// Analytics e tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder para integração com Google Analytics, Facebook Pixel, etc.
    console.log('Track Event:', eventName, properties);

    // Exemplo de implementação:
    // gtag('event', eventName, properties);
    // fbq('track', eventName, properties);
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeScrollEffects();
    initializeFAQ();
    initializeCartEvents();
    initializeAdvancedEffects();
    initializeLazyLoading();
    optimizePerformance();
    updateCartDisplay();

    // Animar preços quando visíveis
    const priceElements = document.querySelectorAll('.current-price');
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceText = entry.target.textContent;
                const priceValue = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));
                animatePrice(entry.target, priceValue);
                priceObserver.unobserve(entry.target);
            }
        });
    });

    priceElements.forEach(el => priceObserver.observe(el));

    // Track página carregada
    trackEvent('page_view', {
        page_title: 'PDRNskin Landing Page',
        page_location: window.location.href
    });
});

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

// Funcionalidades extras para melhor UX
function initializeExtraFeatures() {
    // Detectar se o usuário está no mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        document.body.classList.add('mobile-device');

        // Ajustar comportamentos para mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('touchstart', () => {
                // Adicionar feedback tátil
            });
        }
    }

    // Detectar conexão lenta
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.body.classList.add('slow-connection');
            // Reduzir animações e otimizar para conexão lenta
        }
    }

    // Modo escuro (se implementado)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    }
}

// Inicializar recursos extras
document.addEventListener('DOMContentLoaded', initializeExtraFeatures);

// Funções utilitárias
const Utils = {
    // Formatar moeda
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    // Debounce para otimizar events
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

    // Throttle para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Exportar funções globais necessárias
window.scrollToPlans = scrollToPlans;
window.scrollToBenefits = scrollToBenefits;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.toggleFAQ = toggleFAQ;