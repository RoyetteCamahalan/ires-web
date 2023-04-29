<template>
    <div>
        <button 
            type="button"
            class="w-full flex items-center py-2.5 px-4 text-base font-normal text-dark-500 bg-white rounded-lg hover:bg-gray-200 group transition-all duration-200"
            @click="state.toggleOpen = !state.toggleOpen">
                <div
                  class="bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                >
                  <Icon :name="props.iconname" class="w-4 h-4"></Icon>
                </div>
                <span
                  class="ml-3 text-dark-500 text-sm">{{ props.title }}</span>
                <svg
                sidebar-toggle-item=""
                class="w-4 h-4 ml-auto text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
              <ul
                class="pb-2 pt-1" :class="!state.toggleOpen && 'hidden'"
              >
                <slot></slot>
              </ul>
            </transition>
    </div>
</template>
<script setup>

const props = defineProps({
    title:{
        type: String,
        required: true
    },
    iconname:{
        type: String,
        required: false,
        default: 'material-symbols:verified-user'
    },
    toggleOpen:{
        type: Boolean,
        required: false,
        default: false
    }
})
const state = reactive({
    toggleOpen: props.toggleOpen
})
</script>