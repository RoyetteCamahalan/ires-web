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
    async getExpenseTypes(currentPage: number, search: string): Promise<any> {
        return await this.request(`/expense/getexpensetypes?currentPage=${currentPage}&search=${search}`, 'GET')
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
    async getVendors(currentPage: number, search: string): Promise<any> {
        return await this.request(`/expense/getvendors?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async createVendor(params: object): Promise<any> {
        return await this.request(`/expense/createvendor`, 'POST', params)
    }
    async updateVendor(params: object): Promise<any> {
        return await this.request(`/expense/updatevendor`, 'PUT', params)
    }
}

export const expenseService = new ExpenseService()