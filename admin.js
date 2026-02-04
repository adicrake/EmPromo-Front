const USER="admin";
const PASS="leva123";

let products=JSON.parse(localStorage.getItem("products")) || [];

function login(){
if(user.value==USER && pass.value==PASS){
loginBox.style.display="none";
dashboard.style.display="flex";
showList();
}else{
alert("Dados errados");
}
}

function saveProduct(){
const p={
name:pname.value,
price:pprice.value,
cat:pcat.value,
img:pimg.value,
vend:vname.value,
vimg:vimg.value
};
products.push(p);
localStorage.setItem("products",JSON.stringify(products));
alert("Produto guardado!");
showList();
}

function showForm(){
formBox.style.display="block";
listBox.style.display="none";
}

function showList(){
formBox.style.display="none";
listBox.style.display="block";
listBox.innerHTML="";
products.forEach((p,i)=>{
listBox.innerHTML+=`
<div>
<span>${p.name} - ${p.price}Kz</span>
<button onclick="del(${i})">X</button>
</div>
`;
});
}

function del(i){
products.splice(i,1);
localStorage.setItem("products",JSON.stringify(products));
showList();
}
