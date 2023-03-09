import axios from 'axios'

const instance_img = axios.create({
  baseURL: 'https://api.1crh.cn/bookserver/',
  timeout: 9000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': JSON.parse(localStorage.getItem('token')!)
  }
})

const instance_upd = axios.create({
  baseURL: 'https://api.1crh.cn/bookserver/',
  timeout: 9000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': JSON.parse(localStorage.getItem('token')!)
  }
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