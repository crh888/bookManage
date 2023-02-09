import { defineStore } from 'pinia'

export const useAboutUser = defineStore('user', {
  state: () => {
    return {
      id: 1
    }
  }
})