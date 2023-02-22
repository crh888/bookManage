import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { closeToast, showToast } from 'vant'


export const instanceCommon: AxiosInstance = axios.create({
  baseURL: 'https://api.1crh.cn/bookserver/',
  timeout: 9000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

instanceCommon.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  showToast({
    type: 'loading',
    duration: 7000,
    forbidClick: true
  })
  return config
})

instanceCommon.interceptors.response.use((res: any) => {
  closeToast()
  return res.data
})
