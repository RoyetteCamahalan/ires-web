<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
            <div id="divPrint" class="mx-2 mt-3 p-3" :class="!props.isPrint && 'shadow-lg bg-white rounded-lg'">
                <ReportsHeader></ReportsHeader>
                <div class="mt-2 text-lg font-semibold text-center">
                    Collection Report
                </div>
                <div class="mt-1 text-sm text-center">
                    From: {{ moment(startDate).format('MM/DD/YYYY') }}  To: {{ moment(endDate).format('MM/DD/YYYY') }}
                </div>
                <div class="w-full my-4 overflow-hidden rounded-lg shadow-xs">
                    <div class="w-full overflow-x-auto">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.data.payments"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.data.payments && state.data.payments.length === 0))">
                                
                                <tr v-for="(data, index) in state.data.payments" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3">
                                        <p class="text-sm font-semibold">{{ data.client.fname + ' ' + data.client.lname }}</p>                                        
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ moment(data.paymentdate).format('MM/DD/YYYY') }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.receiptno }}                                        
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ $PaymentModeDescription(data.paymentmode) }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.totalamount) }}
                                    </td>
                                </tr>
                                <tr class="text-gray-700">
                                    <td class="px-4 py-3 text-sm text-right font-semibold" colspan="4">
                                        Total Payment:
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right font-semibold">
                                        {{ $formatAmount(state.data.totalPayment) }}
                                    </td>
                                </tr>
                            </template>
                        </Table>
                        <div class="grid grid-cols-12 gap-4 pb-4">
                            <div class="col-span-6 p-2 rounded-lg border">
                                <span class="text-sm font-semibold">Payment Denomination</span>
                                <div class="flex justify-between mx-2 text-sm mt-2">
                                    <p>Cash</p>
                                    <p>{{ $formatAmount(state.data.totalCash) }}</p>
                                </div>
                                <div class="flex justify-between mx-2 text-sm mt-2">
                                    <p>Check</p>
                                    <p>{{ $formatAmount(state.data.totalCheck) }}</p>
                                </div>
                                <div class="flex justify-between mx-2 text-sm mt-2">
                                    <p>Bank Transfer</p>
                                    <p>{{ $formatAmount(state.data.totalBankTransfer) }}</p>
                                </div>
                                <div class="flex justify-between mx-2 text-sm mt-2">
                                    <p>E-Wallet</p>
                                    <p>{{ $formatAmount(state.data.totalWallet) }}</p>
                                </div>
                                <div class="flex justify-between mx-2 text-sm mt-2 pt-2 border-t font-semibold">
                                    <p>Total</p>
                                    <p>{{ $formatAmount(state.data.totalPayment) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingSpinner>
    </div>
</template>

<script setup>
import { paymentService } from '@/components/api/PaymentService';
import { usePaymentStore } from '@/store/payment';
import moment from 'moment'

const paymentStore = usePaymentStore()
const startDate = paymentStore.getStartDate
const endDate = paymentStore.getEndDate

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
        { name: 'Client Name'},
        { name: 'Date'},
        { name: 'Receipt #'},
        { name: 'Payment Mode'},
        { name: 'Amount'},
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
                currentPage: 0,
                search: '',
                startDate: startDate,
                endDate: endDate
            }
            const response = await paymentService.getCollectionReport(params)
            state.data = response.data
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
        state.isPageLoading = false
    }
    else
        navigateTo('/payments')
}
</script>