<template>
  <div>
    <van-nav-bar
    :title="title"
    :left-text="pathR === '/home/panel' ? '': '返回'"
    :left-arrow="pathR === '/home/panel' ? false : true"
    @click-left="onClickLeft"
/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(['title','pathR'])
const onClickLeft = () => {
  router.go(-1)
  
}
</script>

<style lang="less" scoped>

</style>