<template>
    <div>
        <div class="p-3 h-screen bg-gray-50">            
            <ReportsHeader></ReportsHeader>
            <LoadingSpinner :isActive="state.isPageLoading">
                <UiRental :isPrint="true" headerText="Account History" :contractID="state.contractID" :contract="state.contract" :accountHistory="state.accountHistory"></UiRental>
            </LoadingSpinner>
        </div>
    </div>
</template>

<script setup>
import { rentalService } from '@/components/api/RentalService'

const route = useRoute()

const state = reactive({
    contractID: route.query.ref ? Number(route.query.ref) : 0,
    isPageLoading: true,
    contract:{
        contractno: null,
        contractdate: null,
        billingsched: null,
        montlyrent: null,
        advancerent: null,
        deposit: null,
        term: null,
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
})

onMounted(() => {
    loadData()
})

async function loadData(){
    state.isPageLoading = true
    try{
        const response = await rentalService.getDetails(state.contractID) 
        state.contract = response.data       
        const responseHistory = await rentalService.getHistory(state.contractID)
        state.accountHistory = responseHistory.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}

onUpdated(() =>{
    if(!state.isPageLoading)
        window.print()
})
</script>