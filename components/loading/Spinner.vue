<template>
    <div class="relative block">
        <div :class="props.isActive && 'opacity-20'">
            <slot />
        </div>
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" v-if="props.isActive">
            <Icon name="mingcute:loading-fill" class="w-8 h-8 text-main animate-spin text-blue-500"/>
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