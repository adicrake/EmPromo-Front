// Dados Iniciais
const mockVendors = [
    {
        id: '1',
        name: 'Ana Silva',
        classroom: 'Sala 203',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        rating: 5,
        schedule: { start: '08:00', end: '14:00' },
        specialty: 'Gelados e Doces',
        whatsapp: '+244 923 456 789',
        instagram: '@ana_imetro',
        facebook: 'AnaIMETRO'
    },
    {
        id: '2',
        name: 'João Mendes',
        classroom: 'Sala 105',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        rating: 4.5,
        schedule: { start: '10:00', end: '16:00' },
        specialty: 'Bebidas Naturais',
        whatsapp: '+244 923 111 222',
        instagram: '@joao_bebidas'
    },
    {
        id: '3',
        name: 'Maria Costa',
        classroom: 'Sala 301',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        rating: 5,
        schedule: { start: '07:30', end: '17:00' },
        specialty: 'Salgados e Doces'
    },
    {
        id: '4',
        name: 'Carlos Ferreira',
        classroom: 'Sala 210',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        rating: 4.5,
        schedule: { start: '09:00', end: '15:00' },
        specialty: 'Salgados'
    },
    {
        id: '5',
        name: 'Sofia Martins',
        classroom: 'Sala 115',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        rating: 5,
        schedule: { start: '08:30', end: '16:30' },
        specialty: 'Gelados e Salgados'
    },
    {
        id: '6',
        name: 'Pedro Santos',
        classroom: 'Sala 302',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
        rating: 4,
        schedule: { start: '11:00', end: '17:00' },
        specialty: 'Bebidas'
    }
];

const mockProducts = [
    {
        id: '1',
        name: 'Gelado de Chocolate',
        price: 150,
        category: 'gelados',
        photos: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '1'
    },
    {
        id: '2',
        name: 'Sumo Natural de Laranja',
        price: 200,
        category: 'bebidas',
        photos: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop'],
        rating: 4.5,
        vendorId: '2'
    },
    {
        id: '3',
        name: 'Rissol de Carne',
        price: 100,
        category: 'salgados',
        photos: ['https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '1'
    },
    {
        id: '4',
        name: 'Bolo de Chocolate',
        price: 250,
        category: 'doces',
        photos: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '3'
    },
    {
        id: '5',
        name: 'Água Mineral',
        price: 80,
        category: 'bebidas',
        photos: ['https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop'],
        rating: 4,
        vendorId: '2'
    },
    {
        id: '6',
        name: 'Empada de Frango',
        price: 120,
        category: 'salgados',
        photos: ['https://images.unsplash.com/photo-1619740455993-9e4daf3e15f6?w=400&h=400&fit=crop'],
        rating: 4.5,
        vendorId: '3'
    },
    {
        id: '7',
        name: 'Pastel de Carne',
        price: 180,
        category: 'salgados',
        photos: ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '4'
    },
    {
        id: '8',
        name: 'Gelado de Morango',
        price: 150,
        category: 'gelados',
        photos: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '5'
    },
    {
        id: '9',
        name: 'Refrigerante',
        price: 120,
        category: 'bebidas',
        photos: ['https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop'],
        rating: 4,
        vendorId: '6'
    },
    {
        id: '10',
        name: 'Brigadeiro',
        price: 50,
        category: 'doces',
        photos: ['https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop'],
        rating: 5,
        vendorId: '4'
    },
    {
        id: '11',
        name: 'Coxinha',
        price: 150,
        category: 'salgados',
        photos: ['https://images.unsplash.com/photo-1601050690532-db4950f5c2f4?w=400&h=400&fit=crop'],
        rating: 4.5,
        vendorId: '5'
    },
    {
        id: '12',
        name: 'Café',
        price: 100,
        category: 'bebidas',
        photos: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop'],
        rating: 4.5,
        vendorId: '6'
    }
];

// Estado da Aplicação
let vendors = [];
let products = [];
let selectedCategory = 'todos';
let searchQuery = '';
let currentEditingVendor = null;
let isAdminAuthenticated = false;

// Inicialização
function init() {
    loadDataFromStorage();
    renderProducts();
    renderVendors();
    setupEventListeners();
}

// LocalStorage
function loadDataFromStorage() {
    const savedVendors = localStorage.getItem('levaaqui_vendors');
    const savedProducts = localStorage.getItem('levaaqui_products');
    
    vendors = savedVendors ? JSON.parse(savedVendors) : mockVendors;
    products = savedProducts ? JSON.parse(savedProducts) : mockProducts;
    
    // Sincronizar vendors com products
    products = products.map(product => {
        const vendor = vendors.find(v => v.id === product.vendorId);
        return { ...product, vendor };
    });
}

function saveToStorage() {
    localStorage.setItem('levaaqui_vendors', JSON.stringify(vendors));
    localStorage.setItem('levaaqui_products', JSON.stringify(products));
}

// Event Listeners
function setupEventListeners() {
    // Smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// Tab Navigation
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Show/hide sections
    const productsSection = document.getElementById('products');
    const vendorsSection = document.getElementById('vendors');
    
    if (tabName === 'products') {
        productsSection.classList.remove('hidden');
        vendorsSection.classList.add('hidden');
    } else {
        productsSection.classList.add('hidden');
        vendorsSection.classList.remove('hidden');
    }
}

// Category Filter
function selectCategory(category) {
    selectedCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    filterProducts();
}

// Search
function filterProducts() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderProducts();
}

// Render Stars
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    if (hasHalfStar) {
        starsHTML += '<span class="star" style="opacity: 0.5;">★</span>';
    }
    
    return starsHTML;
}

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            product.name.toLowerCase().includes(searchQuery) ||
            (product.vendor && product.vendor.name.toLowerCase().includes(searchQuery));
        
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum produto encontrado.</p>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        const vendor = product.vendor || vendors.find(v => v.id === product.vendorId);
        
        return `
            <div class="product-card" onclick="showVendorPage('${product.vendorId}')">
                <div class="product-image">
                    <img src="${product.photos[0]}" alt="${product.name}">
                    <div class="product-image-overlay"></div>
                    ${product.rating === 5 ? `
                        <div class="top-rated-badge">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                <polyline points="16 7 22 7 22 13"></polyline>
                            </svg>
                            Top Rated
                        </div>
                    ` : ''}
                    <div class="category-badge">${product.category}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price-rating">
                        <div>
                            <p class="product-price-label">Preço</p>
                            <p class="product-price">
                                ${product.price}
                                <span class="product-price-currency">Kz</span>
                            </p>
                        </div>
                        <div class="product-rating">
                            <div class="stars">${renderStars(product.rating)}</div>
                            <span class="rating-text">${product.rating}/5</span>
                        </div>
                    </div>
                    ${vendor ? `
                        <div class="product-vendor">
                            <button class="vendor-button" onclick="event.stopPropagation(); showVendorPage('${vendor.id}')">
                                <div class="vendor-avatar-wrapper">
                                    <img src="${vendor.photo}" alt="${vendor.name}" class="vendor-avatar">
                                    <div class="vendor-status"></div>
                                </div>
                                <div class="vendor-info">
                                    <p class="vendor-name">${vendor.name}</p>
                                    <p class="vendor-location">📍 ${vendor.classroom}</p>
                                </div>
                                <div class="vendor-rating-badge">
                                    <span class="star">★</span>
                                    <span class="vendor-rating-number">${vendor.rating}</span>
                                </div>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Render Vendors
function renderVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    
    vendorsGrid.innerHTML = vendors.map(vendor => {
        const vendorProductCount = products.filter(p => p.vendorId === vendor.id).length;
        
        return `
            <div class="vendor-card" onclick="showVendorPage('${vendor.id}')">
                <div class="vendor-header">
                    <img src="${vendor.photo}" alt="${vendor.name}" class="vendor-card-avatar">
                    <div class="vendor-card-info">
                        <h3 class="vendor-card-name">${vendor.name}</h3>
                        <p class="vendor-card-specialty">${vendor.specialty}</p>
                    </div>
                </div>
                <div class="vendor-details">
                    <div class="vendor-detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${vendor.classroom}
                    </div>
                    <div class="vendor-detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${vendor.schedule.start} - ${vendor.schedule.end}
                    </div>
                    <div class="vendor-detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        ${vendorProductCount} produtos
                    </div>
                    <div class="vendor-detail-item">
                        <span class="star">★</span>
                        ${vendor.rating} estrelas
                    </div>
                </div>
                ${vendor.whatsapp || vendor.instagram || vendor.facebook ? `
                    <div class="vendor-social">
                        ${vendor.whatsapp ? `
                            <a href="https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}" class="social-btn" onclick="event.stopPropagation()" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                WhatsApp
                            </a>
                        ` : ''}
                        ${vendor.instagram ? `
                            <a href="https://instagram.com/${vendor.instagram.replace('@', '')}" class="social-btn" onclick="event.stopPropagation()" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                Instagram
                            </a>
                        ` : ''}
                        ${vendor.facebook ? `
                            <a href="https://facebook.com/${vendor.facebook}" class="social-btn" onclick="event.stopPropagation()" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                Facebook
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Show Vendor Page
function showVendorPage(vendorId) {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return;
    
    const vendorProducts = products.filter(p => p.vendorId === vendorId);
    
    const modal = document.getElementById('vendorPageModal');
    const content = document.getElementById('vendorPageContent');
    
    content.innerHTML = `
        <div class="vendor-page">
            <div class="vendor-page-header">
                <button class="back-button" onclick="hideVendorPage()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Voltar
                </button>
                <div class="vendor-page-info">
                    <img src="${vendor.photo}" alt="${vendor.name}" class="vendor-page-avatar">
                    <div class="vendor-page-details">
                        <h2>${vendor.name}</h2>
                        <p class="vendor-page-specialty">${vendor.specialty}</p>
                    </div>
                </div>
                <div class="vendor-page-stats">
                    <div class="vendor-page-stat">
                        <p class="vendor-page-stat-label">Localização</p>
                        <p class="vendor-page-stat-value">${vendor.classroom}</p>
                    </div>
                    <div class="vendor-page-stat">
                        <p class="vendor-page-stat-label">Horário</p>
                        <p class="vendor-page-stat-value">${vendor.schedule.start} - ${vendor.schedule.end}</p>
                    </div>
                    <div class="vendor-page-stat">
                        <p class="vendor-page-stat-label">Classificação</p>
                        <p class="vendor-page-stat-value">${vendor.rating} ★</p>
                    </div>
                </div>
                ${vendor.whatsapp || vendor.instagram || vendor.facebook ? `
                    <div class="vendor-page-social">
                        ${vendor.whatsapp ? `
                            <a href="https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}" class="vendor-social-btn" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                WhatsApp
                            </a>
                        ` : ''}
                        ${vendor.instagram ? `
                            <a href="https://instagram.com/${vendor.instagram.replace('@', '')}" class="vendor-social-btn" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                Instagram
                            </a>
                        ` : ''}
                        ${vendor.facebook ? `
                            <a href="https://facebook.com/${vendor.facebook}" class="vendor-social-btn" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                Facebook
                            </a>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="vendor-page-products">
                <h3>Produtos de ${vendor.name} (${vendorProducts.length})</h3>
                <div class="products-grid">
                    ${vendorProducts.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.photos[0]}" alt="${product.name}">
                                <div class="product-image-overlay"></div>
                                ${product.rating === 5 ? `
                                    <div class="top-rated-badge">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                            <polyline points="16 7 22 7 22 13"></polyline>
                                        </svg>
                                        Top Rated
                                    </div>
                                ` : ''}
                                <div class="category-badge">${product.category}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-price-rating">
                                    <div>
                                        <p class="product-price-label">Preço</p>
                                        <p class="product-price">
                                            ${product.price}
                                            <span class="product-price-currency">Kz</span>
                                        </p>
                                    </div>
                                    <div class="product-rating">
                                        <div class="stars">${renderStars(product.rating)}</div>
                                        <span class="rating-text">${product.rating}/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function hideVendorPage() {
    document.getElementById('vendorPageModal').classList.add('hidden');
}

// Admin Panel
function showAdminPanel() {
    document.getElementById('adminModal').classList.remove('hidden');
    if (isAdminAuthenticated) {
        showAdminDashboard();
    }
}

function hideAdminPanel() {
    document.getElementById('adminModal').classList.add('hidden');
}

function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
        isAdminAuthenticated = true;
        showAdminDashboard();
    } else {
        alert('Senha incorreta!');
    }
}

function showAdminDashboard() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    renderAdminVendors();
}

function showAdminTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

function renderAdminVendors() {
    const vendorsList = document.getElementById('vendorsList');
    
    vendorsList.innerHTML = vendors.map(vendor => {
        const vendorProductCount = products.filter(p => p.vendorId === vendor.id).length;
        
        return `
            <div class="admin-vendor-card">
                <div class="admin-vendor-header">
                    <img src="${vendor.photo}" alt="${vendor.name}" class="admin-vendor-avatar">
                    <div class="admin-vendor-info">
                        <h3 class="admin-vendor-name">${vendor.name}</h3>
                        <p class="admin-vendor-classroom">${vendor.classroom}</p>
                        <p class="admin-vendor-schedule">${vendor.schedule.start} - ${vendor.schedule.end}</p>
                        <p class="admin-vendor-products">${vendorProductCount} produtos</p>
                    </div>
                </div>
                <div class="admin-vendor-actions">
                    <button class="btn-edit" onclick="editVendor('${vendor.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar
                    </button>
                    <button class="btn-delete" onclick="deleteVendor('${vendor.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Deletar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function showVendorForm(vendorId = null) {
    currentEditingVendor = vendorId ? vendors.find(v => v.id === vendorId) : null;
    
    const modal = document.getElementById('vendorFormModal');
    const title = document.getElementById('vendorFormTitle');
    
    title.textContent = currentEditingVendor ? 'Editar Vendedor' : 'Novo Vendedor';
    
    if (currentEditingVendor) {
        document.getElementById('vendorId').value = currentEditingVendor.id;
        document.getElementById('vendorName').value = currentEditingVendor.name;
        document.getElementById('vendorClassroom').value = currentEditingVendor.classroom;
        document.getElementById('vendorPhoto').value = currentEditingVendor.photo;
        document.getElementById('vendorSpecialty').value = currentEditingVendor.specialty;
        document.getElementById('vendorScheduleStart').value = currentEditingVendor.schedule.start;
        document.getElementById('vendorScheduleEnd').value = currentEditingVendor.schedule.end;
        document.getElementById('vendorRating').value = currentEditingVendor.rating;
        document.getElementById('vendorWhatsapp').value = currentEditingVendor.whatsapp || '';
        document.getElementById('vendorInstagram').value = currentEditingVendor.instagram || '';
        document.getElementById('vendorFacebook').value = currentEditingVendor.facebook || '';
    } else {
        document.getElementById('vendorForm').reset();
        document.getElementById('vendorId').value = '';
    }
    
    modal.classList.remove('hidden');
}

function hideVendorForm() {
    document.getElementById('vendorFormModal').classList.add('hidden');
    currentEditingVendor = null;
}

function editVendor(vendorId) {
    showVendorForm(vendorId);
}

function deleteVendor(vendorId) {
    if (confirm('Tem certeza que deseja deletar este vendedor? Todos os produtos associados também serão removidos.')) {
        vendors = vendors.filter(v => v.id !== vendorId);
        products = products.filter(p => p.vendorId !== vendorId);
        saveToStorage();
        renderAdminVendors();
        renderProducts();
        renderVendors();
    }
}

function saveVendor(event) {
    event.preventDefault();
    
    const id = document.getElementById('vendorId').value || Date.now().toString();
    const vendor = {
        id: id,
        name: document.getElementById('vendorName').value,
        classroom: document.getElementById('vendorClassroom').value,
        photo: document.getElementById('vendorPhoto').value,
        specialty: document.getElementById('vendorSpecialty').value,
        schedule: {
            start: document.getElementById('vendorScheduleStart').value,
            end: document.getElementById('vendorScheduleEnd').value
        },
        rating: parseFloat(document.getElementById('vendorRating').value),
        whatsapp: document.getElementById('vendorWhatsapp').value || undefined,
        instagram: document.getElementById('vendorInstagram').value || undefined,
        facebook: document.getElementById('vendorFacebook').value || undefined
    };
    
    if (currentEditingVendor) {
        vendors = vendors.map(v => v.id === id ? vendor : v);
        // Update products with new vendor data
        products = products.map(p => {
            if (p.vendorId === id) {
                return { ...p, vendor };
            }
            return p;
        });
    } else {
        vendors.push(vendor);
    }
    
    saveToStorage();
    renderAdminVendors();
    renderProducts();
    renderVendors();
    hideVendorForm();
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
