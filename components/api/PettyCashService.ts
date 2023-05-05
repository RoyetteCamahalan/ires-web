import BaseAPIService from "./BaseAPIService";


class PettyCashService extends BaseAPIService{
    
    async get(id: number): Promise<any> {
        return await this.request(`/pettycash?id=${id}`, 'GET')
    }
    async getall(params: object): Promise<any> {
        return await this.request(`/pettycash/getall`, 'GET', params)
    }
    async create(params: object): Promise<any> {
        return await this.request(`/pettycash`, 'POST', params)
    }
    async voidRecord(params: object): Promise<any> {
        return await this.request(`/pettycash/voiddisbursement`, 'PUT', params)
    }
}

export const pettyCashService = new PettyCashService()