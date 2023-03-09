<template>
  <div>
    <NavBar :title="route.meta.title" />
    <BookList :bookList="bookList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getBorrowedList } from '@/utils/http/affair/index'
import NavBar from '@/components/Navbar.vue'
import BookList from '@/components/BookList.vue';
import { showFailToast } from 'vant';
const route = useRoute()
const bookList =ref([])
// 发起请求获取借阅图书列表信息
await getBorrowedList().then(res => {
  if (res.status !== 0) return showFailToast('发生意外错误，请重试')
  bookList.value = res.data 
})


</script>

<style lang="less">
body {
  background-color: @bgcolor;
  padding-bottom: 50px;
}
</style>