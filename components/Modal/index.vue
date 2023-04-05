<template>
    <div v-if="isShow" class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 bg-black bg-opacity-50 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex transition-all duration-300 ease-in-out"
        id="user-modal" aria-modal="true" role="dialog">
        <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div class="relative bg-white rounded-2xl shadow-lg">
            <div class="flex justify-between items-start px-5 py-2 rounded-t border-b">
                <h3 class="textlg font-semibold my-auto">{{ title }}</h3>
                <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                @click="$emit('modalClose')"
                >
                <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    ></path>
                </svg>
                </button>
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
