import { defineStore } from 'pinia'

// 使用：
// this.authStoreInstance = authStore()
// this.authStoreInstance.userId
export const authStore = defineStore('auth', {
  state: () => {
    return {
      userId: undefined
    }
  },
  actions: {
    setUserId(val) {
      this.userId = val
    }
  },
})