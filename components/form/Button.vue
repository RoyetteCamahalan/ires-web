<template>
    <button type="button" class="block my-2 font-medium text-center hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg" :class="
        props.buttonStyle === 'primary' && 'bg-blue-500 border border-transparent hover:bg-blue-700 text-white',
        props.buttonStyle === 'default' && 'bg-gray-200 border border-gray-400 hover:bg-gray-300 text-gray-700',
        props.buttonStyle === 'success' && 'bg-green-700 text-white hover:bg-green-600',
        props.buttonStyle === 'warning' && 'bg-orange-600 text-white hover:bg-orange-500',
        props.buttonStyle === 'danger' && 'bg-red-700 text-white hover:bg-red-600',
        props.buttonStyle === 'link' && 'text-gray-800 underline hover:text-primary',
        !props.buttonStyle && 'text-primary hover:text-primary-light',
        props.disabled && 'bg-primary-light cursor-not-allowed hover:bg-primary-light',
        props.size === 'small' && 'py-1 px-2 text-sm',
        props.size === 'medium' && 'py-2 px-4 text-base'
    " :disabled="props.disabled">
        <slot name="icon-left" />
        <slot></slot>
        <slot name="right-left" />
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    buttonStyle: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
})
</script>