<template>
    <div>
        <div class="py-2 px-4">
            <FormTextField name="searchfield" placeholder="Search here" v-model="state.searchString"></FormTextField>
        </div>
        <div class="flex flex-col my-3 mx-4 rounded-2xl">
            <div class="overflow-x-auto rounded-2xl">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden shadow-lg">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.mainList"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.mainList.data && state.mainList.data.length === 0))">
                                
                                <tr v-for="(data, index) in state.mainList.data" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3">
                                        <FormCheckBox :value="false"
                                            @click="addSelectedItem(data)" />
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.propertyname }} - {{ data.project.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right">
                                        {{ $formatAmount(data.monthlyrent) }}
                                    </td>
                                </tr>
                            </template>
                        </Table>
                        <Pagination @onPageChanged="onPageChanged" :isLoading="state.isPageLoading" :data="state.mainList" :currentPage="state.currentPage"></Pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4">
            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            <div class="flex flex-row-reverse">
                <FormButton buttonStyle="primary" class="text-sm" @click="submit">Submit</FormButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, watch } from 'vue';
import { projectService } from '@/components/api/ProjectService'
import { useSearchStore } from '@/store/search';

const searchStore = useSearchStore()

const emit = defineEmits(['modalClose'])

const state = reactive({
    mainList: [],
    error: '',
    searchString: '',
    currentPage: 1,
    isPageLoading: false,
    columnHeaders: [
                { name: '', width: '40'},
                { name: 'Building/Unit'},
                { name: 'Monthly Rent', width: '30%', textAlign: 'center'}
            ],
    selectedItems: []
})

onMounted(() => {
    fetchData()
})

watch(() => state.searchString, async () =>{
    await fetchData();
})

async function fetchData(){
    state.isPageLoading = true
    try{
        const response = await projectService.GetAvailableRentalUnits(state.currentPage, state.searchString)
        state.mainList = response.data
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
    removeObjectWithId(item.propertyid)
    if(itemCount == state.selectedItems.length){
        state.selectedItems.push(item)
    }
}
function removeObjectWithId(id) {
  const objWithIdIndex = state.selectedItems.findIndex((obj) => obj.propertyid === id);

  if (objWithIdIndex > -1) {
    state.selectedItems.splice(objWithIdIndex, 1);
  }
}

function submit(){
    if(state.selectedItems && state.selectedItems.length > 0){
        searchStore.setSelectedData(state.selectedItems)
        emit('modalClose', true)
    }
    else
        state.error = "Please select record."
}

</script>