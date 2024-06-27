import BaseAPIService from "./BaseAPIService";


class CreditNoteService extends BaseAPIService{

    async getCreditType(id: Number): Promise<any> {
        return await this.request(`/creditnote/getcredittype/${id}`, 'GET')
    }
    async getCreditTypes(currentPage: number, search: string, viewAll: Boolean): Promise<any> {
        return await this.request(`/creditnote/getcredittypes?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`, 'GET')
    }
    async createCreditType(params: object): Promise<any> {
        return await this.request(`/creditnote/createcredittype`, 'POST', params)
    }
    async updateCreditType(params: object): Promise<any> {
        return await this.request(`/creditnote/updatecredittype`, 'PUT', params)
    }
}

export const creditNoteService = new CreditNoteService()