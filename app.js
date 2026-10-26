const products = [
  {
    id: 1,
    name: "Printed Cotton Tee",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Soft cotton tee with unique graphic print."
  },
  {
    id: 2,
    name: "Hoodie with Print",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    description: "Cozy hoodie featuring bold print design."
  },
  {
    id: 3,
    name: "Midi Dress Print",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    description: "Flowing midi dress with artistic print."
  },
  {
    id: 4,
    name: "Sweatshirt Classic",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop",
    description: "Everyday sweatshirt with subtle print."
  },
  {
    id: 5,
    name: "Long Sleeve Print",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    description: "Layering long sleeve with eye-catching print."
  },
  {
    id: 6,
    name: "Tank Top Graphic",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
    description: "Lightweight tank with vibrant graphic."
  }
];

let cart = JSON.parse(localStorage.getItem('hilda-cart')) || [];

function renderProducts() {
  const grid = document.getElementById('products');
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">$${p.price.toFixed(2)}</p>
        <p style="font-size:0.9rem;color:#666;margin-bottom:0.75rem;">${p.description}</p>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  alert(`${product.name} added to cart!`);
}

function saveCart() {
  localStorage.setItem('hilda-cart', JSON.stringify(cart));
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = '0.00';
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name} × ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:#e94560;cursor:pointer;">Remove</button>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalEl.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

// Cart modal
const modal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeBtn = document.querySelector('.close');

cartBtn.addEventListener('click', () => {
  updateCartUI();
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty');
  alert('Checkout complete! (Demo mode — in production this would process payment and fulfill clothing orders.)\n\nThank you for shopping at Hilda Prints!');
  cart = [];
  saveCart();
  updateCartUI();
  modal.style.display = 'none';
});

// PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Optional: show custom install button
});

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.log('SW failed', err));
}

renderProducts();
updateCartUI();
