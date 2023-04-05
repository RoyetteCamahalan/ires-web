<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="true" 
        :loading="state.isLoading"
        noOptionsText="Type to search client"
        placeholder="Search Client"
        v-on:search-change="searchChange"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { clientService } from '~~/components/api/ClientService';

const state = reactive({
    options: Array(),
    isLoading: false
})

async function searchChange(query: string){
    state.isLoading = true
    try{
        const response = await clientService.get(1,query)
        state.options = []
        response.data.data.forEach((element: any) => {
            state.options.push({ value: element.custid, label: element.fname + ' ' + element.lname })
        });
    }catch(error){}
    state.isLoading = false
}
</script>
