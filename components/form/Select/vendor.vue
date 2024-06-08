<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="true" 
        :loading="state.isLoading"
        noOptionsText="Type to search vendor"
        placeholder="Search Vendor"
        v-on:search-change="searchChange"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { expenseService } from '@/components/api/ExpenseService';
 
const props = defineProps({
    defaultOption:{
        type: Object,
        required: false,
        default: null
    },
})
const state = reactive({
    options: Array(),
    isLoading: false
})

onMounted(() => {
    if(props.defaultOption){
        state.options = []
        state.options.push({ value: props.defaultOption.vendorid, label: props.defaultOption.vendorname })
    }
})
watch(() => props.defaultOption, async (newValue) => {
    if(props.defaultOption){
        state.options = []
        state.options.push({ value: props.defaultOption.vendorid, label: props.defaultOption.vendorname })
    }
})

async function searchChange(query: string){
    state.isLoading = true
    try{
        const response = await expenseService.getVendors(1, false, query)
        state.options = []
        if(props.defaultOption){
            state.options = []
            state.options.push({ value: props.defaultOption.vendorid, label: props.defaultOption.vendorname })
        }
        response.data.data.forEach((element: any) => {
            if(!(props.defaultOption && props.defaultOption.vendorid === element.vendorid)){
                state.options.push({ value: element.vendorid, label: element.vendorname })
            }
        });
    }catch(error){}
    state.isLoading = false
}
</script>
