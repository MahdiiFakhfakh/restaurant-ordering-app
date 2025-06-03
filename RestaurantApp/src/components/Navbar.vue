<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <router-link to="/" class="logo" aria-label="Go to homepage">
        <span class="logo-icon" aria-hidden="true">🍽️</span>
        <span class="logo-text">Gourmet Haven</span>
      </router-link>

      <nav class="desktop-nav" role="navigation" aria-label="Primary">
        <router-link to="/" class="nav-link" exact-active-class="active">
          Home
        </router-link>
        <router-link to="/table" class="nav-link" active-class="active">
          Reserve Table
        </router-link>
        <router-link to="/menu" class="nav-link" active-class="active">
          Menu
        </router-link>
        <router-link to="/cart" class="nav-link" active-class="active">
          <i class="fas fa-shopping-cart" aria-hidden="true"></i> Cart
        </router-link>
      </nav>

      <div class="guest-section" aria-live="polite">
        {{ guestGreeting }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const isScrolled = ref(false)

const guestGreeting = computed(() =>
  userStore.name ? `Welcome, ${userStore.name}!` : 'Welcome!'
)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar.scrolled {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  background: #fff;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.6rem;
  color: #e63946;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
}

.logo:hover,
.logo:focus {
  outline: none;
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.9rem;
  margin-right: 0.5rem;
}

.logo-text {
  font-family: 'Playfair Display', serif;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #333;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  padding-bottom: 0.25rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.nav-link:hover,
.nav-link:focus {
  color: #e63946;
  outline: none;
}

.nav-link.active {
  color: #e63946;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #e63946;
  border-radius: 2px;
  animation: underline 0.3s ease forwards;
}

@keyframes underline {
  from {
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    transform: scaleX(1);
    transform-origin: left;
  }
}

.guest-section {
  margin-left: auto;
  font-size: 0.95rem;
  color: #555;
  user-select: none;
  white-space: nowrap;
}
</style>
