// ----- Funções comuns -----
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// ----- Carregar produtos no site público -----
if (document.getElementById("products-container")) {
  const container = document.getElementById("products-container");
  const products = getProducts();

  if (products.length === 0) {
    container.innerHTML = "<p>Nenhum produto em promoção.</p>";
  } else {
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="discount">-${product.discount}%</div>
        <img src="${product.image}" alt="${product.name}">
        <div class="prices">
          <span class="old-price">${product.oldPrice} Kz</span>
          <span class="new-price">${product.newPrice} Kz</span>
        </div>
        <p class="description">${product.description}</p>
        <div class="timer" id="timer-${index}">Carregando...</div>
        <a href="#" class="btn">Ver mais</a>
      `;
      container.appendChild(card);

      startCountdown(product.endTime, `timer-${index}`);
    });
  }
}

// ----- Contagem regressiva -----
function startCountdown(endTime, elementId) {
  const timerElement = document.getElementById(elementId);
  const countDownDate = new Date(endTime).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
      timerElement.innerHTML = "Promoção Expirada";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(update, 1000);
  }

  update();
}

// ----- Admin: adicionar e listar produtos -----
if (document.getElementById("product-form")) {
  const form = document.getElementById("product-form");
  const list = document.getElementById("product-list");

  function renderProducts() {
    list.innerHTML = "";
    const products = getProducts();
    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <strong>${product.name}</strong><br>
        <img src="${product.image}" width="100"><br>
        <span>${product.newPrice} Kz (-${product.discount}%)</span><br>
        <button onclick="deleteProduct(${index})">Apagar</button>
      `;
      list.appendChild(div);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const newProduct = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      image: document.getElementById("image").value,
      oldPrice: document.getElementById("oldPrice").value,
      newPrice: document.getElementById("newPrice").value,
      discount: document.getElementById("discount").value,
      endTime: document.getElementById("endTime").value
    };

    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);

    form.reset();
    renderProducts();
  });

  window.deleteProduct = function(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderProducts();
  };

  renderProducts();
}