<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
                <NavigationBack url="/surveys"></NavigationBack>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="client" label="Client" />
                        <div class="relative">
                          <FormSelectClient :default-option="state.client" v-model="state.survey.custid" class="pr-16"></FormSelectClient>
                            <button 
                                @click="state.isShowClientModal = true"
                                class="absolute inset-y-0 right-0 px-3 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700">
                                Create
                            </button>
                        </div>
                        <FormError :error="v$.survey.custid && v$.survey.custid.$errors && v$.survey.custid.$errors.length > 0 ? v$.survey.custid.$errors[0].$message : null "/>
  
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="contractdate" label="Contract Date" />
                        <FormDateField name="contractdate" placeholder="Contract Date" v-model="state.survey.contractdate" />
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="contractdate" label="Billing Start Date" />
                        <FormDateField name="contractdate" placeholder="Contract Date" v-model="state.survey.billingstart" />
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <div class="flex items-center">
                          <FormLabel for="term" label="Contract Term (# of Months)"/>
                          <FormCheckBox class="ml-3" v-model="state.isContractOpen"></FormCheckBox>
                          <label class="text-xs text-blue-500">Open Contract</label>
                        </div>
                        <FormNumberField name="term" placeholder="# of Months" v-model="state.survey.term" :disabled="state.isContractOpen"/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="monthlyrent" label="Monthly Rent (Gross)"/>
                        <FormNumberField name="monthlyrent" placeholder="Monthly Rent" v-model="state.survey.monthlyrent"/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="monthlypenaltypercentage" label="Monthly Penalty %" />
                        <FormNumberField name="monthlypenaltypercentage" placeholder="Monthly Penalty % (e.g. 3)" v-model="state.survey.monthlyrent"/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="penaltyextension" label="Penalty Extension (# of days)" />
                        <FormNumberField name="penaltyextension" placeholder="Penalty Extension (e.g. 10)" v-model="state.survey.monthlyrent"/>
                    </div>
                </div>
                <div class="flex flex-row-reverse m-3">
                  <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            @click="state.isShowSearchUnitModal = true">
                            <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                            Add Unit
                        </button>
                    </div>
            <div class="flex flex-col mx-3 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.survey.properties"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.survey.properties && state.survey.properties.length === 0))">
                                
                                <tr v-for="(data, index) in state.survey.properties" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm">
                                      {{ data.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                      {{ data.project.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.area}}
                                    </td>
                                    <td class="px-4 py-3 text-center">
                                          <button type="button" @click="removeItem(data)">
                                            <Icon name="material-symbols:delete" class="w-5 h-5 text-red-600"/>
                                          </button>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                </div>
            </div>
                <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                
          </div>
          <NavigationBottomsave :returnURL="state.returnURL" @onSave="submit"></NavigationBottomsave>
        </LoadingSpinner>
        <Modal title="Add New Record" :isShow="state.isShowClientModal" @modalClose="CloseClientModal">
            <UiClientForm @modalClose="CloseClientModal" :formStatusEdit="0" :selectedClientID="null"></UiClientForm>
        </Modal>
        <Modal title="Search Property/Unit" :isShow="state.isShowSearchUnitModal" @modalClose="CloseSearchUnitModal">
            <SearchAvailableUnits @modalClose="CloseSearchUnitModal"></SearchAvailableUnits>
        </Modal>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minValue, helpers, numeric } from '@vuelidate/validators'
  import { surveyService } from '@/components/api/SurveyService'
  import { useUserStore } from '@/store/user'
  import { useSurveyStore } from '@/store/survey'
  import { useSearchStore } from '@/store/search';

const { $toastNotification } = useNuxtApp()

  import moment from 'moment'
  
  const user = useUserStore().getUser
  const searchStore = useSearchStore()
        
  const selectedSurvey = useSurveyStore().getSelectedSurvey
  const currentDate = new Date();
  const props = defineProps({
    formStatus:{
      type: Number,
      required: false,
      default: 0   
    }
  })
  const state = reactive({
      returnURL: '/surveys',
      error: '',
      isPageLoading: false,
      isContractOpen: true,
      survey:{
          id: 0,
          companyid: user.companyid,
          custid: 0,
          propertyid: 0,
          contractdate: moment(currentDate).format('YYYY-MM-DD'),
          billingstart: moment(currentDate).format('YYYY-MM-DD'),
          monthlyrent: null,
          term: null,
          monthlypenalty: null,
          penaltyextension: null,
        //   propertyname: 'Ula Phase 1',
        //   address: 'Ula, Davao City',
        //   details: '1234 test',
          createdbyid: user.employeeid,
          updatedbyid: user.employeeid,
          properties: []
      },
    columnHeaders: [
        { name: 'Unit/Room'},
        { name: 'Property/Building'},
        { name: 'Area'},
        { name: ''}
    ],
      client: null,
      isClientLoading: false,
      isShowClientModal: false,
      isShowSearchUnitModal: false
  })

  onMounted(() =>{
    if(props.formStatus === 1)
        fetchSurvey()
  })

  async function fetchSurvey(){
    state.isPageLoading = true
    try{
      const response = await surveyService.getDetails(selectedSurvey)
      state.survey.id = selectedSurvey;
      state.clients.push({ value: response.data.custid, label: response.data.client.fname + ' ' + response.data.client.lname })
      state.survey.custid = response.data.custid
      state.survey.owner = response.data.owner
      state.survey.titleno = response.data.titleno
      state.survey.surveyno = response.data.surveyno
      state.survey.surveydate = moment(response.data.surveydate).format('YYYY-MM-DD')
      state.survey.propertyname = response.data.propertyname
      state.survey.address = response.data.address
      state.survey.details = response.data.details
      state.survey.monthlyrent = response.data.monthlyrent
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
  }

  watch(() => state.isContractOpen, async (newValue) => {
      if(state.isContractOpen){
          state.survey.term = 0
      }
  })
  
  const validators = computed(() =>{
    return {
      survey: {
        custid: { 
          required: helpers.withMessage('This field is required.', required),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        propertyname: { required: helpers.withMessage('This field is required.', required) },
        address: { required: helpers.withMessage('This field is required.', required) },
        monthlyrent: { numeric: helpers.withMessage('Invalid input.', numeric) },
        landarea: { 
          required: helpers.withMessage('This field is required.', required),
          numeric: helpers.withMessage('Invalid input.', numeric) },
      }
    }
  })
  
  const v$ = useVuelidate(validators, state)
  
  const CloseClientModal = (value, data) =>{
      state.isShowClientModal = false
      if(value)
      {
        state.survey.custid = data.custid;
        state.client = {
          value: data.custid,
          label: data.fname + ' ' + data.lname
        }
      }
  }
  const CloseSearchUnitModal = (value) =>{
      state.isShowSearchUnitModal = false
      if(value && searchStore.getSelectedData && searchStore.getSelectedData.length > 0){
        searchStore.getSelectedData.forEach(data => {
          if(removeItem(data, false) < 0){
            state.survey.properties.push(data)
          }
        });
      }
  }

function removeItem(item, remove = true) {
  const objWithIdIndex = state.survey.properties.findIndex((obj) => obj.propertyid === item.propertyid);

  if (objWithIdIndex > -1 && remove) {
    state.survey.properties.splice(objWithIdIndex, 1);
  }
  return objWithIdIndex
}
  const submit = async () => {
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true;
        try{
            console.log(state.survey)
            if(props.formStatus == 1)
                await surveyService.update(state.survey)
            else
                await surveyService.create(state.survey)
            navigateTo('/surveys')
        }
        catch(error){
            state.error = error.message
        }
        state.isPageLoading = false;
    }
  }
  </script>
  