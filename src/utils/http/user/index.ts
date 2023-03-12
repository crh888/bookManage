import http from '@/utils/http/index'

// 新增用户
export const addUser = async (account: string, password: string, identity: number) => {
  const res = await http.post('user/adduser', {
      account,
      password,
      identity
    })
    return res
} 


// 删除用户
export const deleteUser = async (id: number) => {
  const res = http.post('user/delete', {
    id
  })
  return res
}

// 修改用户权限
export const alterPermisson = async (identity: number, id: number) => {
  const res = await http.post('user/permission', {
    identity,
    id
  })
  return res
}

// 重置用户密码
export const retrievePwd = async (id: number) => {
  const res = await http.post('user/retrievepwd', {
    id
  })
  return res
}


// 按邮箱查询某一个用户
export const selectUser = async (account: string) => {
  const res = await http.post('user/account', {
    account
  })
  return res
}
