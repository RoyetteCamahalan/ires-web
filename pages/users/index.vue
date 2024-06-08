<template>
    <div>
        <NuxtLayout name="admin">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex flex-row-reverse">
                    <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="addNewUser">
                        <Icon name="material-symbols:add" class="mr-1 -ml-1 w-6 h-6"></Icon>
                        Add User
                    </button>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.users.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.users.data && state.users.data.length === 0))">
                                
                                <tr v-for="(user, index) in state.users.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3">
                                        <div class="flex items-center text-sm">
                                        <!-- Avatar with inset shadow -->
                                            <div
                                                class="flex flex-col justify-center w-8 h-8 mr-3 rounded-full text-white hidden md:flex"
                                                :class="colors[Math.floor(Math.random() * colors.length)]">
                                                <div class="text-lg font-semibold relative text-center">{{ user.firstname[0] }}</div>
                                            </div>
                                            <div>
                                                <p class="font-semibold">{{ user.firstname + ' ' + user.lastname }}</p>
                                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                                    {{ user.username }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ user.designation }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ user.email }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ user.isappsysadmin ? 'Admin' : 'User' }}
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                        <span class="px-2 py-1 font-semibold leading-tight rounded-full"
                                            :class="user.isactive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'">
                                            {{ user.isactive ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                            aria-label="Edit"
                                            @click="updateUser(user.employeeid)">
                                            <Icon name="material-symbols:edit" class="w-5 h-5"></Icon>
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.users" :currentPage="state.currentPage"></Pagination>
                </div>
            </div>
            <Modal :title="state.modalTitle" :isShow="state.modalShow" @modalClose="modalClose">
                <UiUserForm @modalClose="modalClose" :formStatusEdit="state.formStatusEdit" :selectedUserID="state.selectedUserID"></UiUserForm>
            </Modal>
        </NuxtLayout>
    </div>
</template>
<script>
import { employeeService } from '@/components/api/EmployeeService';
import { usePrefStore } from '@/store/pref'

export default{
    setup() {
        const prefStore = usePrefStore()
        const state = reactive({
            users: [],
            error: '',
            currentPage: 1,
            isPageLoading: false,
            columnHeaders: [
                { name: 'User'},
                { name: 'Designation'},
                { name: 'Email'},
                { name: 'Role'},
                { name: 'Status'},
                { name: 'Action'}
            ],
            modalTitle: 'Add New User',
            modalShow: false,
            formStatusEdit: false,
            selectedUserID: 0,
        })
        const colors = [ 'bg-purple-700', 'bg-fuchsia-600', 'bg-blue-700', 'bg-green-600', 'bg-red-800', 'bg-yellow-500', 'bg-teal-500', 'bg-pink-500']

        const loadList = async (search) =>{
            state.isPageLoading = true
            try{
                const response = await employeeService.get(state.currentPage, search)
                state.users = response.data
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

        const addNewUser = () => {
            state.formStatusEdit = false
            state.modalTitle = "Add New User"
            state.modalShow = true
        }
        const updateUser = (value) => {
            state.selectedUserID = value
            state.formStatusEdit = true
            state.modalTitle = "Update User"
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
            addNewUser,
            updateUser,
            modalClose
        }
    }
}
</script>
