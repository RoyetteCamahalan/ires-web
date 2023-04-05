<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="true" 
        :loading="state.isLoading"
        noOptionsText="Bank account list is empty"
        placeholder="Select Bank Account"
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
    loadData()
})
watch(() => props.newAccountID, async (newValue) => {
    loadData()
})

async function loadData(){
    state.isLoading = true
    try{
        const response = await accountService.getBankAccounts(1, '')
        state.options = []
        response.data.data.forEach((element: any) => {
            state.options.push({ value: element.accountid, label: element.bank.name + ' - ' + element.accountname })
        });
    }catch(error){}
    state.isLoading = false
}
</script>
