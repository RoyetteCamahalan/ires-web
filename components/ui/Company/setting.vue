<script setup>
import { companyService } from '@/components/api/CompanyService';
import { useOfficeStore } from '~/store/office';

const emit = defineEmits(['close']);

onMounted(async () =>{
    await loadSettings();
})

const officeStore = useOfficeStore()

const state = reactive({
    isLoading: false,
    settings: {
        autocashinaccountid_survey: null
    }
})

const loadSettings = async () => {
    state.isLoading = true;
    try{
        const response = await companyService.getSettings();
        state.settings = response.data;
    }
    catch(error){}
    state.isLoading = false;
}

const saveSetting = async () => {
    state.isLoading = true;
    try{
        await companyService.updateSettings(state.settings);
        emit('close');
    }
    catch(error){}
    state.isLoading = false;
}
</script>
<template>
    <div class="p-6">
        <LoadingSpinner :is-active="state.isLoading">
            <div class="grid grid-cols-3 gap-2 items-center">
                <div class="text-xs text-gray-700">Auto Cash-In for Survey Payment:</div>
                <div class="col-span-2">
                    <Select 
                    v-model="state.settings.autocashinaccountid_survey"
                    :options="officeStore.activeOffices"
                    optionLabel="accountname"
                    optionValue="accountid"
                    class="w-full"
                    :showClear="true"
                    size="small"
                    />
                </div>
            </div>
            <div class="flex justify-end">
                <FormButton button-style="primary" size="small" @click="saveSetting">Save</FormButton>
            </div>
        </LoadingSpinner>
    </div>
</template>
<script setup>
</script>