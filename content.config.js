window.PICHAU_CONTENT_CONFIG = {
    store: {
        hero: {
            badge: 'BLACK FRIDAY TODO DIA',
            titlePrefix: 'Ofertas Imperdíveis em',
            titleHighlight: 'Hardware',
            description: 'Até 50% OFF em produtos selecionados + Frete Grátis para todo Brasil',
            ctaText: 'Ver Ofertas',
            ctaHref: '#ofertas',
            image: {
                src: '../assets/BannerBlackGamer.png',
                alt: 'Banner principal de ofertas Pichau Store'
            }
        },
        categoriesSection: {
            title: 'Explore por Categoria',
            items: [
                {
                    iconClass: 'fas fa-microchip',
                    title: 'Processadores',
                    subtitle: 'Intel & AMD',
                    linkText: 'Ver Produtos →',
                    href: '#'
                },
                {
                    iconClass: 'fas fa-memory',
                    title: 'Placas de Vídeo',
                    subtitle: 'NVIDIA & AMD',
                    linkText: 'Ver Produtos →',
                    href: '#'
                },
                {
                    iconClass: 'fas fa-hdd',
                    title: 'Armazenamento',
                    subtitle: 'SSD & HDD',
                    linkText: 'Ver Produtos →',
                    href: '#'
                },
                {
                    iconClass: 'fas fa-desktop',
                    title: 'Monitores',
                    subtitle: 'Gamer & Profissional',
                    linkText: 'Ver Produtos →',
                    href: '#'
                },
                {
                    iconClass: 'fas fa-keyboard',
                    title: 'Periféricos',
                    subtitle: 'Teclados & Mouses',
                    linkText: 'Ver Produtos →',
                    href: '#'
                }
            ]
        },
        offersSection: {
            title: 'Ofertas Relâmpago',
            timerLabel: 'Termina em:',
            viewAllText: 'Ver Todas as Ofertas',
            viewAllHref: '#',
            products: [
                {
                    badgeText: '-40%',
                    badgeType: 'discount',
                    image: {
                        src: '../assets/products/rtx4060.jpg',
                        alt: 'Placa de Vídeo RTX 4060 Ti 8GB'
                    },
                    name: 'Placa de Vídeo RTX 4060 Ti 8GB',
                    rating: 4.5,
                    reviews: 245,
                    oldPrice: 'R$ 2.499,99',
                    currentPrice: 'R$ 1.499,99',
                    installment: '12x R$ 125,00',
                    buttonText: 'Adicionar'
                },
                {
                    badgeText: 'HOT',
                    badgeType: 'hot',
                    image: {
                        src: '../assets/products/ryzen7.jpg',
                        alt: 'Processador AMD Ryzen 7 5800X3D'
                    },
                    name: 'Processador AMD Ryzen 7 5800X3D',
                    rating: 5,
                    reviews: 532,
                    currentPrice: 'R$ 1.799,99',
                    installment: '10x R$ 179,99',
                    buttonText: 'Adicionar'
                },
                {
                    badgeText: 'NOVO',
                    badgeType: 'new',
                    image: {
                        src: '../assets/products/monitorlg4k.jpg',
                        alt: 'Monitor LG 27 4K UHD 144Hz'
                    },
                    name: 'Monitor LG 27" 4K UHD 144Hz',
                    rating: 4.5,
                    reviews: 189,
                    oldPrice: 'R$ 2.899,99',
                    currentPrice: 'R$ 2.299,99',
                    installment: '12x R$ 191,66',
                    buttonText: 'Adicionar'
                },
                {
                    badgeText: '-35%',
                    badgeType: 'discount',
                    image: {
                        src: '../assets/products/ssdsn850x.jpg',
                        alt: 'SSD NVMe 1TB WD Black SN850X'
                    },
                    name: 'SSD NVMe 1TB WD Black SN850X',
                    rating: 5,
                    reviews: 892,
                    oldPrice: 'R$ 899,99',
                    currentPrice: 'R$ 584,99',
                    installment: '6x R$ 97,50',
                    buttonText: 'Adicionar'
                }
            ]
        },
        benefitsSection: {
            items: [
                {
                    iconClass: 'fas fa-truck',
                    title: 'Frete Grátis',
                    description: 'Em compras acima de R$ 199'
                },
                {
                    iconClass: 'fas fa-credit-card',
                    title: 'Parcelamento',
                    description: 'Em até 12x sem juros'
                },
                {
                    iconClass: 'fas fa-shield-alt',
                    title: 'Compra Segura',
                    description: 'Proteção garantida'
                },
                {
                    iconClass: 'fas fa-undo',
                    title: 'Troca Fácil',
                    description: '30 dias para trocar'
                }
            ]
        },
        overrides: {
            text: [],
            html: [],
            images: [],
            links: []
        }
    },
    gaming: {
        hero: {
            badgeIcon: 'fas fa-trophy',
            badgeText: 'Equipamento de Campeões',
            titlePrefix: 'Domine o Jogo com o',
            titleHighlight: 'Setup Perfeito',
            description: 'Equipamentos de alta performance desenvolvidos para gamers profissionais e entusiastas que buscam o melhor desempenho competitivo',
            stats: [
                { number: '50K+', label: 'Gamers Ativos' },
                { number: '500+', label: 'Produtos Gaming' },
                { number: '98%', label: 'Satisfação' }
            ],
            primaryCta: {
                text: 'Explorar Produtos',
                href: '#products',
                iconClass: 'fas fa-arrow-right'
            },
            secondaryCta: {
                text: 'Ver Promoções',
                href: '#featured',
                iconClass: 'fas fa-fire'
            },
            banner: {
                src: 'https://via.placeholder.com/800x600/0a0a0a/FF6700?text=Banner+Promocional',
                alt: 'Banner promocional da Pichau Gaming',
                badgeText: 'ATÉ 40% OFF'
            }
        },
        categoriesSection: {
            badge: 'Equipamento Profissional',
            title: 'Categorias em Destaque',
            description: 'Encontre exatamente o que você precisa para dominar suas partidas',
            items: [
                {
                    iconClass: 'fas fa-keyboard',
                    title: 'Periféricos',
                    description: 'Teclados, mouses e headsets com latência zero',
                    features: ['Switches mecânicos premium', 'RGB customizável', 'DPI ajustável'],
                    linkText: 'Ver Produtos',
                    href: '#',
                    hotBadge: 'HOT'
                },
                {
                    iconClass: 'fas fa-desktop',
                    title: 'PCs Gamer',
                    description: 'Computadores prontos para jogar em máxima qualidade',
                    features: ['RTX 4000 Series', 'Processadores Intel/AMD', 'Garantia estendida'],
                    linkText: 'Montar PC',
                    href: '#',
                    featured: true,
                    bestBadge: 'MAIS VENDIDO'
                },
                {
                    iconClass: 'fas fa-couch',
                    title: 'Setup Completo',
                    description: 'Cadeiras, mesas e acessórios para seu battlestation',
                    features: ['Ergonomia profissional', 'Iluminação RGB', 'Organização de cabos'],
                    linkText: 'Explorar',
                    href: '#'
                }
            ]
        },
        esportsSection: {
            image: {
                src: 'https://via.placeholder.com/600x700/0a0a0a/FF6700?text=E-Sports+Team',
                alt: 'Time E-Sports patrocinado'
            },
            imageBadgeText: 'Patrocinador Oficial',
            sectionBadge: 'Pichau Gaming E-Sports',
            title: 'Equipando os Campeões',
            description: 'Nossos produtos são utilizados pelos melhores jogadores profissionais do Brasil e do mundo. A mesma tecnologia que leva equipes ao pódio está disponível para você.',
            teams: [
                {
                    src: 'https://via.placeholder.com/120x120/1a1a1a/FF6700?text=Team+1',
                    alt: 'Time patrocinado 1'
                },
                {
                    src: 'https://via.placeholder.com/120x120/1a1a1a/FF6700?text=Team+2',
                    alt: 'Time patrocinado 2'
                },
                {
                    src: 'https://via.placeholder.com/120x120/1a1a1a/FF6700?text=Team+3',
                    alt: 'Time patrocinado 3'
                }
            ],
            achievements: [
                {
                    iconClass: 'fas fa-medal',
                    value: '15+',
                    label: 'Campeonatos'
                },
                {
                    iconClass: 'fas fa-users',
                    value: '200+',
                    label: 'Atletas Patrocinados'
                },
                {
                    iconClass: 'fas fa-gamepad',
                    value: '10+',
                    label: 'Jogos Competitivos'
                }
            ],
            cta: {
                text: 'Conheça Nossos Times',
                href: '#',
                iconClass: 'fas fa-arrow-right'
            }
        },
        featuredProductsSection: {
            badge: 'Ofertas Limitadas',
            title: 'Produtos em Destaque',
            description: 'Aproveite preços especiais em equipamentos premium',
            viewAllText: 'Ver Todos os Produtos',
            viewAllHref: '#',
            products: [
                {
                    badgeText: '-35%',
                    badgeType: 'discount',
                    image: {
                        src: 'https://via.placeholder.com/400x300/0a0a0a/FF6700?text=Teclado+Mecanico',
                        alt: 'Teclado mecânico RGB'
                    },
                    category: 'Periféricos',
                    name: 'Teclado Mecânico RGB Pro',
                    rating: 4.5,
                    ratingText: '4.8/5',
                    oldPrice: 'R$ 799,99',
                    currentPrice: 'R$ 519,99',
                    buttonText: 'Adicionar ao Carrinho',
                    quickViewText: 'Visualização Rápida'
                },
                {
                    badgeText: 'NOVO',
                    badgeType: 'new',
                    image: {
                        src: 'https://via.placeholder.com/400x300/0a0a0a/FF6700?text=Mouse+Gaming',
                        alt: 'Mouse gaming 20K DPI'
                    },
                    category: 'Periféricos',
                    name: 'Mouse Gaming 20K DPI',
                    rating: 5,
                    ratingText: '5.0/5',
                    currentPrice: 'R$ 349,99',
                    buttonText: 'Adicionar ao Carrinho',
                    quickViewText: 'Visualização Rápida'
                },
                {
                    badgeText: 'HOT',
                    badgeType: 'hot',
                    image: {
                        src: 'https://via.placeholder.com/400x300/0a0a0a/FF6700?text=Headset+7.1',
                        alt: 'Headset 7.1 Surround'
                    },
                    category: 'Áudio',
                    name: 'Headset 7.1 Surround',
                    rating: 5,
                    ratingText: '4.9/5',
                    oldPrice: 'R$ 599,99',
                    currentPrice: 'R$ 449,99',
                    buttonText: 'Adicionar ao Carrinho',
                    quickViewText: 'Visualização Rápida'
                },
                {
                    badgeText: '-20%',
                    badgeType: 'discount',
                    image: {
                        src: 'https://via.placeholder.com/400x300/0a0a0a/FF6700?text=Cadeira+Gamer',
                        alt: 'Cadeira gamer profissional'
                    },
                    category: 'Setup',
                    name: 'Cadeira Gamer Pro',
                    rating: 4.5,
                    ratingText: '4.7/5',
                    oldPrice: 'R$ 1.499,99',
                    currentPrice: 'R$ 1.199,99',
                    buttonText: 'Adicionar ao Carrinho',
                    quickViewText: 'Visualização Rápida'
                }
            ]
        },
        testimonialsSection: {
            badge: 'O Que Dizem Nossos Gamers',
            title: 'Avaliações Reais',
            items: [
                {
                    rating: 5,
                    text: 'Meu desempenho melhorou absurdamente depois que montei meu setup completo aqui. A qualidade dos periféricos é incomparável!',
                    author: 'Pedro X.',
                    role: 'Pro Player - Valorant',
                    avatar: {
                        src: 'https://via.placeholder.com/60x60/1a1a1a/FF6700?text=PX',
                        alt: 'Foto de Pedro X.'
                    }
                },
                {
                    rating: 5,
                    text: 'Atendimento excepcional e produtos de primeira linha. Já fiz 3 compras e sempre superam minhas expectativas!',
                    author: 'Julia L.',
                    role: 'Streamer - League of Legends',
                    avatar: {
                        src: 'https://via.placeholder.com/60x60/1a1a1a/FF6700?text=JL',
                        alt: 'Foto de Julia L.'
                    }
                },
                {
                    rating: 5,
                    text: 'Preços justos, produtos originais e entrega rápida. Virei cliente fiel da Pichau Gaming!',
                    author: 'Rafael C.',
                    role: 'Gamer Competitivo - CS2',
                    avatar: {
                        src: 'https://via.placeholder.com/60x60/1a1a1a/FF6700?text=RC',
                        alt: 'Foto de Rafael C.'
                    }
                }
            ]
        },
        finalCtaSection: {
            title: 'Pronto para Elevar seu Jogo?',
            description: 'Junte-se a milhares de gamers que já transformaram sua experiência com nossos produtos',
            primaryButton: {
                text: 'Montar Meu Setup',
                href: '#',
                iconClass: 'fas fa-arrow-right'
            },
            secondaryButton: {
                text: 'Falar com Especialista',
                href: '#',
                iconClass: 'fas fa-headset'
            },
            trustBadges: [
                { iconClass: 'fas fa-shield-alt', text: 'Garantia Estendida' },
                { iconClass: 'fas fa-truck', text: 'Frete Rápido' },
                { iconClass: 'fas fa-lock', text: 'Compra Segura' },
                { iconClass: 'fas fa-undo', text: 'Troca Grátis' }
            ]
        },
        overrides: {
            text: [],
            html: [],
            images: [],
            links: []
        }
    },
    prime: {
        hero: {
            badgeText: 'Mais de 50.000 membros ativos',
            titlePrefix: 'Economize Mais,',
            titleHighlight: 'Compre Melhor',
            description: 'Torne-se membro do Pichau Prime e tenha acesso a benefícios exclusivos que vão transformar sua experiência de compra. Frete grátis ilimitado, descontos especiais e muito mais.',
            stats: [
                {
                    iconClass: 'fas fa-truck',
                    title: 'Frete Grátis',
                    subtitle: 'Ilimitado'
                },
                {
                    iconClass: 'fas fa-percent',
                    title: 'Até 15%',
                    subtitle: 'De Desconto'
                },
                {
                    iconClass: 'fas fa-bolt',
                    title: 'Acesso',
                    subtitle: 'Antecipado'
                }
            ],
            cta: {
                text: 'Experimentar Grátis por 30 Dias',
                href: '#pricing',
                iconClass: 'fas fa-arrow-right'
            },
            ctaNote: 'Cancele quando quiser, sem compromisso',
            socialProof: {
                avatars: [
                    { src: 'https://i.pravatar.cc/40?img=1', alt: 'Membro Prime 1' },
                    { src: 'https://i.pravatar.cc/40?img=2', alt: 'Membro Prime 2' },
                    { src: 'https://i.pravatar.cc/40?img=3', alt: 'Membro Prime 3' },
                    { src: 'https://i.pravatar.cc/40?img=4', alt: 'Membro Prime 4' },
                    { src: 'https://i.pravatar.cc/40?img=5', alt: 'Membro Prime 5' }
                ],
                stars: 5,
                ratingValue: '4.9/5',
                reviewsText: 'Mais de 10.000 avaliações positivas'
            },
            primeCard: {
                badge: 'PRIME',
                title: 'Seus Benefícios',
                benefits: [
                    'Frete Grátis Ilimitado',
                    'Descontos Exclusivos',
                    'Acesso Antecipado',
                    'Cupons Mensais',
                    'Suporte Prioritário'
                ],
                priceValue: 'R$ 19,90',
                pricePeriod: '/mês'
            }
        },
        benefitsSection: {
            label: 'Por Que Ser Prime?',
            title: 'Benefícios que Fazem a Diferença',
            description: 'Cada real investido retorna em economia e vantagens exclusivas',
            items: [
                {
                    iconClass: 'fas fa-shipping-fast',
                    gradientClass: 'gradient-1',
                    title: 'Frete Grátis Ilimitado',
                    description: 'Receba todos os seus produtos sem custos de frete, não importa quantas vezes compre no mês.',
                    statHighlight: 'Economia média de R$ 450/ano'
                },
                {
                    iconClass: 'fas fa-tag',
                    gradientClass: 'gradient-2',
                    title: 'Descontos Exclusivos',
                    description: 'Até 15% de desconto em produtos selecionados + cupons mensais para suas compras.',
                    statHighlight: 'Economia média de R$ 800/ano',
                    featured: true,
                    featuredBadge: 'MAIS POPULAR'
                },
                {
                    iconClass: 'fas fa-bolt',
                    gradientClass: 'gradient-3',
                    title: 'Acesso Antecipado',
                    description: 'Seja o primeiro a aproveitar promoções e lançamentos antes de todo mundo.',
                    statHighlight: '24h de antecedência'
                },
                {
                    iconClass: 'fas fa-gift',
                    gradientClass: 'gradient-4',
                    title: 'Ofertas Semanais',
                    description: 'Toda semana, novos produtos com descontos especiais só para membros Prime.'
                },
                {
                    iconClass: 'fas fa-headset',
                    gradientClass: 'gradient-5',
                    title: 'Suporte Prioritário',
                    description: 'Atendimento diferenciado com prioridade no suporte e resolução rápida.'
                },
                {
                    iconClass: 'fas fa-crown',
                    gradientClass: 'gradient-6',
                    title: 'Eventos Exclusivos',
                    description: 'Participação em eventos, sorteios e promoções exclusivas para membros.'
                }
            ]
        },
        comparisonSection: {
            label: 'Comparação',
            title: 'Veja Como Você Economiza',
            columns: [
                {
                    variantClass: '',
                    title: 'Sem Prime',
                    subtitle: 'Compras tradicionais',
                    features: [
                        { type: 'times', text: 'Frete pago em cada compra' },
                        { type: 'times', text: 'Preços normais' },
                        { type: 'times', text: 'Sem acesso antecipado' },
                        { type: 'times', text: 'Suporte padrão' },
                        { type: 'times', text: 'Sem cupons exclusivos' }
                    ],
                    totalLabel: 'Custo anual estimado:',
                    totalValue: 'R$ 1.500+',
                    totalValueClass: 'expensive'
                },
                {
                    variantClass: 'decoy',
                    title: 'Prime Mensal',
                    subtitle: 'Plano mensal',
                    features: [
                        { type: 'check', text: 'Frete grátis ilimitado' },
                        { type: 'check', text: 'Descontos de até 10%' },
                        { type: 'check', text: 'Acesso antecipado' },
                        { type: 'check', text: 'Suporte prioritário' },
                        { type: 'check', text: '1 cupom por mês' }
                    ],
                    totalLabel: 'Investimento anual:',
                    totalValue: 'R$ 238,80'
                },
                {
                    variantClass: 'best',
                    badgeText: 'MELHOR VALOR',
                    badgeClass: 'best-badge',
                    title: 'Prime Anual',
                    subtitle: 'Economize 20%',
                    features: [
                        { type: 'check', text: 'Frete grátis ilimitado' },
                        { type: 'check', text: 'Descontos de até 15%' },
                        { type: 'check', text: 'Acesso antecipado' },
                        { type: 'check', text: 'Suporte prioritário VIP' },
                        { type: 'check', text: '2 cupons por mês' },
                        { type: 'check', text: 'Brindes exclusivos' }
                    ],
                    totalLabel: 'Investimento anual:',
                    totalValue: 'R$ 190,00',
                    totalValueClass: 'best',
                    extraText: 'Economize R$ 48,80',
                    extraClass: 'savings'
                }
            ]
        },
        pricingSection: {
            label: 'Escolha Seu Plano',
            title: 'Investimento que se Paga Sozinho',
            description: 'Teste grátis por 30 dias. Cancele quando quiser, sem multas ou taxas.',
            plans: [
                {
                    name: 'Mensal',
                    description: 'Flexibilidade total',
                    currency: 'R$',
                    amount: '19,90',
                    period: '/mês',
                    features: [
                        'Todos os benefícios Prime',
                        'Frete grátis ilimitado',
                        'Descontos exclusivos',
                        'Cancele quando quiser'
                    ],
                    buttonText: 'Começar Agora',
                    buttonVariant: 'outline'
                },
                {
                    name: 'Anual',
                    description: 'Melhor custo-benefício',
                    currency: 'R$',
                    amount: '15,83',
                    period: '/mês',
                    annualText: 'R$ 190,00 cobrado anualmente',
                    discountBadge: 'Economize 20%',
                    features: [
                        'Todos os benefícios Prime',
                        'Frete grátis ilimitado',
                        'Descontos de até 15%',
                        'Cupons extras mensais',
                        'Suporte VIP'
                    ],
                    buttonText: 'Assinar Plano Anual',
                    buttonVariant: 'primary',
                    featured: true,
                    popularBadge: 'MAIS ESCOLHIDO',
                    trialNote: '30 dias grátis para testar'
                }
            ],
            guarantee: {
                title: 'Garantia de 30 Dias',
                description: 'Não ficou satisfeito? Cancele dentro de 30 dias e receba reembolso total. Sem perguntas, sem complicações.'
            }
        },
        faqSection: {
            label: 'Dúvidas Frequentes',
            title: 'Perguntas e Respostas',
            items: [
                {
                    question: 'Como funciona o período de teste gratuito?',
                    answer: 'Você tem 30 dias completos para testar todos os benefícios do Pichau Prime sem pagar nada. Se não gostar, é só cancelar antes do fim do período e não será cobrado.'
                },
                {
                    question: 'Posso cancelar a qualquer momento?',
                    answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. O cancelamento é simples e pode ser feito direto na sua conta.'
                },
                {
                    question: 'Quanto eu realmente economizo sendo Prime?',
                    answer: 'Em média, nossos membros economizam mais de R$ 1.200 por ano somando frete grátis e descontos. Se você compra regularmente, o Prime se paga em apenas 1-2 compras!'
                },
                {
                    question: 'O frete grátis vale para todo o Brasil?',
                    answer: 'Sim! O benefício de frete grátis é válido para entregas em todo território nacional, incluindo regiões Norte e Nordeste.'
                },
                {
                    question: 'Como funcionam os cupons mensais?',
                    answer: 'Todo mês você recebe cupons exclusivos com descontos em categorias selecionadas. Os cupons são enviados por email e ficam disponíveis na sua conta Prime.'
                },
                {
                    question: 'Existe fidelidade ou contrato?',
                    answer: 'Não! Mesmo no plano anual, você pode cancelar quando quiser. No plano mensal, você paga mês a mês sem qualquer compromisso de permanência.'
                }
            ]
        },
        finalCtaSection: {
            title: 'Pronto Para Economizar?',
            description: 'Junte-se a mais de 50.000 membros satisfeitos e comece a aproveitar todos os benefícios hoje mesmo.',
            urgencyPrefix: 'Oferta especial:',
            urgencyHighlight: '30 dias grátis',
            urgencySuffix: 'para novos membros',
            button: {
                text: 'Começar Teste Grátis',
                href: '#pricing',
                iconClass: 'fas fa-arrow-right'
            },
            features: [
                'Sem cartão de crédito',
                'Cancele quando quiser',
                'Garantia de 30 dias'
            ]
        },
        overrides: {
            text: [],
            html: [],
            images: [],
            links: []
        }
    }
};