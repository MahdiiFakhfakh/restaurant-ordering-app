<template>
  <div class="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/table">Select Table</router-link>
      <router-link to="/menu">Menu</router-link>
      <router-link to="/cart">Cart</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  background-color: #333;
  padding: 1rem;
}

a {
  color: white;
  text-decoration: none;
}

a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
