import { useUserStore } from "@/store/user"

export default defineNuxtRouteMiddleware((to) => {
    if(to.path != '/' && to.path != '/company/register' && !to.path.includes('/company/confirmation')){
        if (localStorage.getItem("_token") == null) {
            if (to.path !== '/login') {
                return navigateTo('/login')
            }
        }else{
            const user = useUserStore().getUser
            if(to.path != '/billing' && user && user.company.isexpired == true){
                return navigateTo('/billing')
            }
            else if (to.path === '/login') {
                return navigateTo('/dashboard')
            }
        }
    }
})