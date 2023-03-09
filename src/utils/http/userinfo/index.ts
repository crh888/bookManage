import http from "../index"

// 获取用户的信息
export const getUserInfo = async () => {
  const res = await http.get('my/userinfo')
  return res
}

// 修改用户密码
export const updatePwd = async (oldPwd: string, newPwd: string) => {
  const res = await http.post('my/updatepwd', {
    oldPwd,
    newPwd
  })
  return res
}

// 修改个人资料
export const updateInfo = async (info_id: number, nickname: string, gender: number, birthday: string) => {
  const res = await http.post('my/updateuserinfo', {
    info_id,
    nickname,
    gender,
    birthday
  })
  return res
}