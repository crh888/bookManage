<template>
  <div>
    <van-search
    show-action
    v-model="value"
    shape="round"
    background="#fff "
    placeholder="请输入图书名称或者关键词"
  >
  <template #action>
    <van-button
      size="small"
      type="primary"
      @click="onClickButton"
      :disabled="!value"
    >搜索</van-button>
  </template>
  </van-search>

  <van-field
  v-model="fieldValue"
  is-link
  readonly
  label="图书分类"
  placeholder="选择图书分类"
  @click="showPicker = true"
/>
  <van-popup v-model:show="showPicker" round position="bottom">
  <van-picker
  title="分类"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
/>
</van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showFailToast, showToast } from 'vant';
import { getCateList, getBookListByCate, getBookByName } from '@/utils/http/book/index'
import {
  useBookInfoStore
} from '@/store/bookinfo'
const bookInfoStore = useBookInfoStore()
const value = ref('')
const fieldValue: any = ref('')
const showPicker = ref(false)
const columns: any = ref([]);
// 获取图书分类信息
await getCateList().then(res => {
  if (res.data.length === 0) return
  columns.value = res.data.map((item: any) => {
    return {
      text: item.category_name,
      value: item.category_id
    }
  })
  

})
const onClickButton = async () => {
  fieldValue.value = ''
  const res = await getBookByName(value.value) 
  if (res.status !== 0) return showFailToast('获取图书失败')
  // 将输入存入pinia
  bookInfoStore.bookList = res.data

}

const onConfirm = async ({ selectedValues, selectedOptions }: any) => {
    fieldValue.value = selectedOptions[0].text
    showPicker.value = false
    // 按分类获取图书
  const res = await getBookListByCate(selectedValues)
  if (res.status !== 0) return showFailToast('该分类下无图书')
  bookInfoStore.bookList = res.data
  
};
const onCancel = () => {
  showPicker.value = false
}

</script>

<style lnag="less">

</style>