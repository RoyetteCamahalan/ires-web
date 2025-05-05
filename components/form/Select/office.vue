<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="false" 
        :loading="state.isLoading"
        noOptionsText="Office list is empty"
        placeholder="Select Office"
        v-on:search-change="loadData"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { accountService } from '~~/components/api/AccountService';

const props = defineProps({
    newAccountID: {
        type: Number,
        required: false,
        default: 0
    },
})
const state = reactive({
    options: Array(),
    isLoading: false
})

onMounted(() =>{
    loadData('')
})
watch(() => props.newAccountID, async (newValue) => {
    loadData('')
})

async function loadData(query: string){
    state.isLoading = true
    try{
        const response = await accountService.getOffices(0, false, query)
        state.options = []
        response.data.data.forEach((element: any) => {
            state.options.push({ value: element.accountid, label: element.accountname })
        });
    }catch(error){}
    state.isLoading = false
}
</script>

