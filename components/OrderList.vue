<template>
    
    <div class="w-80 bg-white shadow-xs dark:bg-gray-800 mr-2">
        <div class="bg-blue-500 p-2 rounded-b-none rounded-t">
            <h4 class="text-sm font-semibold text-white dark:text-gray-300">
                {{ order.tablename }}
            </h4>
        </div>
        <div class="p-2 border rounded-t-none rounded-b">
            <span class="font-semibold text-xs">Order Time: {{ order.orderdate }}</span>
            <div v-for="orderdetail in order.orderdetails" :key="orderdetail.orderdetailid">
                <OrderItem :orderdetail="orderdetail"></OrderItem>
            </div>
            <div v-if="order.remarks !== ''" class="mt-2 border rounded shadow-sm p-2">
                <div class="block text-xs">Remarks:</div>
                <p class="text-xs mt-2 underline"> {{ order.remarks }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['order'],
    setup(){
        
    }
}
</script>