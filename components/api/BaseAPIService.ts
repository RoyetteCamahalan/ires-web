import APIError from './APIError'
import { useUserStore, useUserStore } from '@/store/user'

class BaseAPIService{
    async request(url: string, method: string, params: object = null): Promise<any> {
        const runtimeConfig = useRuntimeConfig()
        const userStore = useUserStore()
        const _token = userStore.getToken
        let config = null
        if (method === 'GET') {
            // GET
            config = {
                baseURL: runtimeConfig.public.apiBaseURL + '/api',
                method: method,
                headers: {
                    Authorization: 'Bearer ' + _token,
                },
                async onRequest({ request, options }) {
                    options.params = params
                }
            }
        } else {
            // POST, PUT, DELETE
            config = {
                baseURL: runtimeConfig.public.apiBaseURL + '/api',
                method: method,
                headers: {
                    Authorization: 'Bearer ' + _token,
                },
                body: params,
            }
        }
        try {
            return await $fetch(url, config)
        } catch (error) {
            console.log(error)
            if(error.response){
                switch (error.response.status) {
                    case 400:
                    case 404:
                    case 422:
                    case 429:
                        throw new APIError(error.response._data)
                    case 401:{
                        userStore.resetUser()
                        navigateTo('/login')
                    }
                    case 500:
                        throw new APIError({
                            message: "Server error. Please try again. If the problem persists, contact your system administrator"
                        })
                    default:
                        throw new APIError({
                            message: "Something went wrong. Please try again. If the problem persists, contact your system administrator"
                        })
                }
            }
            else{
                throw new APIError({
                    message: "Something went wrong. Please try again. If the problem persists, contact your system administrator"
                })
            }
        }
    }
}

export default BaseAPIService