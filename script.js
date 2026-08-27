const WHATSAPP_NUMBER = "919167005060";

// HERO IMAGE SLIDER (7 Images Auto-Rotate)
const heroImages = [
  "assets/hero-1.png",
  "assets/hero-2.png",
  "assets/hero-3.png",
  "assets/hero-4.png",
  "assets/hero-5.png",
  "assets/hero-6.png",
  "assets/hero-7.png"
];

let heroIndex = 0;
const heroImgElement = document.getElementById("heroSlider");

if (heroImgElement) {
  setInterval(() => {
    heroImgElement.style.opacity = "0"; // Smooth fade out
    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImgElement.src = heroImages[heroIndex];
      heroImgElement.style.opacity = "1"; // Smooth fade in
    }, 400);
  }, 2500); // Har 2.5 second me image change hogi
}

// PRODUCT DATABASE
const products = [
  {
    id: 1,
    name: "Freshwater / Cultivated White Prawns",
    marathi: "तलावातील कोळंबी",
    hindi: "तालाब का झींगा",
    category: "Prawns",
    image: "assets/white-prawns.jpg",
    priceText: "₹570 – ₹680",
    unit: "per kg",
    desc: "Freshwater cultivated white prawns, selected for freshness and quality."
  },
  {
    id: 2,
    name: "Rawas (Indian Salmon)",
    marathi: "रावस",
    hindi: "",
    category: "Sea Fish",
    image: "assets/rawas.jpg",
    priceText: "₹900 – ₹1,900",
    unit: "per kg",
    desc: "Fresh Rawas (Indian Salmon), premium quality selection ideal for fry and curry."
  },
  {
    id: 3,
    name: "Silver Pomfret",
    marathi: "पापलेट",
    hindi: "पॉपफलेट",
    category: "Premium",
    image: "assets/pomfret.jpg",
    priceText: "₹995 – ₹2,100",
    unit: "per kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry."
  },
  {
    id: 4,
    name: "Small Wet Peeled Shrimps (Kardi / Karandi / Aambad)",
    marathi: "कोळंबी / करडी / करंडी / आंबाड",
    hindi: "छोटी झींगा",
    category: "Prawns",
    image: "assets/kardi-prawns.jpg",
    priceText: "₹450 – ₹950",
    unit: "per kg",
    desc: "Cleaned and peeled small shrimps, great for quick recipes and gravies."
  }
];

let cart = JSON.parse(localStorage.getItem("fishcopCart") || "[]");

const productGrid = document.getElementById("productGrid");
const filterSelect = document.getElementById("filterSelect");
const searchInput = document.getElementById("searchInput");
const cartPanel = document.getElementById("cartPanel");
const customerModal = document.getElementById("customerModal");
const overlay = document.getElementById("overlay");

// RENDER PRODUCTS
function renderProducts() {
  const filter = filterSelect ? filterSelect.value : "All";
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = products.filter(p => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(query) || 
                          (p.marathi && p.marathi.toLowerCase().includes(query)) ||
                          (p.hindi && p.hindi.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  if (!filtered.length) {
    productGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:30px;">No fish products found matching your search.</p>';
    return;
  }

  productGrid.innerHTML = filtered.map(p => `
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

// CART MANAGEMENT
function addToCart(id) {
  const found = cart.find(i => i.id === id);
  if (found) found.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  openCart();
}

function saveCart() {
  localStorage.setItem("fishcopCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
  const items = cart.map(i => ({ ...products.find(p => p.id === i.id), qty: i.qty }));
  const box = document.getElementById("cartItems");

  if (!items.length) {
    box.innerHTML = '<p class="empty">Your cart is empty.</p>';
  } else {
    box.innerHTML = items.map(i => `
      <div class="cart-line">
        <div>
          <h4>${i.name}</h4>
          <p>${i.priceText} / kg</p>
          <div class="qty">
            <button onclick="changeQty(${i.id}, -1)">−</button>
            <strong>${i.qty} kg</strong>
            <button onclick="changeQty(${i.id}, 1)">+</button>
            <button class="remove" onclick="removeItem(${i.id})">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

// UI MODALS & DRAWERS
function openCart() { cartPanel.classList.add("open"); overlay.classList.add("show"); }
function closeCart() { cartPanel.classList.remove("open"); overlay.classList.remove("show"); }

function openModal() {
  if (!cart.length) {
    alert("Please add at least one product to your cart first.");
    return;
  }
  closeCart();
  customerModal.classList.add("open");
  overlay.classList.add("show");
}

function closeModal() {
  customerModal.classList.remove("open");
  overlay.classList.remove("show");
}

// WHATSAPP INTEGRATION
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const landmark = document.getElementById("custLandmark").value.trim();

  const itemsText = cart.map((i, index) => {
    const p = products.find(x => x.id === i.id);
    return `${index + 1}. ${p.name}\n   Quantity: ${i.qty} kg\n   Price Range: ${p.priceText} / kg`;
  }).join("\n\n");

  const msg = `Hello FishCop.com!\nI would like to place an order:\n\n${itemsText}\n\n*Customer Details:*\n• Name: ${name}\n• Contact: ${phone}\n• Address: ${address}${landmark ? `\n• Landmark: ${landmark}` : ''}\n\nPlease confirm availability and final price based on today's rate.`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  closeModal();
});

// EVENT LISTENERS
if (filterSelect) filterSelect.addEventListener("change", renderProducts);
if (searchInput) searchInput.addEventListener("input", renderProducts);

document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    if (filterSelect) filterSelect.value = pill.dataset.filter;
    renderProducts();
  });
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("openCheckoutModal").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
overlay.addEventListener("click", () => { closeCart(); closeModal(); });

document.getElementById("heroWhatsappBtn").addEventListener("click", (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello FishCop.com! I want to inquire about today's fresh fish availability.")}`, "_blank");
});

document.getElementById("contactWhatsapp").addEventListener("click", (e) => {
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello FishCop.com! I want to order fresh fish.")}`, "_blank");
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

// INITIALIZE
renderProducts();
renderCart();
