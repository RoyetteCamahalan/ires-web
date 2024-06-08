<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
            <div id="divPrint" class="mx-2 mt-3 p-3" :class="!props.isPrint && 'shadow-lg bg-white rounded-lg'">
                <ReportsHeader></ReportsHeader>
                <div class="mt-2 text-lg font-semibold text-center">
                    Expense Report
                </div>
                <div class="mt-1 text-sm text-center">
                    From: {{ moment(startDate).format('MM/DD/YYYY') }}  To: {{ moment(endDate).format('MM/DD/YYYY') }}
                </div>
                <div class="w-full my-4 overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.data.expenses"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.data.expenses && state.data.expenses.length === 0))">
                                
                                <tr v-for="(data, index) in state.data.expenses" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm font-semibold text-center">
                                        {{ data.expenseid}}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        {{ moment(data.transdate).format('YYYY/MM/DD') }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        {{ moment(data.refdate).format('YYYY/MM/DD') }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        {{ data.refno}}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.office.accountname}}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.expenseType.expensetypedesc}}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.vendor.vendorname}}
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                        {{ data.memo}}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.amount) }}
                                    </td>
                                </tr>
                                <tr class="text-gray-700">
                                    <td class="px-4 py-3 text-sm text-right font-semibold" colspan="8">
                                        Total Expense:
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right font-semibold">
                                        {{ $formatAmount(state.data.totalExpense) }}
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                </div>
            </div>
        </LoadingSpinner>
    </div>
</template>

<script setup>
import { expenseService } from '@/components/api/ExpenseService';
import { useExpenseStore } from '@/store/expense';
import moment from 'moment'

const expenseStore = useExpenseStore()
const startDate = expenseStore.getStartDate
const endDate = expenseStore.getEndDate

const props = defineProps({
    isPrint:{
        type: Boolean,
        required: false,
        default: false
    }
})

const state = reactive({
    isPageLoading: false,
    data: [],
    columnHeaders: [
        { name: 'Trans #', textAlign: 'center'},
        { name: 'Date Posted', textAlign: 'center'},
        { name: 'Actual Date', textAlign: 'center'},
        { name: 'Ref #', textAlign: 'center'},
        { name: 'Office'},
        { name: 'Expense Type', textAlign: 'center'},
        { name: 'Vendor'},
        { name: 'Remarks'},
        { name: 'Amount', textAlign: 'center'},
    ],
})


onMounted(() => {
    loadData()
})

onUpdated(() =>{
    if(!state.isPageLoading && props.isPrint)
        window.print()
})

async function loadData(){
    if(startDate){
        state.isPageLoading = true
        try{
            const params = {
                startDate: startDate,
                endDate: endDate
            }
            const response = await expenseService.getExpenseReport(params)
            state.data = response.data
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
        state.isPageLoading = false
    }
    else
        navigateTo('/expenses')
}
</script>