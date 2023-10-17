<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4">
      <form class="border shadow-sm rounded px-3 py-4">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">用户名：</label>
          <input
            v-model="userInfo.username"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': userInfo.usernameMsg }"
            placeholder="请输入用户名"
            aria-label="请输入用户名"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div class="invalid-feedback">{{ userInfo.usernameMsg }}</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码：</label>
          <input
            v-model="userInfo.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': userInfo.passwordMsg }"
            placeholder="请输入密码"
            aria-label="请输入密码"
            id="exampleInputPassword1"
          />
          <div class="invalid-feedback">{{ userInfo.passwordMsg }}</div>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">记住密码</label>
        </div>
        <div class="d-flex flex-column px-1">
          <button class="btn btn-primary text-light mb-2" @click="handleSubmit">登录</button>
          <router-link to="/signin">
            <button class="btn shadow-sm border w-100">注册</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LoginView'
})
import request from '@/utils/request'

const userInfo = reactive({
  username: '',
  usernameMsg: computed(() => {
    if (
      userInfo.username &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userInfo.username
      )
    ) {
      return '请输入正确的邮箱地址'
    }
    return ''
  }),
  password: '',
  passwordMsg: computed(() => {
    if (userInfo.password && userInfo.password.length < 6) {
      return '请输入6位及以上密码'
    }
    return '' 
  })
})

const handleSubmit = () => {
  // request.post('/auth/login', userInfo).then((res) => {
  //   console.log(res)
  // })
}
</script>

<style scoped lang="scss"></style>
