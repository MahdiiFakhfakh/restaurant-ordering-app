// src/stores/tableStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('tableStore', () => {
  const selectedTable = ref(null)

  function selectTable(tableNum) {
    selectedTable.value = tableNum
  }

  return { selectedTable, selectTable }
})
