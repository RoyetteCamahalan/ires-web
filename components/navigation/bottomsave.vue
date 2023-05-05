<template>
    <div class="w-full">
        <div class="flex flex-row-reverse mx-4 mt-2">
            <FormButton type="button" buttonStyle="primary" class="w-24" @click="$emit('onSave')">Save</FormButton>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    returnURL:{
        type: String,
        required: true,
    }
})

const emit = defineEmits(['onSave'])


</script>
