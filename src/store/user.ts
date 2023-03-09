import { defineStore } from 'pinia'
import type { StoreDefinition } from 'pinia'
export const useAboutUser: StoreDefinition = defineStore('user', {
  state: () => ({
    // 保存登录信息
    userinfo: {
      id: '',
      identity: null,
      token: JSON.parse(localStorage.getItem('token')!) || ''
    },
    selfInfo: {
      avatar: '',
      nickname: '',
      gender: 0,
      birthday: '',
      info_id: 0
    }
  }),
  actions: {
    saveTokenToLocal() {
      localStorage.setItem('token', JSON.stringify(this.userinfo.token))
    }
  },
  getters: {
    formatGender(state: any) {
      if (state.selfInfo.gender === 1) {
        return '男'
      } else {
        return '女'
      }
    }
  }
})