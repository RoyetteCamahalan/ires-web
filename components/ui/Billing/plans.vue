<template>
    <div>
        <div class="p-2 mt-3 mx-4 font-semibold text-blue-600">
            My Plans
        </div>
        <div class="flex flex-col mb-3 mx-4 rounded-2xl shadow-xl shadow-gray-200">
            <div class="inline-block min-w-full align-middle">
                <div class="rounded-2xl shadow-lg bg-white">
                    <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.plans.data"
                        class="w-full whitespace-no-wrap">
                        
                        <template #body
                            v-if="!(state.isPageLoading || (state.plans.data && state.plans.data.length === 0))">
                            
                            <tr v-for="(plan, index) in state.plans.data" :key="index" class="text-gray-700">
                                <td class="px-4 py-3">
                                    <div class="flex">
                                        <p class="underline font-semibold">{{ plan.subscriptionPlan.name }}</p>
                                        <button v-if="state.currentPlanID < 2" class="ml-2 px-2 py-1 text-xs bg-purple-600 text-white rounded-lg" @click="state.showPlanUpgrade = true">Upgrade</button>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <p>Storage: {{ plan.storage }}/{{ plan.subscriptionPlan.storage }} MB</p>
                                    <p>Survey Limit: Unlimited</p>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ moment(plan.subscriptionexpiry).format('YYYY-MM-DD') }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <div class="relative inline-block">
                                        <Menu as="div" class="relative inline-block text-left">
                                        <div>
                                            <MenuButton
                                            class="flex items-center justify-between px-2 py-2 leading-5 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                            > 
                                                {{ plan.billingcycle === 1 ? 'Monthly' : 'Yearly' }}
                                                <Icon name="material-symbols:edit" class="ml-2 w-4 h-4 text-purple-600"></Icon>
                                            </MenuButton>
                                        </div>

                                        <transition
                                            enter-active-class="transition duration-100 ease-out"
                                            enter-from-class="transform scale-95 opacity-0"
                                            enter-to-class="transform scale-100 opacity-100"
                                            leave-active-class="transition duration-75 ease-in"
                                            leave-from-class="transform scale-100 opacity-100"
                                            leave-to-class="transform scale-95 opacity-0"
                                        >
                                            <MenuItems
                                            class="absolute right-0 z-10 mt-1 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                            <div class="px-1 py-1">
                                                <MenuItem>
                                                    <button
                                                        @click="updateCycle(plan, 1)"
                                                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                        <Icon v-if="plan.billingcycle === 1" name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-purple-600 mr-2"></Icon>
                                                        Monthly
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        @click="updateCycle(plan, 2)"
                                                        class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                                        <Icon v-if="plan.billingcycle === 2" name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-purple-600 mr-2"></Icon>
                                                        Yearly
                                                    </button>
                                                </MenuItem>
                                            </div>
                                            </MenuItems>
                                        </transition>
                                        </Menu>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm text-right">
                                    {{ $formatAmount(plan.amount) }}
                                </td>
                                <td class="px-4 py-3 text-xs">
                                    <span v-if="plan.isexpired" class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Expired</span>
                                    <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Active</span>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
        <ModalEmpty :isShow="state.showPlanUpgrade">
            <LoadingSpinner :isActive="state.isUpgrading">
                <LandingPlanupgrade :currentPlanID="state.currentPlanID" @upgradePlan="upgradePlan"></LandingPlanupgrade>
            </LoadingSpinner>
        </ModalEmpty>
    </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { billingService } from '@/components/api/BillingService'
import { useUserStore } from '@/store/user';
import moment from 'moment';

const { $toastNotification } = useNuxtApp()

const userStore = useUserStore()
const user = userStore.getUser

const state = reactive({
    plans: [],
    error: '',
    isPageLoading: false,
    columnHeaders: [
        { name: 'Plan'},
        { name: 'Description'},
        { name: 'Expiry'},
        { name: 'Billing Cycle'},
        { name: 'Total'},
        { name: 'Status'}
    ],
    currentPlanID: 0,
    showPlanUpgrade: false,
    isUpgrading: false,
    isexpired: false,
    
})
onMounted(() =>{
    getPlans()
})

async function getPlans(){
    state.isPageLoading = true
    try{
        const response = await billingService.getPlans()
        state.plans = response.data
        if(state.plans.data && state.plans.data.length > 0){
            state.currentPlanID = state.plans.data[0].planid
            if(state.plans.data[0].isexpired != user.company.isexpired){
                userStore.resetUser()
                navigateTo('/login')
            }
        }
    }catch(error){
        state.error = error
    }
    state.isPageLoading = false
}

async function updateCycle(plan, billingcycle){
    if(plan.billingcycle != billingcycle){
        state.isPageLoading = true
        try{
            const params = {
                id: plan.id,
                billingcycle: billingcycle
            }
            const response = await billingService.updateBillingCycle(params)
            plan.billingcycle = billingcycle
            console.log(response)
        }catch(error){
            state.error = error
        }
        state.isPageLoading = false
    }
}

async function upgradePlan(planID){
    console.log(planID)
    if(planID == 0)
        state.showPlanUpgrade = false
    else if(planID > state.currentPlanID){
        state.isUpgrading = true
        try{
            const params = {
                planid: planID
            }
            await billingService.upgradePlan(params)
            $toastNotification('success', '', 'Plan has been updated. We will email you when bill is available. Thank you!')
            getPlans()
        }catch(error){
            $toastNotification('error', '', error.message)
        }
        state.isUpgrading = false
        state.showPlanUpgrade = false
    }
}
</script>