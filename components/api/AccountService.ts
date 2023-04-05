import BaseAPIService from "./BaseAPIService";


class AccountService extends BaseAPIService{
    async getBankAccounts(currentPage: number, search: string): Promise<any> {
        return await this.request(`/account/getbankaccounts?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getBankAccount(id: number): Promise<any> {
        return await this.request(`/account/getbankaccount/${id}`, 'GET')
    }
    async createBankAccount(params: object): Promise<any> {
        return await this.request(`/account/createbankaccount`, 'POST', params)
    }
    async updateBankAccount(params: object): Promise<any> {
        return await this.request(`/account/updatebankaccount`, 'PUT', params)
    }
}

export const accountService = new AccountService()