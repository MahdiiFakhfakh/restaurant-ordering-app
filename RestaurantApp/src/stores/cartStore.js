import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    taxAmount: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity * 0.08), 0),
    total: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity * 1.08), 0)
  },
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    decrementItem(id) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item.quantity--
        if (item.quantity <= 0) {
          this.removeItem(id)
        }
      }
    },
    clearCart() {
      this.items = []
    }
  },
  persist: true // Optional: enables localStorage persistence
})