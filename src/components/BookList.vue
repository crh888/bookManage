<template>
  <!-- 空白提示 -->
  <van-empty description="空空如也~" v-if="!bookList || !bookList.length" />
  <!-- 图书列表 -->
  <div class="flex flex-wrap pl-2 pr-2">
    <div class="book-container flex flex-col justify-center items-center bg-white rounded-md mt-2 ml-2 mr-2 pl-2 pr-2 pb-1"
    v-for="item in bookList"
    :key="item.affair_id || item.book_id"
    >
      <div class="cover w-40 h-40 pl-1 pr-1 pt-1">
        <img :src="item.cover ? item.cover : avatarImg" alt="" class="w-full h-full rounded-md">
      </div>
      <p class="title text-sm mt-6 w-36 truncate text-center">{{ item.book_name }}</p>
      <p class="author w-20 text-center truncate text-xs mt-1 text-slate-500">{{ item.author || item.nickname }}</p>
      <p class="due text-xs mt-1 text-red-400"
        v-if="item.due"
      >还书日期：<span>{{ item.due }}</span></p>
      <van-button v-if="item.due" size="small" type="primary" @click="onReceiveBook(item.affair_id)">还书</van-button>
      <van-button v-if="route.fullPath === '/home/borrow'" size="small" type="primary" @click="onBorrowBook(item.book_id)">申请借阅</van-button>
      <van-button v-if="route.fullPath === '/home/manage'" size="small" type="primary" @click="onAgreeBook(item.affair_id)">批准</van-button>
    </div>
    <!-- 返回顶部 -->
    <van-back-top right="7vw" bottom="10vh"  />
  </div>
  
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { returnBook, getCheckedList, borrowBook, agreeAffair, agreeList } from '@/utils/http/affair/index'
import { showFailToast, showSuccessToast } from 'vant';
// 引入静态资源
import avatarImg from '@/assets/images/avatar.jpeg'
const route = useRoute()
defineProps(['bookList'])
const emits = defineEmits(['updateCheckedList', 'updateAffairList'])
let list = []

// 还书
const onReceiveBook = async (id: any) => {
  const res = await returnBook(id)
  if (res.status !== 0) return showFailToast('还书失败')
  showSuccessToast('还书成功')
  // 重新发起请求
  const listRes = await getCheckedList()
  if (listRes.status !== 0) return
  list = listRes.data
  // 向父组件传递最新的已审批列表信息
  emits('updateCheckedList', list)
}

// 借书
const onBorrowBook = async (id: any) => {
  const res = await borrowBook(id)
  if (res.status !== 0) return showFailToast('借阅请求发起失败')
  showSuccessToast('借阅请求发起成功')
}
// 批准借阅
const onAgreeBook = async (id: number) => {
  const res = await agreeAffair(id)
  if (res.status !== 0) return showFailToast('借阅请求批准失败')
  showSuccessToast('借阅请求已批准')
  // 重新获取待审批的列表
  const listRes = await agreeList()
  const list = listRes.data
  // 向父组件传递借阅请求更新后的数据
  emits('updateAffairList', list)
}
</script>

<style lang="less">
.book-container {
  width: 45%;
}
</style>