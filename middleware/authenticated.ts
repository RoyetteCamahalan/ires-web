export default defineNuxtRouteMiddleware((to) => {
    if (localStorage.getItem("_officecode") == null) {
        if (to.path !== '/login') {
            return navigateTo('/login')
        }
    }
})