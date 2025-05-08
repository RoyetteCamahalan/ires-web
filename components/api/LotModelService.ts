import BaseAPIService from "./BaseAPIService";


class LotModelService extends BaseAPIService{
    async GetModel(id: number): Promise<any> {
        return await this.request(`/lotmodel/${id}`, 'GET')
    }
    async GetModels(currentPage: number, search: string, project_id: number): Promise<any> {
        return await this.request(`/lotmodel/?project_id=${project_id}&pagenumber=${currentPage}&search=${search}`, 'GET')
    }
    async Create(params: object): Promise<any> {
        return await this.request(`/lotmodel`, 'POST', params)
    }
    async Update(params: object): Promise<any> {
        return await this.request(`/lotmodel`, 'PUT', params)
    }
}

export const lotmodelService = new LotModelService()