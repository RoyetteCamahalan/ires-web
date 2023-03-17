<template>
    <input type="checkbox" class="w-4 h-4 accent-primary cursor-pointer focus:ring-transparent mr-2"
        :checked="props.value">
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Boolean,
        required: false,
    },
})
</script>