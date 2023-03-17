<template>
  <div class="relative inline-block">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-purple-600 hover:bg-gray-50"
        > 
          <Icon name="material-symbols:settings" class="h-5 w-4 mt-1/2 text-gray-600" area-hidden="true"></Icon>
          <Icon name="material-symbols:keyboard-arrow-down" class="-mr-1 h-5 w-5" area-hidden="true"></Icon>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-1 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <slot></slot>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
<!-- <template>
    
    <div class="relative inline-block text-left">
      <div>
        <button class="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-purple-600 hover:bg-gray-50"
            @click="state.isOpen = !state.isOpen">
          <Icon name="material-symbols:settings" class="h-5 w-4 mt-1/2 text-gray-600" area-hidden="true"></Icon>
          <Icon name="material-symbols:keyboard-arrow-down" class="-mr-1 h-5 w-5 text-purple-600" area-hidden="true"></Icon>
        </button>
      </div>
  
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <div v-if="state.isOpen" 
          v-click-outside="closeContext"
          class="absolute right-0 z-10 mt-1 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1 divide-y">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  // import { reactive } from 'vue'

  // const state = reactive({
  //   isOpen: false
  // })
  
  // function closeContext(){
  //   state.isOpen = false
  // }
  </script> -->