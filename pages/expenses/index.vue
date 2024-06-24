<template>
    <div>
        <NuxtLayout name="admin" title="Expenses">
            
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
                    <div class="flex justify-between flex-1">
                        <MenuDropDown2 class="ml-0 sm:ml-2 my-auto mt-1" label="Print" :has-icon="true" position="left-0" width="w-48">
                            <MenuItem>
                                <button
                                    @click="PrintReport(1)"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Expense Report
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    @click="PrintReport(2)"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Expense Report by Type
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    @click="PrintReport(3)"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Expense Report by Office
                                </button>
                            </MenuItem>
                        </MenuDropDown2>
                        <button type="button" class="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            @click="navigateTo('/expenses/new')">
                            <Icon name="material-symbols:add" class="-ml-1 w-4 h-4"></Icon>
                            Create New
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.mainList.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.mainList.data && state.mainList.data.length === 0))">
                                
                                <tr v-for="(data, index) in state.mainList.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm font-semibold">
                                        {{ data.expenseid}}
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
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.amount) }}
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                        {{ data.memo}}
                                    </td>
                                    <td class="px-4 py-3 text-xs text-center">
                                        <span v-if="data.status === 0" class="px-2 py-1 font-semibold leading-tight rounded-full bg-green-100">Approved</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Void</span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div v-if="data.status === 0" class="flex justify-center">
                                            <MenuPopper icon-name="material-symbols:settings" :has-icon="true">
                                                <button 
                                                    @click="updateRecord(data.expenseid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button
                                                    @click="voidRecord(data.expenseid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Void Transaction
                                                </button>
                                            </MenuPopper>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                        <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.mainList" :currentPage="state.currentPage"></Pagination>
                    </div>
                </div>
            </div>
            <ModalEmpty title="" :isShow="state.modalIsShowOverride">
                <UiUserOverride :action="'Void Expense: ' + state.selectedDataID" @AfterOverride="modalCloseOverride"></UiUserOverride>
            </ModalEmpty>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { MenuItem } from '@headlessui/vue'
import { expenseService } from '@/components/api/ExpenseService'
import { usePrefStore } from '@/store/pref'
import { useExpenseStore } from '@/store/expense'
import moment from 'moment'

const { $toastNotification } = useNuxtApp()

const prefStore = usePrefStore()
const expenseStore = useExpenseStore()

const currentDate = new Date();
const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    startDate: moment(firstDay).format('YYYY-MM-DD'),
    endDate: moment(currentDate).format('YYYY-MM-DD'),
    columnHeaders: [
        { name: 'Trans #', textAlign: 'center'},
        { name: 'Actual Date', textAlign: 'center'},
        { name: 'Ref #', textAlign: 'center'},
        { name: 'Office'},
        { name: 'Expense Type', textAlign: 'center'},
        { name: 'Vendor'},
        { name: 'Amount', textAlign: 'center'},
        { name: 'Remarks'},
        { name: 'Status', textAlign: 'center'},
        { name: 'Action', textAlign: 'center'}
    ],
    modalTitle: 'Add New Record',
    modalShow: false,
    formStatus: false,
    selectedDataID: 0,
    modalIsShowOverride: false,
})

onMounted(() =>{
    loadList('')
})

watch(() => state.startDate, () => {
    loadList(prefStore.getSearchString)
})
watch(() => state.endDate, () => {
    loadList(prefStore.getSearchString)
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
        const response = await expenseService.getAll(params)
        state.mainList = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}

prefStore.$onAction( ({ setSearchString, after}) => {
    after(() => {
        state.currentPage = 1
        loadList(prefStore.getSearchString)
    })
}
)
const onPageChanged = (value) => {
    state.currentPage = value
    loadList('')
}

const updateRecord = (value) => {
    expenseStore.setSelectedID(value)
    navigateTo('/expenses/edit')
}

function voidRecord(id){
    state.selectedDataID = id
    state.modalIsShowOverride = true
}

const modalCloseOverride = async (success) =>{
    state.modalIsShowOverride = false
    if(success){
        state.isPageLoading = true
        try{
            await expenseService.VoidExpense( { id: state.selectedDataID })
            $toastNotification('success', '', 'Transaction has been tagged as Void.')
        }catch(error){
            $toastNotification('error', '', error.message)
        }
        state.isPageLoading = false
        loadList(prefStore.getSearchString)
    }
}

function PrintReport(type){
    if(state.mainList && state.mainList.data && state.mainList.data.length > 0){
        expenseStore.setDateRange(state.startDate, state.endDate)
        if(type === 1)
            window.open('/reports/expense', '_blank')     
        else if(type === 2)
            window.open('/reports/expense/byexpensetype', '_blank')    
        else if(type === 3)
            window.open('/reports/expense/byoffice', '_blank')   
    }
    else
        $toastNotification('error', '', 'Report is empty')
}
</script>
