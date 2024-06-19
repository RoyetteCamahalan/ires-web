<template>
    <div>
        <div v-if="state.newCompanyID === 0 " class="flex items-center min-h-screen p-6 bg-gray-50">
            <div class="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
                <LoadingSpinner :is-active="state.isPageLoading">
                    <div class="flex flex-col overflow-y-auto">
                        <div class="flex items-center justify-center p-6">
                        <div class="w-full">
                            <h1 class="mb-4 text-2xl font-semibold text-gray-700 text-center">
                                Register
                            </h1>
                            <form method="POST" @submit.prevent="Submit">
                                <FormLabel for="name" label="Company Name" />
                                <FormTextField name="name" placeholder="Company Name" v-model="state.company.name"/>
                                <FormError :error="v$.company.name && v$.company.name.$errors && v$.company.name.$errors.length > 0 ? v$.company.name.$errors[0].$message : null "/>
                                
                                <FormLabel for="address" label="Address" />
                                <FormTextField name="address" placeholder="Address" v-model="state.company.address"/>
                                <FormError :error="v$.company.address && v$.company.address.$errors && v$.company.address.$errors.length > 0 ? v$.company.address.$errors[0].$message : null "/>
                                
                                <FormLabel for="contactno" label="Contact No" />
                                <FormTextField name="contactno" placeholder="Contact No" v-model="state.company.contactno"/>
                                <FormError :error="v$.company.contactno && v$.company.contactno.$errors && v$.company.contactno.$errors.length > 0 ? v$.company.contactno.$errors[0].$message : null "/>
                                
                                <FormLabel for="firstname" label="First Name" />
                                <FormTextField name="firstname" placeholder="First Name" v-model="state.company.adminfirstname"/>
                                <FormError :error="v$.company.adminfirstname && v$.company.adminfirstname.$errors && v$.company.adminfirstname.$errors.length > 0 ? v$.company.adminfirstname.$errors[0].$message : null "/>
                                
                                <FormLabel for="firstname" label="Last Name" />
                                <FormTextField name="lastname" placeholder="Last Name" v-model="state.company.adminlastname"/>
                                <FormError :error="v$.company.adminlastname && v$.company.adminlastname.$errors && v$.company.adminlastname.$errors.length > 0 ? v$.company.adminlastname.$errors[0].$message : null "/>
                                
                                <FormLabel for="email" label="Email" />
                                <FormTextField name="email" placeholder="Email" v-model="state.company.email"/>
                                <FormError :error="v$.company.email && v$.company.email.$errors && v$.company.email.$errors.length > 0 ? v$.company.email.$errors[0].$message : null "/>
                                        
                                <FormLabel for="app" label="App" />
                                <FormSelect :options="state.plans" v-model="state.company.planid" :canClear="false"></FormSelect>
                                <FormError :error="v$.company.planid && v$.company.planid.$errors && v$.company.planid.$errors.length > 0 ? v$.company.planid.$errors[0].$message : null "/>
                                
                                
                                <div class="flex mt-4">
                                    <FormCheckBox class="mt-0.5" v-model="state.isAgree"></FormCheckBox>
                                    <span :class="['text-sm',
                                                v$.isAgree && v$.isAgree.$errors && v$.isAgree.$errors.length > 0 ? 'text-red-600' : 'text-gray-600']">I agree to the 
                                        <a href="/terms" class="text-blue-600 underline" target="_blank">Terms & Condition</a>,
                                        <a href="/privacy" class="text-blue-600 underline" target="_blank">Privacy Policy</a> and
                                        <a href="/cookie" class="text-blue-600 underline" target="_blank">Cookies Policy</a>

                                    </span>
                                </div>
                            <!-- You should use a button here, as the anchor is only used for the example  -->
                            <FormButton type="submit" buttonStyle="primary" class="block w-full">
                                Register
                            </FormButton>
                            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                                
                            <div class="flex items-end mt-2">
                            <div class="text-sm text-gray-500">
                                Already have an account? <NuxtLink to="/login" class="text-blue-600 hover:underline">Login here</NuxtLink>
                            </div>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </LoadingSpinner>
            </div>
        </div>
        <div v-else class="fixed inset-x-0 h-full flex items-start bg-black bg-opacity-50 sm:items-center sm:justify-center">
            <!-- Modal -->
            <div class="w-full mx-2 px-6 py-4 bg-white rounded-b-lg sm:rounded-lg sm:m-4 sm:max-w-xl" role="dialog" id="modal">
                <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
                <div class="w-full relative flex flex-col">
                    <LoadingSpinner :is-active="state.isPageLoading">
                        <div class="w-full relative flex items-start justify-center">
                            <div class="absolute -top-14">
                                <Icon name="material-symbols:check-circle" size="6rem" class="text-green-400 bg-white rounded-full" />                            
                            </div>
                            <span class="mt-10 mb-4 text-xl text-gray-700 text-center">
                                Welcome to {{ runtimeConfig.public.appName}}!
                            </span>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 text-center">
                                We have sent an email confirmation link and password to your registered email.
                            </p>
                        </div>
                        <div class="flex px-4 mt-4 justify-between flex-col sm:flex-row">
                            <button class="border px-3 py-1 rounded-md text-gray-700 bg-gray-100 text-sm" @click="SendConfirmationLink()">
                                Re-Send Link
                            </button>
                            <button class="border px-3 py-1 mt-1 rounded-md text-white bg-blue-500" @click="navigateTo('/login')">
                                Login
                            </button>
                            <!-- <FormButton type="submit" buttonStyle="primary" @click="navigateTo('/login')" class="block">
                                Login
                            </FormButton> -->
                        </div>
                    </LoadingSpinner>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { companyService} from '@/components/api/CompanyService'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useSubscriptionStore } from '@/store/subscription'

definePageMeta({
    auth: false
})

const runtimeConfig = useRuntimeConfig()
const { $toastNotification } = useNuxtApp()
const subscriptionStore = useSubscriptionStore()
const state = reactive({
    error: '',
    company: {
        name: '',
        address: '',
        contactno: '',
        adminfirstname: '',
        adminlastname: '',
        email: '',
        planid: subscriptionStore.getSelectedPlanID ? subscriptionStore.getSelectedPlanID : null
    },
    isAgree: false,
    plans:[
        { label: "Surveying Management App", value: 1},
        { label: "Rental App", value: 6},
        { label: "Finance Monitoring App", value: 4},
    ],
    newCompanyID: 0,
    isPageLoading: false
})
// state.company.name = 'Sample Company'
// state.company.address = 'Sample Address'
// state.company.contactno = '09499153547'
// state.company.adminfirstname = 'Shayne'
// state.company.adminlastname = 'Camahalan'
// state.company.email = 'sample@gmail.com'

const isAgreeValidator = () => {
    return state.isAgree
  }
const validators = computed(() =>{
    return {
        company:{
            name: { required: helpers.withMessage('Company name is required.', required) },
            address: { required: helpers.withMessage('This field is required.', required) },
            contactno: { required: helpers.withMessage('This field is required.', required) },
            adminfirstname: { required: helpers.withMessage('This field is required.', required) },
            adminlastname: { required: helpers.withMessage('This field is required.', required) },
            email: { 
                required: helpers.withMessage('This field is required.', required),
                email: helpers.withMessage('Please enter a valid email address.', email)
            },
            planid: { required: helpers.withMessage('Select your app.', required) },
        },
        isAgree: { isAgreeValidator },
    }
})

const v$ = useVuelidate(validators, state);


async function Submit(){
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true
        try{
            const response = await companyService.register(state.company)
            $toastNotification('success', 'Success!', 'Email confirmation link sent to your email')
            state.newCompanyID = response.data.id
        }catch(error){
            state.error = error.message
        }
        state.isPageLoading = false
    }
}

async function SendConfirmationLink(){
    state.isPageLoading = true
    try{
        await companyService.resendConfirmation({ id: state.newCompanyID})
        $toastNotification('success', '', 'Email confirmation link sent to your email')
    }catch(error){
        $toastNotification('error', '', error.message)
        state.error = error.message
    }
    state.isPageLoading = false
}

</script>