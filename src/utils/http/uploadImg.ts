import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { baseUrl } from '@/config'

const instance_img = axios.create({
  baseURL: baseUrl,
  timeout: 9000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': JSON.parse(localStorage.getItem('token')!)
  }
})

const instance_upd = axios.create({
  baseURL: baseUrl,
  timeout: 9000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': JSON.parse(localStorage.getItem('token')!)
  }
})

instance_upd.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = JSON.parse(localStorage.getItem('token')!)
  return config
})

instance_img.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = JSON.parse(localStorage.getItem('token')!)
  return config
})

// 上传头像
export async function uploadAvatar(avatar: any) {
  const res = await instance_img.post('my/uploadavatar', {
    avatar
  })
  return res
}

// 更新头像
export async function updateAvatar(avatar: string) {
  const res = await instance_upd.post('my/updateavatar', {
    avatar
  })
  return res
}

// 上传图书封面
export const uploadCover = async (cover: any) => {
  const { data :res } = await instance_img.post('book/uploadcover', {
    cover
  })
  return res
}