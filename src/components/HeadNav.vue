<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom bg-white">
    <div class="container-fluid">
      <font-awesome-icon icon="bars" />
      <ul class="navbar-nav d-flex justify-content-between align-items-center">
        <li class="nav-item me-3">
          <font-awesome-icon icon="comments" />
        </li>
        <li class="nav-item me-3">
          <font-awesome-icon icon="cog" />
        </li>
        <li class="nav-item me-3">
          <font-awesome-icon icon="envelope-open" />
        </li>
        <li class="nav-item ms-4">
          <div class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-offset="10,20"
              style="height: 60px"
            >
              <img alt="avatar" class="avatar-circle" :src="avatar" width="38" height="38" />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-lg-end my-0 py-0"
              style="background: #ffffff"
              aria-labelledby="dropdownMenuButton1"
            >
              <li class="dropdwn-item px-3 py-2 text-sencondary bg-light">账号</li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="comments" size="lg" />
                <span>更新消息</span>
              </li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="envelope-open" size="lg" />
                <span>评论信息</span>
              </li>
              <!-- 设置 -->
              <li class="dropdwn-item px-3 py-2 text-sencondary bg-light">设置</li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="user" size="lg" />
                <span>个人信息</span>
              </li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="credit-card" size="lg" />
                <span>支付信息</span>
              </li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="cogs" size="lg" />
                <span>系统设置</span>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="dropdwn-item px-4 py-2">
                <font-awesome-icon class="me-2" icon="sign-out-alt" size="lg" />
                <span>退出</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import avatar from '@/assets/avatar.jpg'
</script>

<style scoped lang="scss"></style>
