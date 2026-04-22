<script setup lang="ts">
import { useVendorStore } from "~/store/vendor";
import { Vendor } from "~/types/entities";

const value = defineModel<number | null>({ default: null });

const props = withDefaults(
  defineProps<{
    defaultOption?: any;
    showCreate?: boolean;
    size?: string;
  }>(),
  {
    defaultOption: null,
    showCreate: false,
    size: "",
  },
);

const vendorStore = useVendorStore();

const options: Ref<Vendor[]> = ref([]);
const state = reactive({
  isLoading: false,
  modalVendorShow: false,
});
let timeout: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  if (props.defaultOption) {
    options.value = [];
    options.value.push(props.defaultOption);
  } else searchChange("");
});

watch(
  () => props.defaultOption,
  async () => {
    if (props.defaultOption) {
      options.value = [];
      options.value.push(props.defaultOption);
    }
  },
);

const onFilter = (event: { value: string }) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    searchChange(event.value);
  }, 500);
};

async function searchChange(query: string) {
  state.isLoading = true;
  try {
    const response = await vendorStore.getVendors(1, false, query);
    options.value = [];
    console.log(response);
    if (props.defaultOption) {
      options.value = [];
      options.value.push(props.defaultOption);
    }
    response.forEach((vendor: Vendor) => {
      if (
        !(
          props.defaultOption &&
          props.defaultOption.vendorid === vendor.vendorid
        )
      ) {
        options.value.push(vendor);
      }
    });
  } catch (error) {}
  state.isLoading = false;
}

const onCloseVendor = (id = 0, name = "") => {
  if (id > 0) {
    options.value.push({
      vendorid: id,
      vendorname: name,
    } as Vendor);
    value.value = id;
  }

  state.modalVendorShow = false;
};
</script>

<template>
  <InputGroup>
    <Select
      v-model="value"
      :options="options"
      optionLabel="vendorname"
      optionValue="vendorid"
      filter
      placeholder="Search vendor"
      :loading="state.isLoading"
      @filter="onFilter"
      :showClear="true"
      class="w-full"
      :size="size"
    />
    <InputGroupAddon v-if="showCreate">
      <Button
        label="Create"
        @click="state.modalVendorShow = true"
        :size="size"
      />
    </InputGroupAddon>
  </InputGroup>

  <Modal
    title="Add New Record"
    :isShow="state.modalVendorShow"
    @modalClose="onCloseVendor"
  >
    <UiVendor
      @modalClose="onCloseVendor"
      :formStatus="0"
      :selectedDataID="0"
    ></UiVendor>
  </Modal>
</template>
