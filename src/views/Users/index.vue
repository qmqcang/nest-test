<template>
  <div>
    <!-- 搜索 -->
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">用户名</span>
      <input
        v-model.trim="queryParams.username"
        type="text"
        class="form-control flex-grow-0 w-25"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
        @keyup.enter="handleSearch"
      />
      <button type="button" class="btn btn-light ms-3 rounded-2" @click="handleSearch">
        <font-awesome-icon icon="magnifying-glass" />
        搜索
      </button>

      <button type="button" class="btn btn-secondary ms-3 rounded-2" @click="handleResetSearch">
        <font-awesome-icon icon="fa-regular fa-circle-xmark" />
        重置
      </button>
    </div>

    <!-- 新增 -->
    <div>
      <button
        type="button"
        class="btn btn-primary mb-4 px-3"
        @click="handleOpenModel(EModalType.ADD)"
      >
        <font-awesome-icon icon="plus" />
        新增
      </button>
    </div>

    <!-- 表格 -->
    <table class="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">用户名</th>
          <th scope="col">性别</th>
          <th scope="col">头像</th>
          <th scope="col">地址</th>
          <th scope="col">角色</th>
          <th scope="col" class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in user_data.list" :key="user.id">
          <th scope="row">
            {{ index + 1 + (queryParams.limit as number) * (queryParams.page - 1) }}
          </th>
          <td class="text-capitalize" scope="row">{{ user.username }}</td>
          <td scope="row">{{ user?.profile?.gender ? '男' : '女' }}</td>
          <td scope="row">{{ user?.profile?.photo }}</td>
          <td scope="row">{{ user?.profile?.address }}</td>
          <td scope="row">
            {{
              user.roles.length
                ? user.roles
                    .map((role) => {
                      switch (role) {
                        case 1:
                          return '管理员'
                        case 2:
                          return '普通用户'
                        case 3:
                          return '测试用户'
                        default:
                          return '无'
                      }
                    })
                    .join(', ')
                : null
            }}
          </td>
          <td scope="row" class="text-center">
            <button
              type="button"
              class="btn btn-primary px-3"
              @click="handleOpenModel(EModalType.EDIT, user)"
            >
              <font-awesome-icon icon="pen-to-square" />
              编辑
            </button>
            <button
              type="button"
              class="btn btn-danger px-3 ms-3"
              @click="handleOpenModel(EModalType.DELETE, user)"
            >
              <font-awesome-icon icon="trash" />
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页器 -->
    <nav aria-label="Page navigation example">
      <ul class="justify-content-end pagination user-select-none">
        <li
          class="page-item"
          :class="{ disabled: queryParams.page <= 1 }"
          @click="handleChangePage(queryParams.page - 1)"
        >
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: queryParams.page === page }"
          v-for="page in user_data.totalPages"
          :key="page"
          @click="handleChangePage(page)"
        >
          <a class="page-link">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: queryParams.page >= user_data.totalPages }"
          @click="handleChangePage(queryParams.page + 1)"
        >
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 编辑模态框 -->
    <div
      ref="editRef"
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">{{ user_data.modalTitle }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- 姓名 -->
            <section class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input
                v-model="user_form.username"
                type="text"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
              />
            </section>
            <!-- 密码 -->
            <section class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input
                v-model="user_form.password"
                type="password"
                class="form-control"
                id="password"
                aria-describedby="passwordHelp"
              />
            </section>
            <!-- 角色 -->
            <section class="mb-3">
              <label for="role" class="form-label">角色</label>
              <div class="d-flex gap-4 ps-2">
                <div class="form-check">
                  <input
                    v-model="user_form.roles"
                    :value="1"
                    class="form-check-input"
                    type="checkbox"
                    id="adminCheck"
                  />
                  <label class="form-check-label" for="adminCheck">管理员</label>
                </div>
                <div class="form-check">
                  <input
                    v-model="user_form.roles"
                    :value="2"
                    class="form-check-input"
                    type="checkbox"
                    id="ordinaryCheck"
                    checked
                  />
                  <label class="form-check-label" for="ordinaryCheck">普通用户</label>
                </div>
                <div class="form-check">
                  <input
                    v-model="user_form.roles"
                    :value="3"
                    class="form-check-input"
                    type="checkbox"
                    id="textCheck"
                  />
                  <label class="form-check-label" for="textCheck">测试用户</label>
                </div>
              </div>
            </section>
            <!-- 性别 -->
            <section class="mb-3">
              <label for="role" class="form-label">性别</label>
              <div class="d-flex gap-4 ps-2">
                <div class="form-check">
                  <input
                    v-model="user_form.profile.gender"
                    :value="1"
                    class="form-check-input"
                    type="radio"
                    id="manRadio"
                    name="gender"
                  />
                  <label class="form-check-label" for="manRadio">男</label>
                </div>
                <div class="form-check">
                  <input
                    v-model="user_form.profile.gender"
                    :value="0"
                    class="form-check-input"
                    type="radio"
                    id="womanRadio"
                    name="gender"
                  />
                  <label class="form-check-label" for="womanRadio">女</label>
                </div>
              </div>
            </section>
            <!-- 头像 -->
            <section class="mb-3">
              <label for="photo" class="form-label">头像</label>
              <input
                v-model="user_form.profile.photo"
                type="url"
                class="form-control"
                id="photo"
                aria-describedby="photoHelp"
                placeholder="请输入路径"
              />
            </section>
            <!-- 地址 -->
            <section class="">
              <label for="address" class="form-label">地址</label>
              <input
                v-model="user_form.profile.address"
                type="email"
                class="form-control"
                id="address"
                aria-describedby="addressHelp"
                placeholder="请输入地址"
              />
            </section>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleCloseModel(editAndAddModal)"
            >
              关闭
            </button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">保存</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除模态框 -->
    <div
      ref="deleteRef"
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">{{ user_data.modalTitle }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">确认要删除吗？</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="handleCloseModel(deleteModal)">
              关闭
            </button>
            <button type="button" class="btn btn-primary" @click="handleDeleteSubmit">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap'
import { UserApis } from '@/apis'
import type { IUser, IQueryParams } from '@/apis/user/types'

enum EModalType {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete'
}

const router = useRouter()

const editRef = ref<Element | string>('')
const deleteRef = ref<Element | string>('')

const editAndAddModal = ref<Modal>()
const deleteModal = ref<Modal>()

const user_data = reactive<{
  total: number
  totalPages: number
  list: IUser[]
  type: string
  user: IUser
  modalTitle: string
}>({
  total: 0,
  totalPages: 0,
  list: [],
  type: '',
  user: {} as IUser,
  modalTitle: '添加用户'
})

const queryParams = reactive<IQueryParams>({
  page: computed(() => +(router.currentRoute.value.query?.page as string) || 1),
  limit: 5,
  username: ''
})

const default_form = {
  username: '',
  password: '123456',
  profile: {
    gender: 1,
    address: '',
    photo: ''
  },
  roles: []
}

const user_form = reactive<IUser>(mergeForm({}, default_form))

const initUserData = async () => {
  const [users, total] = await UserApis.getUserAll(queryParams)
  users.forEach((user) => {
    user.roles = user.roles.map((role) => (typeof role === 'number' ? role : role.id)) as number[]
  })

  user_data.list = users
  user_data.total = total
  user_data.totalPages = Math.ceil(user_data.total / (queryParams.limit as number))
}

const resetUserForm = () => {
  mergeForm(user_form, default_form)
}

const handleSubmit = async () => {
  if (user_data.type === EModalType.ADD) {
    await UserApis.addUser(user_form)
  } else if (user_data.type === EModalType.EDIT) {
    const id = user_data.user.id
    const user = user_form
    delete user.id

    await UserApis.updateUser(id, user)
  }

  await initUserData()

  handleCloseModel(editAndAddModal.value)
}

const handleDeleteSubmit = async () => {
  const id = user_data.user.id
  const res = await UserApis.deleteUser(id)

  if (res.username === user_data.user.username) {
    await initUserData()
    handleCloseModel(deleteModal.value)
  }
}

const handleOpenModel = (type: EModalType, user?: IUser) => {
  user_data.type = type
  user && (user_data.user = user)

  if (type === EModalType.ADD) {
    user_data.modalTitle = '添加用户'
    editAndAddModal.value?.show()
    resetUserForm()
  } else if (type === EModalType.EDIT && user) {
    user_data.modalTitle = '编辑用户'
    editAndAddModal.value?.show()

    mergeForm(user_form, user)
  } else if (type === EModalType.DELETE && user) {
    user_data.modalTitle = '删除用户'
    deleteModal.value?.show()
  }
}

const handleCloseModel = (modal: Modal | undefined) => {
  if (modal) {
    modal.hide()
  }
}

const handleChangePage = (page: number) => {
  if (page >= 1 && page <= user_data.totalPages) {
    router.push({
      query: {
        page
      }
    })
  }
}

const handleSearch = async () => {
  if (queryParams.username) {
    await initUserData()
  }
}

const handleResetSearch = async () => {
  if (queryParams.username) {
    queryParams.username = ''

    await initUserData()
  }
}

watch(
  () => queryParams.page,
  async () => {
    await initUserData()
  },
  {
    immediate: true
  }
)

onMounted(() => {
  editAndAddModal.value = new Modal(editRef.value, { backdrop: true })
  deleteModal.value = new Modal(deleteRef.value, { backdrop: true })
})

function mergeForm(target: object, ...form: object[]) {
  return Object.assign(target, ...form)
}
</script>

<style scoped lang="scss"></style>
