<script setup lang="ts">
defineOptions({
  name: "EmptyState",
});

withDefaults(
  defineProps<{
    message: string;
    subMessage?: string;
    icon?: string;
    actionLabel?: string;
    actionIcon?: string;
  }>(),
  {
    subMessage: "",
    icon: "pi pi-inbox",
    actionIcon: "pi pi-plus",
  },
);

const emit = defineEmits<{
  action: [];
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
    >
      <i :class="[icon, 'text-2xl text-gray-400']" />
    </div>
    <p class="text-sm text-gray-500">{{ message }}</p>
    <p v-if="subMessage" class="text-xs text-gray-400 italic">
      {{ subMessage }}
    </p>
    <Button
      v-if="actionLabel"
      :label="actionLabel"
      :icon="actionIcon"
      class="mt-5"
      size="small"
      @click="emit('action')"
    />
  </div>
</template>
