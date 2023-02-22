<template>
  <Transition name="fade">
  <div v-if="!isForget" class=" login-container flex flex-col justify-center h-screen w-screen">
    <!-- logo -->
    <div class="logo bg-white rounded-md overflow-hidden ml-4 mr-4 mb-2">
      <img src="@/assets/images/login.png" alt="" srcset="">
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
      <van-field
        v-model="account"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin: 16px;" @click="() => isForget = true">
      <van-button round block type="warning" native-type="submit">
        忘记密码
      </van-button>
    </div>
</van-form>
<!-- 跳转注册 -->
<Move desc="还没有账号？点击注册" msg="正在跳转至注册页面" route="/register"></Move>
  </div>
  <div v-else class="forget-pwd w-screen h-screen flex flex-col justify-center">
  <div class="logo bg-white rounded-md overflow-hidden ml-4 mr-4 mb-2">
    <img src="@/assets/images/logo.png" alt="">
  </div>
  <van-form @submit="forgetPwd">
  <van-cell-group inset>
    <van-field
      v-model="email"
      name="邮箱"
      label="邮箱"
      placeholder="邮箱"
      :rules="[{ pattern: pattern_email, message: '请输入正确格式的邮箱号码' }]"
    />
    <van-field
      v-model="newPwd"
      type="password"
      name="新密码"
      label="新密码"
      placeholder="新密码"
      :rules="[{ pattern: pattern_pwd, message: '必须包含大小写字母和数字，长度9-16位' }]"
    />
    <van-field
      v-model="reNewPwd"
      type="password"
      name="确认密码"
      label="确认密码"
      placeholder="确认密码"
      :rules="[{ validator: validatorMessage }] as any"
    />
    <van-field
      v-model="code"
      name="邮箱验证码"
      label="邮箱验证码"
      placeholder="邮箱验证码"
      :rules="[{ pattern: pattern_code, message: '验证码为纯四位字母' }]"
    >
    <!-- 获取验证码的按钮 -->
    <template #button>
      <van-button size="small" type="primary"
      @click="getCode"
      :disabled="isGetCode"
      >{{ getCodeText }}</van-button>
    </template>
    </van-field>
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      重置密码
    </van-button>
  </div>
  </van-form>
</div>
</Transition>
</template>

<script lang='ts' setup>
  import { loginHttp } from '@/utils/http/login_register/register'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Move from '@/components/Move.vue'
  import { showFailToast, showSuccessToast, showToast } from 'vant'
import { useAboutUser } from '@/store/user'
  import { registerHttp, retriPwd } from '@/utils/http/login_register/register'
import { AxiosResponse } from 'axios'
  const account = ref('')
const password = ref('')
const getCodeText = ref('获取验证码')
const isGetCode = ref(false)
const email = ref('')
const newPwd = ref('')
const reNewPwd = ref('')
const code = ref('')
const secretCode = ref('')
const pattern_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 包含大小写和数字 9-16位
const pattern_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/
// 验证码符合四位字母
const pattern_code = /^[a-z]{4}$/
  const isForget = ref(false)
let timerIn: any = null
const timeout = 60000 // 定义延时器的时间
let sec  = 60 // 定义秒数
const router = useRouter()
  const userStore = useAboutUser()

  // 登录
  const onSubmit = async (values: any) => {
 try {
   const res = await loginHttp(account.value, password.value)
   
   if (res.status !== 0) return showToast({
    type: 'fail',
    message: '登录失败'
   })
   // 将身份信息存储到pinia
   userStore.userinfo = res.data
   // 本地化存储Token
   userStore.saveTokenToLocal()
   showToast({
      type: 'success',
      message: '登录成功',
      forbidClick: true,
      duration: 700
   })
   setTimeout(() => {
    router.replace('/home')
   }, 700);
 } catch (error: any) {
  showToast(error)
 }
  
}

// 验证两次输入的密码是否一致
const validatorMessage = (val: string) => {
  if (!val && newPwd && (val !== newPwd.value)) return '两次密码不相同'
}

// 获取验证码
const getCode = async () => {
  // 如果邮箱号码匹配不成功，提示用户
  if (!pattern_email.exec(email.value)) return showToast({
    message: '请输入正确格式的邮箱号码',
    type: 'fail',
    forbidClick: true
  })

  // 将按钮禁用
  isGetCode.value = true

  // 发送 Ajax 请求
  const res = await registerHttp(email.value)

  if (res.status !== 0) return showToast({
      message: '验证码发送失败，请稍后再试！',
      type: 'fail',
    })
  showToast({
      message: '验证码发送成功！',
      type: 'success',
    })
  secretCode.value = res.data

  // 设置60s 后可点击
  setTimeout(() => {
    isGetCode.value = false
    clearInterval(timerIn)
    getCodeText.value = '获取验证码'
    sec = 60
  }, timeout);

  timerIn = setInterval(() => {
    sec--
    getCodeText.value = sec + '秒后重试'
  }, 1000)

}

// 重置密码
const forgetPwd = async (values: any) => {
  const res = await retriPwd(email.value, newPwd.value, code.value, secretCode.value) as any
  if (res.status === 1 && res.msg === 'jwt expired') return showFailToast('验证码已超时')
if (res.status === 1) return showFailToast(res.msg)
  showSuccessToast(
    {
      message: res.msg,
      duration: 700
    })
  setTimeout(() => {
    isForget.value = false
    // 将数据情况
    email.value = ''
    code.value = ''
    newPwd.value = ''
    reNewPwd.value = ''
    secretCode.value = ''
    isGetCode.value = false
  }, 700);
  
}

</script>

<style lang='less'>
 body {
  background: @bgcolor;
 }
 .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>