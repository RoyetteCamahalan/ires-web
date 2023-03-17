import BaseAPIService from "./BaseAPIService";


class CompanyService extends BaseAPIService{
    async register(params: object): Promise<any> {
        return await this.request(`/company/register`, 'POST', params)
    }
    async verify(params: object): Promise<any> {
        return await this.request(`/company/verify`, 'POST', params)
    }
}

export const companyService = new CompanyService()