import BaseAPIService from "./BaseAPIService";


class ExpenseService extends BaseAPIService{
    // async create(params: object): Promise<any> {
    //     return await this.request(`/bank`, 'POST', params)
    // }
    // async update(params: object): Promise<any> {
    //     return await this.request(`/bank`, 'PUT', params)
    // }
    async getExpenseType(id: number): Promise<any> {
        return await this.request(`/expense/getexpensetype?id=${id}`, 'GET')
    }
    async getExpenseTypes(currentPage: number, viewAll: boolean, search: string): Promise<any> {
        return await this.request(`/expense/getexpensetypes?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`, 'GET')
    }
    async createExpenseType(params: object): Promise<any> {
        return await this.request(`/expense/createexpensetype`, 'POST', params)
    }
    async updateExpenseType(params: object): Promise<any> {
        return await this.request(`/expense/updateexpensetype`, 'PUT', params)
    }


    //Vendors
    async getVendor(id: number): Promise<any> {
        return await this.request(`/expense/getvendor?id=${id}`, 'GET')
    }
    async getVendors(currentPage: number, viewAll: boolean, search: string): Promise<any> {
        return await this.request(`/expense/getvendors?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`, 'GET')
    }
    async createVendor(params: object): Promise<any> {
        return await this.request(`/expense/createvendor`, 'POST', params)
    }
    async updateVendor(params: object): Promise<any> {
        return await this.request(`/expense/updatevendor`, 'PUT', params)
    }

    //AccountPayable
    async getAccountPayable(id: number): Promise<any> {
        return await this.request(`/expense/getaccountpayable?id=${id}`, 'GET')
    }
    async getAccountPayables(params: object): Promise<any> {
        return await this.request(`/expense/getaccountpayables`, 'GET', params)
    }
    async createAccountPayable(params: object): Promise<any> {
        return await this.request(`/expense/createaccountpayable`, 'POST', params)
    }
    async updateAccountPayable(params: object): Promise<any> {
        return await this.request(`/expense/updateaccountpayable`, 'PUT', params)
    }
    async VoidAccountPayable(params: object): Promise<any> {
        return await this.request(`/expense/voidaccountpayable`, 'PUT', params)
    }
}

export const expenseService = new ExpenseService()