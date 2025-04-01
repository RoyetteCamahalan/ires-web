<template>
    <div>
      <nav class="fixed z-30 w-full bg-white">
        <div class="py-3 px-3 lg:px-5 lg:pl-3">
          <div class="flex justify-between items-center">
            <div class="flex justify-start items-center">
              <button
                id="toggleSidebar"
                aria-expanded="true"
                aria-controls="sidebar"
                class="hidden p-2 mr-4 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100"
                @click="$emit('toggleSidebar', false)"
              >
                <Icon name="material-symbols:menu" class="w-6 h-6"></Icon>
              </button>
              <button v-if="sidebarOpen"
                id="toggleSidebarMobileSearch"
                type="button"
                class="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
                @click="$emit('toggleSidebar', false)"
              >
                <Icon name="material-symbols:close" class="w-6 h-6"></Icon>
              </button>
              <button v-else
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                class="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 sm:hidden"
                @click="$emit('toggleSidebar', false)"
              >
                <Icon name="material-symbols:menu" class="w-6 h-6"></Icon>
              </button>
              <a :href="runtimeConfig.public.landingURL" class="text-md font-semibold flex items-center lg:mr-1.5">
                <!-- <img
                  src="https://i.imgur.com/hamRKWZ.jpeg"
                  class="mr-2 h-7"
                  alt="Creative Tim Logo"
                /> -->
                <span
                  class="hidden md:inline-block self-center text-lg font-bold whitespace-nowrap"
                  >HexaByt</span
                >
              </a>
              <h1 class="ml-2 text-lg font-bold text-blue-600">{{ props.title }}</h1>
            </div>
            <div class="flex items-center">
              <div class="relative mx-1">
                
                      
                <a
                        href="/login"
                        class="px-10 py-2 mt-2 text-sm text-center bg-blue-200 text-gray-800 rounded-full md:mt-8 md:ml-4 hidden sm:inline"
                        >Login
                        </a>
                        <a
                        href="/company/register"
                        class="px-10 py-2 mt-2 text-sm text-center bg-blue-600 text-white rounded-full md:mt-8 md:ml-4"
                        >Try Now
                        </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { usePrefStore } from '@/store/pref'
  
  const prefStore = usePrefStore()
  const runtimeConfig = useRuntimeConfig()
  
  
  const props = defineProps({
    sidebarOpen:{
      type: Boolean,
      required: true,
    },
    title:{
      type: String,
      required: false,
      default: ''
    }
  })
  
  const emit = defineEmits(['toggleSidebar'])
  
  
  </script>