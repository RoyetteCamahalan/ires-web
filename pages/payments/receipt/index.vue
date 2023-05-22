<template>
    <div>
        <NuxtLayout name="admin">
            <div class="p-3 h-screen bg-gray-50">
                <div class="m-2 py-1 px-2 shadow-lg bg-white rounded-lg">
                    <div class="flex justify-between">
                        <button class="text-gray-500" @click="navigateTo('/payments')">
                            <Icon name="material-symbols:arrow-back-ios"></Icon>
                            Back
                        </button>
                        <div class="flex">
                            <!-- <FormButton buttonStyle="primary" class="mr-2">
                                <Icon name="material-symbols:download" class="w-5 h-5"></Icon>
                                Download
                            </FormButton> -->
                            <FormButton buttonStyle="primary"
                                @click="print">
                                <Icon name="material-symbols:print" class="w-5 h-5"></Icon>
                                Print
                            </FormButton>
                        </div>
                    </div>
                </div>
                <UiPaymentReceipt :paymentID="paymentID"></UiPaymentReceipt>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

const route = useRoute()
const paymentID = route.query.id ? route.query.id : 0

function print(){
    window.open('/payments/print?id=' + paymentID, '_blank')
}
</script>