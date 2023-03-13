<template>
  <div>
    <van-form @submit="onSubmit">
    <van-cell-group class=" mt-28">
      <van-field
       name="uploader" 
       label="封面"
       readonly
       is-link
       class="flex items-center"
       >
    <template #input>
      <van-uploader
       v-model="cover"
       :max-size="2000 * 1024"
       @oversize="onOversize"
       max-count="1"
       :before-read="beforeRead as any"
       :after-read="afterRead"
       result-type="file"
       />
    </template>
  </van-field>
      <van-field
        v-model="book"
        name="book_name"
        label="书名"
        placeholder="书名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="author"
        name="author"
        label="作者"
        placeholder="作者"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="category_name"
        name="categiory"
        label="所属分类"
        placeholder="所属分类"
        is-link
        readonly
        :rules="[{ required: true, message: '请填写分类' }]"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" round position="bottom">
  <van-picker
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button
      round
      block
      type="primary"
      v-if="route.fullPath == '/addbook'"
      @click="onAdd"
      >
        添加
      </van-button>
      <van-button round block type="primary" native-type="submit" v-else>
        保存
      </van-button>
    </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch, defineProps, onUnmounted } from 'vue';
import { getCateList, selectCateById, selectBookById, updateBookInfo, addBook } from '@/utils/http/book/index'
import { uploadCover } from '@/utils/http/uploadImg'
import { baseUrl } from '@/config';
import { showToast, showFailToast, showSuccessToast } from 'vant';
import defaultImg from '@/assets/images/avatar.jpeg'
const route = useRoute()
const id = ref(0)
const cover: any = ref([]);
const book = ref('');
const author = ref('');
const category_id: any = ref('')
const category_name = ref('')
const columns: any = ref([]);
const showPicker = ref(false);
const props = defineProps(['id'])
// 保存图书信息
const onSubmit = async (values: any) => {
  const res = await updateBookInfo(id.value, values.book_name, values.uploader[0].url, values.author, category_id.value)
  if (res.status !== 0) return showFailToast('图书信息更新失败')
 showSuccessToast('图书信息更新成功')
};

// 获取分类信息
await getCateList().then(res => {
  if (res.status !== 0) return showFailToast('获取分类失败')
  columns.value = res.data.map((item: any) => {
    return {
      text: item.category_name,
      value: item.category_id
    }
  })

})

// 提交更新
const onConfirm:(any:any) => void = ({ selectedOptions }) => {
  showPicker.value = false;
  category_id.value =selectedOptions[0].value
};
// 上传图片前置操作
const beforeRead = (file: any) => {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    showToast('请上传 jpg 或 png 格式图片');
    return false;
  }
  return true;
}
// 超出图片大小提示
const onOversize = () => {
      showToast('文件大小不能超过 2MB');
};
// 图片处理后的操作
const afterRead = async (file: any) => {
  file.status = 'uploading';
  file.message = '上传中...';
  // 上传图书封面
  await uploadCover(file.file).then(res => {
    file.status = 'done'
    file.url = baseUrl + res.data
    showSuccessToast('点击蓝色按钮即可保存信息')
  }).catch(err => {
    file.status = 'failed'
    file.message = '上传失败';
  })
};

// 添加图书
const onAdd = async () => {
  if (!(cover.value[0] && book.value && author.value && category_id.value)) return showFailToast('表单不能为空')
  // 发起添加图书请求
  const res = await addBook(book.value, cover.value[0].url, author.value, category_id.value)
  if (res.status !== 0) return showFailToast('图书添加失败')
  showSuccessToast('图书添加成功')
}

watch(() => props.id, async (newId) => {
if (!newId) return
await selectBookById(newId).then(res => {
  if (res.status !== 0) return
  id.value = res.data.book_id
  cover.value.push(
    {
      url: res.data.cover ? res.data.cover : defaultImg,
      isImage: true,
      status: ''
    }
  )
  book.value = res.data.book_name
  author.value = res.data.author
  category_id.value = res.data.cate_id
})
},
  {
  immediate: true
})

watch(category_id, async (newId) => {
  if (!newId) return
  const res = await selectCateById(newId)
  if (res.status !== 0) return
  category_name.value = res.data.category_name
},
  {
  immediate: true
}
)
// 组件销毁
onUnmounted(() => {
  cover.value = []
  book.value = '',
  author.value = '',
  category_id.value = ''
})
</script>

<style lang="less">
body {
  background-color: @bgcolor;
}
</style>