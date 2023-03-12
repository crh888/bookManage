import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { closeToast, showToast } from 'vant'
import { baseUrl } from '@/config/index'


export const instanceCommon: AxiosInstance = axios.create({
  baseURL: baseUrl,
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
