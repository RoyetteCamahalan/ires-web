<template>
    <div>
        <NuxtLayout name="admin" title="Petty Cash">
            <div class="p-3 h-screen bg-gray-50">
                <div class="m-2 py-1 px-2 shadow-lg bg-white rounded-lg">
                    <div class="flex justify-between my-auto">
                        <button class="text-gray-500" @click="navigateTo('/masterfiles/offices')">
                            <Icon name="material-symbols:arrow-back-ios"></Icon>
                            Back
                        </button>
                        <div class="flex-1 flex flex-row-reverse items-center">
                            <MenuPopOver icon-name="material-symbols:settings" :has-icon="true" position="right-0">
                                <button
                                    @click="state.recompute = !state.recompute"
                                    class="group flex justify-between w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    ReCompute History
                                </button>
                            </MenuPopOver>
                            <span class="ml-1"></span>
                            <MenuPopOver icon-name="material-symbols:print" :has-icon="true" position="right-0">
                                <button
                                    @click="print"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
                                    Print
                                </button>
                            </MenuPopOver>
                            <div class="my-auto mr-1 hidden sm:flex">
                                <FormLabel label="From" class="mr-2"></FormLabel>
                                <div class="w-30">
                                    <FormDateField name="startdate" placeholder="Start Date" class="my-auto py-1"
                                        v-model="state.startDate"></FormDateField>
                                </div>
                                <FormLabel label="To" class="mr-2 ml-0 sm:ml-2"></FormLabel>
                                <div class="w-30">
                                    <FormDateField name="enddate" placeholder="Start Date" class="py-1"
                                        v-model="state.endDate"></FormDateField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sm:hidden">
                        <div class="flex">
                            <FormLabel label="From" class="mr-2"></FormLabel>
                            <FormDateField name="startdate" placeholder="Start Date" class="my-auto py-1"
                                v-model="state.startDate"></FormDateField>
                        </div>
                        <div class="flex my-1">
                            <FormLabel label="To" class="mr-2"></FormLabel>
                            <FormDateField name="enddate" placeholder="Start Date" class="py-1"
                                            v-model="state.endDate"></FormDateField>
                        </div>
                    </div>
                </div>
                <ReportsPettycashAccountHistory :officeID="officeID" :startDate="state.startDate" :endDate="state.endDate" :recompute="state.recompute"></ReportsPettycashAccountHistory>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
import { usePettyCashStore } from '@/store/pettycash'
import moment from 'moment';

const route = useRoute()
const officeID = route.query.ref ? Number(route.query.ref) : 0

const pettycashStore = usePettyCashStore()

const currentDate = new Date();
const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const state = reactive({
    recompute: false,
    startDate: moment(firstDay).format('YYYY-MM-DD'),
    endDate: moment(currentDate).format('YYYY-MM-DD'),
})

function print(){
    pettycashStore.setDateRange(state.startDate, state.endDate)
    window.open('/pettycash/print/accountHistory?ref=' + officeID, '_blank')
}
</script>