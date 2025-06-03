<template>
  <div
    class="table-card"
    :class="{ selected: isSelected }"
    @click="$emit('select', tableNumber)"
  >
    <TableIcon />
    <span>Table {{ tableNumber }}</span>
  </div>
</template>

<script setup>
import TableIcon from './TableIcon.vue'

defineProps({
  tableNumber: Number,
  isSelected: Boolean
})
</script>

<style scoped>
.table-card {
  width: 100px;
  height: 100px;
  background: #dfe6e9;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2d3436;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  user-select: none;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  gap: 0.5rem;
}

.table-card:hover {
  background: #6a89cc;
  color: white;
  box-shadow: 0 8px 20px rgba(106,137,204,0.7);
  transform: scale(1.1);
}

.selected {
  background: #0984e3;
  color: white;
  box-shadow: 0 10px 30px rgba(9,132,227,0.8);
  transform: scale(1.15);
}

svg {
  width: 40px;
  height: 40px;
  transition: fill 0.3s ease;
}
</style>
