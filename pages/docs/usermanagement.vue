<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-2xl font-semibold"># User Management</h1>
                <p class="mx-4 mt-4 text-justify">In this page, you can manage the user of company. Create, deactivate and manage user roles happens here.</p>

                <h1 id="building" class="mt-6 text-lg text-blue-700 font-semibold"># User Roles</h1>
                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Admin</span>: Has full access to the application. </p>
                <p class="mx-4 mt-1 text-justify"><span class="font-semibold">User</span>: Has limited access to transactions only. Master Files, User Management, Void overriding and 
                    other restrictive portion of tha application are not available on this role.</p>

                <h1 id="register" class="mt-6 text-lg text-blue-700 font-semibold"># Create User</h1>
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 sm:col-span-1 flex justify-center">
                        <img src="/img/docs/user_info.png" class="m-2 border rounded-xl shadow-lg"/>
                    </div>
                    <div class="col-span-2 sm:col-span-1 flex justify-center">
                        <img src="/img/docs/user_account.png" class="m-2 border rounded-xl shadow-lg"/>
                    </div>
                </div>
                
                <p class="mx-4 mt-4 text-justify">* To deactivate user, edit selected user then uncheck `Is Active?`</p>
                <p class="mx-4 mt-4 text-justify">* To set user role, edit selected user then check/uncheck `Is Admin?`.</p>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>

definePageMeta({
    auth: false
})


</script>