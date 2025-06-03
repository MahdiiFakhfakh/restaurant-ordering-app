<template>
  <div class="table-icon" :class="{ premium, reserved }">
    <i v-if="reserved" class="fas fa-lock"></i>
    <i v-else-if="premium" class="fas fa-crown"></i>
    <i v-else class="fas fa-utensils"></i>
  </div>
</template>

<script setup>
defineProps({
  premium: {
    type: Boolean,
    default: false
  },
  reserved: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.table-icon {
  font-size: 2rem;
  color: #457b9d;
  transition: all 0.3s ease;
}

.table-icon.premium {
  color: #f4a261;
}

.table-icon.reserved {
  color: #e63946;
}
</style>