import { defineNuxtPlugin } from '#app';
import { fileService } from '@/components/api/FileService';

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

    const downloadFile = async (filepath, fileName) => {
      try {
        const response = await fileService.download(filepath)
        console.log(fileName)
        console.log(response)
        // Create a link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([response]));

        // Set the download attribute with a filename
        link.setAttribute('download', fileName);
        
        // Append the link to the body
        document.body.appendChild(link);
        
        // Programmatically click the link to trigger the download
        link.click();
        
        // Clean up by revoking the object URL and removing the link element
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
      // try {    
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', filename); // Update with the actual file name
      //   //link.target = '_blank'
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // } catch (err) {
      //   console.error('Failed to download file:', err);
      // }
    }
    const getNumberRank = (data) =>{
      var lastChar = data.toString().slice(-1); 
      var last2Char = data.toString().slice(-2); 
      if(lastChar == '1' && last2Char != '11')
        return data + 'st'
      else if(lastChar == '2' && last2Char != '12')
        return data + 'nd'
      else if(lastChar == '2' && last2Char != '13')
        return data + 'nd'
      else
        return data + 'th'
    }
    return {
      provide: {
        formatAmount: formatAmount,
        PaymentModeDescription: PaymentModeDescription,
        ReceiptTypeDesc: ReceiptTypeDesc,
        PettyCashTransTypeDesc: PettyCashTransTypeDesc,
        dateInterVal: dateInterVal,
        base64Encode: base64Encode,
        base64Decode: base64Decode,
        downloadFile: downloadFile,
        getNumberRank: getNumberRank
      }
    }
  })