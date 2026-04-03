// ==================== PAINEL ADMIN - LEVAAQUI V3 ====================

let currentTab = 'vendors-pending';

// ==================== LOGIN ====================

function adminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'admin123') {
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        init();
    } else {
        alert('Senha incorreta!');
    }
}

function adminLogout() {
    document.getElementById('adminLogin').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
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

// ==================== INICIALIZAÇÃO ====================

function init() {
    updateStats();
    switchAdminTab(currentTab);
}

function updateStats() {
    const vendors = getVendors();
    const products = getProducts();
    
    const vendorsPending = vendors.filter(v => v.status === 'pending').length;
    const vendorsApproved = vendors.filter(v => v.status === 'approved').length;
    const productsPending = products.filter(p => p.status === 'pending').length;
    const productsApproved = products.filter(p => p.status === 'approved').length;
    const expired = [...vendors, ...products].filter(i => i.status === 'expired').length;
    
    document.getElementById('statVendorsPending').textContent = vendorsPending;
    document.getElementById('statVendorsApproved').textContent = vendorsApproved;
    document.getElementById('statProductsPending').textContent = productsPending;
    document.getElementById('statExpired').textContent = expired;
    
    document.getElementById('badgeVendorsPending').textContent = vendorsPending;
    document.getElementById('badgeVendorsApproved').textContent = vendorsApproved;
    document.getElementById('badgeProductsPending').textContent = productsPending;
    document.getElementById('badgeProductsApproved').textContent = productsApproved;
    document.getElementById('badgeRenewal').textContent = expired;
}

// ==================== NAVEGAÇÃO ====================

function switchAdminTab(tab) {
    currentTab = tab;
    
    document.querySelectorAll('.admin-tab').forEach(t => {
        t.classList.remove('active');
        if (t.dataset.tab === tab) {
            t.classList.add('active');
        }
    });
    
    const content = document.getElementById('adminContent');
    
    if (tab === 'vendors-pending') {
        renderVendorsPending(content);
    } else if (tab === 'vendors-approved') {
        renderVendorsApproved(content);
    } else if (tab === 'products-pending') {
        renderProductsPending(content);
    } else if (tab === 'products-approved') {
        renderProductsApproved(content);
    } else if (tab === 'renewal') {
        renderRenewal(content);
    }
}

// ==================== RENDER ====================

function renderVendorsPending(content) {
    const vendors = getVendors().filter(v => v.status === 'pending');
    
    if (vendors.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum vendedor pendente.</p>';
        return;
    }
    
    content.innerHTML = vendors.map(vendor => `
        <div class="item-card">
            <div class="item-header">
                <img src="${vendor.photo}" alt="${vendor.name}" class="item-avatar">
                <div class="item-info">
                    <p class="item-name">${vendor.name}</p>
                    <p class="item-detail"><strong>Nº Estudante:</strong> ${vendor.studentNumber}</p>
                    <p class="item-detail"><strong>Curso:</strong> ${vendor.course} - ${vendor.year}º Ano</p>
                    <p class="item-detail"><strong>Email:</strong> ${vendor.email}</p>
                    <p class="item-detail"><strong>Sala:</strong> ${vendor.classroom}</p>
                    <p class="item-detail"><strong>Especialidade:</strong> ${vendor.specialty}</p>
                    <p class="item-detail"><strong>Horário:</strong> ${vendor.schedule.start} - ${vendor.schedule.end}</p>
                    <p class="item-detail"><strong>Telefone:</strong> ${vendor.phone}</p>
                    <p class="item-detail"><strong>WhatsApp:</strong> ${vendor.whatsapp}</p>
                    ${vendor.instagram ? `<p class="item-detail"><strong>Instagram:</strong> ${vendor.instagram}</p>` : ''}
                    ${vendor.facebook ? `<p class="item-detail"><strong>Facebook:</strong> ${vendor.facebook}</p>` : ''}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-edit" onclick="editVendor('${vendor.id}')">Editar</button>
                <button class="btn btn-approve" onclick="approveVendor('${vendor.id}')">Aceitar</button>
                <button class="btn btn-reject" onclick="rejectVendor('${vendor.id}')">Rejeitar</button>
            </div>
        </div>
    `).join('');
}

function renderVendorsApproved(content) {
    const vendors = getVendors().filter(v => v.status === 'approved');
    const products = getProducts();
    
    if (vendors.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum vendedor aprovado.</p>';
        return;
    }
    
    content.innerHTML = vendors.map(vendor => {
        const vendorProducts = products.filter(p => p.vendorId === vendor.id).length;
        const expiresIn = vendor.expiresAt ? Math.ceil((vendor.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)) : null;
        
        return `
            <div class="item-card">
                <div class="item-header">
                    <img src="${vendor.photo}" alt="${vendor.name}" class="item-avatar">
                    <div class="item-info">
                        <p class="item-name">${vendor.name}</p>
                        <p class="item-detail"><strong>Email:</strong> ${vendor.email}</p>
                        <p class="item-detail"><strong>Sala:</strong> ${vendor.classroom}</p>
                        <p class="item-detail"><strong>Produtos:</strong> ${vendorProducts}</p>
                        ${expiresIn !== null ? `<p class="item-detail"><strong>Expira em:</strong> ${expiresIn} dias</p>` : ''}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editVendor('${vendor.id}')">Editar</button>
                    <button class="btn btn-delete" onclick="deleteVendor('${vendor.id}')">Deletar</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderProductsPending(content) {
    const products = getProducts().filter(p => p.status === 'pending');
    const vendors = getVendors();
    
    if (products.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum produto pendente.</p>';
        return;
    }
    
    content.innerHTML = products.map(product => {
        const vendor = vendors.find(v => v.id === product.vendorId);
        
        return `
            <div class="item-card">
                <div class="item-header">
                    <img src="${product.photos[0]}" alt="${product.name}" class="item-avatar" style="border-radius: 0.5rem;">
                    <div class="item-info">
                        <p class="item-name">${product.name}</p>
                        <p class="item-detail"><strong>Vendedor:</strong> ${vendor ? vendor.name : 'Desconhecido'}</p>
                        <p class="item-detail"><strong>Preço:</strong> ${product.price} Kz</p>
                        <p class="item-detail"><strong>Categoria:</strong> ${product.category}</p>
                        <p class="item-detail"><strong>Descrição:</strong> ${product.description || 'Sem descrição'}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editProduct('${product.id}')">Editar</button>
                    <button class="btn btn-approve" onclick="approveProduct('${product.id}')">Aceitar</button>
                    <button class="btn btn-reject" onclick="rejectProduct('${product.id}')">Rejeitar</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderProductsApproved(content) {
    const products = getProducts().filter(p => p.status === 'approved');
    const vendors = getVendors();
    
    if (products.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum produto aprovado.</p>';
        return;
    }
    
    content.innerHTML = products.map(product => {
        const vendor = vendors.find(v => v.id === product.vendorId);
        const expiresIn = product.expiresAt ? Math.ceil((product.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)) : null;
        
        return `
            <div class="item-card">
                <div class="item-header">
                    <img src="${product.photos[0]}" alt="${product.name}" class="item-avatar" style="border-radius: 0.5rem;">
                    <div class="item-info">
                        <p class="item-name">${product.name}</p>
                        <p class="item-detail"><strong>Vendedor:</strong> ${vendor ? vendor.name : 'Desconhecido'}</p>
                        <p class="item-detail"><strong>Preço:</strong> ${product.price} Kz</p>
                        <p class="item-detail"><strong>Categoria:</strong> ${product.category}</p>
                        ${expiresIn !== null ? `<p class="item-detail"><strong>Expira em:</strong> ${expiresIn} dias</p>` : ''}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-edit" onclick="editProduct('${product.id}')">Editar</button>
                    <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Deletar</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderRenewal(content) {
    const vendors = getVendors().filter(v => v.status === 'expired');
    const products = getProducts().filter(p => p.status === 'expired');
    
    if (vendors.length === 0 && products.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">Nenhum item expirado.</p>';
        return;
    }
    
    let html = '';
    
    if (vendors.length > 0) {
        html += '<h3 style="margin-bottom: 1rem;">Vendedores Expirados</h3>';
        html += vendors.map(vendor => `
            <div class="item-card">
                <div class="item-header">
                    <img src="${vendor.photo}" alt="${vendor.name}" class="item-avatar">
                    <div class="item-info">
                        <p class="item-name">${vendor.name}</p>
                        <p class="item-detail"><strong>Email:</strong> ${vendor.email}</p>
                        <p class="item-detail"><strong>Expirado em:</strong> ${new Date(vendor.expiresAt).toLocaleDateString('pt')}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-renew" onclick="renewVendor('${vendor.id}')">Renovar</button>
                    <button class="btn btn-delete" onclick="deleteVendor('${vendor.id}')">Deletar</button>
                </div>
            </div>
        `).join('');
    }
    
    if (products.length > 0) {
        html += '<h3 style="margin: 2rem 0 1rem;">Produtos Expirados</h3>';
        html += products.map(product => `
            <div class="item-card">
                <div class="item-header">
                    <img src="${product.photos[0]}" alt="${product.name}" class="item-avatar" style="border-radius: 0.5rem;">
                    <div class="item-info">
                        <p class="item-name">${product.name}</p>
                        <p class="item-detail"><strong>Preço:</strong> ${product.price} Kz</p>
                        <p class="item-detail"><strong>Expirado em:</strong> ${new Date(product.expiresAt).toLocaleDateString('pt')}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-renew" onclick="renewProduct('${product.id}')">Renovar</button>
                    <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Deletar</button>
                </div>
            </div>
        `).join('');
    }
    
    content.innerHTML = html;
}

// ==================== AÇÕES ====================

function approveVendor(id) {
    const validity = prompt('Por quantos meses deseja aprovar? (1-12)', '3');
    if (!validity) return;
    
    const months = parseInt(validity);
    if (isNaN(months) || months < 1 || months > 12) {
        alert('Valor inválido!');
        return;
    }
    
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === id);
    if (!vendor) return;
    
    const now = Date.now();
    const expiresAt = now + (months * 30 * 24 * 60 * 60 * 1000); // Aproximado
    
    vendor.status = 'approved';
    vendor.approvedAt = now;
    vendor.expiresAt = expiresAt;
    
    saveVendors(vendors);
    alert('Vendedor aprovado com sucesso!');
    init();
}

function approveProduct(id) {
    const validity = prompt('Por quantos meses deseja aprovar? (1-12)', '3');
    if (!validity) return;
    
    const months = parseInt(validity);
    if (isNaN(months) || months < 1 || months > 12) {
        alert('Valor inválido!');
        return;
    }
    
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const now = Date.now();
    const expiresAt = now + (months * 30 * 24 * 60 * 60 * 1000);
    
    product.status = 'approved';
    product.approvedAt = now;
    product.expiresAt = expiresAt;
    
    saveProducts(products);
    alert('Produto aprovado com sucesso!');
    init();
}

function rejectVendor(id) {
    if (!confirm('Tem certeza que deseja rejeitar este vendedor?')) return;
    
    const vendors = getVendors();
    const index = vendors.findIndex(v => v.id === id);
    if (index === -1) return;
    
    vendors.splice(index, 1);
    saveVendors(vendors);
    
    alert('Vendedor rejeitado!');
    init();
}

function rejectProduct(id) {
    if (!confirm('Tem certeza que deseja rejeitar este produto?')) return;
    
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return;
    
    products.splice(index, 1);
    saveProducts(products);
    
    alert('Produto rejeitado!');
    init();
}

function renewVendor(id) {
    const validity = prompt('Por quantos meses deseja renovar? (1-12)', '3');
    if (!validity) return;
    
    const months = parseInt(validity);
    if (isNaN(months) || months < 1 || months > 12) {
        alert('Valor inválido!');
        return;
    }
    
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === id);
    if (!vendor) return;
    
    const now = Date.now();
    const expiresAt = now + (months * 30 * 24 * 60 * 60 * 1000);
    
    vendor.status = 'approved';
    vendor.expiresAt = expiresAt;
    
    saveVendors(vendors);
    alert('Vendedor renovado com sucesso!');
    init();
}

function renewProduct(id) {
    const validity = prompt('Por quantos meses deseja renovar? (1-12)', '3');
    if (!validity) return;
    
    const months = parseInt(validity);
    if (isNaN(months) || months < 1 || months > 12) {
        alert('Valor inválido!');
        return;
    }
    
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const now = Date.now();
    const expiresAt = now + (months * 30 * 24 * 60 * 60 * 1000);
    
    product.status = 'approved';
    product.expiresAt = expiresAt;
    
    saveProducts(products);
    alert('Produto renovado com sucesso!');
    init();
}

function deleteVendor(id) {
    if (!confirm('Tem certeza? Todos os produtos deste vendedor também serão deletados!')) return;
    
    let vendors = getVendors();
    let products = getProducts();
    
    vendors = vendors.filter(v => v.id !== id);
    products = products.filter(p => p.vendorId !== id);
    
    saveVendors(vendors);
    saveProducts(products);
    
    alert('Vendedor deletado!');
    init();
}

function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    
    alert('Produto deletado!');
    init();
}

// ==================== EDIÇÃO (SIMPLIFICADA) ====================

function editVendor(id) {
    alert('Funcionalidade de edição em desenvolvimento.\nPor enquanto, delete e recadastre o vendedor.');
}

function editProduct(id) {
    alert('Funcionalidade de edição em desenvolvimento.\nPor enquanto, delete e recadastre o produto.');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}
