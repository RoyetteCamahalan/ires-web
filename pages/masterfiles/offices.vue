<template>
    <div>
        <NuxtLayout name="admin" title="Offices">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex flex-row-reverse">
                    <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="addNew">
                        <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                        Create New
                    </button>
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
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.accountname}}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.memo}}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.pettycashbalance) }}
                                    </td>
                                    <td class="px-4 py-3 text-xs w-1/5 text-center">
                                        <span v-if="data.isactive" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Active</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Inactive</span>
                                    </td>
                                    <td class="px-4 py-3 w-1/5 text-center">                                        
                                        <div class="flex justify-center">
                                            <MenuPopper icon-name="material-symbols:settings" :has-icon="true">
                                                <button 
                                                    @click="updateRecord(data.accountid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button
                                                    @click=" navigateTo('/pettycash/accounthistory?ref=' + data.accountid)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Account History
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
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiOffice @modalClose="modalClose" :formStatus="state.formStatus" :selectedDataID="state.selectedDataID"></UiOffice>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { accountService } from '@/components/api/AccountService'
import { usePrefStore } from '@/store/pref'

const prefStore = usePrefStore()

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Office Name'},
        { name: 'Memo'},
        { name: 'Petty Cash Balance', textAlign: 'center'},
        { name: 'Status', textAlign: 'center'},
        { name: 'Action', textAlign: 'center'},
    ],
    modalTitle: 'Add New Record',
    modalShow: false,
    formStatus: false,
    selectedDataID: 0,
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await accountService.getOffices(state.currentPage, true, search)
        state.mainList = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
onMounted(() =>{
    loadList('')
})

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

const addNew = () => {
    state.formStatus = 0
    state.modalTitle = "Add New Record"
    state.modalShow = true
}
const updateRecord = (value) => {
    state.selectedDataID = value
    state.formStatus = 1
    state.modalTitle = "Update Record"
    state.modalShow = true
}
const modalClose = (value) =>{
    state.modalShow = false
    if(value)
    {
        state.currentPage = 1
        loadList('')
    }
}
</script>
