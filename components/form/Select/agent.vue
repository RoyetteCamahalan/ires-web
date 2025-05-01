<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="true" 
        :loading="state.isLoading"
        noOptionsText="Type to search agent"
        placeholder="Search Agent"
        v-on:search-change="searchChange"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { agentService } from '~~/components/api/AgentService';

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

onMounted(() => {
    loadDefaultOption()
})
watch(() => props.defaultOption, async (newValue) => {
    loadDefaultOption()
})

function loadDefaultOption(){
    if(props.defaultOption){
        state.options = []
        state.options.push({ value: props.defaultOption.value, label: props.defaultOption.label })
    }
    else
        searchChange('')
}

async function searchChange(query: string){
    state.isLoading = true
    try{
        const response = await agentService.get(1,query)
        state.options = []
        response.data.data.forEach((element: any) => {
            state.options.push({ value: element.id, label: element.fullname })
        });
    }catch(error){}
    state.isLoading = false
}
</script>
