<template>
    <div>
        <h1 id="payments" class="mt-6 text-lg text-blue-700 font-semibold"># Payments</h1>
        <div class="m-4 text-justify space-y-2">
            <p class="mt-2">Go to Sidebar then click `Payments` menu to open the page. You can filter by date range to load list of payments. Collection report is also availbe beside
                date range filter. In creating new payment, click `Create New` to open the payment form.</p>

            <div class="mt-4 flex justify-center">
                <img src="/img/docs/payment.png" class="m-2 border rounded-xl shadow-lg"/>
            </div>
            <p class="mt-2">The following informations are need:</p>
            <p class="ml-2"><span class="font-semibold">Client</span>: The person or company that will pay.</p>
            <p class="ml-2"><span class="font-semibold">Payment Date</span>: The actual date of the payment (not the date the payment was encoded).</p>
            <p class="ml-2"><span class="font-semibold">Contract Date</span>: The date indicated in the contract document</p>
            <p class="ml-2"><span class="font-semibold">Payable List</span>: The list of payables for the selected client. To add payables, click `Add New` to load and search all
                client payable.</p>
            <p class="ml-2"><span class="font-semibold">Payment Mode</span>: Select the mode of payment (Cash, Check, Bank Deposit/Transfer and E-Wallet).</p>
            <p class="ml-6">* For Check payment, the date of check, check number, issuing bank and account # is required</p>
            <p class="ml-6">* For Bank Deposit/Transfer, the date of deposit/transfer, reference number and your company's bank account where the amount was deposited/transfered. To manage bank
                accounts, go to `Master Files` then `Bank Accounts`.
            </p>
            <p class="ml-6">* For E-Wallet, select wallet type (if not in the list, go to `Master Files` then `Banks/E-Wallets`) the enter the transaction date and reference number</p>
            <p class="ml-2"><span class="font-semibold">Remarks</span>: Brief notes regarding this payment.</p>
            <p class="ml-2"><span class="font-semibold">Receipt Type</span>: (Official Receipt, Acknowledgement Receipt and Probationary Receipt) Each receipt type has its own 
                incremental receipt number (beginning at 1) but you can also edit it if you have the actual receipt number. Take note that the system is now allowed to print Official Receipt but 
                can print Trust Receipt as an alternative.</p>
            <p class="ml-2"><span class="font-semibold">Paid By</span>: If the payment was made in person, you can enter the name of the person who does the payment.</p>
            <p class="mt-2">After completely filling on the form, click `Save` then you can now print the receipt.</p>
        </div>
        <h1 id="voidpayments" class="mt-6 text-lg text-blue-700 font-semibold"># Void Payment</h1>
        <div class="m-4 text-justify">
            <p class="mt-2">You can void payment in Payment page. On your selected payment, click option the `Void Payment`. The system will require an overriding account (account with Admin Role) to
                successfully void the payment. Remarks is also required.
            </p>
        </div>
    </div>
</template>