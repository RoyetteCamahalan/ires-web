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
                                    <div>
                                        <p class="underline font-semibold">{{ plan.subscriptionPlan.name }}</p>
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
                                    <span class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">
                                        Active
                                    </span>
                                    <!-- <span class="px-2 py-1 font-semibold leading-tight rounded-full"
                                        :class="user.isactive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'">
                                        {{ user.isactive ? 'Active' : 'Inactive' }}
                                    </span> -->
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { billingService } from '~~/components/api/BillingService'
import moment from 'moment';

const state = reactive({
    plans: [],
    error: '',
    isPageLoading: false,
    columnHeaders: [
        { name: 'Plan'},
        { name: 'Description'},
        { name: 'Due Date'},
        { name: 'Billing Cycle'},
        { name: 'Total'},
        { name: 'Status'}
    ],
})
onMounted(() =>{
    getPlans()
})

async function getPlans(){
    state.isPageLoading = true
    try{
        const response = await billingService.getPlans()
        state.plans = response.data
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
</script>