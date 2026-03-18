// Funções de suporte (já existem no script.js principal)
function getSellers() {
  return JSON.parse(localStorage.getItem("levaAquiSellers") || "[]");
}

function getProducts() {
  return JSON.parse(localStorage.getItem("levaAquiProducts") || "[]");
}

function saveSellers(sellers) {
  localStorage.setItem("levaAquiSellers", JSON.stringify(sellers));
}

function saveProducts(products) {
  localStorage.setItem("levaAquiProducts", JSON.stringify(products));
}

// Preencher select de vendedores
function populateSellerSelect() {
  const select = document.getElementById("product-seller");
  if (!select) return;

  const sellers = getSellers();
  select.innerHTML = '<option value="">Selecione o vendedor</option>';

  sellers.forEach(seller => {
    const opt = document.createElement("option");
    opt.value = seller.id;
    opt.textContent = seller.name;
    select.appendChild(opt);
  });
}

// Mostrar lista de vendedores
function renderSellers() {
  const container = document.getElementById("sellers-list");
  if (!container) return;

  const sellers = getSellers();
  container.innerHTML = "";

  sellers.forEach(seller => {
    const div = document.createElement("div");
    div.className = "seller-item";
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:1rem;">
        <img src="${seller.photo}" alt="${seller.name}">
        <div>
          <strong>${seller.name}</strong><br>
          <small>${seller.classroom} • ${seller.experience}</small>
        </div>
      </div>
      <div class="actions">
        <button onclick="deleteSeller(${seller.id})">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// Mostrar lista de produtos
function renderProductsAdmin() {
  const container = document.getElementById("products-list");
  if (!container) return;

  const products = getProducts();
  const sellers = getSellers();
  container.innerHTML = "";

  products.forEach(product => {
    const seller = sellers.find(s => s.id === product.sellerId) || {name: "?"};

    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:1rem;">
        <img src="${product.image}" alt="${product.name}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;">
        <div>
          <strong>${product.name}</strong><br>
          <small>${product.price.toLocaleString()} Kz • Vendedor: ${seller.name}</small>
        </div>
      </div>
      <div class="actions">
        <button onclick="deleteProduct(${product.id})">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// Adicionar vendedor
document.getElementById("seller-form")?.addEventListener("submit", e => {
  e.preventDefault();

  const sellers = getSellers();
  const newId = sellers.length > 0 ? Math.max(...sellers.map(s => s.id)) + 1 : 1;

  const newSeller = {
    id: newId,
    name: document.getElementById("seller-name").value.trim(),
    photo: document.getElementById("seller-photo").value.trim(),
    classroom: document.getElementById("seller-classroom").value.trim(),
    experience: document.getElementById("seller-experience").value.trim(),
    rating: parseFloat(document.getElementById("seller-rating").value) || 4.0,
    isOnline: document.getElementById("seller-online").checked
  };

  sellers.push(newSeller);
  saveSellers(sellers);

  alert("Vendedor adicionado com sucesso!");
  e.target.reset();
  renderSellers();
  populateSellerSelect();
});

// Adicionar produto
document.getElementById("product-form")?.addEventListener("submit", e => {
  e.preventDefault();

  const sellerId = Number(document.getElementById("product-seller").value);
  if (!sellerId) {
    alert("Selecione um vendedor!");
    return;
  }

  const products = getProducts();
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 100;

  const newProduct = {
    id: newId,
    name: document.getElementById("product-name").value.trim(),
    price: Number(document.getElementById("product-price").value) || 0,
    image: document.getElementById("product-image").value.trim(),
    rating: parseFloat(document.getElementById("product-rating").value) || 4.0,
    sellerId: sellerId
  };

  products.push(newProduct);
  saveProducts(products);

  alert("Produto adicionado com sucesso!");
  e.target.reset();
  renderProductsAdmin();
});

// Remover vendedor (simples – remove também produtos dele?)
function deleteSeller(id) {
  if (!confirm("Tem certeza que quer remover este vendedor?")) return;

  let sellers = getSellers();
  sellers = sellers.filter(s => s.id !== id);
  saveSellers(sellers);

  // Opcional: remover produtos desse vendedor
  let products = getProducts();
  products = products.filter(p => p.sellerId !== id);
  saveProducts(products);

  renderSellers();
  renderProductsAdmin();
  populateSellerSelect();
}

// Remover produto
function deleteProduct(id) {
  if (!confirm("Tem certeza que quer remover este produto?")) return;

  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);

  renderProductsAdmin();
}

// Inicialização da página admin
function initAdmin() {
  populateSellerSelect();
  renderSellers();
  renderProductsAdmin();
}

window.addEventListener("load", initAdmin);
