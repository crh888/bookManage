<template>
<div class="reg-container flex flex-col justify-center w-screen h-screen">
  <!-- LOGO -->
  <div class="flex mb-2 bg-white rounded-lg overflow-hidden ml-4 mr-4">
    <img src="@/assets/images/register.png" class="register-pic w-full h-full">
  </div>
  <!-- 表单组件 -->
  <van-form>
  <van-cell-group inset>
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
      v-model="account"
      name="account"
      label="邮箱"
      placeholder="建议使用网易邮箱"
      :rules="[{ pattern: pattern_email, message: '必须为邮箱格式的号码' }]"
    />
    <van-field
      v-model="password"
      name="password"
      type="password"
      label="密码"
      placeholder="密码"
      :rules="[{ pattern: pattern_pwd, message: '必须包含大小写字母和数字，长度9-16位' }]"
    />
    <van-field
      v-model="rePassword"
      name="rePassword"
      type="password"
      label="确认密码"
      placeholder="再次输入密码"
      :rules="[{ validator: validatorMessage }] as any"
    />
     <van-field
    v-model="code"
    center
    clearable
    label="邮箱验证码"
    placeholder="请输入邮箱验证码"
    :rules="[{ pattern: pattern_code, message: '验证码只有四位小写字母' }]"
  >
    <!-- 获取验证码的按钮 -->
    <template #button>
      <van-button size="small" type="primary" :disabled="isGetCode" @click="getCode">{{ getCodeText }}</van-button>
    </template>
  </van-field>
  </van-cell-group>
  <div style="margin: 4.2667vw;">
    <van-button round block type="primary" native-type="submit" :disabled="isSubmit" @click="registerHandle">
      注册
    </van-button>
  </div>
</van-form>
<!-- 跳转登录页面 -->
<Move desc="已有帐号？点击登录" msg="正在跳转至登录页面" route="/login"></Move>
</div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watchEffect } from 'vue';
import { closeToast, showLoadingToast, showToast } from 'vant';
import type { FormInstance } from 'vant'
import { httpRegister, registerHttp } from "@/utils/http/login_register/register";
import { useRouter } from 'vue-router';
import Move from '@/components/Move.vue'
const account = ref('');
const password = ref('');
const rePassword = ref('');
const code = ref('');
const codeSecret = ref('') // 接收服务器返回的加密后的验证码
let isGetCode = ref(false) // 是否可以获取验证码 默认可以
let getCodeText = ref('发送验证码') // 获取验证码按钮的文字
let timerIn: any = null
const timeout = 60000 // 定义延时器的时间
let sec  = 60 // 定义秒数
const pattern_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 包含大小写和数字 9-16位
const pattern_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/
// 验证码符合四位字母
const pattern_code = /^[a-z]{4}$/
let isSubmit = ref(true) // 注册按钮默认不可点击

// 定义使用路由的方法
const router = useRouter()

// 判断两次输入的密码是否相同
const validatorMessage = (val: string) => {
  if (val && password && val !== password.value) return '两次密码不相同'
}

// 当填写完密码和验证码，将 isSubmit 设置为 false
watchEffect(() => {
    if ((pattern_pwd.exec(password.value)) && (code.value.length === 4) && (password.value && rePassword.value) && (password.value === rePassword.value) ) {
      isSubmit.value = false
    } else {
      isSubmit.value = true
    }
})


// 获取验证码
const getCode = async () => {
  // 如果邮箱号码匹配不成功，提示用户
  if (!pattern_email.exec(account.value)) return showToast({
    message: '请输入正确格式的邮箱号码',
    type: 'fail',
    forbidClick: true
  })

  // 将按钮禁用
  isGetCode.value = true

  // 发送 Ajax 请求
  const res = await registerHttp(account.value)

  if (res.status !== 0) return showToast({
      message: '验证码发送失败，请稍后再试！',
      type: 'fail',
    })
  showToast({
      message: '验证码发送成功！',
      type: 'success',
    })
  codeSecret.value = res.data

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


// 提交注册
const registerHandle = async () => {
  try {
    const res = await httpRegister(account.value, password.value, code.value, codeSecret.value)
    if (res.status !== 0) return showToast({
      type: 'fail',
      message: res.msg
    })
    showToast({
      type: 'success',
      message: '注册成功，为您自动跳转至登录页面',
      forbidClick: true,
      duration: 1500
    })
    setTimeout(() => {
    router.replace('/login')
    }, 1500);
  } catch (err: any) {
    showToast({
      type: 'fail',
      message: err
    })
  }
}

// 跳转登录
const toLogin = () => {
  showToast({
      type: 'loading',
      message: '正在跳转至登录页面',
      duration: 1500
    })
    setTimeout(() => {
    router.push('/login')
    }, 1500);
}

</script>

<style lang="less">
.reg-container {
  background-color: #f7f8fa;
}
</style>