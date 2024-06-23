import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const base64Encode = (data) => {
      return btoa(data);
    }
    const base64Decode = (data) => {
        return atob(encodedId);
    }
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const formatAmount = (amount, decimal = 2) =>{
        return numberWithCommas(parseFloat(amount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: decimal }))
    }
    const dateInterVal = (date1, date2) =>{
      if(!date2)
        date2 = new Date()
      var hours = parseInt(Math.abs(date1 - date2) / 36e5);
      if(hours < 1)
        return 'a few minutes ago'
      else if(hours === 1)
        return `${hours} hour ago`
      else if(hours < 24)
        return `${hours} hours ago`
      else{
        var days = parseInt(Math.abs(date1 - date2) / (60 * 60 * 1000 * 24));
        if(days === 1)
          return `Yesterday`
        else
          return `${days} days ago`
      }
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
    const PettyCashTransTypeDesc = (transtype) =>{
      if(transtype == 0)
          return 'Cash In'
      else if(transtype == 1)
        return 'Transfer Out'
      else if(transtype == 2)
        return 'Transfer In'
      else
        return ''
    }

    const downloadFile = async (url) => {
      try {    
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.pdf'); // Update with the actual file name
        link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Failed to download file:', err);
      }
    };
    return {
      provide: {
        formatAmount: formatAmount,
        PaymentModeDescription: PaymentModeDescription,
        ReceiptTypeDesc: ReceiptTypeDesc,
        PettyCashTransTypeDesc: PettyCashTransTypeDesc,
        dateInterVal: dateInterVal,
        base64Encode: base64Encode,
        base64Decode: base64Decode,
        downloadFile: downloadFile
      }
    }
  })