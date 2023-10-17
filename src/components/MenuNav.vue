<template>
  <div class="flex-fill bg-dark">
    <ul class="nav flex-column">
      <li
        class="nav-item"
        v-for="route in props.menus"
        :key="route.name"
      >
        <router-link
          :to="{ name: route.name }"
          class="nav-link w-100 text-white-50 cursor"
          aria-current="page"
        >
          <font-awesome-icon class="pe-3 text-light" :icon="String(route?.meta?.icon)" size="lg" />
          {{ route?.meta?.title }}</router-link
        >   
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    menus?: RouteRecordRaw[]
  }>(),
  {
    menus: () => []
  }
)
</script>

<style scoped lang="scss">
.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
