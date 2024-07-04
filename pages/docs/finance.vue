<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-2xl font-semibold"># Finance App</h1>
                <h1 id="manage_contract" class="mt-6 text-lg text-blue-700 font-semibold"># The Basics - Overview</h1>

                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Offices</span>: A component of the company. It may hold a separate petty cash fund and expense monitoring. 
                    The list is manage in `Master Files` > `Offices`.
                </p>
                <p class="mx-4 mt-1 text-justify"><span class="font-semibold">Petty Cash</span>: A revolving fund for each office in the company which expense are taken from.</p>
                <p class="mx-4 mt-1 text-justify"><span class="font-semibold">Expense Types</span>: Use to identity the type of expense. Expense types are categorize into `Operating Expense` and `Non-Operating Expense`.
                    The list is manage in `Master Files` > `Expense Types`.</p>
                <p class="mx-4 mt-1 text-justify"><span class="font-semibold">Vendors</span>: An entity that sells/render the expense.
                    The list is manage in `Master Files` > `Vendors`.
                </p>
                
                <h1 id="pettycash" class="mt-6 text-lg text-blue-700 font-semibold"># Petty Cash</h1>
                <p class="mx-4 mt-4 text-justify">This module manages the petty cash fund on each office. Transaction types are Cash In(Add fund) and Fund Transfer(Transfer amount
                    from one office to another). To open the page go to Sidebar then click `Petty Cash` menu.
                </p>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/pettycash_form.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify space-y-2">
                    <p class="mt-2">Click `Create New` to open Petty Cash form. The following informations are needed:</p>
                    <p class="ml-2"><span class="font-semibold">Office</span>: The target office for the transaction</p>
                    <p class="ml-2"><span class="font-semibold">Current Balance</span>: The actual petty cash balance of the selected office.</p>
                    <p class="ml-2"><span class="font-semibold">Transaction Type</span>: If transaction type is `Fund Transfer`, system will require to specify the destination office 
                        where the amount will be transfered.
                    </p>
                    <p class="ml-2"><span class="font-semibold">Amount</span>: The amount for Cash In or Transfer.</p>
                    <p class="ml-2"><span class="font-semibold">Ref #</span>: The reference number of the transaction (user defined).</p>
                    <p class="ml-2"><span class="font-semibold">Remarks</span>: Additional notes on the transaction</p>
                    <p class="ml-2"><span class="font-semibold">Date</span>: The actual date of the transaction</p>
                    <p class="mt-2">After completely filling on the form, click `Save`. If transaction type is Cash In, the amount will be added to the petty cash balance of the selected ofice.
                        On the other hand when Fund transfer, the amount will be deducted from the source office and will be added to the destination office.
                    </p>
                    <p class="mt-2">Visit office page to view petty cash balance. You can also view/print petty cash report by clicking option in the same page.
                    </p>
                </div>


                <h1 id="manage_expenses" class="mt-6 text-lg text-blue-700 font-semibold"># Manage Expenses</h1>
                <p class="mx-4 mt-4 text-justify">This module captures the company's expenses. To open the page go to Sidebar then click `Expenses` menu. You can filter expense by
                    date range. Below are the available expense reports:
                </p>
                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Expense Report</span>: The list of expense in all offices within the specified date range</p>
                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Expense Report by Type</span>: The list of expense (grouped by the type of expense) in all offices within the specified date range</p>
                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Expense Report by Type</span>: The list of expense (grouped by office) in all offices within the specified date range</p>

                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/expense_form.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify space-y-2">
                    <p class="mt-2">To create new expense, click `Create New` to open Expense form. The following informations are needed:</p>
                    <p class="ml-2"><span class="font-semibold">From Petty Cash?</span>: Indicates if the amount will be deducted to the office's petty cash fund</p>
                    <p class="ml-2"><span class="font-semibold">Vendor</span>: The company/individual who provides sales/services</p>
                    <p class="ml-2"><span class="font-semibold">Office</span>: The office the expense will be recorded</p>
                    <p class="ml-2"><span class="font-semibold">Petty Cash Balance</span>: The actual petty cash balance of the selected office (For viewing only)</p>
                    <p class="ml-2"><span class="font-semibold">Expense Type</span>: The type of expense</p>
                    <p class="ml-2"><span class="font-semibold">Amount</span>: The expense amount</p>
                    <p class="ml-2"><span class="font-semibold">Remarks</span>: Additional notes on the expense</p>
                    <p class="mt-2">After completely filling on the form, click `Save`. If `From Petty Cash` is checked, the amount will be deducted from the selected office.
                    </p>
                </div>

                <h1 id="voidexpense" class="mt-6 text-lg text-blue-700 font-semibold"># Void Expense</h1>
                <div class="m-4 text-justify">
                    <p class="mt-2">You can void expense in Expense page. On your selected expense, click option the `Void Transaction`. The system will require an overriding account (account with Admin Role) to
                        successfully void the expense. Remarks is also required.
                    </p>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>

definePageMeta({
    auth: false
})


</script>