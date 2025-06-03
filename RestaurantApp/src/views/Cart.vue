<template>
  <div class="cart-page">
    <div class="cart-container">
      <div class="cart-header">
        <h1>Your Order</h1>
        <p class="table-info">Table: {{ userStore.reservation?.table || '--' }}</p>
      </div>

      <div class="cart-items" v-if="cartStore.itemCount > 0">
        <div class="cart-item" v-for="item in cartStore.items" :key="item.id">
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-description">{{ item.description }}</p>
          </div>
          <div class="item-controls">
            <button class="quantity-btn" @click="cartStore.decrementItem(item.id)">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="quantity-btn" @click="cartStore.addItem(item)">+</button>
            <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <div class="empty-cart" v-else>
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <router-link to="/menu" class="back-to-menu">
          Browse Menu
        </router-link>
      </div>

      <div class="order-summary">
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
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>
      </div>

      <div class="cart-actions">
        <router-link to="/menu" class="back-button">
          <i class="fas fa-arrow-left"></i> Back to Menu
        </router-link>
        <button 
          class="confirm-order" 
          @click="placeOrder" 
          :disabled="cartStore.itemCount === 0"
        >
          Confirm Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const placeOrder = () => {
  // In a real app, you would send this to your backend
  const order = {
    table: userStore.reservation?.table,
    items: cartStore.items,
    total: cartStore.total,
    customerName: userStore.name
  }
  
  console.log('Order placed:', order)
  alert(`Order confirmed for Table ${order.table}!`)
  cartStore.clearCart()
  router.push('/')
}
</script>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.cart-header h1 {
  font-size: 2.2rem;
  color: #2a2a2a;
}

.table-info {
  color: #666;
  font-size: 1.1rem;
}

.cart-items {
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex: 2;
}

.item-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.item-description {
  color: #666;
  font-size: 0.95rem;
}

.item-controls {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  font-weight: bold;
  cursor: pointer;
}

.quantity {
  width: 30px;
  text-align: center;
}

.item-price {
  font-weight: 600;
  min-width: 70px;
  text-align: right;
}

.empty-cart {
  text-align: center;
  padding: 3rem 0;
  color: #666;
}

.empty-cart i {
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.empty-cart p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.back-to-menu {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #e63946;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
}

.order-summary {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  border-top: 1px solid #ddd;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
}

.back-button {
  padding: 0.8rem 1.5rem;
  background: #f1f1f1;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.confirm-order {
  padding: 0.8rem 2rem;
  background: #e63946;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}

.confirm-order:disabled {
  background: #ddd;
  cursor: not-allowed;
}
</style>