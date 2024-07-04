<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-2xl font-semibold"># Surveying App</h1>

                <h1 class="mt-6 text-lg text-blue-700 font-semibold"># Create Survey</h1>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/survey.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify space-y-2">
                    <p class="mt-2">Go to Sidebar then click `Surveys` menu to open the page. Click `Create New` to open survey form. The following informations are needed:</p>
                    <p class="ml-2"><span class="font-semibold">Client</span>: The person or company that request the survey. You can create new client by clicking `Create` button beside the field or
                        manage your client listing under Sidebar > Clients menu
                    </p>
                    <p class="ml-2"><span class="font-semibold">Owner</span>: The name of the owner of the property and may not be the same as the client.</p>
                    <p class="ml-2"><span class="font-semibold">Title No.</span>: Title of the property.</p>
                    <p class="ml-2"><span class="font-semibold">Survey No.</span>: The unique identification of this survey (Your preference).</p>
                    <p class="ml-2"><span class="font-semibold">Date of Survey</span>: The date/schedule of the survey.</p>
                    <p class="ml-2"><span class="font-semibold">Contract Price</span>: The total contract price agreed.</p>
                    <p class="ml-2"><span class="font-semibold">Property</span>: The name of the property (if not applicable, enter landmark of the property).</p>
                    <p class="ml-2"><span class="font-semibold">Land Area</span>: The total area of the property in Sqm.</p>
                    <p class="ml-2"><span class="font-semibold">Location</span>: The address of the property.</p>
                    <p class="ml-2"><span class="font-semibold">Survey Details</span>: The full details of the survey.</p>
                    <p class="mt-2">After completely filling on the form, click `Save`.</p>
                </div>

                <h1 id="manage_contract" class="mt-6 text-lg text-blue-700 font-semibold"># Survey Status</h1>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/survey_status.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <p class="ml-2">The default status of new survey is `Pending`. You can update the status by clicking `Options` then tag new status. Below are the list of status:</p>
                <div class="m-4 text-justify space-y-2">
                    <p class="ml-2"><span class="font-semibold">Pending</span>: The survey is not yet performed</p>
                    <p class="ml-2"><span class="font-semibold">Surveyed</span>: The survey was performed</p>
                    <p class="ml-2"><span class="font-semibold">Cancelled</span>: The survey has been cancelled</p>
                </div>

                <DocsAttachment></DocsAttachment>
                <DocsPayment></DocsPayment>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>

definePageMeta({
    auth: false
})


</script>