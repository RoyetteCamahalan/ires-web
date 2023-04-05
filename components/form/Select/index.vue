<template>
    <Multiselect :close-on-select="true" :searchable="props.searchable" :options="props.options"
        :canClear="props.canClear" 
        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const props = defineProps({
    canClear: {
        type: Boolean,
        required: false,
        default: true
    },
    options: {
        type: Object,
        required: true,
    },
    searchable: {
        type: Boolean,
        required: false,
        default: true
    },
})
</script>
