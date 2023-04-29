<template>
    <input type="checkbox"
        :class="[
                'w-4 h-4 accent-primary focus:ring-transparent mr-2',
                props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            ]"
        :checked="props.modelValue"
        @change="update($event)">
</template>

<script setup>
const props = defineProps({
    modelValue: Boolean,
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
})
const emit = defineEmits(['update:modelValue'])

function update(event){
    if(props.disabled){
        event.target.checked = props.modelValue
    }else
        emit('update:modelValue', event.target.checked)
}
</script>