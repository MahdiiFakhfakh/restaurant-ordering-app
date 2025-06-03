<template>
  <div class="reservation-container">
    <div class="reservation-header">
      <h2 class="greeting">Hello, {{ guestName }}!</h2>
      <p class="instruction">Please select your table</p>
      <div class="reservation-status">
        <span v-if="selectedTable" class="selected-info">
          <i class="fas fa-check-circle"></i> Table {{ selectedTable }} selected
        </span>
        <span v-else class="select-prompt">
          <i class="fas fa-chair"></i> Click a table to select
        </span>
      </div>
    </div>

    <div class="restaurant-floorplan">
      <div class="tables-grid">
        <TableCard
          v-for="table in tables"
          :key="table.number"
          :number="table.number"
          :reserved="table.reserved"
          :shape="table.shape"
          :selected="selectedTable === table.number"
          @select="selectTable(table.number)"
          :style="{
            gridRow: table.row,
            gridColumn: table.col
          }"
        />
      </div>
    </div>

    <div class="reservation-actions">
      <button
        class="confirm-button"
        :disabled="!selectedTable"
        @click="confirmSelection"
      >
        Confirm Table {{ selectedTable }}
      </button>
    </div>

    <div class="floorplan-legend">
      <div class="legend-item">
        <div class="legend-color available"></div>
        <span>Available</span>
      </div>
      <div class="legend-item">
        <div class="legend-color selected"></div>
        <span>Selected</span>
      </div>
      <div class="legend-item">
        <div class="legend-color reserved"></div>
        <span>Reserved</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import TableCard from '@/components/TableCard.vue'

const router = useRouter()
const userStore = useUserStore()
const selectedTable = ref(null)

const guestName = userStore.name || 'Guest'

const tables = ref([
  { number: 1, reserved: false, shape: 'round' },
  { number: 2, reserved: false, shape: 'round' },
  { number: 3, reserved: true, shape: 'square' },
  { number: 4, reserved: false, shape: 'square' },
  { number: 5, reserved: false, shape: 'square' },
  { number: 6, reserved: false, shape: 'oval' },
  { number: 7, reserved: false, shape: 'square' },
  { number: 8, reserved: true, shape: 'round' },
  { number: 9, reserved: false, shape: 'oval' },
  { number: 10, reserved: false, shape: 'square' },
  { number: 11, reserved: false, shape: 'round' },
  { number: 12, reserved: false, shape: 'oval' }
])

// Position tables in grid
tables.value = tables.value.map((table, index) => ({
  ...table,
  row: Math.floor(index / 4) + 1,
  col: (index % 4) + 1
}))

// Simulate checking reserved tables
onMounted(() => {
  setTimeout(() => {
    tables.value = tables.value.map(table => ({
      ...table,
      reserved: Math.random() > 0.7
    }))
  }, 300)
})

function selectTable(number) {
  if (!tables.value.find(t => t.number === number)?.reserved) {
    selectedTable.value = selectedTable.value === number ? null : number
  }
}

function confirmSelection() {
  if (selectedTable.value) {
    userStore.setReservation({ table: selectedTable.value })
    router.push({ name: 'menu'}) // This should navigate to your menu route
  }
}
</script>

<style scoped>
.reservation-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.reservation-header {
  text-align: center;
  margin-bottom: 2rem;
}

.greeting {
  font-size: 2rem;
  color: #e63946;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.instruction {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
}

.reservation-status {
  font-size: 1.1rem;
  padding: 0.8rem;
  background: #f1faee;
  border-radius: 8px;
  display: inline-block;
}

.selected-info {
  color: #2a9d8f;
  font-weight: 600;
}

.select-prompt {
  color: #457b9d;
}

.restaurant-floorplan {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.tables-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 140px);
  gap: 1.5rem;
  width: 100%;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.reservation-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.confirm-button {
  padding: 1rem 3rem;
  font-size: 1.1rem;
  border-radius: 50px;
  border: none;
  background: #e63946;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
}

.confirm-button:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
  box-shadow: none;
}

.confirm-button:not(:disabled):hover {
  background: #c1121f;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(230, 57, 70, 0.5);
}

.floorplan-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.available {
  background: #a8dadc;
}

.legend-color.selected {
  background: #2a9d8f;
}

.legend-color.reserved {
  background: #e76f51;
}

@media (max-width: 768px) {
  .tables-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 120px);
    padding: 1.5rem;
  }

  .reservation-container {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .tables-grid {
    gap: 1rem;
    padding: 1rem;
  }

  .greeting {
    font-size: 1.8rem;
  }
}
</style>