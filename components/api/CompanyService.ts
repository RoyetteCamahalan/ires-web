import BaseAPIService from "./BaseAPIService";


class CompanyService extends BaseAPIService{
    async register(params: object): Promise<any> {
        return await this.request(`/company/register`, 'POST', params)
    }
    async verify(params: object): Promise<any> {
        return await this.request(`/company/verify`, 'POST', params)
    }
    async resendConfirmation(params: object): Promise<any> {
        return await this.request(`/company/resendconfirmation`, 'POST', params)
    }
    async get(): Promise<any> {
        return await this.request(`/company`, 'GET')
    }
    async update(params: object): Promise<any> {
        return await this.request(`/company/update`, 'POST', params)
    }
    async completeTour(id: Number): Promise<any> {
        return await this.request(`/company/completetour/${id}`, 'POST')
    }
}

export const companyService = new CompanyService()