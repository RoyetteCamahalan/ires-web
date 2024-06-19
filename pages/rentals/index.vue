<template>
    <div>
        <NuxtLayout name="admin">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex justify-between flex-col sm:flex-row">
                    <div class="w-full sm:w-80 flex items-center">
                        <label class="text-sm mr-2">Filter: </label><FormSelect :options="state.filterOptions" :searchable="false" :canClear="false" v-model="state.filterByID"></FormSelect>
                    </div>
                    <div class="flex flex-row-reverse mt-1">
                        <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            @click="createNew">
                            <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                            Create New
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200 rounded-lg shadow-md">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.mainList.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.mainList.data && state.mainList.data.length === 0))">
                                
                                <tr v-for="(data, index) in state.mainList.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm text-center">
                                        <a :href="'rentals/contract?ref=' + data.contractno" class="text-blue-600">{{ data.contractno }}</a>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.client.fname + ' ' + data.client.lname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.propertyList }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ moment(data.contractdate).format('YYYY/MM/DD') }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.montlyrent) }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.totalbalance) }}
                                    </td>
                                    <td class="px-4 py-3 text-xs text-center">
                                        <span v-if="data.status === rentalContractStatus.active" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Active</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Inactive</span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center">
                                            <MenuPopper icon-name="material-symbols:settings" :has-icon="true">
                                                <button
                                                    @click="navigateTo('rentals/contract?ref=' + data.contractno)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    View
                                                </button>
                                                <button  v-if="data.status == rentalContractStatus.active"
                                                    @click="updateRecord(data.contractid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button 
                                                    @click="showAttachment(data.contractid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    View Attachments
                                                </button>
                                            </MenuPopper>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.mainList" :currentPage="state.currentPage"></Pagination>
                </div>
            </div>
            <ModalEmpty  title="" :isShow="state.modalIsShowAttachment">
                <UiAttachment :typeID="14" :attachableID="state.selectedContractID" @closeAttachment="closeAttachment"></UiAttachment>
            </ModalEmpty>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { rentalService } from '@/components/api/RentalService'
import { usePrefStore } from '@/store/pref'
import { useRentalStore } from '@/store/rental'
import moment from 'moment'
import { rentalContractStatus } from '@/contants/consts'

const { $toastNotification } = useNuxtApp()
const prefStore = usePrefStore()

const rentalStore = useRentalStore()

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: '#'},
        { name: 'Client Name'},
        { name: 'Property'},
        { name: 'Date', textAlign: 'center'},
        { name: 'Monthly Rental', textAlign: 'center'},
        { name: 'Amount Due', textAlign: 'center'},
        { name: 'Status', textAlign: 'center'},
        { name: ''}
    ],
    modalIsShowAttachment: false,
    formStatusEdit: false,
    selectedContractID: 0,
    filterByID: 2,
    filterOptions: [
        { value: 2, label: 'View All'},
        { value: 1, label: 'Active'},
        { value: 0, label: 'Inactive'},
        { value: 3, label: 'With Due'}
    ]
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await rentalService.get(state.currentPage, search, state.filterByID)
        state.mainList = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
onMounted(() =>{
    loadList('')
})

watch(() => state.filterByID, async (newValue) => {
    loadList('')
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
    navigateTo('/rentals/new')
}
const updateRecord = (value) => {
    rentalStore.setSelectedID(value)
    navigateTo('/rentals/edit')
}

function showAttachment (id){
    state.selectedContractID = id
    state.modalIsShowAttachment = true
}
function closeAttachment (){
    state.selectedContractID = 0
    state.modalIsShowAttachment = false
}
</script>
