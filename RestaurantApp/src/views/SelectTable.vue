<template>
  <div class="floorplan-container">
    <h2>Select Your Table</h2>

    <div class="floorplan">
      <TableCard
        v-for="table in tables"
        :key="table.number"
        :tableNumber="table.number"
        :isSelected="table.number === selectedTable"
        @select="handleSelect"
        :style="{
          gridRow: table.row,
          gridColumn: table.col
        }"
      />
    </div>

    <button
      :disabled="!selectedTable"
      @click="confirmSelection"
    >
      Confirm Table {{ selectedTable || '' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTableStore } from '@/stores/tableStore'
import TableCard from '@/components/TableCard.vue'

const router = useRouter()
const tableStore = useTableStore()
const selectedTable = ref(tableStore.selectedTable)

// 12 tables with custom rows and columns (you can customize layout)
const tables = ref([
  { number: 1, row: 1, col: 1 },
  { number: 2, row: 1, col: 2 },
  { number: 3, row: 1, col: 3 },
  { number: 4, row: 1, col: 4 },

  { number: 5, row: 2, col: 1 },
  { number: 6, row: 2, col: 2 },
  { number: 7, row: 2, col: 3 },
  { number: 8, row: 2, col: 4 },

  { number: 9, row: 3, col: 1 },
  { number: 10, row: 3, col: 2 },
  { number: 11, row: 3, col: 3 },
  { number: 12, row: 3, col: 4 },
])

function handleSelect(num) {
  selectedTable.value = num
  tableStore.selectTable(num)
}

function confirmSelection() {
  if (selectedTable.value) {
    router.push('/menu')
  }
}
</script>

<style scoped>
.floorplan-container {
  max-width: 700px;
  margin: 2rem auto;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  color: #2d3436;
}

.floorplan {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 120px);
  gap: 2rem 2rem;
  margin-bottom: 2rem;
  justify-items: center;
  align-items: center;
  background: #f0f4f8;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  user-select: none;
}

button {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border-radius: 0.6rem;
  border: none;
  background-color: #6a89cc;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #b2bec3;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #5a6dbc;
}
</style>
