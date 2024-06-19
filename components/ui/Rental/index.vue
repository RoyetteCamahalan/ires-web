<template>
    <div>
        <div id="divPrint" class="mx-2 mt-3 p-3" :class="!props.isPrint && 'shadow-lg bg-white rounded-lg'">
            <div class="mt-2 text-lg font-semibold text-center">
                {{ props.headerText }}
            </div>
            <div class="mt-2 flex justify-between">
                <div class="flex flex-col">
                    <div class="font-semibold">
                        Client:
                    </div>
                    <div class="text-sm">
                        <p class="font-semibold">
                            {{ props.contract.client.fullname}}
                        </p>
                        <p>
                            {{  props.contract.client.address }}
                        </p>
                    </div>
                    <span class="text-sm">Monthly Rent: {{ $formatAmount(props.contract.montlyrent) }}</span>
                    <span class="text-sm">Advance Rent: ({{ props.contract.noofmonthadvance }}) {{ $formatAmount(props.contract.advancerent) }}</span>
                    <span class="text-sm">Deposit: {{ $formatAmount(props.contract.deposit) }}</span>
                </div>
                <div class="flex flex-col text-right">
                    <span class="text-md font-semibold">{{ 'Contract #' + props.contract.contractno }}</span>
                    <span class="text-sm">Contract Date: {{ moment(props.contract.contractdate).format('MM/DD/YYYY') }}</span>
                    <span class="text-sm">Billing Start: {{ moment(props.contract.billingstart).format('MM/DD/YYYY') }}</span>
                    <span class="text-sm">Term: {{ (props.contract.term && props.contract.term > 0) ? (props.contract.term + ' Months') : 'Open' }}</span>
                    <span class="text-sm">Status: 
                                        <span v-if="props.contract.status === rentalContractStatus.active" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Active</span>
                                        <span v-else class="px-2 py-0.5 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Inactive</span></span>
                </div>
            </div>
            <div>
                <p class="text-sm">
                    Property: {{  props.contract.propertyList }}
                </p>
            </div>
            <div class="w-full my-4 overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
                <table class="w-full whitespace-no-wrap">
                    <thead>
                        <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="p-2">Date</th>
                        <th class="p-2">Ref</th>
                        <th class="p-2">Particular</th>
                        <th class="p-2 text-center">Penalty</th>
                        <th class="p-2 text-center">Debit</th>
                        <th class="p-2 text-center">Credit</th>
                        <th class="p-2 text-center">Running Balance</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr v-for="(data, index) in props.accountHistory" :key="index" class="text-gray-700 dark:text-gray-400">
                            <td class="p-2 text-sm">
                                <span v-if="data.seq === 25" class="font-semibold">
                                    Other Charges
                                </span>
                                <span v-else>
                                    {{ data.paymentdate ? moment(data.paymentdate).format('YYYY/MM/DD') : '' }}
                                </span>
                            </td>
                            <td class="p-2 text-sm">
                                {{ data.refno }}
                            </td>
                            <td class="p-2 text-sm">
                                <button
                                    v-if="data.seq == 30 && !props.isPrint && !data.refno"
                                    @click="$emit('onEdit', data.chargeid)"
                                    class="text-sm font-medium leading-5 text-blue-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" 
                                    aria-label="Edit">
                                    <Icon name="material-symbols:edit-outline" class="w-4 h-4"></Icon>
                                </button>
                                {{ data.particular }}
                            </td>
                            <td class="p-2 text-sm">
                                {{ (data.penalty && data.penalty > 0) ? $formatAmount(data.penalty) : '' }}
                            </td>
                            <td class="p-2 text-sm text-right">
                                {{ (data.debit && data.debit > 0) ? $formatAmount(data.debit) : '' }}
                            </td>
                            <td class="p-2 text-sm text-right">
                                {{ (data.credit && data.credit > 0) ? $formatAmount(data.credit) : '' }}
                            </td>
                            <td class="p-2 text-sm text-right">
                                {{ (data.runningbalance && data.runningbalance > 0) ? $formatAmount(data.runningbalance) : '' }}
                            </td>
                        </tr>
                        <tr class="text-gray-700">
                            <td class="p-2 text-sm text-right font-semibold" colspan="6">
                                Total Balance:
                            </td>
                            <td class="p-2 text-sm text-right font-semibold">
                                {{ $formatAmount(props.contract.totalbalance) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <div class="grid grid-cols-12 gap-4 pb-4">
                <!-- <div class="col-span-8 mx-2 flex flex-col">
                    <span class="text-sm font-semibold">Received By</span>
                    <div class="flex ml-4 mt-4">
                        <div class="text-sm text-center">
                            <p class="px-2 border-b-2">{{ state.payment.createdBy.firstname + ' ' + state.payment.createdBy.lastname}}</p>
                            <p>{{ state.payment.createdBy.designation }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-4 mx-2 flex flex-col">
                    <span class="text-sm font-semibold">Conformed By</span>
                    <div class="flex ml-4 mt-4">
                        <div class="text-sm text-center">
                            <p class="px-2 border-b-2">{{ (state.payment.paidby && state.payment.paidby != '') ? state.payment.paidby : state.payment.client.fname + ' ' + state.payment.client.lname }}</p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { rentalService } from '@/components/api/RentalService';
import { rentalContractStatus } from '@/contants/consts'
import moment from 'moment'

const emit = defineEmits(['onEdit'])

const props = defineProps({
    contractID:{
        type: Number,
        required: true
    },
    isPrint:{
        type: Boolean,
        required: false,
        default: false
    },
    contract:{
        type: Object,
        required: true,
    },
    accountHistory:{
        type: Object,
        required: false,
        default: []
    },
    headerText:{
        type: String,
        required: false,
        default: 'Contract Management'
    }
})

</script>