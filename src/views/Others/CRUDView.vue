<template>
  <div class="wraps">
    <div>
      <el-input v-model="search.keyWord" clearable style="width: 300px"></el-input>
      <el-button @click="init" style="margin-left: 10px">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left: 10px">添加</el-button>
    </div>
    <el-table border stripe :data="tableData" style="width: 100%; margin-top: 30px">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column>
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteRow(scope.row)">删除</el-button>
          <el-button @click="(isShowTag = true,row = scope.row)">添加tag</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changeSize"
      style="float: right; margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="total"
    />
  </div>

  <el-dialog v-model="dialogVisible" title="弹框" width="50%">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item prop="desc" label="描述">
        <el-input v-model="form.desc" placeholder="描述"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">关闭</el-button>
        <el-button type="primary" @click="save(ruleFormRef)"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="isShowTag" title="添加tag">
    <el-select style="width: 100%" v-model="tags" multiple>
      <el-option value="tag1">tag1</el-option>
      <el-option value="tag2">tag2</el-option>
      <el-option value="tag3">tag3</el-option>
    </el-select>
    <template #footer>
      <el-button @click="addTa" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getList, addUser, delUser, updateUser, addTags } from '@/apis/crud'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const tags = ref<string[]>([])

const row = ref<{
  id?: number
  name?: string
  desc?: string
  createTime?: Date
}>({})

const isShowTag = ref<boolean>(false)

const total = ref<number>(0)
//搜索框
const search = reactive({
  keyWord: '',
  pageNum: 1,
  pageSize: 10
})

//表单
const form = reactive({
  id: 0,
  name: '',
  desc: ''
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入 名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入 描述', trigger: 'blur' }]
})

//清空数据
const resetForm = reactive({ ...form })
//表格数据
const tableData = ref([])
//弹框开关
const dialogVisible = ref<boolean>(false)

//初始化表格数据
const init = async () => {
  const { data, count } = await getList(search).then((res) => res.data)

  total.value = count ?? 0
  tableData.value = data ?? []
}

const edit = (row) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

const deleteRow = (row) => {
  const { id } = row

  ElMessageBox.confirm('您确定要删除吗！！！', {
    confirmButtonText: '是的',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await delUser(id)
      init()

      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (form.id) {
        await updateUser(form)
        ElMessage.success('编辑成功')
      } else {
        await addUser(form)
        ElMessage.success('添加成功')
      }
      closeDialog()
      init()
    } else {
      ElMessage.error(`error submit!`)
    }
  })
}

const openDialog = () => {
  dialogVisible.value = true
  Object.assign(form, resetForm)
}
//关闭弹框
const closeDialog = () => {
  dialogVisible.value = false
}

const changeSize = (page) => {
  search.pageNum = page
  init()
}

const addTa = async () => {
  const res = await addTags({
    tags: tags.value,
    userId: row.value.id
  })
  isShowTag.value = false
  tags.value = []
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background: #f1f1f1;
}

.wraps {
  height: 100vh;
  padding: 30px;
}
</style>
