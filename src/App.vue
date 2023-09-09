<template>
  <router-view v-if="route.name === 'login'" class="min-h-screen bg-gray-50 dark:bg-gray-900" />

  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <router-view :key="route.fullPath"/>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  import Sidebar from '@/components/Sidebar.vue'
  const route = useRoute()
</script>