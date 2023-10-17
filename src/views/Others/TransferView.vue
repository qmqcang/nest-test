<template>
  <div class="transfer">
    <el-button type="primary" size="default" @click="download">下载</el-button>

    <el-upload
      class="avatar-uploader"
      action="/api/upload/album"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-image v-if="avatarUrl" :src="avatarUrl" class="avatar" fit="cover">
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="avatarUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus, Picture } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile } from 'element-plus'

const useFetch = async (url: string) => {
  const res = await fetch(url)

  const DispositionHeader = res.headers.get('Content-Disposition')
  const filenameMatch = DispositionHeader?.match(/filename="(.+)"/)

  const arrayBuffer = await res.arrayBuffer()
  const blob = new Blob([arrayBuffer])

  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = href
  a.download = `${filenameMatch ? filenameMatch[1] : 'defaultName'}.zip`
  a.click()
  URL.revokeObjectURL(href)
}

const download = () => {
  useFetch('http://localhost:3000/upload/stream')
}

const avatarUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)

const handleAvatarSuccess: UploadProps['onSuccess'] = (res, uploadFiles) => {
  avatarUrl.value = res.data.fullUrl
  //   avatarUrl.value = URL.createObjectURL(uploadFiles.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  const supportTypeArr = ['image/jpeg', 'image/png']
  const isLt2M = file.size / Math.pow(1024, 2) < 2

  if (!supportTypeArr.includes(file.type)) {
    ElMessage({
      showClose: true,
      message: '上传头像图片只能是 JPG 或 PNG 格式!',
      type: 'warning'
    })
    return false
  }
  if (!isLt2M) {
    ElMessage({
      showClose: true,
      message: '上传头像图片大小不能超过 2MB!',
      type: 'warning'
    })
    return false
  }
  return true
}

const handlePreview = () => {
  dialogVisible.value = true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
