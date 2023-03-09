<template>
  <div>
    <Suspense>
      <Search></Search>
    </Suspense>
    <Suspense>
      <BookList :book-list="bookInfoStore.bookList" />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import Search from '@/components/Search.vue';import BookList from '@/components/BookList.vue';
import { useBookInfoStore } from '@/store/bookinfo';
const bookInfoStore = useBookInfoStore()

// 组件销毁时删除pinia的数据
onUnmounted(() => {
  bookInfoStore.$reset()
})
</script>

<style lang="less">
body{
  padding-bottom: 50px;
}
</style>