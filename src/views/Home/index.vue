<template>
  <div>
    <p>home</p>
    <p>{{ id }}</p>
    <van-button type="primary">主要按钮</van-button>
    <h1 class="text-3xl font-bold underline">哈哈哈</h1>
  </div>
</template>

<script lang="ts">
import { useAboutUser } from "@/store/user";
import { mapState } from "pinia";
export default {
  name: 'Home',
  computed: {
    ...mapState(useAboutUser, ['id'])
  }
}
</script>

<style>

</style>