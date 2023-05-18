<template>
    <div class="relative block">
        <div :class="props.isActive && 'opacity-20'">
            <slot />
        </div>
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4" v-if="props.isActive">
            <div class="flex">
                <div class="bg-blue-500 ml-0.5 p-px w-1.5 h-1.5 rounded-full animate-bounce anim-delay-1"></div>
                <div class="bg-blue-500 ml-0.5 p-px w-1.5 h-1.5 rounded-full animate-bounce anim-delay-2"></div>
                <div class="bg-blue-500 ml-0.5 p-px w-1.5 h-1.5 rounded-full animate-bounce anim-delay-3"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true,
    },
})
</script>