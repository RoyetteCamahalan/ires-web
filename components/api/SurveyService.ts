import BaseAPIService from "./BaseAPIService";


class SurveyService extends BaseAPIService{
    async get(currentPage: number, search: string): Promise<any> {
        return await this.request(`/survey/?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/survey/${id}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/survey`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/survey`, 'PUT', params)
    }
}

export const surveyService = new SurveyService()