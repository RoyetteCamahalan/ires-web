<template>
    <div>
        <div class="p-3 h-screen bg-gray-50">
            <UiPaymentReceipt :paymentID="paymentID" :isPrint="true"></UiPaymentReceipt>
        </div>
    </div>
</template>

<script setup>

const route = useRoute()
const paymentID = route.query.id ? route.query.id : 0
</script>