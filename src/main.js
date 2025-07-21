import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@/assets/styles/custom.scss'


const app = createApp(App)
app.use(createBootstrap())
app.use(router)
app.mount('#app')

// TODO: 클라이언트 사이드에 저장된 theme 값을 body 클래스로 지정
function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme') || 'black';
    document.body.classList.add(`theme-${storedTheme}`);
}

// 페이지 로드 시 테마 적용
document.addEventListener('DOMContentLoaded', applyStoredTheme);