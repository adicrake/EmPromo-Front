const products=[
{nome:"Gelado Morango",cat:"gelados",preco:150,img:"https://images.unsplash.com/photo-1497034825429-c343d7c6a68f",vend:"Ana",vimg:"https://randomuser.me/api/portraits/women/44.jpg"},
{nome:"Sumo Natural",cat:"bebidas",preco:200,img:"https://images.unsplash.com/photo-1571070354072-0b63b2b0b9d3",vend:"Carlos",vimg:"https://randomuser.me/api/portraits/men/46.jpg"},
{nome:"Pastel",cat:"salgados",preco:100,img:"https://images.unsplash.com/photo-1604908554160-97c1f70e13b1",vend:"Maria",vimg:"https://randomuser.me/api/portraits/women/68.jpg"},
{nome:"Hamburguer",cat:"salgados",preco:300,img:"https://images.unsplash.com/photo-1550547660-d9450f859349",vend:"Paulo",vimg:"https://randomuser.me/api/portraits/men/32.jpg"},
{nome:"Refrigerante",cat:"bebidas",preco:200,img:"https://images.unsplash.com/photo-1598550481725-93c0f3aa2b6f",vend:"Joana",vimg:"https://randomuser.me/api/portraits/women/12.jpg"},
{nome:"Gelado Chocolate",cat:"gelados",preco:150,img:"https://images.unsplash.com/photo-1505253716362-afaea1b6a9c2",vend:"Luis",vimg:"https://randomuser.me/api/portraits/men/64.jpg"},
{nome:"Bolo Fatia",cat:"salgados",preco:200,img:"https://images.unsplash.com/photo-1542826438-1f6f2a87c38c",vend:"Helena",vimg:"https://randomuser.me/api/portraits/women/23.jpg"},
{nome:"Água",cat:"bebidas",preco:100,img:"https://images.unsplash.com/photo-1502741338009-cac2772e18bc",vend:"Rui",vimg:"https://randomuser.me/api/portraits/men/85.jpg"}
];

const container=document.getElementById("container");
const search=document.getElementById("search");
const buttons=document.querySelectorAll(".tabs button");

function render(list){
container.innerHTML="";
list.forEach(p=>{
container.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h4>${p.nome}</h4>
<p class="price">${p.preco} Kz</p>
<div class="stars">★★★★★</div>
<div class="vendor">
<img src="${p.vimg}">
<span>${p.vend}</span>
</div>
</div>
`;
});
}
render(products);

search.oninput=()=>{
const val=search.value.toLowerCase();
render(products.filter(p=>p.nome.toLowerCase().includes(val)));
};

buttons.forEach(btn=>{
btn.onclick=()=>{
buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
const cat=btn.dataset.cat;
if(cat=="todos")render(products);
else if(cat=="baixo")render(products.filter(p=>p.preco<=200));
else render(products.filter(p=>p.cat==cat));
};
});
