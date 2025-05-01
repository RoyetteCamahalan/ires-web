import BaseAPIService from "./BaseAPIService";


class AgentService extends BaseAPIService{
    async get(pageNumber: number, search: string): Promise<any> {
        return await this.request(`/agent?pagenumber=${pageNumber}&search=${search}`, 'GET')
    }
    async getDetails(guid: String): Promise<any> {
        return await this.request(`/agent/${guid}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/agent`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/agent`, 'PUT', params)
    }
}

export const agentService = new AgentService()