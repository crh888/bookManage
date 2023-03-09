<template>
  <div class="err-container w-screen h-screen flex flex-col justify-center items-center text-xl bg-white">
    <div class="text text-3xl bg-white rounded-md">404 Not Found</div>
    <button @click="() => router.replace('/')" class="err-button w-2/3 h-16 block bg-white rounded-md mt-4">回到首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()

</script>

<style lang="less" scoped>
.err-container {
background-color: @bgcolor;
}
</style>