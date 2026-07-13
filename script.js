// ====================  SISTEMA LEVAAQUI V3 - SITE PÚBLICO ====================
// Sistema completo com contas de vendedores, aprovação e expiração automática

// ==================== ESTRUTURA DE DADOS ====================

/*
VENDEDOR:
{
  id: string,
  email: string,
  password: string (hash em produção),
  name: string,
  studentNumber: string,
  year: string,
  course: string,
  photo: string,
  classroom: string,
  specialty: string,
  schedule: { start, end },
  phone: string,
  whatsapp: string,
  instagram: string,
  facebook: string,
  status: 'pending' | 'approved' | 'expired',
  validUntil: timestamp | null,
  createdAt: timestamp,
  approvedAt: timestamp | null,
  expiresAt: timestamp | null
}

PRODUTO:
{
  id: string,
  vendorId: string,
  name: string,
  price: number,
  category: string,
  photos: [url1, url2, url3],
  description: string,
  status: 'pending' | 'approved' | 'expired',
  validUntil: timestamp | null,
  createdAt: timestamp,
  approvedAt: timestamp | null,
  expiresAt: timestamp | null
}
*/

// ==================== ESTADO GLOBAL ====================

let currentVendor = null;
let selectedCategory = 'todos';
let searchQuery = '';

// ==================== INICIALIZAÇÃO ====================

function init() {
    checkExpiredItems();
    updateStats();
    renderProducts();
    renderVendors();
    setupEventListeners();
}

// ==================== LOCALSTORAGE ====================

function getVendors() {
    const data = localStorage.getItem('levaaqui_vendors_v3');
    return data ? JSON.parse(data) : [];
}

function saveVendors(vendors) {
    localStorage.setItem('levaaqui_vendors_v3', JSON.stringify(vendors));
}

function getProducts() {
    const data = localStorage.getItem('levaaqui_products_v3');
    return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
    localStorage.setItem('levaaqui_products_v3', JSON.stringify(products));
}

// ==================== VERIFICAÇÃO DE EXPIRAÇÃO ====================

function checkExpiredItems() {
    const now = Date.now();
    let vendors = getVendors();
    let products = getProducts();
    let hasChanges = false;

    // Verificar vendedores expirados
    vendors = vendors.map(vendor => {
        if (vendor.status === 'approved' && vendor.expiresAt && now >= vendor.expiresAt) {
            vendor.status = 'expired';
            hasChanges = true;
        }
        return vendor;
    });

    // Verificar produtos expirados
    products = products.map(product => {
        if (product.status === 'approved' && product.expiresAt && now >= product.expiresAt) {
            product.status = 'expired';
            hasChanges = true;
        }
        return product;
    });

    if (hasChanges) {
        saveVendors(vendors);
        saveProducts(products);
    }
}

// ==================== AUTENTICAÇÃO DE VENDEDOR ====================

function showVendorLogin() {
    document.getElementById('vendorModal').classList.remove('hidden');
    showVendorAuthTab('login');
}

function hideVendorLogin() {
    document.getElementById('vendorModal').classList.add('hidden');
    currentVendor = null;
}

function showVendorAuthTab(tab) {
    const content = document.getElementById('vendorContent');
    
    if (tab === 'login') {
        content.innerHTML = `
            <div class="vendor-auth-tabs">
                <button class="vendor-auth-tab active" onclick="showVendorAuthTab('login')">Entrar</button>
                <button class="vendor-auth-tab" onclick="showVendorAuthTab('register')">Criar Conta</button>
            </div>
            <form onsubmit="vendorLogin(event)" style="padding: 0 2rem 2rem;">
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" id="loginEmail" required placeholder="seu@email.com">
                </div>
                <div class="form-group">
                    <label>Senha *</label>
                    <input type="password" id="loginPassword" required placeholder="Sua senha">
                </div>
                <button type="submit" class="btn-save">Entrar</button>
            </form>
        `;
    } else {
        content.innerHTML = `
            <div class="vendor-auth-tabs">
                <button class="vendor-auth-tab" onclick="showVendorAuthTab('login')">Entrar</button>
                <button class="vendor-auth-tab active" onclick="showVendorAuthTab('register')">Criar Conta</button>
            </div>
            <form onsubmit="vendorRegister(event)" style="padding: 0 2rem 2rem; max-height: 70vh; overflow-y: auto;">
                <div class="form-section">
                    <h3>Dados de Acesso</h3>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" id="regEmail" required placeholder="seu@email.com">
                    </div>
                    <div class="form-group">
                        <label>Senha *</label>
                        <input type="password" id="regPassword" required placeholder="Mínimo 6 caracteres" minlength="6">
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Informações Pessoais</h3>
                    <div class="form-group">
                        <label>Nome Completo *</label>
                        <input type="text" id="regName" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Número de Estudante *</label>
                            <input type="text" id="regStudentNumber" required>
                        </div>
                        <div class="form-group">
                            <label>Ano *</label>
                            <select id="regYear" required>
                                <option value="">Selecione</option>
                                <option value="1">1º Ano</option>
                                <option value="2">2º Ano</option>
                                <option value="3">3º Ano</option>
                                <option value="4">4º Ano</option>
                                <option value="5">5º Ano</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Curso *</label>
                        <input type="text" id="regCourse" required>
                    </div>
                    <div class="form-group">
                        <label>Foto (URL) *</label>
                        <input type="url" id="regPhoto" required>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Informações de Venda</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Sala de Venda *</label>
                            <input type="text" id="regClassroom" required>
                        </div>
                        <div class="form-group">
                            <label>Especialidade *</label>
                            <input type="text" id="regSpecialty" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Horário Início *</label>
                            <input type="time" id="regScheduleStart" required value="08:00">
                        </div>
                        <div class="form-group">
                            <label>Horário Fim *</label>
                            <input type="time" id="regScheduleEnd" required value="17:00">
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Contatos</h3>
                    <div class="form-group">
                        <label>Telefone *</label>
                        <input type="tel" id="regPhone" required>
                    </div>
                    <div class="form-group">
                        <label>WhatsApp *</label>
                        <input type="tel" id="regWhatsapp" required>
                    </div>
                    <div class="form-group">
                        <label>Instagram</label>
                        <input type="text" id="regInstagram">
                    </div>
                    <div class="form-group">
                        <label>Facebook</label>
                        <input type="text" id="regFacebook">
                    </div>
                </div>
                
                <button type="submit" class="btn-save">Criar Conta</button>
            </form>
        `;
    }
}

function vendorLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const vendors = getVendors();
    const vendor = vendors.find(v => v.email === email && v.password === password);
    
    if (vendor) {
        currentVendor = vendor;
        showVendorDashboard();
    } else {
        alert('Email ou senha incorretos!');
    }
}

function vendorRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('regEmail').value;
    const vendors = getVendors();
    
    if (vendors.find(v => v.email === email)) {
        alert('Este email já está cadastrado!');
        return;
    }
    
    const newVendor = {
        id: 'vendor-' + Date.now(),
        email: email,
        password: document.getElementById('regPassword').value,
        name: document.getElementById('regName').value,
        studentNumber: document.getElementById('regStudentNumber').value,
        year: document.getElementById('regYear').value,
        course: document.getElementById('regCourse').value,
        photo: document.getElementById('regPhoto').value,
        classroom: document.getElementById('regClassroom').value,
        specialty: document.getElementById('regSpecialty').value,
        schedule: {
            start: document.getElementById('regScheduleStart').value,
            end: document.getElementById('regScheduleEnd').value
        },
        phone: document.getElementById('regPhone').value,
        whatsapp: document.getElementById('regWhatsapp').value,
        instagram: document.getElementById('regInstagram').value || undefined,
        facebook: document.getElementById('regFacebook').value || undefined,
        status: 'pending',
        validUntil: null,
        createdAt: Date.now(),
        approvedAt: null,
        expiresAt: null
    };
    
    vendors.push(newVendor);
    saveVendors(vendors);
    
    alert('Conta criada com sucesso! Aguarde a aprovação do administrador.');
    showVendorAuthTab('login');
}

// ==================== DASHBOARD DO VENDEDOR ====================

function showVendorDashboard() {
    const products = getProducts().filter(p => p.vendorId === currentVendor.id);
    const pendingProducts = products.filter(p => p.status === 'pending').length;
    const approvedProducts = products.filter(p => p.status === 'approved').length;
    
    const content = document.getElementById('vendorContent');
    content.innerHTML = `
        <div class="vendor-dashboard">
            <div class="vendor-welcome">
                <h3>Bem-vindo, ${currentVendor.name}!</h3>
                <p>Status da conta: <strong>${getStatusLabel(currentVendor.status)}</strong></p>
                ${currentVendor.status === 'approved' && currentVendor.expiresAt ? `
                    <p>Válido até: ${new Date(currentVendor.expiresAt).toLocaleDateString('pt')}</p>
                ` : ''}
            </div>
            
            ${currentVendor.status === 'pending' ? `
                <div class="pending-notice">
                    <p><strong>⏳ Sua conta está pendente de aprovação.</strong></p>
                    <p>O administrador irá analisar suas informações em breve. Você pode adicionar produtos agora, mas eles só aparecerão no site após a aprovação.</p>
                </div>
            ` : ''}
            
            <div class="vendor-stats">
                <div class="vendor-stat-card pending">
                    <h4>Produtos Pendentes</h4>
                    <p class="stat-number">${pendingProducts}</p>
                </div>
                <div class="vendor-stat-card approved">
                    <h4>Produtos Aprovados</h4>
                    <p class="stat-number">${approvedProducts}</p>
                </div>
            </div>
            
            <h4 style="margin-bottom: 1rem;">Meus Produtos</h4>
            
            <button class="btn-add-product" onclick="showAddProductForm()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Adicionar Produto
            </button>
            
            <div id="vendorProductsList" class="vendor-products-list" style="margin-top: 1rem;">
                ${renderVendorProducts(products)}
            </div>
            
            <button onclick="vendorLogout()" class="btn-cancel" style="margin-top: 2rem; width: 100%;">Sair</button>
        </div>
    `;
}

function renderVendorProducts(products) {
    if (products.length === 0) {
        return '<p style="text-align: center; color: #6b7280; padding: 2rem;">Você ainda não adicionou produtos.</p>';
    }
    
    return products.map(product => `
        <div class="vendor-product-card">
            <img src="${product.photos[0]}" alt="${product.name}" class="vendor-product-image">
            <div class="vendor-product-info">
                <p class="vendor-product-name">${product.name}</p>
                <p class="vendor-product-price">${product.price} Kz</p>
                <p class="vendor-product-category">${product.category}</p>
            </div>
            <span class="vendor-product-status ${product.status}">
                ${getStatusLabel(product.status)}
            </span>
        </div>
    `).join('');
}

function showAddProductForm() {
    const content = document.getElementById('vendorContent');
    content.innerHTML = `
        <div class="vendor-dashboard">
            <button onclick="showVendorDashboard()" class="btn-cancel" style="margin-bottom: 1rem;">← Voltar</button>
            
            <form onsubmit="addProduct(event)" class="product-form">
                <h4>Adicionar Novo Produto</h4>
                
                <div class="form-group">
                    <label>Nome do Produto *</label>
                    <input type="text" id="productName" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Preço (Kz) *</label>
                        <input type="number" id="productPrice" required min="1">
                    </div>
                    <div class="form-group">
                        <label>Categoria *</label>
                        <select id="productCategory" required>
                            <option value="">Selecione</option>
                            <option value="gelados">Gelados</option>
                            <option value="bebidas">Bebidas</option>
                            <option value="salgados">Salgados</option>
                            <option value="doces">Doces</option>
                            <option value="roupas">Roupas</option>
                            <option value="acessorios">Acessórios</option>
                            <option value="diversos">Diversos</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Descrição</label>
                    <textarea id="productDescription" rows="3" style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem;"></textarea>
                </div>
                
                <div class="form-group">
                    <label>Foto 1 (URL) *</label>
                    <input type="url" id="productPhoto1" required>
                </div>
                
                <div class="form-group">
                    <label>Foto 2 (URL)</label>
                    <input type="url" id="productPhoto2">
                </div>
                
                <div class="form-group">
                    <label>Foto 3 (URL)</label>
                    <input type="url" id="productPhoto3">
                </div>
                
                <button type="submit" class="btn-save">Adicionar Produto</button>
            </form>
        </div>
    `;
}

function addProduct(event) {
    event.preventDefault();
    
    const photos = [
        document.getElementById('productPhoto1').value,
        document.getElementById('productPhoto2').value,
        document.getElementById('productPhoto3').value
    ].filter(p => p);
    
    const newProduct = {
        id: 'product-' + Date.now(),
        vendorId: currentVendor.id,
        name: document.getElementById('productName').value,
        price: parseInt(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        photos: photos,
        description: document.getElementById('productDescription').value || '',
        rating: 5,
        status: 'pending',
        validUntil: null,
        createdAt: Date.now(),
        approvedAt: null,
        expiresAt: null
    };
    
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);
    
    alert('Produto adicionado! Aguarde a aprovação do administrador.');
    showVendorDashboard();
}

function vendorLogout() {
    currentVendor = null;
    hideVendorLogin();
}

function getStatusLabel(status) {
    const labels = {
        'pending': 'Pendente',
        'approved': 'Aprovado',
        'expired': 'Expirado'
    };
    return labels[status] || status;
}

// ==================== NAVEGAÇÃO ====================

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
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

function filterProducts() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderProducts();
}

// ==================== ESTATÍSTICAS ====================

function updateStats() {
    const vendors = getVendors().filter(v => v.status === 'approved');
    const products = getProducts().filter(p => p.status === 'approved');
    
    document.getElementById('statsProducts').textContent = products.length;
    document.getElementById('statsVendors').textContent = vendors.length;
}

// ==================== RENDER ====================

function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += '<span class="star">★</span>';
    }
    return stars;
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const vendors = getVendors();
    const allProducts = getProducts();
    
    // Apenas produtos aprovados e não expirados
    let products = allProducts.filter(p => p.status === 'approved');
    
    // Adicionar informações do vendedor
    products = products.map(product => {
        const vendor = vendors.find(v => v.id === product.vendorId && v.status === 'approved');
        return { ...product, vendor };
    }).filter(p => p.vendor); // Remover produtos sem vendedor aprovado
    
    // Filtrar por categoria e busca
    products = products.filter(product => {
        const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            product.name.toLowerCase().includes(searchQuery) ||
            product.vendor.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum produto encontrado.</p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="showVendorPage('${product.vendor.id}')">
            <div class="product-image">
                <img src="${product.photos[0]}" alt="${product.name}">
                <div class="product-image-overlay"></div>
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
                <div class="product-vendor">
                    <button class="vendor-button" onclick="event.stopPropagation(); showVendorPage('${product.vendor.id}')">
                        <div class="vendor-avatar-wrapper">
                            <img src="${product.vendor.photo}" alt="${product.vendor.name}" class="vendor-avatar">
                            <div class="vendor-status"></div>
                        </div>
                        <div class="vendor-info">
                            <p class="vendor-name">${product.vendor.name}</p>
                            <p class="vendor-location">📍 ${product.vendor.classroom}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    const vendors = getVendors().filter(v => v.status === 'approved');
    const products = getProducts().filter(p => p.status === 'approved');
    
    if (vendors.length === 0) {
        vendorsGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum vendedor disponível.</p>';
        return;
    }
    
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
                    <div class="vendor-detail-item">📍 ${vendor.classroom}</div>
                    <div class="vendor-detail-item">🕐 ${vendor.schedule.start} - ${vendor.schedule.end}</div>
                    <div class="vendor-detail-item">📦 ${vendorProductCount} produtos</div>
                </div>
                <div class="vendor-social">
                    ${vendor.phone ? `<a href="tel:${vendor.phone.replace(/\s/g, '')}" class="phone-btn" onclick="event.stopPropagation()">Ligar</a>` : ''}
                    ${vendor.whatsapp ? `<a href="https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}" class="social-btn" onclick="event.stopPropagation()" target="_blank">WhatsApp</a>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ==================== PÁGINA DO VENDEDOR ====================

function showVendorPage(vendorId) {
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === vendorId && v.status === 'approved');
    if (!vendor) return;
    
    const vendorProducts = getProducts().filter(p => p.vendorId === vendorId && p.status === 'approved');
    
    const modal = document.getElementById('vendorPageModal');
    const content = document.getElementById('vendorPageContent');
    
    content.innerHTML = `
        <div class="vendor-page">
            <div class="vendor-page-header">
                <button class="back-button" onclick="hideVendorPage()">← Voltar</button>
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
                </div>
                <div class="vendor-page-social">
                    ${vendor.phone ? `<a href="tel:${vendor.phone.replace(/\s/g, '')}" class="vendor-social-btn">${vendor.phone}</a>` : ''}
                    ${vendor.whatsapp ? `<a href="https://wa.me/${vendor.whatsapp.replace(/\s/g, '')}" class="vendor-social-btn" target="_blank">WhatsApp</a>` : ''}
                    ${vendor.instagram ? `<a href="https://instagram.com/${vendor.instagram.replace('@', '')}" class="vendor-social-btn" target="_blank">Instagram</a>` : ''}
                    ${vendor.facebook ? `<a href="https://facebook.com/${vendor.facebook}" class="vendor-social-btn" target="_blank">Facebook</a>` : ''}
                </div>
            </div>
            <div class="vendor-page-products">
                <h3>Produtos de ${vendor.name} (${vendorProducts.length})</h3>
                <div class="products-grid">
                    ${vendorProducts.map(product => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.photos[0]}" alt="${product.name}">
                                <div class="category-badge">${product.category}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-price-rating">
                                    <div>
                                        <p class="product-price-label">Preço</p>
                                        <p class="product-price">${product.price} <span class="product-price-currency">Kz</span></p>
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

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Verificar expiração a cada minuto
    setInterval(checkExpiredItems, 60000);
}

// ==================== INICIALIZAÇÃO ====================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
