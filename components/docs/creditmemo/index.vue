<template>
    <div>
        <h1 id="creditmemo" class="mt-6 text-lg text-blue-700 font-semibold"># Credit Memo</h1>
        <div class="m-4 text-justify space-y-2">
            <p class="mt-2">Go to Sidebar then click `Credit Memo` menu to open the page. You can filter by date range to load list of credit memos. 
                In creating new credit memo, click `Create New` to open the credit memo form.</p>

            <div class="mt-4 flex justify-center">
                <img src="/img/docs/creditmemo.png" class="m-2 border rounded-xl shadow-lg"/>
            </div>
            <p class="mt-2">The following informations are need:</p>
            <p class="ml-2"><span class="font-semibold">Client</span>: The person or company that will receive the credit.</p>
            <p class="ml-2"><span class="font-semibold">Date</span>: The actual date of the credit memo (not the date the credit memo was encoded).</p>
            <p class="ml-2"><span class="font-semibold">CM Type</span>: The type of credit memo. You can manage the list under `Mater Files` then `Credit Types`.</p>
            <p class="ml-2"><span class="font-semibold">Payables</span>: The list of payables for the selected client to which the credit memo will be deducted. 
                To add payables, click `Add New` to load and search all client payable.</p>
            <p class="mt-2">After completely filling on the form, click `Save`.</p>
        </div>
        <h1 id="voidcreditmemo" class="mt-6 text-lg text-blue-700 font-semibold"># Void Credit Memo</h1>
        <div class="m-4 text-justify">
            <p class="mt-2">You can void credit memo in Credit Memo page. On your selected credit memo, click option the `Void Credit Memo`. The system will require an overriding account (account with Admin Role) to
                successfully void the credit memo. Remarks is also required.
            </p>
        </div>
    </div>
</template>