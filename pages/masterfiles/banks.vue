<template>
    <div>
        <NuxtLayout name="admin" title="Banks/e-Wallets">
            
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
                                        {{ data.name}}
                                    </td>
                                    <td class="px-4 py-3 text-sm w-1/5 text-center">
                                        <FormCheckBox v-model="data.isewallet" :disabled="true"></FormCheckBox>
                                    </td>
                                    <td class="px-4 py-3 w-1/5 text-center">
                                        <button class="px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                            aria-label="Edit"
                                            @click="updateRecord(data.bankid)">
                                            <Icon name="material-symbols:edit" class="w-5 h-5"></Icon>
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.mainList" :currentPage="state.currentPage"></Pagination>
                </div>
            </div>
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiBank @modalClose="modalClose" :formStatus="state.formStatus" :selectedDataID="state.selectedDataID"></UiBank>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { bankService } from '@/components/api/BankService'
import { usePrefStore } from '@/store/pref'

const prefStore = usePrefStore()

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Bank Name'},
        { name: 'Is E-Wallet?', textAlign: 'center'},
        { name: 'Action', textAlign: 'center'}
    ],
    modalTitle: 'Add New Record',
    modalShow: false,
    formStatus: false,
    selectedDataID: 0,
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await bankService.getAllBanks(state.currentPage, search)
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
