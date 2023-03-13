<template>
  <div>
    <van-tabs v-model:active="active">
    <van-tab title="借阅审批">
      <BookList
        :book-list="agreeLists"
        @updateAffairList="updateList"
       />
    </van-tab>
    <van-tab title="图书管理">
      <van-tabs v-model:active="active2">
        <van-tab title="图书分类管理">
          <!-- 添加分类 -->
          <van-field 
            label="添加分类"
            is-link
            readonly
            @click="onToAddCate"
          />
          <!-- 添加分类对话框 -->
          <van-dialog v-model:show="show" title="添加分类" show-cancel-button
           @confirm="onAddCate"
          >
          <van-field readonly />
          <van-field 
            v-model="cateName"
            is-link
            readonly
            label="分类名称"
          />
          <van-field readonly />
        </van-dialog>
          <!-- 分类列表 -->
          <van-swipe-cell v-for="item in cateList
          " :key="item.category_id">
            <div class="cate-container flex justify-between bg-white pl-4 pr-4 mt-1 text-lg">
              <div class="id flex flex-col justify-center items-center">
                <p class="text-gray-500">ID</p>
                <span class="text-base">{{ item.category_id }}</span>
              </div>
              <div class="cate flex flex-col justify-center items-center">
                <p class="text-gray-500">分类名</p>
                <span class="text-base">{{ item.category_name }}</span>
              </div>
            </div>
            <template #right>
            <van-button square type="danger" text="删除" class="!h-full" @click="onDeleteCate(item.category_id)" />
          </template>
          </van-swipe-cell>
        </van-tab>
        <van-tab title="图书信息管理">
        <Search />  
        <bookManageVue />
        </van-tab>
      </van-tabs>
    </van-tab>
    <van-tab title="用户管理" v-if="userStore.userinfo.identity === 2"
    >
      <!-- 搜索 -->
      <van-search
      v-model="value"
      show-action
      shape="round"
      placeholder="请输入用户的邮箱号码"
    >
    <template #action>
      <van-button 
      type="primary"
      size="small"
      :disabled="!value"
      @click="onClickButton"
      >
        搜索
      </van-button>
    </template>
  </van-search>
  <!-- 添加用户 -->
  <van-field 
   is-link
   readonly
   label="添加新用户"
   @click="onAddUser"
  />
  <!-- 添加新用户的对话框 -->
  <van-dialog 
    v-model:show="isShow"
    title="添加新用户"
    show-cancel-button
    :before-close="beforeClose"
    @confirm="onConfirm"
    @cancel="cancel"
  >
  <van-form>
  <van-cell-group inset>
    <!-- 通过 pattern 进行正则校验 -->
    <van-field
      v-model="email"
      name="pattern"
      placeholder="请输入邮箱号码"
      label="邮箱"
      :rules="[{ pattern: pattern_email, message: '请输入正确邮箱号码' }]"
    />
    <van-field
      v-model="password"
      name="validator"
      type="password"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ pattern: pattern_pwd, message: '必须包含大小写字母和数字，长度9-16位' }] as any"
    />
    <van-field
      v-model="identityText"
      is-link
      readonly
      label="权限"
      name="validatorMessage"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
  <van-picker
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onPickerConfirm"
  />
</van-popup>
  </van-cell-group>
</van-form>
  </van-dialog>
  <!-- 用户列表 -->
  <van-swipe-cell class="mt-2">
    <div class="user-container flex     justify-between pl-4 pr-4 bg-white"
    v-if="Object.keys(accountInfo).length !== 0"
    >
      <div class="nickname">
        <p>昵称</p>
        <span>{{ accountInfo.nickname }}</span>
      </div>
      <div class="account">
        <p>邮箱</p>
        <span>{{ accountInfo.account }}</span>
      </div>
      <div class="identity">
        <p>权限</p>
        <span>{{ identityText2 }}</span>
      </div>
    </div>
  <template #right>
    <van-button square text="删除" type="danger" class="delete-button" @click="onDeleteUser" />
    <van-button square text="设置权限" type="primary" class="delete-button !ml-1" @click="onSetPermisson" />
    <van-button square text="重置密码" type="primary" class="delete-button !ml-1" @click="resetPwd" />
  </template>
</van-swipe-cell>
<van-dialog 
    v-model:show="isShowPermisson"
    title="设置权限"
    show-cancel-button
    @confirm="onConfirmPermisson"
    @cancel="cancel"
  >
  <van-form>
  <van-cell-group inset>
    <van-field
      readonly
    />
    <van-field
      v-model="identityText"
      is-link
      readonly
      label="权限"
      name="validatorMessage"
      @click="showPicker = true"
    />
    <van-field
      readonly
    />
    <van-popup v-model:show="showPicker" round position="bottom">
  <van-picker
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onPickerConfirm"
  />
</van-popup>
  </van-cell-group>
</van-form>
  </van-dialog>
   </van-tab>
  </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BookList from '@/components/BookList.vue';
import Search from '@/components/Search.vue';
import bookManageVue from '@/components/bookManage.vue';
import { agreeList } from '@/utils/http/affair';
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';
import { addUser, alterPermisson, deleteUser, retrievePwd, selectUser } from '@/utils/http/user/index'
import { getCateList, delCate, addCate } from '@/utils/http/book';
import { useAboutUser } from '@/store/user';
const userStore = useAboutUser()
const show = ref(false)
const cateName = ref('')
const active = ref(0)
const active2 = ref(0)
const agreeLists = ref([])
const cateList: any = ref([])
const value = ref('')
const accountInfo: any = ref({})
const isShow = ref(false)
const isShowPermisson = ref(false)
const showPicker = ref(false)
const email = ref('');
const password = ref('');
const identity = ref(0);
const columns = [
  { text: '普通用户', value: 0 },
  { text: '图书管理员', value: 1 },
  { text: '超级管理员', value: 2 }
]
const pattern_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 包含大小写和数字 9-16位
const pattern_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/

// 计算用户权限
const identityText = computed(() => {
  switch (identity.value) {
    case 0:
      return '普通用户'
    case 1:
      return '图书管理员'
    case 2:
      return '超级管理员'
    default:
      break;
  }
})
const identityText2 = computed(() => {
  switch (accountInfo.value.identity) {
    case 0:
      return '普通用户'
    case 1:
      return '图书管理员'
    case 2:
      return '超级管理员'
    default:
      break;
  }
})

// 获取所有分类信息
await getCateList().then((res) => {
  if (res.status !== 0) return showFailToast('获取图书分类失败')
  cateList.value = res.data

})
// 获取借阅请求的列表
await agreeList().then(res => {
  if (res.status !== 0) return showFailToast('获取信息失败')
  agreeLists.value = res.data
})
// 接收子组件传递过来的参数
const updateList = (list: any) => {
  agreeLists.value = list
}

// 搜索某个用户
const onClickButton = async () => {
  if (!pattern_email.exec(value.value)) return showFailToast('邮箱格式不正确')
  const res = await selectUser(value.value)
  if (res.status === 1) return showFailToast('此用户不存在')
  accountInfo.value = res.data
  value.value = ''
  
}

// 添加新用户
const onAddUser = () => {
  // 打开dialog
  isShow.value = true
}

// 确认添加新用户
const onConfirm = async () => {
  if (!(pattern_email.exec(email.value) && pattern_pwd.exec(password.value))) return showFailToast('填写的信息有误，请结合提示修改')
  // 发起添加用户的请求
  const res = await addUser(email.value, password.value, identity.value)
  if (res.status !== 0) return showFailToast('新增用户失败')
  showSuccessToast('新增用户成功')
 
  // 清空表单
  email.value = ''
  password.value = ''
  identity.value = 0
  
} 
const cancel = () => {
  email.value = ''
  password.value = ''
  identity.value = 0
}

const beforeClose = () => {
  if (email.value && password.value) {
    return (pattern_email.exec(email.value) && pattern_pwd.exec(password.value)) as any
  } else {
    return true
  }
}

// 权限选择
const onPickerConfirm: (any: any) => void = ({ selectedOptions }) => {
  showPicker.value = false;
  identity.value = selectedOptions[0].value;
};

// 确认修改权限
const onConfirmPermisson = async () => {
  const res = await alterPermisson(identity.value, accountInfo.value.id)
  if (res.status !== 0) return showFailToast('修改用户权限失败')
  showSuccessToast('修改用户权限成功')
  identity.value = 0
  setTimeout(async () => {
    const select = await selectUser(accountInfo.value.account)
    if (select.status !== 0) return accountInfo.value = {}
    accountInfo.value = select.data
  }, 700);
}

// 删除用户
const onDeleteUser = async () => {
  showConfirmDialog({
    title: '删除用户',
    message: `您确定要删除${accountInfo.value.nickname}吗？`
  }).then(async () => {
    const res = await deleteUser(accountInfo.value.id)
    if (res.status !== 0) return showFailToast('删除用户失败')
    showSuccessToast('删除用户成功')
    accountInfo.value = {}
  })
}

// 重置密码
const resetPwd = async () => {
  const res = await retrievePwd(accountInfo.value.id)
  if (res.status !== 0) return showFailToast('重置用户密码失败')
  showSuccessToast('重置用户密码成功')
  
}

// 设置权限
const onSetPermisson = () => {
  isShowPermisson.value = true
}

// 新增分类
const onToAddCate = () => {
  show.value = true
}

// 删除分类
const onDeleteCate = (id: number) => {
  showConfirmDialog({
    title: '删除分类',
    message: `您确定要删除此分类吗`,
  }).then(async () => {
    const res = await delCate(id)
    if (res.status !== 0) return showFailToast('删除分类失败')
    showSuccessToast('删除分类成功')
    setTimeout(async () => {
    const agaRes = await getCateList()
    if (agaRes.status !== 0) return 
    cateList.value = agaRes.data
    }, 700);
  })
}

// 确认新增分类
const onAddCate = async () => {
  if (cateName.value === '') return showFailToast('分类名不能为空')
  const res = await addCate(cateName.value)
  if (res.status !== 0) return showFailToast('添加分类失败')
  showSuccessToast('添加分类名成功')
  setTimeout(async () => {
    const agaRes = await getCateList()
    if (agaRes.status !== 0) return
    cateList.value = agaRes.data
  }, 700);
}

</script>

<style lang="less">
body {
  padding-bottom: 50px;
  background-color: @bgcolor;
}
.goods-card {
    margin: 0;
    background-color: #fff!important;
  }

.delete-button {
    height: 100%;
  }

.user-container {
  span {
    color: gray;
    font-size: 14px;
  }
}
</style>
