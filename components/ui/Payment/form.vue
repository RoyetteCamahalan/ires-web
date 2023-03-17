<template>
    
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
              <div class="grid grid-cols-6 gap-4">
                  <div class="col-span-6 sm:col-span-3">
                      <FormLabel for="client" label="Client" />
                      <Multiselect v-on:search-change="searchClient" 
                        :searchable="true" 
                        :options="state.clients" 
                        :loading="state.isClientLoading"
                        v-model="state.payment.custid"
                        noOptionsText="Type to search clients"
                        class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"></Multiselect>
                        <FormError :error="v$.payment.custid && v$.payment.custid.$errors && v$.payment.custid.$errors.length > 0 ? v$.payment.custid.$errors[0].$message : null "/>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                      <FormLabel for="paymentdate" label="Payment Date"/>
                      <FormDateField name="paymentdate" placeholder="Date of Survey" v-model="state.payment.paymentdate"/>
                  </div>
              </div>
          </div>
        </LoadingSpinner>
        
        <Modal title="Search Payables" :isShow="state.modalShow" @modalClose="modalClose">
          <SearchPayables searchType="payables" :clientID="state.payment.custid"></SearchPayables>
        </Modal>
    </div>
</template>
<script setup>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers, numeric } from '@vuelidate/validators'
import { clientService } from '@/components/api/ClientService'
import moment from 'moment'

const currentDate = new Date();

const props = defineProps({
    formStatus:{
      type: Number,
      required: false,
      default: 0   
    }
  })

const state = reactive({
  isPageLoading: false,
  modalShow: false,
  payment:{
    custid: 0,
    paymentdate: moment(currentDate).format('YYYY-MM-DD'),
  },
  clients:[],
  isClientLoading: false
})

const validators = computed(() =>{
  return {
    payment: {
      custid: { 
        required: helpers.withMessage('This field is required.', required),
        minValue: helpers.withMessage('This field is required.', minValue(1)) 
      },
    }
  }
})

const v$ = useVuelidate(validators, state)

function modalClose(){
  state.modalShow = false
}

const searchClient = async (query) =>{
  state.isClientLoading = true
  try{
    const response = await clientService.get(1,query)
    state.clients = []
    response.data.data.forEach(element => {
      state.clients.push({ value: element.custid, label: element.fname + ' ' + element.lname })
    });
  }catch(error){
    state.clients = []
  }
  state.isClientLoading = false
}
  
  </script>