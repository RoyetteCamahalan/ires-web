<template>
    <div v-if="isShow" class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 bg-black bg-opacity-50 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex transition-all duration-300 ease-in-out"
        id="user-modal" aria-modal="true" role="dialog">
        <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div class="relative bg-white rounded-2xl shadow-lg">
                <div class="flex px-4 py-2 rounded-t border-b">
                    <button
                    type="button"
                    class="text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-900 rounded-full text-sm p-1.5 inline-flex items-center"
                    @click="$emit('modalClose')"
                    >
                    <Icon name="material-symbols:arrow-back" class="w-5 h-5"></Icon>
                    </button>
                    <h3 class="ml-3 textlg font-semibold my-auto">{{ title }}</h3>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props: ['title','isShow'],
    emits: ['modalClose'],
    setup() {
        
    },
}
</script>
