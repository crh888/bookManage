<template>
    <div class="my-container">
    <!-- 头像部分容器 -->
    <div class="avatar-container flex items-center justify-between bg-white rounded-md pl-4 pr-4 mt-2 p-2" @click="toMyInfo">
      <!-- 头像 -->
      <div class="avatar w-20 h-20 rounded-lg overflow-hidden">
        <img :src="selfInfo.avatar ? selfInfo.avatar : 'src/assets/images/avatar.jpeg'" alt="avatar" class="w-full h-full">
      </div>
      <!-- 昵称 -->
      <div class="nickname text-xl">
        {{ selfInfo.nickname }}
      </div>
      <!-- 详情 -->
      <div class="detail iconfont icon-arrow-right"></div>
    </div>
    <!-- 我的借阅 -->
    <div class="borrow-container flex justify-between items-center pl-4 pr-4 mt-2 p-2 bg-white" @click="onToBorrow">
      <div class="borrow-text flex items-center">我的借阅</div>
      <div class="iconfont icon-arrow-right"></div>
    </div>
    <!-- 借阅历史 -->
    <div class="borrow-container flex justify-between items-center pl-4 pr-4 mt-2 p-2 bg-white" @click="onToHistory">
      <div class="history-text flex items-center">借阅历史</div>
      <div class="iconfont icon-arrow-right"></div>
    </div>
    <!-- 修改密码 -->
    <div class="borrow-container flex justify-between items-center pl-4 pr-4 mt-2 p-2 bg-white" @click="updatePwd">
    <div class="pwd-text flex items-center">修改密码</div>
    <div class="iconfont icon-arrow-right"></div>
    </div>
    <!-- 退出登录 -->
    <div class="borrow-container flex justify-between items-center pl-4 pr-4 mt-2 p-2 bg-white" @click="logout">
    <div class="logout-text flex items-center">退出登录</div>
    <div class="iconfont icon-arrow-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAboutUser } from '@/store/user'
import { getUserInfo } from '@/utils/http/userinfo/index'
import { showConfirmDialog, showFailToast } from 'vant';
const userStore = useAboutUser()
const router = useRouter()
const { selfInfo } = storeToRefs(userStore)
// 获取个人信息
await getUserInfo().then(res => {
  if(res.status !== 0) return showFailToast('获取信息失败，请重试')
  userStore.selfInfo = res.data
}).catch(err => {
  showFailToast(err)
})
// 前往修改个人信息
const toMyInfo = () => {
  router.push({
    name: 'userinfo',
  })
}

// 前往我的借阅页面
const onToBorrow = () => {
  router.push('/borrowstatus')
}

// 前往借阅历史页面
const onToHistory = () => {
  router.push('/history')
}

// 退出登录
const logout = () => {
// dialog对话沟通
showConfirmDialog({
  title: '系统提示',
  message:
    '您确定要退出登录吗？',
})
  .then(() => {
    // on confirm
    // 清除token
    localStorage.removeItem('token')
    // 清除store
    userStore.$reset()
    // 跳转至登录页
    router.replace('/login')
  })
  
  
}

// 修改密码
const updatePwd = () => {  
  router.push('/updatepwd')
}
</script>

<style lang="less">
body {
  background-color: @bgcolor;
}
.borrow-text {
  &::before {
    content: '\e6cb';
    font-family: 'iconfont' !important;
    font-size: 20px;
    margin-right: 5px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.history-text {
  &::before {
    content: '\e674';
    font-family: 'iconfont' !important;
    font-size: 20px;
    margin-right: 5px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.pwd-text {
  &::before {
    content: '\e65d';
    font-family: 'iconfont' !important;
    font-size: 20px;
    margin-right: 5px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.logout-text {
  &::before {
    content: '\e61d';
    font-family: 'iconfont' !important;
    font-size: 20px;
    margin-right: 5px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>