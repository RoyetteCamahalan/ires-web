<template>
    
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
              <div class="grid grid-cols-6 gap-4 p-3 mb-3 rounded-lg bg-white border">
                  <div class="col-span-6 sm:col-span-4">
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
                  <div class="col-span-6 sm:col-span-2">
                        <FormLabel for="paymentdate" label="Payment Date"/>
                        <FormDateField name="paymentdate" placeholder="Payment" v-model="state.payment.paymentdate"/>
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
              <div class="flex flex-col mb-3 mt-1 rounded-lg border">
                  <div class="overflow-x-auto rounded-lg">
                      <div class="inline-block min-w-full align-middle">
                          <div class="overflow-hidden shadow-lg">
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
              <div class="flex flex-col p-3 mb-3 rounded-lg bg-white border">
                  <div class="text-sm font-semibold">
                    Payment Details
                  </div>
                  <div class="grid grid-cols-6 gap-4">
                      <div class="col-span-6 sm:col-span-4">
                            <FormLabel for="paymentmode" label="Payment Mode" />
                            <FormSelect :options="state.paymentModes" :searchable="false" :canClear="false" v-model="state.payment.paymentmode"></FormSelect>
                            <div v-if="state.payment.paymentmode === 1">
                              
                              <FormLabel for="checkbank" label="Bank" />
                              <Multiselect v-on:search-change="searchBanks" 
                                :searchable="true" 
                                :options="state.banks" 
                                :loading="state.isBankLoading"
                                v-model="state.payment.paymentCheckRequestDto.bankid"
                                noOptionsText="Type to search banks"
                                class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"></Multiselect>
                              <FormError :error="vCheck$.payment.paymentCheckRequestDto.bankid && vCheck$.payment.paymentCheckRequestDto.bankid.$errors && vCheck$.payment.paymentCheckRequestDto.bankid.$errors.length > 0 ? vCheck$.payment.paymentCheckRequestDto.bankid.$errors[0].$message : null "/>
                              
                              <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="checkno" label="Check No" />
                                  <FormTextField name="checkno" placeholder="Check No" v-model="state.payment.paymentCheckRequestDto.checkno"></FormTextField>
                                  <FormError :error="vCheck$.payment.paymentCheckRequestDto.checkno && vCheck$.payment.paymentCheckRequestDto.checkno.$errors && vCheck$.payment.paymentCheckRequestDto.checkno.$errors.length > 0 ? vCheck$.payment.paymentCheckRequestDto.checkno.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="checkdate" label="Check Date"/>
                                  <FormDateField name="checkdate" placeholder="Check Date" v-model="state.payment.paymentCheckRequestDto.checkdate"/>
                                </div>
                              </div>
                              <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="checkamount" label="Check Amount" />
                                  <FormNumberField name="checkamount" placeholder="Check Amount" v-model="state.payment.paymentCheckRequestDto.amount" class="text-right"></FormNumberField>
                                  <FormError :error="vCheck$.payment.paymentCheckRequestDto.amount && vCheck$.payment.paymentCheckRequestDto.amount.$errors && vCheck$.payment.paymentCheckRequestDto.amount.$errors.length > 0 ? vCheck$.payment.paymentCheckRequestDto.amount.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="accno" label="Account #"/>
                                  <FormTextField name="accno" placeholder="Account #" v-model="state.payment.paymentCheckRequestDto.accountnumber"></FormTextField>
                                </div>
                              </div>
                                
                            </div>
                            <div v-if="state.payment.paymentmode === 2">
                              <FormLabel for="banks" label="Bank" />
                              <Multiselect v-on:search-change="searchBanks" 
                                :searchable="true" 
                                :options="state.banks" 
                                :loading="state.isBankLoading"
                                v-model="state.payment.bankTransfer.bankid"
                                noOptionsText="Type to search banks"
                                class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"></Multiselect>
                              <FormError :error="vbankTransfer$.payment.bankTransfer.bankid && vbankTransfer$.payment.bankTransfer.bankid.$errors && vbankTransfer$.payment.bankTransfer.bankid.$errors.length > 0 ? vbankTransfer$.payment.bankTransfer.bankid.$errors[0].$message : null "/>
                            </div>
                            <div v-if="state.payment.paymentmode === 3">
                              <FormLabel for="wallets" label="Wallet" />
                              <Multiselect v-on:search-change="searchWallets" 
                                :searchable="true" 
                                :options="state.wallets" 
                                :loading="state.isWalletLoading"
                                v-model="state.payment.bankTransfer.bankid"
                                noOptionsText="Type to search wallets"
                                class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"></Multiselect>
                              <FormError :error="vbankTransfer$.payment.bankTransfer.bankid && vbankTransfer$.payment.bankTransfer.bankid.$errors && vbankTransfer$.payment.bankTransfer.bankid.$errors.length > 0 ? vbankTransfer$.payment.bankTransfer.bankid.$errors[0].$message : null "/>
                            </div>
                            <div v-if="state.payment.paymentmode === 2 || state.payment.paymentmode === 3">
                              <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="transdate" label="Transaction Date" />
                                  <FormDateField name="transdate" placeholder="Transaction Date" v-model="state.payment.bankTransfer.paymentdate"/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <FormLabel for="transferamount" label="Amount" />
                                  <FormNumberField name="transferamount" placeholder="Amount" v-model="state.payment.bankTransfer.amount" class="text-right"></FormNumberField>
                                  <FormError :error="vbankTransfer$.payment.bankTransfer.amount && vbankTransfer$.payment.bankTransfer.amount.$errors && vbankTransfer$.payment.bankTransfer.amount.$errors.length > 0 ? vbankTransfer$.payment.bankTransfer.amount.$errors[0].$message : null "/>
                                </div>
                              </div>
                              <FormLabel for="refno" label="Reference #"/>
                              <FormTextField name="refno" placeholder="Reference #" v-model="state.payment.bankTransfer.refno"></FormTextField>
                                  <FormError :error="vbankTransfer$.payment.bankTransfer.refno && vbankTransfer$.payment.bankTransfer.refno.$errors && vbankTransfer$.payment.bankTransfer.refno.$errors.length > 0 ? vbankTransfer$.payment.bankTransfer.refno.$errors[0].$message : null "/>
                            </div>
                            <FormLabel for="remarks" label="Remarks"/>
                            <FormTextField name="remarks" placeholder="Remarks" v-model="state.payment.remarks"></FormTextField>
                
                            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                      </div>
                      <div class="col-span-6 sm:col-span-2 border-l pl-2">
                            <LoadingSpinner :isActive="state.isReceiptLoading">
                            <FormLabel for="receipttype" label="Receipt Type" />
                            <FormSelect :options="state.receiptTypes" :searchable="false" v-model="state.payment.receipttype"></FormSelect>
                            <FormError :error="v$.payment.receipttype && v$.payment.receipttype.$errors && v$.payment.receipttype.$errors.length > 0 ? v$.payment.receipttype.$errors[0].$message : null "/>
                            <FormLabel for="receiptno" label="Receipt #"/>
                            <FormNumberField name="receiptno" placeholder="Receipt #" v-model="state.payment.orno"></FormNumberField>
                            <FormError :error="v$.payment.orno && v$.payment.orno.$errors && v$.payment.orno.$errors.length > 0 ? v$.payment.orno.$errors[0].$message : null "/>
                            </LoadingSpinner>
                            <FormLabel for="paidby" label="Paid By" />
                            <FormTextField name="paidby" placeholder="If payment is made by other person." v-model="state.payment.paidby"></FormTextField>
                      </div>
                  </div>
              </div>
          </div>
          <NavigationBottom returnURL="/payments" @onSave="submit"></NavigationBottom>
        </LoadingSpinner>
        
        <Modal title="Search Payables" :isShow="state.modalShow" @modalClose="modalClose">
          <SearchPayables searchType="payables" :clientID="state.payment.custid" @modalClose="modalClose"></SearchPayables>
        </Modal>
    </div>
</template>
<script setup>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, maxValue, helpers, numeric } from '@vuelidate/validators'
import { clientService } from '@/components/api/ClientService'
import { useSearchStore } from '@/store/search';
import { useUserStore } from '@/store/user'
import moment from 'moment'
import { paymentService } from '~~/components/api/PaymentService'

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
    orno: null,
    receipttype: null,
    totalamount: null,
    transtype: 'P',
    paidby: '',
    remarks: '',
    //payables: [],
    payables: [],
    paymentmode: 0,
    paymentCheckRequestDto:{
      bankid: 0,
      checkno: '',
      checkdate: moment(currentDate).format('YYYY-MM-DD'),
      accountnumber: '',
      amount: 0,
      memo: ''
    },
    bankTransfer:{
      bankid: 0,
      paymentdate: moment(currentDate).format('YYYY-MM-DD'),
      amount: 0,
      refno: '',
      memo: ''
    }
  },
  clients:[],
  isClientLoading: false,
  banks:[],
  isBankLoading: false,
  wallets:[],
  isWalletLoading: false,
  receiptTypes:[
    { label: "Official Receipt", value: 1},
    { label: "Acknowledgement Receipt", value: 2},
    { label: "Probationary Receipt", value: 3}
  ],
  isReceiptLoading: false,
  paymentModes:[
    { label: "Cash", value: 0},
    { label: "Check", value: 1},
    { label: "Bank Transfer / Deposit", value: 2},
    { label: "e-Wallet", value: 3}
  ],
  columnHeaders: [
                { name: 'Particulars'},
                { name: 'Amount', width: '20%', textAlign: 'center'},
                { name: 'Balance', width: '20%', textAlign: 'center'},
                { name: 'Payment', width: '20%', textAlign: 'center'},
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
      receipttype:{
        required: helpers.withMessage('This field is required.', required),
        minValue: helpers.withMessage('This field is required.', minValue(1)) 
      },
      orno:{
        required: helpers.withMessage('This field is required.', required),
        numeric: helpers.withMessage('Invalid input.', numeric) 
      },
    }
  }
})
const checkValidators = computed(() =>{
  return {
    payment: {
      paymentCheckRequestDto: { 
        bankid:{ 
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        checkno:{ 
          required: helpers.withMessage('This field is required.', required),
        },
        amount:{ 
          required: helpers.withMessage('This field is required.', required),
          minValue: helpers.withMessage('Invalid input.', minValue(1)) 
        },
      },
    }
  }
})
const bankTransferValidators = computed(() =>{
  return {
    payment: {
      bankTransfer: { 
        bankid:{ 
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        refno:{ 
          required: helpers.withMessage('This field is required.', required),
        },
        amount:{ 
          required: helpers.withMessage('This field is required.', required),
          minValue: helpers.withMessage('Invalid input.', minValue(1)) 
        },
      },
    }
  }
})



const v$ = useVuelidate(validators, state)
const vCheck$ = useVuelidate(checkValidators, state)
const vbankTransfer$ = useVuelidate(bankTransferValidators, state)

onMounted(() =>{
  searchWallets('')
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

function modalClose(){
  state.modalShow = false
  if(searchStore.getSelectedData && searchStore.getSelectedData.length > 0){
    searchStore.getSelectedData.forEach(data => {
      if(removeItem(data, false) < 0){
        data.paymentAmount = data.balance
        state.payment.payables.push(data)
      }
    });
  }
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

const searchBanks = async (query) =>{
  state.isBankLoading = true
  try{
    const response = await paymentService.getBanks(1, query)
    state.banks = []
    response.data.data.forEach(element => {
      state.banks.push({ value: element.bankid, label: element.name })
    });
  }catch(error){
    state.banks = []
  }
  state.isBankLoading = false
}

const searchWallets = async (query) =>{
  state.isWalletLoading = true
  try{
    const response = await paymentService.getWallets(1, query)
    state.wallets = []
    response.data.data.forEach(element => {
      state.wallets.push({ value: element.bankid, label: element.name })
    });
  }catch(error){
    state.wallets = []
  }
  state.isWalletLoading = false
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
  if(state.payment.paymentmode === 1){
    vCheck$.value.$validate()
    isValid = !vCheck$.value.$error && isValid
  }else if(state.payment.paymentmode === 2 || state.payment.paymentmode === 3){
    vbankTransfer$.value.$validate()
    isValid = !vbankTransfer$.value.$error && isValid
  }
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
      console.log(JSON.stringify(state.payment))
      await paymentService.create(state.payment)
    }
    catch(error){
      state.error = error.message
      console.log(error)
    }
    state.isPageLoading = false
  }
}
  
  </script>