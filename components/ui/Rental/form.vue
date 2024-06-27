<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
                <NavigationBack url="/rentals"></NavigationBack>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-6">
                        <FormLabel for="client" label="Client" />
                        <div class="relative">
                          <FormSelectClient :default-option="state.client" v-model="state.contract.custid" class="pr-16"></FormSelectClient>
                            <button 
                                @click="state.isShowClientModal = true"
                                class="absolute inset-y-0 right-0 px-3 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700">
                                Create
                            </button>
                        </div>
                        <FormError :error="v$.contract.custid && v$.contract.custid.$errors && v$.contract.custid.$errors.length > 0 ? v$.contract.custid.$errors[0].$message : null "/>
  
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="contractdate" label="Contract Date" />
                        <FormDateField name="contractdate" placeholder="Contract Date" v-model="state.contract.contractdate" />
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="billingsched" label="Billing Schedule (Every nth of the month)" />
                        <FormSelect :options="state.daysOfMonth" v-model="state.contract.billingsched"></FormSelect>
                        <FormError :error="v$.contract.billingsched && v$.contract.billingsched.$errors && v$.contract.billingsched.$errors.length > 0 ? v$.contract.billingsched.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <div class="flex items-center">
                          <FormLabel for="term" label="Contract Term (# of Months)"/>
                          <FormCheckBox class="ml-3" v-model="state.isContractOpen"></FormCheckBox>
                          <label class="text-xs text-blue-500">Open Contract</label>
                        </div>
                        <FormNumberField name="term" placeholder="# of Months" v-model="state.contract.term" :disabled="state.isContractOpen"/>
                        <FormError :error="v$.contract.term && v$.contract.term.$errors && v$.contract.term.$errors.length > 0 ? v$.contract.term.$errors[0].$message : null "/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="monthlyrent" label="Monthly Rent"/>
                        <FormNumberField name="monthlyrent" placeholder="Monthly Rent" v-model="state.contract.montlyrent"/>
                        <FormError :error="v$.contract.montlyrent && v$.contract.montlyrent.$errors && v$.contract.montlyrent.$errors.length > 0 ? v$.contract.montlyrent.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="deposit" label="Deposit Amount"/>
                        <FormNumberField name="deposit" placeholder="Deposit Amount" v-model="state.contract.deposit"/>
                        <FormError :error="v$.contract.deposit && v$.contract.deposit.$errors && v$.contract.deposit.$errors.length > 0 ? v$.contract.deposit.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="" label="Advance Rent (# of Months)" />
                        <FormNumberField name="noofmonthadvance" placeholder="Advance Rent % (e.g. 2 months)" v-model="state.contract.noofmonthadvance"/>
                        <FormError :error="v$.contract.noofmonthadvance && v$.contract.noofmonthadvance.$errors && v$.contract.noofmonthadvance.$errors.length > 0 ? v$.contract.noofmonthadvance.$errors[0].$message : null "/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="monthlypenaltypercentage" label="Monthly Penalty %" />
                        <FormNumberField name="monthlypenaltypercentage" placeholder="Monthly Penalty % (e.g. 3)" v-model="state.contract.monthlypenalty"/>
                        <FormError :error="v$.contract.monthlypenalty && v$.contract.monthlypenalty.$errors && v$.contract.monthlypenalty.$errors.length > 0 ? v$.contract.monthlypenalty.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="penaltyextension" label="Penalty Extension (# of days)" />
                        <FormNumberField name="penaltyextension" placeholder="Penalty Extension (e.g. 10)" v-model="state.contract.penaltyextension"/>
                        <FormError :error="v$.contract.penaltyextension && v$.contract.penaltyextension.$errors && v$.contract.penaltyextension.$errors.length > 0 ? v$.contract.penaltyextension.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="remarks" label="Remarks" />
                        <FormTextField name="remarks" placeholder="Remarks" v-model="state.contract.remarks"/>
                        <FormError :error="v$.contract.remarks && v$.contract.remarks.$errors && v$.contract.remarks.$errors.length > 0 ? v$.contract.remarks.$errors[0].$message : null "/>
                    </div>
                </div>
                <div class="flex justify-between m-3 pt-2 border-t-2 border-blue-500">
                  <label class="text-sm font-semibold ml-2">List of Unit/Properties</label>
                  <button type="button" class="inline-flex items-center py-1 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            @click="state.isShowSearchUnitModal = true">
                            <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                            Add Unit
                        </button>
                    </div>
            <div class="flex flex-col mx-3 shadow-gray-200 rounded-lg shadow-md overflow-x-hidden">
                <div class="inline-block min-w-full align-middle">
                    <div class="w-full overflow-x-auto rounded-lg bg-white">
                        <Table :columnHeaders="state.columnHeaders" :isLoading="state.isPageLoading" :data="state.contract.rentalContractDetails"
                            class="w-full whitespace-no-wrap">
                            
                            <template #body
                                v-if="!(state.isPageLoading || (state.contract.rentalContractDetails && state.contract.rentalContractDetails.length === 0))">
                                
                                <tr v-for="(data, index) in state.contract.rentalContractDetails" :key="index" class="text-gray-700">
                                    <td class="px-4 py-3 text-sm">
                                      {{ data.rentalProperty.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                      {{ data.rentalProperty.project.propertyname }}
                                    </td>
                                    <td class="px-4 py-3 text-sm">
                                        {{ data.rentalProperty.area}}
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
            <UiClientForm @modalClose="CloseClientModal" :formStatusEdit="false" :selectedClientID="null"></UiClientForm>
        </Modal>
        <Modal title="Search Property/Unit" :isShow="state.isShowSearchUnitModal" @modalClose="CloseSearchUnitModal">
            <SearchAvailableUnits @modalClose="CloseSearchUnitModal"></SearchAvailableUnits>
        </Modal>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, requiredIf, minValue, helpers, numeric, integer } from '@vuelidate/validators'
  import { useRentalStore } from '@/store/rental'
  import { useSearchStore } from '@/store/search';
  import { rentalService } from '@/components/api/RentalService'

const { $toastNotification } = useNuxtApp()

  import moment from 'moment'
  
  const searchStore = useSearchStore()
        
  const selectedID = useRentalStore().getSelectedID
  const currentDate = new Date();
  const props = defineProps({
    isFormEdit:{
      type: Boolean,
      required: false,
      default: false   
    }
  })
  const state = reactive({
      returnURL: '/rentals',
      error: '',
      isPageLoading: false,
      isContractOpen: true,
      contract:{
          contractid: 0,
          custid: null,
          contractdate: moment(currentDate).format('YYYY-MM-DD'),
          billingsched: currentDate.getDay,
          montlyrent: null,
          term: null,
          monthlypenalty: null,
          penaltyextension: null,
          deposit: null,
          noofmonthadvance: null,
          remarks: '',
          rentalContractDetails: []
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
      isShowSearchUnitModal: false,
      daysOfMonth: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  })

  onMounted(() =>{
    if(props.isFormEdit)
        loadRecord()
  })

  async function loadRecord(){
    state.isPageLoading = true
    try{
      var response = await rentalService.getDetails(selectedID)
      console.log(response.data)
      state.contract.contractid = selectedID
      state.client = { value: response.data.custid, label: response.data.client.fname + ' ' + response.data.client.lname }
      state.contract.custid = response.data.custid
      state.contract.contractdate = moment(response.data.contractdate).format('YYYY-MM-DD')
      state.contract.billingsched = response.data.billingsched
      state.contract.term = response.data.term
      state.isContractOpen = response.data.term === 0
      if(state.isContractOpen)
        state.contract.term = null
      state.contract.remarks = response.data.remarks
      state.contract.montlyrent = response.data.montlyrent
      state.contract.monthlypenalty = response.data.monthlypenalty === 0 ? null : response.data.monthlypenalty
      state.contract.penaltyextension = response.data.penaltyextension === 0 ? null : response.data.penaltyextension
      state.contract.deposit = response.data.deposit === 0 ? null : response.data.deposit
      state.contract.noofmonthadvance = response.data.noofmonthadvance === 0 ? null : response.data.noofmonthadvance
      response = await rentalService.getContractDetails(selectedID)
      state.contract.rentalContractDetails = response.data
      // state.rental.id = selectedID;
      // state.clients.push({ value: response.data.custid, label: response.data.client.fname + ' ' + response.data.client.lname })
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
  }

  watch(() => state.isContractOpen, async (newValue) => {
      if(state.isContractOpen){
          state.contract.term = 0
      }
  })
  
  const validators = computed(() =>{
    return {
      contract: {
        custid: { 
          required: helpers.withMessage('This field is required.', required),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        contractdate: { required: helpers.withMessage('This field is required.', required) },
        billingsched: { required: helpers.withMessage('This field is required.', required) },
        term: { required: helpers.withMessage('This field is required.', 
                        requiredIf(function() {
                             return !state.isContractOpen
                        })),
                        integer: helpers.withMessage('Invalid input.', integer)
              },
        montlyrent: { numeric: helpers.withMessage('Invalid input.', numeric),
          required: helpers.withMessage('Invalid input.', required) },
        penaltyextension: { integer: helpers.withMessage('Invalid input.', integer) }
      }
    }
  })
  
  const v$ = useVuelidate(validators, state)
  
  const CloseClientModal = (value, data) =>{
      state.isShowClientModal = false
      if(value)
      {
        state.contract.custid = data.custid;
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
            var data = {
              id: 0,
              propertyid: data.propertyid,
              rentalProperty: {
                propertyname: data.propertyname,
                area: data.area,
                project:{
                  propertyname: data.project.propertyname
                }
              }
            }
            state.contract.rentalContractDetails.push(data)
          }
        });
      }
  }

function removeItem(item, remove = true) {
  const objWithIdIndex = state.contract.rentalContractDetails.findIndex((obj) => obj.propertyid === item.propertyid);

  if (objWithIdIndex > -1 && remove) {
    state.contract.rentalContractDetails.splice(objWithIdIndex, 1);
  }
  return objWithIdIndex
}
  const submit = async () => {
    v$.value.$validate()
    var isValid = true
    if(!(state.contract.rentalContractDetails && state.contract.rentalContractDetails.length > 0)){
      isValid = false
      $toastNotification('error','','Please add unit/room')
    }
    if(!v$.value.$error && isValid){
        state.isPageLoading = true;
        try{
            console.log(state.contract)
            if(props.isFormEdit)
                await rentalService.update(state.contract)
            else
                await rentalService.create(state.contract)
            navigateTo('/rentals')
        }
        catch(error){
            state.error = error.message
        }
        state.isPageLoading = false;
    }
  }
  </script>
  