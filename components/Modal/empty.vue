<template>
    <div v-if="props.isShow" class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 bg-black bg-opacity-50 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex transition-all duration-300 ease-in-out"
        id="user-modal" aria-modal="true" role="dialog">
        <div :class="'relative w-full h-full md:h-auto ' + props.formSize">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    isShow:{
        type: Boolean,
        required: true
    },
    formSize:{
        type: String,
        required: false,
        default: 'max-w-2xl'
    }
})
</script>
