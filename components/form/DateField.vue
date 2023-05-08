<template>
    <input type="date" :name="props.name" :autocomplete="props.name"
        class="appearance-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 invalid:border-pink-500 block w-full p-2"
        :placeholder="props.placeholder" :value="props.modelValue" @input="updateValue($event)" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
    placeholder: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
</script>