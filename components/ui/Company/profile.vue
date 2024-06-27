<template>
    <div>
        <div class="flex flex-col justify-center items-center px-6 mx-auto pt:mt-0">
          <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
            <LoadingSpinner :is-active="state.isPageLoading">
              <div class="space-y-8">
                <div class="pl-10 pr-4 flex flex-row-reverse rounded-t">
                    <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                    @click="$emit('onClose')"
                    >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        ></path>
                    </svg>
                    </button>
                </div>
                <div class="w-full relative flex items-start justify-center">
                    <div class="absolute -top-12">
                      <img v-if="state.company.logo && state.company.logo.length > 0" :src="runtimeConfig.public.apiBaseURL + '/attachments/' + user.companyid + '/' + state.company.logo" class="h-24 mx-auto">
                        <div v-else class="rounded-full border-2 p-2">
                          <div class="flex w-16 h-16 pb-2 text-blue-400 bg-white rounded-full items-center justify-center text-5xl font-bold">
                            {{ state.company.name[0] }}
                          </div>
                        </div>
                        <label class="absolute bottom-0 right-0 mb-2 mr-2">
                          <input type="file" class="hidden" accept="image/*" @change="fileSelected($event)"/>
                          <Icon name="material-symbols:android-camera-outline" class="w-6 h-6 text-blue-700 bg-gray-100 rounded-full p-0.5 border border-blue-700"></Icon>
                        </label>
                    </div>
                </div>
                <div v-if="!state.isEdit" class="px-10 py-8 space-y-1 flex flex-col items-center">
                    <div class="text-center font-semibold text-gray-800 text-xl">
                      {{ state.company.name }}
                    </div>
                    <div class="text-center text-sm text-gray-600 pt-2 px-10">
                      <p>{{ state.company.address }}</p>
                    </div>
                    <div class="text-center text-sm text-gray-600 px-10">
                      <p>{{ state.company.contactno }}</p>
                    </div>
                    <div class="text-center text-sm text-gray-600 font-semibold">
                      {{ user.company.email }}
                    </div>
                    <button 
                      @click="state.isEdit = true"
                      class="text-sm border bg-blue-500 text-white px-3 py-1 rounded-lg">
                      <Icon name="material-symbols:edit-outline" class="w-4 h-4 -mr-1 -ml-1"></Icon> Edit</button>
                </div>
                <form v-else class="px-10 py-8 space-y-2" method="POST" @submit.prevent="submit">
                  <div>
                    <FormLabel for="company" label="Company"></FormLabel>
                    <FormTextField name="company" placeholder="Company" v-model="state.company.name"></FormTextField>
                    <FormError :error="v$.company.name && v$.company.name.$errors && v$.company.name.$errors.length > 0 ? v$.company.name.$errors[0].$message : null "/>
                  </div>
                  <div>
                    <FormLabel for="address" label="Address"></FormLabel>
                    <FormTextField name="address" placeholder="New Password" v-model="state.company.address"></FormTextField>
                    <FormError :error="v$.company.address && v$.company.address.$errors && v$.company.address.$errors.length > 0 ? v$.company.address.$errors[0].$message : null "/>
                  </div>
                  <div>
                    <FormLabel for="contactno" label="Contact #"></FormLabel>
                    <FormTextField name="contactno" placeholder="Contact #" v-model="state.company.contactno"></FormTextField>
                    <FormError :error="v$.company.contactno && v$.company.contactno.$errors && v$.company.contactno.$errors.length > 0 ? v$.company.contactno.$errors[0].$message : null "/>
                  </div>
                  <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                  <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg">Submit</button>
                  <button type="button" 
                    @click="cancelEdit"
                    class="py-2 px-4 w-full text-base font-medium text-center text-gray-700 bg-gray-50 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg">Cancel</button>
                  
                  </form>
                </div>
            </LoadingSpinner>
          </div>
        </div>
    </div>
  </template>
  
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { companyService } from '@/components/api/CompanyService';
import { fileService } from '@/components/api/FileService';
import { useUserStore } from '@/store/user';
  
const { $toastNotification } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

const userStore = useUserStore()
const user = userStore.getUser;

const props = defineProps({
    action:{
        type: String,
        required: false,
        default: ''
    }
})

const emit = defineEmits(['onClose'])

const state = reactive({
    company:{
        name: user.company.name,
        address: user.company.address,
        contactno: user.company.contactno,
        logo: user.company.logo
    },
    isPageLoading: false,
    isEdit: false,
    error: null,
})

const validators = computed(()=>{
    return{
        company:{
            name: { required: helpers.withMessage('This field is required.', required) },
            address: { required: helpers.withMessage('This field is required.', required) },
            contactno: { required: helpers.withMessage('This field is required.', required) }
        }
    }
})
  

const v$ = useVuelidate(validators, state)
  
  async function submit(){
    v$.value.$validate()
    if(!v$.value.$error){
      state.isPageLoading = true
      try{
        await companyService.update(state.company)
        state.error = null
        $toastNotification('success', '', 'Company information has been updated!')
        let company = user.company
        company.name = state.company.name
        company.address = state.company.address
        company.contactno = state.company.contactno
        userStore.updateCompany(company)
        state.isEdit  = false
      }catch(error){
        state.error = error.message
      }
      state.isPageLoading = false
    }
  }

function cancelEdit(){
  state.company.name = user.company.name
  state.company.address = user.company.address
  state.company.contactno = user.company.contactno
  state.isEdit  = false
}
async function fileSelected(e){
    let data = new FormData()
    data.append('companyid', user.companyid)
    data.append('typeid', -1)
    data.append('formFile', e.target.files[0])
    state.isPageLoading = true
    try{
        const response = await fileService.upload(data)
        userStore.updateCompanyProfile(response.data.filename)
        state.company.logo=response.data.filename
    }
    catch(error){
        console.log(error)
    }
    state.isPageLoading = false
    
}

  </script>