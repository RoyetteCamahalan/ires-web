<template>
    <div>
        <NuxtLayout name="admin" title="Doors/Rooms">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex justify-between flex-col sm:flex-row">
                    <div class="w-full sm:w-80">
                        <FormSelect :options="state.properties" :searchable="false" :canClear="false" v-model="state.selectedPropertyID"></FormSelect>
                    </div>
                    <div class="flex flex-row-reverse mt-1">
                        <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            @click="addNew">
                            <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
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
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.propertyname}}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.area}}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        {{ data.tenant}}
                                    </td>
                                    <td class="px-4 py-3 text-xs text-center">
                                        <span v-if="data.status === rentalPropertyStatus.vacant" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Vacant</span>
                                        <span v-else-if="data.status === rentalPropertyStatus.occupied" class="px-2 py-1 font-semibold leading-tight rounded-full text-blue-700 bg-green-100">Occupied</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Inactive</span>
                                    </td>
                                    <td class="px-4 py-3 w-1/5 text-center">
                                        <button class="px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                            aria-label="Edit"
                                            @click="updateRecord(data.propertyid)">
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
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiPropertyUnit @modalClose="modalClose" :formStatus="state.formStatus" :selectedDataID="state.selectedDataID" :selectedPropertyID="state.selectedPropertyID"></UiPropertyUnit>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script setup lang="ts">
import { projectService } from '@/components/api/ProjectService'
import { usePrefStore } from '@/store/pref'
import { usePropertyStore } from '@/store/properties'
import { rentalPropertyStatus } from '@/contants/consts'

const prefStore = usePrefStore()
const propertyStore = usePropertyStore()

const state = reactive({
    mainList: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Door/Room Name'},
        { name: 'Area'},
        { name: 'Tenant'},
        { name: 'Status', textAlign: 'center'},
        { name: 'Action', textAlign: 'center'}
    ],
    modalTitle: 'Add New Record',
    modalShow: false,
    formStatus: 0,
    selectedDataID: 0,
    properties: [],
    selectedPropertyID: propertyStore.getSelectedID,
    selectedPropertyName: ''
})


const loadProperties = async () =>{    
    state.isPageLoading = true
    try{
        const response = await projectService.GetRentalProperties(0, '')
        state.properties = []
        response.data.data.forEach((element: any) => {
            state.properties.push({ value: element.propertyid, label: element.propertyname })
        });

    }catch(error: any){
        state.error = error.message
    }
    state.isPageLoading = false
}

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await projectService.GetRentalUnits(state.selectedPropertyID, state.currentPage, search)
        state.mainList = response.data
    }catch(erro: any){
        state.error = error.message
    }
    state.isPageLoading = false
}

watch(() => state.selectedPropertyID, async (newValue) => {
    loadList('')
})
onMounted(() =>{
    loadProperties()
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
    state.properties.forEach((element: any) => {
        if(element.value == state.selectedPropertyID)
            state.selectedPropertyName = element.label
    });
    state.formStatus = 0
    state.modalTitle = "Add New Unit - " + state.selectedPropertyName
    state.modalShow = true
}
const updateRecord = (value: number) => {
    state.selectedDataID = value
    state.formStatus = 1
    state.modalTitle = "Update Unit"
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
