<template>
  <div>
    <van-nav-bar
    :title="title"
    :left-text="pattern.exec(pathR) ? '': '返回'"
    :left-arrow="pattern.exec(pathR) ? false : true"
    @click-left="onClickLeft"
/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const pattern = /^\/home\//
const router = useRouter()
defineProps(['title','pathR'])
const onClickLeft = () => {
  router.go(-1)
  
}
</script>

<style lang="less" scoped>

</style>