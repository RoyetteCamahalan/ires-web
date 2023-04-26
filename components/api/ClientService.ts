import BaseAPIService from "./BaseAPIService";


class ClientService extends BaseAPIService{
    async get(currentPage: number, search: string): Promise<any> {
        return await this.request(`/client/?currentPage=${currentPage}&search=${search}`, 'GET')
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/client/${id}`, 'GET')
    }
    async create(params: object): Promise<any> {
        return await this.request(`/client`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/client`, 'PUT', params)
    }
    async sendMail(params: object): Promise<any> {
        return await this.request(`/client/sendmail`, 'POST', params)
    }
}

export const clientService = new ClientService()