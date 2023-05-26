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
                        Password Reset
                    </h2>
                    <form v-if="resetToken === null" class="mt-2 space-y-4" method="POST" @submit.prevent="submitEmail">
                        <div>
                            <FormTextField name="email" placeholder="Enter your Email" v-model="state.email"/>
                            <FormError :error="v$.email && v$.email.$errors && v$.email.$errors.length > 0 ? v$.email.$errors[0].$message : null "/>
                            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                        </div>  
                        <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto float-right">Submit</button>
                    </form>
                    <form v-if="resetToken !== null && state.isTokenValid" class="mt-2 space-y-4" method="POST" @submit.prevent="resetPassword">
                        <div>
                            <FormLabel for="newpassword" label="New Password"></FormLabel>
                            <FormPasswordField name="newpassword" placeholder="New Password" v-model="state.newuserpass"></FormPasswordField>
                            <FormError :error="v$.newuserpass && v$.newuserpass.$errors && v$.newuserpass.$errors.length > 0 ? v$.newuserpass.$errors[0].$message : null "/>
                        </div>
                        <div>
                            <FormLabel for="confirmnewpassword" label="Confirm New Password"></FormLabel>
                            <FormPasswordField name="confirmnewpassword" placeholder="Confirm New Password" v-model="state.confirmnewpassword"></FormPasswordField>
                            <FormError :error="v$.confirmnewpassword && v$.confirmnewpassword.$errors && v$.confirmnewpassword.$errors.length > 0 ? v$.confirmnewpassword.$errors[0].$message : null "/>
                        </div>
                            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                        <button type="submit" class="py-2 px-4 w-full text-base font-medium text-center text-white bg-blue-500 hover:scale-[1.02] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto float-right">Submit</button>
                    </form>
                    <div v-if="resetToken !== null && !state.isTokenValid">
                        <p class="text-sm">Sorry, this password request is expired. <a href="/resetpassword" class="text-blue-700 underline">Click here</a> to create new password reset request.</p>
                    </div>
                </div>
            </LoadingSpinner>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useVuelidate } from '@vuelidate/core'
  import { required, helpers, email, minLength, sameAs } from '@vuelidate/validators'
  import { authService } from '@/components/api/AuthService'
  
  definePageMeta({
    auth: false
  })
  
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const { $toastNotification } = useNuxtApp()

  const resetToken = (route.query && route.query.token && route.query.token.length > 0) ? route.query.token : null
    
  
  const state = reactive({
    email: '',
    newuserpass: '',
    confirmnewpassword: '',
    isPageLoading: false,
    error: null,
    isTokenValid: false
  })
  const validators = computed(()=>{
    if(resetToken == null)
    {
        return{
            email: { 
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('Invalid Email', email), 
            },
        }
    }else{
        return{
            newuserpass: { 
                required: helpers.withMessage('New password is required.', required),
                minLength: helpers.withMessage('Atleast 6 characters required.', minLength(6))
            },
            confirmnewpassword: {
                required: helpers.withMessage('This field is required.', required),
                sameAs: helpers.withMessage('Must be the same as password.', sameAs(state.newuserpass))
            }
        }
    }
  })
  
  const v$ = useVuelidate(validators, state)
  
  onMounted(() =>{
    if(resetToken)
        validateToken()
  })

  async function validateToken(){
    state.isPageLoading = true
    try{
        const response = await authService.validatePasswordToken(resetToken)
        state.isTokenValid = response.success
    }catch(error){
        $toastNotification('error', '', error.message)
    }
    state.isPageLoading = false
  }

  async function submitEmail(){
    v$.value.$validate()
    if(!v$.value.$error){
      state.isPageLoading = true
      try{
        await authService.sendResetPasswordLink(state.email)
        $toastNotification('success', '', 'Password Reset link has been sent to your email!')
        state.error = null
      }catch(error){
          state.error = error.message
      }
      state.isPageLoading = false
    }
  }
  async function resetPassword(){
    v$.value.$validate()
    if(!v$.value.$error){
      state.isPageLoading = true
      try{
        const params = {
            token: resetToken,
            userpass: state.userpass,
            newuserpass: state.newuserpass
        }
        await authService.resetPassword(params)
        $toastNotification('success', '', 'Password Reset Successful!')
        state.error = null
        navigateTo('/login')
      }catch(error){
          state.error = error.message
      }
      state.isPageLoading = false
    }
  }
  </script>