import BaseAPIService from "./BaseAPIService";


class RentalService extends BaseAPIService{
    async get(currentPage: number, search: string, filterByID: number): Promise<any> {
        return await this.request(`/rental/?currentPage=${currentPage}&filterByID=${filterByID}&search=${search}`, 'GET')
    }
    async getDetails(id: number): Promise<any> {
        return await this.request(`/rental/${id}`, 'GET')
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
}

export const rentalService = new RentalService()