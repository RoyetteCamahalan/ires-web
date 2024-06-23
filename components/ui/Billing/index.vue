<template>
    <div>
        <div class="w-full flex justify-between p-2 mt-3 mx-4 font-semibold text-blue-600">
            <div class="my-auto">My Invoices</div>
            <div class="text-xs w-48 mx-6">
                <FormSelect :options="state.filters" :searchable="false" :canClear="false" class="rounded-2xl text-sm" v-model="state.selectedFilter"></FormSelect>
            </div>
        </div>
        <div class="flex flex-col mb-3 mx-4 rounded-2xl shadow-xl shadow-gray-200">
            <div class="inline-block min-w-full align-middle">
                <div class="rounded-2xl shadow-lg bg-white">
                    <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.bills.data"
                        class="w-full whitespace-no-wrap">
                        
                        <template #body
                            v-if="!(state.isPageLoading || (state.bills.data && state.bills.data.length === 0))">
                            
                            <tr v-for="(bill, index) in state.bills.data" :key="index" class="text-gray-700">
                                <td class="px-4 py-3 text-sm">
                                    {{ bill.id }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <div class="flex flex-col">
                                        <p>{{ bill.particular }}</p>
                                        <span v-if="bill.datepaid" class="text-xs">Date Paid: {{ moment(bill.datepaid).format('MM/DD/YYYY') }} via {{ bill.paymentmode }}</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ moment(bill.duedate).format('MM/DD/YYYY') }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ $formatAmount(bill.amount) }}
                                </td>
                                <td class="px-4 py-3 text-xs">
                                        <span v-if="bill.status === billStatus.open" class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Unpaid</span>
                                        <span v-else-if="bill.status === billStatus.paid" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Paid</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-gray-700 bg-gray-100">Cancelled</span>
                                </td>
                                <td class="px-4 py-3 text-xs text-center">
                                    <button v-if="bill.status === billStatus.open && bill.paymentid && bill.paymentid.length > 0" 
                                        @click="verifyPayment(bill.id)"
                                        type="button" class="px-2 py-1 bg-green-600 text-white rounded-lg text-xs">Verify Payment</button>
                                    <button v-else-if="bill.status === billStatus.open" 
                                        @click="payBill(bill.id)"
                                        type="button" class="px-2 py-1 bg-blue-600 text-white rounded-lg text-xs">Pay Now</button>
                                    <button @click="getInvoiceFile(bill.id)" type="button" class="ml-1">
                                        <Icon name="material-symbols:download" class="w-5 h-5 text-blue-600"></Icon>
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </Table>
                    <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.bills" :currentPage="state.currentPage"></Pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { billingService } from '~~/components/api/BillingService'
import { billStatus } from '@/contants/consts'
import moment from 'moment';

const { $toastNotification, $downloadFile } = useNuxtApp()

const state = reactive({
    bills: [],
    error: '',
    currentPage: 1,
    isPageLoading: true,
    columnHeaders: [
        { name: 'Invoice #'},
        { name: 'Particular'},
        { name: 'Due Date'},
        { name: 'Total'},
        { name: 'Status'},
        { name: 'Action', textAlign: 'center'}
    ],
    selectedFilter: 2,
    filters:[
        { label: "Open", value: 0},
        { label: "Paid", value: 1},
        { label: "All", value: 2}
    ]
})
onMounted(() =>{
    loadData()
})
watch(() => state.selectedFilter, () => {
    loadData()
})

async function loadData(){
    state.isPageLoading = true
    try{
        const response = await billingService.getBills(state.currentPage, state.selectedFilter)
        state.bills = response.data
    }catch(error){
        state.error = error
    }
    state.isPageLoading = false
}
const onPageChanged = (value) => {
    state.currentPage = value
    loadData()
}
async function payBill(billID){
    state.isPageLoading = true
    try{
        const params = {
            id: billID
        }
        const response = await billingService.startPayment(params)
        if(response.data.checkouturl.length > 0){
            navigateTo(response.data.checkouturl, { external: true })
        }
    }catch(error){
        state.error = error
    }
    state.isPageLoading = false
}
async function verifyPayment(slug){
    state.isPageLoading = true
    try{
        const response = await billingService.completePayment( { id: slug })
        if(response.data && response.data.status == billStatus.paid){
            $toastNotification('success', '', 'Payment has been verified.')
        }
        else
            $toastNotification('error', '', 'Payment verification failed.')
    }catch(error){
        $toastNotification('error', '', 'Payment verification failed.')
    }
    await loadData()
    state.isPageLoading = false
}
async function getInvoiceFile(id){
    state.isPageLoading = true
    try{
        const response = await billingService.generateInvoice(id)
        $downloadFile(response.data)
    }catch(error){
        $toastNotification('error', '', 'Failed to download invoice')
    }
    state.isPageLoading = false
}
</script>