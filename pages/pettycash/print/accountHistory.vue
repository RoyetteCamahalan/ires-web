<template>
    <div>
        <div class="p-3 h-screen bg-gray-50">
            <ReportsHeader></ReportsHeader>
            <ReportsPettycashAccountHistory :isPrint="true" :officeID="officeID" :startDate="state.startDate" :endDate="state.endDate"></ReportsPettycashAccountHistory>
        </div>
    </div>
</template>

<script setup>
import { usePettyCashStore } from '@/store/pettycash'
import moment from 'moment';

const route = useRoute()
const officeID = route.query.ref ? Number(route.query.ref) : 0

const pettycashStore = usePettyCashStore()


const state = reactive({
    startDate: moment(pettycashStore.getStartDate).format('YYYY-MM-DD'),
    endDate: moment(pettycashStore.getEndDate).format('YYYY-MM-DD'),
})
</script>