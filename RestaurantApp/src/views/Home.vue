<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const name = ref(userStore.name)
const isAnimating = ref(true)

function confirmName() {
  if (name.value.trim()) {
    userStore.setName(name.value.trim())
    // Add animation before navigation
    document.querySelector('.home-container').classList.add('fade-out')
    setTimeout(() => {
      router.push('/table')
    }, 500)
  }
}

onMounted(() => {
  setTimeout(() => {
    isAnimating.value = false
  }, 1000)
})
</script>

<template>
  <div class="home-container" :class="{ 'initial-animate': isAnimating }">
    <div class="background-overlay"></div>
    
    <div class="content">
      <h1 class="title">
        <span class="welcome">Welcome to</span>
        <span class="restaurant-name">Gourmet Haven</span>
      </h1>
      
      <p class="subtitle">Where culinary dreams come true</p>
      
      <div class="input-group">
        <input
          v-model="name"
          type="text"
          placeholder="Enter your name"
          aria-label="Enter your name"
          @keyup.enter="confirmName"
        />
        <i class="fas fa-user input-icon"></i>
      </div>
      
      <button 
        :disabled="!name.trim()" 
        @click="confirmName"
        class="cta-button"
      >
        <span>Start Booking</span>
        <i class="fas fa-arrow-right button-icon"></i>
      </button>
    </div>
    
    <div class="decorative-elements">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.home-container.fade-out {
  opacity: 0;
}

.home-container.initial-animate .title,
.home-container.initial-animate .subtitle,
.home-container.initial-animate .input-group,
.home-container.initial-animate .cta-button {
  opacity: 0;
  transform: translateY(20px);
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: fadeIn 1s forwards;
}

.welcome {
  display: block;
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.restaurant-name {
  display: block;
  font-weight: 700;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-weight: 300;
  opacity: 0.9;
  animation: fadeIn 1.2s 0.3s forwards;
}

.input-group {
  position: relative;
  margin-bottom: 2rem;
  animation: fadeIn 1.2s 0.6s forwards;
}

input {
  width: 100%;
  padding: 1.2rem 1rem 1.2rem 3rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

input:focus {
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.input-icon {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #555;
  font-size: 1.2rem;
}

.cta-button {
  position: relative;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.2s 0.9s forwards;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cta-button:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:not(:disabled):active {
  transform: translateY(1px);
}

.button-icon {
  margin-left: 0.8rem;
  transition: transform 0.3s ease;
}

.cta-button:hover:not(:disabled) .button-icon {
  transform: translateX(5px);
}

.decorative-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  right: -50px;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -100px;
  left: -100px;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  right: 10%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .welcome {
    font-size: 1.4rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  input {
    padding: 1rem 1rem 1rem 2.5rem;
  }
  
  .input-icon {
    left: 1rem;
    font-size: 1rem;
  }
}
</style>