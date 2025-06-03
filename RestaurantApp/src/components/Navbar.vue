<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/table">Table</router-link>
    <router-link to="/menu">Menu</router-link>
    <router-link to="/cart">Cart</router-link>
    <span v-if="user.name">👋 {{ user.name }}</span>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
const user = useUserStore()
</script>

<style scoped>
.navbar {
  background: #2d3436;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  color: white;
}
a {
  color: white;
  text-decoration: none;
}
</style>
