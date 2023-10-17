<template>
  <nav aria-label="breadcrumb" class="border-bottom ps-3 bg-white">
    <ol class="breadcrumb my-2">
      <li class="breadcrumb-item" v-if="String($route.name) !== 'Dashboard'">
        <router-link :to="{ name: 'Home' }">仪表盘</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ $route?.meta?.title }}
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { useMenuStore } from '@/stores'
</script>

<style scoped></style>
