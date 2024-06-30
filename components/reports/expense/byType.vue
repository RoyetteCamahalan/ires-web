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
                <div class="w-full my-4 rounded-lg shadow-xs">
                    <div class="w-full">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.data && state.data.length === 0))">
                                <template v-for="(group, i) in state.data" :key="i">
                                    <tr class="text-gray-700 bg-gray-50">
                                        <td class="px-4 py-3 text-sm font-semibold" colspan="8">
                                            {{ group.name }}
                                        </td>
                                    </tr>
                                    <tr v-for="(data, index) in group.data" :key="index" class="text-gray-700">
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
                                            {{ data.vendor.vendorname}}
                                        </td>
                                        <td class="px-4 py-3 text-xs">
                                            {{ data.memo}}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-right">
                                            {{ $formatAmount(data.amount) }}
                                        </td>
                                    </tr>
                                    <tr class="text-gray-700 bg-gray-50">
                                        <td class="px-4 py-3 text-sm font-semibold text-right" colspan="7">
                                            Subtotal:
                                        </td>
                                        <td class="px-4 py-3 text-sm font-semibold text-right">
                                            {{ $formatAmount(group.totalamount) }}
                                        </td>
                                    </tr>
                                </template>
                                <tr class="text-gray-700 bg-blue-100">
                                    <td class="px-4 py-3 text-sm text-right font-semibold" colspan="7">
                                        Total Expense:
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right font-semibold">
                                        {{ $formatAmount(state.totalExpense) }}
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
    totalExpense: 0,
    columnHeaders: [
        { name: 'Trans #', textAlign: 'center'},
        { name: 'Date Posted', textAlign: 'center'},
        { name: 'Actual Date', textAlign: 'center'},
        { name: 'Ref #', textAlign: 'center'},
        { name: 'Office'},
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
            state.totalExpense = response.data.totalExpense
            groupData(response.data)
        }catch(error){
            console.log(error)
        }
        state.isPageLoading = false
    }
    else
        navigateTo('/expenses')
}
function groupData(data){
    var group = []
    data.expenses.forEach(item => {
        var objIndex = group.findIndex((obj) => obj.expensetypeid === item.expensetypeid)
        if(objIndex >= 0){
            group[objIndex].data.push(item)
            group[objIndex].totalamount += item.amount
        }
        else{
            group.push({
                expensetypeid: item.expensetypeid,
                name: item.expenseType.expensetypedesc,
                totalamount: item.amount,
                data: [ item ]
            })
        }
    });
    state.data = group
}
</script>