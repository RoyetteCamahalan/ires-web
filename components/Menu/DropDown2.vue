<template>
    <div class="relative inline-block">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-gray-50"
          > 
            <Icon v-if="props.hasIcon" :name="props.iconName" class="h-5 w-4 mt-1/2 text-gray-600" area-hidden="true"></Icon>
                {{ props.label }}
            <Icon name="material-symbols:keyboard-arrow-down" class="ml-1 -mr-1 h-5 w-5" area-hidden="true"></Icon>
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
            :class=" 'absolute z-1000 mt-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ' + props.position + ' ' + props.width"
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

  const props = defineProps({
    label:{
        type: String,
        required: true,
    },
    hasIcon:{
        type: Boolean,
        required: false,
        default: false
    },
    iconName:{
        type: String,
        required: false,
        default: 'material-symbols:print'
    },
    position:{
      type: String,
      required: false,
      default: 'right-0'
    },
    width:{
      type: String,
      required: false,
      default: 'w-44'
    }
  })
  </script>