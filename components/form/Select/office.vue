<script setup lang="ts">
import { useOfficeStore } from "~/store/office";

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
const { activeOffices } = officeStore;
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
    <InputGroupAddon v-if="props.showCreate">
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
