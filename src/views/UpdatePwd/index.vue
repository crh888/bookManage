<template>
  <div>
    <NavBar :title="route.meta.title"></NavBar>
      <div class=" pt-40">
        <van-form @submit="onSubmit" class="">
        <van-cell-group inset>
          <van-field
            v-model="oldPwd"
            type="password"
            name="原密码"
            label="原密码"
            placeholder="原密码"
            :rules="[{ pattern: pattern_pwd, message: '必须包含大小写字母和数字，长度9-16位' }]"
          />
          <van-field
            v-model="newPwd"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="新密码"
            :rules="[{ validator: validatePwd } as any]"
          />
          <van-field
            v-model="ReNewPwd"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ validator: validatorMessage }] as any"
          />
      </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
import NavBar from '@/components/Navbar.vue';
import { updatePwd } from '@/utils/http/userinfo/index'
import { showFailToast, showSuccessToast } from 'vant';
import { AxiosRes } from '@/utils/http/types'
const route = useRoute()
const router = useRouter()
const oldPwd = ref('');
const newPwd = ref('');
const ReNewPwd = ref('');
// 包含大小写和数字 9-16位
const pattern_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,16}$/
// 判断新旧密码是否相同
const validatePwd = (val: string) => {
  if(!pattern_pwd.exec(val)) return '必须包含大小写字母和数字，长度9-16位'
  if (pattern_pwd.exec(val) && val === oldPwd.value) return '新密码不能和旧密码相同'
}
// 判断两次输入的密码是否相同
const validatorMessage = (val: string) => {
  if (val !== newPwd.value) return '两次密码不相同'
}
// 提交修改密码请求
const onSubmit = async () => {
  const res: AxiosRes = await updatePwd(oldPwd.value, newPwd.value)
  if (res.status === 1) return showFailToast({
    message: res.msg!,
    forbidClick: true
  })
  localStorage.removeItem('token')
  showSuccessToast({
    message: res.msg,
    forbidClick: true,
    duration: 700
  })
  setTimeout(() => {
    router.replace('/login')
  }, 700);
}

</script>

<style lang="less">
body {
  background-color: @bgcolor;
}
</style>