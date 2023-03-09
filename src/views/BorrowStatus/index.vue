<template>
  <div>
    <Navbar :title="route.meta.title" />

    <van-tabs v-model:active="active">
    <van-tab title="待审批">
      <BookList :book-list="uncheckList"/>
    </van-tab>
    <van-tab title="已审批">
      <BookList :book-list="checkedList" @update-checked-list="onUpdateCheckedList" />
    </van-tab>
  </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import BookList from '@/components/BookList.vue';
import { useRoute } from 'vue-router';
import { getUncheckList, getCheckedList } from '@/utils/http/affair/index'
import { showFailToast } from 'vant';
const route = useRoute()
const active = ref(0)
const uncheckList = ref([])
const checkedList = ref([])

// 发起待审批的列表
await getUncheckList().then(res => {
  if (res.status !== 0) return showFailToast('获取信息失败，请重试！')
  uncheckList.value = res.data
})

// 发起已审批的列表
await getCheckedList().then(res => {
  if (res.status !== 0) return showFailToast('获取信息失败，请重试！')
  checkedList.value = res.data
})

// 接收子组件传递过来的信息
const onUpdateCheckedList = (e: any) => {
  checkedList.value = e
}
</script>

<style lang="less">
body{
  padding-bottom: 50px;
}
</style>