<template>
    <div>
        <NuxtLayout name="admin">
            
            <div class="flex flex-col mt-2 mx-4">
                <div class="w-full flex justify-between flex-col sm:flex-row">
                    <div class="flex flex-col sm:flex-row my-auto mb-2 sm:mb-0">
                        <FormLabel label="From" class="my-auto mr-2"></FormLabel>
                        <FormDateField name="startdate" placeholder="Start Date" class="py-1"
                            v-model="state.startDate"></FormDateField>
                        <FormLabel label="To" class="my-auto mr-2 ml-0 sm:ml-2"></FormLabel>
                        <FormDateField name="enddate" placeholder="Start Date" class="py-1"
                            v-model="state.endDate"></FormDateField>
                    </div>
                    <button type="button" class="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="createNew">
                        <Icon name="material-symbols:add" class="-ml-1 w-4 h-4"></Icon>
                        Create New
                    </button>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 rounded-2xl shadow-xl shadow-gray-200">
                <div class="rounded-2xl">
                    <div class="inline-block min-w-full align-middle">
                        <div class="shadow-lg">
                            <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.payments.data"
                                class="w-full whitespace-no-wrap rounded-2xl">
                                
                                <template #body
                                    v-if="!(state.isPageLoading || (state.payments.data && state.payments.data.length === 0))">
                                    
                                    <tr v-for="(data, index) in state.payments.data" :key="index" class="text-gray-700">
                                        <td class="px-4 py-3">
                                            <p class="text-sm font-semibold">{{ data.client.fname + ' ' + data.client.lname }}</p>
                                            <div class="flex text-xs">
                                                <p class="text-gray-600 dark:text-gray-300 my-auto">
                                                    {{ $ReceiptTypeDesc(data.receipttype) + '-' + data.orno }}
                                                </p>
                                                <span v-if="data.status === paymentStatus.void" class="px-2 py-1 ml-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Void</span>
                                                <span v-else-if="data.status === paymentStatus.refunded" class="px-2 py-1 ml-1 font-semibold leading-tight rounded-full text-gray-700 bg-gray-100">Refunded</span>
                                            </div>
                                            
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {{ moment(data.paymentdate).format('YYYY/MM/DD') }}
                                        </td>
                                        <td class="px-4 py-3 text-sm">
                                            {{ $PaymentModeDescription(data.paymentmode) }}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-right">
                                            {{ $formatAmount(data.totalamount) }}
                                        </td>
                                        <td class="px-4 py-3">
                                            <div class="flex justify-center">
                                                <MenuDropDown class="mt-1">
                                                    <MenuItem>
                                                        <button @click="updateRecord(data.id)"
                                                            class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                            Edit
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem v-if="data.receipttype != receiptType.OR">
                                                        <button
                                                            @click="navigateTo('/payments/receipt/' + data.paymentid)"
                                                            class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                            Print Receipt
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem v-if="data.status === paymentStatus.paid">
                                                        <button
                                                            class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                            Void Payment
                                                        </button>
                                                    </MenuItem>
                                                </MenuDropDown>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </Table>
                            <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.payments" :currentPage="state.currentPage"></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { MenuItem } from '@headlessui/vue'
import { paymentService } from '@/components/api/PaymentService'
import { usePrefStore } from '@/store/pref'
import moment from 'moment'
import { paymentStatus, receiptType } from '@/contants/consts'

const prefStore = usePrefStore()

const currentDate = new Date();
const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const state = reactive({
    payments: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Client Name'},
        { name: 'Date'},
        { name: 'Mode'},
        { name: 'Amount'},
        { name: 'Action', textAlign: 'center'}
    ],
    startDate: moment(firstDay).format('YYYY-MM-DD'),
    endDate: moment(currentDate).format('YYYY-MM-DD'),
    modalShow: false,
    formStatusEdit: false,
    selectedClientID: 0,
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const params = {
            currentPage: state.currentPage,
            search: search,
            startDate: state.startDate,
            endDate: state.endDate
        }
        const response = await paymentService.getPayments(params)
        state.payments = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
onMounted(() =>{
    loadList('')
})

watch(() => state.startDate, () => {
    loadList(prefStore.getSearchString)
})
watch(() => state.endDate, () => {
    loadList(prefStore.getSearchString)
})
prefStore.$onAction( ({ setSearchString, after}) => {
    after(() => {
        loadList(prefStore.getSearchString)
    })
}
)
const onPageChanged = (value) => {
    state.currentPage = value
    loadList('')
}

const createNew = () => {
    navigateTo('/payments/new')
}
const updateRecord = (value) => {
    //surveyStore.setSelectedSurvey(value)
    navigateTo('/payments/edit')
}

const updateStatus = (value) => {
    
}
</script>
