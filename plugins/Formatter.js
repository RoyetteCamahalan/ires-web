import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const formatAmount = (amount, decimal = 2) =>{
        return numberWithCommas(parseFloat(amount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: decimal }))
    }
    return {
      provide: {
        formatAmount: formatAmount
      }
    }
  })