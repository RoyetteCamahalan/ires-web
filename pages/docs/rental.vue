<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-2xl font-semibold"># Rental App</h1>
                <p class="mx-4 mt-4 text-justify">Before we start creating and managing rental contracts, we will first setup core components need for a contract.</p>


                <h1 id="building" class="mt-6 text-lg text-blue-700 font-semibold"># Building and Rental Units</h1>
                <p class="mx-4 mt-4 text-justify"><span class="font-semibold">Building</span>: Represents to the property that consists of Rooms/Doors/Unit</p>
                <p class="mx-4 mt-1 text-justify"><span class="font-semibold">Rental Units</span>: Represents the Rooms/Doors/Unit to be rented. A client can rent multiple units or the whole building. </p>
                
                <h1 class="mx-2 mt-4 text-blue-700 font-semibold">Manage Building</h1>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/rental_building.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify">
                    <p class="mt-2">To create Building, go to Sidebar then Building to open the page. Click `Create New` button on the upper right to open the entry form. Enter the building name and address then `Submit`.</p>
                    <p class="mt-2">To edit Building, Click `Edit Icon` on the selected building. Click `Submit` to save changes.</p>
                </div>


                <h1 class="mx-2 mt-6 text-blue-700 font-semibold">Manage Rental Units</h1>
                <p class="mx-4 mt-4 text-justify">Rentals units are manage inside the Building where it belong. In Building Page, click `Manage` or the building name to open the
                    rental unit page. You switch building inside the rental unit page for management.
                </p>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/rental_unit.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify">
                    <p class="mt-2">To create Rental Unit, click `Create New` button on the upper right to open the entry form. Enter the Room #/Door/Unit name, Floor Area and the 
                        suggested monthly rent then `Submit`.</p>
                    <p class="mt-2">To edit Rental Unit, Click `Edit Icon` on the selected Rental Unit. Click `Submit` to save changes.</p>
                </div>
                <h1 id="create_contract" class="mt-6 text-lg text-blue-700 font-semibold"># Create Contracts</h1>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/create_rental_contract.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify space-y-2">
                    <p class="mt-2">Go to Sidebar then click `Rental Contracts` menu to open the page. In creating a contract, the following informations are needed:</p>
                    <p class="ml-2"><span class="font-semibold">Client</span>: The person or company that will rent. You can create new client by clicking `Create` button beside the field or
                        manage your client listing under Sidebar > Clients menu
                    </p>
                    <p class="ml-2"><span class="font-semibold">Contract Date</span>: The date indicated in the contract document</p>
                    <p class="ml-2"><span class="font-semibold">Billing Schedule</span>: Specifies the nth day the statement will be generated (e.g. every 15th of the month). 
                        For cases that the billing schedule is less than the day of contract date (e.g. billing sched is every 15th and the contract date is July 25, 2024), the first 
                        statement bill will be on the 15th day of Feb.</p>
                    <p class="ml-2"><span class="font-semibold">Contract Term</span>: The number of months the contract will end. Check `Open Contract` if there is no fix term in contract document</p>
                    <p class="ml-2"><span class="font-semibold">Monthly Rent</span>: The amount to be billed monthly as specified in the contract</p>
                    <p class="ml-2"><span class="font-semibold">Deposit Amount</span>: The amount to be billed before the contract starts</p>
                    <p class="ml-2"><span class="font-semibold">Advance Rent</span>: The number of months the client will pay the monthly rent in advance</p>
                    <p class="ml-2"><span class="font-semibold">Monthly Penalty %</span>: The percentage on which will added to the monthly rent if the client fails to pay the 
                        initial amount on the given date.</p>
                    <p class="ml-2"><span class="font-semibold">Penalty Extension</span>: The number of days alloted to waived the generation of penalty. If the client will 
                        fails to pay the initial amount on the given date plus the number of days of extension, the penalty will be computed.</p>
                    <p class="ml-2"><span class="font-semibold">Remarks</span>: Additional notes on the contract</p>
                    <p class="ml-2"><span class="font-semibold">List of Unit/Properties</span>: Contract can include many rental unit. Click `Add Unit` to search vacant units.
                        The suggested monthly rent will not matter, the system will use the monthly rent specified in the contract. To remove a unit, click `Delete Icon` on
                        the selected unit.
                    </p>
                    <p class="mt-2">After completely filling on the form, click `Save`.</p>
                </div>

                <h1 id="manage_contract" class="mt-6 text-lg text-blue-700 font-semibold"># Manage Contract</h1>
                <div class="mt-4 flex justify-center">
                    <img src="/img/docs/manage_rental_contract.png" class="m-2 border rounded-xl shadow-lg"/>
                </div>
                <div class="m-4 text-justify space-y-2">
                    <p class="mt-2">In Rental Contracts page, click contract number of the selected contract to open the management page</p>
                    <p class="ml-2"><span class="font-semibold">Options > Edit Contract</span>: Update contract information (same form with create contract)</p>
                    <p class="ml-2"><span class="font-semibold">Options > Post Other Fees</span>: Aside from deposit, advance rent and monthly rent, you can charge
                        other fees to client(e.g. Light Replacement Fee and Maintenance Fee). The list of other fees can be manage Sidebar under Master Files then Other Fees.</p>
                    <p class="ml-2"><span class="font-semibold">Options > ReCompute History</span>: The system will recompute the contract history. Changes in contract details, penalty
                        computation and other inputs will be calculated from the beginning of the contract.</p>
                    <p class="ml-2"><span class="font-semibold">Options > Attachments</span>: Scanned documents related to the contract like Contract documents and Bank deposit slips can be attached.</p>
                    <p class="ml-2"><span class="font-semibold">Options > Terminate Contract</span>: When contract is terminated, you are required to input the date of termination.</p>
                    <p class="ml-2"><span class="font-semibold">Print > Print History</span>: Prints the account history</p>
                    <p class="ml-2"><span class="font-semibold">Print > Print SOA</span>: Prints the statement of account. Client payables will be listed here. Used on informing clients
                        with their total payables.</p>
                </div>

                <h1 id="other_fees" class="mt-6 text-lg text-blue-700 font-semibold"># Other Fees</h1>
                <div class="m-4 text-justify">
                    <p class="mt-2">To create Other Fees, click `Create New` button on the upper right to open the entry form. Enter the Name, Amount then `Submit`. During posting of 
                        other fees, the amount will be a default charge amount but the amount is editable.
                    </p>
                    <p class="mt-2">To edit Other Fee, Click `Edit Icon` on the selected Other Fee. Click `Submit` to save changes.</p>
                </div>

                <DocsAttachment></DocsAttachment>
                <DocsPayment></DocsPayment>
                <DocsCreditmemo></DocsCreditmemo>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>

definePageMeta({
    auth: false
})


</script>