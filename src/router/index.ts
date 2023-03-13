import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的

//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    redirect: '/home/borrow',
    children: [
      {
        path: 'borrow',
        name: 'Borrow',
        component: () => import('@/views/Borrow/index.vue'),
        meta: {
          title: '借阅',
          icon: 'search'
        }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/Admin/index.vue'),
        meta: {
          title: '管理',
          icon: 'ellipsis'
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/My/index.vue'),
        meta: {
          title: '我的',
          icon: 'user-circle-o'
        }
      },
    ]
  },
  {
    path: '/login', name: 'Login', component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/register', name: 'Register', component: () => import('@/views/Register/index.vue')
  },
  {
    path: '/updatepwd',
    name: 'UpdatePwd',
    component: () => import('@/views/UpdatePwd/index.vue'),
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('@/views/Userinfo/index.vue'),
    meta: {
      title: '个人资料'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/BorrowHistory/index.vue'),
    meta: {
      title: '借阅历史'
    }
  },
  {
    path: '/borrowstatus',
    name: 'borrowstatus',
    component: () => import('@/views/BorrowStatus/index.vue'),
    meta: {
      title: '我的借阅'
    }
  },
   {
    path: '/editbook/:id',
    name: 'editbook',
    component: () => import('@/views/EditBook/index.vue'),
    meta: {
      title: '修改图书信息'
    },
    props: true
  },
  {
    path: '/addbook',
    name: 'addbook',
    component: () => import('@/views/AddBook/index.vue'),
    meta: {
      title: '添加图书'
    }
  },
  {
    path: '/:pathMatch(.*)', component: () => import('@/views/ErrorPage/index.vue')
  }
 
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes
}

// Router是路由对象类型
const router: Router = createRouter(options)

// 全局导航前置守卫
router.beforeEach((to, from, next)=> {
  if (to.path !== '/register' && to.path !== '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router