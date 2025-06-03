<template>
  <div class="home-container">
    <div class="welcome-card">
      <h1>Welcome to FlavorFusion 🍽️</h1>
      <p class="subtitle">Please enter your name to start your order</p>

      <input
        v-model="name"
        type="text"
        placeholder="Your name"
        @keyup.enter="submitName"
      />

      <button :disabled="!name.trim()" @click="submitName">
        Start Ordering
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const name = ref('')
const router = useRouter()
const user = useUserStore()

const submitName = () => {
  if (name.value.trim()) {
    user.setName(name.value.trim())
    router.push('/table')
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: linear-gradient(135deg, #f8c291, #6a89cc);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.welcome-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
  transition: transform 0.3s ease;
}

.welcome-card:hover {
  transform: translateY(-5px);
}

h1 {
  margin-bottom: 0.5rem;
  color: #2d3436;
}

.subtitle {
  margin-bottom: 2rem;
  font-weight: 500;
  color: #636e72;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #dfe6e9;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #6a89cc;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #6a89cc;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #b2bec3;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #5a6dbc;
}
</style>
