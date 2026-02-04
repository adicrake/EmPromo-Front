const container=document.getElementById("container");

let products=JSON.parse(localStorage.getItem("products")) || [];
let vendors=JSON.parse(localStorage.getItem("vendors")) || [];

function render(){
container.innerHTML="";
products.forEach(p=>{
const v=vendors.find(v=>v.name==p.vendor);
container.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h4>${p.name}</h4>
<p class="price">${p.price} Kz</p>
<div class="stars">★★★★★</div>
<div class="vendor">
<img src="${v?.img}">
<span>${p.vendor}</span>
</div>
</div>`;
});
}
render();
