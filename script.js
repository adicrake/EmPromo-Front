// ==================== SISTEMA LEVAAQUI V3 - SITE PÚBLICO ====================
let currentVendor = null;
let selectedCategory = 'todos';
let searchQuery = '';

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
        content.innerHTML = `... (mantido igual, sem alteração)`;
        // (O código de registo continua igual)
    }
}

// ... (outras funções mantidas iguais até o dashboard)

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
                Adicionar Produto
            </button>
           
            <div id="vendorProductsList" class="vendor-products-list" style="margin-top: 1rem;">
                ${renderVendorProducts(products)}
            </div>
           
            <button onclick="vendorLogout()" class="btn-cancel" style="margin-top: 2rem; width: 100%;">Sair</button>
        </div>
    `;
}

// ==================== NOVA FUNÇÃO - FORMULÁRIO DE PRODUTO ====================
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

// ==================== FUNÇÃO ADD PRODUCT ATUALIZADA ====================
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
        } 
        else if (!isUrlSelected && fileInput.files[0]) {
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

    alert('Produto adicionado com sucesso!');
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

// ==================== RESTO DO CÓDIGO (mantido igual) ====================
function vendorLogout() {
    currentVendor = null;
    hideVendorLogin();
}

function getStatusLabel(status) {
    const labels = { 'pending': 'Pendente', 'approved': 'Aprovado', 'expired': 'Expirado' };
    return labels[status] || status;
}

// ... (todas as outras funções como renderProducts, renderVendors, etc. permanecem iguais)

function init() {
    checkExpiredItems();
    updateStats();
    renderProducts();
    renderVendors();
    setupEventListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
