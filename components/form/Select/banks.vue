<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="true" 
        :loading="state.isLoading"
        noOptionsText="Type to search banks"
        placeholder="Search Banks"
        v-on:search-change="searchChange"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { bankService } from '~~/components/api/BankService';
 
const props = defineProps({
    defaultOption:{
        type: Object,
        required: false,
        default: null
    }
})
const state = reactive({
    options: Array(),
    isLoading: false
})

watch(() => props.defaultOption, async (newValue) => {
    if(props.defaultOption){
        state.options = []
        state.options.push({ value: props.defaultOption.bankid, label: props.defaultOption.name })
    }
})

async function searchChange(query: string){
    state.isLoading = true
    try{
        const response = await bankService.getBanks(1, query)
        state.options = []
        if(props.defaultOption){
            state.options = []
            state.options.push({ value: props.defaultOption.bankid, label: props.defaultOption.name })
        }
        response.data.data.forEach((element: any) => {
            if(!(props.defaultOption && props.defaultOption.bankid === element.bankid)){
                state.options.push({ value: element.bankid, label: element.name })
            }
        });
    }catch(error){}
    state.isLoading = false
}
</script>
