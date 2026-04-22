<script setup lang="ts">
defineOptions({
  name: "BillingAccountsCreatePage",
});

function handleSaved(id: number) {
  navigateTo(`/billing-accounts/${id}`);
}

function goBack() {
  navigateTo("/billing-accounts");
}
</script>

<template>
  <NuxtLayout name="admin" title="New Billing Account">
    <div class="mx-4 mt-4">
      <Button
        label="Back To Billing Accounts"
        severity="secondary"
        text
        @click="goBack"
      />
    </div>
    <Card class="m-4 lg:w-1/2">
      <template #title> Create New Billing Account </template>
      <template #content>
        <UiBillingAccountForm @saved="handleSaved" @cancel="goBack" />
      </template>
    </Card>
  </NuxtLayout>
</template>
