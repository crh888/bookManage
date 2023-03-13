<template>
  <div>
    <Navbar :title="route.meta.title" />

    <BookForm :id="id"/>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import BookForm from '@/components/BookForm.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
defineProps(['id'])

</script>

<style lang="less">

</style>