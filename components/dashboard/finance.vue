<template>
    <div>
        <div class="grid gap-4 mb-4 mx-3 md:grid-cols-2 xl:grid-cols-3">
            <!-- Card -->
            <div class="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                Total Expense - Today
                </p>
                <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                    <p class="text-lg font-semibold text-gray-700">
                    {{ state.totalExpenses ? $formatAmount(state.totalExpenses) : '-' }}
                    </p>
                </LoadingDots>
            </div>
            </div>
            <!-- Card -->
            <div class="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600">
                Total Petty Cash
                </p>
                <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                    <p class="text-lg font-semibold text-gray-700">
                    {{ state.totalPettyCash ? $formatAmount(state.totalPettyCash) : '-' }}
                    </p>
                </LoadingDots>
            </div>
            </div>
                <!-- Card -->
            <div class="flex items-center p-4 bg-white rounded-lg shadow-md">
                <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                </div>
                <div>
                    <p class="mb-2 text-sm font-medium text-gray-600">
                    Total vendors
                    </p>
                    <LoadingDots :isActive="state.isPageLoading" class="ml-2">
                        <p class="text-lg font-semibold text-gray-700">
                        {{ state.totalVendors ? state.totalVendors : '-' }}
                        </p>
                    </LoadingDots>
                </div>
            </div>
        </div>
        <div class="mx-3">
            <UiExpenseLatest></UiExpenseLatest>
        </div>
    </div>
</template>
<script setup>
import { dashboardService } from '@/components/api/Dashboard';

const state = reactive({
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
        const response = await dashboardService.getFinance()
        state.totalExpenses = response.data.totalExpenses
        state.totalPettyCash = response.data.totalPettyCash
        state.totalVendors = response.data.totalVendors
    }catch(error){

    }
    state.isPageLoading = false
}
</script>