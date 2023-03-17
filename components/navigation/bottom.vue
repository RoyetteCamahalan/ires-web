<template>
    <div class="w-full">
        <div class="flex justify-between border-t mx-4 mt-4">
            <FormButton type="button" buttonStyle="default" @click="navigateTo(props.returnURL)" class="w-24">
                <template #icon-left><Icon name="material-symbols:chevron-left"></Icon></template>
                Back
            </FormButton>
            <FormButton type="button" buttonStyle="primary" v-if="props.saveVisibility" class="w-24" @click="$emit('onSave')">Save</FormButton>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    returnURL:{
        type: String,
        required: true,
    },
    saveVisibility:{
        type: Boolean,
        required: false,
        default: true
    }
})

const emit = defineEmits(['onSave'])


</script>
