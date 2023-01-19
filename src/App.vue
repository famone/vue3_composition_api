<template>
  <div class="w-full">
    <SiteNavigation />
    <router-view></router-view>
  </div>
</template>

<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>

