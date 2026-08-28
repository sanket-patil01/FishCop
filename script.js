// PRODUCTS DATA (INCLUDES OLD + NEW 8 FISHES)
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
  },
  {
    id: 9,
    name: "Freshwater / Cultivated White Prawns",
    localName: "तलावातील कोळंबी तालाब का झींगा",
    category: "prawns",
    filterCat: "Prawns",
    priceMin: 570,
    priceMax: 680,
    unit: "kg",
    desc: "Freshwater cultivated white prawns, selected for freshness and quality.",
    image: "assets/prawns.png"
  }
];

let cart = [];

// RENDER PRODUCTS FUNCTION
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

// CATEGORY CLICK FILTER (FOR PRODUCT CATEGORIES SECTION)
function filterCategory(catKey) {
  const shopSection = document.getElementById("shop");
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: "smooth" });
  }

  const filtered = products.filter(item => item.category === catKey || catKey === 'all');
  renderProducts(filtered);
}

// CART FUNCTIONALITY
function addToCart(id) {
  const product = products.find(p => p.id === id);
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
        <div style="display:flex; justify-between; align-center; padding:10px 0; border-bottom:1px solid #eee;">
          <div>
            <strong>${item.name}</strong><br>
            <small>₹${item.priceMin} - ₹${item.priceMax}</small>
          </div>
          <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
        </div>
      `).join('');
    }
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// INITIAL DOM EVENTS
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);

  // Search input filter
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.localName.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  }

  // Pill filter buttons
  const pills = document.querySelectorAll(".category-pills .pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      const filter = pill.getAttribute("data-filter");
      if (filter === "All") {
        renderProducts(products);
      } else {
        const filtered = products.filter(p => p.filterCat === filter);
        renderProducts(filtered);
      }
    });
  });

  // Cart Panel Handlers
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

  // WhatsApp Order Submission
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
