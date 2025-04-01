import { useUserStore } from "@/store/user"
import { dashboardService } from "@/components/api/Dashboard"

export default defineNuxtRouteMiddleware((to) => {
    if(to.path == '/index.js' || to.path == '/index')
        return navigateTo('/dashboard')
    else if (to.meta.auth !== false){
        if (useUserStore().getToken == null) {
            if (to.path !== '/login') {
                dashboardService.SaveLog({ logtitle: 'Hexabyt Redirect to Login', logAction: `Trying to access page ${to.path}`})
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
    //const publicRoute = ['/', 'company/register', '/company/confirmation', '/terms', '/privacy', '/cookie']
    //if(!publicRoute.includes(to.path)){
    //}
})