import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'

export const useBookInfoStore: StoreDefinition = defineStore('bookInfo', {
  state: () => ({
    bookList: []
  })
})