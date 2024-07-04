<template>
    
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
              <NavigationBack url="/payments"></NavigationBack>
              <div class="grid grid-cols-8 gap-2 p-3 mb-3 rounded-lg bg-white border">
                  <div class="col-span-8 sm:col-span-4">
                      <FormLabel for="client" label="Client" />
                      <FormSelectClient v-model="state.payment.custid"></FormSelectClient>
                        <FormError :error="v$.payment.custid && v$.payment.custid.$errors && v$.payment.custid.$errors.length > 0 ? v$.payment.custid.$errors[0].$message : null "/>
                  </div>
                  <div class="col-span-8 sm:col-span-2">
                        <FormLabel for="paymentdate" label="Date"/>
                        <FormDateField name="paymentdate" placeholder="Payment" v-model="state.payment.paymentdate"/>
                  </div>
                  <div class="col-span-8 sm:col-span-2">
                        <FormLabel for="paymentdate" label="CM Type"/>
                        <FormSelectCmtypes v-model="state.payment.creditmemotypeid"></FormSelectCmtypes>
                        <FormError :error="v$.payment.creditmemotypeid && v$.payment.creditmemotypeid.$errors && v$.payment.creditmemotypeid.$errors.length > 0 ? v$.payment.creditmemotypeid.$errors[0].$message : null "/>
                  </div>
                  <div class="col-span-8">
                    <FormLabel for="remarks" label="Remarks"/>
                    <FormTextField name="remarks" placeholder="Remarks" v-model="state.payment.remarks"></FormTextField>
                  </div>
              </div>
              
              <div class="flex flex-col mt-2">
                  <div class="w-full flex flex-row-reverse">
                      <button type="button" class="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                          @click="addNew">
                          <Icon name="material-symbols:add" class="-ml-1 w-5 h-5"></Icon>
                          Add New
                      </button>
                  </div>
              </div>
              
              <div class="flex flex-col my-3 mt-1 shadow-gray-200">
                  <div class="inline-block min-w-full align-middle">
                      <div class="rounded-2xl shadow-lg bg-white">
                          <Table :columnHeaders="state.columnHeaders" :isLoading="false" :data="state.payment.payables"
                              class="w-full whitespace-no-wrap">
                              
                              <template #body
                                  v-if="!(state.payment.payables && state.payment.payables.length === 0)">
                                  
                                  <tr v-for="(payable, index) in state.payment.payables" :key="index" class="text-gray-700">
                                      <td class="px-4 py-3 text-sm">
                                          {{ payable.description }}
                                      </td>
                                      <td class="px-4 py-3 text-sm text-right">
                                          {{ $formatAmount(payable.grossAmount) }}
                                      </td>
                                      <td class="px-4 py-3 text-sm text-right">
                                          {{ $formatAmount(payable.balance) }}
                                      </td>
                                      <td class="pl-4 py-3 text-sm text-right">
                                          <FormNumberField name="paymentamount" placeholder="Payment" class="text-right" v-model="payable.paymentAmount"></FormNumberField>
                                          <FormError :error="payable.paymentAmount > payable.balance || payable.paymentAmount <= 0 ? 'Invalid input' : null "/>
                                      </td>
                                      <td class="p-4 py-3">
                                          <button type="button" @click="removeItem(payable)">
                                            <Icon name="material-symbols:delete" class="w-6 h-6 text-red-600"/>
                                          </button>
                                      </td>
                                  </tr>
                                  <tr class="text-gray-700">
                                    <td class="px-4 py-3 text-sm text-right font-semibold" colspan="3">
                                      Total Payment:
                                    </td>
                                    <td class="px-4 py-3 text-sm text-right font-semibold">
                                      {{ $formatAmount(totalPayment) }}
                                    </td>
                                    <td class="p-4 py-3"></td>
                                  </tr>
                              </template>
                          </Table>
                      </div>
                  </div>
              </div>
          </div>
          <NavigationBottomsave returnURL="/payments" @onSave="submit"></NavigationBottomsave>
        </LoadingSpinner>
        
        <Modal title="Search Payables" :isShow="state.modalShow" @modalClose="modalClose">
          <SearchPayables searchType="payables" :clientID="state.payment.custid" @modalClose="modalClose"></SearchPayables>
        </Modal>
    </div>
</template>
<script setup>
import { reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers, numeric, requiredIf } from '@vuelidate/validators'
import { useSearchStore } from '@/store/search';
import { useUserStore } from '@/store/user'
import moment from 'moment'
import { paymentService } from '~~/components/api/PaymentService'
import { paymentMode } from '~~/contants/consts';

const { $toastNotification } = useNuxtApp()

const currentDate = new Date();
const searchStore = useSearchStore()
const user = useUserStore().getUser

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
    paymentid: 0,
    companyid: user.companyid,
    paymentdate: moment(currentDate).format('YYYY-MM-DD'),
    custid: 0,
    encodedby: user.employeeid,
    orno: 0,
    receipttype: 1,
    totalamount: null,
    transtype: 'CN',
    paidby: '',
    remarks: '',
    payables: [],
    paymentmode: 0,
    creditmemotypeid: null,
  },
  columnHeaders: [
                { name: 'Particulars'},
                { name: 'Amount', width: '20%', textAlign: 'center'},
                { name: 'Balance', width: '20%', textAlign: 'center'},
                { name: 'CM Amount', width: '20%', textAlign: 'center'},
                { name: '', width: '28'},
            ],
})

const validators = computed(() =>{
  return {
    payment: {
      custid: { 
        required: helpers.withMessage('This field is required.', required),
        minValue: helpers.withMessage('This field is required.', minValue(1)) 
      },
      creditmemotypeid: { 
        required: helpers.withMessage('This field is required.', required),
      },
    }
  }
})



const v$ = useVuelidate(validators, state)

onMounted(() =>{
  searchStore.resetSelectedData
})
watch(() => state.payment.custid, async (newValue) => {
  state.payment.payables = []
})
watch(() => state.payment.receipttype, async (newValue) => {
    if (newValue != null) {
        state.isReceiptLoading = true
        try{
          const response = await paymentService.getReceiptNo(newValue)
          state.payment.orno = response.data
        }
        catch{}
        state.isReceiptLoading = false
    }
})
watch(() => state.payment.paymentmode, async (newValue) => {
    state.payment.bankTransfer.bankid = 0
    state.payment.paymentCheckRequestDto.bankid = 0
})

const totalPayment = computed(() =>{
  return state.payment.payables.reduce( (Sum, payable) => payable.paymentAmount + Sum,0)
})

function modalClose(value){
  state.modalShow = false
  if(value && searchStore.getSelectedData && searchStore.getSelectedData.length > 0){
    searchStore.getSelectedData.forEach(data => {
      if(removeItem(data, false) < 0){
        data.paymentAmount = data.balance
        state.payment.payables.push(data)
      }
    });
  }
}

function addNew(){
  if(state.payment.custid > 0){
    searchStore.resetSelectedData
    state.modalShow = true
  }
  else
    $toastNotification('error', '', 'No selected client')
}

function removeItem(item, remove = true) {
  const objWithIdIndex = state.payment.payables.findIndex((obj) => obj.payableID === item.payableID && obj.payableType === item.payableType);

  if (objWithIdIndex > -1 && remove) {
    state.payment.payables.splice(objWithIdIndex, 1);
  }
  return objWithIdIndex
}

function validatePayables(){
  let isValid = true
  state.payment.payables.forEach(payable => {
    if(payable.paymentAmount <= 0 || payable.balance < payable.paymentAmount)
      isValid = false
  });
  return isValid
}

async function submit(){
  v$.value.$validate()
  let isValid = !v$.value.$error
  if(totalPayment.value <= 0 || state.payment.payables.length === 0){
    isValid = false
    $toastNotification('error', '', 'No payables added')
  }
  else if(!validatePayables())
    isValid = false

  if(isValid){
    state.payment.totalamount = totalPayment.value
    state.isPageLoading = true
    try{
      const response = await paymentService.create(state.payment)
      navigateTo('/creditmemo')
    }
    catch(error){
      state.error = error.message
    }
    state.isPageLoading = false
  }
}
  
  </script>