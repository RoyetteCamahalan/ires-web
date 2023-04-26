<template>
    <div>
        <div class="flex flex-col justify-center items-center px-6 mx-auto pt:mt-0">
          <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
            <LoadingSpinner :is-active="state.isPageLoading">
              <div class="space-y-8">
                <div class="pl-10 pr-4 flex justify-between items-start rounded-t">
                    <h2 class="text-lg font-bold text-gray-900 my-auto">
                      Admin Override
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
                <form class="px-10 pb-10 space-y-6" method="POST" @submit.prevent="login">
                  <div>
                      <FormTextField name="username" placeholder="Username or Email" v-model="state.username"/>
                      <FormError :error="v$.username && v$.username.$errors && v$.username.$errors.length > 0 ? v$.username.$errors[0].$message : null "/>
                  </div>
                  <div>
                    <FormPasswordField name="password" placeholder="Password" v-model="state.password"></FormPasswordField>
                        <FormError :error="v$.password && v$.password.$errors && v$.password.$errors.length > 0 ? v$.password.$errors[0].$message : null "/>
                        <FormError :error="state.error && state.error != '' ? state.error : null "/>
                  </div>
                  <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto">Override</button>
                  
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
  import { authService } from '@/components/api/AuthService'
  
  definePageMeta({
      middleware: ["authenticated"]
  })

const props = defineProps({
    action:{
        type: String,
        required: false,
        default: ''
    }
})

const emit = defineEmits(['AfterOverride'])

const state = reactive({
    username: '',
    password: '',
    isPageLoading: false,
    error: null
})

const validators = computed(()=>{
    return{
    username: { required: helpers.withMessage('Username or Email is required.', required) },
    password: { required: helpers.withMessage('Password is required.', required) },
    }
})
  

const v$ = useVuelidate(validators, state)
  
  async function login(){
    v$.value.$validate()
    if(!v$.value.$error){
      state.isPageLoading = true
      const params = {
        username: state.username,
        password: state.password,
        key: props.action 
      }
      try{
        await authService.systemOverride(params)
        state.error = null
        emit('AfterOverride', true)
      }catch(error){
          state.isPageLoading = false
          state.error = error.message
      }
    }
  }
  </script>