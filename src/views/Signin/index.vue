<template>
  <div class="signin-container d-flex justify-content-center align-items-center vh-100">
    <div class="col-4">
      <form class="border shadow-sm rounded px-3 py-4">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">邮箱：</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码：</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">确认密码：</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="d-flex flex-column px-1">
          <button type="submit" class="btn btn-primary text-light mb-2">注册</button>
          <router-link to="/login">
            <button type="submit" class="btn shadow-sm border w-100">登录</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
