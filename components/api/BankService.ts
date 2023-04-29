import BaseAPIService from "./BaseAPIService";


class BankService extends BaseAPIService{
    async get(bankID: number): Promise<any> {
        return await this.request(`/bank?bankID=${bankID}`, 'GET')
    }
    async getBanks(currentPage: number, search: string): Promise<any> {
        return await this.request(`/bank/getbanks?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getAllBanks(currentPage: number, search: string): Promise<any> {
        return await this.request(`/bank/getallbanks?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getWallets(currentPage: number, search: string): Promise<any> {
        return await this.request(`/bank/getewallets?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/bank`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/bank`, 'PUT', params)
    }
}

export const bankService = new BankService()