<template>
  <div class="menu-card">
    <img :src="item.image" alt="food" class="menu-image" />
    <h4>{{ item.name }}</h4>
    <p class="description">{{ item.description }}</p>
    <div class="footer">
      <span class="price">\${{ item.price }}</span>
      <button @click="$emit('add')">Add</button>
    </div>
  </div>
</template>

<script setup>
defineProps(['item'])
</script>

<style scoped>
.menu-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin: 0.5rem 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
}

button {
  background: #2a9d8f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
