<template>
    <div>
        <div class="flex flex-col my-2 shadow-gray-200">
            <div class="inline-block min-w-full align-middle overflow-hidden rounded-2xl bg-white">
                <div class="w-full overflow-x-auto">
                    <div class="text-sm font-semibold text-gray-700 px-3 pt-3">Latest Expense</div>
                    <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.mainList.data"
                        class="w-full whitespace-no-wrap">
                        
                        <template #body
                            v-if="!(state.isPageLoading || (state.mainList.data && state.mainList.data.length === 0))">
                            
                            <tr v-for="(data, index) in state.mainList.data" :key="index" class="text-gray-700">
                                <td class="px-4 py-3 text-sm text-center">
                                    {{ moment(data.refdate).format('YYYY/MM/DD') }}
                                </td>
                                <td class="px-4 py-3 text-sm text-center">
                                    {{ data.refno}}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.office.accountname}}
                                </td>
                                <td class="px-4 py-3 text-sm text-center">
                                    {{ data.expenseType.expensetypedesc}}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.vendor.vendorname}}
                                </td>
                                <td class="px-4 py-3 text-sm text-right">
                                    {{ $formatAmount(data.amount) }}
                                </td>
                                <td class="px-4 py-3 text-xs text-center">
                                    <span v-if="data.status === 0" class="px-2 py-1 font-semibold leading-tight rounded-full bg-green-100">Approved</span>
                                    <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Void</span>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { expenseService } from '@/components/api/ExpenseService'
import moment from 'moment'

const currentDate = new Date();
const firstDay = new Date(currentDate.getFullYear(), 1, 1);

const state = reactive({
    mainList: [],
    error: '',
    columnHeaders: [
        { name: 'Actual Date', textAlign: 'center'},
        { name: 'Ref #', textAlign: 'center'},
        { name: 'Office'},
        { name: 'Expense Type', textAlign: 'center'},
        { name: 'Vendor'},
        { name: 'Amount', textAlign: 'center'},
        { name: 'Status', textAlign: 'center'},
    ],
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const params = {
            currentPage: 1,
            search: search,
            startDate: moment(firstDay).format('YYYY-MM-DD'),
            endDate: moment(currentDate).format('YYYY-MM-DD')
        }
        const response = await expenseService.getAll(params)
        // if(response.data.data.length > 10)
        //     response.data.data = response.data.data.slice(0, 10);
        state.mainList = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
onMounted(() =>{
    loadList('')
})
</script>
