<template>
  <div class="menu">
    <h1>Menu</h1>
    <ul>
      <li v-for="item in menu" :key="item.id">
        {{ item.name }} - ${{ item.price }}
        <button @click="addItemToCart(item)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMenuItems } from '@/api/menu'
import { useCartStore } from '@/stores/cartStore'

export default {
  name: 'Menu',
  data() {
    return {
      menu: []
    }
  },
  async created() {
    this.menu = await getMenuItems()
  },
  methods: {
    addItemToCart(item) {
      const cart = useCartStore()
      cart.addToCart(item)
    }
  }
}
</script>

<style scoped>
.menu {
  padding: 2rem;
}

button {
  margin-left: 1rem;
  padding: 0.3rem 0.7rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
