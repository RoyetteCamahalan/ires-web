<template>
    <div>
        <div class="grid gap-4 mb-4 mx-3 md:grid-cols-2 xl:grid-cols-3">
            <!-- Card -->
            <div 
                @click="navigateTo('/payments')" 
                class="flex items-center p-4 bg-white rounded-lg shadow-md">
                <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600">
                    Total Payment - Today
                    </p>
                    <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                        <p class="text-lg font-semibold text-gray-700">
                        {{ state.totalPayments ? $formatAmount(state.totalPayments) : '-' }}
                        </p>
                    </LoadingDots>
                </div>
            </div>
            <!-- Card -->
            <div
                @click="navigateTo('/rentals')" 
                class="flex items-center p-4 bg-white rounded-lg shadow-md">
                <div class="p-2 mr-4 text-blue-500 bg-blue-100 rounded-full">
                    <Icon name="material-symbols:check-small" class="w-7 h-7"></Icon>
                </div>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600">
                    Active Contracts
                    </p>
                    <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                        <p class="text-lg font-semibold text-gray-700">
                        {{ state.activeContracts ? state.activeContracts : '-' }}
                        </p>
                    </LoadingDots>
                </div>
            </div>
            <!-- Card -->
            <div
                @click="navigateTo('/properties')" 
                class="flex items-center p-4 bg-white rounded-lg shadow-md">
                <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600">
                    Vacant Properties
                    </p>
                    <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                        <p class="text-lg font-semibold text-gray-700">
                            {{ state.totalProperties ? (state.availableProperties + '/' + state.totalProperties) : '-' }}
                        </p>
                    </LoadingDots>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { dashboardService } from '@/components/api/Dashboard';

const state = reactive({
    totalPayments: null,
    activeContracts: null,
    availableProperties: null,
    totalProperties: null,
    totalExpenses: null,
    totalPettyCash: null,
    totalVendors: null,
    isPageLoading: false,
})

onMounted(() => {
    loadRecord()
})
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await dashboardService.getRental()
        state.totalPayments = response.data.totalPayment
        state.activeContracts = response.data.activeContracts
        state.availableProperties = response.data.availableProperties
        state.totalProperties = response.data.totalProperties
    }catch(error){

    }
    state.isPageLoading = false
}
</script>