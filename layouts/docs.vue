<template>
    <div class="h-screen bg-white">
        <DocsHeader @toggleSidebar="toggleSidebar" :sidebarOpen="state.sidebarOpen" :title="layoutCustomProps.title"></DocsHeader>
        <div class="flex bg-white pt-16">
            <DocsSidebar  @toggleSidebar="toggleSidebar" @onSideBarEnter="onSideBarEnter" @onSideBarLeave="onSideBarLeave" :sidebarOpen="state.sidebarOpen" :openHoverState="state.openHoverState"></DocsSidebar>
            <div class="w-full bg-white relative transition-width " :class="!state.sidebarOpen && !state.openHoverState ? 'lg:ml-16' : 'lg:ml-64'">
                <main>
                    <!-- <div class="flex justify-center">
                        <div class="relative w-full max-w-xl m-4 mt-1">
                            <div class="absolute inset-y-0 flex items-center pl-2">
                            <Icon name="material-symbols:search" class="w-4 h-4"></Icon>
                            </div>
                            <input 
                                class="w-full py-2 pl-8 pr-2 text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-lg focus:placeholder-gray-500 focus:bg-white focus:border-blue-300 focus:outline-none focus:shadow-outline-purple focus:border" 
                                type="text" 
                                placeholder="Search from Docs" 
                                aria-label="Search">
                        </div>
                    </div> -->
                    <slot></slot>
                </main>
            </div>
        </div>
    </div>
</template>
<script setup>
import { usePrefStore } from '@/store/pref'

const prefStore = usePrefStore()

const layoutCustomProps = useAttrs()

const state = reactive({
    sidebarOpen: true,
    openHoverState: false
})

const toggleSidebar = (value) =>{
    if(value)
        state.sidebarOpen = value
    else
        state.sidebarOpen = !state.sidebarOpen
    prefStore.setSideBarStatus(state.sidebarOpen)
}

const onSideBarEnter = () => {
    if(!state.sidebarOpen)
    state.openHoverState = true
}
const onSideBarLeave = () => {
    if(!state.sidebarOpen)
    state.openHoverState = false
}
</script>
