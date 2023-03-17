//import { useUserStore } from "@/store/user"
export default defineNuxtRouteMiddleware((to) => {
    if (localStorage.getItem("_token") == null) {
        if (to.path !== '/login') {
            return navigateTo('/login')
        }
    }else{
        if (to.path === '/login') {
            return navigateTo('/')
        }
    }
})