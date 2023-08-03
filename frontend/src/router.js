import { createRouter, createWebHistory } from 'vue-router'

import ProductList from './components/ProductList.vue'
import ProductDetail from './components/ProductDetail.vue'
import CartView from './components/CartView.vue'
import OrderView from './components/OrderView.vue'
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue' 

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
  },
  {
    path: '/order',
    name: 'OrderView',
    component: OrderView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
})

export default router;
