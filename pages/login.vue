<template>
  <div>
    <main class="bg-gray-50">
      <div class="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
        <a href="/" class="flex justify-center items-center mb-6 text-2xl font-semibold lg:mb-4">
          <img src="/img/logo.png" class="mr-2 h-10" alt="HexaByt Logo">
          <span class="self-center text-xl font-bold whitespace-nowrap">{{ runtimeConfig.public.appName }} Dashboard</span>
        </a>
        <div class="p-10 w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-gray-300">
          <LoadingSpinner :is-active="state.isPageLoading">
            <div class="space-y-8">
              <h2 class="text-lg font-bold text-gray-900">
                Sign in to platform
              </h2>
              <form class="mt-8 space-y-6" method="POST" @submit.prevent="login">
                <div>
                    <FormTextField name="username" placeholder="Username or Email" v-model="state.username"/>
                    <FormError :error="v$.username && v$.username.$errors && v$.username.$errors.length > 0 ? v$.username.$errors[0].$message : null "/>
                </div>
                <div>
                  <FormPasswordField name="password" placeholder="Password" v-model="state.password"></FormPasswordField>
                      <FormError :error="v$.password && v$.password.$errors && v$.password.$errors.length > 0 ? v$.password.$errors[0].$message : null "/>
                      <FormError :error="state.error && state.error != '' ? state.error : null "/>
                </div>

                <div class="flex justify-between flex-col sm:flex-row">
                  <div class="text-sm font-medium text-gray-500">
                      Not registered? <NuxtLink to="/company/register" class="text-blue-600 hover:underline">Create Account</NuxtLink>
                  </div>
                  <a href="/resetpassword" class="mt-2 sm:mt-0 text-sm text-blue-600 hover:underline">Lost Password?</a>
                </div>
                <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto">Login to your account</button>
                
                </form>
              </div>
              
              <ModalEmpty title="" :isShow="state.showUnverified">
              <div class="w-full mx-2 px-6 py-4 bg-white rounded-b-lg sm:rounded-lg sm:m-4 sm:max-w-xl" role="dialog" id="modal">
                  <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
                  <div class="w-full relative flex flex-col">
                      <LoadingSpinner :is-active="state.isResendingEmail">
                          <div class="w-full relative flex items-start justify-center">
                              <div class="absolute -top-14">
                                  <Icon name="ri:close-circle-line" size="6rem" class="text-red-400 bg-white rounded-full" />                            
                              </div>
                              <span class="mt-10 mb-4 text-xl text-gray-700 text-center">
                                  Unverified Account!
                              </span>
                          </div>
                          <div>
                              <p class="text-sm text-gray-500 text-center">
                                  We have sent an email confirmation link to your registered email after your registration.
                              </p>
                          </div>
                          <div class="flex px-4 mt-4 justify-between flex-col sm:flex-row">
                              <button class="border px-3 py-1 rounded-md text-gray-700 bg-gray-100 text-sm" @click="SendConfirmationLink()">
                                  Re-Send Link
                              </button>
                              <button class="border px-3 py-1 mt-1 rounded-md text-white bg-blue-500" @click="state.showUnverified = false">
                                  Login
                              </button>
                              <!-- <FormButton type="submit" buttonStyle="primary" @click="navigateTo('/login')" class="block">
                                  Login
                              </FormButton> -->
                          </div>
                      </LoadingSpinner>
                  </div>
              </div>
            </ModalEmpty>
          </LoadingSpinner>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { authService } from '@/components/api/AuthService'
import { companyService} from '@/components/api/CompanyService'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()
const { $toastNotification } = useNuxtApp()

const state = reactive({
  username: '',
  password: '',
  isPageLoading: false,
  isResendingEmail: false,
  showUnverified: false,
  newCompanyID: 0,
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
      password: state.password
    }
    try{
      const response = await authService.login(params)
        userStore.setUser(response.data)
        state.error = null
        if(response.data.company.isexpired)
          navigateTo('/billing')
        else
          navigateTo('/dashboard')
    }catch(error){
        state.isPageLoading = false
        if(error.code == 1){
          state.showUnverified =  true
          state.newCompanyID = error.data.companyid
        }
        else
          state.error = error.message
    }
  }
}
async function SendConfirmationLink(){
    state.isResendingEmail = true
    try{
        await companyService.resendConfirmation({ id: state.newCompanyID})
        $toastNotification('success', '', 'Email confirmation link sent to your email')
        state.showUnverified = false
    }catch(error){
        $toastNotification('error', '', error.message)
        state.error = error.message
    }
    state.isResendingEmail = false
}
</script>