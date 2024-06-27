<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
            <div id="divPrint" class="mx-2 mt-3 p-3" :class="!props.isPrint && 'shadow-lg bg-white rounded-lg'">
                <ReportsHeader></ReportsHeader>
                <span v-if="state.payment.status === paymentStatus.void" class="absolute inset-1/2 -rotate-45 mt-10 -ml-10">
                    <div class="text-red-500 text-6xl font-bold">VOID</div>
                </span>
                <div class="mt-2 text-lg font-semibold text-center">
                    {{ state.payment.receipttype === 1 ? 'TRUST RECEIPT' : state.payment.receipttype === 3 ? 'PROBATIONARY RECEIPT' : 'ACKNOWLEDGEMENT RECEIPT' }}
                </div>
                <div class="mt-2 flex justify-between">
                    <div class="flex flex-col">
                        <div class="font-semibold">
                            Client:
                        </div>
                        <div class="text-sm">
                            <p>
                                {{ state.payment.client.fname + ' ' + state.payment.client.lname}}
                            </p>
                            <p>
                                {{  state.payment.address }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col text-right">
                        <span class="text-lg font-semibold">{{ $ReceiptTypeDesc(state.payment.receipttype) + ' #' + state.payment.orno }}</span>
                        <span class="text-sm">Payment Date: {{ moment(state.payment.paymentdate).format('MM/DD/YYYY') }}</span>
                        <span class="text-sm">Payment Mode: {{ $PaymentModeDescription(state.payment.paymentmode) }}</span>
                        <span v-if="state.payment.status === paymentStatus.void" class="text-sm">Void Remarks: {{ state.payment.voidremarks }}</span>
                        
                    </div>
                </div>
                <div class="w-full my-4 overflow-hidden rounded-lg shadow-xs">
                <div class="w-full overflow-x-auto">
                    <table class="w-full whitespace-no-wrap">
                        <thead>
                            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th class="px-4 py-3">Particulars</th>
                            <th class="px-4 py-3 text-center">Amount</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            <tr v-for="(data, index) in state.payment.payables" :key="index" class="text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3 text-sm">
                                    {{ data.description}}
                                </td>
                                <td class="px-4 py-3 text-sm w-48 text-right">
                                    {{ $formatAmount(data.paymentAmount) }}
                                </td>
                            </tr>
                            <tr class="text-gray-700">
                                <td class="px-4 py-3 text-sm text-right font-semibold">
                                    Total Payment:
                                </td>
                                <td class="px-4 py-3 text-sm text-right font-semibold">
                                    {{ $formatAmount(state.payment.totalamount) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                <div class="grid grid-cols-12 gap-4 pb-4">
                    <div class="col-span-8 mx-2 flex flex-col">
                        <span class="text-sm font-semibold">Received By</span>
                        <div class="flex ml-4 mt-4">
                            <div class="text-sm text-center">
                                <p class="px-2 border-b-2">{{ state.payment.createdBy.firstname + ' ' + state.payment.createdBy.lastname}}</p>
                                <p>{{ state.payment.createdBy.designation }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4 mx-2 flex flex-col">
                        <span class="text-sm font-semibold">Conformed By</span>
                        <div class="flex ml-4 mt-4">
                            <div class="text-sm text-center">
                                <p class="px-2 border-b-2">{{ (state.payment.paidby && state.payment.paidby != '') ? state.payment.paidby : state.payment.client.fname + ' ' + state.payment.client.lname }}</p>
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
import { paymentStatus } from '@/contants/consts';
import moment from 'moment'

const props = defineProps({
    paymentID:{
        type: String,
        required: true
    },
    isPrint:{
        type: Boolean,
        required: false,
        default: false
    }
})

const state = reactive({
    isPageLoading: false,
    payment:{
        orno: 0,
        receipttype: '',
        paymentmode: 0,
        totalamount: 0,
        status: paymentStatus.paid,
        paidby: '',
        payables: [],
        client:{
            fname: '',
            lname: '',
            address: ''
        },
        createdBy:{
            firstname: '',
            lastname: '',
            designation: ''
        },
        voidremarks: ''
    }
})


onMounted(() => {
    loadData()
})

onUpdated(() =>{
    if(!state.isPageLoading && props.isPrint)
        window.print()
})

async function loadData(){
    state.isPageLoading = true
    try{
        const response = await paymentService.getDetails(props.paymentID)
        state.payment = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
</script>