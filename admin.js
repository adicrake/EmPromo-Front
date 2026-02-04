const USER="admin";
const PASS="leva123";

let vendors=JSON.parse(localStorage.getItem("vendors")) || [];
let products=JSON.parse(localStorage.getItem("products")) || [];

function login(){
if(user.value==USER && pass.value==PASS){
loginBox.style.display="none";
dashboard.style.display="block";
openVendors();
}else alert("Dados errados");
}

function openVendors(){
vendorsBox.style.display="block";
productsBox.style.display="none";
renderVendors();
}

function openProducts(){
vendorsBox.style.display="none";
productsBox.style.display="block";
loadVendorOptions();
renderProducts();
}

function saveVendor(){
const reader=new FileReader();
reader.onload=()=>{
vendors.push({
name:vName.value,
sala:vSala.value,
img:reader.result
});
localStorage.setItem("vendors",JSON.stringify(vendors));
renderVendors();
};
reader.readAsDataURL(vImg.files[0]);
}

function renderVendors(){
vendorsList.innerHTML="";
vendors.forEach((v,i)=>{
vendorsList.innerHTML+=`
<div class="item">
${v.name} - Sala ${v.sala}
<button onclick="delVendor(${i})">X</button>
</div>`;
});
}

function delVendor(i){
vendors.splice(i,1);
localStorage.setItem("vendors",JSON.stringify(vendors));
renderVendors();
}

function loadVendorOptions(){
pVendor.innerHTML="";
vendors.forEach(v=>{
pVendor.innerHTML+=`<option>${v.name}</option>`;
});
}

function saveProduct(){
const reader=new FileReader();
reader.onload=()=>{
products.push({
name:pName.value,
price:pPrice.value,
cat:pCat.value,
vendor:pVendor.value,
img:reader.result
});
localStorage.setItem("products",JSON.stringify(products));
renderProducts();
};
reader.readAsDataURL(pImg.files[0]);
}

function renderProducts(){
productsList.innerHTML="";
products.forEach((p,i)=>{
productsList.innerHTML+=`
<div class="item">
${p.name} - ${p.price} Kz
<button onclick="delProduct(${i})">X</button>
</div>`;
});
}
function delProduct(i){
products.splice(i,1);
localStorage.setItem("products",JSON.stringify(products));
renderProducts();
}
