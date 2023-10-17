<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div style="display: flex">
        <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
        <img :src="codeUrl" @click="resetCode" />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const codeUrl = ref<string>('/api/auth/captcha')

const resetCode = () => (codeUrl.value = codeUrl.value + '?' + Math.random())

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruleForm)
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const ruleForm = reactive({
  username: '',
  password: '',
  code: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  code: [{ required: true, message: 'Please input code', trigger: 'blur' }]
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss"></style>
