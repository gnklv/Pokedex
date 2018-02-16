import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Compare from '@/components/Compare'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare
    }
  ]
})
