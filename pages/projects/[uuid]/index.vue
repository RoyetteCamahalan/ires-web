<template>
    <div>
        <NuxtLayout name="admin" title="Lots">
            <UiProjectHeader @set-info="setProjectInfo"></UiProjectHeader>
            <div class="shadow-sm sm:rounded-lg my-2 mx-4 bg-white px-2 py-4 sm:px-6">
                <div class="mt-4">
                    <nav class="-mb-px flex space-x-6">
                        <a :href="`/projects/${uuid}`" class="border-indigo-500 text-indigo-600 border-b-2 px-8 pb-4 text-sm font-medium whitespace-nowrap" aria-current="page">Lots</a>
                        <a :href="`/projects/${uuid}/models`" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2 px-4 pb-4 text-sm font-medium whitespace-nowrap">Type/Model</a>
                    </nav>
                </div>
                <div class="flex flex-row-reverse mt-1">
                    <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="addNew">
                        <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                        Create New
                    </button>
                </div>
                <div class="mt-4 flex flex-col shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
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
                                        <td class="px-4 py-3 w-1/5 text-center">
                                            <button class="px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                                aria-label="Edit"
                                                @click="updateRecord(data.id)">
                                                <Icon name="material-symbols:edit-outline" class="w-5 h-5"></Icon>
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </Table>
                        </div>
                        <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.mainList" :currentPage="state.currentPage"></Pagination>
                    </div>
                </div>
            </div>
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiLotModelForm @modalClose="modalClose" :formStatus="state.formStatus" :selectedDataID="state.selectedDataID" :project_id="state.project.propertyid"></UiLotModelForm>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { lotmodelService } from '@/components/api/LotModelService'
import { usePrefStore } from '@/store/pref'

const prefStore = usePrefStore()
const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Lot Name'},
        { name: 'Area', textAlign: 'center'},
        { name: 'Tenant'},
        { name: 'Price', textAlign: 'center'},
        { name: 'Type/Model', textAlign: 'center'},
        { name: 'Status', textAlign: 'center'},
        { name: 'Action', textAlign: 'center'}
    ],
    modalTitle: 'Add New Record',
    modalShow: false,
    formStatus: 0,
    selectedDataID: 0,
    properties: [],
    project: {
        propertyid: 0,
        name: '',
        alias: '',
        address: ''
    }
})

function setProjectInfo(info: any){
    if(state.project.propertyid != info.propertyid){
        state.project = info
        loadList('')
    }
}

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await lotmodelService.GetModels(state.currentPage, search, state.project.propertyid)
        state.mainList = response.data
    }catch(erro: any){
        state.error = error.message
    }
    state.isPageLoading = false
}

watch(() => state.selectedPropertyID, async (newValue) => {
    loadList('')
})

prefStore.$onAction( ({ setSearchString, after}) => {
    after(() => {
        state.currentPage = 1
        loadList(prefStore.getSearchString)
    })
}
)
const onPageChanged = (value: number) => {
    state.currentPage = value
    loadList('')
}

const addNew = () => {
    state.formStatus = 0
    state.modalTitle = "Add New Model - " + state.project.name
    state.modalShow = true
}
const updateRecord = (value: number) => {
    state.selectedDataID = value
    state.formStatus = 1
    state.modalTitle = "Update Model"
    state.modalShow = true
}

const modalClose = (value: any) =>{
    state.modalShow = false
    if(value)
    {
        state.currentPage = 1
        loadList('')
    }
}
</script>
