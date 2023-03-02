<template>
    <nav class="bg-white border-gray-200 py-2 dark:bg-gray-900 shadow-md">
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" class="flex items-center">
                <img src="/img/hg_logo.png" class="object-cover w-8 h-8 rounded-full"/>
                <span class="self-center text-sm whitespace-nowrap dark:text-white">{{ state.officedescription }}</span>
            </a>
            <div class="relative">
                <button class="p-1 -ml-1 mr-5 rounded-md focus:outline-none focus:shadow-outline-purple" @click="toggleProfileMenu" aria-label="Account" aria-haspopup="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>
                <template v-if="state.isProfileMenuOpen">
                <ul leave="transition ease-in duration-150" leaveStart="opacity-100" leaveEnd="opacity-0" v-click-outside="closeProfileMenu" @keydown.escape="closeProfileMenu" class="absolute right-0 w-40 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700" aria-label="submenu">
                    <li class="flex">
                    <button class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        @click="logOut">
                        <svg class="w-4 h-4 mr-3" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                        <span>Log out</span>
                    </button>
                    </li>
                </ul>
                </template>
            </div>
        </div>  
</nav>
</template>

<script>
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'

export default {
    setup() {
        const state = reactive({
            isProfileMenuOpen: false,
            officedescription: 'Hidden Gardens'
        })
        const user = useUserStore().getUser
        if(user)
            state.officedescription = user.description

        function toggleProfileMenu(){
            state.isProfileMenuOpen = !state.isProfileMenuOpen
        }

        function closeProfileMenu(){
            state.isProfileMenuOpen = false
        }
        function logOut(){
              localStorage.removeItem("_officecode")
              useUserStore().resetUser()
              navigateTo("/login")
        }

        return { state, closeProfileMenu, toggleProfileMenu, logOut }
    },
}
</script>