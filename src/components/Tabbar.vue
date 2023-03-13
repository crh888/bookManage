<template>
  <div>
    <!-- tabbar -->
    <!-- route 属性可以随着路由的变化而切换高亮状态 -->
    <van-tabbar v-model="active" route v-if="userStore.userinfo.identity === 0">
      <van-tabbar-item :icon="item.meta?.icon as string" :to="'/home/' + item.path" v-for="(item, index) in tabList2" :key="index"
      >{{item.meta?.title}}</van-tabbar-item>
    </van-tabbar>

    <van-tabbar v-model="active" route v-else>
      <van-tabbar v-model="active" route>
      <van-tabbar-item :icon="item.meta?.icon as string" :to="'/home/' + item.path" v-for="(item, index) in tabList" :key="index"
      >{{item.meta?.title}}</van-tabbar-item>
    </van-tabbar>
    </van-tabbar>
    
  </div>
</template>

<script setup lang="ts" await>
import { ref } from 'vue'
import { useRouter } from 
'vue-router'
import { useAboutUser } from '@/store/user';
const userStore = useAboutUser()
const active = ref(0)
const router = useRouter()
// 循环菜单项
const tabList = router.options.routes[1].children
const tabList2 = router.options.routes[1].children?.filter(x => 
  x.path !== 'manage'
)
console.log(tabList2);



</script>

<style lang="less" scoped>

</style>