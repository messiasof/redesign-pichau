(function () {
    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, '');
    }

    function renderStars(ratingValue) {
        const rating = Number(ratingValue) || 0;
        let html = '';

        for (let index = 1; index <= 5; index += 1) {
            if (rating >= index) {
                html += '<i class="fas fa-star"></i>';
            } else if (rating >= index - 0.5) {
                html += '<i class="fas fa-star-half-alt"></i>';
            } else {
                html += '<i class="far fa-star"></i>';
            }
        }

        return html;
    }

    function applyToAll(selector, callback) {
        if (!selector || typeof callback !== 'function') {
            return;
        }

        document.querySelectorAll(selector).forEach(callback);
    }

    function setText(selector, value) {
        if (value === undefined) {
            return;
        }

        applyToAll(selector, function (element) {
            element.textContent = value;
        });
    }

    function setHtml(selector, value) {
        if (value === undefined) {
            return;
        }

        applyToAll(selector, function (element) {
            element.innerHTML = value;
        });
    }

    function setAttr(selector, attribute, value) {
        if (value === undefined) {
            return;
        }

        applyToAll(selector, function (element) {
            element.setAttribute(attribute, value);
        });
    }

    function setImage(selector, image) {
        if (!image) {
            return;
        }

        if (image.src !== undefined) {
            setAttr(selector, 'src', image.src);
        }

        if (image.alt !== undefined) {
            setAttr(selector, 'alt', image.alt);
        }
    }

    function applyOverrides(overrides) {
        if (!overrides) {
            return;
        }

        const textList = Array.isArray(overrides.text) ? overrides.text : [];
        const htmlList = Array.isArray(overrides.html) ? overrides.html : [];
        const imageList = Array.isArray(overrides.images) ? overrides.images : [];
        const linkList = Array.isArray(overrides.links) ? overrides.links : [];

        textList.forEach(function (entry) {
            if (entry && entry.selector) {
                setText(entry.selector, entry.value);
            }
        });

        htmlList.forEach(function (entry) {
            if (entry && entry.selector) {
                setHtml(entry.selector, entry.value);
            }
        });

        imageList.forEach(function (entry) {
            if (entry && entry.selector) {
                setImage(entry.selector, entry);
            }
        });

        linkList.forEach(function (entry) {
            if (!entry || !entry.selector) {
                return;
            }

            applyToAll(entry.selector, function (element) {
                if (entry.href !== undefined) {
                    element.setAttribute('href', entry.href);
                }

                if (entry.text !== undefined) {
                    element.textContent = entry.text;
                }
            });
        });
    }

    function buildActionButton(className, config, fallbackIconClass) {
        if (!config) {
            return '';
        }

        const href = escapeAttr(config.href || '#');
        const text = escapeHtml(config.text || 'Saiba mais');
        const iconClass = escapeAttr(config.iconClass || fallbackIconClass || 'fas fa-arrow-right');

        return '<a href="' + href + '" class="' + className + '"><span>' + text + '</span><i class="' + iconClass + '"></i></a>';
    }

    function applyStore() {
        const config = window.PICHAU_CONTENT_CONFIG && window.PICHAU_CONTENT_CONFIG.store;
        if (!config) {
            return;
        }

        const hero = config.hero || {};
        setText('.hero-banner .banner-tag', hero.badge);

        if (hero.titlePrefix !== undefined || hero.titleHighlight !== undefined || hero.titleSuffix !== undefined) {
            const prefix = escapeHtml(hero.titlePrefix || '');
            const highlight = hero.titleHighlight
                ? '<span class="highlight">' + escapeHtml(hero.titleHighlight) + '</span>'
                : '';
            const suffix = hero.titleSuffix ? ' ' + escapeHtml(hero.titleSuffix) : '';
            const spacer = prefix && highlight ? ' ' : '';
            setHtml('.hero-banner h1', prefix + spacer + highlight + suffix);
        }

        setText('.hero-banner .banner-content p', hero.description);
        setText('.hero-banner .btn.btn-primary', hero.ctaText);
        setAttr('.hero-banner .btn.btn-primary', 'href', hero.ctaHref);
        setImage('.hero-banner .banner-image img', hero.image);

        const categoriesSection = config.categoriesSection || {};
        setText('.categories .section-title', categoriesSection.title);

        const categoriesGrid = document.querySelector('.categories .categories-grid');
        if (categoriesGrid && Array.isArray(categoriesSection.items) && categoriesSection.items.length > 0) {
            categoriesGrid.innerHTML = categoriesSection.items
                .map(function (item) {
                    return [
                        '<div class="category-card">',
                        '    <div class="category-icon"><i class="' + escapeAttr(item.iconClass || 'fas fa-box') + '"></i></div>',
                        '    <h3>' + escapeHtml(item.title || '') + '</h3>',
                        '    <p>' + escapeHtml(item.subtitle || '') + '</p>',
                        '    <a href="' + escapeAttr(item.href || '#') + '">' + escapeHtml(item.linkText || 'Ver Produtos →') + '</a>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const offers = config.offersSection || {};
        if (offers.title !== undefined) {
            setHtml('.products-section .section-title', '<i class="fas fa-fire"></i> ' + escapeHtml(offers.title));
        }

        if (offers.timerLabel !== undefined) {
            setHtml(
                '.products-section .timer',
                '<i class="fas fa-clock"></i> ' + escapeHtml(offers.timerLabel) + ' <span id="countdown">23:45:12</span>'
            );
        }

        const productsGrid = document.querySelector('.products-section .products-grid');
        if (productsGrid && Array.isArray(offers.products) && offers.products.length > 0) {
            productsGrid.innerHTML = offers.products
                .map(function (item) {
                    const badgeHtml = item.badgeText
                        ? '<div class="product-badge ' + escapeAttr(item.badgeType || 'discount') + '">' + escapeHtml(item.badgeText) + '</div>'
                        : '';

                    const ratingHtml = item.rating || item.reviews
                        ? [
                            '<div class="product-rating">',
                            renderStars(item.rating || 0),
                            '<span>(' + escapeHtml(item.reviews || 0) + ')</span>',
                            '</div>'
                        ].join('')
                        : '';

                    const oldPriceHtml = item.oldPrice
                        ? '<span class="old-price">' + escapeHtml(item.oldPrice) + '</span>'
                        : '';

                    const installmentHtml = item.installment
                        ? '<span class="installment">' + escapeHtml(item.installment) + '</span>'
                        : '';

                    return [
                        '<div class="product-card">',
                        badgeHtml,
                        '    <div class="product-image">',
                        '        <img src="' + escapeAttr((item.image && item.image.src) || '') + '" alt="' + escapeAttr((item.image && item.image.alt) || item.name || 'Produto') + '">',
                        '        <button class="wishlist-btn"><i class="far fa-heart"></i></button>',
                        '    </div>',
                        '    <div class="product-info">',
                        '        <h3>' + escapeHtml(item.name || '') + '</h3>',
                        ratingHtml,
                        '        <div class="product-price">',
                        oldPriceHtml,
                        '            <span class="current-price">' + escapeHtml(item.currentPrice || '') + '</span>',
                        installmentHtml,
                        '        </div>',
                        '        <button class="btn-add-cart">',
                        '            <i class="fas fa-shopping-cart"></i> ' + escapeHtml(item.buttonText || 'Adicionar'),
                        '        </button>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        setText('.products-section .view-all a', offers.viewAllText);
        setAttr('.products-section .view-all a', 'href', offers.viewAllHref);

        const benefitsSection = config.benefitsSection || {};
        const benefitsGrid = document.querySelector('.benefits .benefits-grid');
        if (benefitsGrid && Array.isArray(benefitsSection.items) && benefitsSection.items.length > 0) {
            benefitsGrid.innerHTML = benefitsSection.items
                .map(function (item) {
                    return [
                        '<div class="benefit-item">',
                        '    <i class="' + escapeAttr(item.iconClass || 'fas fa-check') + '"></i>',
                        '    <div>',
                        '        <h4>' + escapeHtml(item.title || '') + '</h4>',
                        '        <p>' + escapeHtml(item.description || '') + '</p>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        applyOverrides(config.overrides);
    }

    function applyGaming() {
        const config = window.PICHAU_CONTENT_CONFIG && window.PICHAU_CONTENT_CONFIG.gaming;
        if (!config) {
            return;
        }

        const hero = config.hero || {};
        if (hero.badgeText !== undefined) {
            setHtml(
                '.hero .hero-badge',
                '<i class="' + escapeAttr(hero.badgeIcon || 'fas fa-trophy') + '"></i> ' + escapeHtml(hero.badgeText)
            );
        }

        if (hero.titlePrefix !== undefined || hero.titleHighlight !== undefined) {
            setHtml(
                '.hero .hero-title',
                escapeHtml(hero.titlePrefix || '') + '<br><span class="gradient-text">' + escapeHtml(hero.titleHighlight || '') + '</span>'
            );
        }

        setText('.hero .hero-description', hero.description);

        const heroStats = document.querySelector('.hero .hero-stats');
        if (heroStats && Array.isArray(hero.stats) && hero.stats.length > 0) {
            heroStats.innerHTML = hero.stats
                .map(function (item) {
                    return [
                        '<div class="stat">',
                        '    <span class="stat-number">' + escapeHtml(item.number || '') + '</span>',
                        '    <span class="stat-label">' + escapeHtml(item.label || '') + '</span>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const heroCta = document.querySelector('.hero .hero-cta');
        if (heroCta && (hero.primaryCta || hero.secondaryCta)) {
            heroCta.innerHTML = [
                buildActionButton('btn btn-primary', hero.primaryCta, 'fas fa-arrow-right'),
                buildActionButton('btn btn-secondary', hero.secondaryCta, 'fas fa-fire')
            ].join('');
        }

        if (hero.banner) {
            setImage('.hero .hero-banner .banner-img', hero.banner);
            setText('.hero .hero-banner .discount-badge', hero.banner.badgeText);
        }

        const categoriesSection = config.categoriesSection || {};
        setText('.categories .section-badge', categoriesSection.badge);
        setText('.categories .section-title', categoriesSection.title);
        setText('.categories .section-description', categoriesSection.description);

        const categoriesGrid = document.querySelector('.categories .categories-grid');
        if (categoriesGrid && Array.isArray(categoriesSection.items) && categoriesSection.items.length > 0) {
            categoriesGrid.innerHTML = categoriesSection.items
                .map(function (item, index) {
                    const features = Array.isArray(item.features) ? item.features : [];
                    const featureHtml = features
                        .map(function (feature) {
                            return '<li><i class="fas fa-check"></i> ' + escapeHtml(feature) + '</li>';
                        })
                        .join('');

                    const delay = 100 + index * 100;

                    return [
                        '<div class="category-card' + (item.featured ? ' featured' : '') + '" data-aos="fade-up" data-aos-delay="' + delay + '">',
                        '    <div class="category-icon">',
                        '        <i class="' + escapeAttr(item.iconClass || 'fas fa-box') + '"></i>',
                        '    </div>',
                        '    <h3 class="category-title">' + escapeHtml(item.title || '') + '</h3>',
                        '    <p class="category-description">' + escapeHtml(item.description || '') + '</p>',
                        '    <ul class="category-features">' + featureHtml + '</ul>',
                        '    <a href="' + escapeAttr(item.href || '#') + '" class="category-link">',
                        '        ' + escapeHtml(item.linkText || 'Saiba mais') + ' <i class="fas fa-arrow-right"></i>',
                        '    </a>',
                        item.hotBadge ? '    <div class="category-badge-hot">' + escapeHtml(item.hotBadge) + '</div>' : '',
                        item.bestBadge ? '    <div class="category-badge-best">' + escapeHtml(item.bestBadge) + '</div>' : '',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const esports = config.esportsSection || {};
        setImage('.esports .esports-image > img', esports.image);
        setText('.esports .esports-image .esports-badge span', esports.imageBadgeText);
        setText('.esports .esports-info .section-badge', esports.sectionBadge);
        setText('.esports .esports-info .section-title', esports.title);
        setText('.esports .esports-info .esports-description', esports.description);

        const teamsContainer = document.querySelector('.esports .esports-teams');
        if (teamsContainer && Array.isArray(esports.teams) && esports.teams.length > 0) {
            teamsContainer.innerHTML = esports.teams
                .map(function (team) {
                    return [
                        '<div class="team-logo">',
                        '    <img src="' + escapeAttr(team.src || '') + '" alt="' + escapeAttr(team.alt || 'Time patrocinado') + '">',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const achievementsContainer = document.querySelector('.esports .esports-achievements');
        if (achievementsContainer && Array.isArray(esports.achievements) && esports.achievements.length > 0) {
            achievementsContainer.innerHTML = esports.achievements
                .map(function (item) {
                    return [
                        '<div class="achievement">',
                        '    <i class="' + escapeAttr(item.iconClass || 'fas fa-check') + '"></i>',
                        '    <div>',
                        '        <strong>' + escapeHtml(item.value || '') + '</strong>',
                        '        <span>' + escapeHtml(item.label || '') + '</span>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        if (esports.cta) {
            setHtml(
                '.esports .esports-info .btn.btn-primary',
                '<span>' + escapeHtml(esports.cta.text || 'Saiba mais') + '</span><i class="' + escapeAttr(esports.cta.iconClass || 'fas fa-arrow-right') + '"></i>'
            );
            setAttr('.esports .esports-info .btn.btn-primary', 'href', esports.cta.href || '#');
        }

        const featured = config.featuredProductsSection || {};
        setText('.featured-products .section-badge', featured.badge);
        setText('.featured-products .section-title', featured.title);
        setText('.featured-products .section-description', featured.description);

        const featuredGrid = document.querySelector('.featured-products .products-grid');
        if (featuredGrid && Array.isArray(featured.products) && featured.products.length > 0) {
            featuredGrid.innerHTML = featured.products
                .map(function (item, index) {
                    const oldPriceHtml = item.oldPrice
                        ? '<span class="price-old">' + escapeHtml(item.oldPrice) + '</span>'
                        : '';

                    const ratingText = item.ratingText || (item.rating ? String(item.rating) + '/5' : '');

                    return [
                        '<div class="product-card" data-aos="fade-up" data-aos-delay="' + (100 + index * 100) + '">',
                        item.badgeText
                            ? '<div class="product-badge ' + escapeAttr(item.badgeType || 'discount') + '">' + escapeHtml(item.badgeText) + '</div>'
                            : '',
                        '    <div class="product-image">',
                        '        <img src="' + escapeAttr((item.image && item.image.src) || '') + '" alt="' + escapeAttr((item.image && item.image.alt) || item.name || 'Produto') + '">',
                        '        <button class="quick-view">',
                        '            <i class="fas fa-eye"></i> ' + escapeHtml(item.quickViewText || 'Visualização Rápida'),
                        '        </button>',
                        '    </div>',
                        '    <div class="product-info">',
                        '        <span class="product-category">' + escapeHtml(item.category || '') + '</span>',
                        '        <h3 class="product-name">' + escapeHtml(item.name || '') + '</h3>',
                        '        <div class="product-rating">',
                        renderStars(item.rating || 0),
                        '            <span>(' + escapeHtml(ratingText) + ')</span>',
                        '        </div>',
                        '        <div class="product-price">',
                        oldPriceHtml,
                        '            <span class="price-current">' + escapeHtml(item.currentPrice || '') + '</span>',
                        '        </div>',
                        '        <button class="btn-add-cart">',
                        '            <i class="fas fa-shopping-cart"></i> ' + escapeHtml(item.buttonText || 'Adicionar ao Carrinho'),
                        '        </button>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        if (featured.viewAllText !== undefined) {
            setHtml(
                '.featured-products .view-all .btn.btn-secondary',
                escapeHtml(featured.viewAllText) + ' <i class="fas fa-arrow-right"></i>'
            );
        }
        setAttr('.featured-products .view-all .btn.btn-secondary', 'href', featured.viewAllHref);

        const testimonials = config.testimonialsSection || {};
        setText('.testimonials .section-badge', testimonials.badge);
        setText('.testimonials .section-title', testimonials.title);

        const testimonialsGrid = document.querySelector('.testimonials .testimonials-grid');
        if (testimonialsGrid && Array.isArray(testimonials.items) && testimonials.items.length > 0) {
            testimonialsGrid.innerHTML = testimonials.items
                .map(function (item, index) {
                    return [
                        '<div class="testimonial-card" data-aos="fade-up" data-aos-delay="' + (100 + index * 100) + '">',
                        '    <div class="testimonial-rating">',
                        renderStars(item.rating || 0),
                        '    </div>',
                        '    <p class="testimonial-text">"' + escapeHtml(item.text || '') + '"</p>',
                        '    <div class="testimonial-author">',
                        '        <img src="' + escapeAttr((item.avatar && item.avatar.src) || '') + '" alt="' + escapeAttr((item.avatar && item.avatar.alt) || item.author || 'Cliente') + '">',
                        '        <div>',
                        '            <strong>' + escapeHtml(item.author || '') + '</strong>',
                        '            <span>' + escapeHtml(item.role || '') + '</span>',
                        '        </div>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const finalCta = config.finalCtaSection || {};
        setText('.final-cta .cta-title', finalCta.title);
        setText('.final-cta .cta-description', finalCta.description);

        const ctaButtons = document.querySelector('.final-cta .cta-buttons');
        if (ctaButtons && (finalCta.primaryButton || finalCta.secondaryButton)) {
            ctaButtons.innerHTML = [
                buildActionButton('btn btn-primary btn-large', finalCta.primaryButton, 'fas fa-arrow-right'),
                buildActionButton('btn btn-outline btn-large', finalCta.secondaryButton, 'fas fa-headset')
            ].join('');
        }

        const trustBadges = document.querySelector('.final-cta .trust-badges');
        if (trustBadges && Array.isArray(finalCta.trustBadges) && finalCta.trustBadges.length > 0) {
            trustBadges.innerHTML = finalCta.trustBadges
                .map(function (badge) {
                    return [
                        '<div class="trust-item">',
                        '    <i class="' + escapeAttr(badge.iconClass || 'fas fa-check') + '"></i>',
                        '    <span>' + escapeHtml(badge.text || '') + '</span>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        applyOverrides(config.overrides);
    }

    function applyPrime() {
        const config = window.PICHAU_CONTENT_CONFIG && window.PICHAU_CONTENT_CONFIG.prime;
        if (!config) {
            return;
        }

        const hero = config.hero || {};
        if (hero.badgeText !== undefined) {
            setHtml('.hero .hero-badge', '<i class="fas fa-crown"></i><span>' + escapeHtml(hero.badgeText) + '</span>');
        }

        if (hero.titlePrefix !== undefined || hero.titleHighlight !== undefined) {
            setHtml(
                '.hero .hero-title',
                escapeHtml(hero.titlePrefix || '') + '<br><span class="gradient-text">' + escapeHtml(hero.titleHighlight || '') + '</span>'
            );
        }

        setText('.hero .hero-description', hero.description);

        const heroStats = document.querySelector('.hero .hero-stats');
        if (heroStats && Array.isArray(hero.stats) && hero.stats.length > 0) {
            heroStats.innerHTML = hero.stats
                .map(function (item) {
                    return [
                        '<div class="stat-item">',
                        '    <div class="stat-icon"><i class="' + escapeAttr(item.iconClass || 'fas fa-check') + '"></i></div>',
                        '    <div class="stat-info">',
                        '        <strong>' + escapeHtml(item.title || '') + '</strong>',
                        '        <span>' + escapeHtml(item.subtitle || '') + '</span>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const heroCta = document.querySelector('.hero .hero-cta');
        if (heroCta && (hero.cta || hero.ctaNote !== undefined)) {
            const ctaButton = hero.cta || {};
            heroCta.innerHTML = [
                '<a href="' + escapeAttr(ctaButton.href || '#pricing') + '" class="btn btn-primary btn-large">',
                '    <span>' + escapeHtml(ctaButton.text || 'Saiba mais') + '</span>',
                '    <i class="' + escapeAttr(ctaButton.iconClass || 'fas fa-arrow-right') + '"></i>',
                '</a>',
                '<p class="cta-note"><i class="fas fa-shield-alt"></i> ' + escapeHtml(hero.ctaNote || '') + '</p>'
            ].join('');
        }

        const socialProof = hero.socialProof || {};
        const avatarGroup = document.querySelector('.hero .social-proof .avatar-group');
        if (avatarGroup && Array.isArray(socialProof.avatars) && socialProof.avatars.length > 0) {
            avatarGroup.innerHTML = socialProof.avatars
                .map(function (avatar) {
                    return '<img src="' + escapeAttr(avatar.src || '') + '" alt="' + escapeAttr(avatar.alt || 'Membro Prime') + '">';
                })
                .join('');
        }

        const proofText = document.querySelector('.hero .social-proof .proof-text');
        if (proofText && (socialProof.ratingValue !== undefined || socialProof.reviewsText !== undefined)) {
            proofText.innerHTML = [
                '<div class="rating">',
                renderStars(socialProof.stars || 5),
                '<strong>' + escapeHtml(socialProof.ratingValue || '') + '</strong>',
                '</div>',
                '<p>' + escapeHtml(socialProof.reviewsText || '') + '</p>'
            ].join('');
        }

        const primeCard = hero.primeCard || {};
        setText('.hero .prime-card .card-badge', primeCard.badge);
        setText('.hero .prime-card .card-body h3', primeCard.title);
        setText('.hero .prime-card .price-value', primeCard.priceValue);
        setText('.hero .prime-card .price-period', primeCard.pricePeriod);

        const primeCardList = document.querySelector('.hero .prime-card .benefit-list');
        if (primeCardList && Array.isArray(primeCard.benefits) && primeCard.benefits.length > 0) {
            primeCardList.innerHTML = primeCard.benefits
                .map(function (item) {
                    return '<li><i class="fas fa-check-circle"></i><span>' + escapeHtml(item) + '</span></li>';
                })
                .join('');
        }

        const benefits = config.benefitsSection || {};
        setText('.benefits .section-label', benefits.label);
        setText('.benefits .section-title', benefits.title);
        setText('.benefits .section-description', benefits.description);

        const benefitsGrid = document.querySelector('.benefits .benefits-grid');
        if (benefitsGrid && Array.isArray(benefits.items) && benefits.items.length > 0) {
            benefitsGrid.innerHTML = benefits.items
                .map(function (item, index) {
                    const statHtml = item.statHighlight
                        ? '<div class="benefit-stats"><span class="stat-highlight">' + escapeHtml(item.statHighlight) + '</span></div>'
                        : '';

                    return [
                        '<div class="benefit-card' + (item.featured ? ' featured' : '') + '" data-animate="fade-up" data-delay="' + (100 + (index % 3) * 100) + '">',
                        item.featuredBadge ? '<div class="featured-badge">' + escapeHtml(item.featuredBadge) + '</div>' : '',
                        '    <div class="benefit-icon ' + escapeAttr(item.gradientClass || 'gradient-1') + '">',
                        '        <i class="' + escapeAttr(item.iconClass || 'fas fa-check') + '"></i>',
                        '    </div>',
                        '    <h3 class="benefit-title">' + escapeHtml(item.title || '') + '</h3>',
                        '    <p class="benefit-description">' + escapeHtml(item.description || '') + '</p>',
                        statHtml,
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const comparison = config.comparisonSection || {};
        setText('.comparison .section-label', comparison.label);
        setText('.comparison .section-title', comparison.title);

        const comparisonTable = document.querySelector('.comparison .comparison-table');
        if (comparisonTable && Array.isArray(comparison.columns) && comparison.columns.length > 0) {
            comparisonTable.innerHTML = comparison.columns
                .map(function (column) {
                    const features = Array.isArray(column.features) ? column.features : [];
                    const featuresHtml = features
                        .map(function (feature) {
                            const icon = feature.type === 'times' ? 'fas fa-times' : 'fas fa-check';
                            return '<li><i class="' + icon + '"></i> ' + escapeHtml(feature.text || '') + '</li>';
                        })
                        .join('');

                    const extraHtml = column.extraText
                        ? '<span class="' + escapeAttr(column.extraClass || 'savings') + '">' + escapeHtml(column.extraText) + '</span>'
                        : '';

                    return [
                        '<div class="comparison-col ' + escapeAttr(column.variantClass || '') + '">',
                        column.badgeText
                            ? '<div class="' + escapeAttr(column.badgeClass || 'best-badge') + '">' + escapeHtml(column.badgeText) + '</div>'
                            : '',
                        '    <div class="comparison-header">',
                        '        <h3>' + escapeHtml(column.title || '') + '</h3>',
                        '        <p>' + escapeHtml(column.subtitle || '') + '</p>',
                        '    </div>',
                        '    <ul class="comparison-features">' + featuresHtml + '</ul>',
                        '    <div class="comparison-total">',
                        '        <span class="total-label">' + escapeHtml(column.totalLabel || '') + '</span>',
                        '        <span class="total-value ' + escapeAttr(column.totalValueClass || '') + '">' + escapeHtml(column.totalValue || '') + '</span>',
                        extraHtml,
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const pricing = config.pricingSection || {};
        setText('.pricing .section-label', pricing.label);
        setText('.pricing .section-title', pricing.title);
        setText('.pricing .section-description', pricing.description);

        const pricingCards = document.querySelector('.pricing .pricing-cards');
        if (pricingCards && Array.isArray(pricing.plans) && pricing.plans.length > 0) {
            pricingCards.innerHTML = pricing.plans
                .map(function (plan, index) {
                    const featureList = Array.isArray(plan.features) ? plan.features : [];
                    const featuresHtml = featureList
                        .map(function (feature) {
                            return '<li><i class="fas fa-check"></i> ' + escapeHtml(feature) + '</li>';
                        })
                        .join('');

                    const annualHtml = plan.annualText
                        ? [
                            '<div class="pricing-annual">',
                            '    <span>' + escapeHtml(plan.annualText) + '</span>',
                            plan.discountBadge ? '    <span class="discount-badge">' + escapeHtml(plan.discountBadge) + '</span>' : '',
                            '</div>'
                        ].join('')
                        : '';

                    const buttonClass = plan.buttonVariant === 'primary' ? 'btn btn-primary btn-full' : 'btn btn-outline btn-full';

                    const trialNote = plan.trialNote
                        ? '<p class="trial-note"><i class="fas fa-info-circle"></i> ' + escapeHtml(plan.trialNote) + '</p>'
                        : '';

                    return [
                        '<div class="pricing-card' + (plan.featured ? ' featured' : '') + '" data-animate="fade-up" data-delay="' + (100 + index * 100) + '">',
                        plan.popularBadge ? '<div class="popular-badge">' + escapeHtml(plan.popularBadge) + '</div>' : '',
                        '    <div class="pricing-header">',
                        '        <h3 class="plan-name">' + escapeHtml(plan.name || '') + '</h3>',
                        '        <p class="plan-description">' + escapeHtml(plan.description || '') + '</p>',
                        '    </div>',
                        '    <div class="pricing-price">',
                        '        <span class="currency">' + escapeHtml(plan.currency || '') + '</span>',
                        '        <span class="amount">' + escapeHtml(plan.amount || '') + '</span>',
                        '        <span class="period">' + escapeHtml(plan.period || '') + '</span>',
                        '    </div>',
                        annualHtml,
                        '    <ul class="pricing-features">' + featuresHtml + '</ul>',
                        '    <button class="' + buttonClass + '">' + escapeHtml(plan.buttonText || 'Assinar') + '</button>',
                        trialNote,
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const guarantee = pricing.guarantee || {};
        setText('.pricing .guarantee .guarantee-content h3', guarantee.title);
        setText('.pricing .guarantee .guarantee-content p', guarantee.description);

        const faq = config.faqSection || {};
        setText('.faq .section-label', faq.label);
        setText('.faq .section-title', faq.title);

        const faqContainer = document.querySelector('.faq .faq-container');
        if (faqContainer && Array.isArray(faq.items) && faq.items.length > 0) {
            faqContainer.innerHTML = faq.items
                .map(function (item, index) {
                    return [
                        '<div class="faq-item" data-animate="fade-up" data-delay="' + (100 + index * 50) + '">',
                        '    <button class="faq-question">',
                        '        <span>' + escapeHtml(item.question || '') + '</span>',
                        '        <i class="fas fa-chevron-down"></i>',
                        '    </button>',
                        '    <div class="faq-answer">',
                        '        <p>' + escapeHtml(item.answer || '') + '</p>',
                        '    </div>',
                        '</div>'
                    ].join('');
                })
                .join('');
        }

        const finalCta = config.finalCtaSection || {};
        setText('.final-cta .cta-title', finalCta.title);
        setText('.final-cta .cta-description', finalCta.description);

        if (finalCta.urgencyPrefix !== undefined || finalCta.urgencyHighlight !== undefined || finalCta.urgencySuffix !== undefined) {
            setHtml(
                '.final-cta .cta-urgency span',
                escapeHtml(finalCta.urgencyPrefix || '') +
                ' <strong>' + escapeHtml(finalCta.urgencyHighlight || '') + '</strong> ' +
                escapeHtml(finalCta.urgencySuffix || '')
            );
        }

        if (finalCta.button) {
            setHtml(
                '.final-cta .cta-buttons',
                '<a href="' + escapeAttr(finalCta.button.href || '#pricing') + '" class="btn btn-primary btn-large"><span>' +
                    escapeHtml(finalCta.button.text || 'Assinar') +
                    '</span><i class="' + escapeAttr(finalCta.button.iconClass || 'fas fa-arrow-right') + '"></i></a>'
            );
        }

        const ctaFeatures = document.querySelector('.final-cta .cta-features');
        if (ctaFeatures && Array.isArray(finalCta.features) && finalCta.features.length > 0) {
            ctaFeatures.innerHTML = finalCta.features
                .map(function (feature) {
                    return '<div class="cta-feature"><i class="fas fa-check-circle"></i><span>' + escapeHtml(feature) + '</span></div>';
                })
                .join('');
        }

        applyOverrides(config.overrides);
    }

    window.PichauContentRenderer = {
        applyStore: applyStore,
        applyGaming: applyGaming,
        applyPrime: applyPrime
    };
})();