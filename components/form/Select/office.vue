<script setup lang="ts">
import { useOfficeStore } from "~/store/office";
import { useUserStore } from "~/store/user";

const value = defineModel<number | null>({ default: null });

const props = withDefaults(
  defineProps<{
    showCreate?: boolean;
    isAccount?: boolean;
    canClear?: boolean;
    size?: string;
  }>(),
  {
    showCreate: false,
    isAccount: false,
    canClear: false,
    size: "medium",
  },
);

const officeStore = useOfficeStore();
const userStore = useUserStore();
const { activeOffices } = officeStore;
const user = userStore.getUser as any;
</script>

<template>
  <InputGroup>
    <Select
      v-model="value"
      :options="activeOffices"
      optionLabel="accountname"
      optionValue="accountid"
      placeholder="Search Office"
      class="w-full"
      :size="props.size"
      fluid
    />
    <InputGroupAddon v-if="props.showCreate && (user && (user.companyid !== 15 || user.isappsysadmin))">
      <Button
        as="a"
        label="Manage"
        href="/masterfiles/offices"
        target="_blank"
        rel="noopener"
        :size="props.size"
      />
    </InputGroupAddon>
  </InputGroup>
</template>
