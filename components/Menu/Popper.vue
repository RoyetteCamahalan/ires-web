<template>
    <!-- <div class="relative inline-block"class="relative inline-block text-left"> -->
        <Popper >
            <button 
                class="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-gray-50">
                <Icon v-if="props.hasIcon" :name="props.iconName" class="h-5 w-4 mt-1/2 text-gray-600" area-hidden="true"></Icon>
                    {{ props.label }}
                <Icon name="material-symbols:keyboard-arrow-down" class="ml-1 -mr-1 h-5 w-5" area-hidden="true"></Icon>
            </button>
            <template #content>
                <div class="absolute z-50 -mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-44 right-0 translate-x-6">
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                    >
                        <div class="p-1">
                            <slot></slot>
                        </div>
                    </transition>
                </div>
            </template>
    </Popper>
    <!-- </div> -->
</template>
<script setup>

const props = defineProps({
  label:{
      type: String,
      required: false,
      default: ""
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