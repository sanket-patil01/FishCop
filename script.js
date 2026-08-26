const WHATSAPP_NUMBER = "919167005060";

const products = [
  {id:1,name:"Freshwater / Cultivated White Prawns",marathi:"तलावातील कोळंबी",hindi:"तालाब का झींगा",category:"Prawns",image:"assets/white-prawns.jpg",priceText:"₹570 – ₹680",priceMin:570,unit:"per kg",desc:"Freshwater cultivated white prawns, selected for freshness and quality."},
  {id:2,name:"Rawas (Indian Salmon)",marathi:"रावस",hindi:"",category:"Sea Fish",image:"assets/rawas.jpg",priceText:"₹900 – ₹1,900",priceMin:900,unit:"per kg",desc:"Fresh Rawas (Indian Salmon), a popular choice for curry and fry."}
];

let cart = JSON.parse(localStorage.getItem("fishcopCart") || "[]");

const productGrid = document.getElementById("productGrid");
const filterSelect = document.getElementById("filterSelect");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

function money(n){ return "₹" + n.toLocaleString("en-IN"); }

function renderProducts(filter="All"){
  const list = filter === "All" ? products : products.filter(p => p.category === filter);
  productGrid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="product-info">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="local-names">
          ${p.marathi ? `<span>${p.marathi}</span>` : ""}
          ${p.hindi ? `<span>${p.hindi}</span>` : ""}
        </div>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">${p.priceText} <small>/ kg</small></span>
          <button class="add-btn" onclick="addToCart(${p.id})">Add +</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id){
  const found = cart.find(i => i.id === id);
  if(found) found.qty++;
  else cart.push({id,qty:1});
  saveCart(); openCart();
}

function saveCart(){
  localStorage.setItem("fishcopCart", JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const count = cart.reduce((sum,i)=>sum+i.qty,0);
  document.getElementById("cartCount").textContent = count;
  const items = cart.map(i => ({...products.find(p=>p.id===i.id),qty:i.qty}));
  const box = document.getElementById("cartItems");
  if(!items.length){
    box.innerHTML = '<p class="empty">Your cart is empty.</p>';
  } else {
    box.innerHTML = items.map(i => `
      <div class="cart-line">
        <div>
          <h4>${i.name}</h4>
          <p>${i.priceText} / kg • Approx. range</p>
          <div class="qty">
            <button onclick="changeQty(${i.id},-1)">−</button><strong>${i.qty}</strong><button onclick="changeQty(${i.id},1)">+</button>
            <button class="remove" onclick="removeItem(${i.id})">Remove</button>
          </div>
        </div>
        <strong>${money(i.price*i.qty)}</strong>
      </div>
    `).join("");
  }
  document.getElementById("cartTotal").textContent = items.length ? "To confirm" : "₹0";
}

function changeQty(id,delta){
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(i=>i.id!==id);
  saveCart();
}
function removeItem(id){ cart = cart.filter(i=>i.id!==id); saveCart(); }

function openCart(){ cartPanel.classList.add("open"); overlay.classList.add("show"); }
function closeCart(){ cartPanel.classList.remove("open"); overlay.classList.remove("show"); }

function orderOnWhatsApp(){
  if(!cart.length){
    alert("Please add at least one fish to your cart.");
    return;
  }
  const items = cart.map(i => {
    const p = products.find(x=>x.id===i.id);
    return `• ${p.name} - ${i.qty} kg - ${p.priceText} / kg`;
  }).join("\n");
  const msg = `Hello FishCop.com! I would like to order:\n\n${items}\n\nPlease confirm the final price, availability and delivery charges.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
}

filterSelect.addEventListener("change", e => renderProducts(e.target.value));
document.querySelectorAll(".category-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filterSelect.value = f;
    renderProducts(f);
    document.getElementById("shop").scrollIntoView({behavior:"smooth"});
  });
});
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.getElementById("whatsappOrder").addEventListener("click", orderOnWhatsApp);
document.getElementById("contactWhatsapp").addEventListener("click", e => {
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello FishCop.com! I want to know today's fresh fish availability.")}`,"_blank");
});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));

renderProducts();
renderCart();
