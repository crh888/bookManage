<template>
  <div>
    <!-- 添加图书 -->
    <van-field 
     readonly
     is-link
     label="添加图书" 
     @click="onAddBook"
    />
    <!-- 图书列表 -->
    <van-swipe-cell class="mt-2" v-for="item in bookInfoStore.bookList" :key="item.book_id">
      <div class="book pl-4 pr-4 pt-1 pb-1 bg-white flex justify-between">
        <div class="book-cover flex flex-col items-center">
          <p>封面</p>
          <img :src="item.cover ? item.cover : defaultImg" alt="" class="w-20 h-20">
        </div>
        <div class="book-name flex flex-col flex-1 items-center text-center">
          <p>书名</p>
          <p class="mt-8">{{ item.book_name }}</p>
        </div>
        <div class="author flex flex-col items-center w-20 text-center">
          <p>作者</p>
          <p class="mt-8">{{ item.author }}</p>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" class="!h-full" @click="onDelBook(item.book_id)" />
    <van-button square type="primary" text="修改" class="!h-full" @click="onUpdate(item.book_id)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script setup lang="ts">
import defaultImg from '@/assets/images/avatar.jpeg'
import { useBookInfoStore } from '@/store/bookinfo';
import { delBook } from '@/utils/http/book';
import { showFailToast, showSuccessToast } from 'vant';
import { useRouter } from 'vue-router';
import { onUnmounted } from 'vue'
const router = useRouter()
const bookInfoStore = useBookInfoStore()
// 删除图书
const onDelBook = async (id: number) => {
  const res = await delBook(id)
  if (res.status !== 0) return showFailToast('删除图书失败')
  showSuccessToast('删除图书成功')
  bookInfoStore.bookList = bookInfoStore.bookList.filter((x: any) => x.book_id !== id)
}

// 修改图书
const onUpdate = async (id: number) => {
  router.push({
    name: 'editbook',
    params: {
    id
  }
  })
}

// 添加图书
const onAddBook = () => {
router.push('/addbook')
}

// 组件销毁周期
onUnmounted(() => {
  // 重置 pinia 数据
  bookInfoStore.$reset()
})
</script>

<style lang="less">

</style>