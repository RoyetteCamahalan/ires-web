<template>
    <div>
        <NuxtLayout name="admin" title="Billing">
            <UiBillingPlans :isUpgrade="state.isUpgrade"></UiBillingPlans>
            <UiBilling class="mt-8"></UiBilling>
        </NuxtLayout>
    </div>
</template>
<script setup>

const route = useRoute()

const state = reactive({
    isUpgrade: (route.query.upgrade && route.query.upgrade === '1')
})
</script>