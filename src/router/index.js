import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommended from '../views/Recommended.vue'
import Search from '../views/Search.vue'
// import List from '../views/List.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/playlist",
    meta: { isShowNav: true },
  },
  {
    path: '/playlist',
    name: 'recommended',
    component: Recommended,
    meta: { isShowNav: true },
    children: [{
      path: "Detail",
      component: Detail,
      meta: { isShowNav: false },
    }]
  },
  {
    path: '/hotsong',
    name: 'hotsong',
    component: () => import(/* webpackChunkName: "about" */ '../views/Hotsong.vue'),
    meta: { isShowNav: true },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: { isShowNav: true },
  },
  // {
  //   path: '/list',
  //   name: 'list',
  //   component: List,
  //   meta: { isShowNav: false },
  // },
]

const router = new VueRouter({
  routes
})

export default router
