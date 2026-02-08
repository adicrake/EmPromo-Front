// Dados fictícios – depois vocês podem aumentar
const sellers = [
  {
    id: 1,
    name: "Maria K.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    class: "Sala 3B – Informática",
    rating: 4.8,
    experience: "Vende há 5 meses",
    status: "online", // "online" ou "stand"
    products: [
      { name: "Bolo de cenoura", price: 800, image: "https://images.unsplash.com/photo-1557925920-a7977b3b8922?w=400" },
      { name: "Sumo de laranja natural", price: 300, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400" },
      { name: "Pastel de queijo", price: 150, image: "https://images.unsplash.com/photo-1559056199-8a572b9a0e8a?w=400" }
    ]
  },
  {
    id: 2,
    name: "João P.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    class: "Sala 2A – Eletrotécnica",
    rating: 4.3,
    experience: "Vende desde 2024",
    status: "stand",
    products: [
      { name: "Coxinha de frango", price: 100, image: "https://images.unsplash.com/photo-1604908177732-8c12e691d5d8?w=400" },
      { name: "Água mineral 1.5L", price: 200, image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=400" }
    ]
  },
  // Adicionem mais vendedores aqui...
];

// Função para criar estrelas ★
function createStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Renderizar todos os produtos na página principal
function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  sellers.forEach(seller => {
    seller.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      
      card.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="price">${product.price.toLocaleString()} Kz</div>
          <div class="stars">${createStars(seller.rating)}</div>
          
          <div class="seller-mini" data-seller-id="${seller.id}">
            <img src="${seller.photo}" alt="${seller.name}">
            <div>
              <strong>${seller.name}</strong>
            </div>
          </div>
        </div>
      `;

      // Clica no mini-perfil do vendedor → abre modal
      card.querySelector(".seller-mini").addEventListener("click", (e) => {
        e.stopPropagation();
        openSellerModal(seller.id);
      });

      grid.appendChild(card);
    });
  });
}

// Abre o modal com o perfil do vendedor
function openSellerModal(sellerId) {
  const seller = sellers.find(s => s.id === sellerId);
  if (!seller) return;

  document.getElementById("modal-seller-photo").src = seller.photo;
  document.getElementById("modal-seller-name").textContent = seller.name;
  document.getElementById("modal-seller-class").textContent = seller.class;
  document.getElementById("modal-seller-rating").innerHTML = `⭐ ${seller.rating} • `;
  document.getElementById("modal-seller-experience").textContent = seller.experience;
  
  const statusEl = document.getElementById("modal-seller-status");
  statusEl.textContent = seller.status === "online" ? "🟢 Online agora" : "🔴 No stand";
  statusEl.className = seller.status === "online" ? "status-online" : "status-offline";

  // Produtos do vendedor no modal
  const productsDiv = document.getElementById("modal-seller-products");
  productsDiv.innerHTML = "";
  
  seller.products.forEach(p => {
    const miniCard = document.createElement("div");
    miniCard.className = "product-card";
    miniCard.innerHTML = `
      <img class="product-image" src="${p.image}" alt="${p.name}" style="height: 160px;">
      <div class="product-info">
        <h3 class="product-name" style="font-size:1.1rem;">${p.name}</h3>
        <div class="price" style="font-size:1.25rem;">${p.price.toLocaleString()} Kz</div>
      </div>
    `;
    productsDiv.appendChild(miniCard);
  });

  document.getElementById("seller-modal").style.display = "flex";
}

// Fechar modal
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("seller-modal").style.display = "none";
});

// Clica fora do modal → fecha
document.getElementById("seller-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("seller-modal")) {
    document.getElementById("seller-modal").style.display = "none";
  }
});

// Iniciar
renderProducts();
