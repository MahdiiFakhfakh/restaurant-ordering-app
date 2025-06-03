<template>
  <div class="menu-page">
    <!-- Floating Cart Button -->
    <button 
      class="floating-cart-btn"
      @click="toggleCartPopup"
      :class="{ 'has-items': cartStore.itemCount > 0 }"
    >
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-count" v-if="cartStore.itemCount > 0">
        {{ cartStore.itemCount }}
      </span>
    </button>

    <!-- Main Menu Content -->
    <div class="menu-container">
      <!-- Menu Header -->
      <div class="menu-header">
        <h1>Gourmet Haven Menu</h1>
        <div class="guest-info">
          <span class="welcome">Welcome, {{ userStore.name || 'Guest' }}!</span>
          <span class="table-info">Table: {{ userStore.reservation?.table || '--' }}</span>
        </div>
      </div>

      <!-- Menu Categories -->
      <div class="category-tabs">
        <button
          v-for="category in categories"
          :key="category"
          @click="activeCategory = category"
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </button>
      </div>

      <!-- Menu Items -->
      <div class="menu-items-container">
        <div class="menu-section" v-for="category in categories" :key="category" v-show="activeCategory === category">
          <h2 class="section-title">{{ category }}</h2>
          <div class="menu-items-grid">
            <div class="menu-item" v-for="item in getItemsByCategory(category)" :key="item.id">
              <div class="item-image" :style="{ backgroundImage: `url(${item.image})` }">
                <span class="item-price">${{ item.price.toFixed(2) }}</span>
              </div>
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <div class="item-controls">
                  <button class="quantity-btn decrement" @click="cartStore.decrementItem(item.id)">-</button>
                  <span class="quantity">{{ getItemQuantity(item.id) }}</span>
                  <button class="quantity-btn increment" @click="cartStore.addItem(item)">+</button>
                  <button class="add-to-cart" @click="addToCart(item)">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Popup -->
    <div class="cart-popup-overlay" v-if="showCartPopup" @click="showCartPopup = false"></div>
    
    <div class="cart-popup" :class="{ 'active': showCartPopup }">
      <div class="cart-header">
        <h3>Your Order</h3>
        <button class="close-cart" @click="showCartPopup = false">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="cart-items" v-if="cartStore.itemCount > 0">
        <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">× {{ item.quantity }}</span>
          </div>
          <div class="item-controls">
            <button class="quantity-btn" @click="cartStore.decrementItem(item.id)">-</button>
            <button class="quantity-btn" @click="cartStore.addItem(item)">+</button>
          </div>
          <span class="item-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
      <div class="empty-cart-message" v-else>
        <i class="fas fa-utensils"></i>
        <p>Your cart is empty</p>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%):</span>
          <span>${{ cartStore.taxAmount.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span class="total-amount">${{ cartStore.total.toFixed(2) }}</span>
        </div>
      </div>

      <button 
        class="checkout-btn" 
        @click="proceedToCheckout" 
        :disabled="cartStore.itemCount === 0"
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const activeCategory = ref('Starters')
const showCartPopup = ref(false)
const categories = ['Starters', 'Main Courses', 'Desserts', 'Beverages']

const menuItems = ref([
  {
    id: 1,
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella',
    price: 12.99,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1604977046802-80b5d1a19d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  // ... other menu items
])

const getItemsByCategory = (category) => {
  return menuItems.value.filter(item => item.category === category)
}

const getItemQuantity = (id) => {
  const item = cartStore.items.find(item => item.id === id)
  return item ? item.quantity : 0
}

const addToCart = (item) => {
  cartStore.addItem(item)
  showCartPopup.value = true
}

const toggleCartPopup = () => {
  showCartPopup.value = !showCartPopup.value
}

const proceedToCheckout = () => {
  router.push('/cart')
}
</script>

<style scoped>
/* Base Styles */
.menu-page {
  position: relative;
  min-height: 100vh;
  background-color: #f9f5f0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 2rem;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
}

/* Header Styles */
.menu-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 1rem;
}

.menu-header h1 {
  font-size: 2.5rem;
  color: #2a2a2a;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}

.guest-info {
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 1.1rem;
}

.welcome {
  font-weight: 600;
}

.table-info {
  font-style: italic;
}

/* Category Tabs */
.category-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.category-tabs button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #f1f1f1;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #555;
}

.category-tabs button.active {
  background: #e63946;
  color: white;
}

.category-tabs button:hover:not(.active) {
  background: #ddd;
}

/* Menu Items Grid */
.menu-items-container {
  margin-top: 1rem;
}

.section-title {
  font-size: 1.8rem;
  color: #2a2a2a;
  font-family: 'Playfair Display', serif;
  margin-top: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8e8e8;
  font-weight: 600;
}

.menu-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.menu-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.item-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.item-price {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.item-details {
  padding: 1.5rem;
}

.item-details h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #2a2a2a;
  font-weight: 600;
}

.item-description {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  min-height: 60px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background: #f1f1f1;
  border-color: #ccc;
}

.quantity {
  width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
}

.add-to-cart {
  flex: 1;
  padding: 0.6rem;
  border: none;
  background: #e63946;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;
  font-size: 0.9rem;
}

.add-to-cart:hover {
  background: #c1121f;
}

/* Floating Cart Button */
.floating-cart-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e63946;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 90;
  transition: all 0.3s ease;
}

.floating-cart-btn:hover {
  background: #c1121f;
  transform: scale(1.1);
}

.floating-cart-btn.has-items {
  animation: pulse 1.5s infinite;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background: white;
  color: #e63946;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  border: 2px solid #e63946;
}

/* Cart Popup */
.cart-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 95;
}

.cart-popup {
  position: fixed;
  bottom: -100%;
  right: 2rem;
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  transition: bottom 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-popup.active {
  bottom: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #2a2a2a;
  color: white;
}

.cart-header h3 {
  font-size: 1.3rem;
  margin: 0;
}

.close-cart {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-cart:hover {
  color: #e63946;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.item-quantity {
  font-size: 0.9rem;
  color: #666;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem;
}

.item-total {
  font-weight: 600;
  min-width: 60px;
  text-align: right;
}

.empty-cart-message {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-cart-message i {
  font-size: 2.5rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-cart-message p {
  font-size: 1.1rem;
}

.cart-summary {
  padding: 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}

.total-amount {
  color: #e63946;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #e63946;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover:not(:disabled) {
  background: #c1121f;
}

.checkout-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
  color: #999;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(230, 57, 70, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(230, 57, 70, 0);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .menu-container {
    padding: 1.5rem;
  }
  
  .menu-items-grid {
    grid-template-columns: 1fr;
  }
  
  .cart-popup {
    width: 100%;
    right: 0;
    border-radius: 10px 10px 0 0;
  }
  
  .floating-cart-btn {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>