<template>
    <textarea type="text" :name="props.name" :autocomplete="props.name"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 invalid:border-pink-500 block w-full p-2.5"
        :placeholder="props.placeholder" :value="props.modelValue" :rows="props.rows"
        @input="updateValue($event)"></textarea>
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
    rows: {
        type: Number,
        required: false,
        default: 4,
    },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
</script>