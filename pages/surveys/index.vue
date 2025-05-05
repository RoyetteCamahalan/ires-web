<template>
    <div>
        <NuxtLayout name="admin" title="Surveys">
            
            <div class="flex flex-col my-2 mx-4">
                <div class="w-full flex flex-row-reverse">
                    <button type="button" class="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        @click="createNew">
                        <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                        Create New
                    </button>
                </div>
            </div>
            <div class="flex flex-col my-3 mx-4 shadow-gray-200 rounded-lg shadow-md">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.surveys.data"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.surveys.data && state.surveys.data.length === 0))">
                                
                                <tr v-for="(data, index) in state.surveys.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm text-center">
                                        {{ data.surveyno }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.client.fname + ' ' + data.client.lname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ moment(data.surveydate).format('YYYY/MM/DD') }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                            {{ $formatAmount(data.contractprice) }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-sm text-center">
                                        <span 
                                            v-if="data.balance == 0 && data.contractprice > 0"
                                            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                            Paid
                                        </span>                                        
                                        <span 
                                            v-else-if="data.contractprice > 0"
                                            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
                                            {{ $formatAmount(data.balance) }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-xs">
                                        <span v-if="data.status === surveyStatus.pending" class="px-2 py-1 font-semibold leading-tight rounded-full text-gray-700 bg-gray-100">Pending</span>
                                        <span v-else-if="data.status === surveyStatus.surveyed" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Surveyed</span>
                                        <span v-else-if="data.status === surveyStatus.completed" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Completed</span>
                                        <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Cancelled</span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center">
                                            <MenuPopper icon-name="material-symbols:settings" :has-icon="true">
                                                <button  v-if="data.status != surveyStatus.cancelled"
                                                    @click="updateRecord(data.id)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                <button 
                                                    @click="showAttachment(data.id)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    View Attachments
                                                </button>
                                                <button v-if="data.status === surveyStatus.pending"
                                                    @click="updateStatus(data.id, surveyStatus.surveyed)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Tag as Surveyed
                                                </button>
                                                <button v-if="data.status === surveyStatus.pending"
                                                    @click="updateStatus(data.id, surveyStatus.cancelled)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Tag as Cancelled
                                                </button>
                                            </MenuPopper>
                                            <!-- <MenuDropDown class="mt-1">
                                                <MenuItem v-if="data.status != surveyStatus.cancelled">
                                                    
                                                <button @click="updateRecord(data.id)"
                                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                    Edit
                                                </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        @click="showAttachment(data.id)"
                                                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                        View Attachments
                                                    </button>
                                                </MenuItem>
                                                <MenuItem v-if="data.status === surveyStatus.pending">
                                                    <button
                                                        @click="updateStatus(data.id, surveyStatus.surveyed)"
                                                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                        Tag as Surveyed
                                                    </button>
                                                </MenuItem>
                                                <MenuItem v-if="data.status === surveyStatus.pending">
                                                    <button 
                                                        @click="updateStatus(data.id, surveyStatus.cancelled)"
                                                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                        Tag as Cancelled
                                                    </button>
                                                </MenuItem>
                                            </MenuDropDown> -->
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.surveys" :currentPage="state.currentPage"></Pagination>
                </div>
            </div>
            <ModalEmpty  title="" :isShow="state.modalIsShowAttachment">
                <UiAttachment :typeID="15" :attachableID="state.selectedSurveyID" @closeAttachment="closeAttachment"></UiAttachment>
            </ModalEmpty>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { MenuItem } from '@headlessui/vue'
import { surveyService } from '@/components/api/SurveyService'
import { usePrefStore } from '@/store/pref'
import { useSurveyStore } from '@/store/survey'
import moment from 'moment'
import { surveyStatus } from '@/contants/consts'

const { $toastNotification } = useNuxtApp()
const prefStore = usePrefStore()

const surveyStore = useSurveyStore()

const state = reactive({
    surveys: [],
    error: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
        { name: 'Survey No'},
        { name: 'Client Name'},
        { name: 'Property'},
        { name: 'Date'},
        { name: 'Contract Price', textAlign: "center"},
        { name: 'Balance', textAlign: "center"},
        { name: 'Status'},
        { name: 'Action'}
    ],
    modalIsShowAttachment: false,
    formStatusEdit: false,
    selectedSurveyID: 0,
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await surveyService.get(state.currentPage, search)
        state.surveys = response.data
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

const createNew = () => {
    navigateTo('/surveys/new')
}
const updateRecord = (value) => {
    surveyStore.setSelectedSurvey(value)
    navigateTo('/surveys/edit')
}

const updateStatus = async (surveyID, status) => {
    state.isPageLoading = true
    try{
        const params = {
            id: surveyID,
            status: status
        }
        await surveyService.updateStatus(params)
        if(status === surveyStatus.cancelled)
            $toastNotification('success', '', 'Survey has been cancelled.')
        else
            $toastNotification('success', '', 'Survey has been tagged as Surveyed')
        loadList(prefStore.getSearchString)
    }catch(error){
        $toastNotification('error', '', error.message)
    }
    state.isPageLoading = false
}
function showAttachment (surveyID){
    state.selectedSurveyID = surveyID
    state.modalIsShowAttachment = true
}
function closeAttachment (){
    state.selectedSurveyID = 0
    state.modalIsShowAttachment = false
}
</script>
