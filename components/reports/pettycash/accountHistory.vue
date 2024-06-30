<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
            <div id="divPrint" class="mx-2 mt-3 p-3" :class="!props.isPrint && 'shadow-lg bg-white rounded-lg'">
                <div class="mt-2 text-lg font-semibold text-center">
                    Petty Cash Report
                </div>
                <div class="mt-1 text-sm text-center">
                    From: {{ moment(props.startDate).format('MM/DD/YYYY') }}  To: {{ moment(props.endDate).format('MM/DD/YYYY') }}
                </div>
                <div class="mt-1 text-sm text-center">
                    Account Name: <span class="font-semibold">{{ state.accountname }}</span>
                </div>
                <div class="w-full my-4 rounded-lg shadow-xs" :class="!props.isPrint && 'overflow-visible'">
                    <div class="w-full" :class="!props.isPrint && 'overflow-x-auto'">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.data && state.data.length === 0))">
                                    <tr v-for="(data, index) in state.data" :key="index" class="text-gray-700">
                                        <td class="px-2 py-3 text-sm text-center">
                                            {{ data.transdate ? moment().format('YYYY/MM/DD') : '' }}
                                        </td>
                                        <td class="px-2 py-3 text-sm text-center">
                                            {{ data.actualdate ? moment().format('YYYY/MM/DD') : '' }}
                                        </td>
                                        <td class="px-2 py-3 text-sm text-center">
                                            {{ data.refno}}
                                        </td>
                                        <td class="px-2 py-3 text-sm">
                                            {{ data.particular}}
                                        </td>
                                        <td class="px-2 py-3 text-sm text-right">
                                            {{ (data.debit && data.debit > 0) ? $formatAmount(data.debit) : '' }}
                                        </td>
                                        <td class="px-2 py-3 text-sm text-right">
                                            {{ (data.credit && data.credit > 0) ? $formatAmount(data.credit) : '' }}
                                        </td>
                                        <td class="px-2 py-3 text-sm text-right">
                                            {{ $formatAmount(data.runningbalance) }}
                                        </td>
                                        <!-- <td class="px-4 py-3 text-sm text-center">
                                            {{ moment(data.transdate).format('YYYY/MM/DD') }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-center">
                                            {{ moment(data.refdate).format('YYYY/MM/DD') }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-center">
                                            {{ data.refno}}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {{ data.expenseType.expensetypedesc}}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {{ data.vendor.vendorname}}
                                        </td>
                                        <td class="px-4 py-3 text-xs">
                                            {{ data.memo}}
                                        </td> -->
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
import { pettyCashService } from '@/components/api/PettyCashService';
import { accountService } from '@/components/api/AccountService';
import moment from 'moment'

const props = defineProps({
    isPrint:{
        type: Boolean,
        required: false,
        default: false
    },
    officeID:{
        type: Number,
        required: true,
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    }
})

const state = reactive({
    isPageLoading: false,
    data: [],
    totalExpense: 0,
    accountname: '-',
    columnHeaders: [
        { name: 'Date Posted', textAlign: 'center'},
        { name: 'Actual Date', textAlign: 'center'},
        { name: 'Ref #', textAlign: 'center'},
        { name: 'Particular'},
        { name: 'Debit', textAlign: 'center'},
        { name: 'Credit', textAlign: 'center'},
        { name: 'Running Bal', textAlign: 'center'},
    ],
})


onMounted(() => {
    loadInfo()
})

onUpdated(() =>{
    if(!state.isPageLoading && props.isPrint)
        window.print()
})

watch(() => props.startDate, async (newValue) => {
    loadData()
})
watch(() => props.endDate, async (newValue) => {
    loadData()
})

async function loadInfo(){
    state.isPageLoading = true
    try{
        const response = await accountService.getOffice(props.officeID)
        state.accountname = response.data.accountname
    }catch(error){
        console.log(error)
    }
    await loadData()
    state.isPageLoading = false
}

async function loadData(){
    if(props.startDate){
        state.isPageLoading = true
        try{
            const params = {
                id: props.officeID,
                startDate: props.startDate,
                endDate: props.endDate
            }
            const response = await pettyCashService.getAccountHistory(params)
            state.data = response.data
        }catch(error){
            console.log(error)
        }
        state.isPageLoading = false
    }
    else
        navigateTo('/master')
}
</script>