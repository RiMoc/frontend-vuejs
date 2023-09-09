import { createRouter,  createWebHistory} from 'vue-router'
import VueJwtDecode from "vue-jwt-decode"

const routes = [
    { path: '/',      name:'home',                  component: () => import('../views/Home.vue'),                meta: { reqrequiresAuth: true } },
    { path: '/login', name:'login',                   component: () => import('../views/User/Login.vue'),          meta: { requiresVisitor: true } },

    { path: '/users', name: 'user-list', component: () => import('../views/Settings/Users.vue'),meta: { reqrequiresAuth: true }},

    { path: '/permissions', name: 'permissions-list', component: () => import('../views/Settings/Permission.vue'),meta: { reqrequiresAuth: true }},
    { path: '/roles', name: 'roles-list', component: () => import('../views/Settings/Role.vue'),meta: { reqrequiresAuth: true }}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token')
    const jwtPayLoad = (isLoggedIn? VueJwtDecode.decode(isLoggedIn) : [])

    if(jwtPayLoad.exp < Date.now()/1000){ localStorage.removeItem("token"); next({ path: '/login' })} 

    if(to.meta.reqrequiresAuth && isLoggedIn == null) return next({ path: '/login' })
    if(to.meta.requiresVisitor && isLoggedIn != null) return next({ path: '/' })

    next()
})

export default router