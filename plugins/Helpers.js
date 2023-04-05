import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const formatAmount = (amount, decimal = 2) =>{
        return numberWithCommas(parseFloat(amount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: decimal }))
    }
    const PaymentModeDescription = (mode) => {
      if(mode == 1)
          return 'Check'
      else if(mode == 2)
        return 'Bank Transfer'
      else if(mode == 3)
        return 'E-Wallet'
      else
        return 'Cash'
    }

    const ReceiptTypeDesc = (receiptType) =>{
      if(receiptType == 1)
          return 'OR'
      else if(receiptType == 2)
        return 'AR'
      else if(receiptType == 3)
        return 'PR'
      else
        return ''
    }
    return {
      provide: {
        formatAmount: formatAmount,
        PaymentModeDescription: PaymentModeDescription,
        ReceiptTypeDesc: ReceiptTypeDesc
      }
    }
  })