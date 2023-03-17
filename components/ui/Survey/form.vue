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
                          v-model="state.survey.custid"
                          noOptionsText="Type to search clients"
                          class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus-:border-blue-400 focus:ring-2"></Multiselect>
                          <FormError :error="v$.survey.custid && v$.survey.custid.$errors && v$.survey.custid.$errors.length > 0 ? v$.survey.custid.$errors[0].$message : null "/>
  
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="owner" label="Owner" />
                        <FormTextField name="owner" placeholder="Owner" v-model="state.survey.owner"/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="titleno" label="Title No." />
                        <FormTextField name="titleno" placeholder="Title No." v-model="state.survey.titleno"/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="surveyno" label="Survey No." />
                        <FormTextField name="surveyno" placeholder="Survey No." v-model="state.survey.surveyno"/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="surveydate" label="Date of Survey"/>
                        <FormDateField name="surveydate" placeholder="Date of Survey" v-model="state.survey.surveydate"/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="contractprice" label="Contract Price"/>
                        <FormNumberField name="contractprice" placeholder="Contract Price" v-model="state.survey.contractprice"/>
                    </div>
                </div>
                
                <FormLabel for="propertyname" label="Property Name" />
                <FormTextField name="propertyname" placeholder="Property Name" v-model="state.survey.propertyname"/>
                <FormError :error="v$.survey.propertyname && v$.survey.propertyname.$errors && v$.survey.propertyname.$errors.length > 0 ? v$.survey.propertyname.$errors[0].$message : null "/>
                
                <FormLabel for="address" label="Location" />
                <FormTextField name="address" placeholder="Location" v-model="state.survey.address"/>
                <FormError :error="v$.survey.address && v$.survey.address.$errors && v$.survey.address.$errors.length > 0 ? v$.survey.address.$errors[0].$message : null "/>
                
                <FormLabel for="surveydetails" label="Survey Details" />
                <FormTextArea name="surveydetails" placeholder="Survey Details" :rows="12" v-model="state.survey.details"/>
                
                <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                
          </div>
          <NavigationBottom :returnURL="state.returnURL" @onSave="submit"></NavigationBottom>
        </LoadingSpinner>
    </div>
  </template>
  
  <script setup>
  import Multiselect from '@vueform/multiselect'
  import '@vueform/multiselect/themes/default.css'
  import { reactive, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minValue, helpers, numeric } from '@vuelidate/validators'
  import { clientService } from '@/components/api/ClientService'
  import { surveyService } from '@/components/api/SurveyService'
  import { useUserStore } from '@/store/user'
  import { useSurveyStore } from '@/store/survey'
  import moment from 'moment'
  
  const user = useUserStore().getUser
        
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
      survey:{
          id: 0,
          companyid: user.companyid,
          custid: 0,
          owner: '',
          titleno: '',
          surveyno: '',
          surveydate: moment(currentDate).format('YYYY-MM-DD'),
          propertyname: '',
          address: '',
          details: '',
          contractprice: null,
        //   propertyname: 'Ula Phase 1',
        //   address: 'Ula, Davao City',
        //   details: '1234 test',
          createdbyid: user.employeeid,
          updatedbyid: user.employeeid
      },
      clients:[],
      isClientLoading: false
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
      state.survey.contractprice = response.data.contractprice
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
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
  
  const validators = computed(() =>{
    return {
      survey: {
        custid: { 
          required: helpers.withMessage('This field is required.', required),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        propertyname: { required: helpers.withMessage('This field is required.', required) },
        address: { required: helpers.withMessage('This field is required.', required) },
        contractprice: { numeric: helpers.withMessage('Invalid input.', numeric) },
      }
    }
  })
  
  const v$ = useVuelidate(validators, state)
  
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
  