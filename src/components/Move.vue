<template>
  <div class="to-register text-right mr-4 text-cyan-700" @click="moveTo(msg, route)">
    {{ desc }}
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
const router = useRouter()
defineProps(['desc', 'msg', 'route'])
const moveTo = (msg: string, route:any) => {
  showToast({
    type: 'loading',
    duration: 700,
    message: msg
  })
  setTimeout(() => {
    router.push(route)
  }, 700);
  
}
</script>

<style lang='less' scoped>

</style>