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




    //Offices
    async getOffice(id: number): Promise<any> {
        return await this.request(`/account/getoffice?id=${id}`, 'GET')
    }
    async getOffices(currentPage: number, search: string): Promise<any> {
        return await this.request(`/account/getoffices?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async createOffice(params: object): Promise<any> {
        return await this.request(`/account/createoffice`, 'POST', params)
    }
    async updateOffice(params: object): Promise<any> {
        return await this.request(`/account/updateoffice`, 'PUT', params)
    }
}

export const accountService = new AccountService()