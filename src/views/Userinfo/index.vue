<template>
  <div>
    <Navbar :title="route.meta.title"></Navbar>
    <van-form 
      @submit="onSaveInfo"
      input-align="right"
    >
      <!-- 头像预览 -->
    <van-cell-group class="mt-2">
      <van-field name="avatar" label="头像">
        <template #input>
          <van-uploader v-model="fileList" 
          :before-read="beforeRead" 
          :after-read="afterRead" 
          :max-count="1"
          :max-size="500 * 1024"
          result-type="file"
          @oversize="onOverSize"
          class="mt-2"
          />
        </template>
      </van-field>
    </van-cell-group>
    <!-- 昵称 -->
    <van-cell-group class=" mt-2">
    <van-field name="nickname" v-model="selfInfo.nickname" label="昵称" placeholder="请输入用户名" />
    </van-cell-group>
    <!-- 性别 -->
    <van-cell-group class=" mt-2">
      <van-field
        v-model="userStore.formatGender"
        is-link
        readonly
        name="gender"
        label="性别"
        placeholder="点击修改性别"
        @click="showPicker = true"
      />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        class="!rounded-xl"
      />
    </van-popup>
    </van-cell-group>
    <!-- 生日 -->
    <van-cell-group class="mt-2">
      <van-field
      v-model="selfInfo.birthday"
      is-link
      readonly
      name="birthday"
      label="生日"
      placeholder="点击选择时间"
      @click="showPicker1 = true"
    />
    <van-popup v-model:show="showPicker1" position="bottom">
      <van-date-picker @confirm="onConfirm1" @cancel="showPicker1 = false" 
      :min-date="minDate"
      :max-date="maxDate"
      />
    </van-popup>
    </van-cell-group>
    <div style="margin-top: 16px;">
    <van-button block type="primary" native-type="submit">
      保存
    </van-button>
  </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import { useAboutUser } from '@/store/user';
import { storeToRefs } from 'pinia';
import Navbar from '@/components/Navbar.vue';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import { uploadAvatar, updateAvatar } from '@/utils/http/uploadImg'
import { baseUrl } from '@/config'
import { updateInfo } from '@/utils/http/userinfo/index'
const userStore = useAboutUser()
const { selfInfo } = storeToRefs(userStore)

const route = useRoute()

const minDate = new Date(1949, 0, 1)
const maxDate = new Date(2099, 11, 1)

// 判断是否是jpeg/png格式文件
const beforeRead = (file: any) => {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        showToast('请上传 jpg 格式图片');
        return false;
      }
      return true;
};
// 检查文件是否大于500kb
const onOverSize = (file: any) => {
  showToast({
        message: '文件大小不能超过500kb'
      })
}
    // 显示头像的图片
const fileList: any = ref([
      {
        url: selfInfo.value.avatar ? selfInfo.value.avatar : '点X换头像',
        /* status: '',
        message: '', */
        isImage: true
      }
    ]);

const afterRead = async (file: any) => {
  try {
    const avatar = file.file
    file.status = 'uploading';
    file.message = '上传中...';
    // 上传图片
    const { data: res } = await uploadAvatar(avatar)
    if (res.status !== 200) {
      file.status='failed'
      file.message = '上传失败'
      return
    } else {
      file.status='done'
      file.message = '上传成功'
      const avatarUrl = baseUrl + res.data
      file.url = avatarUrl
      selfInfo.value.avatar = avatarUrl
      // 发起更新头像请求
      const { data: uRes } = await updateAvatar(avatarUrl)
      if(uRes.status !== 0) return showFailToast('头像更新失败')
      showSuccessToast('头像更新成功')
    } 
  } catch (error: any) {
    file.status='failed'
    file.message='上传失败'
  } 
}

const showPicker = ref(false);
const columns = [
 { text: '男', value: 1 },
 { text: '女', value: 0 },
]
type confirmType = (any:any) => any
const onConfirm: confirmType = ({ selectedOptions }) => {
  selfInfo.value.gender = selectedOptions[0]?.value;
  showPicker.value = false;
};

const showPicker1 = ref(false); 
const onConfirm1: confirmType = ({ selectedValues }) => {
  selfInfo.value.birthday = selectedValues.join('-');
  showPicker1.value = false;
}

// 保存个人信息
const onSaveInfo = async () => {
  try {
    const res = await updateInfo(selfInfo.value.info_id, selfInfo.value.nickname, selfInfo.value.gender, selfInfo.value.birthday)
    console.log(res);
    
    if (res.status !== 0) return showFailToast('更新资料失败，请重试')
    showSuccessToast('更新用户信息成功')
  } catch (error: any) {
    showFailToast(error)
  }

}

</script>

<style lang="less">
body {
  background-color: @bgcolor;
}

</style>