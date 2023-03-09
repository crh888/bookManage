<template>
  <div>
    <!-- tabbar -->
    <!-- route 属性可以随着路由的变化而切换高亮状态 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item :icon="item.meta?.icon as string" :to="'/home/' + item.path" v-for="(item, index) in tabList" :key="index">{{item.meta?.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts" await>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const active = ref(0)
const router = useRouter()
const route = useRoute()
// 循环菜单项
const tabList = router.options.routes[1].children


</script>

<style lang="less" scoped>

</style>