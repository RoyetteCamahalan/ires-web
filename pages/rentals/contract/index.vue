<template>
    <div>
        <NuxtLayout name="admin">
            <div class="p-3 h-screen bg-gray-50">
                <div class="m-2 py-1 px-2 shadow-lg bg-white rounded-lg">
                    <div class="flex justify-between">
                        <button class="text-gray-500" @click="navigateTo('/rentals')">
                            <Icon name="material-symbols:arrow-back-ios"></Icon>
                            Back
                        </button>
                        <div class="flex">
                            <MenuPopOver icon-name="material-symbols:print" :has-icon="true" position="right-0">
                                <button
                                    @click="printAccountHistory"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Print History
                                </button>
                                <button
                                    @click="printSOA"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Print SOA
                                </button>
                            </MenuPopOver>
                            <span class="ml-1"></span>
                            <MenuPopOver icon-name="material-symbols:settings" :has-icon="true" position="right-0">
                                <button
                                    @click="updateContract"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Edit Contract
                                </button>
                                <button
                                    @click="postOtherFee"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100" title="Add fees other than monthly rental">
                                    Post Other Fees
                                    <Icon name="material-symbols:help-outline" class="w-4 h-4 text-blue-500"></Icon>
                                </button>
                                <button
                                    @click="reCompute"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    ReCompute History
                                </button>
                                <!-- <button
                                    @click="reCompute"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Send Account History
                                </button> -->
                                <!-- <button
                                    @click="reCompute"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Send SOA
                                </button> -->
                                <button
                                    @click="state.modalIsShowAttachment = true"
                                    class="group flex  w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Attachments <span v-if="state.fileCount" class="ml-1 text-blue-500">({{ state.fileCount }})</span>
                                </button>
                                <button
                                    @click="terminateContract"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    {{ (state.contract.status === rentalContractStatus.active) ? 'Terminate Contract' : 'Reactivate Contract' }}
                                </button>
                            </MenuPopOver>
                        </div>
                    </div>
                </div>
                <LoadingSpinner :isActive="state.isPageLoading">
                    <UiRental @onEdit="editOtherFee" :contractID="state.contractID" :contract="state.contract" :accountHistory="state.accountHistory"></UiRental>
                </LoadingSpinner>
                
                <Modal :title="state.ModalOtherFeesVisibleTitle" :isShow="state.isModalOtherFeesVisible" @modalClose="onCloseModalOtherFees">
                    <UiOtherCharge @modalClose="onCloseModalOtherFees" :formStatus="state.modalOtherFeesFormStatus" :selectedDataID="state.selectedOtherChargeID" :contractid="state.contractID"></UiOtherCharge>
                </Modal>
                <ModalEmpty :isShow="state.modalIsShowAttachment">
                    <UiAttachment :typeID="14" :attachableID="state.contractID" @closeAttachment="closeAttachment"></UiAttachment>
                </ModalEmpty>
                <ModalGeneric :title="state.ModalGenericTitle" :isShow="state.ModalGenericIsShow" type="terminaterental" @modalClose="closeGeneric"></ModalGeneric>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
import { rentalService } from '@/components/api/RentalService'
import { fileService } from '@/components/api/FileService';
import { useRentalStore } from '@/store/rental'
import { rentalContractStatus } from '@/contants/consts'
import moment from "moment"


const route = useRoute()
const rentalStore = useRentalStore()

const state = reactive({
    contractID: route.query.ref ? Number(route.query.ref) : 0,
    isModalOtherFeesVisible: false,
    isPageLoading: true,
    ModalOtherFeesVisibleTitle: 'Post Other Fee',
    modalOtherFeesFormStatus: 0,
    contract:{
        contractno: null,
        contractdate: null,
        billingstart: null,
        montlyrent: null,
        advancerent: null,
        deposit: null,
        term: null,
        status: null,
        propertyList: '',
        payables: [],
        client:{
            fullname: '',
            address: ''
        },
        createdBy:{
            firstname: '',
            lastname: '',
            designation: ''
        },
        totalbalance: 0
    },
    accountHistory: [],
    selectedOtherChargeID: 0,
    modalIsShowAttachment: false,
    ModalGenericIsShow: false,
    ModalGenericTitle: '',
    ModalGenericFields: [],
    fileCount: 0,
})

onMounted(() => {
    loadData()
    getFiles()
})

async function loadData(){
    state.isPageLoading = true
    try{
        const response = await rentalService.getDetails(state.contractID)
        state.contract = response.data
    }catch(error){
        console.log(error)
    }
    loadHistory()
    state.isPageLoading = false
}
async function loadHistory(){
    state.isPageLoading = true
    try{
        const response = await rentalService.getHistory(state.contractID)
        state.accountHistory = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
async function getFiles(){
    try{
        const response = await fileService.get(14, state.contractID, 0)
        state.fileCount = response.data.length
    }
    catch(error){
        state.error = error.message
    }
}
async function reCompute(){
    state.isPageLoading = true
    try{
        await rentalService.reCompute(state.contractID)
        loadData()
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
function onCloseModalOtherFees(value){
    state.isModalOtherFeesVisible = false
    if(value)
        loadData()
}

function postOtherFee(){
    state.modalOtherFeesFormStatus = 0
    state.selectedOtherChargeID = 0
    state.isModalOtherFeesVisible = true
}
function editOtherFee(chargeID){
    state.modalOtherFeesFormStatus = 1
    state.selectedOtherChargeID = chargeID
    state.isModalOtherFeesVisible = true
}

function updateContract(){
    rentalStore.setSelectedID(state.contractID)
    window.open('/rentals/edit', '_blank');
}

function closeAttachment (){
    state.modalIsShowAttachment = false
    getFiles()
}

function terminateContract(){
    if(state.contract.status === rentalContractStatus.active){
        state.ModalGenericIsShow = true
    }else{
        var param = {
            contractid : state.contractID,
            status: rentalContractStatus.active
        }
        updateStatus(param)
    }
}
async function closeGeneric(value){
    state.ModalGenericIsShow = false
    if(value){
        var param = {
            contractid : state.contractID,
            dateterminated: value,
            status: rentalContractStatus.inactive
        }
        updateStatus(param)
    }
}
async function updateStatus(param){
    state.isPageLoading = true
    try{
        await rentalService.updateStatus(param)
        loadData()
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}

function printAccountHistory(){
    window.open('/rentals/print/history?ref=' + state.contractID, '_blank')
}

function printSOA(){
    window.open('/rentals/print/soa?ref=' + state.contractID, '_blank')
}
</script>