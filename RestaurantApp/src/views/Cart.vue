<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <ul v-if="cart.items.length">
      <li v-for="item in cart.items" :key="item.id">
        {{ item.name }} × {{ item.quantity }} = ${{ item.quantity * item.price }}
        <button @click="remove(item.id)">Remove</button>
      </li>
    </ul>
    <p v-else>Your cart is empty.</p>
    <h3>Total: ${{ cart.totalPrice }}</h3>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

export default {
  name: 'Cart',
  setup() {
    const cart = useCartStore()
    const remove = (id) => cart.removeFromCart(id)
    return { cart, remove }
  }
}
</script>

<style scoped>
.cart {
  padding: 2rem;
}

button {
  margin-left: 1rem;
  padding: 0.3rem 0.7rem;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
