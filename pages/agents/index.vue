<template>
    <div>
        <NuxtLayout name="admin" title="Agents">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex flex-row-reverse">
                    <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="addNew">
                        <Icon name="material-symbols:add" class="mr-1 -ml-1 w-6 h-6"></Icon>
                        Add Agents
                    </button>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <TableNew :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.data && state.data.data && state.data.data.length === 0))">
                                
                                <tr v-for="(agent, index) in state.data.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm">
                                        {{ agent.firstname + ' ' + agent.lastname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ agent.contactno }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ agent.email }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ agent.tinnumber }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ agent.upline?.fullname }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                            aria-label="Edit"
                                            @click="update(agent.guid)">
                                            <Icon name="material-symbols:edit" class="w-5 h-5"></Icon>
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </TableNew>
                    </div>
                    <PaginationInfo @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.data" :currentPage="state.currentPage"></PaginationInfo>
                </div>
            </div>
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiAgentForm @modalClose="modalClose" :formStatusEdit="state.formStatusEdit" :selectedGuid="state.selectedGuid"></UiAgentForm>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { agentService } from '@/components/api/AgentService';
import { usePrefStore } from '@/store/pref'

const prefStore = usePrefStore()
const state = reactive({
    data: {},
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Name'},
        { name: 'Contact No'},
        { name: 'Email'},
        { name: 'TIN'},
        { name: 'Upline'},
        { name: 'Action'}
    ],
    modalTitle: 'Add New Agent',
    modalShow: false,
    formStatusEdit: false,
    selectedGuid: 0,
})
const colors = [ 'bg-purple-700', 'bg-fuchsia-600', 'bg-blue-700', 'bg-green-600', 'bg-red-800', 'bg-yellow-500', 'bg-teal-500', 'bg-pink-500']

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await agentService.get(state.currentPage, search)
        console.log(response)
        state.data = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
onMounted(() =>{
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

const addNew = () => {
    state.formStatusEdit = false
    state.modalTitle = "Add New Agent"
    state.modalShow = true
}
const update = (value) => {
    state.selectedGuid = value
    state.formStatusEdit = true
    state.modalTitle = "Update Agent"
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
