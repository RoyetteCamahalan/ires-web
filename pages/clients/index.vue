<template>
    <div>
        <NuxtLayout name="admin">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex flex-row-reverse">
                    <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="addNewClient">
                        <Icon name="material-symbols:add" class="mr-1 -ml-1 w-6 h-6"></Icon>
                        Add Client
                    </button>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200">
                <div class="inline-block min-w-full align-middle">
                    <div class="rounded-2xl shadow-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.clients.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.clients.data && state.clients.data.length === 0))">
                                
                                <tr v-for="(client, index) in state.clients.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm">
                                        {{ client.fname + ' ' + client.lname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ client.address }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ client.contactno }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ client.email }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ client.tinnumber }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                            aria-label="Edit"
                                            @click="updateClient(client.custid)">
                                            <Icon name="material-symbols:edit" class="w-5 h-5"></Icon>
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                        <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.clients" :currentPage="state.currentPage"></Pagination>
                    </div>
                </div>
            </div>
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiClientForm @modalClose="modalClose" :formStatusEdit="state.formStatusEdit" :selectedClientID="state.selectedClientID"></UiClientForm>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script>
import { clientService } from '@/components/api/ClientService';
import { usePrefStore } from '@/store/pref'

export default{
    setup() {
        const prefStore = usePrefStore()
        const state = reactive({
            clients: [],
            error: '',
            currentPage: 1,
            isPageLoading: false,
            columnHeaders: [
                { name: 'Client'},
                { name: 'Address'},
                { name: 'Contact No'},
                { name: 'Email'},
                { name: 'TIN'},
                { name: 'Action'}
            ],
            modalTitle: 'Add New Client',
            modalShow: false,
            formStatusEdit: false,
            selectedClientID: 0,
        })
        const colors = [ 'bg-purple-700', 'bg-fuchsia-600', 'bg-blue-700', 'bg-green-600', 'bg-red-800', 'bg-yellow-500', 'bg-teal-500', 'bg-pink-500']

        const loadList = async (search) =>{
            state.isPageLoading = true
            try{
                const response = await clientService.get(state.currentPage, search)
                state.clients = response.data
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

        const addNewClient = () => {
            state.formStatusEdit = false
            state.modalTitle = "Add New Client"
            state.modalShow = true
        }
        const updateClient = (value) => {
            state.selectedClientID = value
            state.formStatusEdit = true
            state.modalTitle = "Update Client"
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
        
        return {
            state,
            colors,
            onPageChanged,
            addNewClient,
            updateClient,
            modalClose
        }
    }
}
</script>
