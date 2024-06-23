import { defineStore } from "pinia"

export const useUserStore = defineStore('userStore',
    {
        persist: {
            storage: persistedState.cookies
        },
        state: () => ({
            user: null,
            token: null,
        }),
        actions: {
            setUser(user) {
                this.user = user
                this.token = user.token
            },
            resetUser() {
                this.user = null
                this.token = null
            },
            completeTour() {
                this.user.company.apptour = 100
            },
        },
        getters: {
            getUser: (state) => state.user,
            getToken: (state) => state.token,
        },
    },
)
