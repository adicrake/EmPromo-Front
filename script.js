// Dados iniciais (seed) — serão salvos no localStorage na primeira visita
const INITIAL_SELLERS = [
  {
    id: 1,
    name: "Ana Silva",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
    classroom: "Engenharia Informática – Sala 3.2",
    experience: "Vende há 11 meses",
    rating: 4.8,
    isOnline: true
  },
  {
    id: 2,
    name: "João Mendes",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    classroom: "Gestão de Empresas – Sala 1.4",
    experience: "Vende há 1 ano e 3 meses",
    rating: 4.6,
    isOnline: false
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 101,
    name: "Bolo de chocolate caseiro (8 fatias)",
    price: 1800,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    rating: 4.9,
    sellerId: 1
  },
  {
    id: 102,
    name: "Sumo natural de laranja 1L",
    price: 700,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400",
    rating: 4.7,
    sellerId: 1
  },
  {
    id: 103,
    name: "Sanduíche misto completo",
    price: 900,
    image: "https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400",
    rating: 4.5,
    sellerId: 2
  },
  {
    id: 104,
    name: "Brigadeiro gourmet (cx 12un)",
    price: 1200,
    image: "https://images.unsplash.com/photo-1587536872896-69409c2f3a8c?w=400",
    rating: 4.8,
    sellerId: 2
  }
];

// Carregar ou inicializar dados
function initData() {
  if (!localStorage.getItem("levaAquiSellers")) {
    localStorage.setItem("levaAquiSellers", JSON.stringify(INITIAL_SELLERS));
  }
  if (!localStorage.getItem("levaAquiProducts")) {
    localStorage.setItem("levaAquiProducts", JSON.stringify(INITIAL_PRODUCTS));
  }
}

function getSellers() {
  return JSON.parse(localStorage.getItem("levaAquiSellers") || "[]");
}

function getProducts() {
  return JSON.parse(localStorage.getItem("levaAquiProducts") || "[]");
}

function getStars(rating) {
  const full = Math.floor(rating);
  const part = rating % 1 >= 0.3 ? (rating % 1 >= 0.7 ? "★" : "½") : "";
  const empty = 5 - full - (part ? 1 : 0);
  return "★".repeat(full) + part + "☆".repeat(empty);
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const products = getProducts();
  const sellers = getSellers();

  products.forEach(product => {
    const seller = sellers.find(s => s.id === product.sellerId) || {};

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <div class="price">${product.price.toLocaleString()} Kz</div>
        <div class="rating">${getStars(product.rating)}</div>

        <div class="seller-row">
          <img class="seller-avatar" src="${seller.photo || 'https://via.placeholder.com/48'}" alt="${seller.name || 'Vendedor'}">
          <div class="seller-info">
            <div class="seller-name" data-seller-id="${seller.id || ''}">
              ${seller.name || "Vendedor"}
            </div>
          </div>
        </div>
      </div>
    `;

    // Clique no nome do vendedor → abre modal
    card.querySelector(".seller-name")?.addEventListener("click", (e) => {
      const sellerId = Number(e.target.dataset.sellerId);
      if (sellerId) showSellerProfile(sellerId);
    });

    grid.appendChild(card);
  });
}

function showSellerProfile(sellerId) {
  const sellers = getSellers();
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return;

  const modal = document.getElementById("seller-modal");
  const content = document.getElementById("seller-profile-content");

  const statusClass = seller.isOnline ? "online" : "stand";
  const statusText = seller.isOnline ? "🟢 Online agora" : "🔴 Disponível na banca";

  const products = getProducts().filter(p => p.sellerId === sellerId);

  let productsHTML = "<ul>";
  if (products.length === 0) {
    productsHTML += "<li style='color:#64748b;'>Ainda sem produtos listados</li>";
  } else {
    products.forEach(p => {
      productsHTML += `<li>${p.name} – ${p.price.toLocaleString()} Kz</li>`;
    });
  }
  productsHTML += "</ul>";

  content.innerHTML = `
    <img src="${seller.photo}" alt="${seller.name}">
    <h2>${seller.name}</h2>
    <div class="classroom">${seller.classroom}</div>
    <div class="experience">${seller.experience}</div>
    <div class="rating">${getStars(seller.rating)}</div>

    <div class="availability ${statusClass}">${statusText}</div>

    <div class="seller-products">
      <h3>Produtos à venda</h3>
      ${productsHTML}
    </div>
  `;

  modal.style.display = "flex";
}

// Fechar modal
document.addEventListener("click", e => {
  if (e.target.matches(".modal-close, #seller-modal")) {
    document.getElementById("seller-modal").style.display = "none";
  }
});

// Inicialização
initData();
renderProducts();
