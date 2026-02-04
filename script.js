const container=document.getElementById("container");
const search=document.getElementById("search");

let products=JSON.parse(localStorage.getItem("products")) || [];

function render(list){
container.innerHTML="";
list.forEach(p=>{
container.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h4>${p.name}</h4>
<p class="price">${p.price} Kz</p>
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
render(products.filter(p=>p.name.toLowerCase().includes(val)));
};
