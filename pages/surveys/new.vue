<template>
  <div>
    <NuxtLayout name="admin">
        <UiSurveyForm :formStatus="0"></UiSurveyForm>
    </NuxtLayout>
  </div>
</template>

<script setup>

definePageMeta({
    middleware: ["authenticated"]
})

</script>
