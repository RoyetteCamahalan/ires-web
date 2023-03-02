<template>
  <div>
    <div class="flex items-center min-h-screen p-6 bg-gray-50">
      <div class="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <LoadingSpinner :is-active="state.isPageLoading">
          <div class="flex flex-col overflow-y-auto">
            <div class="flex items-center justify-center p-6">
              <div class="w-full">
                <h1 class="mb-4 text-2xl font-semibold text-gray-700 text-center">
                  Hidden Gardens
                </h1>
                <h4 class="mb-4 text-l font-semibold text-gray-700">
                  Login
                </h4>
                <label class="block text-sm">
                  <FormTextField name="username" placeholder="Username" v-model="state.username"/>
                  <FormError :error="v$.username && v$.username.$errors && v$.username.$errors.length > 0 ? v$.username.$errors[0].$message : null "/>
                </label>
                <label class="block mt-4 text-sm">
                  <input class="block w-full mt-1 text-sm focus:border-blue-400 form-input" placeholder="Password" type="password" v-model="state.password">
                  <FormError :error="v$.password && v$.password.$errors && v$.password.$errors.length > 0 ? v$.password.$errors[0].$message : null "/>
                  <FormError :error="state.error && state.error != '' ? state.error : null "/>
                </label>

                <!-- You should use a button here, as the anchor is only used for the example  -->
                <button class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded hover:bg-blue-700"
                  @click="login">
                  Log in
                </button>
                <button class="block w-full px-4 py-2 mt-2 text-sm font-medium leading-5 text-center transition-colors text-gray-700 duration-150 bg-gray-100 border border-2 rounded hover:bg-gray-200"
                  @click="configureURL">
                  Configure URL
                </button>
              </div>
            </div>
          </div>
        </LoadingSpinner>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { authService } from '@/components/api/AuthService'
import { useUserStore } from '@/store/user'

export default {
    setup(){
      const userStore = useUserStore()
      const state = reactive({
        username: '',
        password: '',
        isPageLoading: false,
        error: null
      })
      const validators = computed(()=>{
        return{
          username: { required: helpers.withMessage('This field is required.', required) },
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
            if(response.status == 1){
              localStorage.setItem("_officecode", response.office.code)
              userStore.setUser(response.office)
              state.error = null
              navigateTo('/')
            }else{
              state.error = 'Invalid login credentials.'
            }
          }catch(error){
              state.isPageLoading = false
              state.error = 'Unable to process request.'
          }
        }
      }
      const configureURL = () =>{
        navigateTo('/changeurl')
      }

      return {
        state,
        v$,
        login,
        configureURL
      }
    }
}
</script>