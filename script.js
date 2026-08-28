const WHATSAPP_NUMBER = "919167005060";

// HERO 7-IMAGE SLIDER
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
    heroImgElement.style.opacity = "0";
    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImgElement.src = heroImages[heroIndex];
      heroImgElement.style.opacity = "1";
    }, 400);
  }, 2500);
}

// PRODUCTS
// PRODUCTS DATA (1200x900 PNG Images)
const products = [
  {
    id: 1,
    name: "Silver Pomfret",
    localName: "पापलेट / पॉम्फलेट",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 995,
    priceMax: 2100,
    unit: "kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry.",
    image: "assets/silver-pomfret.png"
  },
  {
    id: 2,
    name: "Rawas (Indian Salmon)",
    localName: "रावस",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 900,
    priceMax: 1900,
    unit: "kg",
    desc: "Fresh Rawas (Indian Salmon), premium quality selection ideal for fry and curry.",
    image: "assets/rawas.png"
  },
  {
    id: 3,
    name: "Black Pomfret",
    localName: "हलवा / काला पापलेट",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 650,
    priceMax: 1400,
    unit: "kg",
    desc: "Rich in flavor, firm texture, best suitable for tawa fry and rich curry.",
    image: "assets/black-pomfret.png"
  },
  {
    id: 4,
    name: "Surmai (King Fish)",
    localName: "सुरमई",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 850,
    priceMax: 1800,
    unit: "kg",
    desc: "Seafood lover favorite steak cut king fish with high protein content.",
    image: "assets/surmai.png"
  },
  {
    id: 5,
    name: "Pink Perch (Rani)",
    localName: "रानी मासा",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 350,
    priceMax: 700,
    unit: "kg",
    desc: "Mild flavored pink perch, cleaned and scaled for daily home cooking.",
    image: "assets/pink-perch.png"
  },
  {
    id: 6,
    name: "Tuna",
    localName: "कुप्पा / टूना",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 400,
    priceMax: 850,
    unit: "kg",
    desc: "Fleshy and meaty texture fish, high in Omega-3 fatty acids.",
    image: "assets/tuna.png"
  },
  {
    id: 7,
    name: "Bombay Duck (Bumbla)",
    localName: "बोंबिल",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 280,
    priceMax: 550,
    unit: "kg",
    desc: "Fresh soft Bombay Duck fish, soft meat best enjoyed crisp rava fried.",
    image: "assets/bombay-duck.png"
  },
  {
    id: 8,
    name: "Greater Amberjack",
    localName: "अंबरजैक",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 750,
    priceMax: 1500,
    unit: "kg",
    desc: "Premium grade firm sea fish, excellent choice for grilling and curries.",
    image: "assets/greater-amberjack.png"
  }
];

// FILTER CATEGORY FUNCTION (CLICK HANDLER FOR CATEGORY CARDS)
function filterCategory(catKey) {
  const shopSection = document.getElementById("shop");
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: "smooth" });
  }

  // Filter products by category tag
  const filteredProducts = products.filter(item => item.category === catKey || catKey === 'all');
  renderProducts(filteredProducts);
}

// RENDER PRODUCTS TO GRID
function renderProducts(productList) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = productList.map(item => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="product-info">
        <span class="product-tag">${item.filterCat}</span>
        <h3>${item.name}</h3>
        <p class="lang-text">${item.localName}</p>
        <p class="product-desc">${item.desc}</p>
        <div class="product-card-footer">
          <span class="price">₹${item.priceMin} - ₹${item.priceMax} /${item.unit}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

let cart = JSON.parse(localStorage.getItem("fishcopCart") || "[]");

const productGrid = document.getElementById("productGrid");
const filterSelect = document.getElementById("filterSelect");
const searchInput = document.getElementById("searchInput");
const cartPanel = document.getElementById("cartPanel");
const customerModal = document.getElementById("customerModal");
const overlay = document.getElementById("overlay");

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

renderProducts();
renderCart();
