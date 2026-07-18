// ==================== CONFIGURAÇÃO DO FIREBASE (CORRIGIDO PARA NAVEGADOR) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlbkFz0vT9xT8f83Qr_H7Lj4dNkf37dFU",
  authDomain: "levaaqui-8c25a.firebaseapp.com",
  projectId: "levaaqui-8c25a",
  storageBucket: "levaaqui-8c25a.firebasestorage.app",
  messagingSenderId: "775354367302",
  appId: "1:775354367302:web:9d71fe439ca8eb8c3ff947"
};

// Inicializa o Firebase e o Banco de Dados Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====================  SISTEMA LEVAAQUI V3 - SITE PÚBLICO ====================

// Coloca as funções no escopo global para os botões do HTML voltarem a funcionar
window.showVendorLogin = showVendorLogin;
window.hideVendorLogin = hideVendorLogin;
window.showVendorAuthTab = showVendorAuthTab;
window.vendorLogin = vendorLogin;
window.vendorRegister = vendorRegister;
window.showVendorDashboard = showVendorDashboard;
window.showAddProductForm = showAddProductForm;
window.addProduct = addProduct;
window.vendorLogout = vendorLogout;
window.toggleMobileMenu = toggleMobileMenu;
window.switchTab = switchTab;
window.selectCategory = selectCategory;
window.filterProducts = filterProducts;
window.showVendorPage = showVendorPage;
window.hideVendorPage = hideVendorPage;

let currentVendor = null;
let selectedCategory = 'todos';
let searchQuery = '';

function init() {
    checkExpiredItems();
    updateStats();
    renderProducts();
    renderVendors();
    setupEventListeners();
}

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

function checkExpiredItems() {
    const now = Date.now();
    let vendors = getVendors();
    let products = getProducts();
    let hasChanges = false;

    vendors = vendors.map(vendor => {
        if (vendor.status === 'approved' && vendor.expiresAt && now >= vendor.expiresAt) {
            vendor.status = 'expired';
            hasChanges = true;
        }
        return vendor;
    });

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
                ➕ Adicionar Produto
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

async function addProduct(event) {
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

    try {
        await addDoc(collection(db, "produtos"), {
            nome: newProduct.name,
            email: currentVendor.email
        });
    } catch (error) {
        console.error("Erro Firebase:", error);
    }
    
    alert('Produto adicionado! Aguarde a aprovação do administrador.');
    showVendorDashboard();
}

function vendorLogout() {
    currentVendor = null;
    hideVendorLogin();
}

function getStatusLabel(status) {
    const labels = { 'pending': 'Pendente', 'approved': 'Aprovado', 'expired': 'Expirado' };
    return labels[status] || status;
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) tab.classList.add('active');
    });
    
    if (tabName === 'products') {
        document.getElementById('products').classList.remove('hidden');
        document.getElementById('vendors').classList.add('hidden');
    } else {
        document.getElementById('products').classList.add('hidden');
        document.getElementById('vendors').classList.remove('hidden');
    }
}

function selectCategory(category) {
    selectedCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) btn.classList.add('active');
    });
    filterProducts();
}

function filterProducts() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderProducts();
}

function updateStats() {
    const vendors = getVendors().filter(v => v.status === 'approved');
    const products = getProducts().filter(p => p.status === 'approved');
    document.getElementById('statsProducts').textContent = products.length;
    document.getElementById('statsVendors').textContent = vendors.length;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) stars += '<span class="star">★</span>';
    return stars;
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const vendors = getVendors();
    let products = getProducts().filter(p => p.status === 'approved');
    
    products = products.map(product => {
        const vendor = vendors.find(v => v.id === product.vendorId && v.status === 'approved');
        return { ...product, vendor };
    }).filter(p => p.vendor);
    
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
                <div class="category-badge">${product.category}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price-rating">
                    <div>
                        <p class="product-price">${product.price} Kz</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderVendors() {
    const vendorsGrid = document.getElementById('vendorsGrid');
    if (!vendorsGrid) return;
    
    const vendors = getVendors().filter(v => v.status === 'approved');
    if (vendors.length === 0) {
        vendorsGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum vendedor disponível.</p>';
        return;
    }
    
    vendorsGrid.innerHTML = vendors.map(vendor => `
        <div class="vendor-card" onclick="showVendorPage('${vendor.id}')">
            <h3>${vendor.name}</h3>
            <p>📍 ${vendor.classroom}</p>
        </div>
    `).join('');
}

function showVendorPage(vendorId) {
    const vendor = getVendors().find(v => v.id === vendorId && v.status === 'approved');
    if (!vendor) return;
    
    const modal = document.getElementById('vendorPageModal');
    const content = document.getElementById('vendorPageContent');
    
    content.innerHTML = `<h2>${vendor.name}</h2><p>Sala: ${vendor.classroom}</p><button onclick="hideVendorPage()">Fechar</button>`;
    modal.classList.remove('hidden');
}

function hideVendorPage() {
    document.getElementById('vendorPageModal').classList.add('hidden');
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    setInterval(checkExpiredItems, 60000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
