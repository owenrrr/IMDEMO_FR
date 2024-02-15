import Router from 'vue-router'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import MainPage from '../views/MainPage'

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'mainPage',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/main',
            name: 'main',
            component: MainPage
        }
    ]
})

export default router