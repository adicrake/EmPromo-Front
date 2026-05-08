// ==================== SISTEMA LEVAAQUI V3 - SITE PÚBLICO ====================
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
            </div>
           
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

// ==================== ALTERAÇÃO FEITA AQUI ====================
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
                    <label>Foto 1 *</label>
                    <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                        <label><input type="radio" name="photo1Type" value="url" checked onchange="togglePhotoInput(1)"> URL</label>
                        <label><input type="radio" name="photo1Type" value="file" onchange="togglePhotoInput(1)"> Do computador</label>
                    </div>
                    <input type="url" id="productPhoto1" placeholder="Cole o link da imagem" required>
                    <input type="file" id="productPhoto1File" accept="image/*" style="display: none;">
                </div>
               
                <div class="form-group">
                    <label>Foto 2 (opcional)</label>
                    <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                        <label><input type="radio" name="photo2Type" value="url" checked onchange="togglePhotoInput(2)"> URL</label>
                        <label><input type="radio" name="photo2Type" value="file" onchange="togglePhotoInput(2)"> Do computador</label>
                    </div>
                    <input type="url" id="productPhoto2" placeholder="Cole o link da imagem">
                    <input type="file" id="productPhoto2File" accept="image/*" style="display: none;">
                </div>
               
                <div class="form-group">
                    <label>Foto 3 (opcional)</label>
                    <div style="display: flex; gap: 12px; margin-bottom: 8px;">
                        <label><input type="radio" name="photo3Type" value="url" checked onchange="togglePhotoInput(3)"> URL</label>
                        <label><input type="radio" name="photo3Type" value="file" onchange="togglePhotoInput(3)"> Do computador</label>
                    </div>
                    <input type="url" id="productPhoto3" placeholder="Cole o link da imagem">
                    <input type="file" id="productPhoto3File" accept="image/*" style="display: none;">
                </div>
               
                <button type="submit" class="btn-save">Adicionar Produto</button>
            </form>
        </div>
    `;
}

function togglePhotoInput(num) {
    const urlInput = document.getElementById(`productPhoto${num}`);
    const fileInput = document.getElementById(`productPhoto${num}File`);
    const isUrl = document.querySelector(`input[name="photo${num}Type"]:checked`).value === 'url';
    
    urlInput.style.display = isUrl ? 'block' : 'none';
    fileInput.style.display = isUrl ? 'none' : 'block';
    
    if (isUrl) fileInput.value = '';
    else urlInput.value = '';
}

async function addProduct(event) {
    event.preventDefault();
   
    const photos = [];

    for (let i = 1; i <= 3; i++) {
        const urlInput = document.getElementById(`productPhoto${i}`);
        const fileInput = document.getElementById(`productPhoto${i}File`);
        const isUrlSelected = document.querySelector(`input[name="photo${i}Type"]:checked`).value === 'url';

        if (i === 1 && !urlInput.value && !fileInput.files[0]) {
            alert("A Foto 1 é obrigatória!");
            return;
        }

        if (isUrlSelected && urlInput.value) {
            photos.push(urlInput.value);
        } else if (!isUrlSelected && fileInput.files[0]) {
            const base64 = await fileToBase64(fileInput.files[0]);
            photos.push(base64);
        }
    }
   
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
   
    alert('Produto adicionado com sucesso! Aguarde a aprovação do administrador.');
    showVendorDashboard();
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
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
// ==================== RESTO DO CÓDIGO (sem alterações) ====================
function toggleMobileMenu() { /* ... teu código original */ }
function switchTab(tabName) { /* ... teu código original */ }
function selectCategory(category) { /* ... teu código original */ }
function filterProducts() { /* ... teu código original */ }
function updateStats() { /* ... teu código original */ }
function renderStars(rating) { /* ... teu código original */ }
function renderProducts() { /* ... teu código original */ }
function renderVendors() { /* ... teu código original */ }
function showVendorPage(vendorId) { /* ... teu código original */ }
function hideVendorPage() { /* ... teu código original */ }
function setupEventListeners() { /* ... teu código original */ }

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
