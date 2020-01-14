import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'
// import { rootRouterMap } from '@/router/rootRouter'
// import rootDefaultRouter from '@/router/rootDefaultRouter'
Vue.use(Router)

// const allRouterMap = [...rootRouterMap, ...rootDefaultRouter]

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: constantRouterMap.concat(asyncRouterMap) // 让菜单生成不经过动态路由
  // routes: rootRouterMap
  // routes: allRouterMap
})

export default router
