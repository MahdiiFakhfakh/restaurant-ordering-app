import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    reservation: null,
  }),
  actions: {
    setName(newName) {
      this.name = newName
    },
    setReservation(reservation) {
      this.reservation = reservation
    }
  }
})
