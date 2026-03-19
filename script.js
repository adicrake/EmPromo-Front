const sellers = [
  {id:1, name:"Ana Silva", photo:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=120", classroom:"Eng. Informática 3.2", experience:"Vende há 11 meses", rating:4.8, isOnline:true},
  {id:2, name:"João Mendes", photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=120", classroom:"Gestão 1.4", experience:"Vende há 15 meses", rating:4.6, isOnline:false}
];

const products = [
  {id:101, name:"Bolo caseiro chocolate", price:1800, image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500", rating:4.9, sellerId:1, category:"Doces"},
  {id:102, name:"Sumo laranja natural 1L", price:700, image:"https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500", rating:4.7, sellerId:1, category:"Bebidas"},
  {id:103, name:"Sanduíche natural completo", price:900, image:"https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=500", rating:4.5, sellerId:2, category:"Salgados"},
  {id:104, name:"Brigadeiro cx 12un", price:1200, image:"https://images.unsplash.com/photo-1587536872896-69409c2f3a8c?w=500", rating:4.8, sellerId:2, category:"Doces"}
];

function getStars(r) {
  let s = '';
  for(let i=1; i<=5; i++) s += i <= r ? '★' : (i-0.5 <= r ? '½' : '☆');
  return s;
}

function render() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    const s = sellers.find(s => s.id === p.sellerId) || {};
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img class="card-img" src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">${p.price.toLocaleString()} Kz</div>
        <div class="stars">${getStars(p.rating)}</div>
        <div class="seller">
          <img src="${s.photo || 'https://via.placeholder.com/56'}">
          <div>
            <div class="seller-name" data-id="${s.id}">${s.name}</div>
          </div>
        </div>
      </div>
    `;
    card.querySelector('.seller-name')?.addEventListener('click', e => {
      const id = Number(e.target.dataset.id);
      if (id) showSeller(id);
    });
    grid.appendChild(card);
  });
}

function showSeller(id) {
  const s = sellers.find(s => s.id === id);
  if (!s) return;
  const modal = document.getElementById('seller-modal');
  const content = document.getElementById('seller-profile');
  const stat = s.isOnline ? {cls:'online', txt:'🟢 Online agora'} : {cls:'offline', txt:'🔴 Na banca'};
  const prods = products.filter(p => p.sellerId === id).map(p => `<li>${p.name} – ${p.price.toLocaleString()} Kz</li>`).join('') || '<li>Sem produtos listados</li>';

  content.innerHTML = `
    <img src="${s.photo}" alt="${s.name}">
    <h2>${s.name}</h2>
    <p>${s.classroom}</p>
    <p>${s.experience}</p>
    <div class="stars">${getStars(s.rating)}</div>
    <div class="status ${stat.cls}">${stat.txt}</div>
    <h3 style="margin:24px 0 12px; color:var(--azul-medio);">Produtos</h3>
    <ul style="text-align:left; list-style:none; padding:0;">${prods}</ul>
  `;
  modal.style.display = 'flex';
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('close-modal') || e.target.id === 'seller-modal') {
    document.getElementById('seller-modal').style.display = 'none';
  }
});

render();
