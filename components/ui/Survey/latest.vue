<template>
    <div>
        <div class="flex flex-col my-2 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
            <div class="inline-block min-w-full align-middle overflow-hidden">
                <div class="w-full overflow-x-auto rounded-lg bg-white">
                    <div class="text-sm font-semibold text-gray-700 px-3 pt-3">Latest Surveys</div>
                    <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.surveys.data"
                        class="w-full whitespace-no-wrap">
                        
                        <template #body
                            v-if="!(state.isPageLoading || (state.surveys.data && state.surveys.data.length === 0))">
                            
                            <tr v-for="(data, index) in state.surveys.data" :key="index" class="text-gray-700">
                                <td class="px-4 py-3 text-sm">
                                    {{ data.client.fname + ' ' + data.client.lname }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.propertyname }}
                                </td>
                                <td class="px-4 py-3 text-sm text-center">
                                    {{ moment(data.surveydate).format('YYYY/MM/DD') }}
                                </td>
                                <td class="px-4 py-3 text-xs text-center">
                                    <span v-if="data.status === surveyStatus.pending" class="px-2 py-1 font-semibold leading-tight rounded-full text-gray-700 bg-gray-100">Pending</span>
                                    <span v-else-if="data.status === surveyStatus.surveyed" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Surveyed</span>
                                    <span v-else-if="data.status === surveyStatus.completed" class="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">Completed</span>
                                    <span v-else class="px-2 py-1 font-semibold leading-tight rounded-full text-red-700 bg-red-100">Cancelled</span>
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
import { surveyService } from '@/components/api/SurveyService'
import moment from 'moment'
import { surveyStatus } from '@/contants/consts'

const state = reactive({
    surveys: [],
    error: '',
    columnHeaders: [
        { name: 'Client Name'},
        { name: 'Property'},
        { name: 'Date', textAlign: 'center'},
        { name: 'Status', textAlign: 'center'},
    ],
})

const loadList = async (search) =>{
    state.isPageLoading = true
    try{
        const response = await surveyService.get(1, '')
        if(response.data.data.length > 5)
        response.data.data = response.data.data.slice(0, 5);
        state.surveys = response.data
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
onMounted(() =>{
    loadList('')
})
</script>
