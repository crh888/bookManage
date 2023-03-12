import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { closeToast, showToast } from 'vant'
import { baseUrl } from '@/config'

const instance: AxiosInstance = axios.create({
  baseURL:baseUrl,
  timeout: 9000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': JSON.parse(localStorage.getItem('token')!)
  }
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = JSON.parse(localStorage.getItem('token')!)
  showToast({
    type: 'loading',
    duration: 7000,
    forbidClick: true
  })
  return config
})

instance.interceptors.response.use((res: any) => {
  closeToast()
  return res.data
})

export default instance