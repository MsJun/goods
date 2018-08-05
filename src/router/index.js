import Vue from 'vue'
import Router from 'vue-router'
import goodslist from '@/components/page/GoodsList'
import shopcar from '@/components/page/shopcar'
import Address from '@/components/page/Address'
import orderConfirm from '@/components/page/orderConfirm'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'goodslist',
      component: goodslist
    },
    {
      path:'/shopcar',
      name:"shopcar",
      component:shopcar
    },
    {
      path:'/address',
      component:Address
    },
    {
      path:'/orderConfirm/:orderId',
      component:orderConfirm
    }
  ]
})
router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('mytoken')
  if(to.name=='shopcar'){
    if(token){
      next()
    }else{
      alert('轻登录')
    }
  }else{
    next()
  }
   
})
export default router
