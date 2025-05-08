<template>
    <div class="shadow-sm sm:rounded-lg my-2 mx-4 bg-white px-2 py-4 sm:px-6">
        <LoadingSpinner :is-active="state.isPageLoading">
            <div class="px-4 sm:px-0">
                <FormError v-if="state.error">{{ state.error }}</FormError>
                <div class="flex">
                    <h3 class="text-lg/8 font-bold text-gray-900">{{ state.project.name }}</h3>
                    <h3 
                        v-if="state.project.alias && state.project.alias != state.project.name"
                        class="text-base/8 italic text-gray-500"> ( {{ state.project.alias }} )</h3>
                        
                        <button 
                            class="ml-4 text-sm font-medium text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                            aria-label="Edit"
                            @click="editDetails">
                            <Icon name="material-symbols:edit" class="w-5 h-5"></Icon>
                        </button>
                </div>
                <div class="flex max-w-2xl text-sm/6 text-gray-500">
                    <p>{{ state.project.address }}</p>
                    <p v-if="state.project.area && state.project.address" class="mx-2">|</p>
                    <p v-if="state.project.area">{{ $formatAmount(state.project.area, 0) }} sqm</p>
                </div>
            </div>
            <div class="mt-4 mb-2 flex justify-between">
                <h5 class="text-xs font-semibold text-gray-700 my-auto">Project Settings</h5>
                <button type="button" class="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                    @click="editSettings">
                    Edit Settings
                </button>
            </div>
            <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <div class="border-t border-gray-100 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div>
                            <dt class="text-sm/6 font-medium text-gray-900">Payment Term</dt>
                            <dd class="text-xs italic text-white sm:block hidden">-</dd>
                        </div>
                        <dd class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="grow">{{ state.project.paymentterm }} months</span>
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div>
                            <dt class="text-sm/6 font-medium text-gray-900">Monthly Penalty</dt>
                            <dd class="text-xs italic text-gray-500">Add-on interest for unpaid dues</dd>
                        </div>
                        <dd class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="grow">{{ state.project.interest }} %</span>
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div>
                            <dt class="text-sm/6 font-medium text-gray-900">Payment Extension</dt>
                            <dd class="text-xs italic text-gray-500">days allowance before penalty</dd>
                        </div>
                        <dd class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="grow">{{ state.project.paymentextension }} days</span>
                        </dd>
                    </div>
                </div>
                <div>
                    <div class="border-t border-gray-100 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div>
                            <dt class="text-sm/6 font-medium text-gray-900">Commission Percentage</dt>
                            <dd class="text-xs italic text-gray-500">base on contract price</dd>
                        </div>
                        <dd class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="grow">{{ state.project.com_percentage }} %</span>
                        </dd>
                    </div>
                    <div class="border-t border-gray-100 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <div>
                            <dt class="text-sm/6 font-medium text-gray-900">Commission Term</dt>
                            <dd class="text-xs italic text-gray-500">Divide commission in months</dd>
                        </div>
                        <dd class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="grow">{{ state.project.commissionterm }} months</span>
                        </dd>
                    </div>
                </div>
            </div>
        </LoadingSpinner>
        <Modal title="Project Details" :isShow="state.showProjectDetailsModal" @modalClose="modalClose">
            <UiProjectEdit @modalClose="modalClose" :target="state.targetEdit" :uuid="uuid"></UiProjectEdit>
        </Modal>
    </div>
</template>
<script setup lang="ts">
import { projectService } from '@/components/api/ProjectService'

const router = useRouter()
const uuid = router?.currentRoute?.value?.params?.uuid

const emit = defineEmits(['setInfo'])

const state = reactive({
    error: '',
    isPageLoading: false,
    project: {
        propertyid: 0,
        name: '',
        alias: '',
        address: '',
        area: 0,
        paymentterm: 0,
        interest: 0,
        paymentextension: 0,
        com_percentage: 0,
        commissionterm: 0
    },
    showProjectDetailsModal: false,
    targetEdit: 'details'
})
onMounted(() =>{
    loadProjectInfo()
})

const loadProjectInfo = async () =>{    
    state.isPageLoading = true
    try{
        const response = await projectService.GetProject(uuid)
        state.project.propertyid = response.data.propertyid
        state.project.name = response.data.propertyname
        state.project.alias = response.data.alias
        state.project.address = response.data.address
        state.project.area = response.data.area
        state.project.paymentterm = response.data.paymentterm
        state.project.interest = response.data.interest
        state.project.paymentextension = response.data.paymentextension
        state.project.com_percentage = response.data.com_percentage
        state.project.commissionterm = response.data.commissionterm
        emit('setInfo', state.project)
    }catch(error: any){
        state.error = error.message
    }
    state.isPageLoading = false
}
async function modalClose(success: boolean){
    if(success)
        await loadProjectInfo()
    state.showProjectDetailsModal = false
}
function editDetails(){
    state.targetEdit = 'details'
    state.showProjectDetailsModal = true
}
function editSettings(){
    state.targetEdit = 'settings'
    state.showProjectDetailsModal = true
}
</script>