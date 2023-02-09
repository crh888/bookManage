import { createApp } from 'vue'
import App from './App.vue'

// 导入路由模块
import router from '@/router'

// 导入 pinia
import { createPinia } from "pinia";

// 导入tailwindcss
import '@/assets/css/style.css'

// 导入 vant 部分组件的样式
import { showToast, showDialog, showNotify, showImagePreview } from 'vant';
// Toast
import 'vant/es/toast/style';
// Dialog
import 'vant/es/dialog/style';
// Notify
import 'vant/es/notify/style';
// ImagePreview
import 'vant/es/image-preview/style';


const app = createApp(App)

const pinia = createPinia()

// 挂载路由
app.use(router)

// 挂载pinia
app.use(pinia)

app.mount('#app')
