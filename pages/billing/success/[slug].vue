<template>
    <div class="fixed inset-x-0 h-full flex items-start bg-black bg-opacity-50 sm:items-center sm:justify-center">
    <!-- Modal -->
    <div class="w-full mx-2 px-6 py-4 bg-white rounded-b-lg sm:rounded-lg sm:m-4 sm:max-w-xl" role="dialog" id="modal">
        <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
        <div class="w-full relative flex flex-col">

            <LoadingSpinner :is-active="state.isPageLoading">
                <div class="w-full relative flex items-start justify-center">
                    <div class="absolute -top-14">
                        <Icon v-if="state.error && state.error.length>0" name="ri:close-circle-line" size="6rem" class="text-red-400 bg-white rounded-full" />
                        <Icon v-else name="material-symbols:check-circle" size="6rem" class="text-green-400 bg-white rounded-full" />
                        
                    </div>
                    <span class="mt-10 mb-4 text-xl text-gray-700 text-center">
                            {{ (state.error && state.error.length>0) || state.isPageLoading ? "" : "Awesome!" }}
                    </span>
                </div>
                <div>
                    <p class="text-sm text-gray-500 text-center">
                        {{ state.message }}
                    </p>
                </div>
                <FormButton type="submit" buttonStyle="primary" @click="navigateTo('/billing')" class="block w-full">
                    Back to Billing
                </FormButton>
            </LoadingSpinner>
        </div>
    </div>
    </div>
</template>

<script setup>
import { billingService } from '@/components/api/BillingService';
import { billStatus } from '@/contants/consts';


const route = useRoute()
const slug = route.params.slug

const state = reactive({
    isPageLoading: true,
    message: 'Verifying payment...',
    error: ''
})


onMounted(async () =>{
    verifyPayment()
})

async function verifyPayment(){
    state.isPageLoading = true
    try{
        const response = await billingService.completePayment( { id: slug })
        if(response.data && response.data.status == billStatus.paid)
            state.message = "Payment has been verified."
        else
            state.message = "We are unable to process your request."
    }catch(error){
        state.error = "Something"
        state.message = "We are unable to process your request."
    }
    state.isPageLoading = false
}
</script>