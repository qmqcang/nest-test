<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-2 px-0 d-flex flex-column border-bottom">
        <header
          class="text-center py-3 text-bg-dark text-white fw-bolder border-bottom border-light"
        >
          NestJS 后台管理面板
        </header>
        <MenuNav :menus="menus" />
      </div>
      <div class="col-10">
        <div class="row h-100">
          <div class="bg-light px-0 d-flex flex-column">
            <HeadNav />
            <Breadcrumb />
            <router-view class="flex-fill p-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuNav from '@/components/MenuNav.vue'
import HeadNav from '@/components/HeadNav.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

import { useMenuStore } from '@/stores'

const menuStore = useMenuStore()

const menus = menuStore.getUserMenu()
</script>

<style scoped lang="scss"></style>
