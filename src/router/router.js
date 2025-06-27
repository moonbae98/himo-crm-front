import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import LoginView from '../pages/LoginView.vue'
import CrmPopupView from '../components/CrmPopup.vue'
// import axios from 'axios'

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/Home', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/crm-popup', name: 'CrmPopup', component: CrmPopupView, meta: { requiresAuth: true } }
]
const router = createRouter({
  history: createWebHistory('/himo-crm/'),
  routes
})

// 전역 네비게이션 가드
// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     try {
//       await axios.get('./session', { withCredentials: true })
//       next() 
//     } catch (e) {
//       alert("로그인정보가 만료되었거나 없습니다.")
//       next('/')
//     }
//   } else if (to.name === 'Login') {
//     try {
//       await axios.get('./session', { withCredentials: true });
//       next('/Home');
//     } catch (e) {
//       next();
//     }
//   }
//   // 그 외는 그냥 통과
//   else {
//     next();
//   }
// });
export default router
