import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'
export const useAboutUser: StoreDefinition = defineStore('user', {
  state: () => ({
    // 保存登录信息
    userinfo: {
      id: '',
      identity: null,
      token: JSON.parse(localStorage.getItem('token')!) || ''
    }
  }),
  actions: {
    saveTokenToLocal() {
      localStorage.setItem('token', JSON.stringify(this.userinfo.token))
    }
  }
})