<!-- src/components/TableIcon.vue -->
<template>
  <Icon icon="mdi:table" class="table-icon" />
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.table-icon {
  width: 40px;
  height: 40px;
  color: #2d3436;
  transition: color 0.3s ease;
}

.table-card:hover .table-icon,
.selected .table-icon {
  color: white;
}
</style>
