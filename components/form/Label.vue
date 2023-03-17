<template>
    <label :for="props.for" v-if="props.label" class="block mb-1 mt-2 text-sm text-gray-900">{{ props.label }}</label>
</template>

<script setup lang="ts">
const props = defineProps({
    for: {
        type: String,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
})
</script>