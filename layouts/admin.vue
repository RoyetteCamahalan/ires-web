<template>
    <div class="h-screen bg-gray-50">
        <LayoutHeader @toggleSidebar="toggleSidebar" :sidebarOpen="state.sidebarOpen"></LayoutHeader>
        <div class="flex bg-white pt-16">
            <LayoutSidebar  @toggleSidebar="toggleSidebar" @onSideBarEnter="onSideBarEnter" @onSideBarLeave="onSideBarLeave" :sidebarOpen="state.sidebarOpen" :openHoverState="state.openHoverState"></LayoutSidebar>
            <div class="w-full bg-gray-50 relative transition-width " :class="!state.sidebarOpen && !state.openHoverState ? 'lg:ml-16' : 'lg:ml-64'">
                <main>
                    <slot></slot>
                </main>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { usePrefStore } from '@/store/pref'

export default{
    setup() {

        const prefStore = usePrefStore()

        const state = reactive({
            sidebarOpen: prefStore.getSideBarStatus,
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
        return {
            state,
            toggleSidebar,
            onSideBarEnter,
            onSideBarLeave
        }
    },
}
</script>
