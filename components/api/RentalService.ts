import BaseAPIService from "./BaseAPIService";


class RentalService extends BaseAPIService{
    async get(currentPage: number, search: string, filterByID: number): Promise<any> {
        return await this.request(`/rental/?currentPage=${currentPage}&filterBy=${filterByID}&search=${search}`, 'GET')
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/rental/${id}`, 'GET')
    }
    async getContractDetails(id: number): Promise<any> {
        return await this.request(`/rental/getdetails/${id}`, 'GET')
    }
    async reCompute(id: number): Promise<any> {
        return await this.request(`/rental/recompute/${id}`, 'GET')
    }
    async getHistory(id: number): Promise<any> {
        return await this.request(`/rental/getaccounthistory/${id}`, 'GET')
    }
    async getSOA(id: number): Promise<any> {
        return await this.request(`/rental/getsoa/${id}`, 'GET')
    }
    async sendSOA(params: object): Promise<any> {
        return await this.request(`/rental/sendsoa`, 'POST', params)
    }
    async create(params: object): Promise<any> {
        return await this.request(`/rental`, 'POST', params)
    }
    async update(params: object): Promise<any> {
        return await this.request(`/rental`, 'PUT', params)
    }
    async updateStatus(params: object): Promise<any> {
        return await this.request(`/rental/updatestatus`, 'PUT', params)
    }

    
    async getRentalCharge(id: number): Promise<any> {
        return await this.request(`/rental/getrentalcharge/${id}`, 'GET')
    }
    async postOtherCharge(params: object): Promise<any> {
        return await this.request(`/rental/postothercharge`, 'POST', params)
    }
    async updateOtherCharge(params: object): Promise<any> {
        return await this.request(`/rental/updateothercharge`, 'PUT', params)
    }
    async deleteOtherCharge(id: number): Promise<any> {
        return await this.request(`/rental/deleteothercharge/${id}`, 'DELETE')
    }
}

export const rentalService = new RentalService()