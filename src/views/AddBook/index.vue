<template>
  <div>
    <Navbar :title="route.meta.title" />
    <BookForm />
  </div>
</template>

<script setup lang="ts">
import BookForm from '@/components/BookForm.vue';
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style lang="less">

</style>