<template>
    <div v-if="!(isLoading || (data && data.data && data.data.length === 0))" 
        class="rounded-b-lg grid grid-cols-12 px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <span class="w-full col-span-12 sm:col-span-4 sm:text-left text-center sm:my-auto"
            v-if="data && data.data">
        </span>
        <!-- Pagination -->
        <div class="w-full col-span-12 sm:col-span-8 mt-2 sm:mt-auto sm:flex sm:justify-end text-center">
            <nav aria-label="Table navigation">
                <ul class="inline-flex items-center">
                <li>
                    <button class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple" aria-label="Previous"
                        @click="$emit('onPageChanged',currentPage - 1)"
                        :disabled="currentPage == 1">
                    <svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                    </button>
                </li>
                <li v-for="page in state.pages" :key="page.page">
                    <button v-if="page.page != -3" class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                        :class="currentPage == page.page ? 'text-white transition-colors duration-150 bg-blue-600 border border-r-0 border-blue-600' : '' "
                        @click="$emit('onPageChanged',page.page)">
                        {{ page.text }}
                    </button>
                    <span v-else class="px-3 py-1">{{ page.text }}</span>
                </li>
                <li>
                    <button class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next"
                        @click="$emit('onPageChanged',currentPage + 1)"
                        :disabled="currentPage == data.totalPages">
                    <svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path>
                    </svg>
                    </button>
                </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
import { reactive, watch } from 'vue';

export default {
    props: ['data', 'isLoading', 'currentPage'],
    emits: ['onPageChanged'],
    setup(props) {
        const state = reactive({
            pages:[]
        })
        watch(() => props.data, (data)=>{
            if(data && data.data){
                state.pages = []
                let leftPointer = data.pageNumber - 2
                let rightPointer = data.pageNumber + 2
                
                // if(data.pageNumber == data.totalPages)
                //     leftPointer =  data.totalPages - 2

                if (data.pageNumber < 4)
                {
                    leftPointer = 1
                    rightPointer = 5
                }
            
                // if (rightPointer == data.totalPages)
                //     rightPointer = data.totalPages

                let pageNumber = 1
                while (pageNumber <= data.totalPages)
                {
                    if(pageNumber == 1 ||
                        (pageNumber > leftPointer && pageNumber < rightPointer) ||
                        (pageNumber == rightPointer && rightPointer == data.totalPages - 1) ||
                        pageNumber == data.totalPages)
                    {
                        state.pages.push({ page: pageNumber, text: pageNumber })
                    }
                    else if( (pageNumber == leftPointer) ||
                            (pageNumber == rightPointer && pageNumber != (data.totalPages - 1)))
                    {
                        state.pages.push({ page: -3 , text: '...' })
                    }
                    pageNumber++;
                }
            }
        })

        return {
            state
        }
    },
}
</script>
