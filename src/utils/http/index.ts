import axios from 'axios'

export const instanceCommon = axios.create({
  baseURL: 'https://api.1crh.cn/bookserver/',
  timeout: 7000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
