<template>
    <table>
        <thead>
            <tr class="text-xs font-semibold tracking-wide text-left uppercase border-bg-gray-50 border-b">
                <th v-for="(item, index) in columnHeaders" :key="index" :width="item.width"
                    class="px-4 py-3" :class="[
                        item.textAlign === 'left' && 'text-left',
                        item.textAlign === 'right' && 'text-right',
                        item.textAlign === 'center' && 'text-center',
                    ]">
                    {{ item.name }}
                </th>
            </tr>
        </thead>
        <tbody class="divide-y">
            <slot name="body"></slot>
            <tr v-if="isLoading || (data && data.data && data.data.length === 0)">
                <td :colspan="columnHeaders.length" class="text-center h-36">
                    <div class="flex items-center justify-center flex-col gap-2" v-if="isLoading">
                        <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        Loading...
                    </div>
                    <div v-else>
                        No data found.
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    props: ['columnHeaders', 'isLoading', 'data'],
    setup() {
        
    }
}
</script>
