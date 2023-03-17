<template>
    <div>
        <div class="py-2 px-4">
            <FormTextField name="searchfield" placeholder="Search here" v-model="state.searchString"></FormTextField>
        </div>
        <div class="flex flex-col my-3 mx-4 rounded-2xl">
            <div class="overflow-x-auto rounded-2xl">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden shadow-lg">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.payables"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.payables.data && state.payables.data.length === 0))">
                                
                                <tr v-for="(payable, index) in state.payables.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3">
                                        <FormCheckBox :value="false"
                                            @click="addSelectedItem(payable)" />
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ payable.description }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(payable.balance) }}
                                    </td>
                                </tr>
                            </template>
                        </Table>
                        <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.payables" :currentPage="state.currentPage"></Pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { paymentService } from '@/components/api/PaymentService'

const props = defineProps({
    searchType:{
        type: String,
        required: true
    },
    clientID:{
        type: Number,
        required: true
    }
})

const state = reactive({
    payables: [],
    error: '',
    searchString: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
                { name: '', width: '40'},
                { name: 'Particulars'},
                { name: 'Balance', width: '30%', textAlign: 'center'}
            ],
    selectedItems: []
})

onMounted(() => {
    fetchData()
})

async function fetchData(){
    state.isPageLoading = true
    try{
        const response = await paymentService.getPayables(props.clientID, state.currentPage, state.searchString)
        state.payables = response.data
    }catch(error){
        state.error =  error.message
    }
    state.isPageLoading = false
}

const onPageChanged = (value) => {
    state.currentPage = value
    fetchData('')
}

function addSelectedItem(item){
    const itemCount = state.selectedItems.length
    removeObjectWithId(item.payableID)
    if(itemCount == state.selectedItems.length)
        state.selectedItems.push(item)
    console.log(state.selectedItems)
}
function removeObjectWithId(id) {
  const objWithIdIndex = state.selectedItems.findIndex((obj) => obj.payableID === id);

  if (objWithIdIndex > -1) {
    state.selectedItems.splice(objWithIdIndex, 1);
  }
}

</script>