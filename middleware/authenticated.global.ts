import { useUserStore } from "@/store/user"

export default defineNuxtRouteMiddleware((to) => {
    
    console.log(to.path)
    console.log(to.meta.auth)
    if (to.meta.auth !== false){
        if (useUserStore().getToken == null) {
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
    //const publicRoute = ['/', 'company/register', '/company/confirmation', '/terms', '/privacy', '/cookie']
    //if(!publicRoute.includes(to.path)){
    //}
})