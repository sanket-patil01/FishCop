// OUR BEST SELLING PRODUCTS (DEFAULT 4 PRODUCTS)
const products = [
  {
    id: 1,
    name: "Freshwater / Cultivated White Prawns",
    localName: "तलावातली कोळंबी, तालाब का झींगा",
    category: "prawns",
    filterCat: "Prawns",
    priceMin: 570,
    priceMax: 680,
    unit: "kg",
    desc: "Freshwater cultivated white prawns, selected for freshness and quality.",
    image: "./assets/white-prawns.jpg"
  },
  {
    id: 2,
    name: "Small Wet Peeled Shrimps / Kardi",
    localName: "करंदी / करदी / आंबड",
    category: "prawns",
    filterCat: "Prawns",
    priceMin: 350,
    priceMax: 600,
    unit: "kg",
    desc: "Fresh small peeled prawns, perfect for authentic gravy and sukka.",
    image: "./assets/kardi-prawns.jpg"
  },
  {
    id: 3,
    name: "Rawas",
    localName: "रावस",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 900,
    priceMax: 1900,
    unit: "kg",
    desc: "Fresh Rawas (Indian Salmon), premium selection ideal for fry and curry.",
    image: "./assets/rawas.jpg"
  },
  {
    id: 4,
    name: "Silver Pomfret",
    localName: "पापलेट",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 995,
    priceMax: 2100,
    unit: "kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry.",
    image: "./assets/pomfret.jpg"
  }
];

// EXTRA SEA WATER FISHES (CATEGORY CLICK)
const seaWaterProducts = [
  {
    id: 101,
    name: "Silver Pomfret",
    localName: "पापलेट",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 995,
    priceMax: 2100,
    unit: "kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry.",
    image: "./assets/pomfret.jpg"
  },
  {
    id: 102,
    name: "Rawas",
    localName: "रावस",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 900,
    priceMax: 1900,
    unit: "kg",
    desc: "Fresh Rawas (Indian Salmon), premium quality selection ideal for fry and curry.",
    image: "./assets/rawas.jpg"
  },
  {
    id: 103,
    name: "Black Pomfret",
    localName: "हलवा / काला पापलेट",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 650,
    priceMax: 1400,
    unit: "kg",
    desc: "Rich in flavor, firm texture, best suitable for tawa fry and rich curry.",
    image: "./assets/black-pomfret.png"
  },
  {
    id: 104,
    name: "Surmai (King Fish)",
    localName: "सुरमई",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 850,
    priceMax: 1800,
    unit: "kg",
    desc: "Seafood lover favorite steak cut king fish with high protein content.",
    image: "./assets/surmai.png"
  },
  {
    id: 105,
    name: "Pink Perch (Rani)",
    localName: "रानी मासा",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 350,
    priceMax: 700,
    unit: "kg",
    desc: "Mild flavored pink perch, cleaned and scaled for daily home cooking.",
    image: "./assets/pink-perch.png"
  },
  {
    id: 106,
    name: "Tuna",
    localName: "कुप्पा / टूना",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 400,
    priceMax: 850,
    unit: "kg",
    desc: "Fleshy and meaty texture fish, high in Omega-3 fatty acids.",
    image: "./assets/tuna.png"
  },
  {
    id: 107,
    name: "Bombay Duck (Bumbla)",
    localName: "बोंबिल",
    category: "seawater",
    filterCat: "Sea Fish",
    priceMin: 280,
    priceMax: 550,
    unit: "kg",
    desc: "Fresh soft Bombay Duck fish, soft meat best enjoyed crisp rava fried.",
    image: "./assets/bombay-duck.png"
  },
  {
    id: 108,
    name: "Greater Amberjack",
    localName: "अंबरजैक",
    category: "seawater",
    filterCat: "Premium",
    priceMin: 750,
    priceMax: 1500,
    unit: "kg",
    desc: "Premium grade firm sea fish, excellent choice for grilling and curries.",
    image: "./assets/greater-amberjack.png"
  }
];

let cart = [];

// RENDER FUNCTION (WITH IMAGE PATH CONTROL & FALLBACK)
function renderProducts(productList) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = productList.map(item => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-tag">${item.filterCat}</span>
        <h3>${item.name}</h3>
        <p class="lang-text" style="font-size:12px; color:#64748b; margin-bottom:4px;">${item.localName}</p>
        <p class="product-desc">${item.desc}</p>
        <div class="product-card-footer">
          <span class="price">₹${item.priceMin} - ₹${item.priceMax} /${item.unit}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>
      </div>
    </div>
  `).join('');
}

// CATEGORY FILTER
function filterCategory(catKey) {
  const shopSection = document.getElementById("shop");
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: "smooth" });
  }

  if (catKey === 'seawater') {
    renderProducts(seaWaterProducts);
  } else if (catKey === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(item => item.category === catKey);
    renderProducts(filtered.length ? filtered : products);
  }
}

// CART HANDLERS
function addToCart(id) {
  const allAvailable = [...products, ...seaWaterProducts];
  const product = allAvailable.find(p => p.id === id);
  if (product) {
    cart.push(product);
    updateCart();
    alert(`${product.name} added to cart!`);
  }
}

function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  
  if (cartCount) cartCount.innerText = cart.length;
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = "<p style='padding:15px; text-align:center;'>Your cart is empty.</p>";
    } else {
      cartItems.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
          <div>
            <strong>${item.name}</strong><br>
            <small>₹${item.priceMin} - ₹${item.priceMax}</small>
          </div>
          <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
        </div>
      `).join('');
    }
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const allAvailable = [...products, ...seaWaterProducts];
      const filtered = allAvailable.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.localName.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  }

  const pills = document.querySelectorAll(".category-pills .pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      const filter = pill.getAttribute("data-filter");
      if (filter === "All") {
        renderProducts(products);
      } else {
        const allAvailable = [...products, ...seaWaterProducts];
        const filtered = allAvailable.filter(p => p.filterCat === filter);
        renderProducts(filtered);
      }
    });
  });

  const cartBtn = document.getElementById("cartBtn");
  const closeCart = document.getElementById("closeCart");
  const cartPanel = document.getElementById("cartPanel");
  const overlay = document.getElementById("overlay");
  const openCheckoutModal = document.getElementById("openCheckoutModal");
  const customerModal = document.getElementById("customerModal");
  const closeModal = document.getElementById("closeModal");

  if (cartBtn && cartPanel && overlay) {
    cartBtn.addEventListener("click", () => {
      cartPanel.classList.add("open");
      overlay.classList.add("active");
    });
  }

  if (closeCart && cartPanel && overlay) {
    closeCart.addEventListener("click", () => {
      cartPanel.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  if (openCheckoutModal && customerModal) {
    openCheckoutModal.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Please add items to cart first!");
        return;
      }
      cartPanel.classList.remove("open");
      customerModal.classList.add("open");
    });
  }

  if (closeModal && customerModal && overlay) {
    closeModal.addEventListener("click", () => {
      customerModal.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("custName").value;
      const phone = document.getElementById("custPhone").value;
      const address = document.getElementById("custAddress").value;
      const landmark = document.getElementById("custLandmark").value;

      let itemsText = cart.map(i => `- ${i.name} (₹${i.priceMin}-₹${i.priceMax})`).join("%0A");

      const message = `*New Order from FishCop.com*%0A%0A` +
        `*Customer Details:*%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Address: ${address}${landmark ? ' (' + landmark + ')' : ''}%0A%0A` +
        `*Order Items:*%0A${itemsText}`;

      window.open(`https://wa.me/919167005060?text=${message}`, '_blank');
    });
  }
});
// BEST SELLING PRODUCTS (HOME PAGE ONLY)
const products = [
  {
    id: 1,
    name: "Freshwater / Cultivated White Prawns",
    localName: "तलावातली कोळंबी, तालाब का झींगा",
    filterCat: "Prawns",
    priceText: "₹570.00 – ₹680.00",
    unit: "kg",
    desc: "Freshwater cultivated white prawns, selected for freshness and quality.",
    image: "./assets/white-prawns.jpg"
  },
  {
    id: 2,
    name: "Small Wet Peeled Shrimps / Kardi",
    localName: "करंदी / करदी / आंबड",
    filterCat: "Prawns",
    priceText: "₹350.00 – ₹600.00",
    unit: "kg",
    desc: "Fresh small peeled prawns, perfect for authentic gravy and sukka.",
    image: "./assets/kardi-prawns.jpg"
  },
  {
    id: 3,
    name: "Rawas",
    localName: "रावस",
    filterCat: "Sea Fish",
    priceText: "₹900.00 – ₹1,900.00",
    unit: "kg",
    desc: "Fresh Rawas (Indian Salmon), premium selection ideal for fry and curry.",
    image: "./assets/rawas.jpg"
  },
  {
    id: 4,
    name: "Silver Pomfret",
    localName: "पापलेट",
    filterCat: "Premium",
    priceText: "₹995.00 – ₹2,100.00",
    unit: "kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry.",
    image: "./assets/pomfret.jpg"
  }
];

// 8 SEA WATER PRODUCTS (DEDICATED PAGE: seawater.html)
const seaWaterProducts = [
  {
    id: 101,
    name: "Silver Pomfret",
    localName: "पापलेट",
    filterCat: "Premium",
    priceText: "₹995.00 – ₹2,100.00",
    unit: "kg",
    desc: "Fresh and premium Silver Pomfret, perfect for frying and tasty curry.",
    image: "./assets/silver-pomfret.png"
  },
  {
    id: 102,
    name: "Rawas (Indian Salmon)",
    localName: "रावस",
    filterCat: "Sea Fish",
    priceText: "₹900.00 – ₹1,900.00",
    unit: "kg",
    desc: "Fresh Rawas (Indian Salmon), premium quality selection ideal for fry and curry.",
    image: "./assets/rawas.png"
  },
  {
    id: 103,
    name: "Black Pomfret",
    localName: "Halwa / हलवा",
    filterCat: "Sea Fish",
    priceText: "₹595.00 – ₹1,190.00",
    unit: "kg",
    desc: "Rich in flavor, firm texture, best suitable for tawa fry and rich curry.",
    image: "./assets/black-pomfret.png"
  },
  {
    id: 104,
    name: "Surmai (Seerfish / Kingfish)",
    localName: "सुरमई",
    filterCat: "Premium",
    priceText: "₹995.00 – ₹1,990.00",
    unit: "kg",
    desc: "Seafood lover favorite steak cut king fish with high protein content.",
    image: "./assets/surmai.png"
  },
  {
    id: 105,
    name: "Pink Perch / Rani",
    localName: "राणी मासा",
    filterCat: "Sea Fish",
    priceText: "₹590.00 – ₹885.00",
    unit: "kg",
    desc: "Mild flavored pink perch, cleaned and scaled for daily home cooking.",
    image: "./assets/pink-perch.png"
  },
  {
    id: 106,
    name: "Tuna / Kuppa Slices / Steaks",
    localName: "खवळी कुप्पा",
    filterCat: "Sea Fish",
    priceText: "₹690.00 – ₹900.00",
    unit: "kg",
    desc: "Fleshy and meaty texture fish, high in Omega-3 fatty acids.",
    image: "./assets/tuna.png"
  },
  {
    id: 107,
    name: "Bombay Duck",
    localName: "Bombil / बोंबिल",
    filterCat: "Sea Fish",
    priceText: "₹395.00 – ₹710.00",
    unit: "kg",
    desc: "Fresh soft Bombay Duck fish, soft meat best enjoyed crisp rava fried.",
    image: "./assets/bombay-duck.png"
  },
  {
    id: 108,
    name: "Greater Amberjack",
    localName: "Sasa / ससा",
    filterCat: "Premium",
    priceText: "₹850.00 – ₹900.00",
    unit: "kg",
    desc: "Premium grade firm sea fish, excellent choice for grilling and curries.",
    image: "./assets/greater-amberjack.png"
  }
];

let cart = JSON.parse(localStorage.getItem('fishcop_cart')) || [];

// TEMPLATE BUILDER FOR PRODUCT CARDS
function generateCardHTML(item) {
  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-tag">${item.filterCat}</span>
        <h3>${item.name}</h3>
        <p class="lang-text" style="font-size:12px; color:#64748b; margin-bottom:4px;">${item.localName}</p>
        <p class="product-desc">${item.desc}</p>
        <div class="product-card-footer">
          <span class="price">${item.priceText} /${item.unit}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
        </div>
      </div>
    </div>
  `;
}

// RENDER LOGIC BASED ON PAGE
function initProducts() {
  const homeGrid = document.getElementById("productGrid");
  const seaWaterGrid = document.getElementById("seaWaterGrid");

  if (homeGrid) {
    homeGrid.innerHTML = products.map(item => generateCardHTML(item)).join('');
  }

  if (seaWaterGrid) {
    seaWaterGrid.innerHTML = seaWaterProducts.map(item => generateCardHTML(item)).join('');
  }
}

// CART MANAGEMENT WITH LOCALSTORAGE (PERSISTS ACROSS PAGES)
function addToCart(id) {
  const allAvailable = [...products, ...seaWaterProducts];
  const product = allAvailable.find(p => p.id === id);
  if (product) {
    cart.push(product);
    saveAndUpdateCart();
    alert(`${product.name} added to cart!`);
  }
}

function saveAndUpdateCart() {
  localStorage.setItem('fishcop_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  
  if (cartCount) cartCount.innerText = cart.length;
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = "<p style='padding:15px; text-align:center;'>Your cart is empty.</p>";
    } else {
      cartItems.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
          <div>
            <strong>${item.name}</strong><br>
            <small>${item.priceText}</small>
          </div>
          <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">✕</button>
        </div>
      `).join('');
    }
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveAndUpdateCart();
}

// INITIALIZATION & EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  updateCartUI();

  // Search filter
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const allAvailable = [...products, ...seaWaterProducts];
      const filtered = allAvailable.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.localName.toLowerCase().includes(term)
      );
      const grid = document.getElementById("productGrid") || document.getElementById("seaWaterGrid");
      if (grid) grid.innerHTML = filtered.map(item => generateCardHTML(item)).join('');
    });
  }

  // Cart Modal & Overlay Events
  const cartBtn = document.getElementById("cartBtn");
  const closeCart = document.getElementById("closeCart");
  const cartPanel = document.getElementById("cartPanel");
  const overlay = document.getElementById("overlay");
  const openCheckoutModal = document.getElementById("openCheckoutModal");
  const customerModal = document.getElementById("customerModal");
  const closeModal = document.getElementById("closeModal");

  if (cartBtn && cartPanel && overlay) {
    cartBtn.addEventListener("click", () => {
      cartPanel.classList.add("open");
      overlay.classList.add("active");
    });
  }

  if (closeCart && cartPanel && overlay) {
    closeCart.addEventListener("click", () => {
      cartPanel.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  if (openCheckoutModal && customerModal) {
    openCheckoutModal.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Please add items to cart first!");
        return;
      }
      cartPanel.classList.remove("open");
      customerModal.style.display = "block";
      customerModal.classList.add("open");
    });
  }

  if (closeModal && customerModal && overlay) {
    closeModal.addEventListener("click", () => {
      customerModal.style.display = "none";
      customerModal.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  // WhatsApp Order Submission
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("custName").value;
      const phone = document.getElementById("custPhone").value;
      const address = document.getElementById("custAddress").value;
      const landmark = document.getElementById("custLandmark").value;

      let itemsText = cart.map(i => `- ${i.name} (${i.priceText})`).join("%0A");

      const message = `*New Order from FishCop.com*%0A%0A` +
        `*Customer Details:*%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Address: ${address}${landmark ? ' (' + landmark + ')' : ''}%0A%0A` +
        `*Order Items:*%0A${itemsText}`;

      window.open(`https://wa.me/919167005060?text=${message}`, '_blank');
    });
  }
});
