<template>
    
    <div id="contactus" class="mt-28">
        <div
          data-aos="flip-up"
          class="text-center max-w-screen-md mx-auto aos-init aos-animate"
        >
          <div class="flex flex-wrap pb-6">
            <div class="grow-0 shrink-0 basis-auto mb-6 md:mb-0 w-full md:w-6/12 px-3 lg:px-6">
              <h1 class="mb-4 font-bold text-darken my-3 text-2xl">
                Contact Us
              </h1>
              <p class="text-gray-500">
                Don't hesitate to contact us, we are way more happy to help you. Send us your concerns and inquiries.
              </p>
            </div>
            <div class="grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-6/12 px-3 lg:px-6 pt-4">
              <LoadingSpinner :isActive="state.isPageLoading">
                    <form method="POST" @submit.prevent="sendMail">
                        <div class="text-left">
                            <FormTextField name="name" placeholder="Name" class="mt-2" v-model="state.name"></FormTextField>
                            <FormError :error="v$.name && v$.name.$errors && v$.name.$errors.length > 0 ? v$.name.$errors[0].$message : null "/>
                            <FormTextField name="email" placeholder="Email Address" class="mt-2" v-model="state.email"></FormTextField>
                            <FormError :error="v$.email && v$.email.$errors && v$.email.$errors.length > 0 ? v$.email.$errors[0].$message : null "/>
                            <FormTextArea name="message" placeholder="Message" class="mt-2" v-model="state.message"></FormTextArea>
                            <FormError :error="v$.message && v$.message.$errors && v$.message.$errors.length > 0 ? v$.message.$errors[0].$message : null "/>
                            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                            
                        </div>
                        <button v-if="!state.isSent" type="submit" class="block w-full rounded-lg bg-blue-700 text-white px-3 py-2 mt-2">Send</button>
                        <button v-else type="button" class="block w-full rounded-lg bg-gray-200 text-green-700 px-3 py-2 mt-2">Message Sent
                            <Icon name="material-symbols:check-circle-outline" class="w-6 h-6"></Icon>
                        </button>
                    </form>
                </LoadingSpinner>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { clientService } from '@/components/api/ClientService';

const state = reactive({
    error: '',
    isPageLoading: false,
    name: '',
    email: '',
    message: '',
    isSent: false
})

const validators = computed(() => {
    return {
        name: { required: helpers.withMessage('This field is required.', required) },
        email: { required: helpers.withMessage('This field is required.', required),
                 email: helpers.withMessage('Email is invalid', email) },
        message: { required: helpers.withMessage('This field is required.', required) },
    }
})

const v$ = useVuelidate(validators, state)

async function sendMail(){
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true
        try{
            const params = {
                name: state.name,
                email: state.email,
                message: state.message
            }
            await clientService.sendMail(params)
            state.error = ''
            state.isSent = true
        }catch(error){
            state.error = error
        }
        state.isPageLoading = false
    }
}
</script>
