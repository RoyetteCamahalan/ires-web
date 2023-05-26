<template>
    <div>
        <div class="flex flex-col justify-center items-center px-6 mx-auto pt:mt-0">
          <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
            <LoadingSpinner :is-active="state.isPageLoading">
              <div class="space-y-8">
                <div class="pl-10 pr-4 flex justify-between items-start rounded-t">
                    <h2 class="text-lg font-bold text-gray-900 my-auto">
                      Change Password
                    </h2>
                    <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                    @click="$emit('AfterOverride')"
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
                <form class="px-10 pb-10 space-y-2" method="POST" @submit.prevent="login">
                  <div>
                    <FormLabel for="oldpassword" label="Old Password"></FormLabel>
                    <FormPasswordField name="oldpassword" placeholder="Old Password" v-model="state.user.userpass"></FormPasswordField>
                    <FormError :error="v$.user.userpass && v$.user.userpass.$errors && v$.user.userpass.$errors.length > 0 ? v$.user.userpass.$errors[0].$message : null "/>
                  </div>
                  <div>
                    <FormLabel for="newpassword" label="New Password"></FormLabel>
                    <FormPasswordField name="newpassword" placeholder="New Password" v-model="state.user.newuserpass"></FormPasswordField>
                    <FormError :error="v$.user.newuserpass && v$.user.newuserpass.$errors && v$.user.newuserpass.$errors.length > 0 ? v$.user.newuserpass.$errors[0].$message : null "/>
                  </div>
                  <div>
                    <FormLabel for="confirmnewpassword" label="Confirm New Password"></FormLabel>
                    <FormPasswordField name="confirmnewpassword" placeholder="Confirm New Password" v-model="state.user.confirmnewpassword"></FormPasswordField>
                    <FormError :error="v$.user.confirmnewpassword && v$.user.confirmnewpassword.$errors && v$.user.confirmnewpassword.$errors.length > 0 ? v$.user.confirmnewpassword.$errors[0].$message : null "/>
                  </div>
                  <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                  <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto">Submit</button>
                  
                  </form>
                </div>
            </LoadingSpinner>
          </div>
        </div>
    </div>
  </template>
  
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, sameAs, minLength } from '@vuelidate/validators'
import { employeeService } from '@/components/api/EmployeeService'
  
const { $toastNotification } = useNuxtApp()

const props = defineProps({
    action:{
        type: String,
        required: false,
        default: ''
    }
})

const emit = defineEmits(['onClose'])

const state = reactive({
    user:{
        userpass: '',
        newuserpass: '',
        confirmnewpassword: '',
    },
    isPageLoading: false,
    error: null,
})

const validators = computed(()=>{
    return{
        user:{
            userpass: { required: helpers.withMessage('Old password is required.', required) },
            newuserpass: { 
                required: helpers.withMessage('New password is required.', required),
                minLength: helpers.withMessage('Atleast 6 characters required.', minLength(6))
            },
            confirmnewpassword: {
                required: helpers.withMessage('This field is required.', required),
                sameAs: helpers.withMessage('Must be the same as password.', sameAs(state.user.newuserpass))
            }
        }
    }
})
  

const v$ = useVuelidate(validators, state)
  
  async function login(){
    v$.value.$validate()
    if(!v$.value.$error){
      state.isPageLoading = true
      try{
        await employeeService.changePassword(state.user)
        state.error = null
        emit('onClose')
        $toastNotification('success', '', 'Password has been changed!')
      }catch(error){
        state.error = error.message
      }
      state.isPageLoading = false
    }
  }
  </script>