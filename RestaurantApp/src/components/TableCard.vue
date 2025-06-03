<template>
  <div
    class="table-card"
    :class="{ reserved, selected }"
    @click="!reserved && $emit('select')"
  >
    <div class="table-top"></div>
    <div class="table-base"></div>
    <div class="table-number">Table {{ number }}</div>
  </div>
</template>

<script setup>
defineProps({
  number: { type: Number, required: true },
  reserved: { type: Boolean, default: false },
  selected: { type: Boolean, default: false }
})
</script>

<style scoped>
.table-card {
  width: 100%;
  height: 140px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.table-card:hover:not(.reserved):not(.selected) {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.table-card.reserved {
  cursor: not-allowed;
  opacity: 0.7;
  pointer-events: none;
}

.table-card.selected {
  box-shadow: 0 0 15px 4px #2e7d32;
  transform: translateY(-8px);
  z-index: 10;
}

.table-top {
  width: 90%;
  height: 80px;
  border-radius: 12px 12px 8px 8px;
  background: #4caf50; /* green for available */
  box-shadow:
    inset 0 5px 10px rgba(255, 255, 255, 0.3),
    inset 0 -5px 15px rgba(0, 0, 0, 0.2),
    0 6px 12px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
  margin-bottom: 12px;
}

.table-card.selected .table-top {
  background: #2e7d32; /* darker green for selected */
  box-shadow:
    inset 0 5px 10px rgba(255, 255, 255, 0.4),
    inset 0 -5px 15px rgba(0, 0, 0, 0.3);
}

.table-card.reserved .table-top {
  background: #e76f51; /* coral red for reserved */
  box-shadow:
    inset 0 5px 10px rgba(255, 255, 255, 0.2),
    inset 0 -5px 15px rgba(0, 0, 0, 0.3);
}

.table-base {
  width: 50px;
  height: 20px;
  background: #357a38; /* darker green base */
  border-radius: 0 0 8px 8px;
  box-shadow: inset 0 3px 5px rgba(255, 255, 255, 0.2),
    inset 0 -3px 5px rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.table-card.selected .table-base {
  background: #1b4d1a; /* even darker for selected */
}

.table-card.reserved .table-base {
  background: #a84533; /* darker red base */
}

.table-number {
  margin-top: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  color: #1b3a17;
  user-select: none;
  pointer-events: none;
}
</style>
