import { instanceCommon as http } from './index'

/* 
  用户请求验证码
  @account: 邮箱号码
*/
export const registerHttp = async (account: string) => {
  const {data: res} = await http.post('api/getvercode', { account })
  return res
  
}


export const httpRegister = async (account: string, password: string, valiCode: string, secretCode: string) => {
/* 
  用于注册
  @account: 账户名
  @password: 密码
  @valiCode: 获取的邮箱验证码
  @secretCode：服务器返回的加密的验证码
*/
  const { data: res } = await http.post('api/register', {
    account,
    password,
    valiCode,
    secretCode
  })
  return res
}