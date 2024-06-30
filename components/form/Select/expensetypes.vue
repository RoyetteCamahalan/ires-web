<template>
    <Multiselect :close-on-select="true" :searchable="true" :options="state.options"
        :canClear="false" 
        :loading="state.isLoading"
        noOptionsText="Expense Types list is empty"
        placeholder="Select Expense Types"
        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"/>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { expenseService } from '@/components/api/ExpenseService';

const props = defineProps({
    newID: {
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
watch(() => props.newID, async (newValue) => {
    loadData()
})

async function loadData(){
    state.isLoading = true
    try{
        const response = await expenseService.getExpenseTypes(0, false, '')
        state.options = []
        response.data.data.forEach((element: any) => {
            state.options.push({ value: element.expensetypeid, label: element.expensetypedesc })
        });
    }catch(error){}
    state.isLoading = false
}
</script>
