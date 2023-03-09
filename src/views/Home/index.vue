<template>
  <div>
    <!-- navbar -->
    <Navbar :pathR="route.path" :title="route.meta.title"></Navbar>
    <Suspense>
      <router-view></router-view>
    </Suspense>
    <!-- tabbar -->
    <Tabbar></Tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Tabbar from '@/components/Tabbar.vue'
import Navbar from '@/components/Navbar.vue'
const router = useRouter()
const route = useRoute()
</script>

<style>

</style>