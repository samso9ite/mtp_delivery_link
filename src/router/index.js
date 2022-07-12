import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/initialize:reference',
    name: 'Initialize',
    props: true,
    component: () => import('../views/Initialize.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    props: true,
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/partners:channel',
    name: 'Partners',
    props: true,
    component: () => import('../views/Partners.vue')
  },
  {
    path: '/order-preview',
    name: 'OrderPreview',
    component: () => import('../views/OrderPreview.vue')
  },
  {
    path: '/channel',
    name: 'Channel',
    component: () => import('../views/Channel.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success.vue')
  },
  {
    path: '/set-destination',
    name: 'SetLocation',
    component: () => import('../views/SetLocation.vue')
  },
  {
    path: '/request-otp',
    name: 'RequestOTP',
    component: () => import('../views/RequestOTP.vue')
  },
  {
    path: '/verify-otp',
    name: 'VerifyOTP',
    component: () => import('../views/VerifyOTP.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/paystack/:paystack_url',
    name: 'Paystack',
    component: () => import('../views/PaymentPage.vue'),
    props:true,
    // meta: { requiresAuth: true }
  },
  {
    path: '*', 
    component: () => import('../views/Page404.vue'),
    name: '404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
