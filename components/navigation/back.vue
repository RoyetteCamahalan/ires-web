<template>
    <div class="flex mb-2">
        <button
            type="button"
            class="text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 rounded-full text-sm p-1.5 inline-flex items-center"
            @click="navigateTo(props.url)"
            >
            <Icon name="material-symbols:arrow-back" class="w-5 h-5"></Icon>
        </button>
        <h3 class="ml-3 textlg font-semibold my-auto">Back</h3>
    </div>
</template>
<script setup>

const props = defineProps({
    url:{
        type: String,
        required: true
    }
})
</script>